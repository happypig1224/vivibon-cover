"""
Automated Integration Tests for Pipeline Studio Server and API Endpoints.
"""
import unittest
import threading
import time
import urllib.request
import json
import os
import sys

# Add paths
pipeline_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, pipeline_root)

from studio.server import PipelineStudioHandler, HTTPServer

TEST_PORT = 8899

class TestStudioServer(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = HTTPServer(("", TEST_PORT), PipelineStudioHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        time.sleep(0.3)  # Allow server to start

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def _get_json(self, path):
        url = f"http://127.0.0.1:{TEST_PORT}{path}"
        with urllib.request.urlopen(url, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            return json.loads(resp.read().decode("utf-8"))

    def test_overview_endpoint(self):
        data = self._get_json("/api/overview")
        self.assertIn("total_mined_assets", data)
        self.assertIn("tier_s_count", data)
        self.assertIn("top6_champions_ready", data)
        self.assertEqual(data["server_status"], "ONLINE")

    def test_stage1_assets_endpoint(self):
        data = self._get_json("/api/stage1/assets")
        self.assertIn("records", data)
        self.assertGreaterEqual(len(data["records"]), 1)

    def test_stage2_scorecards_endpoint(self):
        data = self._get_json("/api/stage2/scorecards")
        self.assertIn("full_ranked_records", data)

    def test_stage3_harness_endpoint(self):
        data = self._get_json("/api/stage3/harness")
        self.assertIn("blueprints", data)
        self.assertEqual(len(data["blueprints"]), 6)

    def test_stage4_report_endpoint(self):
        data = self._get_json("/api/stage4/report")
        self.assertIn("results", data)
        self.assertEqual(data["passed_count"], 6)

    def test_stage5_metrics_endpoint(self):
        data = self._get_json("/api/stage5/metrics")
        self.assertIn("active_templates", data)

    def test_static_html_served(self):
        url = f"http://127.0.0.1:{TEST_PORT}/index.html"
        with urllib.request.urlopen(url, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            html = resp.read().decode("utf-8")
            self.assertIn("VIVIBON STUDIO", html)

if __name__ == "__main__":
    unittest.main()
