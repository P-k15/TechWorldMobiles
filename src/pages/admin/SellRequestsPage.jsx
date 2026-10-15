import React, { useState } from 'react';
import { Search, Eye, CheckCircle2, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';
import { RequestStatusBadge, ConditionBadge } from '../../components/common/Badge';

export default function SellRequestsPage() {
  const { sellRequests, updateSellRequest } = useAdmin();
  const { addToast } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Workflow update modal state
  const [newStatus, setNewStatus] = useState('');
  const [offeredPrice, setOfferedPrice] = useState('');
  const [finalAgreedPrice, setFinalAgreedPrice] = useState('');
  const [inspectionNotes, setInspectionNotes] = useState('');

  const handleOpenDetails = (req) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setOfferedPrice(req.offeredPrice || req.expectedPrice || '');
    setFinalAgreedPrice(req.finalAgreedPrice || req.offeredPrice || req.expectedPrice || '');
    setInspectionNotes(req.inspectionNotes || '');
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    const updates = {
      status: newStatus,
      inspectionNotes,
      offeredPrice: offeredPrice ? Number(offeredPrice) : null,
      finalAgreedPrice: finalAgreedPrice ? Number(finalAgreedPrice) : null,
      purchaseDate: newStatus === 'Purchase Completed' ? new Date().toISOString() : selectedRequest.purchaseDate,
    };

    updateSellRequest(selectedRequest.id, updates);
    addToast(`Request ${selectedRequest.id} updated to "${newStatus}"`, 'success');
    setSelectedRequest(null);
  };

  const filtered = sellRequests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Customer Sell Requests Pipeline
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Review customer trade-in submissions, evaluate device photos, extend offers, and record acquisitions.
          </p>
        </div>
      </div>

      {/* Search & Status Tabs */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Ref ID, customer, model..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Pipeline Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Submissions ({sellRequests.length})</option>
            <option value="Submitted">Submitted (Awaiting Review)</option>
            <option value="Under Review">Under Review</option>
            <option value="Inspection Required">Inspection Required</option>
            <option value="Offer Made">Offer Made</option>
            <option value="Accepted">Accepted</option>
            <option value="Purchase Completed">Purchase Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Smartphone Model</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Asking Price</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-[#F5F5F2]/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#E85D2A]">
                    {req.id}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#17212B] block">{req.customerName}</span>
                    <span className="text-[11px] text-[#69727C]">{req.customerPhone}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#17212B] block">
                      {req.brand} {req.model}
                    </span>
                    <span className="text-[11px] text-[#69727C]">
                      {req.storage || '128GB'} • {req.color || 'Standard'}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <ConditionBadge condition={req.physicalCondition} />
                  </td>

                  <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                    {formatINR(req.expectedPrice)}
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {formatDate(req.submissionDate)}
                  </td>

                  <td className="py-3 px-4">
                    <RequestStatusBadge status={req.status} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetails(req)}
                      className="inline-flex items-center gap-1 py-1 px-2.5 rounded bg-[#F5F5F2] hover:bg-[#E2E5E8] text-[#17212B] font-semibold transition border border-[#E2E5E8]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details & Status Update Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl border border-[#E2E5E8] space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#E85D2A] block">
                  {selectedRequest.id}
                </span>
                <h2 className="text-sm font-bold text-[#17212B] font-heading">
                  {selectedRequest.brand} {selectedRequest.model} ({selectedRequest.storage})
                </h2>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded text-[#69727C] hover:text-[#17212B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Contact & Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F5F5F2] p-3.5 rounded border border-[#E2E5E8] text-xs">
              <div>
                <span className="text-[#69727C] font-semibold block uppercase tracking-wider text-[10px]">Customer Details</span>
                <strong className="text-[#17212B] block mt-0.5">{selectedRequest.customerName}</strong>
                <span className="text-[#69727C] block">{selectedRequest.customerPhone}</span>
                {selectedRequest.customerEmail && (
                  <span className="text-[#69727C] block">{selectedRequest.customerEmail}</span>
                )}
                <span className="text-[#E85D2A] font-semibold block mt-1">
                  Preferred Channel: {selectedRequest.preferredContact || 'WhatsApp'}
                </span>
              </div>

              <div>
                <span className="text-[#69727C] font-semibold block uppercase tracking-wider text-[10px]">Hardware Specs</span>
                <span className="text-[#20252B] block mt-0.5">
                  <strong>RAM:</strong> {selectedRequest.ram || '8GB'} • <strong>Color:</strong> {selectedRequest.color || 'Standard'}
                </span>
                <span className="text-[#20252B] block">
                  <strong>Purchase Year:</strong> {selectedRequest.purchaseYear || '2023'}
                </span>
                <span className="text-[#20252B] block">
                  <strong>Battery Health:</strong> {selectedRequest.batteryHealth || 'Unknown'}
                </span>
                <span className="text-[#20252B] block">
                  <strong>Screen State:</strong> {selectedRequest.screenCondition || 'Good'}
                </span>
              </div>
            </div>

            {/* Uploaded Photos Previews */}
            {selectedRequest.photos && selectedRequest.photos.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#17212B] uppercase tracking-wider block mb-1.5 font-heading">
                  Customer Uploaded Photos ({selectedRequest.photos.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedRequest.photos.map((img, i) => (
                    <div key={i} className="aspect-square rounded overflow-hidden border border-[#E2E5E8] bg-[#F5F5F2]">
                      <img src={img} alt="Uploaded device" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cosmetic defects & Accessories */}
            <div className="space-y-1.5 text-xs">
              <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-amber-900">
                <strong>Reported Defects:</strong> {selectedRequest.knownDefects || 'None reported'}
              </div>
              <div className="flex items-center gap-3 text-[#69727C]">
                <span>Original Invoice: <strong className="text-[#17212B]">{selectedRequest.billAvailable ? 'Yes' : 'No'}</strong></span>
                <span>•</span>
                <span>Original Box: <strong className="text-[#17212B]">{selectedRequest.boxAvailable ? 'Yes' : 'No'}</strong></span>
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleSaveStatus} className="border-t border-[#E2E5E8] pt-3.5 space-y-3 text-xs">
              <h3 className="font-semibold text-[#17212B] uppercase tracking-wider text-[11px] font-heading">
                Appraisal & Trade-in Stage
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Workflow Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs font-medium text-[#17212B] focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="Submitted">Submitted (Awaiting Review)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Inspection Required">Inspection Required</option>
                    <option value="Offer Made">Offer Made</option>
                    <option value="Accepted">Accepted by Customer</option>
                    <option value="Purchase Completed">Purchase Completed (Acquired into Inventory)</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Shop Offered Price (INR)</label>
                  <input
                    type="number"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    placeholder="e.g. 32000"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Final Agreed Price & Acquisition Note (Visible when Purchase Completed) */}
              {newStatus === 'Purchase Completed' && (
                <div className="p-3 bg-[#237A4B]/10 border border-[#237A4B]/20 rounded space-y-2">
                  <div className="flex items-center gap-2 text-[#237A4B] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Final Purchase & Add to Used Inventory</span>
                  </div>
                  <div>
                    <label className="block font-medium text-[#17212B] mb-1">
                      Final Agreed Purchase Outflow Amount (INR) *
                    </label>
                    <input
                      type="number"
                      value={finalAgreedPrice}
                      onChange={(e) => setFinalAgreedPrice(e.target.value)}
                      placeholder="e.g. 34000"
                      className="w-full bg-white border border-[#237A4B]/40 rounded px-3 py-2 font-bold text-[#17212B] focus:outline-none"
                      required
                    />
                    <span className="text-[10px] text-[#237A4B] mt-0.5 block">
                      This will record a Purchase Transaction and automatically stock this device into Second-Hand Phone Inventory.
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-medium text-[#17212B] mb-1">Inspection & Appraisal Notes</label>
                <textarea
                  rows={2}
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="Record counter inspection results, battery verification, IMEI confirmation..."
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 py-2 px-3 rounded border border-[#E2E5E8] text-[#17212B] hover:bg-[#F5F5F2] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold transition shadow-xs"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
