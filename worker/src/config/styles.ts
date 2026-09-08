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
  'Dress the EXACT SAME dog from the input image from the neck and shoulders down. Strictly preserve the original pet\'s facial structure, eyes, snout geometry, ear shape and position, native fur coloration, distinctive markings, body proportions and age 100% unchanged. Maintain authentic animal anatomy: exactly one head, two eyes, two ears, one nose, and natural furry legs and paws matching the species. Strictly NO human arms, hands, fingers, skin, human neck or human body. Unmasked face, head and eyes fully visible and natural, non-distorted.';

export const STUDIO_FINISH =
  'High-end commercial luxury pet portrait photography, 85mm portrait lens, rich vibrant natural color grading, high dynamic range, glossy fur highlights, deep warm studio lighting, delicate studio rim light accentuating authentic fur texture, sharp focus on pet eyes, clean solid seamless studio backdrop, ample negative space at top for magazine typography, hyperdetailed, 8k resolution, no text, no logo, award-winning studio portrait.';

export const NEGATIVE_PROMPT =
  'second pet, other animals, duplicate subject, breed change, facial change, fur color change, marking change, eye asymmetry, strabismus, human body, human arms, human hands, human fingers, human skin, human neck, hybrid human-animal, clothes clipping, accessories clipping, distorted anatomy, warped snout, deformed eyes, extra legs, missing legs, extra paws, fused limbs, severed limbs, blurry, low quality, noisy, jpeg artifacts, text, typography, letters, watermark, signature, logo, brand name, cartoon, 3D render, CGI doll, monochrome, black and white, grayscale, desaturated, dull colors, washed out, low contrast, hazy, dim, underexposed, dark muddy shadows, plastic texture, human cleavage, bare skin, naked, nude, bikini, erotic, suggestive, extra fingers, deformed paws.';

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
    fullPrompt: `${IDENTITY_ANCHOR} ${wardrobePrompt} ${STUDIO_FINISH}`,
    sampleImageUrl,
    exclusiveNegativePrompt
  };
}

// ----------------------------------------------------------------------
// 1. FINE_ART (艺术流派)
// ----------------------------------------------------------------------
export const FINE_ART_CLASSICAL: CascadingItem[] = [
  makeItem(
    'mona_lisa',
    '复刻《蒙娜丽莎》古典油画',
    'The Mona Lisa Smile',
    '文艺复兴',
    'Mona Lisa Renaissance fine art portrait. Dressed in Mona Lisa vintage dark long pleated robe, collar resting outside chest fur without exposing human skin or neck, natural dark vintage wig contouring head with both animal ears emerging naturally through openings. Front paws naturally crossed and resting together on chest in faithful reference to the original painting while strictly respecting natural canine and feline anatomy and joint mobility, claw tips visible, no human arms or fingers. Sfumato chiaroscuro lighting, earthy amber and dark golden museum oil canvas texture, tranquil classical expression.',
    'models/milo_gentle.webp',
    'human ears, ears hidden inside wig, wig covering eyes, wig covering snout, front legs stretched into human arms, human fingers, human hands, human neck, human skin exposed, fused paws, long robe penetrating body'
  ),
  makeItem(
    'pearl_earring',
    '《戴珍珠耳环的少女》古典肖像',
    'Girl with a Pearl Earring',
    '荷兰黄金时代',
    'Girl with a Pearl Earring fine art portrait. Pure black deep background, the pet body slightly turned in 3/4 pose with head looking back toward camera. Adorned in iconic royal ultramarine blue and ochre gold draped silk turban wrapped around head without flattening skull, native ears neatly enclosed beneath fabric, single large glowing baroque teardrop pearl pendant fastened at the lower edge of turban fabric without penetrating ear cartilage or skin. Warm ochre jacket with white collar fabric draped outside chest, soft chiaroscuro side window lighting illuminating eyes and snout.',
    'models/milo_gentle_navy_velvet.webp',
    'visible pet ears, human ears, two or more pearls, pearl penetrating skin, pearl penetrating turban, turban flattening skull, turban covering eyes, distorted neck, human neck, human collarbone, exposed human skin'
  ),
  makeItem(
    'line_art',
    '极简黑白线条绘画手稿',
    'The Minimalist Line Art',
    '极简黑白',
    'Minimalist black and white rough crayon, charcoal pencil, and dry-brush hand-drawn illustration poster on warm off-white cream paper. Not realistic sketch, non-photorealistic artistic hand drawing. Only using black textured lines and raw paper background, no other colors, no gray gradients. Rough textured brushstrokes, deliberate white spaces, visible paper fiber texture, charming vintage children picture book combined with high-fashion independent magazine editorial aesthetic. Pet subject occupying top 65% to 75% of canvas with pristine ample negative space below.',
    'models/milo_street.webp',
    'realistic pencil sketch, colorful, gray gradient, smooth vector lines, 3D render, solid black fill, busy background, cropped subject, typography covering subject, long text, gibberish letters, misspelled words, over-stylized unrecognizable cartoon'
  ),
  makeItem(
    'rembrandt',
    '伦勃朗《夜巡与自画像》',
    'Rembrandt Chiaroscuro Masterpiece',
    '明暗对照法',
    'Rembrandt style historic oil painting, pet wearing an elaborate layered pleated white linen Elizabethan ruff collar and dark heavy velvet tunic, authentic Rembrandt triangle lighting on face, rich impasto oil paint texture with subtle craquelure, dramatic dark museum depth.'
  ),
  makeItem(
    'las_meninas',
    '委拉斯凯兹《宫娥》',
    'Las Meninas by Diego Velazquez',
    '西班牙宫廷',
    'Velazquez Spanish royal court style, the pet wearing an ornate silver-grey damask silk dress bodice with crimson satin ribbon rosettes and pearl buttons, majestic Prado museum lighting, stately baroque composition.'
  )
];

export const FINE_ART_IMPRESSIONIST: CascadingItem[] = [
  makeItem(
    'starry_night',
    '梵高《星月夜与向日葵》',
    'Van Gogh: Starry Night & Sunflowers',
    '后印象派',
    'Vincent van Gogh aesthetic, pet wearing a midnight cobalt blue heavy wool jacket with a vibrant chrome-yellow sunflower silk ascot tie, iconic swirling dynamic Starry Night brushstrokes in the background, thick impasto oil paint texture, intense emotional post-impressionist color palette.'
  ),
  makeItem(
    'water_lilies',
    '莫奈《睡莲与日本桥》',
    'Monet: Water Lilies & Giverny',
    '莫奈花园',
    'Claude Monet plein-air impressionism, pet wearing a delicate pastel sage-green and soft petal-pink raw linen shirt, tiny water lily blossom on lapel, luminous dappled sunlight reflections, soft-focus Giverny pond bokeh, dreamy aesthetic.'
  ),
  makeItem(
    'the_kiss',
    '克里姆特《吻》黄金华服',
    'Gustav Klimt: The Golden Kiss',
    '维也纳分离派',
    'Gustav Klimt golden phase masterpiece, pet adorned in an opulent gilded mantle covered with geometric mosaic patterns, gold leaf flakes, spiraling decorative Art Nouveau patterns, shimmering luxurious gold texture.'
  ),
  makeItem(
    'the_scream',
    '蒙克《呐喊》表现主义风暴',
    'Edvard Munch: The Scream',
    '表现主义',
    'Edvard Munch expressionist painting style, pet wearing a flowing dark crimson and navy trench collar, dramatic fiery blood-orange undulating sunset sky backdrop, intense emotional brushwork, iconic Nordic art atmosphere.'
  )
];

export const FINE_ART_POP: CascadingItem[] = [
  makeItem(
    'warhol',
    '安迪·沃霍尔《玛丽莲双联画》',
    'Andy Warhol: Pop Screenprint',
    '波普丝网印',
    'Andy Warhol 1960s pop art style, pet wearing an electric neon yellow pop-art vest with bold black industrial zipper, vivid four-panel silkscreen color-block background in hot pink and turquoise, iconic retro modern vibe.'
  ),
  makeItem(
    'picasso',
    '毕加索《亚威农少女》',
    'Picasso: Cubist Geometry',
    '立体几何',
    'Pablo Picasso analytic cubism, pet dressed in an avant-garde deconstructed jacket with fragmented geometric angular color blocks in terracotta, slate grey and ochre, sharp cubist facet shading, modern museum art.'
  ),
  makeItem(
    'keith_haring',
    '凯斯·哈林发光波普涂鸦',
    'Keith Haring Radiant Pop',
    '街头艺术',
    'Keith Haring 1980s street art inspired style, pet wearing a crisp white athletic collar covered in bold black graphic dancing dog doodles and radiant heart motifs, clean vibrant primary colors, urban pop art energy.'
  ),
  makeItem(
    'atelier_sketch',
    '时装周黑白炭笔极简速写手稿',
    'Paris Atelier Fashion Sketch',
    '高定手稿',
    'Haute couture fashion designer sketch portrait, pet wearing a tailored charcoal wool coat combined with visible hand-drawn charcoal pencil sketch lines and tailor chalk markings, minimalist chic, Vogue runway concept aesthetic.'
  )
];

// ----------------------------------------------------------------------
// 2. CORPORATE (职场打工与真实生活切面)
// ----------------------------------------------------------------------
export const CORPORATE_CORE_TRIO: CascadingItem[] = [
  makeItem(
    'chill_intern',
    '反内卷摸鱼实习生',
    'The Chill Intern',
    '反内卷',
    'The chill anti-hustle corporate intern pet portrait. Pet naturally seated with an adorable relaxed, unbothered expression, looking directly at camera. Wearing an oversized comfortable heather-grey soft fleece crewneck sweatshirt, draped with a vibrant blue fabric company lanyard around the neck displaying a prominent miniature plastic ID badge clearly labeled "INTERN". Front furry paws resting casually on clean minimalist desk surface. Gentle bright modern open-plan office background with soft bokeh, authentic pet anatomy, strictly NO human arms or hands.',
    'models/milo_gentle_prince_of_wales.webp',
    'stressed expression, angry boss, corporate business suit, human arms, human fingers, human hands, tight collar choking pet, badge covering face, badge piercing skin, dark gloomy lighting, messy trash'
  ),
  makeItem(
    'coffee_pro',
    '咖啡续命打工狗',
    'The Caffeinated Pro',
    '咖啡续命',
    'The coffee-fueled 9-to-5 corporate professional pet portrait. Wearing a crisp sky-blue and white micro-striped casual button-down work shirt with a slightly loosened top collar, tailored navy work jacket shoulders. Seated politely with one furry paw resting naturally next to an authentic artisan takeaway coffee cup with a kraft cardboard heat sleeve and white lid. Soft morning 5600K office studio lighting, subtle corporate glass architecture bokeh in background, humorous relatable hardworking pet aesthetic, strictly authentic pet anatomy.',
    'models/milo_techwear_cobalt_cyber.webp',
    'coffee spilled on fur, pet drinking hot coffee, burned fur, open flames, plastic trash, human hands holding cup, human arms, dislocated paws, formal tuxedo, evening gown'
  ),
  makeItem(
    'ivy_prep',
    '常青藤老钱学者',
    'The Ivy League Scholar',
    '老钱学院',
    'Ivy League scholar pet, wearing an oversized Ralph Lauren style cream cable-knit V-neck tennis sweater with a neat light-blue Oxford collared shirt underneath, cozy vintage mahogany university library background with warm brass lamp glow, preppy old-money aesthetic.',
    'models/milo_knitwear_oatmeal_cable.webp',
    'human hands holding books, book glued to fur, deformed sweater collar, loose threads, synthetic polyester sheen, modern neon'
  )
];

export const CORPORATE_ENTRY: CascadingItem[] = [
  ...CORPORATE_CORE_TRIO,
  makeItem(
    'ceo_titan',
    '华尔街商业掌门人',
    'The Wall Street CEO',
    '权力西装',
    'Wall Street investment titan pet portrait, wearing a bespoke charcoal pinstripe double-breasted suit with broad peak lapels, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, corner office with panoramic Manhattan skyline sunset bokeh, power-broker luxury.'
  ),
  makeItem(
    'tech_visionary',
    '硅谷科技领袖',
    'The Silicon Valley Visionary',
    '极客领袖',
    'Silicon Valley tech visionary pet leader, wearing a minimalist black fine-gauge cashmere turtleneck sweater, designer tortoiseshell wire-rim round glasses, modern sunlit Scandinavian loft studio background, sleek espresso, visionary leadership aesthetic.'
  ),
  makeItem(
    'programmer',
    '程序员与技术码农',
    'Software Engineer & Developer',
    '码农工位风',
    'Tech company software engineer dog portrait, wearing a worn heather-grey hoodie under a navy fleece vest, professional over-ear studio headphones resting around neck, glowing dual monitor glow in background, relatable programmer aesthetic.'
  ),
  makeItem(
    'customer_support',
    '新媒体运营与客服',
    'Social Media & Customer Support',
    '周一早八风',
    'Social media specialist pet, wearing a light-blue casual Oxford button-up shirt with an open collar, company lanyard and photo ID badge hanging around neck, exhausted Monday morning office lighting, subtle iced coffee cup on desk edge.'
  ),
  makeItem(
    'night_shift',
    '熬夜审核打工人',
    'Night Shift Operations Specialist',
    '冷白加班灯',
    'Late night shift operations specialist, wearing a loose navy blue nylon windbreaker, neon yellow highlighter in chest pocket, cool 5600K fluorescent office lamp light, humorous overworked corporate irony.'
  ),
  makeItem(
    'intern',
    '摸鱼实习生',
    'Quiet Quitting Intern',
    '大学牲摸鱼',
    'Quiet quitting college intern pet, wearing an oversized cream cable-knit V-neck tennis sweater with a neat white collared shirt underneath, heavy canvas tote bag strap across chest, fresh youthful collegiate vibe.'
  )
];

export const CORPORATE_MANAGEMENT: CascadingItem[] = [
  makeItem(
    'scrum_master',
    '敏捷项目经理',
    'Agile Scrum Master',
    '看板站会风',
    'Agile Scrum Master pet portrait, wearing a fitted light-grey merino crewneck sweater over a subtle gingham checked shirt, colorful sticky notes on glass wall bokeh in background, sharp professional office lighting.'
  ),
  makeItem(
    'hr_director',
    '严苛人事主管',
    'HR Director & Recruiter',
    '面试官气场',
    'Strict HR director pet, wearing an impeccable tailored black wool blazer with sharp lapels, sleek black cat-eye reading glasses perched neatly, immaculate corporate interview backdrop, intimidating yet humorous elegance.'
  ),
  makeItem(
    'product_vp',
    '满嘴黑话产品总监',
    'Product Management VP',
    '硅谷极客黑',
    'Silicon Valley product executive, wearing a minimalist black fine-gauge cashmere turtleneck sweater, charcoal wool unconstructed overcoat wide collar, sleek keynote presentation aesthetic, visionary tech leadership vibe.'
  )
];

export const CORPORATE_SPECIALISTS: CascadingItem[] = [
  makeItem(
    'ceo_titan',
    '华尔街商业掌门人',
    'The Wall Street CEO',
    '权力西装',
    'Wall Street investment titan pet portrait, wearing a bespoke charcoal pinstripe double-breasted suit with broad peak lapels, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, corner office with panoramic Manhattan skyline sunset bokeh, power-broker luxury.'
  ),
  makeItem(
    'tech_visionary',
    '硅谷科技领袖',
    'The Silicon Valley Visionary',
    '极客领袖',
    'Silicon Valley tech visionary pet leader, wearing a minimalist black fine-gauge cashmere turtleneck sweater, designer tortoiseshell wire-rim round glasses, modern sunlit Scandinavian loft studio background, sleek espresso, visionary leadership aesthetic.'
  ),
  makeItem(
    'wall_street_trader',
    '华尔街投行分析师',
    'Wall Street Investment Banker',
    '双排扣细条纹',
    'Wall Street investment banker pet, wearing a bespoke charcoal pinstripe double-breasted suit lapel, crisp white dress shirt with gold cufflinks, rich crimson silk tie with tie clip, Bloomberg terminal bokeh, power-broker luxury.'
  ),
  makeItem(
    'trial_attorney',
    '诉讼大律师',
    'Senior Trial Attorney',
    '萨维尔街三件套',
    'Prestigious trial attorney pet, wearing a bespoke three-piece navy wool suit with tailored vest and gold pocket watch chain peeking out, warm mahogany law library bookshelf background, authoritative high-fashion legal portrait.'
  ),
  makeItem(
    'startup_ceo',
    '初创独角兽 CEO',
    'Tech Unicorn Founder & CEO',
    '敲钟领袖风',
    'Tech startup billionaire CEO, wearing a luxury unstructured midnight blue blazer over a pristine heavyweight white designer tee, subtle titanium luxury watch rim, clean minimalist studio lighting, Forbes 30 Under 30 cover style.'
  ),
  makeItem(
    'airline_pilot',
    '民航机长',
    'Commercial Airline Captain',
    '四道杠金肩章',
    'Commercial airline captain pet, wearing an authentic navy blue four-stripe gold braided pilot epaulet blazer, crisp white pilot shirt and black tie, warm cockpit ambient dashboard glow, heroic aviation portrait.'
  )
];

// ----------------------------------------------------------------------
// 3. COSPLAY (角色扮演 & 传奇名流)
// ----------------------------------------------------------------------
export const COSPLAY_LEGENDS: CascadingItem[] = [
  makeItem(
    'royal_monarch',
    '文艺复兴皇室君主',
    'The Renaissance Monarch',
    '皇室贵族',
    'Regal Renaissance royal monarch pet portrait, wearing a deep royal crimson and gold embroidered velvet mantle with ermine fur lining, ornate antique lace ruff collar, royal sash with gold heraldic medal crest, majestic European palace throne room lighting, Crown and Paw prestige.',
    'models/milo_gentle_navy_velvet.webp',
    'human arms, human hands, human fingers, crown obscuring eyes, deformed skull, cheap costume, plastic jewels, human skin exposed'
  ),
  makeItem(
    'witch',
    '神秘奇幻小女巫',
    'The Midnight Witch',
    '魔法奇境',
    'Mystical fantasy witch pet studio portrait. Wearing an elegant miniature midnight-purple or deep navy velvet witch pointed hat softly tilted between the ears, with the pet\'s two authentic furry ears resting naturally and completely visible at the sides of the brim, never flattening the skull or covering the eyes. Draped in a matching dark velvet capelet with delicate gold star embroidery and an antique bronze celestial moon clasp at chest. Soft ambient glow with floating warm amber and emerald fairy firefly sparkles bokeh, mysterious yet heartwarming and adorable, strictly authentic animal anatomy.',
    'models/milo_techwear_arctic_yellow.webp',
    'human arms, human ears, hat covering eyes, hat swallowing ears, hat piercing skull, scary horror gore, skulls, blood, spiderwebs, dark pitch black, ugly witch nose, human hands, deformed paws'
  ),
  makeItem(
    'cowboy',
    '西部荒野牛仔与浪漫女牛仔',
    'The Wild West Cowboy & Cowgirl',
    '西部传奇',
    'Chic Americana Wild West cowboy and Coastal Cowgirl pet portrait. Wearing a stylish miniature tan suede wide-brimmed cowboy hat resting gently on top head between natural furry ears, ears completely visible and uncompressed, unobstructed clear eyes and facial markings. Loosely tied caramel brown and soft vintage red paisley cotton bandana neckerchief around lower neck. Warm golden hour sunset prairie lighting, soft rustic wooden porch bokeh, free-spirited, charming and sunlit aesthetic, strictly authentic animal anatomy.',
    'models/milo_aviator_vintage_shearling.webp',
    'sunglasses obscuring eyes, heavy firearms, gun, saddle on back, plastic hat, hat crushing ears, choked neck, dirty mud, dust covering face, human arms, human fingers, dark dreary shadows'
  ),
  makeItem(
    'detective',
    '贝克街维多利亚大侦探',
    'The Baker Street Sleuth',
    '英伦神探',
    'Victorian Baker Street detective pet, wearing a classic British houndstooth wool tweed Inverness cape trench coat, antique silver monocle on delicate chain, vintage gaslight foggy London streetscape, dark academia mystery atmosphere.'
  ),
  makeItem(
    'aviator',
    '美式传奇王牌飞行员',
    'The Vintage Aviator Ace',
    '王牌飞行',
    'Vintage American aviator ace pet, wearing a rugged distressed brown B-3 shearling leather flight bomber jacket with plush sheepskin fleece collar, vintage brass aviator goggles pushed up over brow, silk flight scarf, golden sunset runway airfield bokeh, Top Gun heroism.'
  )
];

export const COSPLAY_MARVEL: CascadingItem[] = [
  makeItem(
    'iron_man',
    '钢铁侠：纳米 Mark 85 胸甲',
    'Iron Man Mark 85 (Unmasked)',
    '纳米反应堆',
    'Iron Man inspired superhero pet (no helmet, face fully natural), wearing a high-gloss hot-rod red and metallic gold nano-tech chest armor breastplate, glowing bright cyan triangular arc reactor in the center, mechanical shoulder joints, epic cinematic Marvel studio lighting.'
  ),
  makeItem(
    'spider_man',
    '蜘蛛侠：经典战衣与蛛丝肩甲',
    'Spider-Man Suit (Unmasked)',
    '立体蛛网纹',
    'Spider-Man inspired pet hero (unmasked, original pet face and eyes completely visible), wearing a tailored red spandex superhero suit collar with raised black webbing texture, matte black spider emblem on chest, New York city skyline dusk lighting.'
  ),
  makeItem(
    'deadpool',
    '死侍：战损背带与红黑工装',
    'Deadpool & Dogpool Suit',
    '双刀战损风',
    'Deadpool and Dogpool inspired battle-worn suit (unmasked face), wearing a distressed crimson and black leather tactical chest harness, twin katana hilt handles strapped over back, rugged brass buckle details, humorous antihero cinematic studio shot.'
  ),
  makeItem(
    'thor',
    '雷神：阿斯加德银鳞重铠',
    'Thor Odinson Heavy Armor',
    '神域重铠',
    'Thor God of Thunder pet warrior, wearing heavy silver metallic disc plate chest armor with Nordic filigree engravings, a regal flowing bright crimson velvet cape clasped at shoulders, subtle lightning sparks bokeh, cinematic blockbuster realism.'
  )
];

export const COSPLAY_DC: CascadingItem[] = [
  makeItem(
    'batman',
    '蝙蝠侠：哥谭暗黑凯夫拉战衣',
    'The Dark Knight Armor (Unmasked)',
    '凯夫拉防弹',
    'The Dark Knight Batman aesthetic (unmasked, natural pet head), wearing a tactical matte-black Kevlar chest plate with embossed bat emblem, heavy utility shoulder straps, wet rain reflections, moody Gotham neo-noir rim light.'
  ),
  makeItem(
    'superman',
    '超人：氪星深蓝纳米战衣',
    'Superman Kryptonian Suit',
    '氪星红黄盾',
    'Superman inspired hero suit, wearing an alien deep royal blue chainmail texture chest suit with the iconic red and yellow House of El diamond crest, rich flowing red cape draped behind shoulders, sun-flare heroic lighting.'
  ),
  makeItem(
    'joker',
    '小丑：哥谭紫绿撞色条纹三件套',
    'The Joker Vintage Tailoring',
    '紫绿撞色',
    'The Joker inspired villain fashion, wearing a vibrant deep purple tailored wool suit lapel, neon chartreuse green satin vest, vintage patterned silk tie, tiny lapel flower, dramatic theatrical circus lighting, stylish camp aesthetic.'
  )
];

export const COSPLAY_SCIFI: CascadingItem[] = [
  makeItem(
    'terminator',
    '终结者 T-800：经典皮夹克与机械臂',
    'Terminator T-800 Cybernetic Biker',
    '机车皮衣',
    'Terminator T-800 inspired pet, wearing a heavy distressed black motorcycle leather biker jacket with asymmetrical silver zippers and studs, subtle chrome cybernetic endoskeleton exposed at one shoulder, dystopian blue night highway light.'
  ),
  makeItem(
    'matrix_neo',
    '黑客帝国：尼奥立领暗黑风衣',
    'The Matrix Neo Trench Coat',
    '极客黑长袍',
    'The Matrix Neo inspired cyber coat, wearing a minimalist structured black gabardine high-collar trench coat, sleek micro oval sunglasses resting effortlessly, faint emerald green digital rain code bokeh in background.'
  ),
  makeItem(
    'jedi_knight',
    '绝地武士：星球大战绝地长袍',
    'Star Wars Jedi Knight Robe',
    '双层亚麻长袍',
    'Star Wars Jedi Knight robes, pet dressed in authentic textured natural oatmeal linen tunic with overlapping earthy brown hooded cloak draped on shoulders, wide leather utility belt buckle, cinematic dual-sun Tatooine glow.'
  )
];

// ----------------------------------------------------------------------
// 4. CELEBRATION (节日庆典)
// ----------------------------------------------------------------------
export const CELEBRATION_HOLIDAYS: CascadingItem[] = [
  makeItem(
    'christmas',
    '圣诞深红丝绒礼盒暖冬写真',
    'Christmas Velvet Box & Hearth',
    '圣诞盛典',
    'Christmas holiday luxury pet portrait. Pet naturally seated inside an open rich deep crimson velvet gift box, both front paws resting naturally and neatly over the front edge of the box without clipping legs. Wearing a deep forest-green plush fleece scarf collar adorned with a festive red silk ribbon and an opulent gold satin bow at chest. In the warm bokeh background stands a magnificently decorated grand Christmas tree with red and gold baubles, warm fairy lights, and neatly stacked holiday gift boxes, subtle tiny soft snowflakes gently drifting down, 50mm portrait lens, warm golden hearth glow.',
    'models/milo_warm.webp',
    'gift box cutting off front legs, paws trapped in box rim, gift box piercing body, scarf or bow covering face, decorations piercing fur, snowflakes covering eyes, gifts obscuring subject, overly crowded background, duplicate text, typo, gibberish, Christmas tree growing out of pet, pet wrapped like a package, wrong paw count'
  ),
  makeItem(
    'halloween',
    '万圣节软萌小恶魔与南瓜写真',
    'Halloween Spooky Magic & Pumpkins',
    '万圣奇境',
    'Whimsical cozy and cute Halloween pet studio portrait. Completely non-frightening, adorable and heartwarming. Pet wearing delicate miniature velvety devil horns resting gently on top fur without piercing skull or ears, and a dainty dark velvet bow tie below chin. Scattered around pet on floor are gently glowing carved jack-o-lantern mini pumpkins, curly dried vines, tiny black bat ornaments, and purple autumn leaves. Moody warm candlelight bokeh background, soft warm orange illumination, cozy luxury pet celebration.',
    'models/milo_techwear_arctic_yellow.webp',
    'horror, bloody, skulls, open wounds, sharp fangs, scary menacing expression, heavy bulky costume, giant devil horns, horns piercing ears, horns penetrating skull, bats covering face, pumpkin fused with body, cluttered props, pitch black background, frightening lighting'
  ),
  makeItem(
    'easter',
    '复活节：春日马卡龙粉蓝碎花领结',
    'Easter Garden Party',
    '春日碎花',
    'Easter garden gala pet portrait, wearing a tailored pastel mint-green and baby-pink linen waistcoat, delicate daisy floral print silk bow tie, soft morning spring garden sunlight, pastel painted eggs in blurred foreground.'
  ),
  makeItem(
    'thanksgiving',
    '感恩节：秋日焦糖大地色羊毛猎装',
    'Thanksgiving Autumn Harvest',
    '丰收金秋',
    'Thanksgiving harvest celebration, pet wearing an authentic caramel brown and warm oatmeal houndstooth wool hacking jacket, olive knit inner collar, golden autumn maple leaf bokeh, rich warm sunset glow.'
  )
];

export const CELEBRATION_MILESTONES: CascadingItem[] = [
  makeItem(
    'birthday_vip',
    '生日 VIP 浮雕小蛋糕礼宾写真',
    'Birthday VIP Gala & Cake',
    '生日专属',
    'VIP Birthday celebration pet studio portrait. Natural relaxed sitting or lying pose facing camera with adorable calm expression. Wearing a lightweight macaron pastel party hat centered on head with natural volume without piercing ears, soft pink ruffled collar necklace loosely draped around lower chest. In front sits an artisanal mini pet birthday cake made of gourmet meat pâté and shrimp on a delicate embossed porcelain plate, topped with a single gently glowing lit birthday candle providing warm amber ambient candlelight, shallow depth of field, high resolution luxury pet studio photography.',
    'models/milo_gentle.webp',
    'hat penetrating ears, strap digging into skin, collar covering mouth, pet touching flame, candle too close to fur, multiple candles, cake fused with paws, cake attached to human body, underexposed, forced human grin, dangerous flame, dripping wax'
  ),
  makeItem(
    'debutante',
    '名媛成人礼：巴洛克多圈天然微型珍珠项链',
    'The Debutante Ball Gala',
    '巴洛克珍珠',
    'Debutante ball high-society gala portrait, pet wearing a lavish multi-strand baroque seed-pearl choker necklace with a miniature emerald gem pendant, blush-pink tulle gown collar, soft aristocratic salon chandelier lighting.'
  ),
  makeItem(
    'graduation',
    '毕业典礼：微型学士垂布与荣誉勋带',
    'The Ivy League Graduation',
    '常青藤学士',
    'Ivy League pet graduation portrait, pet wearing a formal black academic gown collar with deep crimson and navy blue silk graduation hood trim, golden honor stole across chest, warm library atmosphere, proud milestone finish.'
  ),
  makeItem(
    'wedding_ringbearer',
    '婚礼花童伴宠：极简象牙白缎面领结',
    'Wedding Ring-Bearer Tuxedo',
    '婚典花童',
    'Wedding ring-bearer pet fashion portrait, pet wearing a crisp pure white dress shirt collar with an exquisite double-layered ivory silk satin bow tie, tiny woven gold ring motif, romantic soft-focus white rose floral arch background.'
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
        id: 'classical_masters',
        nameZh: '古典名画派',
        nameEn: 'Classical Masters',
        items: FINE_ART_CLASSICAL
      },
      {
        id: 'impressionist',
        nameZh: '现代主义与印象派',
        nameEn: 'Modern & Impressionist',
        items: FINE_ART_IMPRESSIONIST
      },
      {
        id: 'pop_contemporary',
        nameZh: '先锋插画与波普',
        nameEn: 'Pop & Contemporary',
        items: FINE_ART_POP
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
        id: 'entry_level',
        nameZh: '工位基层牛马',
        nameEn: 'Entry-Level Drones',
        items: CORPORATE_ENTRY
      },
      {
        id: 'management',
        nameZh: '管理与中层',
        nameEn: 'Management & Leads',
        items: CORPORATE_MANAGEMENT
      },
      {
        id: 'specialists',
        nameZh: '行业专业人员',
        nameEn: 'Specialists & Execs',
        items: CORPORATE_SPECIALISTS
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
        id: 'legends',
        nameZh: '公有领域传奇人物',
        nameEn: 'Legendary Personas',
        items: COSPLAY_LEGENDS
      },
      {
        id: 'marvel',
        nameZh: '漫威英雄联盟',
        nameEn: 'Marvel Icons',
        items: COSPLAY_MARVEL
      },
      {
        id: 'dc',
        nameZh: 'DC 黑暗宇宙',
        nameEn: 'DC Universe',
        items: COSPLAY_DC
      },
      {
        id: 'scifi',
        nameZh: '科幻经典银幕',
        nameEn: 'Sci-Fi Legends',
        items: COSPLAY_SCIFI
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
        id: 'holidays',
        nameZh: '西方传统盛大节日',
        nameEn: 'Major Holidays',
        items: CELEBRATION_HOLIDAYS
      },
      {
        id: 'milestones',
        nameZh: '人生高光时刻',
        nameEn: 'Milestone Events',
        items: CELEBRATION_MILESTONES
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
    prompt: FINE_ART_CLASSICAL[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
    variants: cascadingToLegacyVariants('fine_art')
  },
  corporate: {
    key: 'corporate',
    name: 'Corporate',
    subtitle: 'Silicon Valley & Wall Street 9-to-5',
    prompt: CORPORATE_ENTRY[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
    variants: cascadingToLegacyVariants('corporate')
  },
  cosplay: {
    key: 'cosplay',
    name: 'Cosplay',
    subtitle: 'Historical Royalty & Iconic Legends',
    prompt: COSPLAY_LEGENDS[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
    variants: cascadingToLegacyVariants('cosplay')
  },
  celebration: {
    key: 'celebration',
    name: 'Celebration',
    subtitle: 'Holiday Galas & VIP Milestones',
    prompt: CELEBRATION_HOLIDAYS[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.celebration.fallbackImageUrl,
    variants: cascadingToLegacyVariants('celebration')
  },
  // Legacy aliases mapped seamlessly
  gentle: {
    key: 'gentle',
    name: 'Fine Art (Legacy)',
    subtitle: 'Classical Art Masterpieces',
    prompt: FINE_ART_CLASSICAL[1].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.fine_art.fallbackImageUrl,
    variants: cascadingToLegacyVariants('fine_art')
  },
  detective: {
    key: 'detective',
    name: 'Corporate (Legacy)',
    subtitle: 'Executive & Aviator',
    prompt: CORPORATE_SPECIALISTS[3].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.corporate.fallbackImageUrl,
    variants: cascadingToLegacyVariants('corporate')
  },
  street: {
    key: 'street',
    name: 'Cosplay (Legacy)',
    subtitle: 'Cyber & Superhero',
    prompt: COSPLAY_MARVEL[0].fullPrompt,
    fallbackImageUrl: CASCADING_THEMES.cosplay.fallbackImageUrl,
    variants: cascadingToLegacyVariants('cosplay')
  },
  warm: {
    key: 'warm',
    name: 'Celebration (Legacy)',
    subtitle: 'Festive & Winter Holiday',
    prompt: CELEBRATION_HOLIDAYS[0].fullPrompt,
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
    for (const sub of theme.subCategories) {
      if (!subId || sub.id === subId) {
        const found = sub.items.find((it) => it.id === itemId);
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

  const fullPrompt = `${IDENTITY_ANCHOR} ${item.wardrobePrompt} ${skillDirective} ${STUDIO_FINISH}`;
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

