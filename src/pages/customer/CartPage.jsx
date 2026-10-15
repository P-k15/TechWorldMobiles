import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, clearCart } = useStore();
  const navigate = useNavigate();

  // Delivery rule: Free for orders above ₹1,000
  const deliveryCharge = cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 99;
  const finalTotal = cartSubtotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded bg-white border border-[#E2E5E8] text-[#69727C] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-[#E85D2A]" />
        </div>
        <h1 className="text-2xl font-bold text-[#17212B] font-heading">Your Shopping Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-[#69727C] mt-1.5 max-w-sm mx-auto">
          Explore our collection of brand new flagships and inspected second-hand smartphones.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            to="/phones"
            className="bg-[#17212B] hover:bg-[#20252B] text-white font-bold px-5 py-2.5 rounded text-xs transition"
          >
            Shop New Phones
          </Link>
          <Link
            to="/second-hand"
            className="bg-white hover:bg-[#F5F5F2] border border-[#E2E5E8] text-[#20252B] font-bold px-5 py-2.5 rounded text-xs transition"
          >
            Shop Pre-Owned
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="border-b border-[#E2E5E8] pb-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">Store Shopping Cart</h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            You have <strong className="text-[#20252B]">{cart.length}</strong> device(s) selected
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#D9383A] hover:underline font-semibold"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cart Item List (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.variantKey}
              className="bg-white rounded-lg border border-[#E2E5E8] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-16 h-16 rounded bg-[#F5F5F2] border border-[#E2E5E8] overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <PhoneImage
                    src={item.image}
                    alt={item.name}
                    fallbackBrand={item.brand}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-[#E85D2A] uppercase tracking-wider">
                      {item.brand}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        item.type === 'used'
                          ? 'bg-amber-50 text-[#D97706] border-amber-200'
                          : 'bg-emerald-50 text-[#237A4B] border-emerald-200'
                      }`}
                    >
                      {item.type === 'used' ? 'Pre-Owned' : 'Brand New'}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#20252B] mt-0.5 font-heading">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#69727C]">
                    {item.storage || '128GB'} • {item.color || 'Standard'} {item.condition ? `• (${item.condition})` : ''}
                  </p>
                  <span className="text-xs font-extrabold text-[#20252B] mt-1 block">
                    {formatINR(item.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-[#E2E5E8]">
                <div className="flex items-center border border-[#E2E5E8] rounded bg-[#F5F5F2] p-0.5">
                  <button
                    onClick={() => updateCartQuantity(item.variantKey, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[#20252B] hover:bg-white rounded transition text-xs"
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#20252B]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.variantKey, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[#20252B] hover:bg-white rounded transition text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <span className="text-sm font-bold text-[#20252B] block">
                    {formatINR(item.subtotal)}
                  </span>
                  <span className="text-[10px] text-[#69727C]">
                    {item.quantity} × {formatINR(item.price)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.variantKey)}
                  className="p-1.5 text-[#69727C] hover:text-[#D9383A] hover:bg-rose-50 rounded transition"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2 flex items-center justify-between">
            <Link
              to="/phones"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#17212B] hover:text-[#E85D2A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#E2E5E8] p-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#17212B] border-b border-[#E2E5E8] pb-2.5 font-heading">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs text-[#69727C]">
            <div className="flex items-center justify-between">
              <span>Cart Subtotal</span>
              <span className="font-bold text-[#20252B]">{formatINR(cartSubtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery / In-Store Pickup</span>
              <span className="font-bold text-[#237A4B]">
                {deliveryCharge === 0 ? 'FREE' : formatINR(deliveryCharge)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax (GST Included)</span>
              <span className="font-medium text-[#69727C]">₹0 (Included)</span>
            </div>
          </div>

          <div className="border-t border-[#E2E5E8] pt-3 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-[#17212B] block">Total Amount</span>
              <span className="text-[10px] text-[#69727C]">Inclusive of GST</span>
            </div>
            <span className="text-xl font-black text-[#E85D2A] font-heading">
              {formatINR(finalTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full flex items-center justify-center space-x-2 bg-[#E85D2A] hover:bg-[#D04E1D] text-white font-bold py-3 px-4 rounded text-xs transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-2 border-t border-[#E2E5E8] space-y-1.5 text-[11px] text-[#69727C]">
            <div className="flex items-center space-x-2">
              <Truck className="w-3.5 h-3.5 text-[#17212B] shrink-0" />
              <span>Express delivery across India or store pickup in Mumbai.</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#237A4B] shrink-0" />
              <span>Genuine billing & TechWorldMobiles store warranty.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
