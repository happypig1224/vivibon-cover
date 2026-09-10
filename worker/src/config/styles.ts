import {
  StyleConfig,
  StyleKey,
  CoreThemeKey,
  CapsuleVariant,
  CascadingTheme,
  CascadingSubCategory,
  CascadingItem,
  AssembledPromptResult
} from '../types/env';


export const IDENTITY_ANCHOR =
  'Dress the EXACT SAME pet from the input image from the neck and shoulders down. Strictly preserve the original pet\'s facial structure, eyes, snout geometry, ear shape and position, native fur coloration, distinctive markings, body proportions and age 100% unchanged. Strict quadruped anatomical law: The subject is a 100% pure animal pet. All visible front limbs must terminate solely in authentic, fluffy animal paws with species-correct fur and soft paw pads. Strictly and absolutely NO human arms, NO human hands, NO human fingers, NO human thumbs, NO opposable thumbs, NO fingernails, NO human skin or flesh, NO human wrists, NO human joints, NO hybrid chimera anatomy. Both animal paws must rest naturally and flat on surfaces. Absolutely NO person or human body parts in frame, NO hands holding cameras, NO hands holding phones, NO hands holding cups, NO selfie sticks. Unmasked face, head and eyes fully visible and natural, non-distorted.';

export const STUDIO_FINISH =
  'Hyperdetailed, 8k resolution, cinematic lighting, sharp focus on pet eyes, rich vibrant natural color grading, high dynamic range, glossy fur highlights, deep warm studio lighting, masterpiece quality, no text, no logo, award-winning composition.';

export const NEGATIVE_PROMPT =
  'human hand, human hands, human fingers, human thumb, human palm, fingernails, human wrist, human skin, human arms, human body, person holding camera, person holding phone, human hand holding phone, taking selfie, smartphone in hand, hand reaching into frame, selfie stick, person in photo, human taking picture, chimera, hybrid human-animal, anthropomorphic hands, furry hands, human hands on pet, human arms on pet, bare skin, fleshy fingers, knuckles, second pet, other animals, duplicate subject, breed change, facial change, fur color change, marking change, eye asymmetry, strabismus, clothes clipping, accessories clipping, distorted anatomy, warped snout, deformed eyes, extra legs, missing legs, extra paws, fused limbs, severed limbs, blurry, low quality, noisy, jpeg artifacts, text, typography, letters, watermark, signature, logo, brand name, cartoon, 3D render, CGI doll, monochrome, black and white, grayscale, desaturated, dull colors, washed out, low contrast, hazy, dim, underexposed, dark muddy shadows, plastic texture, human cleavage, bare skin, naked, nude, bikini, erotic, suggestive, extra fingers, deformed paws.';

/**
 * Robust sanitization for pet name on Canvas typography (NC-6 & NC-11)
 * Strips HTML tags, prompt injection tokens, and NSFW/offensive slurs
 */
export function sanitizePetName(input?: string): string {
  if (!input) return 'Milo';
  const trimmed = input.trim();
  if (!trimmed) return 'Milo';

  // High-risk prompt injection and NSFW offensive slur filter
  const forbiddenPatterns = [
    /nude|naked|porn|nsfw|erotic|sexy|sex|dick|pussy|vagina|penis|boobs|breast|cleavage/i,
    /bitch|fuck|fck|shit|ass|asshole|whore|slut/i,
    /kill|murder|suicide|death|terrorist|nazi|hitler/i,
    /system\s*prompt|ignore\s*previous\s*instructions|ignore\s*all\s*instructions|developer\s*mode|prompt\s*injection/i,
    /<script|javascript:|data:/i
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(trimmed)) {
      return 'Milo';
    }
  }

  // Sanitize characters: allow alphanumeric, CJK characters, spaces, and safe punctuation (. - _ & ' ❤️)
  const cleaned = trimmed.replace(/[^\p{L}\p{N}\s.\-_&'❤️]/gu, '').trim();
  if (!cleaned || cleaned.length === 0) return 'Milo';
  return cleaned.slice(0, 24); // max 24 chars for typography layout
}


function makeItem(
  id: string,
  nameZh: string,
  nameEn: string,
  badge: string,
  wardrobePrompt: string,
  sampleImageUrl?: string,
  exclusiveNegativePrompt?: string
): CascadingItem {
  return {
    id,
    nameZh,
    nameEn,
    badge,
    wardrobePrompt,
    fullPrompt: `${wardrobePrompt} ${IDENTITY_ANCHOR} ${STUDIO_FINISH}`,
    sampleImageUrl,
    exclusiveNegativePrompt
  };
}

// ----------------------------------------------------------------------
// 1. FINE_ART (艺术流派)
// ----------------------------------------------------------------------
export const FINE_ART_TEMPLATES: CascadingItem[] = [
  makeItem(
    'mona_lisa',
    '复刻《蒙娜丽莎》古典油画',
    'The Mona Lisa Smile',
    '文艺复兴',
    "A masterwork classical Renaissance oil painting in the style of Leonardo da Vinci's Mona Lisa, starring the specific pet from Photo 1. Meticulously preserve the pet's exact facial structure, eye shape, pupil color, whisker placement, and native fur coloration and markings. The pet has soft dark waves of fur framing its face like the iconic Mona Lisa silhouette. Sitting in a classic 3/4 turn pose, gazing serenely forward with a subtle enigmatic smile. Dressed in the authentic dark olive-green pleated Renaissance velvet gown with gold embroidery. Both front legs end in natural furry paws folded gracefully in its lap. Sfumato soft chiaroscuro lighting, warm golden-brown undertones, misty river and mountain landscape in background, realistic antique oil painting canvas craquelure texture.",
    'models/mona_lisa.png',
    'human ears, ears hidden inside wig, wig covering eyes, wig covering snout, front legs stretched into human arms, human fingers, human hands, human neck, human skin exposed, fused paws, long robe penetrating body'
  ),
  makeItem(
    'pearl_earring',
    '《戴珍珠耳环的少女》古典肖像',
    'Girl with a Pearl Earring',
    '荷兰黄金时代',
    "A classical 17th-century Dutch Golden Age master oil painting in the exact iconic composition and posture of Johannes Vermeer's Girl with a Pearl Earring, featuring the specific pet from Photo 1. Meticulously preserve the pet's authentic facial identity, fur pattern, snout geometry, and luminous eye color. The pet's body is positioned in a strict side profile facing away to the right, turning its head back over its left shoulder to look directly at the viewer with an enigmatic gaze, exactly matching the 3/4 Vermeer pose. Wearing an iconic ultramarine blue and gold silk turban wrapped gracefully around its head, with a single large luminous teardrop pearl earring catchlight beside its left ear. Dressed in a muted golden-ochre Dutch wool coat with long full sleeves that completely cover its body and shoulders down to the chest, with a crisp, closed high white inner collar cleanly wrapping the neck. Absolutely NO exposed paws, NO bare arms, NO open chest, NO V-neck. Deep dramatic chiaroscuro with a pure dark void background, delicate directional raking light sculpting the side of the face and glistening on the pearl, rich craquelure oil painting glaze texture.",
    'models/pearl_earring.png',
    'visible pet ears, human ears, two or more pearls, pearl penetrating skin, pearl penetrating turban, turban flattening skull, turban covering eyes, distorted neck, human neck, human collarbone, exposed human skin, bare arms, bare paws, exposed paws, uncovered paws, bare fur on torso, open chest, deep V-neck, frontal pose, facing front, symmetrical shoulders, casual clothes'
  ),
  makeItem(
    'line_art',
    '大师级手绘速写研究本',
    "Master's Sketchbook Study",
    '手绘速写',
    "A masterclass sketchbook study page titled 'Study of My Pet', featuring the exact pet from Photo 1. Meticulously preserve the pet's distinct facial anatomy, fur markings, and gaze. The page displays 4 to 5 detailed sketches of the pet's head from varying angles (frontal, 3/4 profile, slight tilt) arranged dynamically across the aged ivory drawing paper. Rendered in delicate graphite pencil cross-hatching combined with soft warm watercolor washes. Scattered with faint vintage cursive architectural studio notes and anatomical sketches in the margins. Authentic artist sketchbook paper grain, expressive unfinished edge strokes, high-end fine art drawing aesthetic.",
    'models/line_art.png',
    'realistic pencil sketch, colorful, gray gradient, smooth vector lines, 3D render, solid black fill, busy background, cropped subject, typography covering subject, long text, gibberish letters, misspelled words, over-stylized unrecognizable cartoon'
  )
];

// ----------------------------------------------------------------------
// 2. CORPORATE (职场打工与真实生活切面)
// ----------------------------------------------------------------------
export const CORPORATE_TEMPLATES: CascadingItem[] = [
  makeItem(
    'coffee_pro',
    '早八打工摸鱼狗',
    'Daily Life of a 9-to-5 Working Pet',
    '打工日常',
    "A humorous, hyperrealistic workplace documentary portrait of the specific pet from Photo 1, themed Daily Life of a 9-to-5 Working Pet. Shot from a third-person perspective with an 85mm portrait lens, eye-level with the pet at its office workstation. The pet sits comfortably upright on an office chair. Both of its natural furry animal paws with soft pink pads are resting flat on the clean white desk surface in front of a keyboard. On the desk directly in front of the pet sits a clear plastic takeaway cup filled with iced Americano coffee and ice cubes, with a white drinking straw near the pet's muzzle. The pet wears a snug, dark chocolate brown ribbed knit turtleneck sweater with clean cuffs around its furry ankles. Around its neck hangs a realistic acrylic corporate employee badge on a blue lanyard with legible text 'Professional Slacker'. In the background, an authentic modern open-plan office with soft out-of-focus computer screens, colorful sticky notes, and warm indoor office lighting. Pure animal anatomy, natural glossy fur, expressive comedic tired expression. Absolutely no human hands or smartphones in frame.",
    'models/caffeine_pro.png',
    'smartphone, mobile phone, cell phone, holding phone, phone held by hand, taking selfie, selfie pose, arm reaching toward camera, human hand, human fingers, human thumb, opposable thumb, human palm, fingernails, human wrist, human arm, human skin, chimera, half-human, hybrid hands, hands holding cup, coffee spilled on fur, pet drinking hot coffee, dislocated paws'
  ),
  makeItem(
    'airline_captain',
    '顶级民航机长',
    'The Airline Captain',
    '民航机长',
    "Extreme close-up fisheye lens perspective (GoPro style) with dramatic barrel distortion, humorous meme-avatar aesthetic. A detailed close-up portrait of the specific pet from the uploaded reference image, reimagined as a veteran pilot, meticulously preserving the unique facial structure, fur pattern, color, and eye color from the reference. The pet is wearing vintage aviator goggles pushed up on its head, and a secure black tactical flight harness/vest with silver buckles over its fur, sitting in the pilot's seat and looking directly at the camera with a stoic expression. Both front limbs are natural furry paws resting calmly on the seat armrests. Crucially, the scene is grounded inside a complex aircraft cockpit. The extreme fisheye perspective captures the detailed instrument panel, switches, and screens of the cockpit. Viewed through the cockpit windows, there is absolutely NO sky or clouds; instead, the view shows the concrete of an airport tarmac (ground asphalt), ground service equipment, and parked planes, all distorted by the wide lens. The cockpit interior lighting is detailed, with lights reflecting on the goggle lenses.",
    'models/airline_captain.png',
    'human arms, human body, human fingers, human hands, human thumb, opposable thumb, person holding controls, distorted dials, high altitude sky, clouds in window, flying in sky, dislocated paws, cartoon, 3d render, blurry, distorted face, changing pet identity'
  ),
  makeItem(
    'michelin_chef',
    '宠物大厨做饭日常',
    'The Michelin Executive Chef',
    '米其林主厨',
    "A delightful, viral comedic portrait of the specific pet from Photo 1 as an executive chef. Meticulously preserve the pet's authentic facial identity, realistic fur texture, whisker details, and eye color from Photo 1. The pet stands at a clean wooden kitchen prep counter wearing a tall puffy white pleated chef toque hat on its head and a crisp beige-and-brown checkered kitchen apron tied snugly around its chest. Both of its front paws are authentic furry animal paws resting flat and neatly on the cutting board beside a miniature stainless steel pan and a tiny silicone spatula. Minimalist warm restaurant kitchen studio background with soft warm lighting. Photorealistic pet fur, delightful meme avatar aesthetic. Absolutely no human hands, no human arms, no flesh-toned appendages.",
    'models/michelin_chef.png',
    'realistic human fingers, realistic human arms, human hands, human thumbs, fleshy hands, human skin, hairy arms, furry paws holding spatula, dirty apron, grease stains, dark gloomy messy kitchen, burning stove, chef hat covering eyes, hat swallowing ears, hat piercing skull, deformed hands'
  )
];

// ----------------------------------------------------------------------
// 3. COSPLAY (角色扮演)
// ----------------------------------------------------------------------
export const COSPLAY_TEMPLATES: CascadingItem[] = [
  makeItem(
    'assumption_of_mary',
    '巴洛克《圣母升天》古典名画',
    'The Assumption of the Virgin',
    '神圣升天',
    "A dramatic Baroque religious classical oil painting in the style of Titian and Peter Paul Rubens' The Assumption of the Virgin, starring the specific pet from Photo 1. Meticulously preserve the pet's authentic facial features, fur markings, and eye color. The pet is the divine protagonist, ascending gracefully toward heaven on glowing golden clouds, draped in billowing crimson and white silk robes. Both furry paws are raised outward in divine blessing. Overhead radiates a magnificent golden heavenly halo and light rays. Choirs of cherubs and putti flutter admiringly in the misty skies around it. Below, reverent disciples gaze upward in awe. Dramatic chiaroscuro, rich red and gold oil palette, craquelure canvas texture.",
    'models/assumption_of_mary.png',
    'human body on pet, human head on pet, pet with human arms, pet with human fingers, human hands, human fingers, human wrists, human skin, human elbows, five fingers, plain background, studio backdrop, pet face distorted, halo piercing skull, deformed paws'
  ),
  makeItem(
    'caribbean_pirate',
    '加勒比海盗船长',
    'Pirates of the Caribbean',
    '传奇海盗',
    "A detailed cinematic film still of the specific pet from the uploaded reference image, perfectly maintaining its facial features, fur pattern, muzzle shape, and intense eye color. The pet is depicted as a ruthless pirate captain in a dramatic medium close-up shot. It wears a large, detailed, weathered crimson-red pirate tricorne hat with gold trim and a prominent white skull and crossbones emblem (Jolly Roger) on the front, identical to the style in the reference image. Crucially, the pet's expression, while rugged and experienced, is now marked by an intense, steely grimace, its gaze slightly narrowed and piercing, looking directly forward with unmistakable determination and authority. The context is a major naval battle during the golden age of piracy. The pet stands on the quarterdeck of a pirate ship, with background cannon smoke and distant burning ships across dark water under a moody, golden hour sunset sky. The entire scene is bathed in dramatic theatrical lighting, mixing warm sunset hues with fiery orange highlights against weathered wood. Both paws are natural animal paws resting on the ship railing. Absolutely no human arms, no human hands. Cinematic depth of field, high-fidelity textures, epic adventure film style.",
    'models/caribbean_pirate.png',
    'human hands, human arms, human fingers, human thumb, opposable thumb, human wrist, human skin, person holding camera, taking selfie, text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, human body, human face, extra limbs'
  ),
  makeItem(
    'secret_agent',
    '宠物笨贼/土味特工',
    'The Secret Agent',
    '土味特工',
    "A hilarious viral 0.5x ultra-wide fisheye snapshot of the specific pet from Photo 1 caught in the act as a comical burglar. The camera is positioned extremely close below the pet's face, dramatically magnifying its wet black snout and twitching whiskers with funny barrel distortion. The pet wears a tight black ribbed knit balaclava ski mask with cutouts revealing its wide, stunned innocent round eyes and whiskers. An expression of utter shock and guilt as if caught red-handed. Set in a natural everyday home interior with authentic indoor lighting. True candid phone camera snapshot texture, real fur, zero CGI. Strictly animal head portrait with no limbs, no hands, no paws.",
    'models/secret_agent.png',
    'human hands, human fingers, human arms, human thumb, human body, person taking picture, holding phone, smartphone in hand, studio lighting, 3D render, CGI, digital illustration, cartoon, anime, scary horror, blood, gun, weapon, violent, deformed snout, deformed eyes'
  )
];

// ----------------------------------------------------------------------
// 4. CELEBRATION (节日庆典)
// ----------------------------------------------------------------------
export const CELEBRATION_TEMPLATES: CascadingItem[] = [
  makeItem(
    'christmas',
    '英伦圣诞礼盒主题写真',
    'British Christmas Velvet Box',
    '圣诞盛典',
    "A warm, festive British Christmas photographic portrait starring the specific pet from Photo 1. Meticulously preserving the pet's authentic facial features, fur texture, and eye color. The pet sits inside a luxurious vintage burgundy velvet Christmas gift box with ornate gold filigree trim, its front paws resting casually on the box edge. Wearing a rich dark green knit holiday scarf with a large golden ribbon bow and star brooch. Background features a lush Christmas tree lavishly decorated with red and gold baubles, gingerbread ornaments, and gentle falling snow. Surrounded by silk-ribboned presents on fresh faux snow. Soft warm cinematic holiday lighting, shallow depth of field.",
    'models/christmas.png',
    'text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, extra limbs'
  ),
  makeItem(
    'halloween',
    '万圣节南瓜灯马车奇境',
    'Halloween Magical Pumpkin Carriage',
    '万圣奇境',
    "An enchanting Halloween fairy-tale photographic portrait featuring the specific pet from Photo 1. Meticulously preserving the pet's exact facial structure, fur markings, and eye color. The adorable pet sits inside an enormous glowing Jack-o'-lantern pumpkin carriage, filled with colorful candies. The pet wears a vintage black pointed witch hat adorned with a gold crescent moon pendant, and a frilly pink collar, holding a glowing star wand. Set in a magical twilight forest with soft purple mist, floating translucent ghost balloons, tiny flying bats, and glowing mushrooms. Warm pumpkin lantern glow, whimsical storybook aesthetic, rich 8k photographic detail.",
    'models/halloween.png',
    'deformed face, scary horror, blood, text, watermark, extra limbs, human face, cartoon illustration, anime, noise'
  ),
  makeItem(
    'birthday_vip',
    'VIP专属生日盛典写真',
    'VIP Birthday Gala & Cake',
    '生日专属',
    "An intimate, heartwarming VIP pet birthday celebration photograph starring the specific pet from Photo 1. Meticulously preserving the pet's exact facial features, fur texture, and soulful eye color. The pet wears a festive polka-dot cone party hat with a fluffy pom-pom and a cute pink patterned bib, resting comfortably on a warm hardwood floor. Before it sits a ceramic floral plate with a gourmet double-layer pet meat cake topped with fresh shrimp and a single burning pink-and-white striped candle with delicate wisps of smoke. Warm, dim ambient lighting with twinkling golden fairy string lights and soft blurred balloons in the background. Photorealistic cozy celebration atmosphere.",
    'models/birthday_vip.png',
    'text, watermark, subtitle, signature, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, extra fingers'
  )
];

// ----------------------------------------------------------------------
// CASCADING THEMES TREE (4 CORE THEMES)
// ----------------------------------------------------------------------
export const CASCADING_THEMES: Record<CoreThemeKey, CascadingTheme> = {
  fine_art: {
    key: 'fine_art',
    nameZh: '艺术流派',
    nameEn: 'Fine Art & Masters',
    headline: 'Vogue Fine Art Edition',
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_gentle.webp',
    subCategories: [
      {
        id: 'featured',
        nameZh: '精选高定模板',
        nameEn: 'Featured Templates',
        items: FINE_ART_TEMPLATES
      }
    ]
  },
  corporate: {
    key: 'corporate',
    nameZh: '职场工装',
    nameEn: 'Corporate & 9-to-5',
    headline: 'Wall Street & Tech Edition',
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_detective.webp',
    subCategories: [
      {
        id: 'featured',
        nameZh: '精选高定模板',
        nameEn: 'Featured Templates',
        items: CORPORATE_TEMPLATES
      }
    ]
  },
  cosplay: {
    key: 'cosplay',
    nameZh: '角色扮演',
    nameEn: 'Cinematic Cosplay',
    headline: 'Cinematic Blockbuster Edition',
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_street.webp',
    subCategories: [
      {
        id: 'featured',
        nameZh: '精选高定模板',
        nameEn: 'Featured Templates',
        items: COSPLAY_TEMPLATES
      }
    ]
  },
  celebration: {
    key: 'celebration',
    nameZh: '节日庆典',
    nameEn: 'Holidays & Milestones',
    headline: 'Celebration & Gala Edition',
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_warm.webp',
    subCategories: [
      {
        id: 'featured',
        nameZh: '精选高定模板',
        nameEn: 'Featured Templates',
        items: CELEBRATION_TEMPLATES
      }
    ]
  }
};

// ----------------------------------------------------------------------
// BACKWARD COMPATIBILITY: LEGACY FLAT STYLES (gentle, detective, street, warm)
// ----------------------------------------------------------------------
function cascadingToLegacyVariants(themeKey: CoreThemeKey): CapsuleVariant[] {
  const theme = CASCADING_THEMES[themeKey];
  const variants: CapsuleVariant[] = [];
  for (const sub of theme.subCategories) {
    for (const item of sub.items) {
      variants.push({
        id: item.id,
        name: item.nameEn || item.nameZh,
        wardrobePrompt: item.wardrobePrompt,
        fullPrompt: item.fullPrompt
      });
    }
  }
  return variants;
}

export const STYLE_CONFIGS: Record<StyleKey, StyleConfig> = {
  // New Core Themes (US English)
  fine_art: {
    key: 'fine_art',
    name: 'Fine Art',
    subtitle: 'Classical Masterpieces & Modern Pop',
    prompt: FINE_ART_TEMPLATES[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
    variants: cascadingToLegacyVariants('fine_art')
  },
  corporate: {
    key: 'corporate',
    name: 'Corporate',
    subtitle: 'Silicon Valley & Wall Street 9-to-5',
    prompt: CORPORATE_TEMPLATES[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
    variants: cascadingToLegacyVariants('corporate')
  },
  cosplay: {
    key: 'cosplay',
    name: 'Cosplay',
    subtitle: 'Historical Royalty & Iconic Legends',
    prompt: COSPLAY_TEMPLATES[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
    variants: cascadingToLegacyVariants('cosplay')
  },
  celebration: {
    key: 'celebration',
    name: 'Celebration',
    subtitle: 'Holiday Galas & VIP Milestones',
    prompt: CELEBRATION_TEMPLATES[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
    variants: cascadingToLegacyVariants('celebration')
  },
  // Legacy aliases mapped seamlessly
  gentle: {
    key: 'gentle',
    name: 'Fine Art (Legacy)',
    subtitle: 'Classical Art Masterpieces',
    prompt: FINE_ART_TEMPLATES[1].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
    variants: cascadingToLegacyVariants('fine_art')
  },
  detective: {
    key: 'detective',
    name: 'Corporate (Legacy)',
    subtitle: 'Executive & Aviator',
    prompt: CORPORATE_TEMPLATES[1].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
    variants: cascadingToLegacyVariants('corporate')
  },
  street: {
    key: 'street',
    name: 'Cosplay (Legacy)',
    subtitle: 'Cyber & Superhero',
    prompt: COSPLAY_TEMPLATES[1].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
    variants: cascadingToLegacyVariants('cosplay')
  },
  warm: {
    key: 'warm',
    name: 'Celebration (Legacy)',
    subtitle: 'Festive & Winter Holiday',
    prompt: CELEBRATION_TEMPLATES[1].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
    variants: cascadingToLegacyVariants('celebration')
  }
};


export const SUPPORTED_STYLE_KEYS = Object.keys(STYLE_CONFIGS) as StyleKey[];
export const CORE_THEME_KEYS: CoreThemeKey[] = ['fine_art', 'corporate', 'cosplay', 'celebration'];

/**
 * Resolve a specific cascading item by theme, subCategory and item ID.
 * If not found, falls back gracefully.
 */
export function resolveCascadingItem(
  styleKey: string,
  subId?: string,
  itemId?: string,
  variantIndex?: number
): CascadingItem {
  // 1. Normalize styleKey: Map legacy keys to core themes if needed
  let targetThemeKey: CoreThemeKey;
  if (styleKey === 'gentle') targetThemeKey = 'fine_art';
  else if (styleKey === 'detective') targetThemeKey = 'corporate';
  else if (styleKey === 'street') targetThemeKey = 'cosplay';
  else if (styleKey === 'warm') targetThemeKey = 'celebration';
  else if (styleKey in CASCADING_THEMES) targetThemeKey = styleKey as CoreThemeKey;
  else targetThemeKey = 'fine_art';

  const theme = CASCADING_THEMES[targetThemeKey];

  // 2. If itemId is provided, search all subcategories for this item
  if (itemId) {
    let targetId = itemId;
    if (itemId === 'dark_knight') targetId = 'secret_agent';
    else if (itemId === 'witch') targetId = 'caribbean_pirate';
    for (const sub of theme.subCategories) {
      if (!subId || sub.id === subId) {
        const found = sub.items.find((it) => it.id === targetId);
        if (found) return found;
      }
    }
  }

  // 3. If subId is provided, pick from that subcategory
  if (subId) {
    const sub = theme.subCategories.find((s) => s.id === subId);
    if (sub && sub.items.length > 0) {
      const idx = typeof variantIndex === 'number' && variantIndex >= 0
        ? variantIndex % sub.items.length
        : Math.floor(Math.random() * sub.items.length);
      return sub.items[idx];
    }
  }

  // 4. Fallback: Flatten all items under this theme and pick by variantIndex or random
  const allItems: CascadingItem[] = [];
  for (const sub of theme.subCategories) {
    allItems.push(...sub.items);
  }

  if (typeof variantIndex === 'number' && variantIndex >= 0) {
    return allItems[variantIndex % allItems.length];
  }
  return allItems[Math.floor(Math.random() * allItems.length)];
}

// ----------------------------------------------------------------------
// THEME SKILLS AND DYNAMIC NEGATIVE CONSTRAINTS
// ----------------------------------------------------------------------
export const THEME_SKILL_DIRECTIVES: Record<CoreThemeKey, string> = {
  fine_art: 'Fine art master oil painting technique, delicate atmospheric sfumato blending, authentic rich chiaroscuro single-source lighting, museum archival depth.',
  corporate: 'Commercial executive editorial portrait, crisp 5600K balanced softbox studio lighting, rich tailored suit fabric microtexture, modern corporate ambient bokeh.',
  cosplay: 'Cinematic Hollywood movie still lighting, high-contrast dramatic studio rims, photorealistic metallic armor reflections, 100% unmasked face with eyes completely visible.',
  celebration: 'Opulent festive celebration lighting, warm ambient golden bokeh, shimmering velvet and silk sheen, aristocratic salon milestone elegance.'
};

export const THEME_NEGATIVE_CONSTRAINTS: Record<CoreThemeKey, string> = {
  fine_art: ', modern digital artifacts, casual clothes, sportswear, synthetic nylon, flat commercial lighting, cartoon, 3d render',
  corporate: ', pajamas, dirty t-shirt, distorted tie, extra collars, messy background, distorted corporate badges, casual sloppy clothes',
  cosplay: ', full head helmet, full face mask, gas mask, helmet covering eyes, obscured eyes, hidden snout, covered face, distorted pet expression, CGI doll',
  celebration: ', cheap plastic props, party store costume, garish neon, distorted jewelry, fake blur, low budget party'
};

/**
 * Dynamically assemble Prompt + Skill + Negative Constraints based on Level 1 (Theme) and Level 2 (Item)
 */
export function assembleDynamicPrompt(
  styleKey: string,
  itemId?: string,
  subId?: string,
  variantIndex?: number
): AssembledPromptResult {
  let targetThemeKey: CoreThemeKey;
  if (styleKey === 'gentle') targetThemeKey = 'fine_art';
  else if (styleKey === 'detective') targetThemeKey = 'corporate';
  else if (styleKey === 'street') targetThemeKey = 'cosplay';
  else if (styleKey === 'warm') targetThemeKey = 'celebration';
  else if (styleKey in CASCADING_THEMES) targetThemeKey = styleKey as CoreThemeKey;
  else targetThemeKey = 'fine_art';

  const theme = CASCADING_THEMES[targetThemeKey];
  const item = resolveCascadingItem(styleKey, subId, itemId, variantIndex);
  const skillDirective = THEME_SKILL_DIRECTIVES[targetThemeKey];
  const skillNegativeConstraint = THEME_NEGATIVE_CONSTRAINTS[targetThemeKey];

  const fullPrompt = `${item.wardrobePrompt} ${IDENTITY_ANCHOR} ${skillDirective} ${STUDIO_FINISH}`;
  const exclusiveNegative = item.exclusiveNegativePrompt ? `, ${item.exclusiveNegativePrompt}` : '';
  const negativePrompt = `${NEGATIVE_PROMPT}${skillNegativeConstraint}${exclusiveNegative}`;

  return {
    fullPrompt,
    negativePrompt,
    skillDirective,
    skillNegativeConstraint,
    exclusiveNegativePrompt: item.exclusiveNegativePrompt,
    item,
    themeKey: targetThemeKey,
    themeNameZh: theme.nameZh
  };
}

/**
 * Backward compatibility getStyleVariant
 */
export function getStyleVariant(
  styleKey: StyleKey,
  index?: number,
  subId?: string,
  itemId?: string
): CapsuleVariant {
  const item = resolveCascadingItem(styleKey, subId, itemId, index);
  const assembled = assembleDynamicPrompt(styleKey, itemId, subId, index);
  return {
    id: item.id,
    name: item.nameZh,
    wardrobePrompt: item.wardrobePrompt,
    fullPrompt: assembled.fullPrompt
  };
}

