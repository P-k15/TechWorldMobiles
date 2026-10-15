import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, ShoppingCart, RefreshCw, 
  Inbox, TrendingUp, Package, ArrowRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, XAxis, YAxis, 
  Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { useAdmin } from '../../context/AdminContext';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';
import { OrderStatusBadge, RequestStatusBadge } from '../../components/common/Badge';

export default function AdminDashboardPage() {
  const { 
    newProducts, usedProducts, orders, sellRequests, 
    salesTransactions, purchaseTransactions 
  } = useAdmin();

  // Calculate Metrics from transactions
  const totalSalesRevenue = salesTransactions.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
  const totalPhonesSold = salesTransactions.reduce((acc, t) => acc + (t.quantity || 1), 0);
  const totalUsedPurchased = purchaseTransactions.length;
  
  const totalStockCount = 
    newProducts.reduce((acc, p) => acc + (p.stock || 0), 0) +
    usedProducts.reduce((acc, p) => acc + (p.stock || 0), 0);

  const pendingOrders = orders.filter((o) => o.fulfilmentStatus === 'Confirmed' || o.fulfilmentStatus === 'Shipped').length;
  const pendingSellRequests = sellRequests.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length;

  // Monthly Revenue Trend Data for Recharts
  const monthlyRevenueData = [
    {
      month: 'August 2026',
      salesRevenue: 223397,
      purchaseExpenditure: 102000,
      newUnits: 4,
      usedUnits: 1,
    },
    {
      month: 'September 2026',
      salesRevenue: 238398,
      purchaseExpenditure: 76000,
      newUnits: 3,
      usedUnits: 2,
    },
    {
      month: 'October 2026 (MTD)',
      salesRevenue: 297299,
      purchaseExpenditure: 43500,
      newUnits: 3,
      usedUnits: 2,
    },
  ];

  // Category breakdown for Pie Chart
  const categoryData = [
    { name: 'Brand New Phones', value: 10, color: '#17212B' },
    { name: 'Pre-Owned Phones', value: 5, color: '#E85D2A' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Store Performance Overview
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Real-time retail snapshot for TechWorldMobiles Bandra Store. Baseline spans Aug – Oct 2026.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/admin/reports"
            className="bg-[#17212B] hover:bg-[#20252B] text-white font-semibold px-3.5 py-2 rounded transition flex items-center gap-1.5"
          >
            <span>View Financial Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 KEY PERFORMANCE INDICATOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* KPI 1: Total Sales Revenue */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="w-7 h-7 rounded bg-[#237A4B]/10 text-[#237A4B] flex items-center justify-center font-bold text-xs">
              ₹
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {formatINR(totalSalesRevenue)}
            </span>
            <span className="text-[10px] text-[#237A4B] font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs last period</span>
            </span>
          </div>
        </div>

        {/* KPI 2: Phones Sold */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Phones Sold</span>
            <div className="w-7 h-7 rounded bg-[#17212B]/5 text-[#17212B] flex items-center justify-center">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {totalPhonesSold} Units
            </span>
            <span className="text-[10px] text-[#69727C] mt-1 block">
              10 New • 5 Pre-Owned
            </span>
          </div>
        </div>

        {/* KPI 3: Used Phones Purchased */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Purchased Used</span>
            <div className="w-7 h-7 rounded bg-[#E85D2A]/10 text-[#E85D2A] flex items-center justify-center">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {totalUsedPurchased} Units
            </span>
            <span className="text-[10px] text-[#69727C] mt-1 block">
              Customer trade-ins
            </span>
          </div>
        </div>

        {/* KPI 4: Current Inventory */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Available Stock</span>
            <div className="w-7 h-7 rounded bg-[#17212B]/5 text-[#17212B] flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {totalStockCount} Units
            </span>
            <span className="text-[10px] text-[#69727C] mt-1 block">
              {newProducts.reduce((acc, p) => acc + (p.stock || 0), 0)} New • {usedProducts.reduce((acc, p) => acc + (p.stock || 0), 0)} Used
            </span>
          </div>
        </div>

        {/* KPI 5: Pending Orders */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Pending Orders</span>
            <div className="w-7 h-7 rounded bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {pendingOrders} Orders
            </span>
            <span className="text-[10px] text-amber-700 font-medium mt-1 block">
              Awaiting dispatch / delivery
            </span>
          </div>
        </div>

        {/* KPI 6: Pending Sell Requests */}
        <div className="bg-white rounded-lg p-4 border border-[#E2E5E8] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#69727C] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sell Requests</span>
            <div className="w-7 h-7 rounded bg-[#E85D2A]/10 text-[#E85D2A] flex items-center justify-center border border-[#E85D2A]/20">
              <Inbox className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#17212B] font-heading block">
              {pendingSellRequests} Inquiries
            </span>
            <span className="text-[10px] text-[#E85D2A] font-medium mt-1 block">
              Needs inspection review
            </span>
          </div>
        </div>
      </div>

      {/* CHARTS ROW: Monthly Sales vs Purchase Expenditure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Revenue Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
            <div>
              <h2 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
                Monthly Sales Revenue vs Used Phone Purchase Outflow
              </h2>
              <p className="text-[11px] text-[#69727C]">
                Tracking completed cash inflows and device acquisition costs (INR)
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#69727C' }} />
                <YAxis tickFormatter={(val) => `₹${val / 1000}k`} tick={{ fontSize: 11, fill: '#69727C' }} />
                <Tooltip
                  formatter={(val) => [formatINR(val)]}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E5E8', borderRadius: '4px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: '10px' }} />
                <Bar dataKey="salesRevenue" name="Sales Revenue (INR)" fill="#17212B" radius={[3, 3, 0, 0]} />
                <Bar dataKey="purchaseExpenditure" name="Used Purchases Expenditure (INR)" fill="#E85D2A" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share & Brand Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="border-b border-[#E2E5E8] pb-3">
            <h2 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Sales Volume Mix
            </h2>
            <p className="text-[11px] text-[#69727C]">New vs Pre-Owned smartphone units</p>
          </div>

          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E5E8', borderRadius: '4px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#E2E5E8] text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#17212B]" />
                <span className="text-[#20252B] font-medium">Brand New Phones</span>
              </span>
              <strong className="text-[#17212B] font-heading">10 units (66.7%)</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E85D2A]" />
                <span className="text-[#20252B] font-medium">Pre-Owned Phones</span>
              </span>
              <strong className="text-[#17212B] font-heading">5 units (33.3%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Customer Orders */}
        <div className="bg-white rounded-lg p-5 border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
            <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Recent Store Orders
            </h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-[#E85D2A] hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="divide-y divide-[#E2E5E8] overflow-x-auto">
            {orders.slice(0, 4).map((ord) => (
              <div key={ord.id} className="py-2.5 flex items-center justify-between text-xs min-w-[300px]">
                <div>
                  <span className="font-semibold text-[#17212B] block">{ord.id}</span>
                  <span className="text-[#69727C] text-[11px]">
                    {ord.customer?.fullName} • {formatDate(ord.orderDate)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#17212B] block font-heading">{formatINR(ord.totalAmount)}</span>
                  <OrderStatusBadge status={ord.fulfilmentStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Used Phone Customer Sell Requests */}
        <div className="bg-white rounded-lg p-5 border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
            <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Customer Trade-In Submissions
            </h3>
            <Link to="/admin/sell-requests" className="text-xs font-semibold text-[#E85D2A] hover:underline">
              Manage Submissions →
            </Link>
          </div>

          <div className="divide-y divide-[#E2E5E8] overflow-x-auto">
            {sellRequests.slice(0, 4).map((req) => (
              <div key={req.id} className="py-2.5 flex items-center justify-between text-xs min-w-[300px]">
                <div>
                  <span className="font-semibold text-[#17212B] block">
                    {req.brand} {req.model} ({req.storage || '128GB'})
                  </span>
                  <span className="text-[#69727C] text-[11px]">
                    {req.customerName} • Estimate: {formatINR(req.expectedPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <RequestStatusBadge status={req.status} />
                  <span className="block text-[10px] text-[#69727C] mt-0.5">
                    {formatDate(req.submissionDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
