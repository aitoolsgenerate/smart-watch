import { useEffect, useRef, useState } from 'react';
import { Download, RotateCcw, ShoppingBag } from 'lucide-react';
import { WatchProduct } from '../types/watch';
import { HERO_IMAGE } from '../data/catalog';

interface WatchDesignerProps {
  onAddCustomWatch: (product: WatchProduct, selectedStrap: string, quantity: number) => void;
}

type CaseOption = {
  id: string;
  label: string;
  diameter: string;
  priceDelta: number;
  rimLight: string;
  rimMid: string;
  rimDark: string;
  crownColor: string;
};

type DialOption = {
  id: string;
  label: string;
  priceDelta: number;
  centerColor: string;
  edgeColor: string;
  indexColor: string;
  subTextColor: string;
  hasSubdials?: boolean;
};

type BezelOption = {
  id: string;
  label: string;
  priceDelta: number;
  ringColor: string;
  markings: 'smooth' | 'tachymeter' | 'diver' | 'fluted';
};

type HandsOption = {
  id: string;
  label: string;
  fill: string;
  secondFill: string;
  shape: 'dauphine' | 'baton' | 'breguet';
};

type StrapOption = {
  id: string;
  label: string;
  priceDelta: number;
  primary: string;
  secondary: string;
  style: 'leather' | 'bracelet' | 'rubber';
};

const CASE_OPTIONS: CaseOption[] = [
  {
    id: 'steel-39',
    label: 'Brushed 316L Steel · 39mm',
    diameter: '39.0 mm',
    priceDelta: 0,
    rimLight: '#F3F4F6',
    rimMid: '#9CA3AF',
    rimDark: '#4B5563',
    crownColor: '#D1D5DB',
  },
  {
    id: 'obsidian-40',
    label: 'PVD Obsidian Matte · 40mm',
    diameter: '40.0 mm',
    priceDelta: 90,
    rimLight: '#52525B',
    rimMid: '#27272A',
    rimDark: '#09090B',
    crownColor: '#3F3F46',
  },
  {
    id: 'rosegold-38',
    label: '18k Rose Gold Tone · 38mm',
    diameter: '38.0 mm',
    priceDelta: 140,
    rimLight: '#F6D5BE',
    rimMid: '#C98A63',
    rimDark: '#7C4D32',
    crownColor: '#E5B293',
  },
  {
    id: 'titanium-41',
    label: 'Grade 5 Titanium · 41mm',
    diameter: '41.0 mm',
    priceDelta: 160,
    rimLight: '#D6D3D1',
    rimMid: '#78716C',
    rimDark: '#44403C',
    crownColor: '#A8A29E',
  },
];

const DIAL_OPTIONS: DialOption[] = [
  {
    id: 'midnight-navy',
    label: 'Midnight Sector Navy',
    priceDelta: 0,
    centerColor: '#1E3A5F',
    edgeColor: '#0C192C',
    indexColor: '#E5E7EB',
    subTextColor: '#93C5FD',
  },
  {
    id: 'porcelain-panda',
    label: 'Porcelain Silver Panda',
    priceDelta: 65,
    centerColor: '#F7F6F2',
    edgeColor: '#DFDDD4',
    indexColor: '#18181B',
    subTextColor: '#52525B',
    hasSubdials: true,
  },
  {
    id: 'emerald-sunburst',
    label: 'Emerald Sunburst',
    priceDelta: 45,
    centerColor: '#115E46',
    edgeColor: '#042F22',
    indexColor: '#F3F4F6',
    subTextColor: '#A7F3D0',
  },
  {
    id: 'salmon-guilloche',
    label: 'Salmon Copper Heritage',
    priceDelta: 75,
    centerColor: '#D99474',
    edgeColor: '#9F5D40',
    indexColor: '#1C1917',
    subTextColor: '#44403C',
  },
  {
    id: 'obsidian-slate',
    label: 'Obsidian Matte Black',
    priceDelta: 30,
    centerColor: '#27272A',
    edgeColor: '#09090B',
    indexColor: '#F4F4F5',
    subTextColor: '#A1A1AA',
    hasSubdials: true,
  },
];

const BEZEL_OPTIONS: BezelOption[] = [
  {
    id: 'smooth',
    label: 'Smooth Mirror Bezel',
    priceDelta: 0,
    ringColor: '#D4D4D8',
    markings: 'smooth',
  },
  {
    id: 'tachymeter',
    label: 'Black Ceramic Tachymeter',
    priceDelta: 85,
    ringColor: '#18181B',
    markings: 'tachymeter',
  },
  {
    id: 'diver',
    label: '60-Minute Emerald Diver',
    priceDelta: 75,
    ringColor: '#064E3B',
    markings: 'diver',
  },
  {
    id: 'fluted',
    label: 'Fluted Dress Bezel',
    priceDelta: 60,
    ringColor: '#E4E4E7',
    markings: 'fluted',
  },
];

const HANDS_OPTIONS: HandsOption[] = [
  {
    id: 'dauphine',
    label: 'Faceted Dauphine Silver',
    fill: '#F4F4F5',
    secondFill: '#B91C1C',
    shape: 'dauphine',
  },
  {
    id: 'baton',
    label: 'Luminous Sport Baton',
    fill: '#ECFDF5',
    secondFill: '#C59B5F',
    shape: 'baton',
  },
  {
    id: 'breguet',
    label: 'Heat-Blued Heritage',
    fill: '#1D4ED8',
    secondFill: '#1E3A8A',
    shape: 'breguet',
  },
];

const STRAP_OPTIONS: StrapOption[] = [
  {
    id: 'cognac-leather',
    label: 'Cognac Bridle Leather',
    priceDelta: 0,
    primary: '#7C4321',
    secondary: '#5B2E14',
    style: 'leather',
  },
  {
    id: 'steel-bracelet',
    label: 'Brushed 3-Link Steel Bracelet',
    priceDelta: 95,
    primary: '#A1A1AA',
    secondary: '#71717A',
    style: 'bracelet',
  },
  {
    id: 'black-rally',
    label: 'Perforated Black Rally Calfskin',
    priceDelta: 35,
    primary: '#1C1917',
    secondary: '#0C0A09',
    style: 'leather',
  },
  {
    id: 'fkmsport-rubber',
    label: 'Vulcanized Charcoal FKM',
    priceDelta: 25,
    primary: '#27272A',
    secondary: '#18181B',
    style: 'rubber',
  },
];

const BASE_PRICE = 650;

export function WatchDesigner({ onAddCustomWatch }: WatchDesignerProps) {
  const [selectedCase, setSelectedCase] = useState<CaseOption>(CASE_OPTIONS[0]);
  const [selectedDial, setSelectedDial] = useState<DialOption>(DIAL_OPTIONS[0]);
  const [selectedBezel, setSelectedBezel] = useState<BezelOption>(BEZEL_OPTIONS[1]);
  const [selectedHands, setSelectedHands] = useState<HandsOption>(HANDS_OPTIONS[0]);
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>(STRAP_OPTIONS[0]);
  const [engraving, setEngraving] = useState('AI WATCHES · 2026');
  const [viewSide, setViewSide] = useState<'dial' | 'caseback'>('dial');
  const [stageTheme, setStageTheme] = useState<'dark' | 'light'>('dark');
  const [secondsAngle, setSecondsAngle] = useState(42);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setSecondsAngle((prev) => (prev + 6) % 360);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const totalPrice =
    BASE_PRICE +
    selectedCase.priceDelta +
    selectedDial.priceDelta +
    selectedBezel.priceDelta +
    selectedStrap.priceDelta;

  const applyPreset = (preset: 'chronograph' | 'heritage' | 'diver') => {
    if (preset === 'chronograph') {
      setSelectedCase(CASE_OPTIONS[0]);
      setSelectedDial(DIAL_OPTIONS[1]);
      setSelectedBezel(BEZEL_OPTIONS[1]);
      setSelectedHands(HANDS_OPTIONS[0]);
      setSelectedStrap(STRAP_OPTIONS[2]);
    } else if (preset === 'heritage') {
      setSelectedCase(CASE_OPTIONS[2]);
      setSelectedDial(DIAL_OPTIONS[3]);
      setSelectedBezel(BEZEL_OPTIONS[3]);
      setSelectedHands(HANDS_OPTIONS[2]);
      setSelectedStrap(STRAP_OPTIONS[0]);
    } else {
      setSelectedCase(CASE_OPTIONS[3]);
      setSelectedDial(DIAL_OPTIONS[2]);
      setSelectedBezel(BEZEL_OPTIONS[2]);
      setSelectedHands(HANDS_OPTIONS[1]);
      setSelectedStrap(STRAP_OPTIONS[1]);
    }
    setViewSide('dial');
  };

  const handleReset = () => {
    setSelectedCase(CASE_OPTIONS[0]);
    setSelectedDial(DIAL_OPTIONS[0]);
    setSelectedBezel(BEZEL_OPTIONS[1]);
    setSelectedHands(HANDS_OPTIONS[0]);
    setSelectedStrap(STRAP_OPTIONS[0]);
    setEngraving('AI WATCHES · 2026');
    setViewSide('dial');
  };

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-watches-bespoke-${selectedDial.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddBespokeToBag = () => {
    const customId = `bespoke-${selectedCase.id}-${selectedDial.id}-${selectedBezel.id}-${selectedHands.id}-${selectedStrap.id}`;
    const cleanEngraving = engraving.trim();
    const configLabel = `${selectedStrap.label}${cleanEngraving ? ` · Engraved "${cleanEngraving}"` : ''}`;

    const customWatch: WatchProduct = {
      id: customId,
      brand: 'Ai Watches Bespoke',
      name: `${selectedDial.label} Custom`,
      category: 'Dress & Heritage',
      isPreOwned: false,
      condition: 'New',
      movementType: 'Automatic',
      price: totalPrice,
      image: HERO_IMAGE,
      straps: [configLabel],
      badge: 'Custom Build',
      description: `Bespoke timepiece configured in ${selectedCase.label}, ${selectedBezel.label}, and ${selectedHands.label} hands.`,
      specs: {
        reference: `AW-BSP-${selectedDial.id.slice(0, 3).toUpperCase()}`,
        caliber: 'Caliber AW-9015 Regulated Automatic',
        powerReserve: '42 Hours',
        caseDiameter: selectedCase.diameter,
        lugToLug: '46.5 mm',
        waterResistance: '100 m / 10 bar',
        crystal: 'Box-Domed Sapphire with AR',
      },
    };

    onAddCustomWatch(customWatch, configLabel, 1);
  };

  const isChrono = selectedDial.hasSubdials;
  const bezelRingFill =
    selectedBezel.markings === 'smooth' || selectedBezel.markings === 'fluted'
      ? selectedCase.rimMid
      : selectedBezel.ringColor;

  return (
    <section
      id="designer"
      className="py-16 lg:py-24 bg-[#F3F2EE] border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-300">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#991B1B] font-semibold">
              Bespoke Atelier
            </p>
            <h2 className="mt-1.5 font-editorial text-3xl sm:text-4xl font-semibold text-[#141413]">
              Design Your Custom Timepiece
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-2xl">
              Configure case metallurgy, dial finish, bezel architecture, hand geometry, strap,
              and exhibition caseback engraving. Built and regulated to order by our watchmakers.
            </p>
          </div>

          {/* Curated Designer Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 mr-1">Designer Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset('chronograph')}
              className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#141413] text-xs font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Panda Chrono
            </button>
            <button
              type="button"
              onClick={() => applyPreset('heritage')}
              className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#141413] text-xs font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Salmon Heritage
            </button>
            <button
              type="button"
              onClick={() => applyPreset('diver')}
              className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#141413] text-xs font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Emerald Diver
            </button>
          </div>
        </div>

        {/* Main 2-Column Studio */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Live Horological Render Viewport */}
          <div
            className={`lg:col-span-6 flex flex-col justify-between border p-6 sm:p-8 transition-colors ${
              stageTheme === 'dark'
                ? 'bg-[#0D0E10] text-white border-white/10'
                : 'bg-white text-[#141413] border-stone-200'
            }`}
          >
            {/* Stage Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex border border-stone-500/30 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewSide('dial')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewSide === 'dial'
                      ? 'bg-[#991B1B] text-white'
                      : stageTheme === 'dark'
                        ? 'text-stone-300 hover:text-white'
                        : 'text-stone-600 hover:text-[#141413]'
                  }`}
                >
                  Dial View
                </button>
                <button
                  type="button"
                  onClick={() => setViewSide('caseback')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewSide === 'caseback'
                      ? 'bg-[#991B1B] text-white'
                      : stageTheme === 'dark'
                        ? 'text-stone-300 hover:text-white'
                        : 'text-stone-600 hover:text-[#141413]'
                  }`}
                >
                  Caseback Engraving
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStageTheme((t) => (t === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                    stageTheme === 'dark'
                      ? 'border-white/20 text-stone-300 hover:text-white'
                      : 'border-stone-300 text-stone-600 hover:text-[#141413]'
                  }`}
                >
                  {stageTheme === 'dark' ? 'Light Studio' : 'Dark Studio'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  aria-label="Download watch design SVG"
                  className={`px-3 py-1.5 text-xs border inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    stageTheme === 'dark'
                      ? 'border-white/20 text-stone-300 hover:text-white'
                      : 'border-stone-300 text-stone-600 hover:text-[#141413]'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save SVG</span>
                </button>
              </div>
            </div>

            {/* SVG Watch Stage */}
            <div className="my-6 flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 360 440"
                className="w-full max-w-[340px] h-auto select-none drop-shadow-2xl"
                role="img"
                aria-label={`Custom watch preview: ${selectedCase.label}, ${selectedDial.label}, ${selectedStrap.label}`}
              >
                <defs>
                  <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={selectedCase.rimLight} />
                    <stop offset="50%" stopColor={selectedCase.rimMid} />
                    <stop offset="100%" stopColor={selectedCase.rimDark} />
                  </linearGradient>

                  <radialGradient id="dialGradient" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor={selectedDial.centerColor} />
                    <stop offset="100%" stopColor={selectedDial.edgeColor} />
                  </radialGradient>

                  <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={selectedStrap.secondary} />
                    <stop offset="50%" stopColor={selectedStrap.primary} />
                    <stop offset="100%" stopColor={selectedStrap.secondary} />
                  </linearGradient>

                  <path
                    id="casebackTextArc"
                    d="M 92,220 A 88,88 0 1,1 268,220"
                    fill="none"
                  />
                </defs>

                {/* Top & Bottom Strap / Bracelet */}
                <g>
                  {/* Top Strap */}
                  <rect
                    x="132"
                    y="16"
                    width="96"
                    height="104"
                    rx="6"
                    fill="url(#strapGrad)"
                  />
                  {/* Bottom Strap */}
                  <rect
                    x="132"
                    y="320"
                    width="96"
                    height="104"
                    rx="6"
                    fill="url(#strapGrad)"
                  />

                  {selectedStrap.style === 'bracelet' && (
                    <g stroke={selectedCase.rimDark} strokeWidth="1.5" opacity="0.55">
                      {[36, 58, 80, 102, 342, 364, 386, 408].map((yPos) => (
                        <line key={yPos} x1="132" y1={yPos} x2="228" y2={yPos} />
                      ))}
                      <line x1="162" y1="16" x2="162" y2="120" />
                      <line x1="198" y1="16" x2="198" y2="120" />
                      <line x1="162" y1="320" x2="162" y2="424" />
                      <line x1="198" y1="320" x2="198" y2="424" />
                    </g>
                  )}

                  {selectedStrap.style === 'leather' && (
                    <g stroke="#D6C7B2" strokeWidth="1" strokeDasharray="3 3" opacity="0.55">
                      <line x1="140" y1="22" x2="140" y2="112" />
                      <line x1="220" y1="22" x2="220" y2="112" />
                      <line x1="140" y1="328" x2="140" y2="418" />
                      <line x1="220" y1="328" x2="220" y2="418" />
                    </g>
                  )}
                </g>

                {/* Sculpted Case Lugs */}
                <path
                  d="M126 105 L140 120 L220 120 L234 105 L226 155 L134 155 Z"
                  fill="url(#caseGradient)"
                />
                <path
                  d="M126 335 L140 320 L220 320 L234 335 L226 285 L134 285 Z"
                  fill="url(#caseGradient)"
                />

                {/* Crown & Pushers */}
                <rect
                  x="294"
                  y="204"
                  width="16"
                  height="32"
                  rx="3"
                  fill={selectedCase.crownColor}
                  stroke={selectedCase.rimDark}
                  strokeWidth="1.5"
                />
                {isChrono && viewSide === 'dial' && (
                  <>
                    <rect
                      x="284"
                      y="156"
                      width="14"
                      height="16"
                      rx="2"
                      transform="rotate(24 284 156)"
                      fill={selectedCase.crownColor}
                      stroke={selectedCase.rimDark}
                      strokeWidth="1"
                    />
                    <rect
                      x="278"
                      y="270"
                      width="14"
                      height="16"
                      rx="2"
                      transform="rotate(-24 278 270)"
                      fill={selectedCase.crownColor}
                      stroke={selectedCase.rimDark}
                      strokeWidth="1"
                    />
                  </>
                )}

                {/* Main Case Outer Body */}
                <circle
                  cx="180"
                  cy="220"
                  r="122"
                  fill="url(#caseGradient)"
                  stroke={selectedCase.rimDark}
                  strokeWidth="2"
                />

                {viewSide === 'dial' ? (
                  <>
                    {/* Bezel Ring */}
                    <circle
                      cx="180"
                      cy="220"
                      r="112"
                      fill={bezelRingFill}
                      stroke={selectedCase.rimDark}
                      strokeWidth="1.5"
                    />

                    {/* Fluted Bezel Texture */}
                    {selectedBezel.markings === 'fluted' && (
                      <g stroke={selectedCase.rimDark} strokeWidth="1.2" opacity="0.45">
                        {Array.from({ length: 60 }).map((_, i) => {
                          const angle = (i * 6 * Math.PI) / 180;
                          const x1 = 180 + Math.cos(angle) * 98;
                          const y1 = 220 + Math.sin(angle) * 98;
                          const x2 = 180 + Math.cos(angle) * 112;
                          const y2 = 220 + Math.sin(angle) * 112;
                          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                        })}
                      </g>
                    )}

                    {/* Tachymeter or Diver Bezel Markings */}
                    {(selectedBezel.markings === 'tachymeter' ||
                      selectedBezel.markings === 'diver') && (
                      <g fill="#E4E4E7" stroke="#E4E4E7">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const angle = (i * 15 * Math.PI) / 180;
                          const x1 = 180 + Math.cos(angle) * 101;
                          const y1 = 220 + Math.sin(angle) * 101;
                          const x2 = 180 + Math.cos(angle) * 109;
                          const y2 = 220 + Math.sin(angle) * 109;
                          return (
                            <line
                              key={i}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              strokeWidth={i % 2 === 0 ? 1.5 : 0.7}
                            />
                          );
                        })}
                        <polygon points="180,111 175,119 185,119" fill="#C59B5F" stroke="none" />
                      </g>
                    )}

                    {/* Dial Face */}
                    <circle
                      cx="180"
                      cy="220"
                      r="96"
                      fill="url(#dialGradient)"
                      stroke={selectedCase.rimDark}
                      strokeWidth="1.5"
                    />

                    {/* Subtle Sector Ring */}
                    <circle
                      cx="180"
                      cy="220"
                      r="74"
                      fill="none"
                      stroke={selectedDial.indexColor}
                      strokeWidth="0.6"
                      opacity="0.35"
                    />

                    {/* Applied Hour Indices & Minute Track */}
                    <g>
                      {Array.from({ length: 60 }).map((_, idx) => {
                        const rad = ((idx * 6 - 90) * Math.PI) / 180;
                        const isHour = idx % 5 === 0;
                        const rOuter = 90;
                        const rInner = isHour ? 78 : 86;
                        return (
                          <line
                            key={idx}
                            x1={180 + Math.cos(rad) * rInner}
                            y1={220 + Math.sin(rad) * rInner}
                            x2={180 + Math.cos(rad) * rOuter}
                            y2={220 + Math.sin(rad) * rOuter}
                            stroke={selectedDial.indexColor}
                            strokeWidth={isHour ? 3 : 0.8}
                            strokeLinecap="round"
                            opacity={isHour ? 0.95 : 0.45}
                          />
                        );
                      })}
                    </g>

                    {/* Optional Subdials for Chronograph Dials */}
                    {isChrono && (
                      <g>
                        <circle
                          cx="144"
                          cy="220"
                          r="22"
                          fill={selectedDial.id === 'porcelain-panda' ? '#18181B' : '#141413'}
                          stroke={selectedDial.indexColor}
                          strokeWidth="0.8"
                          opacity="0.9"
                        />
                        <circle
                          cx="216"
                          cy="220"
                          r="22"
                          fill={selectedDial.id === 'porcelain-panda' ? '#18181B' : '#141413'}
                          stroke={selectedDial.indexColor}
                          strokeWidth="0.8"
                          opacity="0.9"
                        />
                        <line x1="144" y1="220" x2="144" y2="203" stroke="#E5E7EB" strokeWidth="1.4" />
                        <line x1="216" y1="220" x2="229" y2="212" stroke="#E5E7EB" strokeWidth="1.4" />
                      </g>
                    )}

                    {/* Dial Typography */}
                    <text
                      x="180"
                      y="174"
                      textAnchor="middle"
                      fill={selectedDial.indexColor}
                      fontSize="10"
                      fontWeight="600"
                      letterSpacing="2.2"
                      fontFamily="Cormorant Garamond, Georgia, serif"
                    >
                      AI WATCHES
                    </text>
                    <text
                      x="180"
                      y="264"
                      textAnchor="middle"
                      fill={selectedDial.subTextColor}
                      fontSize="6.5"
                      letterSpacing="1.6"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      AUTOMATIC · BESPOKE
                    </text>

                    {/* Date Window at 6 o'clock */}
                    <rect
                      x="171"
                      y="276"
                      width="18"
                      height="14"
                      rx="1.5"
                      fill="#FAFAF8"
                      stroke={selectedCase.rimDark}
                      strokeWidth="0.8"
                    />
                    <text
                      x="180"
                      y="286"
                      textAnchor="middle"
                      fill="#141413"
                      fontSize="8.5"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      24
                    </text>

                    {/* Hour Hand (10:10 iconic watchmaker pose) */}
                    <g transform="rotate(-55 180 220)">
                      {selectedHands.shape === 'dauphine' ? (
                        <polygon
                          points="180,164 184.5,220 180,230 175.5,220"
                          fill={selectedHands.fill}
                          stroke="#18181B"
                          strokeWidth="0.5"
                        />
                      ) : (
                        <rect
                          x="177"
                          y="168"
                          width="6"
                          height="56"
                          rx="2"
                          fill={selectedHands.fill}
                          stroke="#18181B"
                          strokeWidth="0.5"
                        />
                      )}
                    </g>

                    {/* Minute Hand */}
                    <g transform="rotate(62 180 220)">
                      {selectedHands.shape === 'dauphine' ? (
                        <polygon
                          points="180,142 183.5,220 180,232 176.5,220"
                          fill={selectedHands.fill}
                          stroke="#18181B"
                          strokeWidth="0.5"
                        />
                      ) : (
                        <rect
                          x="177.5"
                          y="144"
                          width="5"
                          height="80"
                          rx="2"
                          fill={selectedHands.fill}
                          stroke="#18181B"
                          strokeWidth="0.5"
                        />
                      )}
                    </g>

                    {/* Live Sweeping Second Hand */}
                    <g transform={`rotate(${secondsAngle} 180 220)`}>
                      <line
                        x1="180"
                        y1="242"
                        x2="180"
                        y2="136"
                        stroke={selectedHands.secondFill}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="180" cy="220" r="4" fill={selectedHands.secondFill} />
                    </g>

                    {/* Subtle Sapphire Crystal Reflection */}
                    <path
                      d="M 105,170 A 92,92 0 0,1 245,155 L 120,275 A 92,92 0 0,1 105,170 Z"
                      fill="#FFFFFF"
                      opacity="0.06"
                    />
                  </>
                ) : (
                  /* Exhibition Caseback View with Custom Engraving */
                  <>
                    <circle
                      cx="180"
                      cy="220"
                      r="102"
                      fill="url(#caseGradient)"
                      stroke={selectedCase.rimDark}
                      strokeWidth="1.5"
                    />
                    {/* Curved Engraving on Steel Rim */}
                    <text
                      fill={selectedCase.id === 'obsidian-40' ? '#E4E4E7' : '#27272A'}
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="2.2"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      <textPath
                        href="#casebackTextArc"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {(engraving || 'AI WATCHES · BESPOKE').toUpperCase()}
                      </textPath>
                    </text>

                    {/* Exhibition Sapphire Movement Window */}
                    <circle
                      cx="180"
                      cy="220"
                      r="72"
                      fill="#18181B"
                      stroke={selectedCase.rimDark}
                      strokeWidth="2"
                    />
                    {/* Mechanical Bridges & Balance Wheel */}
                    <circle cx="180" cy="220" r="64" fill="#27272A" />
                    <circle
                      cx="154"
                      cy="192"
                      r="18"
                      fill="none"
                      stroke="#C59B5F"
                      strokeWidth="2.5"
                    />
                    <circle cx="154" cy="192" r="4" fill="#991B1B" />
                    <circle cx="204" cy="200" r="3" fill="#991B1B" />
                    <circle cx="180" cy="248" r="3" fill="#991B1B" />

                    {/* Oscillating Gold-Accent Rotor */}
                    <path
                      d="M 180,220 L 242,220 A 62,62 0 0,1 124,248 Z"
                      fill="#C59B5F"
                      opacity="0.88"
                      stroke="#78350F"
                      strokeWidth="1"
                    />
                    <circle cx="180" cy="220" r="10" fill="#D4D4D8" stroke="#52525B" />
                    <text
                      x="188"
                      y="244"
                      fill="#141413"
                      fontSize="6"
                      fontWeight="700"
                      letterSpacing="1"
                    >
                      AW-9015 · 24J
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Live Spec Summary Footer inside Viewport */}
            <div
              className={`pt-4 border-t grid grid-cols-3 gap-3 text-xs ${
                stageTheme === 'dark' ? 'border-white/10 text-stone-300' : 'border-stone-200 text-stone-600'
              }`}
            >
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">
                  Case
                </span>
                <span className="font-medium truncate block">{selectedCase.diameter}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">
                  Caliber
                </span>
                <span className="font-medium truncate block">AW-9015 Auto</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">
                  Crystal
                </span>
                <span className="font-medium truncate block">Domed Sapphire</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration Controls */}
          <div className="lg:col-span-6 bg-white border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Case Metallurgy */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  1. Case Metallurgy &amp; Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CASE_OPTIONS.map((item) => {
                    const active = selectedCase.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedCase(item)}
                        className={`px-3 py-2.5 text-left text-xs font-medium border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          active
                            ? 'border-[#141413] bg-[#141413] text-white'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="tabular-nums shrink-0 opacity-75">
                          {item.priceDelta > 0 ? `+$${item.priceDelta}` : 'Base'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dial Finish */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  2. Dial Finish
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DIAL_OPTIONS.map((dial) => {
                    const active = selectedDial.id === dial.id;
                    return (
                      <button
                        key={dial.id}
                        type="button"
                        onClick={() => setSelectedDial(dial)}
                        className={`px-3 py-2 text-left text-xs font-medium border transition-colors flex items-center gap-2 cursor-pointer ${
                          active
                            ? 'border-[#141413] bg-[#141413] text-white'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 shrink-0 border border-stone-400"
                          style={{ backgroundColor: dial.centerColor }}
                        />
                        <span className="truncate">{dial.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bezel & Hands */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    3. Bezel Architecture
                  </label>
                  <select
                    value={selectedBezel.id}
                    onChange={(e) => {
                      const found = BEZEL_OPTIONS.find((b) => b.id === e.target.value);
                      if (found) setSelectedBezel(found);
                    }}
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-xs font-medium text-[#141413] focus:outline-none focus:border-[#141413]"
                  >
                    {BEZEL_OPTIONS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label} {b.priceDelta > 0 ? `(+$${b.priceDelta})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    4. Hand Set
                  </label>
                  <select
                    value={selectedHands.id}
                    onChange={(e) => {
                      const found = HANDS_OPTIONS.find((h) => h.id === e.target.value);
                      if (found) setSelectedHands(found);
                    }}
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-xs font-medium text-[#141413] focus:outline-none focus:border-[#141413]"
                  >
                    {HANDS_OPTIONS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Strap */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  5. Strap / Bracelet
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STRAP_OPTIONS.map((strap) => {
                    const active = selectedStrap.id === strap.id;
                    return (
                      <button
                        key={strap.id}
                        type="button"
                        onClick={() => setSelectedStrap(strap)}
                        className={`px-3 py-2 text-left text-xs font-medium border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          active
                            ? 'border-[#141413] bg-[#141413] text-white'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        <span className="truncate">{strap.label}</span>
                        <span className="tabular-nums shrink-0 opacity-75">
                          {strap.priceDelta > 0 ? `+$${strap.priceDelta}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caseback Engraving */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="caseback-engraving"
                    className="block text-xs font-semibold uppercase tracking-wider text-stone-700"
                  >
                    6. Caseback Engraving (Complimentary)
                  </label>
                  <button
                    type="button"
                    onClick={() => setViewSide('caseback')}
                    className="text-xs text-[#991B1B] font-medium hover:underline cursor-pointer"
                  >
                    Preview Caseback
                  </button>
                </div>
                <input
                  id="caseback-engraving"
                  type="text"
                  maxLength={22}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  onFocus={() => setViewSide('caseback')}
                  placeholder="Initials, date, or dedication"
                  className="w-full h-10 px-3 bg-white border border-stone-300 text-xs font-medium tracking-wider uppercase text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>
            </div>

            {/* Pricing & Add Custom Build CTA */}
            <div className="mt-7 pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-stone-500">Bespoke Assembly · Ships in 10 Days</p>
                <p className="font-editorial text-3xl font-semibold tabular-nums text-[#141413]">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset custom watch configuration"
                  className="h-11 px-3.5 border border-stone-300 hover:border-[#141413] text-stone-700 inline-flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleAddBespokeToBag}
                  className="h-11 px-6 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Custom Watch to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
