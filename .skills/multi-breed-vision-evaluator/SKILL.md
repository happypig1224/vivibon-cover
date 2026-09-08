---
name: multi-breed-vision-evaluator
description: >-
  ViviBon Cover dedicated multi-breed vision quality evaluator, pet Face ID preservation benchmark engineer, 
  and anatomical fidelity auditor.
  Employs DINOv2 (Meta AI) and CLIP (OpenAI) cosine embedding metrics to benchmark 20+ canine and feline breed archetypes,
  preventing breed drift, coat texture flattening, and facial hallucination across all 33 haute couture templates.
---

# Multi-Breed Vision Evaluator (全犬猫种视觉保真与评测基准专家)

> **Mission**: Guard the physical identity of every customer's beloved companion. Ensure that whether an owner uploads a purebred French Bulldog, a fluffy Samoyed, a jet-black Lab, a tortoiseshell cat, or a senior rescue mutt, the output retains **100% of their unique Face ID, bone structure, eye gaze, and fur markings**.
> **Scientific Grounding**: Grounded in Meta AI DINOv2 ViT-L/14 feature extraction, OpenAI CLIP ViT-L/14 image-to-image similarity, and computer vision animal morphometrics.

---

## 1. Quantitative Quality Gate & Acceptance Thresholds

Every AI output generated through Layer 3 must pass the automated **Layer 4 Quality Gate**:

```
[Original Uploaded Pet Face Crop (F_in)]      [Generated Portrait Pet Face Crop (F_out)]
               │                                                │
               ▼                                                ▼
     [DINOv2 ViT-L/14 Extractor]                      [DINOv2 ViT-L/14 Extractor]
               │                                                │
               ▼                                                ▼
     Embedding Vector V_in                            Embedding Vector V_out
               │                                                │
               └────────────────► [Cosine Similarity] ◄─────────┘
                                          │
                                          ▼
                                Cosine Score S = (V_in · V_out) / (|V_in| * |V_out|)
```

| Evaluation Tier | Metric / Tool | Pass Threshold | Trigger Action on Failure |
| :--- | :--- | :--- | :--- |
| **Face ID Preservation** | DINOv2 Cosine Similarity | $\mathbf{S \ge 0.72}$ | If $S < 0.72$, flag as "Breed Drift" and trigger automated retry with lower garment strength. |
| **Semantic Style Adherence** | CLIP Style Embedding | $\mathbf{S_{style} \ge 0.65}$ | If $S_{style} < 0.65$, costume lacks detail; enrich fabric prompts. |
| **Anatomical Integrity** | Edge/Contour Deformation Check | $\mathbf{\Delta_{\text{ears}} \le 12\%}$ | Reject outputs with missing ears, extra paws, or warped snouts. |
| **Luminance Contrast** | Grayscale Standard Deviation | $\mathbf{\sigma \ge 38}$ | Reject flat, underexposed, or washed-out outputs. |

---

## 2. Multi-Breed Benchmark Taxonomy (20 Target Archetypes)

To validate the robustness of the 33 templates, the system runs against a curated **100-image Golden Benchmark Suite** covering 5 anatomical clusters:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          20 Golden Pet Breed Archetypes                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Cluster A: Brachycephalic / Flat-Faced]                                         │
│  1. French Bulldog      2. Pug                3. Boston Terrier  4. Persian Cat │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Cluster B: Erect Ears & Pointed Muzzle]                                        │
│  5. Pembroke Welsh Corgi 6. Shiba Inu          7. German Shepherd 8. Siamese Cat │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Cluster C: Heavy Fur & Double Coat]                                            │
│  9. Samoyed             10. Golden Retriever   11. Maine Coon     12. Chow Chow │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Cluster D: Long Drooping Ears & Hound]                                         │
│  13. Beagle             14. Cavalier King Spaniel 15. Basset Hound 16. Dachshund│
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Cluster E: Extreme Pigmentation / Challenging Fur]                             │
│  17. Solid Black Lab/Cat 18. Pure White Maltese 19. Merle Australian 20. Sphynx │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Top 5 Breed Failure Modes & Prompt Engineering Defenses

### 3.1 Failure Mode 1: "Black Fur Crushing" (Solid Black Dogs & Cats)
- **Symptom**: Black Pugs, Labradors, and Bombay cats lose all facial features and collapse into an undifferentiated black silhouette.
- **Root Cause**: Diffusion models treat dark fur areas as low-information shadows.
- **Mitigation Directive**:
  ```text
  // Add to prompt physical segment 3:
  "delicate silvery studio rim lighting sculpting dark fur contours, specular highlights glinting off glossy black coat texture, visible facial definition, deep expressive warm amber eyes catching soft keylight."
  ```

### 3.2 Failure Mode 2: "Fluffy Fur Shaving" (Samoyeds, Maine Coons, Golden Retrievers)
- **Symptom**: Stiff tuxedo collars and neckwear artificially "shave" or flatten the voluminous natural chest ruff and neck mane.
- **Root Cause**: Garment bounding boxes default to slender human anatomy.
- **Mitigation Directive**:
  ```text
  // Add to prompt physical segment 1:
  "garment collar sits gently and naturally beneath the pet's voluminous fluffy chest ruff, allowing natural long fur to drape gracefully over the tailored lapels without trimming, flattening, or cropping the coat."
  ```

### 3.3 Failure Mode 3: "Ear Amputation & Compression" (Corgis, Frenchies, Rabbits)
- **Symptom**: Hats (e.g., in `witch` or `cowboy` templates) clip off upright bat-ears or flatten them forward.
- **Mitigation Directive**:
  ```text
  // Add to prompt physical segment 2:
  "miniature accessory positioned strictly between the ears, leaving both natural upright ears completely unobstructed, fully visible, and uncompressed."
  ```

### 3.4 Failure Mode 4: "Heterochromia & Gaze Hallucination" (Huskies, Odd-Eyed Cats)
- **Symptom**: One blue eye and one brown eye are standardized into two identical dark brown eyes.
- **Mitigation Directive**:
  ```text
  // Add to prompt physical segment 4:
  "Strictly maintain original eye color heterochromia, iris patterns, and natural pupil dilation exactly as seen in the source image."
  ```

### 3.5 Failure Mode 5: "Species Mutation" (Flat-Faced Pugs to Bulldogs, Mutts to Purebreds)
- **Symptom**: Model attempts to "idealize" a mixed-breed dog into a generic cartoon Golden Retriever.
- **Mitigation Directive**:
  ```text
  // Negative Prompt reinforcement:
  "wrong breed, pedigree regularization, cartoon animal, altered facial symmetry, modified skull shape, humanized snout."
  ```

---

## 4. Automated Python Benchmark Testing Harness

To verify that model prompt changes do not introduce regression, run the evaluation script:

```python
# Verification script reference: scratch/eval_breed_matrix.py
import torch
import numpy as np
from PIL import Image

def compute_dinov2_similarity(model, img_crop_ref, img_crop_gen):
    """
    Computes cosine similarity between reference pet face and generated pet face
    using Meta DINOv2 ViT-L/14.
    """
    with torch.no_grad():
        emb_ref = model(img_crop_ref)
        emb_gen = model(img_crop_gen)
        sim = torch.cosine_similarity(emb_ref, emb_gen).item()
    return sim

def assert_quality_gate(sim_score, threshold=0.72):
    if sim_score < threshold:
        raise ValueError(f"Face ID Drift Detected! Score {sim_score:.3f} < {threshold}")
    return True
```

---

## 5. Continuous Vision QA Checklist

- [ ] **100-Image Golden Suite Evaluated**: All prompt edits tested across the 20 archetype pet profiles.
- [ ] **Zero Ear-Clip Compliance**: Inspect hats/crowns on upright-ear breeds (`witch`, `cowboy`, `royal_monarch`).
- [ ] **Specular Catchlight Verified**: Ensure every pet's eyes feature natural circular or softbox light reflections (no "dead zombie eyes").
- [ ] **Whiskers & Fur Edge Fidelity**: Inspect the boundary where fur meets the garment; zero abrupt feathering or jagged alpha-cut artifacts.
