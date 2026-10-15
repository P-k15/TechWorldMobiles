import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Smartphone, Search, ShoppingBag, Heart, Menu, X, 
  MapPin, PhoneCall, LayoutDashboard, RefreshCw 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlist, setIsSearchOpen } = useStore();

  const primaryCategories = [
    { name: 'All Phones', path: '/phones' },
    { name: 'Apple iPhone', path: '/phones?brand=Apple' },
    { name: 'Samsung Galaxy', path: '/phones?brand=Samsung' },
    { name: 'OnePlus & Android', path: '/phones?brand=OnePlus' },
    { name: 'Verified Second-Hand', path: '/second-hand', badge: 'Certified' },
    { name: 'Sell Your Phone', path: '/sell', highlight: true },
    { name: 'Store Location', path: '/contact' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      {/* 1. Top Slim Charcoal Announcement Bar */}
      <div className="bg-[#17212B] text-white text-[11px] py-1.5 px-4 border-b border-[#2A3746]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-[#E85D2A]" />
              <span>Flagship Store: Bandra West, Mumbai</span>
            </span>
            <span className="hidden md:inline-block text-slate-500">•</span>
            <span className="hidden md:flex items-center space-x-1.5 text-slate-300">
              <PhoneCall className="w-3 h-3 text-slate-400" />
              <span>Store Helpline: +91 98200 12345 (10am–9:30pm)</span>
            </span>
            <span className="hidden lg:inline-block text-slate-500">•</span>
            <span className="hidden lg:inline text-slate-400">
              Instant In-Store Phone Buyback & Sealed New Devices
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="inline-flex items-center space-x-1 text-slate-300 hover:text-[#E85D2A] font-medium transition"
              title="Switch to Shop Owner Management System"
            >
              <LayoutDashboard className="w-3 h-3 text-[#E85D2A]" />
              <span className="hidden sm:inline">Store Owner Admin ERP</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar */}
      <header className="bg-white border-b border-[#E2E5E8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">
            
            {/* Wordmark Logo */}
            <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-[#17212B] flex items-center justify-center text-white border border-[#20252B] group-hover:bg-[#E85D2A] transition-colors">
                <Smartphone className="w-5 h-5 text-[#E85D2A] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-0.5">
                  <span className="text-xl font-extrabold tracking-tight text-[#17212B] font-heading">
                    TechWorld<span className="text-[#E85D2A]">Mobiles</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#69727C] -mt-0.5">
                  Retail Store & Exchange
                </span>
              </div>
            </Link>

            {/* Prominent Desktop Product Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-auto">
              <div 
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#F5F5F2] hover:bg-slate-100/90 border border-[#E2E5E8] hover:border-slate-400 rounded-lg px-3.5 py-2 cursor-pointer transition text-xs group"
              >
                <Search className="w-4 h-4 text-[#69727C] group-hover:text-[#20252B] mr-2.5 shrink-0" />
                <span className="text-[#69727C] flex-1">
                  Search new smartphones, refurbished devices, or brands...
                </span>
                <kbd className="hidden lg:inline-block bg-white text-[10px] text-[#69727C] font-mono px-2 py-0.5 rounded border border-[#E2E5E8]">
                  Quick Search
                </kbd>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-[#20252B] hover:bg-[#F5F5F2] transition border border-[#E2E5E8]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Sell Old Phone Direct CTA */}
              <Link
                to="/sell"
                className="hidden sm:inline-flex items-center space-x-1.5 bg-[#E85D2A] hover:bg-[#D04E1D] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sell Your Phone</span>
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg text-[#20252B] hover:bg-[#F5F5F2] transition border border-[#E2E5E8]"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-4 h-4 text-[#20252B]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#E85D2A] rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center space-x-2 bg-[#17212B] hover:bg-[#20252B] text-white px-3 py-2 rounded-lg transition text-xs font-semibold"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-[#E85D2A] text-white text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                  {cartCount}
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#20252B] hover:bg-[#F5F5F2] border border-[#E2E5E8] transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Secondary Navigation Row (Retail Category Bar) */}
        <div className="hidden lg:block bg-[#F5F5F2] border-t border-[#E2E5E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 py-1.5 text-xs font-medium text-[#20252B] overflow-x-auto no-scrollbar">
              {primaryCategories.map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
                      cat.highlight
                        ? 'text-[#E85D2A] font-bold hover:bg-orange-50'
                        : isActive
                        ? 'bg-white text-[#17212B] font-bold shadow-2xs border border-[#E2E5E8]'
                        : 'text-[#20252B] hover:text-[#17212B] hover:bg-white/80'
                    }`
                  }
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="bg-[#237A4B] text-white text-[9px] uppercase font-bold px-1.5 py-0.2 rounded">
                      {cat.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E5E8] bg-white px-4 pt-3 pb-6 shadow-md animate-in slide-in-from-top-1">
            <div className="flex flex-col space-y-1">
              {primaryCategories.map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-xs font-medium flex items-center justify-between ${
                      cat.highlight
                        ? 'bg-orange-50 text-[#E85D2A] font-bold'
                        : isActive
                        ? 'bg-[#F5F5F2] text-[#17212B] font-bold'
                        : 'text-[#20252B] hover:bg-[#F5F5F2]'
                    }`
                  }
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="bg-[#237A4B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {cat.badge}
                    </span>
                  )}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-[#E2E5E8] flex flex-col space-y-2">
                <Link
                  to="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-[#E85D2A] text-white font-bold py-2.5 rounded-lg text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sell Your Phone for Instant Cash</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-1.5 bg-[#17212B] text-white font-medium py-2 rounded-lg text-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#E85D2A]" />
                  <span>Shop Owner Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
