import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types/watch';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, strap: string, delta: number) => void;
  onRemoveItem: (id: string, strap: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 250;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash on Delivery'>('Card');
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('cart');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25;
  const total = subtotal + shippingFee;
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderNum = `AW-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmation({
      orderNumber: orderNum,
      customerName: customerName.trim(),
      email: email.trim(),
      paymentMethod,
      total,
      itemCount: totalCount,
    });
    onClearCart();
    setStep('confirmed');
  };

  const resetAndClose = () => {
    setStep('cart');
    setConfirmation(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-md bg-[#FAFAF8] text-[#141413] h-full flex flex-col border-l border-stone-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to shopping bag"
                className="p-1.5 text-stone-600 hover:text-[#141413] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-editorial text-2xl font-semibold">
              {step === 'cart' && `Shopping Bag (${totalCount})`}
              {step === 'checkout' && 'Insured Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close bag"
            className="w-9 h-9 inline-flex items-center justify-center text-stone-500 hover:text-[#141413] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' && confirmation ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">
                Order #{confirmation.orderNumber} Confirmed
              </p>
              <h3 className="mt-1 font-editorial text-3xl font-semibold text-[#141413]">
                Preparing Insured Dispatch
              </h3>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                Thank you, {confirmation.customerName}. Your movement timing report and insured DHL
                waybill will be dispatched to{' '}
                <span className="font-medium text-stone-900">{confirmation.email}</span>.
              </p>

              <div className="mt-6 p-4 bg-white border border-stone-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Items Reserved</span>
                  <span className="font-semibold tabular-nums">{confirmation.itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment Method</span>
                  <span className="font-semibold">{confirmation.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm">
                  <span className="font-semibold">Total Charged</span>
                  <span className="font-semibold tabular-nums">
                    ${confirmation.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="mt-6 w-full h-11 bg-[#141413] hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
              >
                Continue Exploring Ai Watches
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
              <h3 className="mt-4 font-editorial text-2xl font-semibold text-[#141413]">
                Your bag is empty
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Browse our authenticated new and pre-owned timepieces to reserve your next piece.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-6 px-6 h-11 bg-[#141413] hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-5">
              {/* Insured shipping progress */}
              <div className="p-3.5 bg-[#F3F2EE] border border-stone-200 text-xs text-stone-700">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span>Complimentary insured express shipping unlocked.</span>
                ) : (
                  <span>
                    Add{' '}
                    <span className="font-semibold tabular-nums">
                      ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}
                    </span>{' '}
                    more for complimentary insured express shipping.
                  </span>
                )}
              </div>

              <ul className="divide-y divide-stone-200">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedStrap}`}
                    className="py-4 flex gap-4"
                  >
                    <div className="w-20 h-20 bg-[#F3F2EE] shrink-0 overflow-hidden border border-stone-200">
                      <SafeImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        fallbackLabel={item.product.brand}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-stone-500">
                            {item.product.brand}
                          </p>
                          <h4 className="text-sm font-semibold text-[#141413] truncate">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.selectedStrap)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-stone-400 hover:text-[#991B1B] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-stone-500 truncate">{item.selectedStrap}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-stone-300 bg-white h-8">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.selectedStrap, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-full inline-flex items-center justify-center text-stone-600 hover:bg-stone-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.selectedStrap, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-full inline-flex items-center justify-center text-stone-600 hover:bg-stone-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Complete your delivery verification details below. All shipments require an adult
                signature upon arrival.
              </p>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tariq Mahmood"
                  className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@domain.com"
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-8910"
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Delivery Street Address & City
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="420 Madison Ave, Suite 12, New York"
                  className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="10017"
                  className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Card', 'Cash on Delivery'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`h-10 px-3 text-xs font-medium border transition-colors ${
                        paymentMethod === method
                          ? 'border-[#141413] bg-[#141413] text-white'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer totals */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Express Transit</span>
                <span className="tabular-nums font-medium text-stone-900">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-[#141413]">
                <span>Total</span>
                <span className="tabular-nums">${total.toLocaleString()}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full h-11 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full h-11 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Confirm Order · ${total.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
