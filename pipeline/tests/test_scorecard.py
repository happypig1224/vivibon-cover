"""
Unit tests for MentalModelEvaluator and Scorecard Engine.
"""
import unittest
import os
import sys
import json

# Add workspace root and pipeline root
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
pipeline_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
for p in [workspace_root, pipeline_root]:
    if p not in sys.path:
        sys.path.insert(0, p)

from pipeline.src.analysis.scorecard import MentalModelEvaluator, run_tier_s_scorecard

class TestMentalModelScorecard(unittest.TestCase):
    def setUp(self):
        self.evaluator = MentalModelEvaluator()

    def test_scorecard_dimensions_and_bounds(self):
        sample_asset = {
            "id": "TEST-01",
            "modality": "Meme-1:1",
            "title": "Corporate Coffee Burnout Cat",
            "concept_name": "Workplace Fatigue & Coffee",
            "engagement_signals": {
                "shares": 65000,
                "social_currency_type": "Relatable Workplace Burnout"
            },
            "visual_specs": {
                "camera_shot": "Close-up bust portrait"
            },
            "semiotic_props": ["Giant ceramic coffee mug", "Slanted spectacles"],
            "projected_emotion": "Exhausted liquid eyes looking at screen",
            "negative_prompt": "human hands, cartoon 3d, bad anatomy",
            "trigger_scenarios": ["Monday morning standing meeting", "Working late on Friday"]
        }
        
        result = self.evaluator.evaluate_asset(sample_asset)
        
        self.assertIn("total_score", result)
        self.assertIn("social_currency", result)
        self.assertIn("reproduction_feasibility", result)
        self.assertIn("emotional_depth", result)
        self.assertIn("dimension_breakdown", result)
        
        # Verify weight upper bounds
        self.assertLessEqual(result["social_currency"], 40.0)
        self.assertGreaterEqual(result["social_currency"], 0.0)
        self.assertLessEqual(result["reproduction_feasibility"], 30.0)
        self.assertGreaterEqual(result["reproduction_feasibility"], 0.0)
        self.assertLessEqual(result["emotional_depth"], 30.0)
        self.assertGreaterEqual(result["emotional_depth"], 0.0)
        self.assertLessEqual(result["total_score"], 100.0)
        
        # Verify sum matches total
        sum_of_dimensions = round(result["social_currency"] + result["reproduction_feasibility"] + result["emotional_depth"], 1)
        self.assertEqual(result["total_score"], sum_of_dimensions)

    def test_run_tier_s_scorecard_execution(self):
        in_path = os.path.join(workspace_root, "pipeline", "data", "cross_validated_assets.json")
        out_path = os.path.join(workspace_root, "pipeline", "data", "tier_s_scorecard_ranked.json")
        
        summary = run_tier_s_scorecard(in_path, out_path)
        self.assertEqual(summary["total_tier_s_evaluated"], 13)
        self.assertEqual(len(summary["overall_top6_champions"]), 6)
        self.assertTrue(os.path.exists(out_path))

if __name__ == "__main__":
    unittest.main()
