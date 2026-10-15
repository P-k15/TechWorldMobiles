import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, RefreshCw, Award, CheckCircle2, 
  Clock, ArrowRight, Store, PhoneCall 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Editorial Retail Hero */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] p-8 sm:p-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E85D2A]/10 text-[#E85D2A] text-xs font-semibold mb-4">
            <Store className="w-3.5 h-3.5" />
            <span>TechWorldMobiles Retail Storefront</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#17212B] tracking-tight font-heading leading-tight">
            Mumbai's Trusted Destination for New & Certified Pre-Owned Smartphones
          </h1>
          <p className="text-sm sm:text-base text-[#69727C] mt-4 leading-relaxed">
            TechWorldMobiles was founded to solve a straightforward problem in consumer electronics: giving smartphone buyers transparent pricing, verified authenticity, and reliable trade-in value without the confusion and risks of unregulated grey markets.
          </p>
        </div>

        {/* Quick Retail Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#E2E5E8]">
          <div className="p-3 bg-[#F5F5F2] rounded border border-[#E2E5E8]">
            <p className="text-2xl font-extrabold text-[#17212B] font-heading">100%</p>
            <p className="text-xs text-[#69727C] mt-0.5 font-medium">Genuine sealed retail stock</p>
          </div>
          <div className="p-3 bg-[#F5F5F2] rounded border border-[#E2E5E8]">
            <p className="text-2xl font-extrabold text-[#17212B] font-heading">42-Point</p>
            <p className="text-xs text-[#69727C] mt-0.5 font-medium">Hardware inspection checklist</p>
          </div>
          <div className="p-3 bg-[#F5F5F2] rounded border border-[#E2E5E8]">
            <p className="text-2xl font-extrabold text-[#17212B] font-heading">6 Months</p>
            <p className="text-xs text-[#69727C] mt-0.5 font-medium">Store warranty on pre-owned</p>
          </div>
          <div className="p-3 bg-[#F5F5F2] rounded border border-[#E2E5E8]">
            <p className="text-2xl font-extrabold text-[#17212B] font-heading">Instant</p>
            <p className="text-xs text-[#69727C] mt-0.5 font-medium">UPI / Cash payout on trade-in</p>
          </div>
        </div>
      </div>

      {/* 3 Core Operating Pillars */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            How We Operate
          </h2>
          <p className="text-xs sm:text-sm text-[#69727C] mt-1">
            Built for retail transparency across both new sales and customer device buybacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-lg border border-[#E2E5E8] p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#17212B] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#E85D2A]" />
            </div>
            <h3 className="font-bold text-base text-[#17212B] font-heading">42-Point Diagnostic</h3>
            <p className="text-xs text-[#69727C] leading-relaxed">
              Every second-hand smartphone undergoes rigorous multi-stage bench testing covering display true-tone, biometrics, multi-camera arrays, battery impedance, charging ports, and RF connectivity.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-[#E2E5E8] p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#17212B] text-white flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5 text-[#E85D2A]" />
            </div>
            <h3 className="font-bold text-base text-[#17212B] font-heading">Fair Customer Buyback</h3>
            <p className="text-xs text-[#69727C] leading-relaxed">
              Customers receive transparent real-time appraisals based on actual hardware condition and market depreciation, with zero forced trade-ins and instant UPI or cash disbursement.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-[#E2E5E8] p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#17212B] text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-[#E85D2A]" />
            </div>
            <h3 className="font-bold text-base text-[#17212B] font-heading">Retail Store Warranty</h3>
            <p className="text-xs text-[#69727C] leading-relaxed">
              Pre-owned models come standard with up to 6 months of TechWorldMobiles store warranty and physical service counter support at our Bandra West location.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Standards Strip */}
      <div className="bg-[#17212B] text-white rounded-lg p-7 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#E85D2A] uppercase tracking-wider">
            Operational Benchmarks
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
            The TechWorldMobiles Quality Standard
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Real Battery Health Disclosure</strong>
              <span>Exact battery maximum capacity percentage tested via diagnostic software and printed on the invoice.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Strict IMEI & Blacklist Verification</strong>
              <span>Clean serial numbers verified against Indian carrier records to guarantee non-blacklisted devices.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Data Sanitization & Factory Reset</strong>
              <span>Complete cryptographic wipe removing prior iCloud, Google, Knox, and carrier lock accounts.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Physical Walk-In Counter</strong>
              <span>Inspect, test cameras, and compare models side-by-side at our Bandra West experience center before paying.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Location & Hours Box */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E85D2A]">
            Walk-in Experience Center
          </span>
          <h3 className="text-lg font-bold text-[#17212B] font-heading">
            TechWorldMobiles Retail Counter & Service Desk
          </h3>
          <p className="text-xs text-[#69727C] max-w-xl">
            Shop 4, Galleria Commercial Complex, Linking Road, Bandra West, Mumbai, Maharashtra 400050
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#69727C] pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#17212B]" />
              <span>Monday – Sunday: 10:30 AM to 9:30 PM</span>
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#17212B]" />
              <span>+91 98200 55123</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/contact"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold py-2.5 px-5 rounded text-xs transition"
          >
            <span>Contact Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/used-phones"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#F5F5F2] hover:bg-[#E2E5E8] text-[#17212B] font-semibold py-2.5 px-4 rounded text-xs transition border border-[#E2E5E8]"
          >
            <span>Browse Pre-Owned</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
