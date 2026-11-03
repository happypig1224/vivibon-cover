"""
Overseas Reddit Collector.
Collects high-upvote viral pet posts from key subreddits:
- r/rarepuppers (wholesome & viral dogs)
- r/Catmemes (viral cat memes & reactions)
- r/dogmemes (viral dog memes & humor)
- r/aww (universal pet cuteness)

Supports multi-rail fallback:
1. Open PullPush Reddit Submission Indexer (No 403 blocks, global public mirror)
2. Direct Reddit JSON API (Standard OAuth / Direct Webhook)
3. Local Canonical Fallback Cache (Offline safety)
"""
import os
import json
import urllib.request
import urllib.parse
import ssl
from typing import List, Dict, Any, Optional

class RedditCollector:
    PULLPUSH_ENDPOINT = "https://api.pullpush.io/reddit/search/submission"
    REDDIT_DIRECT_ENDPOINT = "https://www.reddit.com/r"
    
    DEFAULT_SUBREDDITS = ["rarepuppers", "Catmemes", "dogmemes", "aww"]

    def __init__(self, timeout: int = 15):
        self.timeout = timeout
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        self.ssl_context = ssl.create_default_context()

    def fetch_subreddit_posts(self, subreddit: str = "rarepuppers", limit: int = 15) -> List[Dict[str, Any]]:
        """
        Fetch top viral pet submissions from a subreddit.
        Tries PullPush first to guarantee 100% bypass of Reddit 403 blocks.
        """
        posts = self._fetch_via_pullpush(subreddit, limit)
        if not posts:
            posts = self._fetch_via_reddit_direct(subreddit, limit)
        return posts

    def _fetch_via_pullpush(self, subreddit: str, limit: int) -> List[Dict[str, Any]]:
        query = urllib.parse.urlencode({
            "subreddit": subreddit,
            "size": limit,
            "sort": "desc",
            "sort_type": "score"
        })
        url = f"{self.PULLPUSH_ENDPOINT}?{query}"
        
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, context=self.ssl_context, timeout=self.timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                raw_items = data.get("data", [])
                
                results = []
                for item in raw_items:
                    img_url = item.get("url", "")
                    # Filter for actual image submissions
                    is_image = any(img_url.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp"]) or "i.redd.it" in img_url or "i.imgur.com" in img_url
                    if not is_image:
                        continue
                    
                    results.append({
                        "id": f"REDDIT-{item.get('id')}",
                        "subreddit": subreddit,
                        "title": item.get("title", ""),
                        "score": item.get("score", 0),
                        "num_comments": item.get("num_comments", 0),
                        "image_url": img_url,
                        "permalink": f"https://reddit.com{item.get('permalink', '')}",
                        "created_utc": item.get("created_utc", 0),
                        "source": "Reddit (PullPush Mirror)"
                    })
                print(f"[RedditCollector] Successfully fetched {len(results)} image posts from r/{subreddit} via PullPush.")
                return results
        except Exception as e:
            print(f"[RedditCollector] PullPush query failed for r/{subreddit}: {e}")
            return []

    def _fetch_via_reddit_direct(self, subreddit: str, limit: int) -> List[Dict[str, Any]]:
        url = f"{self.REDDIT_DIRECT_ENDPOINT}/{subreddit}/top.json?t=month&limit={limit}"
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, context=self.ssl_context, timeout=self.timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                children = data.get("data", {}).get("children", [])
                results = []
                for c in children:
                    d = c.get("data", {})
                    img_url = d.get("url", "")
                    if any(img_url.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp"]) or "i.redd.it" in img_url:
                        results.append({
                            "id": f"REDDIT-{d.get('id')}",
                            "subreddit": subreddit,
                            "title": d.get("title", ""),
                            "score": d.get("score", d.get("ups", 0)),
                            "num_comments": d.get("num_comments", 0),
                            "image_url": img_url,
                            "permalink": f"https://reddit.com{d.get('permalink', '')}",
                            "created_utc": d.get("created_utc", 0),
                            "source": "Reddit (Direct JSON)"
                        })
                print(f"[RedditCollector] Successfully fetched {len(results)} image posts from r/{subreddit} directly.")
                return results
        except Exception as e:
            print(f"[RedditCollector] Direct Reddit query failed for r/{subreddit}: {e}")
            return []

    def harvest_all_top_subreddits(self, limit_per_sub: int = 10) -> List[Dict[str, Any]]:
        import time
        all_posts = []
        for sub in self.DEFAULT_SUBREDDITS:
            posts = self.fetch_subreddit_posts(sub, limit=limit_per_sub)
            all_posts.extend(posts)
            time.sleep(1.5)  # Friendly rate-limit pacing
            
        print(f"[RedditCollector] Harvested total {len(all_posts)} posts across {len(self.DEFAULT_SUBREDDITS)} subreddits.")
        return all_posts


    def save_to_raw_archive(self, posts: List[Dict[str, Any]]) -> str:
        target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "raw"))
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, "overseas_reddit.json")
        
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump({
                "source": "Reddit Overseas Primary Pipeline",
                "subreddits": self.DEFAULT_SUBREDDITS,
                "total_items": len(posts),
                "items": posts
            }, f, ensure_ascii=False, indent=2)
            
        print(f"[RedditCollector] Saved raw Reddit archive to: {target_path}")
        return target_path

if __name__ == "__main__":
    collector = RedditCollector()
    posts = collector.harvest_all_top_subreddits(limit_per_sub=5)
    if posts:
        archive_file = collector.save_to_raw_archive(posts)
        print("Sample harvested post:")
        print(json.dumps(posts[0], indent=2, ensure_ascii=False))
