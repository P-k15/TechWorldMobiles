import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, RefreshCw, 
  MapPin, PhoneCall, ChevronRight, CheckCircle2, 
  Smartphone, Award 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import ProductCard from '../../components/products/ProductCard';
import UsedProductCard from '../../components/products/UsedProductCard';

export default function HomePage() {
  const { newProducts, usedProducts } = useAdmin();
  const navigate = useNavigate();
  const [activeBrandTab, setActiveBrandTab] = useState('All');

  // Featured lists
  const filteredNew = activeBrandTab === 'All' 
    ? newProducts.slice(0, 8) 
    : newProducts.filter(p => p.brand.toLowerCase() === activeBrandTab.toLowerCase()).slice(0, 8);

  const featuredUsed = usedProducts.slice(0, 4);

  // Brands for "Shop by Brand"
  const brands = [
    { name: 'Apple', logoText: 'iPhone', count: '14+ Models', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80' },
    { name: 'Samsung', logoText: 'Galaxy', count: '18+ Models', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80' },
    { name: 'OnePlus', logoText: 'OxygenOS', count: '8+ Models', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80' },
    { name: 'Xiaomi', logoText: 'Redmi & Mi', count: '12+ Models', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80' },
    { name: 'Vivo', logoText: 'V & X Series', count: '6+ Models', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=400&q=80' },
    { name: 'OPPO', logoText: 'Find & Reno', count: '5+ Models', image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#F5F5F2]">
      
      {/* 1. EDITORIAL RETAIL HERO */}
      <section className="bg-white border-b border-[#E2E5E8] pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-[#F5F5F2] border border-[#E2E5E8] px-3 py-1 rounded text-xs font-bold text-[#17212B]">
                <span className="w-2 h-2 rounded-full bg-[#E85D2A]"></span>
                <span>Flagship Retailer & Second-Hand Phone Exchange</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17212B] font-heading leading-tight">
                The Smartphone Specialist Store.
              </h1>

              <p className="text-sm sm:text-base text-[#69727C] max-w-xl leading-relaxed">
                India's dedicated mobile phone retailer. Shop genuine sealed smartphones with official manufacturer warranty, or buy thoroughly tested pre-owned devices backed by our store warranty.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/phones"
                  className="inline-flex items-center justify-center space-x-2 bg-[#E85D2A] hover:bg-[#D04E1D] text-white font-bold px-6 py-3 rounded text-xs sm:text-sm transition"
                >
                  <span>Shop New Phones</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/second-hand"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#F5F5F2] border border-[#17212B] text-[#17212B] font-bold px-6 py-3 rounded text-xs sm:text-sm transition"
                >
                  <span>Browse Second-Hand</span>
                </Link>

                <Link
                  to="/sell"
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-[#E85D2A] hover:underline px-3 py-3"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sell Old Phone for Cash</span>
                </Link>
              </div>

              {/* In-store pickup notice */}
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#69727C]">
                <MapPin className="w-3.5 h-3.5 text-[#E85D2A] shrink-0" />
                <span>Visit our Bandra West store for live hands-on demos & direct trade-in checks.</span>
              </div>
            </div>

            {/* Right Product Hero Visual */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5F5F2] border border-[#E2E5E8] rounded-lg p-6 relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E5E8] mb-4 text-xs font-semibold text-[#17212B]">
                  <span>Featured In Store Today</span>
                  <span className="text-[#E85D2A] font-bold">Latest 2026 Stock</span>
                </div>

                <div className="aspect-[4/3] max-h-72 mx-auto flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80"
                    alt="iPhone 16 Flagship"
                    className="max-h-64 object-contain mx-auto"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E5E8] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#17212B] block">Apple iPhone 16 Pro & Galaxy S25</span>
                    <span className="text-[11px] text-[#69727C]">Sealed Box • Official Indian Warranty</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#E85D2A] font-heading">From ₹79,900</span>
                    <Link to="/phones" className="block text-[10px] text-[#17212B] hover:underline font-semibold">
                      View Models →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. RETAIL TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white border border-[#E2E5E8] rounded-lg p-5 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E5E8]">
            <div className="flex items-start space-x-3 pt-2 sm:pt-0 sm:px-3">
              <Award className="w-5 h-5 text-[#E85D2A] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#20252B] block">100% Genuine Handsets</span>
                <span className="text-[11px] text-[#69727C]">Sealed packaging with official brand warranty</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2 sm:pt-0 sm:px-3">
              <ShieldCheck className="w-5 h-5 text-[#237A4B] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#20252B] block">42-Point Diagnostic Test</span>
                <span className="text-[11px] text-[#69727C]">Rigorous hardware inspection on all used phones</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2 sm:pt-0 sm:px-3">
              <RefreshCw className="w-5 h-5 text-[#17212B] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#20252B] block">Instant Device Buyback</span>
                <span className="text-[11px] text-[#69727C]">Fair pricing with immediate cash or bank transfer</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2 sm:pt-0 sm:px-3">
              <PhoneCall className="w-5 h-5 text-[#E85D2A] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#20252B] block">Direct Store Support</span>
                <span className="text-[11px] text-[#69727C]">Free data migration & setup at our Bandra store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS & FLAGSHIP SMARTPHONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#E2E5E8] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#E85D2A] rounded-xs"></span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
                New Smartphones
              </h2>
            </div>
            <p className="text-xs text-[#69727C] mt-1">
              Official Indian stock with manufacturer bill and warranty.
            </p>
          </div>

          {/* Brand Filter Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            {['All', 'Apple', 'Samsung', 'OnePlus'].map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrandTab(brand)}
                className={`text-xs px-3 py-1.5 rounded font-semibold transition whitespace-nowrap ${
                  activeBrandTab === brand
                    ? 'bg-[#17212B] text-white'
                    : 'bg-white text-[#20252B] border border-[#E2E5E8] hover:border-slate-400'
                }`}
              >
                {brand}
              </button>
            ))}
            <Link
              to="/phones"
              className="text-xs font-bold text-[#E85D2A] hover:underline px-2 py-1 flex items-center space-x-0.5 shrink-0"
            >
              <span>View All ({newProducts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNew.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SHOP BY BRAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E5E8]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#17212B] rounded-xs"></span>
            <h2 className="text-lg sm:text-xl font-bold text-[#17212B] font-heading">
              Browse by Brand
            </h2>
          </div>
          <span className="text-xs text-[#69727C]">Authorized Indian Inventory</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              onClick={() => navigate(`/phones?brand=${brand.name}`)}
              className="group bg-white border border-[#E2E5E8] hover:border-[#17212B] rounded-lg p-3 text-center cursor-pointer transition flex flex-col justify-between"
            >
              <div className="h-20 flex items-center justify-center p-2 mb-2 bg-[#F5F5F2] rounded">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-16 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#20252B] block group-hover:text-[#E85D2A]">
                  {brand.name}
                </span>
                <span className="text-[10px] text-[#69727C] block mt-0.5 font-medium">
                  {brand.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CERTIFIED PRE-OWNED SMARTPHONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17212B] text-white rounded-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Verified Pre-Owned Marketplace
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Grade A Pre-Owned Phones. Honest Pricing.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                Save up to 45% compared to launch MRP. Every second-hand smartphone undergoes a 42-point hardware check and comes with our direct store warranty.
              </p>
            </div>
            <Link
              to="/second-hand"
              className="inline-flex items-center space-x-1.5 bg-[#E85D2A] hover:bg-[#D04E1D] text-white font-bold px-5 py-2.5 rounded text-xs transition shrink-0"
            >
              <span>Explore All Pre-Owned ({usedProducts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Used Phones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredUsed.map((product) => (
            <UsedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. SECOND-HAND BUYING & SELLING (TWO BALANCED PANELS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Panel A: Buy Pre-Owned */}
          <div className="bg-white border border-[#E2E5E8] rounded-lg p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-10 h-10 rounded bg-[#F5F5F2] border border-[#E2E5E8] flex items-center justify-center text-[#17212B] mb-3">
                <ShieldCheck className="w-5 h-5 text-[#237A4B]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#237A4B] block mb-1">
                Store Certified Devices
              </span>
              <h3 className="text-xl font-bold text-[#17212B] font-heading">
                Buy a Verified Second-Hand Phone
              </h3>
              <p className="text-xs text-[#69727C] mt-2 leading-relaxed">
                Skip the risks of peer-to-peer classifieds. Get phones tested by professional technicians, transparent battery health percentages, and local store warranty coverage.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-[#20252B]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0" />
                  <span>42-point hardware and software diagnostics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0" />
                  <span>Transparent battery health & cosmetic disclosure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A4B] shrink-0" />
                  <span>Up to 6 Months TechWorldMobiles Store Warranty</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E2E5E8]">
              <Link
                to="/second-hand"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#17212B] hover:bg-[#20252B] text-white font-bold py-2.5 px-4 rounded text-xs transition"
              >
                <span>Browse Certified Used Phones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Panel B: Sell Old Phone */}
          <div className="bg-white border border-[#E2E5E8] rounded-lg p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-10 h-10 rounded bg-orange-50 border border-orange-200 flex items-center justify-center text-[#E85D2A] mb-3">
                <RefreshCw className="w-5 h-5 text-[#E85D2A]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A] block mb-1">
                Instant Trade-In & Buyback
              </span>
              <h3 className="text-xl font-bold text-[#17212B] font-heading">
                Sell Your Old Phone for Instant Cash
              </h3>
              <p className="text-xs text-[#69727C] mt-2 leading-relaxed">
                Upgrade without the hassle. Share your phone details online, receive an appraisal, and get paid instantly via UPI, bank transfer, or cash upon store evaluation.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-[#20252B]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2A] shrink-0" />
                  <span>Instant valuation advice based on current market rates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2A] shrink-0" />
                  <span>In-store handover or doorstep pickup in Mumbai</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2A] shrink-0" />
                  <span>Immediate payout — no waiting for third-party buyers</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E2E5E8]">
              <Link
                to="/sell"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#E85D2A] hover:bg-[#D04E1D] text-white font-bold py-2.5 px-4 rounded text-xs transition"
              >
                <span>Get an Instant Phone Valuation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. WHY SHOP WITH TECHWORLDMOBILES (RETAIL STORE VALUE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E5E8] rounded-lg p-6 sm:p-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A]">
              Retail Store Advantage
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading mt-1">
              Why Choose TechWorldMobiles?
            </h2>
            <p className="text-xs sm:text-sm text-[#69727C] mt-1.5 leading-relaxed">
              We combine the convenience of an online marketplace with the trustworthiness and after-sales support of an established brick-and-mortar electronics store.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded bg-[#F5F5F2] border border-[#E2E5E8] flex items-center justify-center text-[#17212B]">
                <Smartphone className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B]">Sealed & Certified Stock</h3>
              <p className="text-[11px] text-[#69727C] leading-relaxed">
                Brand new flagships with original tax invoice, plus thoroughly tested second-hand smartphones.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded bg-[#F5F5F2] border border-[#E2E5E8] flex items-center justify-center text-[#17212B]">
                <ShieldCheck className="w-4 h-4 text-[#237A4B]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B]">Direct Store Warranty</h3>
              <p className="text-[11px] text-[#69727C] leading-relaxed">
                All pre-owned handsets carry our store replacement warranty for peace of mind.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded bg-[#F5F5F2] border border-[#E2E5E8] flex items-center justify-center text-[#17212B]">
                <MapPin className="w-4 h-4 text-[#17212B]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B]">Physical Bandra Store</h3>
              <p className="text-[11px] text-[#69727C] leading-relaxed">
                Visit our storefront on Linking Road, inspect handsets in person, or pick up online orders directly.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded bg-[#F5F5F2] border border-[#E2E5E8] flex items-center justify-center text-[#17212B]">
                <PhoneCall className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B]">Expert Data Migration</h3>
              <p className="text-[11px] text-[#69727C] leading-relaxed">
                Complimentary data transfer from your old phone to your new device right at our store counter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STORE CONTACT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F5F2] border border-[#E2E5E8] rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded bg-white border border-[#E2E5E8] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#E85D2A]" />
            </div>
            <div>
              <span className="font-bold text-[#17212B] block">TechWorldMobiles Bandra Store</span>
              <span className="text-[#69727C]">Shop 4, Galleria Commercial Hub, Linking Road, Bandra West, Mumbai • Open Daily 10 AM – 9:30 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/contact"
              className="bg-white border border-[#E2E5E8] hover:border-slate-400 text-[#17212B] font-bold px-4 py-2 rounded transition"
            >
              Get Store Directions
            </Link>
            <a
              href="tel:+919820012345"
              className="bg-[#17212B] hover:bg-[#20252B] text-white font-bold px-4 py-2 rounded transition flex items-center space-x-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E85D2A]" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
