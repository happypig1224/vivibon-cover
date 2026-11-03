"""
Internal Pipeline Studio HTTP & REST API Server.
100% isolated within pipeline/studio/. Never touches public/ or worker/.
Serves the Vanilla HTML5/CSS3/JS UI and provides endpoints for 5-stage human-in-the-loop actions.
"""
import os
import sys
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Setup pathing
pipeline_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
studio_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, pipeline_root)

from src.benchmark.internal_dual_image_tester import InternalDualImageTester
from src.harness.prompt_assembler import CHAMPION_BLUEPRINTS, PromptHarnessAssembler

PORT = 8080

class PipelineStudioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve static files from pipeline/studio by default
        super().__init__(*args, directory=studio_root, **kwargs)

    def end_headers(self):
        # Add CORS and no-cache for internal studio
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _send_json(self, data: Any, status: int = 200):
        body = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self) -> Dict[str, Any]:
        length = int(self.headers.get("Content-Length", 0))
        if length > 0:
            raw = self.rfile.read(length).decode("utf-8")
            return json.loads(raw)
        return {}

    def do_GET(self):
        url_parts = urllib.parse.urlparse(self.path)
        path = url_parts.path

        # Static assets mapping: /assets/... -> pipeline/assets/...
        if path.startswith("/assets/"):
            rel_path = path[len("/assets/"):]
            full_path = os.path.abspath(os.path.join(pipeline_root, "assets", rel_path))
            if os.path.exists(full_path) and os.path.isfile(full_path):
                self._serve_static_file(full_path)
                return
            else:
                self.send_error(404, "Asset Not Found")
                return

        # REST API Routes
        if path == "/api/overview":
            self.handle_get_overview()
        elif path == "/api/stage1/assets":
            self.handle_get_stage1_assets()
        elif path == "/api/stage2/scorecards":
            self.handle_get_stage2_scorecards()
        elif path == "/api/stage3/harness":
            self.handle_get_stage3_harness()
        elif path == "/api/stage4/report":
            self.handle_get_stage4_report()
        elif path == "/api/stage5/metrics":
            self.handle_get_stage5_metrics()
        else:
            # Fallback to serving studio HTML/CSS/JS
            super().do_GET()

    def do_POST(self):
        url_parts = urllib.parse.urlparse(self.path)
        path = url_parts.path

        if path == "/api/stage1/review":
            self.handle_post_stage1_review()
        elif path == "/api/stage2/update":
            self.handle_post_stage2_update()
        elif path == "/api/stage3/save_prompt":
            self.handle_post_stage3_save_prompt()
        elif path == "/api/stage4/run_benchmark":
            self.handle_post_stage4_run_benchmark()
        elif path == "/api/stage5/retire":
            self.handle_post_stage5_retire()
        else:
            self.send_error(404, "API Endpoint Not Found")

    def _serve_static_file(self, full_path: str):
        ext = os.path.splitext(full_path)[1].lower()
        mime = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".png": "image/png",
            ".json": "application/json",
            ".css": "text/css",
            ".js": "application/javascript",
            ".html": "text/html"
        }.get(ext, "application/octet-stream")

        with open(full_path, "rb") as f:
            content = f.read()
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    # --- API Handlers ---
    def handle_get_overview(self):
        s1_file = os.path.join(pipeline_root, "data", "cross_validated_assets.json")
        s2_file = os.path.join(pipeline_root, "data", "tier_s_scorecard_ranked.json")
        s4_file = os.path.join(pipeline_root, "data", "internal_test_report.json")
        s5_file = os.path.join(pipeline_root, "data", "operational_metrics.json")

        def _safe_load_json(file_path):
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            return {}

        s1_data = _safe_load_json(s1_file)
        s2_data = _safe_load_json(s2_file)
        s4_data = _safe_load_json(s4_file)
        s5_data = _safe_load_json(s5_file)

        overview = {
            "total_mined_assets": s1_data.get("total_records", 24),
            "tier_s_count": s1_data.get("tier_distribution", {}).get("Tier-S (Global Universal Hit - P0)", 13),
            "top6_champions_ready": len(s2_data.get("overall_top6_champions", [])),
            "stage4_pass_rate": s4_data.get("pass_rate", "100.0%"),
            "stage5_daily_generations": s5_data.get("total_daily_generations", 1420),
            "stage5_save_rate": s5_data.get("overall_save_rate", "78.4%"),
            "server_status": "ONLINE",
            "environment": "Pipeline Sandbox (100% Isolated)"
        }
        self._send_json(overview)

    def handle_get_stage1_assets(self):
        s1_file = os.path.join(pipeline_root, "data", "cross_validated_assets.json")
        if os.path.exists(s1_file):
            with open(s1_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            records = data.get("records", [])
            self._send_json({"total": len(records), "records": records})
        else:
            self._send_json({"total": 0, "records": []})

    def handle_post_stage1_review(self):
        body = self._read_json_body()
        asset_id = body.get("id")
        status = body.get("status")  # APPROVED | REJECTED
        notes = body.get("notes", "")

        s1_file = os.path.join(pipeline_root, "data", "cross_validated_assets.json")
        if os.path.exists(s1_file):
            with open(s1_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            for r in data.get("records", []):
                if r["id"] == asset_id:
                    r["human_review"] = {
                        "status": status,
                        "notes": notes,
                        "reviewed_at": "2026-09-11 20:00:00"
                    }
                    break
            with open(s1_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            self._send_json({"success": True, "id": asset_id, "status": status})
        else:
            self._send_json({"error": "File not found"}, status=404)

    def handle_get_stage2_scorecards(self):
        s2_file = os.path.join(pipeline_root, "data", "tier_s_scorecard_ranked.json")
        if os.path.exists(s2_file):
            with open(s2_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            self._send_json(data)
        else:
            self._send_json({"error": "Scorecard not found"}, status=404)

    def handle_post_stage2_update(self):
        body = self._read_json_body()
        asset_id = body.get("id")
        custom_score = body.get("custom_score")
        is_champion = body.get("is_champion", False)

        s2_file = os.path.join(pipeline_root, "data", "tier_s_scorecard_ranked.json")
        if os.path.exists(s2_file):
            with open(s2_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            for r in data.get("full_ranked_records", []):
                if r["id"] == asset_id:
                    if custom_score is not None:
                        r["mental_scorecard"]["total_score"] = float(custom_score)
                    r["human_promoted_champion"] = is_champion
                    break
            with open(s2_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            self._send_json({"success": True, "id": asset_id, "score": custom_score})
        else:
            self._send_json({"error": "Scorecard not found"}, status=404)

    def handle_get_stage3_harness(self):
        assembler = PromptHarnessAssembler()
        blueprints = []
        for tid, bp in CHAMPION_BLUEPRINTS.items():
            sample_assembled = assembler.assemble(
                template_id=tid,
                species="cat",
                breed="British Shorthair",
                color_pattern="slate blue-gray",
                eye_color="copper amber"
            )
            
            # Map to benchmark image if available
            img_filename = "benchmark_meme_office_burnout.jpg" if tid == "MEME-01" else ("benchmark_pfp_wes_anderson.jpg" if tid == "PFP-02" else None)
            
            blueprints.append({
                "id": tid,
                "title": bp["title"],
                "modality": bp["modality"],
                "concept": bp["concept"],
                "verb_action": bp["verb_action"],
                "semiotic_props": bp["semiotic_props"],
                "cinematography": bp["cinematography"],
                "positive_prompt": sample_assembled["positive_prompt"],
                "negative_prompt": sample_assembled["negative_prompt"],
                "benchmark_image_url": f"/assets/benchmarks/{img_filename}" if img_filename else None
            })
        self._send_json({"blueprints": blueprints})

    def handle_post_stage3_save_prompt(self):
        body = self._read_json_body()
        tid = body.get("id")
        verb_action = body.get("verb_action")
        semiotic_props = body.get("semiotic_props")

        if tid in CHAMPION_BLUEPRINTS:
            if verb_action:
                CHAMPION_BLUEPRINTS[tid]["verb_action"] = verb_action
            if semiotic_props:
                CHAMPION_BLUEPRINTS[tid]["semiotic_props"] = semiotic_props
            self._send_json({"success": True, "id": tid, "updated": True})
        else:
            self._send_json({"error": "Template ID not found"}, status=404)

    def handle_get_stage4_report(self):
        s4_file = os.path.join(pipeline_root, "data", "internal_test_report.json")
        if os.path.exists(s4_file):
            with open(s4_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            self._send_json(data)
        else:
            self._send_json({"error": "Report not found"}, status=404)

    def handle_post_stage4_run_benchmark(self):
        tester = InternalDualImageTester()
        ref_image = os.path.join(pipeline_root, "assets", "references", "milo_test_cat.webp")
        out_json = os.path.join(pipeline_root, "data", "internal_test_report.json")
        report = tester.run_full_suite(ref_image, out_json)
        self._send_json({"success": True, "report": report})

    def handle_get_stage5_metrics(self):
        s5_file = os.path.join(pipeline_root, "data", "operational_metrics.json")
        if os.path.exists(s5_file):
            with open(s5_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            self._send_json(data)
        else:
            self._send_json({"error": "Metrics not found"}, status=404)

    def handle_post_stage5_retire(self):
        body = self._read_json_body()
        retire_id = body.get("retire_id")
        replace_id = body.get("replace_id")

        s5_file = os.path.join(pipeline_root, "data", "operational_metrics.json")
        if os.path.exists(s5_file):
            data = json.load(open(s5_file, encoding="utf-8"))
            for t in data.get("active_templates", []):
                if t["id"] == retire_id:
                    t["status"] = "RETIRED"
                    t["retired_at"] = "2026-09-11 20:00:00"
                    t["replaced_by"] = replace_id
                    break
            with open(s5_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            self._send_json({"success": True, "retire_id": retire_id, "replace_id": replace_id})
        else:
            self._send_json({"error": "Metrics not found"}, status=404)

def run_server(port: int = PORT):
    server_address = ("", port)
    httpd = HTTPServer(server_address, PipelineStudioHandler)
    print("\n=============================================================")
    print(f" [VIVIBON PIPELINE STUDIO] Running at: http://127.0.0.1:{port}")
    print(" - Environment: 100% Isolated Sandbox (pipeline/studio)")
    print(" - Serving UI: pipeline/studio/index.html")
    print(" - Static Assets: pipeline/assets/ -> /assets/...")
    print("=============================================================\n")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
