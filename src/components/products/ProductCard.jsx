import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../common/PhoneImage';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const isWish = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  return (
    <div className="group bg-white rounded-lg border border-[#E2E5E8] hover:border-slate-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <div className="relative p-4 bg-white border-b border-[#F0F2F4]">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="bg-[#17212B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Popular
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#E85D2A] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
              {discountPercent}% OFF
            </span>
          )}
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
        <Link to={`/phones/${product.id}`} className="block overflow-hidden py-2">
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

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#69727C] mb-1">
            <span className="font-bold text-[#E85D2A] uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="font-medium text-[#69727C]">{product.storage || '128GB'}</span>
          </div>

          <Link to={`/phones/${product.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-[#20252B] group-hover:text-[#E85D2A] line-clamp-1 transition font-heading">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-[#69727C] mt-1 line-clamp-1">
            {product.color ? `${product.color} Finish` : 'Sealed Box'} • {product.ram ? `${product.ram} RAM` : 'Official Unit'}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3.5 pt-3 border-t border-[#F0F2F4]">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-base font-extrabold text-[#20252B] font-heading">
                {formatINR(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="ml-1.5 text-[11px] text-[#69727C] line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold">
              {isOutOfStock ? (
                <span className="text-[#D9383A]">Out of Stock</span>
              ) : (
                <span className="text-[#237A4B]">In Stock</span>
              )}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded text-xs font-bold transition ${
              isOutOfStock
                ? 'bg-slate-100 text-[#69727C] cursor-not-allowed border border-[#E2E5E8]'
                : 'bg-[#17212B] hover:bg-[#E85D2A] text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
