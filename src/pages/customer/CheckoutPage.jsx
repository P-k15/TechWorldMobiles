import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, Banknote, QrCode, Lock 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';
import { validatePhone, validateEmail, validatePincode } from '../../utils/validation';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const { createOrder } = useAdmin();
  const navigate = useNavigate();

  const deliveryCharge = cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 99;
  const finalTotal = cartSubtotal + deliveryCharge;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#17212B] font-heading">No items to checkout</h2>
        <p className="text-xs text-[#69727C] mt-1">Please add items from the catalog before proceeding.</p>
        <Link
          to="/phones"
          className="mt-4 inline-block bg-[#17212B] text-white text-xs font-bold px-4 py-2 rounded"
        >
          Browse Phones
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errs.phone = phoneErr;
    if (formData.email) {
      const emailErr = validateEmail(formData.email);
      if (emailErr) errs.email = emailErr;
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    const pinErr = validatePincode(formData.pincode);
    if (pinErr) errs.pincode = pinErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderData = {
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
      items: cart.map((item) => ({
        productId: item.id,
        variantKey: item.variantKey,
        productName: item.name,
        brand: item.brand,
        type: item.type,
        quantity: item.quantity,
        unitPrice: item.price,
        storage: item.storage,
        color: item.color,
        total: item.subtotal,
      })),
      subtotal: cartSubtotal,
      deliveryCharge,
      totalAmount: finalTotal,
    };

    const newOrder = createOrder(orderData);
    clearCart();
    navigate(`/order-success/${newOrder.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Page Title */}
      <div className="border-b border-[#E2E5E8] pb-4 mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85D2A] block mb-1">
          Store Checkout
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">
          Review Address & Payment
        </h1>
        <p className="text-xs text-[#69727C] mt-0.5">
          Enter delivery coordinates and select simulated demonstration payment.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Information Section */}
          <div className="bg-white rounded-lg border border-[#E2E5E8] p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center space-x-2 border-b border-[#E2E5E8] pb-3 uppercase tracking-wider font-heading">
              <span className="w-5 h-5 rounded bg-[#17212B] text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Customer Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aditya Sen"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.fullName && <p className="text-[#D9383A] text-[11px] mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9820012345"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.phone && <p className="text-[#D9383A] text-[11px] mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Email Address (For invoice & tracking updates)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. aditya.sen@example.com"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.email && <p className="text-[#D9383A] text-[11px] mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Information Section */}
          <div className="bg-white rounded-lg border border-[#E2E5E8] p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center space-x-2 border-b border-[#E2E5E8] pb-3 uppercase tracking-wider font-heading">
              <span className="w-5 h-5 rounded bg-[#17212B] text-white text-[11px] flex items-center justify-center font-bold">2</span>
              <span>Delivery Coordinates</span>
            </h2>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                  Street Address / Flat / Building *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Flat 402, Sea View Apts, Hill Road, Bandra West"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                />
                {errors.address && <p className="text-[#D9383A] text-[11px] mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                  />
                  {errors.city && <p className="text-[#D9383A] text-[11px] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#20252B] uppercase tracking-wider mb-1">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    maxLength={6}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 400050"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded p-2.5 text-xs text-[#20252B] focus:border-[#E85D2A] focus:outline-none"
                  />
                  {errors.pincode && <p className="text-[#D9383A] text-[11px] mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-lg border border-[#E2E5E8] p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#17212B] flex items-center space-x-2 border-b border-[#E2E5E8] pb-3 uppercase tracking-wider font-heading">
              <span className="w-5 h-5 rounded bg-[#17212B] text-white text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Payment Options (Demo Mode)</span>
            </h2>

            <div className="space-y-2.5">
              {[
                {
                  id: 'Cash on Delivery',
                  title: 'Cash on Delivery (Pay at Doorstep / Store Counter)',
                  desc: 'Pay cash or UPI upon inspecting package.',
                  icon: <Banknote className="w-4 h-4 text-[#237A4B]" />,
                },
                {
                  id: 'UPI (Demo)',
                  title: 'UPI (Google Pay, PhonePe, Paytm Demo)',
                  desc: 'Simulated instant UPI transfer.',
                  icon: <QrCode className="w-4 h-4 text-[#E85D2A]" />,
                },
                {
                  id: 'Online Payment (Demo)',
                  title: 'Debit / Credit Card & Net Banking (Demo)',
                  desc: 'Simulated card payment.',
                  icon: <CreditCard className="w-4 h-4 text-[#17212B]" />,
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start space-x-3 p-3.5 rounded border cursor-pointer transition ${
                    formData.paymentMethod === opt.id
                      ? 'border-[#17212B] bg-[#F5F5F2]'
                      : 'border-[#E2E5E8] hover:border-slate-400 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.id}
                    checked={formData.paymentMethod === opt.id}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-3.5 h-3.5 text-[#E85D2A] focus:ring-[#E85D2A] mt-0.5"
                  />
                  <div className="shrink-0 mt-0.5">{opt.icon}</div>
                  <div>
                    <span className="text-xs font-bold text-[#20252B] block">
                      {opt.title}
                    </span>
                    <span className="text-[11px] text-[#69727C] block mt-0.5">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-amber-50/70 border border-amber-200 text-amber-900 text-xs p-3 rounded leading-relaxed">
              <strong>Demo Prototype Note:</strong> Real banking and payment gateways are disabled in this sample prototype. Placing this order stores the transaction in local browser state and links directly to store inventory and the admin dashboard.
            </div>
          </div>
        </div>

        {/* Right Order Review (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#E2E5E8] p-5 space-y-4 sticky top-28">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#17212B] border-b border-[#E2E5E8] pb-2.5 font-heading">
            Your Order Items ({cart.length})
          </h2>

          <div className="max-h-60 overflow-y-auto divide-y divide-[#E2E5E8] pr-1">
            {cart.map((item) => (
              <div key={item.variantKey} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#20252B] block line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#69727C]">
                    Qty: {item.quantity} • {item.storage || '128GB'}
                  </span>
                </div>
                <span className="font-bold text-[#20252B]">{formatINR(item.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E2E5E8] space-y-2 text-xs text-[#69727C]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#20252B]">{formatINR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#237A4B]">
                {deliveryCharge === 0 ? 'FREE' : formatINR(deliveryCharge)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#E2E5E8] pt-2 text-sm text-[#20252B]">
              <span className="font-bold">Total Payable</span>
              <span className="font-black text-[#E85D2A] text-lg font-heading">{formatINR(finalTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#237A4B] hover:bg-[#1E683F] text-white font-bold py-3 px-4 rounded text-xs transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Confirm Demo Order</span>
          </button>

          <p className="text-[10px] text-center text-[#69727C]">
            Safe local browser simulation • Adjusts stock in ERP
          </p>
        </div>
      </form>
    </div>
  );
}
