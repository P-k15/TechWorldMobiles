import React, { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';
import { OrderStatusBadge, PaymentStatusBadge } from '../../components/common/Badge';

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const { addToast } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [fulfilmentFilter, setFulfilmentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status update states
  const [newFulfilment, setNewFulfilment] = useState('');
  const [newPayment, setNewPayment] = useState('');
  const [cancelModalOrderId, setCancelModalOrderId] = useState(null);

  const handleOpenDetails = (ord) => {
    setSelectedOrder(ord);
    setNewFulfilment(ord.fulfilmentStatus);
    setNewPayment(ord.paymentStatus);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, newFulfilment, newPayment);
    addToast(`Order ${selectedOrder.id} updated: Fulfilment (${newFulfilment}), Payment (${newPayment})`, 'success');
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled', 'Refunded');
    setCancelModalOrderId(null);
    addToast(`Order ${orderId} marked Cancelled. Excluded from completed revenue.`, 'info');
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customer?.fullName && o.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.customer?.city && o.customer.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFulfilment = fulfilmentFilter === 'all' || o.fulfilmentStatus === fulfilmentFilter;
    return matchesSearch && matchesFulfilment;
  });

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Customer Orders Management
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Track customer orders, update fulfilment states, and manage payment verification.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, customer, city..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Fulfilment Status:</span>
          <select
            value={fulfilmentFilter}
            onChange={(e) => setFulfilmentFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Fulfilment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F5F5F2]/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#E85D2A]">
                    {ord.id}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#17212B] block">{ord.customer?.fullName}</span>
                    <span className="text-[11px] text-[#69727C]">
                      {ord.customer?.city}, {ord.customer?.state}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {formatDate(ord.orderDate)}
                  </td>

                  <td className="py-3 px-4 text-[#20252B]">
                    {ord.items?.length || 1} unit(s)
                  </td>

                  <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                    {formatINR(ord.totalAmount)}
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {ord.paymentMethod}
                  </td>

                  <td className="py-3 px-4">
                    <PaymentStatusBadge status={ord.paymentStatus} />
                  </td>

                  <td className="py-3 px-4">
                    <OrderStatusBadge status={ord.fulfilmentStatus} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetails(ord)}
                      className="inline-flex items-center gap-1 py-1 px-2.5 rounded bg-[#F5F5F2] hover:bg-[#E2E5E8] text-[#17212B] font-semibold transition border border-[#E2E5E8]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Workflow Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-xl border border-[#E2E5E8] space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#E85D2A] block">
                  {selectedOrder.id}
                </span>
                <h2 className="text-sm font-bold text-[#17212B] font-heading">
                  Order Details & Dispatch Controls
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded text-[#69727C] hover:text-[#17212B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-[#F5F5F2] p-3.5 rounded border border-[#E2E5E8] text-xs space-y-1">
              <span className="text-[#69727C] font-semibold block uppercase tracking-wider text-[10px]">
                Delivery Destination
              </span>
              <strong className="text-[#17212B] block">{selectedOrder.customer?.fullName}</strong>
              <span className="text-[#69727C] block">
                {selectedOrder.customer?.address}, {selectedOrder.customer?.city}, {selectedOrder.customer?.state} - {selectedOrder.customer?.pincode}
              </span>
              <span className="text-[#69727C] block">
                Phone: {selectedOrder.customer?.phone} • Email: {selectedOrder.customer?.email || 'N/A'}
              </span>
            </div>

            {/* Line Items */}
            <div>
              <span className="text-xs font-semibold text-[#17212B] uppercase tracking-wider block mb-1.5 font-heading">
                Order Items ({selectedOrder.items?.length || 0})
              </span>
              <div className="divide-y divide-[#E2E5E8] border border-[#E2E5E8] rounded p-3 text-xs space-y-2">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between pt-1">
                    <div>
                      <span className="font-semibold text-[#17212B] block">{item.productName}</span>
                      <span className="text-[#69727C] text-[11px]">
                        Qty: {item.quantity} • {item.storage || '128GB'} • {item.type === 'used' ? 'Pre-Owned' : 'Brand New'}
                      </span>
                    </div>
                    <span className="font-bold text-[#17212B] font-heading">{formatINR(item.total || item.unitPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleSaveStatus} className="border-t border-[#E2E5E8] pt-3.5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Fulfilment Status</label>
                  <select
                    value={newFulfilment}
                    onChange={(e) => setNewFulfilment(e.target.value)}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs font-medium text-[#17212B] focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Payment Status</label>
                  <select
                    value={newPayment}
                    onChange={(e) => setNewPayment(e.target.value)}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs font-medium text-[#17212B] focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending (COD)">Pending (COD)</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Business Rule Notice */}
              <div className="bg-[#F5F5F2] border border-[#E2E5E8] p-3 rounded text-[11px] text-[#69727C] leading-relaxed">
                <strong className="text-[#17212B]">Accounting Rule:</strong> Only orders marked both <em>Delivered</em> and <em>Paid</em> contribute to completed sales revenue. Cancelled orders are strictly excluded from gross revenue.
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCancelModalOrderId(selectedOrder.id)}
                  className="py-2 px-3 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold"
                >
                  Cancel Order
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold transition shadow-xs"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Modal */}
      {cancelModalOrderId && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-[#E2E5E8] space-y-3">
            <h3 className="text-sm font-bold text-[#17212B] font-heading">Cancel Order {cancelModalOrderId}?</h3>
            <p className="text-xs text-[#69727C]">
              Are you sure? Cancelled orders do not contribute to completed sales revenue or shop profits.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setCancelModalOrderId(null)}
                className="flex-1 py-1.5 rounded border border-[#E2E5E8] text-xs font-semibold text-[#17212B] hover:bg-[#F5F5F2]"
              >
                Keep Order
              </button>
              <button
                onClick={() => {
                  handleCancelOrder(cancelModalOrderId);
                  setSelectedOrder(null);
                }}
                className="flex-1 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
