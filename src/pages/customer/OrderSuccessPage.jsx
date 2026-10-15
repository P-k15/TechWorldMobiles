import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useAdmin();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-[#E2E5E8] p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded bg-[#237A4B]/10 text-[#237A4B] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <span className="inline-block bg-[#237A4B]/10 text-[#237A4B] text-[11px] font-bold px-2.5 py-0.5 rounded border border-[#237A4B]/20 mb-2">
            Order Confirmed (Demo Prototype)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">
            Thank You for Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#69727C] mt-1.5">
            Your demo order has been logged into the TechWorldMobiles system and inventory has been adjusted.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="bg-[#F5F5F2] border border-[#E2E5E8] rounded-lg p-5 text-left space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-2">
              <span className="text-xs text-[#69727C]">Order ID:</span>
              <span className="text-sm font-mono font-bold text-[#E85D2A]">{order.id}</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#69727C]">Customer:</span>
                <span className="font-bold text-[#20252B]">{order.customer?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69727C]">Delivery Address:</span>
                <span className="font-medium text-[#20252B] text-right max-w-[200px]">
                  {order.customer?.address}, {order.customer?.city} ({order.customer?.pincode})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69727C]">Payment Method:</span>
                <span className="font-semibold text-[#20252B]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E2E5E8]">
                <span className="font-bold text-[#20252B]">Total Amount:</span>
                <span className="text-base font-black text-[#17212B] font-heading">
                  {formatINR(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Line items preview */}
            <div className="pt-2 border-t border-[#E2E5E8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#69727C] block mb-1.5">
                Purchased Handsets ({order.items?.length || 0})
              </span>
              <div className="space-y-1">
                {(order.items || []).map((it, i) => (
                  <div key={i} className="text-xs flex justify-between text-[#20252B]">
                    <span className="truncate max-w-[220px]">
                      {it.quantity}x {it.productName}
                    </span>
                    <span className="font-semibold">{formatINR(it.total || it.unitPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50/70 border border-amber-200 text-amber-900 text-xs p-3 rounded max-w-lg mx-auto text-left leading-relaxed">
          <strong>Demonstration Note:</strong> This is a static prototype checkout. No real financial transaction was executed. You can inspect and update this order in the Admin Management Portal.
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/admin/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-[#17212B] hover:bg-[#20252B] text-white font-bold py-2.5 px-5 rounded text-xs transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>Track in Admin Dashboard</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-white hover:bg-[#F5F5F2] border border-[#E2E5E8] text-[#20252B] font-semibold py-2.5 px-5 rounded text-xs transition"
          >
            <span>Back to Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
