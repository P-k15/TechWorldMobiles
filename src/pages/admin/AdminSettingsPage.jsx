import React, { useState } from 'react';
import { RotateCcw, ShieldAlert, Store, Database } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';

export default function AdminSettingsPage() {
  const { resetDemoData } = useAdmin();
  const { addToast } = useStore();
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'TechWorldMobiles Retail & Exchange Hub',
    tagline: 'Your Next Phone. Your Best Deal.',
    currency: 'INR (₹)',
    gstin: '27AABCM8821F1Z8',
    address: 'Shop 4, Galleria Commercial Complex, Linking Road, Bandra West, Mumbai 400050',
    contactPhone: '+91 98200 55123',
    supportEmail: 'support@techworldmobiles-demo.in',
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('Store configuration saved locally!', 'success');
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
    addToast('All demo inventory, orders, and reports reset to original seed state!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
          Store & System Configuration
        </h1>
        <p className="text-xs text-[#69727C] mt-0.5">
          Configure business metadata, currency preferences, and demo database baseline.
        </p>
      </div>

      {/* Store Metadata Configuration Form */}
      <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#E2E5E8] shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E2E5E8] pb-3">
          <Store className="w-4 h-4 text-[#E85D2A]" />
          <h2 className="text-sm font-bold text-[#17212B] font-heading">
            Store Profile & Tax Identifiers
          </h2>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Store Business Name
              </label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Store Tagline
              </label>
              <input
                type="text"
                value={storeSettings.tagline}
                onChange={(e) => setStoreSettings({ ...storeSettings, tagline: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Active Currency
              </label>
              <input
                type="text"
                disabled
                value={storeSettings.currency}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs font-semibold text-[#69727C] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                GSTIN / Trade Tax ID
              </label>
              <input
                type="text"
                value={storeSettings.gstin}
                onChange={(e) => setStoreSettings({ ...storeSettings, gstin: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs font-mono focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Shop Physical Address
              </label>
              <input
                type="text"
                value={storeSettings.address}
                onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Store Helpline
              </label>
              <input
                type="text"
                value={storeSettings.contactPhone}
                onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#17212B] uppercase tracking-wider text-[11px] mb-1">
                Official Support Email
              </label>
              <input
                type="text"
                value={storeSettings.supportEmail}
                onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#17212B] hover:bg-[#20252B] text-white font-semibold py-2 px-5 rounded text-xs transition shadow-xs"
            >
              Save Store Profile
            </button>
          </div>
        </form>
      </div>

      {/* Demo State Reset Box */}
      <div className="bg-white rounded-lg p-5 sm:p-6 border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-700 border-b border-amber-100 pb-3">
          <Database className="w-4 h-4" />
          <h2 className="text-sm font-bold text-[#17212B] font-heading">
            Demo State Reset & Re-seeding
          </h2>
        </div>

        <p className="text-xs text-[#69727C] leading-relaxed">
          If you have placed test orders, adjusted inventory stock, or added custom sell requests during your demonstration, you can reset all records back to the original 3-month sample baseline (August – October 2026).
        </p>

        <button
          onClick={() => setResetModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold py-2 px-4 rounded text-xs transition shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data to Initial Seed</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#E2E5E8] space-y-4">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-[#17212B] font-heading">Confirm Database Reset?</h3>
              <p className="text-xs text-[#69727C] mt-1.5 leading-relaxed">
                This will clear local modifications and restore the 14 new phones, 8 pre-owned phones, 10 orders, 8 buyback requests, and 23 reconciled transactions.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="flex-1 py-1.5 px-3 rounded border border-[#E2E5E8] text-xs font-semibold text-[#17212B] hover:bg-[#F5F5F2]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-1.5 px-3 rounded bg-[#E85D2A] hover:bg-[#d65120] text-white text-xs font-bold transition shadow-xs"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
