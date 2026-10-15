import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, Smartphone } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import ProductCard from '../../components/products/ProductCard';
import FilterSidebar from '../../components/products/FilterSidebar';

export default function NewPhonesPage() {
  const { newProducts } = useAdmin();
  const [searchParams] = useSearchParams();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const initialBrand = searchParams.get('brand');

  const [filters, setFilters] = useState({
    brands: initialBrand ? [initialBrand] : [],
    priceRange: 'all',
    storage: [],
    ram: [],
    os: 'all',
    condition: 'all',
    batteryHealth: 'all',
    inspectedOnly: false,
  });

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return newProducts.filter((product) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price range
      if (filters.priceRange !== 'all') {
        const p = product.price;
        if (filters.priceRange === 'under-25k' && p >= 25000) return false;
        if (filters.priceRange === '25k-50k' && (p < 25000 || p > 50000)) return false;
        if (filters.priceRange === '50k-80k' && (p < 50000 || p > 80000)) return false;
        if (filters.priceRange === 'above-80k' && p <= 80000) return false;
      }

      // Storage
      if (filters.storage.length > 0) {
        const hasStorage = filters.storage.some((s) =>
          product.storage?.toLowerCase().includes(s.toLowerCase()) ||
          (product.storageOptions && product.storageOptions.some(opt => opt.toLowerCase().includes(s.toLowerCase())))
        );
        if (!hasStorage) return false;
      }

      // RAM
      if (filters.ram.length > 0) {
        const hasRam = filters.ram.some((r) =>
          product.ram?.toLowerCase().includes(r.toLowerCase())
        );
        if (!hasRam) return false;
      }

      // OS
      if (filters.os !== 'all') {
        if (product.os?.toLowerCase() !== filters.os.toLowerCase()) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'recommended' default
    });
  }, [newProducts, searchTerm, filters, sortBy]);

  const activeFilterCount =
    filters.brands.length +
    filters.storage.length +
    filters.ram.length +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.os !== 'all' ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Page Header */}
      <div className="border-b border-[#E2E5E8] pb-5 mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A] block mb-1">
          Authorized Indian Inventory
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">
          New Smartphones Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#69727C] mt-1">
          Genuine sealed handsets with official manufacturer warranty and original tax invoice.
        </p>
      </div>

      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-lg border border-[#E2E5E8]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#69727C]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within new handsets..."
            className="w-full pl-9 pr-8 py-2 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:outline-none focus:border-[#E85D2A] text-[#20252B]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#69727C] hover:text-[#20252B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Sort & Mobile Filter Toggle */}
        <div className="flex items-center space-x-2.5 justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-1.5 bg-[#F5F5F2] hover:bg-slate-200 text-[#20252B] border border-[#E2E5E8] text-xs font-bold px-3 py-2 rounded transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-[#69727C] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs font-semibold text-[#20252B] focus:outline-none focus:border-[#E85D2A]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar (Left) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isUsedPage={false}
          />
        </div>

        {/* Mobile Filter Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17212B]/75 flex justify-end">
            <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E5E8] mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#17212B]">Filter Catalog</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded text-[#69727C] hover:text-[#20252B]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isUsedPage={false}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Product Grid (Right) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between text-xs text-[#69727C] mb-3.5">
            <span>
              Showing <strong className="text-[#20252B]">{filteredProducts.length}</strong> available devices
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={() =>
                  setFilters({
                    brands: [],
                    priceRange: 'all',
                    storage: [],
                    ram: [],
                    os: 'all',
                    condition: 'all',
                    batteryHealth: 'all',
                    inspectedOnly: false,
                  })
                }
                className="text-[#E85D2A] hover:underline font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#E2E5E8] p-10 text-center">
              <Smartphone className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
              <h3 className="text-sm font-bold text-[#20252B] mb-1">
                No smartphones match your selected filters
              </h3>
              <p className="text-xs text-[#69727C] max-w-sm mx-auto mb-3.5">
                Try widening your price range, choosing different brands, or clearing active filters.
              </p>
              <button
                onClick={() => {
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
                  setSearchTerm('');
                }}
                className="bg-[#17212B] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#E85D2A] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
