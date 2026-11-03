"""
Cross-Cultural Validation Engine.
Performs quantitative multi-dimensional cross-validation between:
1. Primary Overseas Momentum (Reddit, Civitai, TikTok US, Instagram Reels)
2. Auxiliary Domestic Micro-Resonance (XiaoHongShu, WeChat Stickers)
3. Universal Human Nature Overlap (Shared biological & emotional truths)

Computes:
- cv_score (0 - 100)
- tier: "Tier-S: Global Universal Hit" (>= 85)
        "Tier-A: Western Cultural Anchor" (70 - 84)
        "Tier-B: Regional Localized" (< 70)
- rationale: Clear architectural and business rationale for prioritization
"""
from typing import Dict, Any, Tuple
import os
import sys

# Ensure pipeline root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from pipeline.src.collectors.domestic.social_radar import DomesticSocialRadar

class CrossValidator:
    def __init__(self):
        self.domestic_radar = DomesticSocialRadar()

    def evaluate_asset(self, asset: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluate a single viral candidate across overseas primary, domestic auxiliary,
        and universal human condition.
        """
        # 1. Overseas Primary Score (Max 50 points)
        overseas_score = self._compute_overseas_score(asset)
        
        # 2. Domestic Auxiliary Resonance (Max 30 points)
        domestic_score, matched_domestic = self._compute_domestic_resonance(asset)
        
        # 3. Universal Human Condition Overlap (Max 20 points)
        universal_score = self._compute_universal_overlap(asset, matched_domestic)
        
        total_cv_score = round(overseas_score + domestic_score + universal_score, 1)
        
        # Tier Assignment
        if total_cv_score >= 85:
            tier = "Tier-S: Global Universal Hit"
            priority = "P0 - Immediate Production Harness"
        elif total_cv_score >= 70:
            tier = "Tier-A: Western Cultural Anchor"
            priority = "P1 - Overseas Dedicated Feature"
        else:
            tier = "Tier-B: Regional Localized"
            priority = "P2 - Backlog / Observation"
            
        return {
            "cv_score": total_cv_score,
            "tier": tier,
            "priority": priority,
            "score_breakdown": {
                "overseas_primary": round(overseas_score, 1),
                "domestic_auxiliary": round(domestic_score, 1),
                "universal_human_condition": round(universal_score, 1)
            },
            "matched_domestic_resonance": matched_domestic.get("chinese_title") if matched_domestic else "Western Native Specific",
            "validation_rationale": self._generate_rationale(tier, asset, matched_domestic, total_cv_score)
        }

    def _compute_overseas_score(self, asset: Dict[str, Any]) -> float:
        signals = asset.get("engagement_signals", {})
        likes = signals.get("platform_likes", 0) if isinstance(signals, dict) else 0
        if likes == 0:
            # Fallback to alternative metric keys
            likes = asset.get("likes") or asset.get("virality_metrics", {}).get("upvotes", 0) or 0
        
        # Scale likes: 50k -> 35pts, 100k -> 43pts, 150k+ -> 50pts
        if likes >= 150000:
            base_pts = 46.0 + min(4.0, (likes - 150000) / 25000)
        elif likes >= 100000:
            base_pts = 40.0 + (likes - 100000) / 50000 * 6.0
        elif likes >= 50000:
            base_pts = 32.0 + (likes - 50000) / 50000 * 8.0
        else:
            base_pts = max(20.0, likes / 50000 * 32.0)
            
        return min(50.0, base_pts)

    def _compute_domestic_resonance(self, asset: Dict[str, Any]) -> Tuple[float, Any]:
        concept_name = asset.get("concept_name") or asset.get("title", "")
        prompt_seed = asset.get("prompt_seed") or " ".join(asset.get("tags", []))
        
        match = self.domestic_radar.match_concept(concept_name, prompt_seed)
        if match:
            # High domestic resonance (22 - 30 pts)
            radar_score = match.get("resonance_score", 90)
            pts = 22.0 + (radar_score - 80) / 20 * 8.0
            return min(30.0, pts), match
        else:
            # No direct domestic equivalent, Western cultural niche (12 - 16 pts)
            return 14.0, None

    def _compute_universal_overlap(self, asset: Dict[str, Any], matched_domestic: Any) -> float:
        """
        Evaluates whether the core psychological driver transcends culture:
        - Work exhaustion / coffee dependency -> universal (18 - 20 pts)
        - Caught stealing guilt -> universal (18 - 20 pts)
        - Melancholic / adorable vulnerability -> universal (17 - 19 pts)
        - Specific Western movie trope (e.g. Top Gun, 90s mall) -> Western specific (13 - 15 pts)
        """
        emotion = str(asset.get("projected_emotion", "")).lower()
        title = str(asset.get("title", "")).lower()
        tags = " ".join(asset.get("tags", [])).lower()
        combined_text = f"{emotion} {title} {tags}"
        
        universal_keywords = ["exhausted", "burnout", "caught", "guilt", "pleading", "unaware", "confused", "sleeping", "regal", "dread", "coffee", "monday"]
        hits = sum(1 for kw in universal_keywords if kw in combined_text)
        
        if matched_domestic and hits >= 1:
            # Dual confirmation of universal human condition
            return 18.0 + min(2.0, hits * 0.5)
        elif hits >= 2:
            return 16.5
        elif matched_domestic:
            return 15.5
        else:
            return 13.5

    def _generate_rationale(self, tier: str, asset: Dict[str, Any], match: Any, score: float) -> str:
        name = asset.get("title", "")
        if "Tier-S" in tier:
            return f"[{name}] demonstrates explosive dual-market validation (Score {score}). Hits universal human condition with proven Western viral traction and high domestic micro-resonance ({match.get('chinese_title') if match else 'Universal'}). Guaranteed cross-cultural viral velocity."
        elif "Tier-A" in tier:
            return f"[{name}] anchors strongly in Western cultural heritage and native internet aesthetics (Score {score}). Primary overseas asset with dedicated appeal in North American and European demographics."
        else:
            return f"[{name}] displays regional specificity with moderate universal resonance (Score {score}). Preserved in secondary backlog."

if __name__ == "__main__":
    validator = CrossValidator()
    print("CrossValidator initialized successfully.")
