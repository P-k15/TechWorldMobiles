import React, { useState, useMemo } from 'react';
import { 
  Download, Printer, RotateCcw, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell 
} from 'recharts';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { ReportService } from '../../services/reportService';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

export default function MonthlyReportsPage() {
  const { 
    salesTransactions, purchaseTransactions, 
    newProducts, usedProducts 
  } = useAdmin();
  const { addToast } = useStore();

  // Filter Controls
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('all'); // 'all', '8' (Aug), '9' (Sep), '10' (Oct)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCustomRange, setIsCustomRange] = useState(false);

  // Snapshot generation timestamp
  const [reportGeneratedAt] = useState('15/10/2026, 05:30:00 PM');

  // Total current inventory count snapshot
  const currentInventoryCount = 
    newProducts.reduce((acc, p) => acc + (p.stock || 0), 0) +
    usedProducts.reduce((acc, p) => acc + (p.stock || 0), 0);

  // Filtered Transactions
  const { filteredSales, filteredPurchases, periodLabel } = useMemo(() => {
    let sList = salesTransactions;
    let pList = purchaseTransactions;
    let label = 'Full Historical Record (Aug – Oct 2026)';

    if (isCustomRange && (startDate || endDate)) {
      sList = ReportService.filterByDateRange(salesTransactions, startDate, endDate);
      pList = ReportService.filterByDateRange(purchaseTransactions, startDate, endDate);
      label = `Custom Range: ${startDate || 'Start'} to ${endDate || 'Current'}`;
    } else {
      if (selectedMonth !== 'all') {
        sList = ReportService.filterByMonth(salesTransactions, selectedYear, selectedMonth);
        pList = ReportService.filterByMonth(purchaseTransactions, selectedYear, selectedMonth);
        const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'August', 'September', 'October', 'Nov', 'Dec'];
        label = `${monthNames[Number(selectedMonth)]} ${selectedYear}`;
      } else {
        sList = ReportService.filterByMonth(salesTransactions, selectedYear, 'all');
        pList = ReportService.filterByMonth(purchaseTransactions, selectedYear, 'all');
        label = `All Months ${selectedYear}`;
      }
    }

    return { filteredSales: sList, filteredPurchases: pList, periodLabel: label };
  }, [salesTransactions, purchaseTransactions, selectedYear, selectedMonth, startDate, endDate, isCustomRange]);

  // Summary Metrics calculated via strict accounting rules
  const metrics = useMemo(() => {
    return ReportService.calculateMetrics(filteredSales, filteredPurchases, currentInventoryCount);
  }, [filteredSales, filteredPurchases, currentInventoryCount]);

  // Daily Trend Data
  const dailyData = useMemo(() => {
    return ReportService.getDailySalesTrend(filteredSales, selectedYear, selectedMonth);
  }, [filteredSales, selectedYear, selectedMonth]);

  // Brand Performance
  const brandPerformance = useMemo(() => {
    return ReportService.getBrandPerformance(filteredSales, filteredPurchases);
  }, [filteredSales, filteredPurchases]);

  // Category Pie Data
  const categoryData = [
    { name: 'Brand New', value: metrics.newPhonesSold, color: '#17212B' },
    { name: 'Pre-Owned', value: metrics.usedPhonesSold, color: '#E85D2A' },
  ];

  // CSV Export Action
  const handleExportCSV = () => {
    ReportService.exportToCSV(metrics, filteredSales, filteredPurchases, periodLabel);
    addToast(`Exported "${periodLabel}" report as CSV`, 'success');
  };

  // Browser Print Action
  const handlePrint = () => {
    window.print();
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('all');
    setStartDate('');
    setEndDate('');
    setIsCustomRange(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E85D2A]">
            Financial Audit & Analytics
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading mt-0.5">
            Monthly Sales & Purchase Reports
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Reconciles completed consumer smartphone sales, specific COGS, and customer buybacks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-[#F5F5F2] border border-[#E2E5E8] text-[#17212B] font-semibold px-3 py-2 rounded text-xs shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-[#17212B] hover:bg-[#20252B] text-white font-semibold px-3.5 py-2 rounded text-xs transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS BAR (No Print) */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E5E8] shadow-xs space-y-3.5 no-print">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Preset Month / Year Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#69727C] uppercase tracking-wider mb-1">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setIsCustomRange(false);
                }}
                className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs font-medium text-[#17212B] focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              >
                <option value="all">Full Period (Aug - Oct 2026)</option>
                <option value="8">August 2026</option>
                <option value="9">September 2026</option>
                <option value="10">October 2026 (Month to Date)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#69727C] uppercase tracking-wider mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setIsCustomRange(false);
                }}
                className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs font-medium text-[#17212B] focus:bg-white focus:border-[#E85D2A] focus:outline-none"
              >
                <option value="2026">2026 (Fiscal Year)</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setIsCustomRange(!isCustomRange)}
                className={`text-xs font-medium px-3 py-1.5 rounded border transition ${
                  isCustomRange
                    ? 'border-[#E85D2A] bg-[#E85D2A]/10 text-[#E85D2A] font-semibold'
                    : 'border-[#E2E5E8] text-[#69727C] hover:bg-[#F5F5F2]'
                }`}
              >
                Custom Date Range
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center justify-end">
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-[#69727C] hover:text-[#17212B] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Custom Date Range Inputs */}
        {isCustomRange && (
          <div className="pt-2.5 border-t border-[#E2E5E8] flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#69727C] font-medium">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1 text-xs text-[#17212B]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#69727C] font-medium">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1 text-xs text-[#17212B]"
              />
            </div>
            <span className="text-[11px] text-[#69727C]">
              * Filters transactions by transactionDate
            </span>
          </div>
        )}
      </div>

      {/* PRINT HEADER ONLY VISIBLE DURING PRINT */}
      <div className="hidden print:block border-b-2 border-[#17212B] pb-4 mb-6">
        <h1 className="text-xl font-bold font-heading">TECHWORLDMOBILES RETAIL STORE — AUDIT & PERFORMANCE REPORT</h1>
        <p className="text-xs font-semibold text-[#17212B] mt-1">Reporting Period: {periodLabel}</p>
        <p className="text-[11px] text-[#69727C]">Document Timestamp: {reportGeneratedAt}</p>
      </div>

      {/* 8 SUMMARY FINANCIAL KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
        {/* Card 1: Completed Sales Revenue */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Completed Sales Revenue
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#17212B] font-heading mt-1 block">
            {formatINR(metrics.totalSalesRevenue)}
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            From {metrics.totalPhonesSold} completed sales
          </span>
        </div>

        {/* Card 2: Cost of Goods Sold (COGS) */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Cost of Goods Sold (COGS)
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#69727C] font-heading mt-1 block">
            {formatINR(metrics.totalCogs)}
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            Procurement cost of sold units
          </span>
        </div>

        {/* Card 3: Estimated Gross Profit */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#237A4B]/20 bg-[#237A4B]/5 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#237A4B] block">
            Estimated Gross Profit
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#237A4B] font-heading mt-1 block">
            {metrics.estimatedGrossProfit !== null ? formatINR(metrics.estimatedGrossProfit) : 'Incomplete'}
          </span>
          <span className="text-[10px] text-[#237A4B] font-medium mt-0.5 block">
            {metrics.grossMarginPercent ? `${metrics.grossMarginPercent}% Gross Margin` : 'COGS Accounted'}
          </span>
        </div>

        {/* Card 4: Used Phone Purchase Outflow */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Used Purchase Outflow
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#E85D2A] font-heading mt-1 block">
            {formatINR(metrics.totalPurchaseExpenditure)}
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            {metrics.usedPhonesPurchased} customer buybacks
          </span>
        </div>

        {/* Card 5: New Phones Sold */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            New Phones Sold
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#17212B] font-heading mt-1 block">
            {metrics.newPhonesSold} Units
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            Sealed retail inventory
          </span>
        </div>

        {/* Card 6: Used Phones Sold */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Used Phones Sold
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#17212B] font-heading mt-1 block">
            {metrics.usedPhonesSold} Units
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            Certified pre-owned inventory
          </span>
        </div>

        {/* Card 7: Total Units Sold */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Total Handsets Sold
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#17212B] font-heading mt-1 block">
            {metrics.totalPhonesSold} Units
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            Combined retail turnover
          </span>
        </div>

        {/* Card 8: Closing Inventory Snapshot */}
        <div className="bg-white rounded-lg p-3.5 sm:p-4 border border-[#E2E5E8] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#69727C] block">
            Active Inventory Snapshot
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#17212B] font-heading mt-1 block">
            {metrics.closingInventory} Units
          </span>
          <span className="text-[10px] text-[#69727C] mt-0.5 block">
            Available on store shelves
          </span>
        </div>
      </div>

      {/* ACCOUNTING RULES EXPLANATION BANNER */}
      <div className="bg-[#17212B] text-white rounded-lg p-4 text-xs space-y-1.5 border border-[#20252B]">
        <div className="flex items-center gap-2 font-semibold text-[#E85D2A]">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#237A4B]" />
          <span>Strict Accounting Rules Applied in This Report</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          1. <strong>Gross Profit</strong> is calculated as Completed Sales Revenue minus the specific Cost of Goods Sold (COGS) of the units sold: <em>(₹{metrics.totalSalesRevenue} - ₹{metrics.totalCogs} = ₹{metrics.estimatedGrossProfit || 0})</em>.
          <br />
          2. Used Phone Purchase Expenditure (₹{metrics.totalPurchaseExpenditure}) represents cash outflow for acquiring inventory assets and is strictly maintained separate from sales COGS.
          <br />
          3. Cancelled orders and pending unfulfilled orders are excluded from revenue totals.
        </p>
      </div>

      {/* CHARTS: Daily Sales Trend & Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 no-print">
        {/* Daily Sales Trend (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="border-b border-[#E2E5E8] pb-3">
            <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Daily Sales Trend ({periodLabel})
            </h3>
            <p className="text-[11px] text-[#69727C]">Daily revenue realized in selected period</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#69727C' }} />
                <YAxis tickFormatter={(val) => `₹${val / 1000}k`} tick={{ fontSize: 10, fill: '#69727C' }} />
                <Tooltip
                  formatter={(val) => [formatINR(val)]}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E5E8', borderRadius: '4px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="totalRevenue" name="Revenue (INR)" stroke="#17212B" fill="#17212B" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#E2E5E8] shadow-xs space-y-3">
          <div className="border-b border-[#E2E5E8] pb-3">
            <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Sales Mix by Category
            </h3>
            <p className="text-[11px] text-[#69727C]">New vs Second-Hand handsets sold</p>
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
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 font-medium text-[#20252B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#17212B]" />
                <span>New Phones:</span>
              </span>
              <strong className="text-[#17212B] font-heading">{metrics.newPhonesSold} units</strong>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 font-medium text-[#20252B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E85D2A]" />
                <span>Pre-Owned:</span>
              </span>
              <strong className="text-[#17212B] font-heading">{metrics.usedPhonesSold} units</strong>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND PERFORMANCE SUMMARY */}
      <div className="bg-white rounded-lg p-5 border border-[#E2E5E8] shadow-xs space-y-3">
        <div className="border-b border-[#E2E5E8] pb-3">
          <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
            Brand Performance Matrix ({periodLabel})
          </h3>
          <p className="text-[11px] text-[#69727C]">Volume, completed revenue, and customer buyback expenditure by manufacturer</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase font-semibold text-[11px]">
                <th className="py-2.5 px-4">Brand</th>
                <th className="py-2.5 px-4">Units Sold</th>
                <th className="py-2.5 px-4">Completed Sales Revenue</th>
                <th className="py-2.5 px-4">Used Purchase Outflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {brandPerformance.map((bp) => (
                <tr key={bp.brand} className="hover:bg-[#F5F5F2]/60">
                  <td className="py-2.5 px-4 font-semibold text-[#17212B]">{bp.brand}</td>
                  <td className="py-2.5 px-4 text-[#20252B]">{bp.unitsSold}</td>
                  <td className="py-2.5 px-4 font-bold text-[#17212B] font-heading">{formatINR(bp.salesRevenue)}</td>
                  <td className="py-2.5 px-4 font-medium text-[#69727C]">{formatINR(bp.purchaseExpenditure)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FILTERED TRANSACTION AUDIT TRAIL */}
      <div className="bg-white rounded-lg p-5 border border-[#E2E5E8] shadow-xs space-y-3">
        <div className="border-b border-[#E2E5E8] pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider font-heading">
              Underlying Transactions Audit Trail ({filteredSales.length + filteredPurchases.length} Records)
            </h3>
            <p className="text-[11px] text-[#69727C]">All completed events reconciling with above metric totals</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase font-semibold text-[11px]">
                <th className="py-2.5 px-4">Txn ID</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Smartphone</th>
                <th className="py-2.5 px-4">Qty</th>
                <th className="py-2.5 px-4">Amount (INR)</th>
                <th className="py-2.5 px-4">COGS (if Sale)</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-[#F5F5F2]/60">
                  <td className="py-2.5 px-4 font-mono font-bold text-[#E85D2A]">{s.id}</td>
                  <td className="py-2.5 px-4 text-[#69727C]">{formatDate(s.transactionDate)}</td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-[#17212B] bg-[#F5F5F2] px-2 py-0.5 rounded border border-[#E2E5E8]">
                      Sale ({s.category})
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-[#17212B]">{s.productName}</td>
                  <td className="py-2.5 px-4 text-[#20252B]">{s.quantity || 1}</td>
                  <td className="py-2.5 px-4 font-bold text-[#17212B] font-heading">{formatINR(s.totalAmount)}</td>
                  <td className="py-2.5 px-4 font-medium text-[#69727C]">{formatINR(s.costPrice)}</td>
                  <td className="py-2.5 px-4 font-semibold text-[#237A4B]">Completed</td>
                </tr>
              ))}

              {filteredPurchases.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F5F2]/60">
                  <td className="py-2.5 px-4 font-mono font-bold text-[#17212B]">{p.id}</td>
                  <td className="py-2.5 px-4 text-[#69727C]">{formatDate(p.transactionDate)}</td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-[#E85D2A] bg-[#E85D2A]/10 px-2 py-0.5 rounded border border-[#E85D2A]/20">
                      Used Buyback
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-[#17212B]">{p.productName}</td>
                  <td className="py-2.5 px-4 text-[#20252B]">{p.quantity || 1}</td>
                  <td className="py-2.5 px-4 font-bold text-[#17212B] font-heading">{formatINR(p.totalAmount)}</td>
                  <td className="py-2.5 px-4 text-[#69727C]">— (Outflow)</td>
                  <td className="py-2.5 px-4 font-semibold text-[#237A4B]">Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
