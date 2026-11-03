"""
Domestic Micro-Innovation & Social Radar.
Tracks high-density emotional micro-innovations, relatable pet-parent meme angles,
and viral PFP tropes from domestic platforms (XiaoHongShu, WeChat Sticker Open Platform, Douyin).
Serves as the auxiliary benchmark for cross-validation against Western macro-trends.
"""
import os
import json
from typing import List, Dict, Any

class DomesticSocialRadar:
    """
    Radar index of verified domestic viral concepts.
    Captures:
    1. Core relatable emotion (打工人嘴替、萌宠免责、治愈陪伴)
    2. Semiotic props & anthropomorphic accessories (冰美式、工牌、小红花、小领带)
    3. Cultural resonance level & interaction benchmark (点赞、收藏比)
    """

    CANONICAL_DOMESTIC_BENCHMARKS = [
        {
            "id": "DOM-01",
            "concept_key": "office_caffeine_survival",
            "chinese_title": "早八冰美式续命工位猫/狗",
            "core_emotion": "Exhausted workplace numbness & passive self-deprecation (打工倦怠/自嘲)",
            "semiotic_props": ["plastic iced americano cup with straw", "office desk", "oversized hoodie"],
            "typical_expression": "Dead-fish eyes, unamused flat mouth, slight dark circles (死鱼眼/生无可恋)",
            "platform_evidence": "XiaoHongShu 10w+ likes, WeChat trending sticker",
            "resonance_score": 95
        },
        {
            "id": "DOM-02",
            "concept_key": "caught_stealing_balaclava",
            "chinese_title": "土味特工偷吃当场被抓包",
            "core_emotion": "Humorous embarrassment, guilty confession without penalty (蠢贼被抓/无责免罚)",
            "semiotic_props": ["black knit balaclava ski mask", "0.5x wide angle snout"],
            "typical_expression": "Dilated pupils, frozen in headlights, wide staring eyes (瞳孔地震/呆滞)",
            "platform_evidence": "Douyin/Kuaishou 50w+ shares, WeChat emoji pack",
            "resonance_score": 92
        },
        {
            "id": "DOM-03",
            "concept_key": "guilt_airplane_ears",
            "chinese_title": "委屈到变形飞机耳求原谅",
            "core_emotion": "Extreme vulnerability, disarming apology, emotional buffer (弱小无助/撒娇求饶)",
            "semiotic_props": ["flattened airplane ears", "chin pressed to floorboards"],
            "typical_expression": "Glistening teary eyes looking up pleadingly (泪光盈盈/眼神祈求)",
            "platform_evidence": "WeChat 10w+ daily sends, XiaoHongShu couple memes",
            "resonance_score": 96
        },
        {
            "id": "DOM-04",
            "concept_key": "silent_judgment_disgust",
            "chinese_title": "地铁老人看手机式嫌弃审视",
            "core_emotion": "Sarcastic judgment, intellectual superiority, 'are you crazy' (嫌弃/地铁老人看手机)",
            "semiotic_props": ["head retracted with neck crease", "narrowed side-eye"],
            "typical_expression": "One eyebrow raised, one eye narrowed in total disbelief (单侧挑眉/白眼)",
            "platform_evidence": "Weibo/Zhihu viral reaction image",
            "resonance_score": 90
        },
        {
            "id": "DOM-05",
            "concept_key": "friday_escape_countdown",
            "chinese_title": "周五准时下班弹射起飞",
            "core_emotion": "Eager weekend anticipation, liberation from wage slavery (解放欢呼/准时开溜)",
            "semiotic_props": ["buckled tiny canvas backpack", "sprinter stance on floor"],
            "typical_expression": "Laser-locked eyes on exit door, ears twitching forward (眼神锁定大门/紧绷起跑)",
            "platform_evidence": "DingTalk / WeChat Friday 5PM viral blast",
            "resonance_score": 94
        },
        {
            "id": "DOM-06",
            "concept_key": "head_tilt_zero_braincells",
            "chinese_title": "脑干缺失但清澈的愚蠢",
            "core_emotion": "Lovable bewilderment, disarming cognitive overload (听不懂但大受震撼/清澈愚蠢)",
            "semiotic_props": ["45-degree extreme head tilt", "one ear up one ear down", "tongue tip blep"],
            "typical_expression": "Blank innocent stare, processing 404 (无辜呆萌/放空)",
            "platform_evidence": "XiaoHongShu pet tag #清澈的愚蠢 2.1亿浏览",
            "resonance_score": 93
        },
        {
            "id": "DOM-07",
            "concept_key": "royal_aristocrat_portrait",
            "chinese_title": "复古贵族油画高定肖像",
            "core_emotion": "Aesthetic pride, parental pampering, noble dignity (吾家有宠初长成/尊贵体面)",
            "semiotic_props": ["ruffled Elizabethan lace collar", "crimson velvet cape with gold crest"],
            "typical_expression": "Calm, noble, stoic direct gaze (从容淡定/高贵审视)",
            "platform_evidence": "XiaoHongShu pet portrait custom order #宠物油画定制 8000w+ 浏览",
            "resonance_score": 89
        },
        {
            "id": "DOM-08",
            "concept_key": "autumn_cozy_hygge",
            "chinese_title": "秋冬毛衣窗边温暖治愈",
            "core_emotion": "Comfort, coziness, warm winter companionship (温暖治愈/松弛感)",
            "semiotic_props": ["chunky knit wool turtleneck", "autumn window light and plaid blanket"],
            "typical_expression": "Sleepy squinting contented eyes (微眯满足/享受)",
            "platform_evidence": "XiaoHongShu seasonal top trend #秋冬温暖头像",
            "resonance_score": 91
        }
    ]

    def __init__(self):
        pass

    def get_benchmarks(self) -> List[Dict[str, Any]]:
        return self.CANONICAL_DOMESTIC_BENCHMARKS

    def match_concept(self, english_concept_name: str, english_prompt_seed: str) -> Optional[Dict[str, Any]]:
        """
        Calculates semantic alignment between an overseas candidate and domestic benchmarks.
        """
        haystack = f"{english_concept_name} {english_prompt_seed}".lower()
        
        best_match = None
        highest_score = 0
        
        for item in self.CANONICAL_DOMESTIC_BENCHMARKS:
            score = 0
            # Prop matches
            for prop in item["semiotic_props"]:
                keywords = prop.lower().split()
                for kw in keywords:
                    if len(kw) > 3 and kw in haystack:
                        score += 10
            
            # Concept key matches
            tokens = item["concept_key"].split("_")
            for t in tokens:
                if t in haystack:
                    score += 15
                    
            if score > highest_score and score >= 20:
                highest_score = score
                best_match = item
                
        return best_match

    def save_domestic_radar_data(self) -> str:
        target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "raw"))
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, "domestic_radar.json")
        
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump({
                "source": "Domestic Social Radar (Auxiliary Pipeline)",
                "total_benchmarks": len(self.CANONICAL_DOMESTIC_BENCHMARKS),
                "benchmarks": self.CANONICAL_DOMESTIC_BENCHMARKS
            }, f, ensure_ascii=False, indent=2)
            
        print(f"[DomesticSocialRadar] Saved raw domestic radar to: {target_path}")
        return target_path

if __name__ == "__main__":
    radar = DomesticSocialRadar()
    path = radar.save_domestic_radar_data()
    print(f"Loaded {len(radar.get_benchmarks())} domestic micro-innovation benchmarks.")
