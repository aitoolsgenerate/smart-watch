import { FaqItem, Testimonial, WatchCategory, WatchProduct } from '../types/watch';
import heroChronograph from '../assets/images/hero_chronograph_watch_1795523762466.jpg';
import watchBalticBlue from '../assets/images/watch_baltic_blue_1795523763478.jpg';
import watchBulovaChronograph from '../assets/images/watch_bulova_chronograph_1795523763915.jpg';
import watchOrientSunburst from '../assets/images/watch_orient_sunburst_1795523763989.jpg';
import watchSeikoDiver from '../assets/images/watch_seiko_diver_1795523762176.jpg';
import watchTissotDress from '../assets/images/watch_tissot_dress_1795523763988.jpg';
import watchTravelLeatherCase from '../assets/images/watch_travel_leather_case_1795523763413.jpg';
import watchmakerInspectionBench from '../assets/images/watchmaker_inspection_bench_1795523764065.jpg';

export const HERO_IMAGE = heroChronograph;
export const INSPECTION_IMAGE = watchmakerInspectionBench;
export const TRAVEL_CASE_IMAGE = watchTravelLeatherCase;

export const WATCH_CATEGORIES: WatchCategory[] = [
  'All Watches',
  'Chronographs',
  'Diver & Sport',
  'Dress & Heritage',
  'Pre-Owned',
  'Accessories',
];

export const WATCH_CATALOG: WatchProduct[] = [
  {
    id: 'seiko-speedtimer-ssc813',
    brand: 'Seiko',
    name: 'Prospex Speedtimer Panda',
    category: 'Chronographs',
    isPreOwned: false,
    condition: 'New',
    movementType: 'Chronograph',
    price: 685,
    image: heroChronograph,
    straps: ['Brushed Steel Bracelet', 'Black Rally Calfskin'],
    badge: 'Collector Favorite',
    description:
      'High-contrast silver sunray panda dial with matte black tachymeter bezel, sapphire crystal, and compact 39mm sport chronograph proportions.',
    specs: {
      reference: 'SSC813P1',
      caliber: 'Caliber V192 Solar Chronograph',
      powerReserve: '6 Months Full Charge',
      caseDiameter: '39.0 mm',
      lugToLug: '45.5 mm',
      waterResistance: '100 m / 10 bar',
      crystal: 'Curved Sapphire with AR Coating',
    },
  },
  {
    id: 'baltic-hermetique-navy',
    brand: 'Baltic',
    name: 'Hermetique Sector Navy',
    category: 'Dress & Heritage',
    isPreOwned: false,
    condition: 'New',
    movementType: 'Automatic',
    price: 740,
    image: watchBalticBlue,
    straps: ['Cognac Bridle Leather', 'Beads of Rice Steel'],
    description:
      'French neo-vintage field-dress timepiece featuring a stepped sector dial, integrated recessed crown, and double-domed sapphire crystal.',
    specs: {
      reference: 'BLT-HM-NV04',
      caliber: 'Miyota 9039 No-Date Automatic',
      powerReserve: '42 Hours',
      caseDiameter: '37.0 mm',
      lugToLug: '46.0 mm',
      waterResistance: '150 m / 15 bar',
      crystal: 'Double-Domed Sapphire',
    },
  },
  {
    id: 'seiko-prospex-emerald',
    brand: 'Seiko',
    name: 'Prospex Emerald Diver 200',
    category: 'Diver & Sport',
    isPreOwned: false,
    condition: 'New',
    movementType: 'Automatic',
    price: 890,
    image: watchSeikoDiver,
    straps: ['Oyster Stainless Bracelet', 'Vulcanized Black Rubber'],
    badge: 'In Stock',
    description:
      'ISO-rated 200m mechanical diver featuring an emerald sunburst dial, luminous ceramic unidirectional bezel, and solid milled clasp.',
    specs: {
      reference: 'SPB177J1',
      caliber: 'Caliber 6R35 Automatic',
      powerReserve: '70 Hours',
      caseDiameter: '40.5 mm',
      lugToLug: '47.6 mm',
      waterResistance: '200 m / 20 bar',
      crystal: 'Sapphire with Cyclops Lens',
    },
  },
  {
    id: 'tissot-ballade-guilloche',
    brand: 'Tissot',
    name: 'Ballade Silver Guilloche 40',
    category: 'Dress & Heritage',
    isPreOwned: true,
    condition: 'Pre-Owned',
    movementType: 'Automatic',
    price: 620,
    originalPrice: 795,
    image: watchTissotDress,
    straps: ['Integrated Steel Bracelet', 'Midnight Alligator Grain'],
    badge: 'Certified Pre-Owned',
    description:
      'COSC-grade Swiss automatic dress watch with crisp Clous de Paris textured silver dial, box, warranty card, and full 48-point movement audit.',
    specs: {
      reference: 'T108.408.11.037.00',
      caliber: 'Powermatic 80 Silicon Balance',
      powerReserve: '80 Hours',
      caseDiameter: '40.0 mm',
      lugToLug: '46.2 mm',
      waterResistance: '50 m / 5 bar',
      crystal: 'Scratch-Resistant Sapphire',
    },
  },
  {
    id: 'bulova-chronograph-archive',
    brand: 'Bulova',
    name: 'Archive Racing Chronograph',
    category: 'Chronographs',
    isPreOwned: true,
    condition: 'Pre-Owned',
    movementType: 'Chronograph',
    price: 540,
    originalPrice: 690,
    image: watchBulovaChronograph,
    straps: ['Perforated Black Rally Leather', 'Brushed Steel Link'],
    description:
      '1970s motorsport-inspired tri-compax chronograph with matte slate dial, brushed steel tachymeter bezel, and hand-stitched perforated calfskin.',
    specs: {
      reference: '96B251-ARC',
      caliber: 'High-Frequency 262 kHz Precisionist',
      powerReserve: '36 Months Cell',
      caseDiameter: '41.0 mm',
      lugToLug: '48.0 mm',
      waterResistance: '100 m / 10 bar',
      crystal: 'Flat Sapphire Crystal',
    },
  },
  {
    id: 'orient-kamasu-crimson',
    brand: 'Orient',
    name: 'Mako III Crimson Sunburst',
    category: 'Diver & Sport',
    isPreOwned: false,
    condition: 'New',
    movementType: 'Automatic',
    price: 395,
    image: watchOrientSunburst,
    straps: ['Brushed Steel Bracelet', 'Espresso Horween Leather'],
    description:
      'In-house Japanese mechanical sport watch prized for its deep burgundy radial dial, faceted baton indices, and hacking seconds hand.',
    specs: {
      reference: 'RA-AA0003R19B',
      caliber: 'Orient In-House Cal. F6922',
      powerReserve: '40 Hours',
      caseDiameter: '41.8 mm',
      lugToLug: '46.8 mm',
      waterResistance: '200 m / 20 bar',
      crystal: 'Flat Sapphire Crystal',
    },
  },
  {
    id: 'ai-watches-travel-case',
    brand: 'Ai Watches',
    name: 'Saddle Leather Watch Vault',
    category: 'Accessories',
    isPreOwned: false,
    condition: 'New',
    movementType: 'Leather Craft',
    price: 145,
    image: watchTravelLeatherCase,
    straps: ['Espresso Full-Grain', 'Obsidian Matte Grain'],
    badge: 'Studio Edition',
    description:
      'Hand-stitched full-grain vegetable-tanned leather travel pouch lined with ultra-soft suede cushions and solid antique brass snaps.',
    specs: {
      reference: 'AW-CASE-01',
      caliber: 'Fits Cases up to 44 mm',
      powerReserve: 'Single-Watch Cushion Core',
      caseDiameter: '105 × 78 × 54 mm',
      lugToLug: 'Brass Snap Closure',
      waterResistance: 'Waxed Weather-Treated Hide',
      crystal: 'Microfiber Suede Interior',
    },
  },
  {
    id: 'sugess-chronograph-1963',
    brand: 'Sugess',
    name: 'Heritage Column-Wheel Chrono',
    category: 'Chronographs',
    isPreOwned: true,
    condition: 'Pre-Owned',
    movementType: 'Mechanical',
    price: 460,
    image: watchmakerInspectionBench,
    straps: ['Charcoal Calfskin', 'Milanese Steel Mesh'],
    description:
      'Hand-wound mechanical column-wheel chronograph with exhibition sapphire caseback displaying blued screws and swan-neck regulator.',
    specs: {
      reference: 'SU1901-SW',
      caliber: 'ST1901 Hand-Wound Column Wheel',
      powerReserve: '45 Hours',
      caseDiameter: '38.0 mm',
      lugToLug: '46.0 mm',
      waterResistance: '50 m / 5 bar',
      crystal: 'Box-Domed Sapphire Front & Back',
    },
  },
];

export const COLLECTOR_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Tariq Mahmood',
    role: 'Architectural Partner',
    city: 'Lahore',
    watchPurchased: 'Tissot Ballade Silver Guilloche 40',
    quote:
      'Ordered my fifth mechanical piece through Ai Watches. The timing sheet from their 48-point inspection arrived in the box, and accuracy has held within +2 seconds per day.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Dr. Shoaib Durrani',
    role: 'Cardiothoracic Surgeon',
    city: 'Karachi',
    watchPurchased: 'Bulova Archive Racing Chronograph',
    quote:
      'I was cautious buying a pre-owned chronograph remotely, but their serial verification and macro inspection video gave complete peace of mind. Arrived insured in 36 hours.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Daniel Vance',
    role: 'Industrial Designer',
    city: 'London',
    watchPurchased: 'Baltic Hermetique Sector Navy',
    quote:
      'Used the bespoke sourcing desk to locate an unworn sector-dial Baltic with box and papers. Transparent pricing with zero hidden fees and immaculate presentation.',
    rating: 5,
  },
];

export const STORE_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does Ai Watches guarantee 100% authenticity?',
    answer:
      'Every watch—brand new or pre-owned—undergoes a 48-point horological verification by our master watchmakers. We inspect movement serial engravings, escapement amplitude on a Witschi timegrapher, pressure-test seals, and verify provenance papers before issuing a signed lifetime authenticity certificate.',
  },
  {
    id: 'faq-2',
    question: 'Do you offer insured worldwide shipping and Cash on Delivery?',
    answer:
      'Yes. All orders ship via insured DHL Express worldwide with signature confirmation. Domestic orders also qualify for verified Cash on Delivery with complimentary shipping on orders above $250.',
  },
  {
    id: 'faq-3',
    question: 'What warranty covers pre-owned mechanical watches?',
    answer:
      'All Certified Pre-Owned timepieces include a 24-month Ai Watches mechanical movement warranty covering rate regulation, chronograph actuation, and water-resistance gaskets.',
  },
  {
    id: 'faq-4',
    question: 'How does Bespoke Custom Sourcing work?',
    answer:
      'Submit the exact brand, reference number, condition preference, and target budget through our Sourcing Request form. Within 48 hours, our procurement specialists present verified global dealer options with macro inspection photos and an all-inclusive landed quote.',
  },
];
