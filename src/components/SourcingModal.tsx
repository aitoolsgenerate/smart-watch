import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Compass, X } from 'lucide-react';

interface SourcingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourcingModal({ isOpen, onClose }: SourcingModalProps) {
  const [brandModel, setBrandModel] = useState('');
  const [condition, setCondition] = useState<'New' | 'Pre-Owned' | 'Either'>('Either');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const refId = `AW-SRC-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refId);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setBrandModel('');
    setBudget('');
    setName('');
    setContact('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sourcing-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAFAF8] text-[#141413] border border-stone-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close sourcing dialog"
          className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center text-stone-500 hover:text-[#141413] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">
              Request #{submittedRef} Logged
            </p>
            <h3 className="mt-1 font-editorial text-3xl font-semibold">
              Bespoke Search Initiated
            </h3>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              Our horological procurement desk will review global dealer inventory for{' '}
              <span className="font-semibold text-stone-900">{brandModel}</span> and respond to{' '}
              <span className="font-semibold text-stone-900">{contact}</span> within 48 hours.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 w-full h-11 bg-[#141413] hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
            >
              Return to Ai Watches
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#991B1B] font-semibold">
              <Compass className="w-4 h-4" />
              <span>Bespoke Sourcing Desk</span>
            </div>
            <h3
              id="sourcing-modal-title"
              className="mt-2 font-editorial text-3xl font-semibold text-[#141413]"
            >
              Looking for a Specific Timepiece?
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Share your target reference and budget. We source verified pieces through vetted
              collectors and boutiques worldwide.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Brand, Model & Reference Number
                </label>
                <input
                  type="text"
                  required
                  value={brandModel}
                  onChange={(e) => setBrandModel(e.target.value)}
                  placeholder="e.g. Omega Speedmaster 310.30.42.50.01.001"
                  className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Condition Preference
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as 'New' | 'Pre-Owned' | 'Either')}
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                  >
                    <option value="Either">New or Full-Set Pre-Owned</option>
                    <option value="New">Unworn / Brand New Only</option>
                    <option value="Pre-Owned">Pre-Owned (Box & Papers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Target Budget (USD)
                  </label>
                  <input
                    type="text"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. $4,500"
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm tabular-nums focus:outline-none focus:border-[#141413]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Daniel Vance"
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email or WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="collector@domain.com"
                    className="w-full h-10 px-3 bg-white border border-stone-300 text-sm focus:outline-none focus:border-[#141413]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Submit Sourcing Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
