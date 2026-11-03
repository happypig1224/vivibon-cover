"""
Unit tests for DistillationDatasetBuilder and training corpus synthesis.
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

from pipeline.src.distill.dataset_distiller import DistillationDatasetBuilder, PET_BENCHMARK_MATRIX
from pipeline.src.harness.prompt_assembler import CHAMPION_BLUEPRINTS

class TestDistillPipeline(unittest.TestCase):
    def setUp(self):
        self.builder = DistillationDatasetBuilder()

    def test_corpus_size_and_cartesian_product(self):
        corpus = self.builder.generate_full_distillation_corpus()
        expected_size = len(CHAMPION_BLUEPRINTS) * len(PET_BENCHMARK_MATRIX)
        self.assertEqual(len(corpus), expected_size)
        self.assertEqual(expected_size, 36)

    def test_triplet_schema_contracts(self):
        corpus = self.builder.generate_full_distillation_corpus()
        for item in corpus:
            self.assertIn("pair_id", item)
            self.assertIn("template_id", item)
            self.assertIn("pet_subject", item)
            self.assertIn("instruction", item)
            self.assertIn("master_positive_prompt", item)
            self.assertIn("master_negative_prompt", item)
            self.assertIn("quality_gate", item)
            
            # Verify quality gate values
            self.assertGreaterEqual(item["quality_gate"]["biometric_fidelity_threshold"], 0.85)
            self.assertTrue(item["quality_gate"]["zero_text_watermark_guarantee"])
            
            # Verify pet breed appears in positive prompt
            breed = item["pet_subject"]["breed"]
            self.assertIn(breed.split()[0], item["master_positive_prompt"])

    def test_jsonl_export_and_readback(self):
        test_out = os.path.join(pipeline_root, "data", "distill", "test_dataset.jsonl")
        count = self.builder.export_jsonl(test_out)
        self.assertEqual(count, 36)
        self.assertTrue(os.path.exists(test_out))
        
        # Readback verification
        lines = []
        with open(test_out, "r", encoding="utf-8") as f:
            for line in f:
                lines.append(json.loads(line.strip()))
        self.assertEqual(len(lines), 36)
        
        # Cleanup test file
        if os.path.exists(test_out):
            os.remove(test_out)

if __name__ == "__main__":
    unittest.main()
