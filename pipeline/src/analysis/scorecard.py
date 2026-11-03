"""
Mental Model Scorecard Engine.
Evaluates Tier-S candidates on three core business dimensions:
1. Social Currency (40%) - Self-identity, conversation ignition, emotional shield
2. Reproduction Feasibility (30%) - Pose tolerance, biometric fidelity, prop harmony
3. Emotional Depth (30%) - Biological cuteness instinct, comedic irony, Lindy longevity

Calculates:
- total_mental_score (0 - 100)
- detailed dimension scores
- production readiness rank (Champion vs Batch 2)
- key conversion hook
"""
from typing import Dict, Any, List, Tuple
import os
import sys
import json

# Add workspace root and pipeline root to path
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
pipeline_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
for p in [workspace_root, pipeline_root]:
    if p not in sys.path:
        sys.path.insert(0, p)

try:
    from pipeline.src.models.schema import MentalModelScorecard
except ImportError:
    from src.models.schema import MentalModelScorecard

class MentalModelEvaluator:
    """
    Evaluates pet viral assets against mental model criteria to determine
    production readiness and conversion potential.
    """
    
    def evaluate_asset(self, asset: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates social currency, reproduction feasibility, and emotional depth
        for a single asset.
        """
        # 1. Social Currency (Max 40 pts)
        soc_score, soc_breakdown = self._evaluate_social_currency(asset)
        
        # 2. Reproduction Feasibility (Max 30 pts)
        rep_score, rep_breakdown = self._evaluate_reproduction_feasibility(asset)
        
        # 3. Emotional Depth (Max 30 pts)
        emo_score, emo_breakdown = self._evaluate_emotional_depth(asset)
        
        total_score = round(soc_score + rep_score + emo_score, 1)
        
        # Determine production rank
        if total_score >= 88.0:
            prod_rank = "S+ Rank - Production Launch Champion"
        else:
            prod_rank = "S Rank - Priority Batch 2"
            
        hook = self._generate_conversion_hook(asset, total_score)
        
        dimension_breakdown = {
            "social_currency": round(soc_score, 1),
            "social_identity_signaling": round(soc_breakdown["identity"], 1),
            "social_conversation_starter": round(soc_breakdown["starter"], 1),
            "social_emotional_shield": round(soc_breakdown["shield"], 1),
            
            "reproduction_feasibility": round(rep_score, 1),
            "reproduction_pose_tolerance": round(rep_breakdown["pose_tolerance"], 1),
            "reproduction_biometric_fidelity": round(rep_breakdown["biometric_fidelity"], 1),
            "reproduction_prop_harmony": round(rep_breakdown["prop_harmony"], 1),
            
            "emotional_depth": round(emo_score, 1),
            "emotional_neoteny_cute_aggression": round(emo_breakdown["neoteny"], 1),
            "emotional_comedy_of_errors": round(emo_breakdown["comedy"], 1),
            "emotional_lindy_longevity": round(emo_breakdown["longevity"], 1),
        }
        
        return {
            "total_score": total_score,
            "social_currency": round(soc_score, 1),
            "reproduction_feasibility": round(rep_score, 1),
            "emotional_depth": round(emo_score, 1),
            "dimension_breakdown": dimension_breakdown,
            "production_recommendation": prod_rank,
            "key_conversion_hook": hook
        }

    def _evaluate_social_currency(self, asset: Dict[str, Any]) -> Tuple[float, Dict[str, float]]:
        """
        Social Currency (40 pts):
        - Identity Signaling (15 pts): Does it flatter the pet owner? (Class, humor, taste)
        - Conversation Starter (15 pts): Does it provoke comments in chats & stories?
        - Emotional Shield (10 pts): Does it help user communicate a difficult emotion?
        """
        signals = asset.get("engagement_signals", {})
        soc_type = str(signals.get("social_currency_type", "")).lower()
        title = str(asset.get("title", "")).lower()
        concept = str(asset.get("concept_name", "")).lower()
        triggers = asset.get("trigger_scenarios", [])
        
        # 1. Identity Signaling (Base 11.5, Max 15)
        identity = 12.0
        if any(w in soc_type or w in concept for w in ["status", "bespoke", "prestige", "sophistication", "taste", "gentleman", "aesthetic"]):
            identity += 2.8
        elif any(w in soc_type or w in concept for w in ["burnout", "coffee", "workplace", "monday", "relatable"]):
            identity += 2.4
        identity = min(15.0, identity)
        
        # 2. Conversation Starter (Base 11.5, Max 15)
        starter = 12.0
        shares = signals.get("shares", 0)
        if shares >= 50000:
            starter += 2.8
        elif shares >= 20000:
            starter += 2.0
        else:
            starter += 1.0
        if len(triggers) >= 2:
            starter += 0.2
        starter = min(15.0, starter)
        
        # 3. Emotional Shield (Base 7.0, Max 10)
        shield = 7.5
        if any(w in soc_type or w in title for w in ["apology", "shield", "guilt", "fatigue", "exhaustion", "burnout", "relatable"]):
            shield += 2.3
        elif any(w in soc_type or w in title for w in ["regal", "royalty", "unimpressed"]):
            shield += 1.8
        shield = min(10.0, shield)
        
        total = identity + starter + shield
        return min(40.0, total), {"identity": identity, "starter": starter, "shield": shield}

    def _evaluate_reproduction_feasibility(self, asset: Dict[str, Any]) -> Tuple[float, Dict[str, float]]:
        """
        Reproduction Feasibility (30 pts):
        - Pose Tolerance (10 pts): High tolerance for random user photo uploads
        - Biometric Fidelity (10 pts): Preserves original fur pattern, eye color, facial identity
        - Prop Harmony (10 pts): AI seamlessly blends clothing/accessories without clipping
        """
        specs = asset.get("visual_specs", {})
        shot = str(specs.get("camera_shot", "")).lower()
        props = asset.get("semiotic_props", [])
        modality = asset.get("modality", "")
        
        # 1. Pose Tolerance (Base 8.0, Max 10)
        # Headshot / Portrait is forgiving. Full-body or contorted poses require higher precision.
        pose_tol = 8.5
        if any(w in shot for w in ["bust", "portrait", "close-up", "head"]):
            pose_tol += 1.2
        elif any(w in shot for w in ["flattened", "wide", "full-body"]):
            pose_tol -= 0.5
        pose_tol = min(10.0, max(5.0, pose_tol))
        
        # 2. Biometric Fidelity (Base 8.5, Max 10)
        fidelity = 8.8
        neg = str(asset.get("negative_prompt", "")).lower()
        if "human hands" in neg or "cartoon" in neg or "bad anatomy" in neg:
            fidelity += 0.9
        fidelity = min(10.0, fidelity)
        
        # 3. Prop Harmony (Base 8.0, Max 10)
        # Moderate props (1-2 props) render cleanly. Excessive props cause AI hallucinatory clipping.
        prop_harmony = 8.5
        if 1 <= len(props) <= 3:
            prop_harmony += 1.2
        elif len(props) > 4:
            prop_harmony -= 0.6
        prop_harmony = min(10.0, prop_harmony)
        
        total = pose_tol + fidelity + prop_harmony
        return min(30.0, total), {"pose_tolerance": pose_tol, "biometric_fidelity": fidelity, "prop_harmony": prop_harmony}

    def _evaluate_emotional_depth(self, asset: Dict[str, Any]) -> Tuple[float, Dict[str, float]]:
        """
        Emotional Depth (30 pts):
        - Biological Neoteny & Cute Aggression (10 pts): Big eyes, ear postures, vulnerable cuteness
        - Comedy of Errors (10 pts): Anthropomorphic irony, everyday human dilemma
        - Lindy Longevity (10 pts): Lasting profile picture value vs ephemeral trend
        """
        emotion = str(asset.get("projected_emotion", "")).lower()
        concept = str(asset.get("concept_name", "")).lower()
        modality = asset.get("modality", "")
        
        # 1. Neoteny & Biological Instinct (Base 8.0, Max 10)
        neoteny = 8.2
        if any(w in emotion for w in ["glossy", "liquid eyes", "pleading", "teary", "pitiful", "airplane ears", "wholesome"]):
            neoteny += 1.6
        elif any(w in emotion for w in ["fluffy", "adorable", "cozy"]):
            neoteny += 1.0
        neoteny = min(10.0, neoteny)
        
        # 2. Comedy of Errors / Irony (Base 8.0, Max 10)
        comedy = 8.0
        if any(w in emotion or w in concept for w in ["burnout", "coffee", "jam", "theft", "caught", "guilt", "corporate", "monday"]):
            comedy += 1.8
        elif any(w in emotion or w in concept for w in ["regal", "dramatic", "unimpressed"]):
            comedy += 1.2
        comedy = min(10.0, comedy)
        
        # 3. Lindy Longevity (Base 8.0, Max 10)
        longevity = 8.2
        if modality == "Avatar-1:1":
            # Profile pictures are kept for weeks/months
            longevity += 1.4
        else:
            # Memes are cycled frequently but viral classics persist
            longevity += 0.8
        longevity = min(10.0, longevity)
        
        total = neoteny + comedy + longevity
        return min(30.0, total), {"neoteny": neoteny, "comedy": comedy, "longevity": longevity}

    def _generate_conversion_hook(self, asset: Dict[str, Any], score: float) -> str:
        """
        Summarizes why this template converts free users into raving brand advocates.
        """
        title = asset.get("title", "")
        modality = asset.get("modality", "")
        soc_type = asset.get("engagement_signals", {}).get("social_currency_type", "Empathy")
        
        if modality == "Avatar-1:1":
            return f"High-status self-representation ({soc_type}). Owners pridefully adopt as their primary social avatar on Discord, WhatsApp, and Slack, creating continuous passive viral impressions."
        else:
            return f"Irresistible conversational meme weapon ({soc_type}). Solves everyday social friction (apology, Monday dread) by anthropomorphizing the user's feelings through their beloved pet."

def run_tier_s_scorecard(input_file: str, output_file: str) -> Dict[str, Any]:
    """
    Loads cross_validated_assets.json, filters Tier-S items, evaluates each with
    the mental model scorecard, and outputs ranked candidates.
    """
    evaluator = MentalModelEvaluator()
    
    with open(input_file, "r", encoding="utf-8") as f:
        catalog = json.load(f)
        
    records = catalog.get("records", [])
    tier_s_candidates = [r for r in records if r.get("cross_validation", {}).get("tier", "").startswith("Tier-S")]
    
    ranked_records = []
    for asset in tier_s_candidates:
        scorecard = evaluator.evaluate_asset(asset)
        asset["mental_scorecard"] = scorecard
        ranked_records.append(asset)
        
    # Sort descending by total_mental_score
    ranked_records.sort(key=lambda x: x["mental_scorecard"]["total_score"], reverse=True)
    
    # Split into Modality Leaders
    pfp_leaders = [r for r in ranked_records if r.get("modality") == "Avatar-1:1"]
    meme_leaders = [r for r in ranked_records if r.get("modality") == "Meme-1:1"]
    
    # Select Overall TOP 6 Champions
    champion_top6 = ranked_records[:6]
    
    summary = {
        "scorecard_version": "2.0.0-STAGE-2-MENTAL-SCORECARD",
        "evaluation_criteria": {
            "social_currency": "40% (Identity Signaling 15%, Conversation Starter 15%, Emotional Shield 10%)",
            "reproduction_feasibility": "30% (Pose Tolerance 10%, Biometric Fidelity 10%, Prop Harmony 10%)",
            "emotional_depth": "30% (Biological Neoteny 10%, Comedy of Errors 10%, Lindy Longevity 10%)"
        },
        "total_tier_s_evaluated": len(ranked_records),
        "overall_top6_champions": [
            {
                "rank": i + 1,
                "id": r["id"],
                "modality": r["modality"],
                "title": r["title"],
                "mental_score": r["mental_scorecard"]["total_score"],
                "cv_score": r["cross_validation"]["cv_score"],
                "social_currency": r["mental_scorecard"]["social_currency"],
                "reproduction_feasibility": r["mental_scorecard"]["reproduction_feasibility"],
                "emotional_depth": r["mental_scorecard"]["emotional_depth"],
                "production_rank": r["mental_scorecard"]["production_recommendation"],
                "key_conversion_hook": r["mental_scorecard"]["key_conversion_hook"]
            }
            for i, r in enumerate(champion_top6)
        ],
        "pfp_champions": [
            {
                "id": r["id"],
                "title": r["title"],
                "mental_score": r["mental_scorecard"]["total_score"],
                "cv_score": r["cross_validation"]["cv_score"]
            }
            for r in pfp_leaders
        ],
        "meme_top_champions": [
            {
                "id": r["id"],
                "title": r["title"],
                "mental_score": r["mental_scorecard"]["total_score"],
                "cv_score": r["cross_validation"]["cv_score"]
            }
            for r in meme_leaders[:4]
        ],
        "full_ranked_records": ranked_records
    }
    
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
        
    print(f"\n================ MENTAL MODEL SCORECARD RESULTS ================")
    print(f"Total Tier-S Candidates Evaluated: {len(ranked_records)}")
    print(f"{'Rank':<5} {'ID':<9} {'Modality':<11} {'Mental':<8} {'CV':<6} {'Soc(40)':<8} {'Rep(30)':<8} {'Emo(30)':<8} {'Title'}")
    print("-" * 95)
    for i, r in enumerate(ranked_records):
        m = r["mental_scorecard"]
        print(f"#{i+1:<4} {r['id']:<9} {r['modality']:<11} {m['total_score']:<8.1f} {r['cross_validation']['cv_score']:<6.1f} {m['social_currency']:<8.1f} {m['reproduction_feasibility']:<8.1f} {m['emotional_depth']:<8.1f} {r['title']}")
    print("=" * 95 + "\n")
    return summary

if __name__ == "__main__":
    pipeline_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    in_path = os.path.join(pipeline_dir, "data", "cross_validated_assets.json")
    out_path = os.path.join(pipeline_dir, "data", "tier_s_scorecard_ranked.json")
    run_tier_s_scorecard(in_path, out_path)
