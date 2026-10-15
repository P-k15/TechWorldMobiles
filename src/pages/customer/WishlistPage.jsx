import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded bg-white border border-[#E2E5E8] text-[#69727C] flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-[#E85D2A]" />
        </div>
        <h1 className="text-2xl font-bold text-[#17212B] font-heading">Your Wishlist is Empty</h1>
        <p className="text-xs sm:text-sm text-[#69727C] mt-1.5 max-w-sm mx-auto">
          Save devices you're interested in by tapping the heart icon on any phone card.
        </p>
        <Link
          to="/phones"
          className="inline-flex items-center space-x-2 bg-[#17212B] hover:bg-[#20252B] text-white font-bold px-5 py-2.5 rounded text-xs transition mt-5"
        >
          <span>Discover Smartphones</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="border-b border-[#E2E5E8] pb-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">Saved Wishlist</h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            {wishlist.length} smartphone(s) saved for future review
          </p>
        </div>
        <Link
          to="/phones"
          className="text-xs font-bold text-[#17212B] hover:text-[#E85D2A] flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-[#E2E5E8] hover:border-slate-400 p-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="relative aspect-square bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2 overflow-hidden mb-3 flex items-center justify-center">
                <PhoneImage
                  src={item.images?.[0]}
                  alt={item.name}
                  fallbackBrand={item.brand}
                  className="max-h-36 w-auto object-contain"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 p-1 rounded bg-white text-rose-500 hover:bg-rose-50 border border-[#E2E5E8]"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D2A]">
                {item.brand}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B] line-clamp-1 mt-0.5 font-heading">
                {item.name}
              </h3>
              <p className="text-[11px] text-[#69727C] mt-0.5">
                {item.storage || '128GB'} • {item.type === 'used' ? 'Pre-Owned' : 'Brand New'}
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#E2E5E8] flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#20252B] font-heading">
                {formatINR(item.price)}
              </span>
              <button
                onClick={() => addToCart(item, 1)}
                className="inline-flex items-center space-x-1.5 bg-[#17212B] hover:bg-[#E85D2A] text-white text-xs font-bold py-1.5 px-3 rounded transition"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
