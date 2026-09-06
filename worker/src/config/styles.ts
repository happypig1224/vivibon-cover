import { StyleConfig, StyleKey, CapsuleVariant } from '../types/env';

export const IDENTITY_ANCHOR =
  'Dress the EXACT SAME dog from the input image from the neck and shoulders down in a bespoke tailored haute couture wardrobe. Strictly preserve the original pet\'s facial structure, eyes, ear contours, snout shape, and distinctive fur markings 100% unchanged. Do NOT alter the dog\'s breed, face geometry, or expression.';

export const STUDIO_FINISH =
  'High-end commercial luxury pet portrait photography, 85mm portrait lens, delicate studio rim light accentuating authentic fur texture, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, award-winning studio portrait.';

export const NEGATIVE_PROMPT =
  'text, typography, letters, words, logo, trademark, brand name, magazine cover title, watermark, signature, font, caption, subtitle, heading, UI, different dog, wrong breed, human face, deformed ears, extra legs, distorted anatomy, warped snout, deformed eyes, extra paws, blurry, low quality, lowres, jpeg artifacts, noisy, overexposed, underexposed, cartoon, illustration, 3D render, drawing, CGI, painting, sketch, anime, doll, amateur photography.';

function makeVariant(id: string, name: string, wardrobePrompt: string): CapsuleVariant {
  return {
    id,
    name,
    wardrobePrompt,
    fullPrompt: `${IDENTITY_ANCHOR} ${wardrobePrompt} ${STUDIO_FINISH}`
  };
}

export const GENTLE_VARIANTS: CapsuleVariant[] = [
  makeVariant(
    'gentle_navy_velvet',
    '经典藏青丝绒礼服',
    'The pet is elegantly dressed in a bespoke tailored Italian dark navy blue velvet tuxedo suit with a crisp white formal dress shirt collar and an exquisite black velvet bow tie fitted tailored around its neck.'
  ),
  makeVariant(
    'gentle_bordeaux_gala',
    '盛典波尔多酒红礼服',
    'The pet is exquisitely dressed in a luxury royal Bordeaux wine-red velvet dinner jacket tuxedo with black satin peaked lapels, a crisp white pleated tuxedo shirt collar, and an elegant black silk bow tie fitted around its neck.'
  ),
  makeVariant(
    'gentle_prince_of_wales',
    '萨维尔街亲王格花呢',
    'The pet is impeccably dressed in a bespoke British Savile Row Prince of Wales Glen plaid grey tweed suit vest with a tailored collar, a subtle gold lapel pin, and a refined charcoal grey silk necktie fitted around its neck.'
  )
];

export const DETECTIVE_VARIANTS: CapsuleVariant[] = [
  makeVariant(
    'aviator_vintage_shearling',
    '复古做旧棕皮飞行夹克',
    'The pet is stylishly dressed in a vintage distressed brown shearling leather aviator bomber jacket with a thick cream fleece collar and retro dark metal sunglasses positioned tastefully on its forehead.'
  ),
  makeVariant(
    'aviator_stealth_black',
    '曜石黑战术空军夹克',
    'The pet is boldly dressed in an obsidian black matte flight jacket with vintage military aviation patches, ribbed collar, and sleek dark mirrored aviator sunglasses pushed up resting on its head.'
  ),
  makeVariant(
    'aviator_heritage_ma1',
    '极地巡航墨绿飞行外套',
    'The pet is fashionably dressed in an authentic olive drab heritage nylon MA-1 flight bomber jacket with rescue-orange lining peeking at the collar, paired with classic dark round sunglasses resting above its brow.'
  )
];

export const STREET_VARIANTS: CapsuleVariant[] = [
  makeVariant(
    'techwear_arctic_yellow',
    '极地哑光亮黄防风衣',
    'The pet is fashionably dressed in a contemporary streetwear matte bright yellow techwear hooded windbreaker jacket with waterproof zippers and tactical accents tailored around its neck and chest.'
  ),
  makeVariant(
    'techwear_glacier_white',
    '冰川白拼色暴风雪外壳',
    'The pet is cutting-edge dressed in an alpine glacier white and slate grey stormproof techwear shell jacket with reflective cybernetic trim and waterproof taped seams around its neck and torso.'
  ),
  makeVariant(
    'techwear_cobalt_cyber',
    '曜影钴蓝机能冲锋衣',
    'The pet is avant-garde dressed in an ultra-modern cobalt electric blue and matte black futuristic windbreaker jacket with tactical buckle strap details snugly tailored around its shoulders.'
  )
];

export const WARM_VARIANTS: CapsuleVariant[] = [
  makeVariant(
    'knitwear_scottish_tartan',
    '苏格兰格纹羊绒围巾',
    'The pet is cozily dressed in a hand-knitted thick woolen beanie and a luxurious soft Scottish tartan cashmere scarf wrapped gently around its neck.'
  ),
  makeVariant(
    'knitwear_oatmeal_cable',
    '奶白麻花粗棒针高领毛衣',
    'The pet is warmly dressed in an artisanal chunky oatmeal-cream cable-knit wool turtleneck sweater snugly fitted around its neck, with soft textured ribbing accentuating its chest.'
  ),
  makeVariant(
    'knitwear_fair_isle',
    '费尔岛复古提花套头衫',
    'The pet is charmingly dressed in a traditional Scottish Fair Isle jacquard knit patterned sweater in rich forest green and burgundy tones, with a cozy folded ribbed neckline.'
  )
];

export const STYLE_CONFIGS: Record<StyleKey, StyleConfig> = {
  gentle: {
    key: 'gentle',
    name: '萨维尔名绅',
    subtitle: '丝绒领结与定制礼服',
    prompt: GENTLE_VARIANTS[0].fullPrompt,
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_gentle.webp',
    variants: GENTLE_VARIANTS
  },
  detective: {
    key: 'detective',
    name: '黑超飞行家',
    subtitle: '工装夹克与金属墨镜',
    prompt: DETECTIVE_VARIANTS[0].fullPrompt,
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_detective.webp',
    variants: DETECTIVE_VARIANTS
  },
  street: {
    key: 'street',
    name: '机能防风衣',
    subtitle: '亮黄连帽极地户外装',
    prompt: STREET_VARIANTS[0].fullPrompt,
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_street.webp',
    variants: STREET_VARIANTS
  },
  warm: {
    key: 'warm',
    name: '冬日手工织物',
    subtitle: '粗针毛线帽与羊绒围巾',
    prompt: WARM_VARIANTS[0].fullPrompt,
    fallbackImageUrl: 'https://vivibon-cover.pages.dev/models/milo_warm.webp',
    variants: WARM_VARIANTS
  }
};

export const SUPPORTED_STYLE_KEYS = Object.keys(STYLE_CONFIGS) as StyleKey[];

/**
 * Dynamically pick a capsule wardrobe variant for the given styleKey.
 * If index is provided, picks deterministically (modulo variant count);
 * otherwise picks uniformly at random.
 */
export function getStyleVariant(styleKey: StyleKey, index?: number): CapsuleVariant {
  const config = STYLE_CONFIGS[styleKey];
  if (!config || !config.variants || config.variants.length === 0) {
    throw new Error(`Invalid style key or missing variants: ${styleKey}`);
  }
  if (typeof index === 'number' && index >= 0) {
    return config.variants[index % config.variants.length];
  }
  const randomIndex = Math.floor(Math.random() * config.variants.length);
  return config.variants[randomIndex];
}

