import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from './PhoneImage';
import { ConditionBadge } from './Badge';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);
  const isUsed = product.type === 'used';

  const currentStorage = selectedStorage || product.storage || '128GB';
  const currentColor = selectedColor || product.color || 'Standard';

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedStorage('');
    setSelectedColor('');
    setQty(1);
  };

  const handleAddToCart = () => {
    addToCart(product, qty, { storage: currentStorage, color: currentColor });
    handleClose();
  };

  const handleViewFullDetails = () => {
    handleClose();
    if (isUsed) {
      navigate(`/second-hand/${product.id}`);
    } else {
      navigate(`/phones/${product.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17212B]/75 flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#E2E5E8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-10 p-1.5 text-[#69727C] hover:text-[#20252B] bg-[#F5F5F2] hover:bg-slate-200 rounded transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-[#F5F5F2] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E2E5E8]">
            <div className="w-full max-w-[220px] aspect-[4/5] rounded bg-white border border-[#E2E5E8] p-4 flex items-center justify-center">
              <PhoneImage
                src={product.images?.[0]}
                alt={product.name}
                fallbackBrand={product.brand}
                className="w-full h-full object-contain"
              />
            </div>
            {isUsed && (
              <div className="absolute top-3 left-3">
                <ConditionBadge condition={product.condition} />
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="p-5 md:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A]">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold">
                  {product.stock > 0 ? (
                    <span className="text-[#237A4B]">● In Stock ({product.stock} units)</span>
                  ) : (
                    <span className="text-[#D9383A]">Out of Stock</span>
                  )}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-[#20252B] mt-1 font-heading">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline space-x-2.5 mt-2.5">
                <span className="text-2xl font-black text-[#20252B] font-heading">
                  {formatINR(product.price)}
                </span>
                {(product.mrp || product.originalPrice) && (
                  <span className="text-xs text-[#69727C] line-through">
                    {formatINR(product.mrp || product.originalPrice)}
                  </span>
                )}
                {product.mrp && product.mrp > product.price && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-[#D9383A] border border-rose-200">
                    Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-xs text-[#69727C] mt-2.5 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                <div className="bg-[#F5F5F2] border border-[#E2E5E8] p-2 rounded">
                  <span className="text-[10px] text-[#69727C] block font-medium">Storage Option</span>
                  <span className="font-bold text-[#20252B]">{currentStorage}</span>
                </div>
                <div className="bg-[#F5F5F2] border border-[#E2E5E8] p-2 rounded">
                  <span className="text-[10px] text-[#69727C] block font-medium">Color Finish</span>
                  <span className="font-bold text-[#20252B]">{currentColor}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E2E5E8] flex flex-col space-y-2.5">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 flex items-center justify-center space-x-1.5 bg-[#E85D2A] hover:bg-[#D04E1D] disabled:bg-slate-300 text-white font-bold py-2.5 px-4 rounded text-xs transition"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Store Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded border transition ${
                    isWish
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-[#E2E5E8] hover:border-slate-400 text-[#20252B]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full flex items-center justify-center space-x-1 text-xs font-semibold text-[#17212B] hover:text-[#E85D2A] py-1 transition"
              >
                <span>View Complete Technical Specifications & Warranty</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
