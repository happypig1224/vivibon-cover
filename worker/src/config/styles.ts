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
  'Meticulously preserve the specific pet\'s core biological identity from Photo 1, including native fur coloration, distinctive markings, stripe geometry, natural eye hue and iris color, snout proportions, and ear structure. The pet is the expressive living protagonist of the scene: breathe lifelike emotional depth, subtle facial micro-expressions, and natural somatic posture tailored to the narrative, avoiding stiff static head-pasting. Strict quadruped anatomical law: The subject is a 100% pure animal pet. All visible limbs must terminate solely in authentic, fluffy animal paws with species-correct fur and soft paw pads. Strictly and absolutely NO human arms, NO human hands, NO human fingers, NO human thumbs, NO opposable thumbs, NO fingernails, NO human skin or flesh, NO human wrists, NO human joints, NO hybrid chimera anatomy. Both animal paws must rest naturally and interact convincingly with the scene. Absolutely NO person or human body parts in frame, NO hands holding cameras, NO hands holding phones, NO hands holding cups, NO selfie sticks. Unmasked face, natural expressive eyes and lively whiskers.';

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
    "A masterwork classical Renaissance oil painting in the style of Leonardo da Vinci's Mona Lisa, starring the specific pet from Photo 1. Meticulously preserving the pet's authentic fur markings, facial identity, and eye color. Somatic posture: The pet is posed in the iconic Leonardo 3/4 seated turn, with its upper body angled slightly away while its head turns back toward the viewer, and both furry paws are gracefully folded over the rich pleated velvet gown. Contextual facial acting: The pet radiates the quintessential Mona Lisa enigma—gentle, wise, and serene eyes meeting the viewer's gaze, with a faint, subtle, almost imperceptible upturn at the corners of its mouth forming that famous mysterious smile. Dressed in the authentic dark olive-green pleated Renaissance velvet gown with gold embroidery. Sfumato soft chiaroscuro lighting, misty river and mountain landscape in the distant background, antique oil painting canvas craquelure texture.",
    'models/mona_lisa.png',
    'human ears, ears hidden inside wig, wig covering eyes, wig covering snout, front legs stretched into human arms, human fingers, human hands, human neck, human skin exposed, fused paws, long robe penetrating body'
  ),
  makeItem(
    'pearl_earring',
    '《戴珍珠耳环的少女》古典肖像',
    'Girl with a Pearl Earring',
    '荷兰黄金时代',
    "A classical 17th-century Dutch Golden Age master oil painting in the exact composition of Johannes Vermeer's Girl with a Pearl Earring, featuring the specific pet from Photo 1. Somatic posture: The pet is positioned in a dynamic over-the-shoulder turn, body facing away toward the right with shoulders shrouded in an ochre wool coat, turning its head sharply back to look directly into the camera lens over its left shoulder. Contextual facial acting: A luminous, intimate gaze—wide, clear, glistening moist eyes reflecting the studio light, mouth relaxed and parted by a millimeter in spontaneous wonder, conveying a captivating momentary glance as if called by name. Wearing an iconic ultramarine blue and gold silk turban wrapped around its head, beside which hangs a single large, radiant teardrop pearl catchlight. Deep dramatic chiaroscuro against a pure dark backdrop, delicate directional light caressing the cheek and iris, rich craquelure glaze.",
    'models/pearl_earring.png',
    'visible pet ears, human ears, two or more pearls, pearl penetrating skin, pearl penetrating turban, turban flattening skull, turban covering eyes, distorted neck, human neck, human collarbone, exposed human skin, bare arms, bare paws, exposed paws, uncovered paws, bare fur on torso, open chest, deep V-neck, frontal pose, facing front, symmetrical shoulders, casual clothes'
  ),
  makeItem(
    'line_art',
    '大师级手绘速写研究本',
    "Master's Sketchbook Study",
    '手绘速写',
    "A masterclass artist sketchbook study page featuring the specific pet from Photo 1. The page presents 4 dynamic charcoal-and-watercolor study sketches capturing the pet in varied lifelike emotional states: a focused frontal study, an inquisitive 3/4 tilted head glance, a yawn with curled tongue, and a tranquil sleeping pose. Subtle vintage cursive handwritten anatomical and shading notes in the sepia margins. Authentic deckle-edge aged parchment texture, expressive contour strokes, fine art museum draftsmanship.",
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
    "A humorous, hyperrealistic workplace documentary portrait of the specific pet from Photo 1, themed Daily Life of a 9-to-5 Working Pet. Somatic posture: The pet exhibits a relatable, weary forward-slumping desk posture, leaning softly over its office workstation. Both authentic furry animal paws with soft pads rest naturally on the desk surface—one paw limp beside the keyboard, the other softly steadying a clear takeaway cup filled with iced Americano. Contextual facial acting: The pet radiates the quintessential exhausted 9-to-5 corporate mood—weary, heavy-lidded half-open eyes with a relatable glazed Monday-morning stare, yet its pupils are sharp and sparked with subtle caffeine alertness. Its furry mouth and lips are gently pursed directly around the drinking straw, actively sipping the cold beverage, whiskers twitched forward in realistic suction motion. Dressed in a snug dark chocolate brown ribbed knit turtleneck sweater with clean cuffs around its furry ankles and a clear acrylic employee lanyard badge labeled 'Professional Slacker'. Crucial photographic identity consistency: The miniature ID photo printed on the employee badge must show the identical face of the specific pet from Photo 1 (matching its exact breed, fur color, and tabby markings), serving as the pet's own official employee ID photo. Authentic modern open-plan office background with soft out-of-focus computer screens and warm indoor lighting. Pure animal anatomy, natural glossy fur. Absolutely no human hands or smartphones in frame.",
    'models/caffeine_pro.png',
    'different pet on employee badge, mismatching animal on ID card, white cat on badge, human face on badge, wrong photo on employee card, smartphone, mobile phone, cell phone, holding phone, phone held by hand, taking selfie, selfie pose, arm reaching toward camera, human hand, human fingers, human thumb, opposable thumb, human palm, fingernails, human wrist, human arm, human skin, chimera, half-human, hybrid hands, hands holding cup, coffee spilled on fur, pet drinking hot coffee, dislocated paws'
  ),
  makeItem(
    'airline_captain',
    '顶级民航机长',
    'The Airline Captain',
    '民航机长',
    "A humorous and delightful, viral ultra-wide fisheye cockpit documentary selfie of the specific pet from Photo 1 as an authentic commercial airline captain. Composition and camera: Dramatic close-up wide-angle GoPro cockpit selfie perspective with subtle curved barrel distortion. The pet's large, adorable face is centered close to the camera lens with engaging visual impact. Somatic posture and headwear: Wearing dark olive-green tactical aviator goggles stylishly pushed up onto its forehead/brow, allowing both furry animal ears to perk up naturally on either side (no bulky pilot hat, no peaked cap). Contextual facial acting: Big round curious eyes looking directly into the camera lens with irresistible charismatic charm, pink nose, whiskers flared outward in alert concentration. Attire: Fitted with a snug black tactical flight harness and seatbelt straps featuring silver and yellow safety buckles strapped over its animal chest and shoulders (no human suit jacket, no necktie). Environment: Inside an authentic airplane flight deck cockpit, surrounded by glowing overhead panels, illuminated switchboards, and multi-function flight displays. Through the panoramic cockpit windshield, an airport tarmac apron with parked ground service vehicles is visible under natural bright daylight. Razor-sharp glossy fur texture, photorealistic animal anatomy, high-fashion pet meme masterpiece.",
    'models/airline_captain.png',
    'peaked cap, pilot cap, captain hat, service cap, visor hat, hat covering ears, uniform jacket, formal suit, necktie, buttoned blazer, epaulettes, distant horizon gaze, looking away from camera, telephoto lens, zoomed out, full body portrait, human arms, human body, human fingers, human hands, human thumb, opposable thumb, person holding controls, distorted dials, high altitude sky, clouds in window, flying in sky, dislocated paws, cartoon, 3d render, blurry, distorted face, changing pet identity'
  ),
  makeItem(
    'michelin_chef',
    '宠物大厨做饭日常',
    'The Michelin Executive Chef',
    '米其林主厨',
    "A delightful, viral comedic culinary portrait of the specific pet from Photo 1 as an executive Michelin chef. Somatic posture: The pet leans forward over a pristine stainless steel prep counter, body angled with professional culinary focus. One furry paw rests firmly on the cutting board beside miniature culinary pans, while its other paw is delicately hovering above a gourmet dish as if placing the final micro-herb with artistic precision. Contextual facial acting: The pet bears the quintessential discerning critique of a three-star chef—sharp focused eyes looking down intensely at the plating, whiskers angled downward with concentrated scrutiny, and mouth set in a proud, exacting line. Wearing a tall puffy white pleated chef toque hat on its head and a crisp beige-and-brown checkered kitchen apron tied snugly around its chest. Warm, bustling professional restaurant kitchen background with soft bokeh. Photorealistic pet fur, delightful high-fashion meme aesthetic.",
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
    "A dramatic Baroque religious classical oil painting in the style of Titian and Peter Paul Rubens' The Assumption of the Virgin, starring the specific pet from Photo 1. Somatic posture: The pet is ascending gracefully toward heaven on glowing golden clouds, body weightlessly buoyed upwards with limbs elegantly outstretched, wrapped in billowing crimson and white silk robes. Both furry paws are raised outward in gentle divine blessing. Contextual facial acting: The pet radiates transcendent serenity and sublime bliss—reverent eyes lifted upward toward the celestial golden light, mouth relaxed in peaceful divine beatitude, ears framed by a glowing heavenly halo with radiant sunbeams. Choirs of fluttering cherubs surround it in misty golden skies, while mortal disciples gaze up from below in awe. Rich Venetian red and gold palette, authentic craquelure oil painting glaze.",
    'models/assumption_of_mary.png',
    'human body on pet, human head on pet, pet with human arms, pet with human fingers, human hands, human fingers, human wrists, human skin, human elbows, five fingers, plain background, studio backdrop, pet face distorted, halo piercing skull, deformed paws'
  ),
  makeItem(
    'caribbean_pirate',
    '加勒比海盗船长',
    'Pirates of the Caribbean',
    '传奇海盗',
    "A detailed cinematic film still of the specific pet from Photo 1 as a legendary pirate captain of the high seas. Somatic posture: The pet stands resolutely on the quarterdeck of a wooden galleon, body tilted into the sea wind with front paws gripping the weathered wooden ship railing. Contextual facial acting: An iconic roguish smirk—one eye slightly narrowed with seasoned cunning, piercing confident gaze locking onto the viewer, whiskers bristled defiantly against the salty spray, projecting unmistakable pirate bravado and maritime leadership. Wearing an ornate weathered crimson-red leather tricorne hat with gold embroidery and a skull emblem, draped in a rich velvet captain coat. Background features stormy ocean waves, distant tall ships, and a moody golden hour sunset sky with theatrical rim lighting. Pure animal anatomy, cinematic depth of field.",
    'models/caribbean_pirate.png',
    'human hands, human arms, human fingers, human thumb, opposable thumb, human wrist, human skin, person holding camera, taking selfie, text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, human body, human face, extra limbs'
  ),
  makeItem(
    'secret_agent',
    '宠物笨贼/土味特工',
    'The Secret Agent',
    '土味特工',
    "A hilarious viral 0.5x ultra-wide fisheye snapshot of the specific pet from Photo 1 caught in a comical stealth mission. Somatic posture: Close-up low-angle framing, head pulled back slightly into its shoulders in guilty surprise, with body crouched behind a shadowy living room sofa. Contextual facial acting: An unforgettable expression of comical shock—huge round innocent eyes wide open in startled disbelief as if caught red-handed, dilated pupils, and whiskers splayed forward with tension. A snug black ribbed knit balaclava hood is stretched securely over its head, snugly framing its cheeks and snout while exposing its expressive eyes and pink nose. Genuine iPhone snapshot flash lighting texture, real glistening fur, comedic suspense mood.",
    'models/secret_agent.png',
    'human hands, human fingers, human arms, human thumb, human body, person taking picture, holding phone, smartphone in hand, studio lighting, 3D render, CGI, digital illustration, cartoon, anime, horror, deformed snout, deformed eyes'
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
    "A warm, festive British Christmas fine-art photographic portrait starring the specific pet from Photo 1. Somatic posture: The pet is nestled luxuriously inside a vintage burgundy velvet Christmas gift box, body comfortably sinking into plush silk cushions, with its front furry paws resting casually over the ornate gold filigree rim of the box. Contextual facial acting: The pet radiates cozy, aristocratic contentment—soft half-lidded almond eyes glowing with warmth from the nearby hearth, relaxed gentle expression, ears softly resting under a festive dark green knit scarf with a golden ribbon bow. Surrounded by twinkling fairy lights, decorated evergreen boughs with red baubles, and gentle falling snow dust. Rich warm cinematic bokeh, magazine editorial luxury.",
    'models/christmas.png',
    'text, watermark, subtitle, logo, cartoon, anime, illustration, deformed limbs, distorted face, changing pet identity, overly smooth skin, plastic texture, low quality, blurry, extra limbs'
  ),
  makeItem(
    'halloween',
    '万圣节南瓜灯马车奇境',
    'Halloween Magical Pumpkin Carriage',
    '万圣奇境',
    "An enchanting Halloween fairy-tale photographic portrait featuring the specific pet from Photo 1. Somatic posture: The adorable pet peeks inquisitively out from the hollow window of an enormous glowing Jack-o'-lantern carriage, with one curious paw resting lightly on the carved pumpkin sill. Contextual facial acting: Wide, glistening eyes full of childlike wonder and playful mischief reflecting the amber candle glow, head tilted inquisitively by a few degrees, whiskers perked with curiosity. Wearing a tiny vintage velvet pointed witch hat with a crescent moon clasp and a delicate frilled ruff collar. Magical twilight enchanted forest background with soft violet mist, floating translucent ghost lanterns, and warm firefly sparkles. Masterpiece storybook cinematic lighting.",
    'models/halloween.png',
    'deformed face, scary horror, text, watermark, extra limbs, human face, cartoon illustration, anime, noise'
  ),
  makeItem(
    'birthday_vip',
    'VIP专属生日盛典写真',
    'VIP Birthday Gala & Cake',
    '生日专属',
    "An intimate, heartwarming VIP pet birthday celebration photograph starring the specific pet from Photo 1. Somatic posture: The pet sits dutifully on a warm polished hardwood floor, front paws tucked neatly together in patient anticipation before a fine porcelain floral plate. Contextual facial acting: Pure, unadulterated joy and longing—eyes sparkling with eager excitement locked onto a gourmet meat birthday cake topped with plump fresh shrimp, tongue tip subtly peeking out in lip-licking anticipation, whiskers twitching with delight. Wearing a playful polka-dot cone party hat with a fluffy pom-pom and a festive satin collar. Background glows with warm golden fairy string lights and soft out-of-focus pastel balloons. Photorealistic cozy celebration atmosphere.",
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

