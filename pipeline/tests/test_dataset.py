"""
Tests for Pipeline Dataset Integrity and Quality Gate.
"""
import os
import json
import pytest

DATA_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "viral_pet_assets.json"))

def load_data():
    assert os.path.exists(DATA_FILE), f"Dataset file does not exist: {DATA_FILE}"
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def test_dataset_structure():
    data = load_data()
    assert data.get("schema_version") == "2.0.0-GLOBAL-PROD"
    assert data.get("total_records") == 24
    assert data.get("target_market") is not None
    assert len(data.get("records", [])) == 24


def test_record_completeness():
    data = load_data()
    records = data.get("records", [])
    seen_ids = set()

    for r in records:
        # ID check
        assert r["id"] not in seen_ids, f"Duplicate ID: {r['id']}"
        seen_ids.add(r["id"])
        
        # Modality check
        assert r["modality"] in ["Avatar-1:1", "Meme-1:1"]
        
        # Engagement Signals check (> 5,000 threshold)
        signals = r["engagement_signals"]
        assert signals["platform_likes"] >= 5000, f"Likes too low in {r['id']}"
        assert len(signals["target_demographic"]) > 0
        assert len(signals["social_currency_type"]) > 0
        
        # Visual Specs
        specs = r["visual_specs"]
        assert "1:1" in specs["composition_ratio"]
        
        # Semiotics & Emotion
        assert len(r["semiotic_props"]) >= 1
        assert len(r["projected_emotion"]) > 0
        
        # Prompt & Negative
        assert "[PET]" in r["prompt_seed"]
        assert "human" in r["negative_prompt"].lower()
        
        # Triggers
        assert len(r["trigger_scenarios"]) >= 2

if __name__ == "__main__":
    test_dataset_structure()
    test_record_completeness()
    print("All dataset tests passed successfully!")
