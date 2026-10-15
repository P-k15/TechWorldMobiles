import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingBag, ShieldCheck, BatteryCharging, 
  FileText, Package, AlertTriangle, ChevronRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';
import { ConditionBadge } from '../../components/common/Badge';
import UsedProductCard from '../../components/products/UsedProductCard';

export default function UsedProductDetailPage() {
  const { id } = useParams();
  const { usedProducts } = useAdmin();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  const product = usedProducts.find((p) => p.id === id) || usedProducts[0];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-[#17212B]">Device not found</h2>
        <Link to="/second-hand" className="text-[#E85D2A] font-semibold mt-4 inline-block">
          Return to Second-Hand Marketplace
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'];

  const savingsAmount = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice - product.price
    : null;

  const handleAddToCart = () => {
    addToCart(product, 1, { storage: product.storage, color: product.color });
  };

  const handleBuyNow = () => {
    addToCart(product, 1, { storage: product.storage, color: product.color });
    navigate('/checkout');
  };

  const similar = usedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#69727C] mb-6">
        <Link to="/" className="hover:text-[#17212B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/second-hand" className="hover:text-[#17212B]">Pre-Owned Marketplace</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#20252B] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative bg-white rounded-lg border border-[#E2E5E8] p-6 flex items-center justify-center aspect-square overflow-hidden">
            {/* Condition Pill */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
              <span className="bg-[#17212B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Verified Pre-Owned
              </span>
              <ConditionBadge condition={product.condition} />
            </div>

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
                    alt={`${product.name} thumb ${idx + 1}`}
                    fallbackBrand={product.brand}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pre-Owned Diagnostics, Defect Disclosures & Purchase */}
        <div className="lg:col-span-7 space-y-5 bg-white border border-[#E2E5E8] rounded-lg p-6 sm:p-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E85D2A]">
              <span>{product.brand}</span>
              <span className="text-[#69727C]">•</span>
              <span className="text-[#69727C] font-mono">Stock ID: {product.id.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] mt-1.5 font-heading">
              {product.name} ({product.storage || '128GB'})
            </h1>

            <p className="text-xs text-[#69727C] mt-1">
              Color: {product.color || 'Standard'} • Tested & Sanitized by TechWorldMobiles Bandra
            </p>
          </div>

          {/* Price Box with Savings */}
          <div className="bg-[#F5F5F2] p-4 rounded-lg border border-[#E2E5E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-[#20252B] font-heading">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#69727C] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              {savingsAmount && (
                <p className="text-xs font-bold text-[#237A4B] mt-0.5">
                  Save {formatINR(savingsAmount)} vs brand-new price
                </p>
              )}
            </div>

            <div>
              {isOutOfStock ? (
                <span className="inline-block bg-[#D9383A]/10 text-[#D9383A] border border-[#D9383A]/20 text-xs font-bold px-2.5 py-1 rounded">
                  Sold Out
                </span>
              ) : (
                <span className="inline-block bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/20 text-xs font-bold px-2.5 py-1 rounded">
                  Only 1 Unit In Stock (Unique Item)
                </span>
              )}
            </div>
          </div>

          {/* Device Diagnostic Checklist (42-Point Check) */}
          <div className="bg-white rounded-lg border border-[#E2E5E8] p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17212B] flex items-center space-x-2 font-heading">
              <ShieldCheck className="w-4 h-4 text-[#237A4B]" />
              <span>Diagnostic Checklist & Hardware Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#F5F5F2] p-2.5 rounded flex items-center justify-between border border-[#E2E5E8]">
                <span className="text-[#69727C]">Cosmetic Grade:</span>
                <ConditionBadge condition={product.condition} />
              </div>

              <div className="bg-[#F5F5F2] p-2.5 rounded flex items-center justify-between border border-[#E2E5E8]">
                <span className="text-[#69727C]">Battery Health:</span>
                <span className="font-bold text-[#20252B] flex items-center space-x-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#237A4B]" />
                  <span>{product.batteryHealth || '85%+'}</span>
                </span>
              </div>

              <div className="bg-[#F5F5F2] p-2.5 rounded flex items-center justify-between border border-[#E2E5E8]">
                <span className="text-[#69727C]">Store Warranty:</span>
                <span className="font-bold text-[#20252B]">{product.warranty || '6 Months TechWorldMobiles Warranty'}</span>
              </div>

              <div className="bg-[#F5F5F2] p-2.5 rounded flex items-center justify-between border border-[#E2E5E8]">
                <span className="text-[#69727C]">Hardware Test:</span>
                <span className="font-semibold text-[#237A4B]">
                  {product.isInspected ? '42-Point Diagnosis Passed' : 'Basic Verified'}
                </span>
              </div>
            </div>

            {/* Bill & Box Status */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E2E5E8] text-xs">
              <span className={`px-2 py-1 rounded font-medium flex items-center space-x-1 border ${
                product.billAvailable ? 'bg-[#237A4B]/10 text-[#237A4B] border-[#237A4B]/20' : 'bg-slate-100 text-[#69727C] border-[#E2E5E8]'
              }`}>
                <FileText className="w-3.5 h-3.5" />
                <span>{product.billAvailable ? 'Original Tax Invoice Available' : 'No Original Bill (Store Bill Provided)'}</span>
              </span>

              <span className={`px-2 py-1 rounded font-medium flex items-center space-x-1 border ${
                product.boxAvailable ? 'bg-[#237A4B]/10 text-[#237A4B] border-[#237A4B]/20' : 'bg-slate-100 text-[#69727C] border-[#E2E5E8]'
              }`}>
                <Package className="w-3.5 h-3.5" />
                <span>{product.boxAvailable ? 'Original Box Included' : 'Generic TechWorldMobiles Safety Box'}</span>
              </span>
            </div>
          </div>

          {/* Cosmetic Disclosure */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 text-xs space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span>Cosmetic Condition & Defect Disclosure</span>
            </div>
            <p className="text-amber-900/90 leading-relaxed">
              {product.knownDefects || 'Normal signs of prior use. Clean screen with zero cracks or touch dead-zones. Face ID/Touch ID verified.'}
            </p>
            {product.repairHistory && (
              <p className="text-amber-800/80 pt-1 border-t border-amber-200/60">
                <strong>Repair History:</strong> {product.repairHistory}
              </p>
            )}
          </div>

          {/* Accessories Included */}
          {product.accessoriesIncluded && product.accessoriesIncluded.length > 0 && (
            <div className="text-xs">
              <span className="font-bold text-[#20252B] block mb-1">Included in Package:</span>
              <ul className="flex flex-wrap gap-1.5">
                {product.accessoriesIncluded.map((acc, i) => (
                  <li key={i} className="bg-[#F5F5F2] border border-[#E2E5E8] text-[#20252B] px-2.5 py-1 rounded text-[11px] font-medium">
                    ✓ {acc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex items-center space-x-2.5 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 flex items-center justify-center space-x-1.5 bg-[#17212B] hover:bg-[#20252B] disabled:bg-slate-300 text-white font-bold py-3 px-5 rounded text-xs transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex-1 flex items-center justify-center space-x-1.5 bg-[#E85D2A] hover:bg-[#D04E1D] disabled:bg-slate-300 text-white font-bold py-3 px-5 rounded text-xs transition"
            >
              <span>Buy Now</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded border transition ${
                isWish
                  ? 'border-rose-200 bg-rose-50 text-rose-500'
                  : 'border-[#E2E5E8] hover:border-slate-400 text-[#20252B]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Used Phones */}
      {similar.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#E2E5E8]">
          <h2 className="text-lg sm:text-xl font-bold text-[#17212B] mb-4 font-heading">
            Other Verified Pre-Owned Smartphones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similar.map((p) => (
              <UsedProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
