import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingBag, Truck, Star, ChevronRight 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';
import ProductCard from '../../components/products/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { newProducts } = useAdmin();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  const product = newProducts.find((p) => p.id === id) || newProducts[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage || '128GB');
  const [selectedColor, setSelectedColor] = useState(product?.color || (product?.colors && product.colors[0]) || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedStorage(product.storage || '128GB');
      setSelectedColor(product.color || (product.colors && product.colors[0]) || 'Standard');
      setQuantity(1);
      setPincodeResult(null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-[#17212B]">Product not found</h2>
        <Link to="/phones" className="text-[#E85D2A] font-semibold mt-4 inline-block">
          Return to Phones Catalog
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'];

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity, { storage: selectedStorage, color: selectedColor });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, { storage: selectedStorage, color: selectedColor });
    navigate('/checkout');
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code' });
      return;
    }
    const days = pincode.startsWith('40') ? 'Tomorrow (Mumbai Store Express)' : '2 – 3 Days';
    setPincodeResult({
      valid: true,
      message: `Delivery available by ${days} to ${pincode.trim()}. Cash on Delivery & Free Store Pickup available.`
    });
  };

  const related = newProducts
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#69727C] mb-6">
        <Link to="/" className="hover:text-[#17212B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/phones" className="hover:text-[#17212B]">New Phones</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#20252B] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Main Selected Image */}
          <div className="relative bg-white rounded-lg border border-[#E2E5E8] p-6 flex items-center justify-center aspect-square overflow-hidden">
            {discountPercent && (
              <span className="absolute top-3 left-3 z-10 bg-[#E85D2A] text-white text-xs font-bold px-2 py-0.5 rounded">
                {discountPercent}% OFF
              </span>
            )}
            <div className="w-full h-full max-h-[380px] flex items-center justify-center">
              <PhoneImage
                src={images[activeImage]}
                alt={product.name}
                fallbackBrand={product.brand}
                className="max-h-[360px] w-auto object-contain mx-auto"
              />
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded bg-white border p-1 shrink-0 overflow-hidden transition ${
                    activeImage === idx
                      ? 'border-[#17212B] ring-1 ring-[#17212B]'
                      : 'border-[#E2E5E8] hover:border-slate-400 opacity-80'
                  }`}
                >
                  <PhoneImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fallbackBrand={product.brand}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Variants, Specs & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white border border-[#E2E5E8] rounded-lg p-6 sm:p-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E85D2A]">
              <span>{product.brand}</span>
              <span className="text-[#69727C]">•</span>
              <span className="text-[#69727C] font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] mt-1.5 font-heading">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center space-x-3 mt-2 text-xs text-[#69727C]">
              <div className="flex items-center text-amber-500 font-semibold">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span className="text-[#20252B] font-bold">{product.rating || 4.8}</span>
                <span className="text-[#69727C] ml-1">({product.reviewCount || 120} store reviews)</span>
              </div>
              <span>•</span>
              <span>
                {isOutOfStock ? (
                  <span className="text-[#D9383A] font-bold">Currently Out of Stock</span>
                ) : (
                  <span className="text-[#237A4B] font-semibold">● In Stock ({product.stock} units ready)</span>
                )}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#F5F5F2] p-4 rounded-lg border border-[#E2E5E8]">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-[#20252B] font-heading">
                {formatINR(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-[#69727C] line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
            <p className="text-xs text-[#69727C] mt-1">
              Inclusive of GST. Sealed Indian retail pack with official manufacturer warranty.
            </p>
          </div>

          {/* Storage Variant Selector */}
          {product.storageOptions && product.storageOptions.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
                Storage: <span className="text-[#E85D2A]">{selectedStorage}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.storageOptions.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStorage(st)}
                    className={`py-1.5 px-3.5 rounded text-xs font-bold border transition ${
                      selectedStorage === st
                        ? 'border-[#17212B] bg-[#17212B] text-white'
                        : 'border-[#E2E5E8] bg-white text-[#20252B] hover:border-slate-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Variant Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
                Color Finish: <span className="text-[#E85D2A]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`py-1.5 px-3.5 rounded text-xs font-semibold border transition ${
                      selectedColor === c
                        ? 'border-[#17212B] bg-[#17212B] text-white'
                        : 'border-[#E2E5E8] bg-white text-[#20252B] hover:border-slate-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-[#E2E5E8] rounded bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#20252B] hover:bg-[#F5F5F2] font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#20252B]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 5, quantity + 1))}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#20252B] hover:bg-[#F5F5F2] font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded border transition ${
                  isWish
                    ? 'border-rose-200 bg-rose-50 text-rose-500'
                    : 'border-[#E2E5E8] hover:border-slate-400 text-[#20252B]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex items-center justify-center space-x-2 bg-[#17212B] hover:bg-[#20252B] disabled:bg-slate-300 text-white font-bold py-3 px-5 rounded text-xs transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex items-center justify-center space-x-2 bg-[#E85D2A] hover:bg-[#D04E1D] disabled:bg-slate-300 text-white font-bold py-3 px-5 rounded text-xs transition"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="bg-[#F5F5F2] p-4 rounded-lg border border-[#E2E5E8] space-y-2.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#17212B]">
              <Truck className="w-4 h-4 text-[#E85D2A]" />
              <span>Check Express Delivery & Store Pickup</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN code (e.g. 400050)"
                maxLength={6}
                className="flex-1 bg-white border border-[#E2E5E8] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#E85D2A] text-[#20252B]"
              />
              <button
                type="submit"
                className="bg-[#17212B] hover:bg-[#20252B] text-white px-4 py-1.5 rounded text-xs font-bold transition"
              >
                Check
              </button>
            </form>

            {pincodeResult && (
              <div
                className={`text-xs p-2.5 rounded ${
                  pincodeResult.valid
                    ? 'bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/20'
                    : 'bg-[#D9383A]/10 text-[#D9383A] border border-[#D9383A]/20'
                }`}
              >
                {pincodeResult.message}
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="pt-3 border-t border-[#E2E5E8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17212B] mb-2.5 font-heading">
              Technical Specifications
            </h3>
            <div className="border border-[#E2E5E8] rounded overflow-hidden divide-y divide-[#E2E5E8] text-xs">
              <div className="grid grid-cols-3 p-2.5 bg-[#F5F5F2]">
                <span className="font-semibold text-[#69727C]">Display</span>
                <span className="col-span-2 text-[#20252B] font-medium">{product.display || 'Full HD+ AMOLED'}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="font-semibold text-[#69727C]">Processor</span>
                <span className="col-span-2 text-[#20252B] font-medium">{product.processor || 'Octa-Core 5G Platform'}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-[#F5F5F2]">
                <span className="font-semibold text-[#69727C]">Camera System</span>
                <span className="col-span-2 text-[#20252B] font-medium">{product.camera || 'High Resolution OIS'}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="font-semibold text-[#69727C]">Battery & Charging</span>
                <span className="col-span-2 text-[#20252B] font-medium">{product.battery || 'All-Day Battery'}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-[#F5F5F2]">
                <span className="font-semibold text-[#69727C]">Operating System</span>
                <span className="col-span-2 text-[#20252B] font-medium">{product.os || 'Android'}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="font-semibold text-[#69727C]">Warranty Coverage</span>
                <span className="col-span-2 text-[#20252B] font-medium">1 Year Official Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#E2E5E8]">
          <h2 className="text-lg sm:text-xl font-bold text-[#17212B] mb-4 font-heading">
            Alternative Smartphones to Consider
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
