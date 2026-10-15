import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, BatteryCharging, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../common/PhoneImage';
import { ConditionBadge } from '../common/Badge';

export default function UsedProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const isWish = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const savingsAmount = (product.originalPrice && product.originalPrice > product.price)
    ? product.originalPrice - product.price
    : null;

  return (
    <div className="group bg-white rounded-lg border border-[#E2E5E8] hover:border-[#17212B] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Pre-Owned Distinction Header Strip */}
      <div className="bg-[#17212B] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
        <span className="text-amber-400">Verified Pre-Owned</span>
        {product.isInspected && (
          <span className="flex items-center space-x-1 text-emerald-400 font-semibold lowercase text-[10px]">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>42-point tested</span>
          </span>
        )}
      </div>

      {/* Top Image Container */}
      <div className="relative p-4 bg-white border-b border-[#F0F2F4]">
        {/* Condition Grade */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <ConditionBadge condition={product.condition} />
        </div>

        {/* Quick action buttons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col space-y-1">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-1.5 rounded border transition ${
              isWish
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-[#E2E5E8] text-[#69727C] hover:text-[#20252B]'
            }`}
            aria-label="Add to wishlist"
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-1.5 rounded bg-white border border-[#E2E5E8] text-[#69727C] hover:text-[#20252B] hover:border-slate-400 transition"
            aria-label="Quick view"
            title="Quick Specs"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image Link */}
        <Link to={`/second-hand/${product.id}`} className="block overflow-hidden py-2">
          <div className="w-full aspect-square max-h-48 mx-auto flex items-center justify-center group-hover:scale-102 transition-transform duration-200">
            <PhoneImage
              src={product.images?.[0]}
              alt={product.name}
              fallbackBrand={product.brand}
              className="max-h-44 w-auto object-contain mx-auto"
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#69727C] mb-1">
            <span className="font-bold text-[#17212B] uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="font-semibold text-[#20252B] bg-[#F5F5F2] border border-[#E2E5E8] px-1.5 py-0.2 rounded text-[10px]">
              {product.storage || '128GB'}
            </span>
          </div>

          <Link to={`/second-hand/${product.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-[#20252B] group-hover:text-[#E85D2A] line-clamp-1 transition font-heading">
              {product.name}
            </h3>
          </Link>

          {/* Used Device Specs: Battery & Warranty */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-[#69727C]">
            {product.batteryHealth && (
              <span className="inline-flex items-center space-x-1 bg-[#F5F5F2] border border-[#E2E5E8] px-1.5 py-0.5 rounded font-medium text-[#20252B]">
                <BatteryCharging className="w-3 h-3 text-[#237A4B]" />
                <span>{product.batteryHealth} Battery</span>
              </span>
            )}
            <span className="text-[#69727C]">
              {product.warranty ? product.warranty.replace('TechWorldMobiles', 'Store') : 'Store Warranty'}
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-3.5 pt-3 border-t border-[#F0F2F4]">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-base font-extrabold text-[#20252B] font-heading">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="ml-1.5 text-[11px] text-[#69727C] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            {savingsAmount && (
              <span className="text-[10px] font-bold text-[#237A4B] bg-[#237A4B]/10 border border-[#237A4B]/20 px-1.5 py-0.2 rounded">
                Save {formatINR(savingsAmount)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/second-hand/${product.id}`}
              className="text-center py-2 px-2.5 rounded border border-[#E2E5E8] text-[#20252B] hover:bg-[#F5F5F2] hover:border-slate-400 text-xs font-semibold transition"
            >
              Diagnostic Report
            </Link>
            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`flex items-center justify-center space-x-1 py-2 px-2.5 rounded text-xs font-bold transition ${
                isOutOfStock
                  ? 'bg-slate-100 text-[#69727C] cursor-not-allowed border border-[#E2E5E8]'
                  : 'bg-[#E85D2A] hover:bg-[#D04E1D] text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isOutOfStock ? 'Sold' : 'Buy Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
