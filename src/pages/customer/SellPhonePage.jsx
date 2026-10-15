import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, CheckCircle2, ArrowRight, ArrowLeft, 
  Trash2, LayoutDashboard 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import { validatePhone, validateEmail } from '../../utils/validation';

export default function SellPhonePage() {
  const { submitCustomerSellRequest } = useAdmin();
  const { addToast } = useStore();

  const [step, setStep] = useState(1);
  const [submittedRefId, setSubmittedRefId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Phone Details
    brand: 'Apple',
    model: 'iPhone 14',
    storage: '128GB',
    ram: '6GB',
    color: 'Midnight',
    purchaseYear: '2023',

    // Step 2: Condition
    physicalCondition: 'Good',
    batteryHealth: '87%',
    screenCondition: 'Flawless (No Scratches)',
    functionalStatus: '100% Functional',
    knownDefects: 'Minor hairline wear on aluminum edge',
    repairHistory: 'Original parts, never repaired',
    billAvailable: true,
    boxAvailable: true,
    accessories: 'Original Box and Cable',

    // Step 3: Expected Price
    expectedPrice: '38000',

    // Step 4: Photos (local object URLs)
    photos: [],

    // Step 5: Customer Details
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    preferredContact: 'WhatsApp',
  });

  const [errors, setErrors] = useState({});

  // File Upload Handler with Object URL
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPhotoUrls = files.slice(0, 4).map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotoUrls].slice(0, 4),
    }));
    addToast(`Added ${files.length} photo preview(s)`, 'info');
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Step Validation
  const validateCurrentStep = () => {
    const errs = {};
    if (step === 1) {
      if (!formData.brand) errs.brand = 'Brand is required';
      if (!formData.model.trim()) errs.model = 'Model name is required';
      if (!formData.storage) errs.storage = 'Storage capacity is required';
    } else if (step === 3) {
      const price = Number(formData.expectedPrice);
      if (!formData.expectedPrice || isNaN(price) || price < 1000) {
        errs.expectedPrice = 'Please enter a realistic expected selling price (min ₹1,000)';
      }
    } else if (step === 5) {
      if (!formData.customerName.trim()) errs.customerName = 'Your full name is required';
      const phoneErr = validatePhone(formData.customerPhone);
      if (phoneErr) errs.customerPhone = phoneErr;
      if (formData.customerEmail) {
        const emailErr = validateEmail(formData.customerEmail);
        if (emailErr) errs.customerEmail = emailErr;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(6, prev + 1));
      window.scrollTo(0, 150);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo(0, 150);
  };

  // Final Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    const finalPhotos = formData.photos.length > 0 
      ? formData.photos 
      : ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'];

    const refId = submitCustomerSellRequest({
      ...formData,
      expectedPrice: Number(formData.expectedPrice),
      photos: finalPhotos,
    });

    setSubmittedRefId(refId);
    addToast(`Sell request ${refId} submitted successfully!`, 'success');
    window.scrollTo(0, 100);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedRefId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-[#E2E5E8] p-8 sm:p-10 text-center space-y-5">
          <div className="w-12 h-12 rounded bg-[#237A4B]/10 text-[#237A4B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <span className="inline-block bg-[#17212B] text-white text-[11px] font-bold px-2.5 py-0.5 rounded mb-2">
              Submitted — Awaiting In-Store / Counter Review
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">
              Phone Valuation Request Logged
            </h1>
            <p className="text-xs sm:text-sm text-[#69727C] mt-1.5 max-w-lg mx-auto">
              Our appraisal team has logged your submission into the TechWorldMobiles system. Bring your handset to our Bandra store or wait for our representative to call.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="bg-[#F5F5F2] border border-[#E2E5E8] rounded-lg p-5 max-w-md mx-auto text-left space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-2">
              <span className="text-xs text-[#69727C]">Valuation Ref ID:</span>
              <span className="text-sm font-mono font-bold text-[#E85D2A]">{submittedRefId}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#69727C]">Handset:</span>
              <span className="font-bold text-[#20252B]">{formData.brand} {formData.model} ({formData.storage})</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#69727C]">Condition Grade:</span>
              <span className="font-semibold text-[#20252B]">{formData.physicalCondition}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#69727C]">Expected Amount:</span>
              <span className="font-extrabold text-[#20252B]">{formatINR(formData.expectedPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2E5E8]">
              <span className="text-[#69727C]">Customer:</span>
              <span className="font-medium text-[#20252B]">{formData.customerName} ({formData.customerPhone})</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-200 text-amber-900 text-xs p-3.5 rounded-lg max-w-lg mx-auto text-left leading-relaxed">
            <strong>Important Notice:</strong> Submitting this online request does not constitute an irrevocable purchase. The final payout and agreed price depend on physical diagnosis at our Bandra store counter.
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              to="/admin/sell-requests"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#17212B] hover:bg-[#20252B] text-white font-bold py-2.5 px-5 rounded text-xs transition"
            >
              <LayoutDashboard className="w-4 h-4 text-[#E85D2A]" />
              <span>Inspect in Admin Pipeline</span>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#F5F5F2] border border-[#E2E5E8] text-[#20252B] font-semibold py-2.5 px-5 rounded text-xs transition"
            >
              <span>Back to Store Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Page Title Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A]">
          TechWorldMobiles Buyback Program
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading mt-1">
          Sell Your Smartphone for Instant Payout
        </h1>
        <p className="text-xs sm:text-sm text-[#69727C] mt-1.5">
          Provide your device specifications and get an accurate market valuation within minutes.
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#E2E5E8] w-full z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#E85D2A] transition-all duration-200 z-0"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />

          {[
            { num: 1, label: 'Model' },
            { num: 2, label: 'Condition' },
            { num: 3, label: 'Price' },
            { num: 4, label: 'Photos' },
            { num: 5, label: 'Contact' },
            { num: 6, label: 'Review' },
          ].map((s) => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                    isDone
                      ? 'bg-[#237A4B] text-white'
                      : isCurrent
                      ? 'bg-[#E85D2A] text-white ring-2 ring-orange-200'
                      : 'bg-white border border-[#E2E5E8] text-[#69727C]'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </div>
                <span className={`text-[10px] font-semibold mt-1 hidden sm:block ${
                  isCurrent ? 'text-[#E85D2A] font-bold' : 'text-[#69727C]'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Form Card */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] p-6 sm:p-8">
        {/* STEP 1: PHONE DETAILS */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 1: Phone Specifications</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Specify brand, model, storage, and approximate purchase year.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Brand *
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Xiaomi">Xiaomi / Redmi</option>
                  <option value="Vivo">Vivo</option>
                  <option value="OPPO">OPPO</option>
                  <option value="Google Pixel">Google Pixel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Model Name *
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g. iPhone 14, Galaxy S23, OnePlus 11"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.model && <p className="text-[#D9383A] text-[11px] mt-1">{errors.model}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Storage Capacity *
                </label>
                <select
                  value={formData.storage}
                  onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  RAM Capacity
                </label>
                <select
                  value={formData.ram}
                  onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="4GB">4GB</option>
                  <option value="6GB">6GB</option>
                  <option value="8GB">8GB</option>
                  <option value="12GB">12GB</option>
                  <option value="16GB">16GB</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Midnight, Space Gray, Green"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Purchase Year
                </label>
                <select
                  value={formData.purchaseYear}
                  onChange={(e) => setFormData({ ...formData, purchaseYear: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="2025">2025 (Under 1 year old)</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021 or earlier</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DEVICE CONDITION */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 2: Device Condition</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Accurate condition details ensure our counter quote matches your expectation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Physical Condition *
                </label>
                <select
                  value={formData.physicalCondition}
                  onChange={(e) => setFormData({ ...formData, physicalCondition: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="Excellent">Grade A (Like New, zero dents or scratches)</option>
                  <option value="Good">Grade B (Minor signs of use, no cracks)</option>
                  <option value="Fair">Grade C (Noticeable scuffs, 100% operational)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Battery Health (iOS / Diagnostic %)
                </label>
                <input
                  type="text"
                  value={formData.batteryHealth}
                  onChange={(e) => setFormData({ ...formData, batteryHealth: e.target.value })}
                  placeholder="e.g. 88%"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Screen Condition
                </label>
                <select
                  value={formData.screenCondition}
                  onChange={(e) => setFormData({ ...formData, screenCondition: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="Flawless (No Scratches)">Flawless (No Scratches)</option>
                  <option value="Micro Scratches (Only visible in bright light)">Micro Scratches (Only in bright light)</option>
                  <option value="Noticeable Scratches">Noticeable Scratches (No cracks)</option>
                  <option value="Cracked Screen / Lines">Cracked Screen / Dead pixels present</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Functional Status
                </label>
                <select
                  value={formData.functionalStatus}
                  onChange={(e) => setFormData({ ...formData, functionalStatus: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="100% Functional">100% Functional (Cameras, FaceID/TouchID, Audio work)</option>
                  <option value="Minor defect (e.g. lower speaker volume)">Minor defect (Speaker, earpiece, etc.)</option>
                  <option value="Major defect">Major defect</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Known Cosmetic Flaws or Notes
                </label>
                <input
                  type="text"
                  value={formData.knownDefects}
                  onChange={(e) => setFormData({ ...formData, knownDefects: e.target.value })}
                  placeholder="e.g. Tiny scuff on top edge; display is pristine"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <label className="flex items-center space-x-2.5 bg-[#F5F5F2] p-2.5 rounded border border-[#E2E5E8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.billAvailable}
                    onChange={(e) => setFormData({ ...formData, billAvailable: e.target.checked })}
                    className="w-3.5 h-3.5 text-[#E85D2A] focus:ring-[#E85D2A]"
                  />
                  <span className="text-xs font-medium text-[#20252B]">Original Tax Invoice Available</span>
                </label>

                <label className="flex items-center space-x-2.5 bg-[#F5F5F2] p-2.5 rounded border border-[#E2E5E8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.boxAvailable}
                    onChange={(e) => setFormData({ ...formData, boxAvailable: e.target.checked })}
                    className="w-3.5 h-3.5 text-[#E85D2A] focus:ring-[#E85D2A]"
                  />
                  <span className="text-xs font-medium text-[#20252B]">Original Retail Box Available</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXPECTED PRICE */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 3: Expected Selling Price</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Enter the net cash/UPI amount you expect to receive.</p>
            </div>

            <div className="max-w-md mx-auto py-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1.5">
                  Expected Amount (in INR - ₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-[#69727C]">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    placeholder="e.g. 35000"
                    className="w-full pl-8 pr-4 py-3 bg-[#F5F5F2] border border-[#E2E5E8] rounded-lg text-xl font-bold text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
                {errors.expectedPrice && (
                  <p className="text-[#D9383A] text-xs mt-1">{errors.expectedPrice}</p>
                )}
              </div>

              <div className="bg-[#F5F5F2] border border-[#E2E5E8] p-3.5 rounded text-xs text-[#20252B] space-y-1">
                <span className="font-bold block text-[#17212B]">TechWorldMobiles Valuation Guidance:</span>
                <p className="text-[#69727C]">
                  Fair market price for a clean {formData.brand} {formData.model} ({formData.storage}) typically ranges between <strong>{formatINR(Number(formData.expectedPrice || 30000) * 0.9)}</strong> and <strong>{formatINR(Number(formData.expectedPrice || 30000) * 1.05)}</strong> depending on physical counter check.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: UPLOAD PHOTOGRAPHS */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 4: Upload Device Photos</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Upload photos of front display, back glass, and sides (optional but speeds up offer).</p>
            </div>

            {/* Dropzone */}
            <div className="border border-dashed border-[#E2E5E8] hover:border-slate-400 bg-[#F5F5F2] rounded p-6 text-center transition">
              <Upload className="w-8 h-8 text-[#69727C] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#20252B]">
                Click below to select device photos
              </p>
              <p className="text-[11px] text-[#69727C] mt-0.5">
                PNG, JPG or WEBP up to 5MB each.
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-3 block mx-auto text-xs text-[#69727C] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#17212B] file:text-white hover:file:bg-[#E85D2A] cursor-pointer"
              />
            </div>

            {/* Previews */}
            {formData.photos.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-[#69727C] uppercase tracking-wider">
                  Attached Photos ({formData.photos.length}/4)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {formData.photos.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded bg-[#F5F5F2] border border-[#E2E5E8] overflow-hidden group">
                      <img src={url} alt={`Phone photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-[#D9383A] text-white rounded opacity-90 hover:opacity-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: CUSTOMER DETAILS */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 5: Customer Details</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Our appraisal representative will connect to discuss the counter evaluation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.customerName && (
                  <p className="text-[#D9383A] text-[11px] mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="e.g. 9820123456"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.customerPhone && (
                  <p className="text-[#D9383A] text-[11px] mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="e.g. ramesh@gmail.com"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.customerEmail && (
                  <p className="text-[#D9383A] text-[11px] mt-1">{errors.customerEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Preferred Contact Channel
                </label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                >
                  <option value="WhatsApp">WhatsApp Message</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="Store Walk-in">Store Walk-in Drop (Bandra West)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION & REVIEW */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="border-b border-[#E2E5E8] pb-3">
              <h2 className="text-base font-bold text-[#17212B] font-heading">Step 6: Review & Submit Request</h2>
              <p className="text-xs text-[#69727C] mt-0.5">Please confirm that your device information is accurate.</p>
            </div>

            <div className="bg-[#F5F5F2] rounded border border-[#E2E5E8] p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#69727C] block">Handset:</span>
                  <span className="font-bold text-[#20252B]">{formData.brand} {formData.model}</span>
                </div>
                <div>
                  <span className="text-[#69727C] block">Storage:</span>
                  <span className="font-bold text-[#20252B]">{formData.storage}</span>
                </div>
                <div>
                  <span className="text-[#69727C] block">Condition:</span>
                  <span className="font-bold text-[#20252B]">{formData.physicalCondition}</span>
                </div>
                <div>
                  <span className="text-[#69727C] block">Battery Health:</span>
                  <span className="font-bold text-[#20252B]">{formData.batteryHealth}</span>
                </div>
                <div>
                  <span className="text-[#69727C] block">Expected Payout:</span>
                  <span className="font-black text-[#E85D2A] text-sm">{formatINR(formData.expectedPrice)}</span>
                </div>
                <div>
                  <span className="text-[#69727C] block">Contact:</span>
                  <span className="font-semibold text-[#20252B]">{formData.customerName} ({formData.customerPhone})</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E5E8] text-xs text-[#69727C]">
                <span>Inclusions: </span>
                <span className="font-medium text-[#20252B]">
                  {formData.billAvailable ? '✓ Original Bill ' : '✗ No Bill '} | {formData.boxAvailable ? '✓ Retail Box ' : '✗ No Box '}
                </span>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded text-[11px] text-amber-900 leading-relaxed">
              <strong>Notice:</strong> Submitting this online request does not constitute a completed sale. Final agreed payment depends on physical device inspection at our counter.
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#E2E5E8]">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#20252B] hover:text-[#17212B] px-3.5 py-2 rounded border border-[#E2E5E8] hover:border-slate-400 bg-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center space-x-1.5 text-xs font-bold bg-[#E85D2A] hover:bg-[#D04E1D] text-white px-5 py-2.5 rounded transition"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center space-x-1.5 text-xs font-bold bg-[#237A4B] hover:bg-[#1E683F] text-white px-6 py-2.5 rounded transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Evaluation Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
