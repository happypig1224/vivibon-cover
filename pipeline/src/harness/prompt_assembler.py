"""
Production Verb-Object Prompt Harness Assembler.
Reverse-engineers and synthesizes robust prompt blueprints for ViviBon Cover templates.

Architectural Guarantees:
- NC-1 Compliant: Zero text, zero watermark, zero commercial artifacts in rendered prompts
- NC-6 Compliant: Sanitizes user pet input to prevent prompt injection
- High Biometric Fidelity: Anchors species, fur pattern, and eye coloration slots
- Precise Verb-Object Staging: Action verbs dictate clear physical relationships with semiotic props
"""
import re
from typing import Dict, Any, Optional

# Top 6 Champion Blueprints from Stage 2 Mental Model Scorecard
CHAMPION_BLUEPRINTS = {
    "MEME-01": {
        "id": "MEME-01",
        "modality": "Meme-1:1",
        "title": "This Meeting Could've Been An Email",
        "concept": "Corporate Exhaustion & Lukewarm Coffee",
        "verb_action": "slumped wearily over a messy office desk, paw limp around a half-empty ceramic coffee mug, blinking heavy glazed eyes with prominent dark circles",
        "semiotic_props": "tilted miniature employee lanyard, scattered sticky notes, glowing laptop edge, ceramic mug",
        "cinematography": "intimate 50mm portrait lens, cool fluorescent office light mixed with warm desk lamp spill, cinematic shallow depth of field",
        "emotion": "soul-crushing corporate dread, hilariously relatable burnout, blank stare into void",
        "negative": "human hands, extra fingers, deformed limbs, text, letters, watermarks, logo, cartoonish 3d plastic, blurry, oversaturated"
    },
    "MEME-04": {
        "id": "MEME-04",
        "modality": "Meme-1:1",
        "title": "Chief Nap Officer / WFH Slacker",
        "concept": "Work-From-Home Slacking & Liquid Posture",
        "verb_action": "dramatically melted across a velvet ergonomic office chair, chin resting lazily on the armrest, wearing a miniature crooked silk necktie, paws dangling limp in utter bliss",
        "semiotic_props": "crooked miniature silk necktie, soft ergonomic swivel chair, blurred dual monitors in background",
        "cinematography": "low-angle 45mm lens, soft afternoon golden hour light filtering through blinds, warm dust motes, rich textures",
        "emotion": "supreme unbothered sloth, unapologetic mid-day nap, comic corporate detachment",
        "negative": "human hands, extra paws, distorted anatomy, text, watermark, logo, stiff pose, harsh shadows, grainy"
    },
    "MEME-10": {
        "id": "MEME-10",
        "modality": "Meme-1:1",
        "title": "Unhinged 3 AM Zoomies Panic",
        "concept": "Midnight Manic Burst & Dilated Pupils",
        "verb_action": "frozen mid-scramble in a sudden burst of midnight hysteria, pupils dilated to massive glossy black obsidian spheres, whiskers trembling forward, back slightly arched in ecstatic manic tension",
        "semiotic_props": "rumpled bed sheets, dark hallway perspective, subtle motion blur on trailing tail tip",
        "cinematography": "dynamic wide 35mm lens, dramatic chiaroscuro low-key lighting, ambient moonlight through window with stark edge rim light",
        "emotion": "unhinged demonic zoomies shock, pure raw nocturnal chaos, bewilderment",
        "negative": "human hands, calm pose, bright sunny day, extra limbs, cartoon 3d, text, watermark, logo, muddy details"
    },
    "MEME-08": {
        "id": "MEME-08",
        "modality": "Meme-1:1",
        "title": "The Guilt Trip: Please Forgive Me",
        "concept": "Airplane Ears & Pleading Remorse",
        "verb_action": "flattened completely flat against hardwood floor in profound guilty remorse, ears pinned horizontally in extreme aerodynamic airplane posture, chin pressed flat onto the planks, liquid glossy eyes gazing upward with glistening teary reflections",
        "semiotic_props": "slightly displaced couch pillow edge, soft reflection on polished oak floorboards",
        "cinematography": "high-angle perspective looking down from human standing height, soft diffused ambient indoor lighting, sharp focus on glistening eyes with soft falloff",
        "emotion": "pitiful disarming remorse, irresistible cuteness, pleading for immediate pardon",
        "negative": "human hands, aggressive posture, standing proud, alert ears, angry scowl, cartoon 3d, text, watermark"
    },
    "MEME-02": {
        "id": "MEME-02",
        "modality": "Meme-1:1",
        "title": "Caught in 4K Ski-Mask Burglar",
        "concept": "Midnight Snack Heist & Caught Red-Handed",
        "verb_action": "caught frozen in bright flashlight beam inside pantry, wearing an adorable tiny black knitted ski-mask with ear cutouts, whiskers smeared with strawberry jam crumbs, paws frozen mid-air clutching open snack wrapper",
        "semiotic_props": "tiny black knit burglar beanie/ski-mask, open pantry shelf background, strawberry jam crumb specks",
        "cinematography": "high-contrast direct flashlight beam lighting, dark atmospheric pantry surroundings, crisp macro detail on whiskers and crumbs",
        "emotion": "caught red-handed guilty shock, blank innocent stare, comedic criminal drama",
        "negative": "human hands, scary violent theme, text, watermark, blurry, deformed limbs, plastic 3d"
    },
    "PFP-02": {
        "id": "PFP-02",
        "modality": "Avatar-1:1",
        "title": "Wes Anderson Pastel Symmetry",
        "concept": "Pastel Cinematic Elegance & Deadpan Perfection",
        "verb_action": "seated in absolute dead-center geometric symmetry, perfectly upright noble posture, wearing a bespoke tailored mustard-yellow velvet collar over a sage-green pastel wool coat, looking directly into camera with deadpan intellectual dignity",
        "semiotic_props": "tailored miniature pastel coat, velvet lapel, perfectly centered vintage pastel wallpaper background",
        "cinematography": "meticulously centered 85mm prime lens, flat even softbox studio lighting, 1970s Technicolor vintage Kodachrome color grading, razor-sharp symmetry",
        "emotion": "deadpan cinematic dignity, aristocratic quiet luxury, refined eccentric perfection",
        "negative": "asymmetrical framing, candid crooked angle, messy background, text, watermark, human limbs, oversaturated digital glow"
    }
}

class PromptHarnessAssembler:
    """
    Compiles production-ready prompts from template blueprints and pet biometric inputs.
    """
    
    @staticmethod
    def sanitize_input(user_input: str) -> str:
        """
        Cleanses input to protect against prompt injection and ensures pure descriptors (NC-6).
        """
        if not user_input:
            return ""
        # Strip system instruction tokens, brackets, curly braces, and control characters
        cleaned = re.sub(r'[\r\n\t\{\}\[\]\<\>\;\|\`\$\\]', ' ', user_input)
        # Limit to safe alphanumeric and common punctuation
        cleaned = re.sub(r'[^a-zA-Z0-9\s\,\.\-\'\"]', '', cleaned)
        return " ".join(cleaned.split())[:120]

    def assemble(
        self,
        template_id: str,
        species: str = "pet",
        breed: Optional[str] = None,
        color_pattern: Optional[str] = None,
        eye_color: Optional[str] = None,
        distinctive_features: Optional[str] = None
    ) -> Dict[str, str]:
        """
        Synthesizes positive and negative prompts for a specific template and pet.
        """
        if template_id not in CHAMPION_BLUEPRINTS:
            raise ValueError(f"Unknown template ID: {template_id}. Must be one of {list(CHAMPION_BLUEPRINTS.keys())}")
            
        blueprint = CHAMPION_BLUEPRINTS[template_id]
        
        # 1. Build Pet Subject Anchor
        safe_species = self.sanitize_input(species) or "pet"
        safe_breed = self.sanitize_input(breed) if breed else ""
        safe_pattern = self.sanitize_input(color_pattern) if color_pattern else ""
        safe_eyes = self.sanitize_input(eye_color) if eye_color else ""
        safe_features = self.sanitize_input(distinctive_features) if distinctive_features else ""
        
        # Combine subject descriptors
        subject_parts = []
        if safe_pattern:
            subject_parts.append(safe_pattern)
        if safe_breed:
            subject_parts.append(safe_breed)
        else:
            subject_parts.append(safe_species)
            
        if safe_eyes:
            subject_parts.append(f"with striking {safe_eyes} eyes")
        if safe_features:
            subject_parts.append(f"({safe_features})")
            
        pet_subject = " ".join(subject_parts)
        
        # 2. Assemble Master Positive Prompt (Verb-Object Harness)
        positive_prompt = (
            f"Masterpiece 1:1 professional portrait of a {pet_subject}, "
            f"{blueprint['verb_action']}. "
            f"Adorned with {blueprint['semiotic_props']}. "
            f"Atmosphere: {blueprint['emotion']}. "
            f"Cinematography: {blueprint['cinematography']}, award-winning national geographic wildlife photography, "
            f"hyper-detailed fur texture, glistening eye reflections, 8k resolution, authentic optical depth of field."
        )
        
        # 3. Assemble Master Negative Prompt
        negative_prompt = (
            f"{blueprint['negative']}, "
            f"worst quality, low quality, normal quality, lowres, bad anatomy, bad proportions, "
            f"extra limbs, extra ears, cloned face, mutated paws, text, signature, watermark, username"
        )
        
        return {
            "template_id": template_id,
            "title": blueprint["title"],
            "modality": blueprint["modality"],
            "positive_prompt": positive_prompt,
            "negative_prompt": negative_prompt,
            "verb_action": blueprint["verb_action"],
            "semiotic_props": blueprint["semiotic_props"],
            "cinematography": blueprint["cinematography"]
        }

if __name__ == "__main__":
    assembler = PromptHarnessAssembler()
    sample = assembler.assemble(
        template_id="MEME-01",
        species="cat",
        breed="ginger tabby cat",
        color_pattern="orange striped",
        eye_color="amber hazel",
        distinctive_features="white bib chest"
    )
    print("--- Sample Assembled Prompt ---")
    print("Template:", sample["title"])
    print("Positive:", sample["positive_prompt"])
    print("Negative:", sample["negative_prompt"])
