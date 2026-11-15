import { ProcessStep } from '../types';

export const TRADITIONAL_BILONA_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Pure Buffalo Milk Collection',
    subtitle: 'High-fat wholesome milk at dawn',
    description:
      'We collect fresh, rich whole milk exclusively from Indian Murrah buffaloes raised with care on natural green pastures. Buffalo milk naturally has a rich fat content (7.5% - 8.5%), imparting the legendary full-bodied depth to the ghee.',
    details: [
      'Single-origin pasture-grazed buffalo herds',
      'Tested for zero antibiotic residue and zero adulterants',
      'No cow milk mixed — strictly 100% buffalo milk'
    ],
    vesselOrTool: 'Sterilized brass and food-grade steel containers',
    duration: 'Dawn collection within 2 hours of milking'
  },
  {
    stepNumber: 2,
    title: 'Natural Curd Culturing',
    subtitle: 'Slow overnight microbial fermentation',
    description:
      'Unlike industrial ghee made from centrifugal raw cream, authentic Vedic Bilona ghee begins with whole cultured curd. The fresh milk is boiled gently, cooled to lukewarm, and inoculated with traditional heirloom starter culture in unglazed earthenware pots.',
    details: [
      'Naturally fermented in breathable terracotta clay pots',
      '12-14 hours of undisturbed room-temperature incubation',
      'Develops rich lactic acidity that naturally preserves the butterfat'
    ],
    vesselOrTool: 'Handmade earthen terracotta matkas',
    duration: '12 – 14 Hours slow culturing'
  },
  {
    stepNumber: 3,
    title: 'Bi-directional Wooden Churning',
    subtitle: 'The sacred Bilona & Valona method',
    description:
      'In the quiet hours before sunrise, the cultured curd is churned using a heavy grooved wooden churner (Mathani / Bilona). Two operators pull alternating cotton ropes in rhythmic clockwise and counter-clockwise motion.',
    details: [
      'Gentle bi-directional churn preserves fragile lipid structures',
      'Zero heat generated during manual low-RPM churning',
      'Traditional wooden timber selected to prevent oxidation'
    ],
    vesselOrTool: 'Turned wooden bilona & twisted cotton valona ropes',
    duration: '45 – 60 Minutes per batch'
  },
  {
    stepNumber: 4,
    title: 'Makkhan (Cultured Butter) Separation',
    subtitle: 'Harvesting the floating golden-white butter',
    description:
      'As the curd separates, velvety globules of cultured butter (makkhan) float to the surface. Our artisans hand-scoop this fresh makkhan and gently wash it in chilled water, separating pure buttermilk (chaas) which is shared locally.',
    details: [
      'Hand-harvested by experienced dairy artisans',
      'Rinsed in cold water to remove residual whey liquid',
      'Buttermilk returned to local community farmsteads'
    ],
    vesselOrTool: 'Earthen skimming bowls & pure cold well water',
    duration: 'Carefully hand-gathered at sunrise'
  },
  {
    stepNumber: 5,
    title: 'Slow Firewood Clarification',
    subtitle: 'Simmered over mild embers in heavy brass',
    description:
      'The harvested makkhan is slowly melted in heavy-bottomed brass or bronze vessels (kadhai) over low-temperature wood and cow-dung-free embers. As water evaporates, the milk solids slowly brown, imparting the signature nutty fragrance.',
    details: [
      'Strict low-heat monitoring below 110°C',
      'Curd solids slowly brown to impart roasted aroma',
      'Granular (danedar) crystal formation begins here'
    ],
    vesselOrTool: 'Heavy-gauge lead-free brass kadhai',
    duration: '90 – 120 Minutes of slow simmering'
  },
  {
    stepNumber: 6,
    title: 'Muslin Filtering & Glass Jar Packaging',
    subtitle: 'Pure golden grain settled naturally',
    description:
      'The clarified ghee is passed through multi-layered organic cotton muslin cloths to remove every trace of sediment. It is poured while still warm into sterilized amber-clear glass jars and left to cool at ambient temperature to set into exquisite granules.',
    details: [
      'Traditional triple-filtered through fine woven muslin',
      'Poured warm into food-grade heavy glass jars',
      'Cooled naturally without refrigeration to guarantee danedar grains'
    ],
    vesselOrTool: 'Organic cotton muslin & lead-free glass jars',
    duration: 'Natural 24-hour setting before dispatch'
  }
];

export const MODERN_BUFFALO_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Tested Buffalo Milk Sourcing',
    subtitle: 'Certified farm collection & quality checks',
    description:
      'High-grade buffalo milk is collected directly from partner dairy farmers under strict cold-chain logistics. Every delivery undergoes standardized testing for fat content, lactometer density, and chemical purity.',
    details: [
      'Rapid chilled collection below 4°C',
      'Digital automated quality testing for SNF and fat percentage',
      'Zero synthetic hormones or preservatives permitted'
    ],
    vesselOrTool: 'Insulated stainless steel dairy tankers',
    duration: 'Rapid cold transit within 3 hours'
  },
  {
    stepNumber: 2,
    title: 'Centrifugal Cream Separation & Pasteurization',
    subtitle: 'Hygienic separation in closed systems',
    description:
      'The milk is warmed mildly and passed through high-precision sanitary centrifugal separators to extract pure, dense buffalo cream. The cream is immediately pasteurized to eliminate pathogens while preserving clean dairy flavor.',
    details: [
      'Hygienic closed SS 316 separator line',
      'Standardized gentle pasteurization',
      'Separated skim milk utilized for value-added dairy nutrition'
    ],
    vesselOrTool: 'Industrial stainless steel centrifugal separators',
    duration: 'Continuous closed-loop processing'
  },
  {
    stepNumber: 3,
    title: 'Controlled Thermal Clarification',
    subtitle: 'Precise temperature cooking in SS kettles',
    description:
      'The sweet buffalo cream is pumped into jacketed stainless steel ghee boilers equipped with continuous mechanical agitation and digital PID temperature monitoring. Moisture is completely removed under precise thermal profiles.',
    details: [
      'Even indirect steam-jacketed heating prevents scorching',
      'Precise moisture reduction below 0.3% for long stability',
      'Clean, consistent golden clarity with high smoke point'
    ],
    vesselOrTool: 'Multi-jacketed SS 316 ghee clarification vessels',
    duration: 'Automated 60-minute clarification cycle'
  },
  {
    stepNumber: 4,
    title: 'Micron Filtration & Hermetic Filling',
    subtitle: 'Sealed for freshness and everyday convenience',
    description:
      'The hot liquid ghee is passed through food-grade micron filters to achieve crystalline clarity. It is then automatedly filled into pre-sterilized glass jars and food-grade tins under a sanitary nitrogen blanket for extended pantry shelf life.',
    details: [
      'Fine micron mechanical filtration',
      'Airtight hermetic sealing with tamper-evident caps',
      'Batch-coded and lab-analyzed before warehouse release'
    ],
    vesselOrTool: 'Automated rotary vacuum bottling & nitrogen flush line',
    duration: 'Instant hygienic packaging'
  }
];
