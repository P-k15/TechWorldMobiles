import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

export default function SalesTransactionsPage() {
  const { salesTransactions } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const completedSales = salesTransactions.filter((s) => s.status === 'Completed');
  const totalRevenue = completedSales.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
  const totalCogs = completedSales.reduce((acc, s) => acc + (s.costPrice || 0), 0);
  const totalGrossProfit = totalRevenue - totalCogs;

  const filtered = completedSales.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.customerName && s.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.orderId && s.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* Title & Metric Highlights */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Completed Sales Transactions
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Reconciled accounting ledger of fulfilled consumer smartphone sales and realized gross profit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-white px-3.5 py-2 rounded-lg border border-[#E2E5E8] shadow-xs text-xs">
            <span className="text-[#69727C] font-semibold uppercase tracking-wider block text-[10px]">Total Sales Revenue</span>
            <span className="text-sm font-extrabold text-[#17212B] font-heading">{formatINR(totalRevenue)}</span>
          </div>
          <div className="bg-white px-3.5 py-2 rounded-lg border border-[#E2E5E8] shadow-xs text-xs">
            <span className="text-[#69727C] font-semibold uppercase tracking-wider block text-[10px]">Realized Gross Profit</span>
            <span className="text-sm font-extrabold text-[#237A4B] font-heading">{formatINR(totalGrossProfit)}</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Txn ID, order, phone, customer..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Categories ({completedSales.length})</option>
            <option value="new">Brand New Phones</option>
            <option value="used">Pre-Owned Phones</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Smartphone Sold</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Selling Price (INR)</th>
                <th className="py-3 px-4">COGS (Unit Cost)</th>
                <th className="py-3 px-4">Unit Gross Margin</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((st) => {
                const profit = st.totalAmount - (st.costPrice || 0);
                const marginPercent = Math.round((profit / st.totalAmount) * 100);

                return (
                  <tr key={st.id} className="hover:bg-[#F5F5F2]/60 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#E85D2A]">
                      {st.id}
                    </td>

                    <td className="py-3 px-4 text-[#69727C]">
                      {formatDate(st.transactionDate)}
                    </td>

                    <td className="py-3 px-4">
                      {st.category === 'used' ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          Pre-Owned
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17212B]/5 text-[#17212B] border border-[#17212B]/10">
                          Brand New
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#17212B] block">{st.productName}</span>
                      <span className="text-[11px] text-[#69727C]">{st.brand}</span>
                    </td>

                    <td className="py-3 px-4 font-medium text-[#20252B]">
                      {st.customerName}
                    </td>

                    <td className="py-3 px-4 font-mono text-[#69727C]">
                      {st.orderId}
                    </td>

                    <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                      {formatINR(st.totalAmount)}
                    </td>

                    <td className="py-3 px-4 font-medium text-[#69727C]">
                      {formatINR(st.costPrice)}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[#237A4B] font-semibold bg-[#237A4B]/10 px-1.5 py-0.5 rounded text-[11px]">
                        +{formatINR(profit)} ({marginPercent}%)
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[#237A4B] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Reconciled</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
