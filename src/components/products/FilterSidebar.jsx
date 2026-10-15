import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';

export default function FilterSidebar({
  filters,
  setFilters,
  isUsedPage = false,
  availableBrands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'OPPO'],
  onCloseMobile
}) {
  const handleBrandToggle = (brand) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      const newBrands = exists
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
  };

  const handleStorageToggle = (storage) => {
    setFilters((prev) => {
      const exists = prev.storage.includes(storage);
      const newStorage = exists
        ? prev.storage.filter((s) => s !== storage)
        : [...prev.storage, storage];
      return { ...prev, storage: newStorage };
    });
  };

  const handleReset = () => {
    setFilters({
      brands: [],
      priceRange: 'all',
      storage: [],
      ram: [],
      os: 'all',
      condition: 'all',
      batteryHealth: 'all',
      inspectedOnly: false,
    });
  };

  const priceRanges = [
    { label: 'All Budgets', value: 'all' },
    { label: 'Under ₹25,000', value: 'under-25k' },
    { label: '₹25,000 – ₹50,000', value: '25k-50k' },
    { label: '₹50,000 – ₹80,000', value: '50k-80k' },
    { label: 'Above ₹80,000', value: 'above-80k' },
  ];

  const storageOptions = ['64GB', '128GB', '256GB', '512GB'];

  return (
    <div className="bg-white rounded-lg border border-[#E2E5E8] p-5 divide-y divide-[#E2E5E8]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#E85D2A]" />
          <h3 className="font-bold text-[#20252B] text-xs uppercase tracking-wider font-heading">
            Filter Catalog
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-[#69727C] hover:text-[#E85D2A] flex items-center space-x-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Brand Filter */}
      <div className="py-3.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-2.5">
          Select Brand
        </label>
        <div className="space-y-1.5">
          {availableBrands.map((brand) => {
            const isSelected = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center space-x-2 text-xs text-[#20252B] hover:text-[#17212B] cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-3.5 h-3.5 rounded border-[#E2E5E8] text-[#E85D2A] focus:ring-[#E85D2A]"
                />
                <span className={isSelected ? 'font-bold text-[#17212B]' : ''}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="py-3.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-2.5">
          Price Bracket
        </label>
        <div className="space-y-1.5">
          {priceRanges.map((range) => (
            <label
              key={range.value}
              className="flex items-center space-x-2 text-xs text-[#20252B] hover:text-[#17212B] cursor-pointer select-none"
            >
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
                className="w-3.5 h-3.5 text-[#E85D2A] focus:ring-[#E85D2A]"
              />
              <span className={filters.priceRange === range.value ? 'font-bold text-[#17212B]' : ''}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Used Condition Filter (Only on Second Hand Page) */}
      {isUsedPage && (
        <div className="py-3.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-2.5">
            Cosmetic Condition
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {['all', 'Excellent', 'Good', 'Fair'].map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, condition: cond }))}
                className={`text-xs py-1.5 px-2 rounded font-medium border text-center transition ${
                  filters.condition === cond
                    ? 'border-[#17212B] bg-[#17212B] text-white font-bold'
                    : 'border-[#E2E5E8] text-[#20252B] hover:border-slate-400 bg-white'
                }`}
              >
                {cond === 'all' ? 'All Grades' : cond}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#E2E5E8]">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-1.5">
              Minimum Battery Health
            </label>
            <select
              value={filters.batteryHealth}
              onChange={(e) => setFilters((prev) => ({ ...prev, batteryHealth: e.target.value }))}
              className="w-full text-xs bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2 focus:border-[#E85D2A] focus:outline-none"
            >
              <option value="all">Any Battery Health</option>
              <option value="90">90% Health & Above</option>
              <option value="85">85% Health & Above</option>
              <option value="80">80% Health & Above</option>
            </select>
          </div>

          <div className="mt-2.5">
            <label className="flex items-center space-x-2 text-xs text-[#20252B] cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inspectedOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, inspectedOnly: e.target.checked }))}
                className="w-3.5 h-3.5 rounded text-[#237A4B] focus:ring-[#237A4B]"
              />
              <span className="font-semibold text-[#237A4B]">42-Point Inspected Only</span>
            </label>
          </div>
        </div>
      )}

      {/* Storage Filter */}
      <div className="py-3.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-2.5">
          Internal Storage
        </label>
        <div className="flex flex-wrap gap-1.5">
          {storageOptions.map((strg) => {
            const isSelected = filters.storage.includes(strg);
            return (
              <button
                key={strg}
                type="button"
                onClick={() => handleStorageToggle(strg)}
                className={`text-xs py-1 px-2.5 rounded font-medium border transition ${
                  isSelected
                    ? 'border-[#E85D2A] bg-orange-50 text-[#E85D2A] font-bold'
                    : 'border-[#E2E5E8] text-[#20252B] hover:border-slate-400 bg-white'
                }`}
              >
                {strg}
              </button>
            );
          })}
        </div>
      </div>

      {/* Operating System Filter */}
      <div className="py-3.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#69727C] block mb-2.5">
          Operating System
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'iOS', 'Android'].map((os) => (
            <button
              key={os}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, os }))}
              className={`text-xs py-1.5 px-1 rounded font-medium border text-center transition ${
                filters.os === os
                  ? 'border-[#17212B] bg-[#17212B] text-white font-bold'
                  : 'border-[#E2E5E8] text-[#20252B] hover:border-slate-400 bg-white'
              }`}
            >
              {os === 'all' ? 'All' : os}
            </button>
          ))}
        </div>
      </div>

      {onCloseMobile && (
        <div className="pt-3.5">
          <button
            onClick={onCloseMobile}
            className="w-full bg-[#17212B] text-white font-bold py-2.5 rounded text-xs"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
