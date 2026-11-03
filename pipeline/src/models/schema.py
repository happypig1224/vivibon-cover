"""
Pipeline Data Schema & Types.
Defines strict contract for viral pet assets and mental model evaluation scores.
"""
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field, asdict

@dataclass
class EngagementSignals:
    platform_likes: int
    shares: int
    target_demographic: str
    social_currency_type: str

@dataclass
class VisualSpecs:
    camera_shot: str
    lighting: str
    composition_ratio: str
    background: str

@dataclass
class CrossValidationResult:
    cv_score: float
    tier: str  # "Tier-S: Global Universal Hit" | "Tier-A: Western Cultural Anchor" | "Tier-B: Regional Localized"
    priority: str
    score_breakdown: Dict[str, float]
    matched_domestic_resonance: str
    validation_rationale: str

@dataclass
class MentalModelScorecard:
    total_score: float  # 0 - 100
    social_currency: float  # Max 40
    reproduction_feasibility: float  # Max 30
    emotional_depth: float  # Max 30
    dimension_breakdown: Dict[str, float]
    production_recommendation: str  # "S+ Rank - Production Launch Champion" | "S Rank - Priority Batch 2"
    key_conversion_hook: str

@dataclass
class ViralAsset:
    id: str
    modality: str  # "Avatar-1:1" | "Meme-1:1"
    title: str
    concept_name: str
    source_platform: str
    engagement_signals: EngagementSignals
    visual_specs: VisualSpecs
    semiotic_props: List[str]
    projected_emotion: str
    prompt_seed: str
    negative_prompt: str
    trigger_scenarios: List[str]
    golden_reference_url: Optional[str] = None
    cross_validation: Optional[CrossValidationResult] = None
    mental_scorecard: Optional[MentalModelScorecard] = None

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

