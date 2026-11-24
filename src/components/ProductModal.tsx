import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShieldCheck, X } from 'lucide-react';
import { WatchProduct } from '../types/watch';
import { SafeImage } from './SafeImage';

interface ProductModalProps {
  product: WatchProduct | null;
  onClose: () => void;
  onAddToCart: (product: WatchProduct, selectedStrap: string, quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedStrap, setSelectedStrap] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedStrap(product.straps[0] || '');
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedStrap || product.straps[0], quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAFAF8] text-[#141413] border border-stone-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close timepiece details"
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 bg-white/90 hover:bg-white text-stone-700 border border-stone-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#991B1B]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left sticky visual frame */}
          <div className="lg:col-span-6 bg-[#F3F2EE] flex flex-col justify-between p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-stone-200">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
              <SafeImage
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="w-full h-full object-cover"
                fallbackLabel={product.name}
              />
            </div>

            <div className="mt-6 pt-5 border-t border-stone-200 flex items-start gap-3 text-xs text-stone-600 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
              <span>
                Includes signed 48-point movement inspection report, serial verification, and
                24-month Ai Watches mechanical warranty.
              </span>
            </div>
          </div>

          {/* Right contiguous purchase module */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
                <span>{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>Ref. {product.specs.reference}</span>
              </div>

              <h3
                id="pdp-title"
                className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#141413] leading-tight"
              >
                {product.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-semibold tabular-nums text-[#141413]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-stone-500">
                  {product.condition} · In Stock (Ships in 24h)
                </span>
              </div>

              <p className="mt-4 text-sm text-stone-600 leading-relaxed">{product.description}</p>

              {/* Strap / Finish selector */}
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Strap / Configuration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.straps.map((strap) => {
                    const active = selectedStrap === strap;
                    return (
                      <button
                        key={strap}
                        type="button"
                        onClick={() => setSelectedStrap(strap)}
                        className={`px-3 py-2.5 text-left text-xs font-medium border transition-colors whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#991B1B] ${
                          active
                            ? 'border-[#141413] bg-[#141413] text-white'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {strap}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Horological Specifications */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
                  Technical Specifications
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                  <div>
                    <dt className="text-stone-500">Caliber</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{product.specs.caliber}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Power Reserve</dt>
                    <dd className="font-medium text-stone-900 tabular-nums mt-0.5">
                      {product.specs.powerReserve}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Case Diameter</dt>
                    <dd className="font-medium text-stone-900 tabular-nums mt-0.5">
                      {product.specs.caseDiameter}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Lug-to-Lug</dt>
                    <dd className="font-medium text-stone-900 tabular-nums mt-0.5">
                      {product.specs.lugToLug}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Water Resistance</dt>
                    <dd className="font-medium text-stone-900 tabular-nums mt-0.5">
                      {product.specs.waterResistance}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Crystal</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{product.specs.crystal}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quantity + Primary Purchase CTA */}
            <div className="mt-8 pt-5 border-t border-stone-200 flex items-center gap-3">
              <div className="inline-flex items-center border border-stone-300 bg-white h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full inline-flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-full inline-flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 h-11 px-6 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold tracking-wide transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#991B1B]"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>
                    Add to Bag · ${(product.price * quantity).toLocaleString()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
