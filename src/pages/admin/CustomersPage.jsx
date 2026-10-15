import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';

export default function CustomersPage() {
  const { orders, sellRequests } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  // Deduplicate and aggregate customers from orders and sell requests
  const customerMap = {};

  orders.forEach((o) => {
    const key = o.customer?.phone || o.customer?.fullName;
    if (!key) return;
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customer.fullName,
        phone: o.customer.phone,
        email: o.customer.email,
        city: o.customer.city || 'Mumbai',
        state: o.customer.state || 'Maharashtra',
        ordersCount: 0,
        totalSpent: 0,
        sellRequestsCount: 0,
      };
    }
    customerMap[key].ordersCount += 1;
    customerMap[key].totalSpent += (o.totalAmount || 0);
  });

  sellRequests.forEach((r) => {
    const key = r.customerPhone || r.customerName;
    if (!key) return;
    if (!customerMap[key]) {
      customerMap[key] = {
        name: r.customerName,
        phone: r.customerPhone,
        email: r.customerEmail,
        city: 'Mumbai',
        state: 'Maharashtra',
        ordersCount: 0,
        totalSpent: 0,
        sellRequestsCount: 0,
      };
    }
    customerMap[key].sellRequestsCount += 1;
  });

  const customerList = Object.values(customerMap);

  const filtered = customerList.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Customer Directory & Accounts
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Registered customer accounts, repeat buyers, and trade-in sellers.
          </p>
        </div>

        <div className="bg-white px-3.5 py-2 rounded-lg border border-[#E2E5E8] text-xs font-semibold text-[#17212B] shadow-xs">
          Total Customers: {customerList.length}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs max-w-md">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name, phone or city..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Mobile Number</th>
                <th className="py-3 px-4">City / Region</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Trade-in Requests</th>
                <th className="py-3 px-4">Total Purchases (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((c, i) => (
                <tr key={i} className="hover:bg-[#F5F5F2]/60 transition">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#17212B] block">{c.name}</span>
                    {c.email && <span className="text-[11px] text-[#69727C]">{c.email}</span>}
                  </td>

                  <td className="py-3 px-4 font-mono text-[#20252B]">
                    {c.phone}
                  </td>

                  <td className="py-3 px-4 text-[#69727C]">
                    {c.city}, {c.state}
                  </td>

                  <td className="py-3 px-4 font-semibold text-[#17212B]">
                    {c.ordersCount}
                  </td>

                  <td className="py-3 px-4 font-semibold text-[#E85D2A]">
                    {c.sellRequestsCount}
                  </td>

                  <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                    {formatINR(c.totalSpent)}
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
