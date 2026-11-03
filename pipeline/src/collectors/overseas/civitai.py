"""
Civitai Official Public REST API Collector.
Fetches high-reaction pet models and generation records safely without scraping or credentials.
"""
import urllib.request
import json
import ssl
from typing import List, Dict, Any

class CivitaiCollector:
    BASE_URL = "https://civitai.com/api/v1"

    def __init__(self, timeout: int = 20):
        self.timeout = timeout
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        self.ssl_context = ssl.create_default_context()

    def fetch_popular_images(self, limit: int = 20, sort: str = "Most Reactions", period: str = "AllTime") -> List[Dict[str, Any]]:
        """Fetch popular images using Civitai images endpoint."""
        query = urllib.parse.urlencode({
            "limit": limit,
            "sort": sort,
            "period": period,
            "nsfw": "None"
        })
        url = f"{self.BASE_URL}/images?{query}"
        req = urllib.request.Request(url, headers=self.headers)
        
        try:
            with urllib.request.urlopen(req, context=self.ssl_context, timeout=self.timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return data.get("items", [])
        except Exception as e:
            print(f"[CivitaiCollector] Error fetching images: {e}")
            return []

    def fetch_pet_models(self, tag: str = "pet", limit: int = 10) -> List[Dict[str, Any]]:
        """Fetch high-rated pet/animal models from Civitai models endpoint."""
        query = urllib.parse.urlencode({
            "limit": limit,
            "tag": tag,
            "sort": "Highest Rated"
        })
        url = f"{self.BASE_URL}/models?{query}"
        req = urllib.request.Request(url, headers=self.headers)
        
        try:
            with urllib.request.urlopen(req, context=self.ssl_context, timeout=self.timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return data.get("items", [])
        except Exception as e:
            print(f"[CivitaiCollector] Error fetching models: {e}")
            return []

if __name__ == "__main__":
    collector = CivitaiCollector()
    models = collector.fetch_pet_models(tag="cat", limit=3)
    print(f"Fetched {len(models)} models from Civitai.")
    for m in models:
        print(f" - {m.get('name')} (Downloads: {m.get('stats', {}).get('downloadCount')})")
