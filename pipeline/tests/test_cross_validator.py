"""
Unit tests for CrossValidator engine.
"""
import unittest
import os
import sys

# Add pipeline root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from pipeline.src.analysis.cross_validator import CrossValidator

class TestCrossValidator(unittest.TestCase):
    def setUp(self):
        self.validator = CrossValidator()

    def test_tier_s_evaluation(self):
        # Sample candidate with explosive overseas likes, domestic counterpart, and universal emotion
        sample_asset = {
            "title": "Cat drinking morning coffee trying to survive Monday",
            "concept_name": "cat coffee work Monday exhaustion",
            "projected_emotion": "exhausted corporate slave burnout",
            "engagement_signals": {
                "platform_likes": 160000,
                "shares": 35000,
                "target_demographic": "Gen-Z & Millennial Workers",
                "social_currency_type": "Empathy"
            },
            "prompt_seed": "fluffy orange cat sitting at desk with coffee mug, exhausted, monday morning",
            "tags": ["coffee", "workplace", "monday", "exhausted", "cat"]
        }
        result = self.validator.evaluate_asset(sample_asset)
        
        self.assertIn("cv_score", result)
        self.assertIn("tier", result)
        self.assertIn("score_breakdown", result)
        self.assertGreaterEqual(result["cv_score"], 85.0)
        self.assertEqual(result["tier"], "Tier-S: Global Universal Hit")
        self.assertEqual(result["priority"], "P0 - Immediate Production Harness")

    def test_tier_a_evaluation(self):
        # Western cultural anchor with solid overseas likes but niche/no domestic equivalent
        sample_asset = {
            "title": "Dog in 90s vintage school yearbook laser background",
            "concept_name": "90s mall studio pet yearbook",
            "projected_emotion": "nostalgic retro cool",
            "engagement_signals": {
                "platform_likes": 85000,
                "shares": 15000,
                "target_demographic": "US 90s Nostalgia Fans",
                "social_currency_type": "Identity"
            },
            "prompt_seed": "golden retriever in retro 90s neon laser portrait studio",
            "tags": ["90s", "yearbook", "laser", "nostalgia", "vintage"]
        }
        result = self.validator.evaluate_asset(sample_asset)
        
        self.assertGreaterEqual(result["cv_score"], 65.0)
        self.assertLess(result["cv_score"], 85.0)
        self.assertEqual(result["tier"], "Tier-A: Western Cultural Anchor")
        self.assertEqual(result["priority"], "P1 - Overseas Dedicated Feature")

    def test_tier_b_evaluation(self):
        # Low virality or obscure asset
        sample_asset = {
            "title": "Random obscure pet photo",
            "concept_name": "random obscure pet photo",
            "projected_emotion": "neutral",
            "engagement_signals": {
                "platform_likes": 1200,
                "shares": 10,
                "target_demographic": "Family",
                "social_currency_type": "Casual"
            },
            "prompt_seed": "simple pet photo on grass",
            "tags": ["random", "obscure"]
        }
        result = self.validator.evaluate_asset(sample_asset)
        self.assertLess(result["cv_score"], 70.0)
        self.assertEqual(result["tier"], "Tier-B: Regional Localized")
        self.assertEqual(result["priority"], "P2 - Backlog / Observation")

if __name__ == "__main__":
    unittest.main()
