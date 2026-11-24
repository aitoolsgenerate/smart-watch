import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import {
  COLLECTOR_TESTIMONIALS,
  HERO_IMAGE,
  INSPECTION_IMAGE,
  STORE_FAQS,
  TRAVEL_CASE_IMAGE,
  WATCH_CATALOG,
  WATCH_CATEGORIES,
} from './data/catalog';
import { CartItem, WatchCategory, WatchProduct } from './types/watch';
import { SafeImage } from './components/SafeImage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SourcingModal } from './components/SourcingModal';
import { WatchDesigner } from './components/WatchDesigner';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

const CART_STORAGE_KEY = 'ai_watches_cart_v1';

export default function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<WatchCategory>('All Watches');
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSourcingOpen, setIsSourcingOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string>(STORE_FAQS[0].id);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota issues
    }
  }, [cart]);

  const brands = useMemo(() => {
    const unique = Array.from(new Set(WATCH_CATALOG.map((w) => w.brand))).sort();
    return ['All Brands', ...unique];
  }, []);

  const filteredWatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = WATCH_CATALOG.filter((watch) => {
      if (activeCategory === 'Pre-Owned') {
        if (!watch.isPreOwned) return false;
      } else if (activeCategory !== 'All Watches' && watch.category !== activeCategory) {
        return false;
      }

      if (selectedBrand !== 'All Brands' && watch.brand !== selectedBrand) {
        return false;
      }

      if (query) {
        const haystack =
          `${watch.brand} ${watch.name} ${watch.specs.reference} ${watch.specs.caliber} ${watch.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, selectedBrand, searchQuery, sortBy]);

  const totalBagCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleAddToCart = (
    product: WatchProduct,
    selectedStrap?: string,
    quantity = 1
  ) => {
    const strap = selectedStrap || product.straps[0];
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedStrap === strap
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, selectedStrap: strap, quantity }];
    });
    setAddedToast(`${product.brand} ${product.name}`);
    window.setTimeout(() => {
      setAddedToast((curr) =>
        curr === `${product.brand} ${product.name}` ? null : curr
      );
    }, 3000);
  };

  const handleUpdateQty = (id: string, strap: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id && item.selectedStrap === strap
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string, strap: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === id && item.selectedStrap === strap)
      )
    );
  };

  const jumpToCatalog = (category: WatchCategory) => {
    setActiveCategory(category);
    setSelectedBrand('All Brands');
    setMobileMenuOpen(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const travelCaseProduct = WATCH_CATALOG.find(
    (item) => item.id === 'ai-watches-travel-case'
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#141413]">
      {/* Slim Dismissible Announcement Strip (<= 36px) */}
      {showAnnouncement && (
        <div className="bg-[#991B1B] text-white text-xs h-9 px-4 flex items-center justify-center relative">
          <p className="truncate pr-6 tracking-wide font-medium">
            Worldwide Insured Express Shipping · 48-Point Horological Verification · 2-Year Warranty
          </p>
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0D0E10]/95 backdrop-blur-md text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-editorial text-2xl font-semibold tracking-wide text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ai Watches
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300"
          >
            <button
              type="button"
              onClick={() => jumpToCatalog('All Watches')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Catalog
            </button>
            <a
              href="#designer"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Designer
            </a>
            <button
              type="button"
              onClick={() => jumpToCatalog('Pre-Owned')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pre-Owned
            </button>
            <button
              type="button"
              onClick={() => setIsSourcingOpen(true)}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sourcing
            </button>
            <a
              href="#faq"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Search + Primary Bag Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                if (!searchOpen) {
                  document
                    .getElementById('catalog')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Search timepieces"
              className="w-10 h-10 inline-flex items-center justify-center text-stone-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="h-10 px-4 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold tracking-wide inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="tabular-nums">Bag ({totalBagCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 inline-flex items-center justify-center text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D0E10] border-t border-white/10 px-4 py-4 flex flex-col gap-3 text-sm text-stone-200">
            <button
              type="button"
              onClick={() => jumpToCatalog('All Watches')}
              className="text-left py-2 hover:text-white"
            >
              Catalog
            </button>
            <a
              href="#designer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-white"
            >
              Watch Designer
            </a>
            <button
              type="button"
              onClick={() => jumpToCatalog('Pre-Owned')}
              className="text-left py-2 hover:text-white"
            >
              Pre-Owned
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSourcingOpen(true);
              }}
              className="text-left py-2 hover:text-white"
            >
              Custom Sourcing
            </button>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-white"
            >
              FAQ
            </a>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* 1. Storefront Hero Banner */}
        <section className="relative bg-[#0D0E10] text-white overflow-hidden">
          <div className="relative min-h-[540px] lg:min-h-[620px] flex items-center">
            <SafeImage
              src={HERO_IMAGE}
              alt="Mechanical silver panda-dial chronograph timepiece on dark slate"
              className="absolute inset-0 w-full h-full object-cover object-center"
              fallbackLabel="Ai Watches Flagship Chronograph"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#0D0E10] via-[#0D0E10]/80 to-[#0D0E10]/20"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C59B5F] font-medium">
                  Curated Horology · New &amp; Pre-Owned
                </p>
                <h1 className="mt-3 font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white text-balance">
                  Authentic Timepieces, Verified to the Second
                </h1>
                <p className="mt-5 text-base text-stone-300 leading-relaxed max-w-lg">
                  Independent mechanical icons, Swiss heritage dress references, and collector
                  chronographs—each inspected across 48 points by master watchmakers before dispatch.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => jumpToCatalog('All Watches')}
                    className="h-12 px-7 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore Collection
                  </button>
                  <a
                    href="#designer"
                    className="h-12 px-7 border border-white/30 hover:border-white text-white text-sm font-medium tracking-wide transition-colors whitespace-nowrap inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Design Custom Watch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Authenticity Guarantee + 4-Column Proof Strip */}
        <section className="border-b border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-6 overflow-hidden bg-stone-100">
                <SafeImage
                  src={INSPECTION_IMAGE}
                  alt="Master watchmaker inspecting a mechanical caliber with loupe and tweezers"
                  className="w-full h-72 sm:h-96 lg:h-full object-cover"
                  fallbackLabel="48-Point Horological Inspection"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                  Lifetime Authenticity Guarantee
                </p>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#141413] text-balance leading-tight">
                  Every Movement Inspected Before It Reaches Your Wrist
                </h2>
                <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
                  Whether acquiring a brand-new Seiko Prospex or a rare Swiss pre-owned reference,
                  our horologists verify movement originality, measure daily rate amplitude, and
                  pressure-test every case seal.
                </p>

                <ul className="mt-6 space-y-2.5 text-sm text-stone-700 border-t border-stone-200 pt-5">
                  <li>· Witschi chronoscope timing printout included in every box</li>
                  <li>· Serial number &amp; provenance verification against global registries</li>
                  <li>· Insured worldwide express delivery with signature release</li>
                </ul>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setIsSourcingOpen(true)}
                    className="h-11 px-6 bg-[#141413] hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    Consult Our Sourcing Desk
                  </button>
                </div>
              </div>
            </div>

            {/* Adjacent 4-Column Quantitative Proof Strip */}
            <div className="mt-14 pt-10 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-semibold tabular-nums text-[#141413]">
                  1,420+
                </p>
                <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">
                  Timepieces Delivered Since 2022
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-semibold tabular-nums text-[#141413]">
                  320+
                </p>
                <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">
                  Verified 5-Star Collector Reviews
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-semibold tabular-nums text-[#141413]">
                  48-Point
                </p>
                <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">
                  Caliber &amp; Seal Inspection
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-semibold tabular-nums text-[#141413]">
                  24 Months
                </p>
                <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">
                  Mechanical Movement Warranty
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Collection Catalog */}
        <section id="catalog" className="py-16 lg:py-24 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                  Curated Vault
                </p>
                <h2 className="mt-1.5 font-editorial text-3xl sm:text-4xl font-semibold text-[#141413]">
                  Featured Timepieces
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  aria-label="Filter by brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="h-10 px-3 bg-white border border-stone-300 text-xs font-medium text-stone-700 focus:outline-none focus:border-[#141413]"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Sort watches"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-10 px-3 bg-white border border-stone-300 text-xs font-medium text-stone-700 focus:outline-none focus:border-[#141413]"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Tabs + Live Search */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Watch categories"
                className="flex flex-wrap items-center gap-1.5"
              >
                {WATCH_CATEGORIES.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-white'
                          : 'bg-[#F3F2EE] text-stone-600 hover:text-[#141413] hover:bg-stone-200/70'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {(searchOpen || searchQuery.length > 0) && (
                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search brand, model, or ref..."
                    aria-label="Search watch catalog"
                    className="w-full h-10 pl-9 pr-8 bg-white border border-stone-300 text-xs text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 3-Column Product Grid */}
            {filteredWatches.length === 0 ? (
              <div className="mt-12 py-16 text-center bg-white border border-stone-200">
                <p className="font-editorial text-2xl font-semibold text-[#141413]">
                  No matching timepieces in current stock
                </p>
                <p className="mt-2 text-sm text-stone-500">
                  Reset filters or ask our bespoke sourcing desk to locate the exact reference.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('All Watches');
                      setSelectedBrand('All Brands');
                      setSearchQuery('');
                    }}
                    className="h-10 px-5 border border-stone-300 text-xs font-semibold hover:border-[#141413]"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSourcingOpen(true)}
                    className="h-10 px-5 bg-[#991B1B] text-white text-xs font-semibold hover:bg-[#7F1D1D]"
                  >
                    Request Sourcing
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredWatches.map((watch) => (
                  <article
                    key={watch.id}
                    className="group bg-white border border-stone-200 flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Product Image (65-75% visual focus) */}
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(watch)}
                      className="aspect-[4/3] w-full overflow-hidden bg-[#F3F2EE] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#991B1B]"
                    >
                      <SafeImage
                        src={watch.image}
                        alt={`${watch.brand} ${watch.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        fallbackLabel={watch.name}
                      />
                    </button>

                    {/* Clean Metadata & Purchase Action */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                          {watch.brand}
                        </span>
                        {watch.badge && (
                          <span className="text-[11px] font-medium text-[#991B1B]">
                            {watch.badge}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProduct(watch)}
                        className="mt-1 text-left text-base font-semibold text-[#141413] hover:text-[#991B1B] transition-colors cursor-pointer"
                      >
                        {watch.name}
                      </button>

                      <p className="mt-1 mb-4 text-xs text-stone-500">
                        {watch.condition} · {watch.movementType} · {watch.specs.caseDiameter}
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-stone-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[15px] font-semibold tabular-nums text-[#141413]">
                            ${watch.price.toLocaleString()}
                          </span>
                          {watch.originalPrice && (
                            <span className="text-xs text-stone-400 line-through tabular-nums">
                              ${watch.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(watch)}
                            className="h-9 px-3 border border-stone-300 hover:border-[#141413] text-xs font-medium text-stone-700 transition-colors whitespace-nowrap"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(watch)}
                            className="h-9 px-4 bg-[#141413] hover:bg-[#991B1B] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Interactive Bespoke Watch Designer Studio */}
        <WatchDesigner onAddCustomWatch={handleAddToCart} />

        {/* 5. Bespoke Sourcing & Travel Vault Spotlight */}
        <section className="bg-[#0D0E10] text-white border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C59B5F] font-medium">
                  Travel Essentials &amp; Bespoke Desk
                </p>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-white text-balance leading-tight">
                  The Saddle Leather Vault &amp; Concierge Watch Sourcing
                </h2>
                <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
                  Protect your mechanical collection in transit with our hand-stitched full-grain
                  travel pouch, or commission our global specialists to source a discontinued or
                  allocation-only reference directly to your door.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsSourcingOpen(true)}
                    className="h-11 px-6 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    Open Sourcing Request
                  </button>
                  {travelCaseProduct && (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(travelCaseProduct)}
                      className="h-11 px-6 border border-white/25 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                    >
                      Add Travel Vault · ${travelCaseProduct.price}
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 overflow-hidden bg-stone-900">
                <SafeImage
                  src={TRAVEL_CASE_IMAGE}
                  alt="Handcrafted dark saddle-leather travel watch pouch beside a mechanical timepiece"
                  className="w-full h-72 sm:h-96 lg:h-full object-cover"
                  fallbackLabel="Ai Watches Travel Vault"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Collector Reviews & FAQ */}
        <section id="faq" className="py-16 lg:py-24 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Collector Testimonials */}
            <div>
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                  Collector Feedback
                </p>
                <h2 className="mt-1.5 font-editorial text-3xl sm:text-4xl font-semibold text-[#141413]">
                  Trusted by Discerning Collectors
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-7">
                {COLLECTOR_TESTIMONIALS.map((review) => (
                  <blockquote
                    key={review.id}
                    className="bg-white border border-stone-200 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-[#C59B5F]" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-stone-700 leading-relaxed">
                        “{review.quote}”
                      </p>
                    </div>

                    <footer className="mt-6 pt-4 border-t border-stone-100">
                      <p className="text-sm font-semibold text-[#141413]">{review.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {review.role} · {review.city}
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        Verified: {review.watchPurchased}
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="mt-20 pt-16 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                  Support &amp; Provenance
                </p>
                <h2 className="mt-1.5 font-editorial text-3xl font-semibold text-[#141413]">
                  Frequently Asked Questions
                </h2>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  Direct answers regarding movement authentication, warranty protection, and global
                  insured courier delivery.
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-stone-200 border-y border-stone-200 bg-white">
                {STORE_FAQS.map((faq) => {
                  const open = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="px-6">
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(open ? '' : faq.id)}
                        aria-expanded={open}
                        className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <span className="text-sm sm:text-base font-medium text-[#141413]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="pb-5 text-sm text-stone-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D0E10] text-stone-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <span className="font-editorial text-2xl font-semibold text-white">
                Ai Watches
              </span>
              <p className="mt-3 text-sm text-stone-400 leading-relaxed max-w-sm">
                Dedicated to authentic mechanical horology. Every timepiece is verified by master
                watchmakers and backed by a 24-month movement warranty.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => jumpToCatalog('All Watches')}
                    className="hover:text-white transition-colors"
                  >
                    All Timepieces
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => jumpToCatalog('Pre-Owned')}
                    className="hover:text-white transition-colors"
                  >
                    Certified Pre-Owned
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsSourcingOpen(true)}
                    className="hover:text-white transition-colors"
                  >
                    Bespoke Sourcing
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => jumpToCatalog('Accessories')}
                    className="hover:text-white transition-colors"
                  >
                    Travel Accessories
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
                Collector Dispatch
              </h3>
              <p className="mt-3 text-xs text-stone-400 leading-relaxed">
                Receive weekly alerts on newly inspected pre-owned arrivals and limited editions.
              </p>

              {newsletterSubscribed ? (
                <p className="mt-4 text-xs font-medium text-emerald-400">
                  Subscribed. You will receive our next collector drop notice.
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-4 flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address for collector dispatch"
                    className="flex-1 min-w-0 h-10 px-3 bg-[#17181C] border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="h-10 px-5 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} Ai Watches. All rights reserved.</p>
            <p>Visa · Mastercard · American Express · Insured Global Express</p>
          </div>
        </div>
      </footer>

      {/* Subtle Add-to-Bag Feedback Banner */}
      {addedToast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-40 bg-[#0D0E10] text-white border border-white/15 px-4 py-3 shadow-xl flex items-center gap-4 text-xs"
        >
          <span>Added {addedToast} to bag</span>
          <button
            type="button"
            onClick={() => {
              setAddedToast(null);
              setIsCartOpen(true);
            }}
            className="font-semibold text-[#C59B5F] hover:underline whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Interactive Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      <SourcingModal
        isOpen={isSourcingOpen}
        onClose={() => setIsSourcingOpen(false)}
      />
    </div>
  );
}
