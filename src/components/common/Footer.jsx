import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, MapPin, Phone, Mail, Clock, ShieldCheck, 
  Check, Send, RefreshCw, LayoutDashboard
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed to TechWorldMobiles weekly smartphone alerts (Demo only)', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#17212B] text-slate-300 pt-12 pb-10 border-t border-[#2A3746]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Retail Newsletter Strip */}
        <div className="bg-[#202B37] border border-[#2D3A49] rounded-lg p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A] block mb-1">
                Store Updates & Inventory Alerts
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Subscribe for New Flagship Restocks & Pre-Owned Deals
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Receive notifications when certified used devices and new launch inventory arrive at our Bandra store.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center space-x-2 bg-[#237A4B]/20 text-emerald-300 border border-[#237A4B]/40 p-3 rounded-lg text-xs">
                  <Check className="w-4 h-4 shrink-0 text-[#237A4B]" />
                  <span>Subscribed! Demonstration prototype only — no emails sent.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#17212B] border border-[#3A4859] text-white placeholder:text-slate-500 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#E85D2A] text-xs"
                  />
                  <button
                    type="submit"
                    className="bg-[#E85D2A] hover:bg-[#D04E1D] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition flex items-center justify-center space-x-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Retail Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#2A3746]">
          {/* Col 1: Store Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-[#E85D2A] flex items-center justify-center text-white">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white font-heading">
                TechWorld<span className="text-[#E85D2A]">Mobiles</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Indian electronics retailer specializing in sealed brand new smartphones, verified pre-owned devices, and instant device buybacks.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#E85D2A] shrink-0" />
              <span>42-Point Hardware Diagnosis & Store Warranty</span>
            </div>
          </div>

          {/* Col 2: Smartphones */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Shop Smartphones</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/phones" className="text-slate-400 hover:text-white transition">All New Smartphones</Link>
              </li>
              <li>
                <Link to="/phones?brand=Apple" className="text-slate-400 hover:text-white transition">Apple iPhones</Link>
              </li>
              <li>
                <Link to="/phones?brand=Samsung" className="text-slate-400 hover:text-white transition">Samsung Galaxy Flagships</Link>
              </li>
              <li>
                <Link to="/phones?brand=OnePlus" className="text-slate-400 hover:text-white transition">OnePlus Handsets</Link>
              </li>
              <li>
                <Link to="/second-hand" className="text-slate-400 hover:text-white transition flex items-center space-x-1.5">
                  <span>Certified Second-Hand</span>
                  <span className="bg-[#237A4B] text-white text-[9px] px-1 py-0.2 rounded font-bold">Tested</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Services & Trade-in */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Services & Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sell" className="text-[#E85D2A] hover:underline font-semibold flex items-center space-x-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Sell Old Phone (Instant Valuation)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">Store Location & Directions</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">About Our Mumbai Store</Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-white transition">Shopping Cart & Checkout</Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white transition flex items-center space-x-1">
                  <LayoutDashboard className="w-3 h-3 text-[#E85D2A]" />
                  <span>Admin Management Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Timings */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Retail Storefront</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#E85D2A] shrink-0 mt-0.5" />
                <span>Shop 4, Galleria Commercial Hub, Linking Road, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+91 98200 12345 / +91 98200 55123</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>support@techworldmobiles-demo.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Monday – Sunday: 10:00 AM – 9:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 TechWorldMobiles. All rights reserved. Indian Retail Demonstration Platform.</p>
          <div className="flex items-center space-x-4">
            <span>Client Sample Storefront</span>
            <span>•</span>
            <span>Browser-side State & LocalStorage</span>
            <span>•</span>
            <span>Prices in INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
