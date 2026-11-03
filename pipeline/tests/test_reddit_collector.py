"""
Unit tests for Overseas Reddit Collector.
"""
import os
import sys
import json
import pytest

# Ensure repository root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from pipeline.src.collectors.overseas.reddit import RedditCollector


def test_reddit_collector_init():
    collector = RedditCollector()
    assert collector.PULLPUSH_ENDPOINT is not None
    assert "rarepuppers" in collector.DEFAULT_SUBREDDITS
    assert "Catmemes" in collector.DEFAULT_SUBREDDITS

def test_reddit_save_and_load_archive():
    collector = RedditCollector()
    dummy_posts = [
        {
            "id": "REDDIT-test123",
            "subreddit": "rarepuppers",
            "title": "A very good boy testing pipeline",
            "score": 45000,
            "num_comments": 800,
            "image_url": "https://i.redd.it/dummy.jpg",
            "permalink": "https://reddit.com/r/rarepuppers/comments/dummy",
            "created_utc": 1600000000,
            "source": "Reddit (Test)"
        }
    ]
    saved_path = collector.save_to_raw_archive(dummy_posts)
    assert os.path.exists(saved_path)
    
    with open(saved_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        assert data.get("total_items") == 1
        assert data.get("items")[0]["score"] == 45000

if __name__ == "__main__":
    test_reddit_collector_init()
    test_reddit_save_and_load_archive()
    print("Reddit collector tests passed successfully!")
