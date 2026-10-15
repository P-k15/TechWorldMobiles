import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Smartphone, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from './PhoneImage';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const { newProducts, usedProducts } = useAdmin();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const allItems = [...newProducts, ...usedProducts];
  const trimmed = query.trim().toLowerCase();

  const results = trimmed
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.brand.toLowerCase().includes(trimmed) ||
          (item.category && item.category.toLowerCase().includes(trimmed)) ||
          (item.storage && item.storage.toLowerCase().includes(trimmed))
      ).slice(0, 8)
    : [];

  const handleSelect = (item) => {
    setIsSearchOpen(false);
    if (item.type === 'used') {
      navigate(`/second-hand/${item.id}`);
    } else {
      navigate(`/phones/${item.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17212B]/75 flex items-start justify-center p-4 sm:p-6 md:p-16">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl border border-[#E2E5E8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#E2E5E8] bg-[#F5F5F2]">
          <Search className="w-4 h-4 text-[#69727C] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search smartphones by brand, model or storage..."
            className="w-full bg-transparent text-[#20252B] placeholder:text-[#69727C] focus:outline-none text-sm sm:text-base font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#69727C] hover:text-[#20252B] rounded hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-[#E2E5E8]">
          {trimmed && results.length === 0 && (
            <div className="py-10 text-center text-[#69727C]">
              <Smartphone className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#20252B]">No smartphones found for "{query}"</p>
              <p className="text-[11px] text-[#69727C] mt-0.5">Try searching Apple, Samsung, OnePlus, or pre-owned models</p>
            </div>
          )}

          {!trimmed && (
            <div className="py-3 px-2">
              <p className="text-[11px] font-bold text-[#69727C] uppercase tracking-wider mb-2.5">
                Popular In-Store Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['iPhone 16', 'Samsung S25', 'OnePlus 13R', 'Pre-Owned iPhone', 'Redmi Note 14', 'Under ₹30,000'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="inline-flex items-center text-xs font-medium bg-[#F5F5F2] hover:bg-orange-50 hover:text-[#E85D2A] text-[#20252B] border border-[#E2E5E8] px-2.5 py-1 rounded transition"
                  >
                    <Tag className="w-3 h-3 mr-1 text-[#69727C]" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="group flex items-center justify-between p-2.5 rounded hover:bg-[#F5F5F2] cursor-pointer transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-[#F5F5F2] border border-[#E2E5E8] overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <PhoneImage
                    src={item.images?.[0]}
                    alt={item.name}
                    fallbackBrand={item.brand}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#20252B] group-hover:text-[#E85D2A] transition">
                      {item.name}
                    </span>
                    {item.type === 'used' ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-50 text-[#D97706] border border-amber-200">
                        Pre-Owned
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-50 text-[#237A4B] border border-emerald-200">
                        Brand New
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#69727C] mt-0.5">
                    {item.brand} • {item.storage || '128GB'} • {item.color || 'Standard'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 text-right">
                <div>
                  <span className="text-xs font-extrabold text-[#20252B]">{formatINR(item.price)}</span>
                  {item.mrp && item.mrp > item.price && (
                    <span className="block text-[10px] text-[#69727C] line-through">
                      {formatINR(item.mrp)}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#E85D2A] transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#F5F5F2] border-t border-[#E2E5E8] flex items-center justify-between text-[11px] text-[#69727C]">
          <span>Select any device to view live stock & specs</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
