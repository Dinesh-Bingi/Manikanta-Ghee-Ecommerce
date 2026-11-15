import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'manikanta-traditional-a2-bilona',
    slug: 'traditional-a2-bilona-buffalo-ghee',
    name: 'Traditional A2 Bilona Buffalo Ghee',
    category: 'traditional-bilona',
    categoryDisplayName: 'Traditional Vedic Bilona Buffalo Ghee',
    tagline: 'An authentic expression of slow-churned Indian dairy heritage.',
    shortDescription:
      'Handcrafted using the ancient two-way wooden bilona churning method from naturally cultured buffalo curd. Delivers the signature golden-grainy (danedar) texture and deeply aromatic nutty profile.',
    longDescription: [
      'Manikanta Traditional A2 Bilona Buffalo Ghee is an ode to timeless Indian culinary wisdom. Sourced exclusively from healthy, pasture-grazing Indian Murrah buffaloes, this ghee is made following the sacred five-stage Vedic process.',
      'Unlike industrial ghee produced directly from centrifuged cream, our Bilona ghee begins with fresh whole buffalo milk that is naturally curdled overnight in earthen clay pots. The curd is then hand-churned bidirectionally with a wooden churner (mathani / bilona) using cotton ropes until tender makkhan (cultured butter) separates.',
      'This cultured butter is gently clarified over slow firewood embers in brass vessels, allowing moisture to evaporate and milk solids to caramelize subtly. The result is pure, golden-ivory clarified butter packed with rich natural aroma and unmistakable danedar (granular) texture.'
    ],
    heroImage: '/images/bilona_product.png',
    gallery: [
      '/images/bilona_product.png',
      '/images/bilona_process.png',
      '/images/hero_jar.png',
      '/images/lifestyle_pour.png'
    ],
    jarSizes: [
      {
        size: '250ml',
        weightGrams: 230,
        price: 5,
        originalPrice: 550,
        inStock: true,
        sku: 'MK-BIL-250'
      },
      {
        size: '500ml',
        weightGrams: 460,
        price: 5,
        originalPrice: 990,
        inStock: true,
        sku: 'MK-BIL-500'
      },
      {
        size: '1000ml',
        weightGrams: 920,
        price: 5,
        originalPrice: 1890,
        inStock: true,
        sku: 'MK-BIL-1000'
      },
      {
        size: '2000ml',
        weightGrams: 1840,
        price: 5,
        originalPrice: 3600,
        inStock: true,
        sku: 'MK-BIL-2000'
      }
    ],
    features: [
      '100% Pure Indian Buffalo Milk (Zero Cow Milk)',
      'Traditional Bi-directional Wooden Bilona Churning',
      'Cultured from Whole Buffalo Milk Curd (Makkhan Base)',
      'Slow Firewood Simmered for Granular (Danedar) Texture',
      'Naturally Rich in Healthy Fats & High Smoke Point (250°C)',
      'Packed in UV-Protective Luxury Food-Grade Glass Jars'
    ],
    processSummary: [
      'Fresh pure buffalo milk sourced at dawn',
      'Natural whole-curd setting in earthen vessels',
      'Two-way wooden bilona churning to harvest makkhan',
      'Gentle firewood clarification and hand straining'
    ],
    specifications: [
      { label: 'Milk Source', value: '100% Indian Water Buffalo (Murrah)' },
      { label: 'Preparation Method', value: 'Traditional 5-Stage Vedic Bilona Churning' },
      { label: 'Consistency / Texture', value: 'Rich, natural granular (Danedar)' },
      { label: 'Aroma', value: 'Deeply aromatic, nutty, roasted caramel notes' },
      { label: 'Smoke Point', value: 'Approx. 250°C (482°F) — Excellent for deep cooking' },
      { label: 'Preservatives / Additives', value: 'Zero Artificial Additives, Zero Preservatives' },
      { label: 'Packaging', value: 'Airtight premium glass jar with safety gold seal' },
      { label: 'Shelf Life', value: '12 Months from packaging date' }
    ],
    nutritionalInfo: {
      servingSize: '1 Tablespoon (15g / ~14ml)',
      energyKcal: '135 kcal',
      totalFat: '15.0 g',
      saturatedFat: '9.8 g',
      monounsaturatedFat: '4.1 g',
      polyunsaturatedFat: '0.6 g',
      cholesterol: '33 mg',
      transFat: '0.0 g',
      carbohydrates: '0.0 g',
      protein: '0.0 g',
      sodium: '0 mg'
    },
    ingredients: '100% Clarified Cultured Butter (derived exclusively from Pure Buffalo Milk).',
    storageInstructions:
      'Store in a cool, dry place away from direct sunlight. Do not refrigerate, as cooling disrupts the natural grain crystallization. Always use a dry, clean spoon.',
    manufacturingInfo:
      'Manufactured and packed by Manikanta Dairy Products. Batch details, FSSAI Lic. No., and exact Mfd date stamped on the jar base.',
    labVerificationNotice:
      'Tested for purity and zero adulteration. A2 beta-casein protein characterization verified through independent certified dairy laboratory chromatography. No synthetic dyes or palm fats.',
    badge: 'Vedic Bilona Churned',
    rating: 4.95,
    reviewCount: 142
  },
  {
    id: 'manikanta-modern-buffalo-ghee',
    slug: 'modern-buffalo-ghee',
    name: 'Modern Buffalo Ghee',
    category: 'modern-buffalo',
    categoryDisplayName: 'Standard Modern Clarified Buffalo Ghee',
    tagline: 'Pure, wholesome buffalo ghee perfected for everyday modern cooking.',
    shortDescription:
      'Crafted from fresh, tested buffalo cream using modern stainless-steel temperature-controlled clarification. Clean, silky golden clarity designed for everyday rotis, fragrant tadkas, and family meals.',
    longDescription: [
      'Manikanta Modern Buffalo Ghee offers the pure richness of buffalo dairy optimized for modern urban kitchens. Designed for families who seek pristine purity, consistent golden aroma, and uncompromising hygiene at everyday value.',
      'Using modern hygienic dairy separation, fresh cream from local buffalo farms is collected, batch-pasteurized, and clarified at regulated temperatures in sealed stainless steel kettles. This ensures strict moisture elimination while preserving the natural golden goodness of buffalo milk fat.',
      'With a high smoke point of 250°C, it is your everyday kitchen companion for golden parathas, aromatic dal tadka, biryanis, and traditional festival mithai without burning or smoking.'
    ],
    heroImage: '/images/modern_product.png',
    gallery: [
      '/images/modern_product.png',
      '/images/lifestyle_pour.png',
      '/images/hero_jar.png',
      '/images/murrah_buffaloes.png'
    ],
    jarSizes: [
      {
        size: '250ml',
        weightGrams: 230,
        price: 5,
        originalPrice: 380,
        inStock: true,
        sku: 'MK-MOD-250'
      },
      {
        size: '500ml',
        weightGrams: 460,
        price: 5,
        originalPrice: 680,
        inStock: true,
        sku: 'MK-MOD-500'
      },
      {
        size: '1000ml',
        weightGrams: 920,
        price: 5,
        originalPrice: 1290,
        inStock: true,
        sku: 'MK-MOD-1000'
      },
      {
        size: '5000ml (Tin)',
        weightGrams: 4600,
        price: 5,
        originalPrice: 5900,
        inStock: true,
        sku: 'MK-MOD-5000'
      }
    ],
    features: [
      '100% Pure Buffalo Milk Fat (Zero Cow Milk, Zero Vegetable Fat)',
      'Modern Stainless Steel Temperature-Controlled Clarification',
      'Ultra-Hygienic Closed Processing Environment',
      'Consistent Light Golden Clarity & Pleasant Fragrance',
      'High Smoke Point (250°C) Ideal for Daily Sautéing & Frying',
      'Food-Safe Hermetically Sealed Glass Jars and Food-Grade Tins'
    ],
    processSummary: [
      'Direct farm collection of tested buffalo milk',
      'Hygienic cream separation and batch pasteurization',
      'Regulated thermal clarification in sterile stainless kettles',
      'Automated vacuum filling and airtight nitrogen-flushed seal'
    ],
    specifications: [
      { label: 'Milk Source', value: '100% Pure Indian Buffalo Milk' },
      { label: 'Preparation Method', value: 'Modern Hygienic Thermal Clarification' },
      { label: 'Consistency / Texture', value: 'Silky smooth golden consistency' },
      { label: 'Aroma', value: 'Clean, warm, comforting buttery aroma' },
      { label: 'Smoke Point', value: '250°C (482°F) — Outstanding thermal stability' },
      { label: 'Preservatives / Additives', value: '100% Pure Ghee — Zero Starch, Zero Preservatives' },
      { label: 'Packaging', value: 'Hermetically sealed food-grade glass jar / tin' },
      { label: 'Shelf Life', value: '12 Months from packaging date' }
    ],
    nutritionalInfo: {
      servingSize: '1 Tablespoon (15g / ~14ml)',
      energyKcal: '135 kcal',
      totalFat: '15.0 g',
      saturatedFat: '10.0 g',
      monounsaturatedFat: '4.0 g',
      polyunsaturatedFat: '0.5 g',
      cholesterol: '35 mg',
      transFat: '0.0 g',
      carbohydrates: '0.0 g',
      protein: '0.0 g',
      sodium: '0 mg'
    },
    ingredients: '100% Pure Milk Fat derived exclusively from Buffalo Milk.',
    storageInstructions:
      'Store in a cool and dry pantry. Keep container tightly closed when not in use. Avoid moisture exposure.',
    manufacturingInfo:
      'Manufactured and packed by Manikanta Dairy Products. Certified dairy processing unit with ISO & HACCP hygiene compliance.',
    labVerificationNotice:
      'Standardized and laboratory batch-verified for fatty acid profile and total absence of vegetable oils (Argemone / Palm).',
    badge: 'Everyday Culinary Pure',
    rating: 4.88,
    reviewCount: 98
  }
];

export const BRAND_DETAILS = {
  name: 'MANIKANTA GHEE',
  tagline: 'Tradition • Purity • Quality',
  headline: 'THE GOLDEN ESSENCE OF TRADITION.',
  subheading: 'Pure buffalo ghee, crafted with tradition and brought to your home with care.',
  exclusivePledge: 'We manufacture and sell buffalo ghee only. 100% Pure Buffalo Milk.',
  phone: import.meta.env.VITE_BRAND_PHONE || '+91 6303328180',
  whatsapp: import.meta.env.VITE_BRAND_WHATSAPP || '+91 6303328180',
  email: import.meta.env.VITE_BRAND_EMAIL || 'ayyappadairyfarms@gmail.com',
  address: 'Ayyappa Dairy Farm, Survey No. 115, Raghunathpur, Yadadri Bhuvanagiri District, Telangana 508105, India',
  fssaiNumber: import.meta.env.VITE_FSSAI_NUMBER || 'Applied / In Process',
  socials: {
    instagram: 'https://instagram.com/manikanta.ghee',
    facebook: 'https://facebook.com/manikantaghee',
    youtube: 'https://youtube.com/@manikantaghee'
  }
};
