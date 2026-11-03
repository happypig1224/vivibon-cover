"""
Unit tests for InternalDualImageTester sandbox execution.
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

from pipeline.src.benchmark.internal_dual_image_tester import InternalDualImageTester

class TestInternalTester(unittest.TestCase):
    def setUp(self):
        self.tester = InternalDualImageTester()
        self.ref_image = os.path.join(pipeline_root, "assets", "references", "milo_test_cat.webp")

    def test_base64_encoding(self):
        self.assertTrue(os.path.exists(self.ref_image))
        data_url = self.tester.load_image_as_base64(self.ref_image)
        self.assertTrue(data_url.startswith("data:image/webp;base64,"))
        self.assertGreater(len(data_url), 100)

    def test_missing_image_raises_file_not_found(self):
        with self.assertRaises(FileNotFoundError):
            self.tester.load_image_as_base64("non_existent_file.webp")

    def test_run_benchmark_suite(self):
        out_report = os.path.join(pipeline_root, "data", "test_report_temp.json")
        report = self.tester.run_full_suite(self.ref_image, out_report)
        
        self.assertEqual(report["total_templates_tested"], 6)
        self.assertEqual(report["passed_count"], 6)
        self.assertEqual(report["pass_rate"], "100.0%")
        self.assertTrue(os.path.exists(out_report))
        
        # Cleanup
        if os.path.exists(out_report):
            os.remove(out_report)

if __name__ == "__main__":
    unittest.main()
