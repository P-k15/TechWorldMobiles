import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

export default function PurchaseRecordsPage() {
  const { purchaseTransactions } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  const totalSpent = purchaseTransactions.reduce((acc, t) => acc + (t.totalAmount || 0), 0);

  const filtered = purchaseTransactions.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sellerName && p.sellerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.sellRequestId && p.sellRequestId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBrand = brandFilter === 'all' || p.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Pre-Owned Phone Purchase Ledger
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Audit trail of second-hand smartphones acquired from customer appraisals with serial/ID tracking.
          </p>
        </div>

        <div className="bg-white px-3.5 py-2 rounded-lg border border-[#E2E5E8] shadow-xs flex items-center gap-3 text-xs">
          <span className="text-[#69727C] font-medium uppercase tracking-wider text-[11px]">Acquisition Outflow:</span>
          <span className="text-sm font-bold text-[#17212B] font-heading">{formatINR(totalSpent)}</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Txn ID, model, seller name..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Brand:</span>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Brands ({purchaseTransactions.length})</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Smartphone Acquired</th>
                <th className="py-3 px-4">Seller / Customer</th>
                <th className="py-3 px-4">Sell Request Ref</th>
                <th className="py-3 px-4">Purchase Price (Outflow)</th>
                <th className="py-3 px-4">Disbursement Method</th>
                <th className="py-3 px-4">Diagnostic Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((pt) => (
                <tr key={pt.id} className="hover:bg-[#F5F5F2]/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#E85D2A]">
                    {pt.id}
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {formatDate(pt.transactionDate)}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#17212B] block">{pt.productName}</span>
                    <span className="text-[11px] text-[#69727C]">{pt.brand}</span>
                  </td>

                  <td className="py-3 px-4 font-medium text-[#20252B]">
                    {pt.sellerName}
                  </td>

                  <td className="py-3 px-4 font-mono text-[#69727C]">
                    {pt.sellRequestId || 'Counter Direct'}
                  </td>

                  <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                    {formatINR(pt.totalAmount)}
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {pt.paymentMethod}
                  </td>

                  <td className="py-3 px-4 text-[#69727C] max-w-xs truncate" title={pt.notes}>
                    {pt.notes || 'Counter check passed.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
