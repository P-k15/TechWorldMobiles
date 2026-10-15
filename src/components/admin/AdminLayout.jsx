import React, { useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Smartphone, RefreshCw, ShoppingCart, 
  Inbox, FileSpreadsheet, History, BarChart3, Users, 
  Settings, ArrowLeft, Menu, X, RotateCcw, AlertTriangle 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const { resetDemoData, sellRequests, orders } = useAdmin();
  const { addToast } = useStore();
  const location = useLocation();

  const pendingRequestsCount = sellRequests.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length;
  const pendingOrdersCount = orders.filter((o) => o.fulfilmentStatus === 'Confirmed' || o.fulfilmentStatus === 'Shipped').length;

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
    addToast('Demo database successfully restored to original seed state!', 'success');
  };

  const menuItems = [
    { name: 'Store Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'New Inventory', path: '/admin/new-inventory', icon: Smartphone },
    { name: 'Used Inventory', path: '/admin/used-inventory', icon: RefreshCw },
    { name: 'Customer Orders', path: '/admin/orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { name: 'Sell Requests', path: '/admin/sell-requests', icon: Inbox, badge: pendingRequestsCount > 0 ? pendingRequestsCount : null },
    { name: 'Purchase Records', path: '/admin/purchases', icon: FileSpreadsheet },
    { name: 'Sales Transactions', path: '/admin/sales-transactions', icon: History },
    { name: 'Monthly Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Customer Ledger', path: '/admin/customers', icon: Users },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex flex-col lg:flex-row font-sans text-[#20252B]">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#17212B] text-white px-4 py-3 flex items-center justify-between no-print sticky top-0 z-40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white font-heading">TechWorldMobiles</span>
            <span className="text-[10px] font-semibold bg-[#E85D2A] px-1.5 py-0.5 rounded text-white uppercase">
              Admin
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Storefront</span>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#17212B] text-slate-300 flex flex-col justify-between transition-transform duration-200 transform lg:translate-x-0 lg:static no-print border-r border-[#20252B] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Admin Wordmark */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#E85D2A] flex items-center justify-center text-white font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight font-heading block">TechWorldMobiles</span>
                <span className="text-[10px] block font-medium text-slate-400 uppercase tracking-wider">
                  Retail ERP & POS
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DEMO ADMIN Store Indicator */}
          <div className="px-5 py-2.5 bg-black/25 border-b border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#237A4B]" />
              <span className="font-semibold text-slate-200 text-[11px]">Bandra West Counter</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Store #01</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-230px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    isActive
                      ? 'bg-[#E85D2A] text-white shadow-xs font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-white text-[#E85D2A]' : 'bg-[#E85D2A] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Reset Demo Data Button */}
          <button
            onClick={() => setResetModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white py-2 px-3 rounded text-xs font-medium transition border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>Reset Demo Baseline</span>
          </button>

          {/* Return to Customer Storefront */}
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white py-1.5 px-3 rounded text-xs font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Customer Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Admin Topbar */}
        <header className="bg-white border-b border-[#E2E5E8] px-6 py-3.5 flex items-center justify-between no-print sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#17212B] font-heading uppercase tracking-wider">
              Retail ERP Management System
            </span>
            <span className="hidden sm:inline-block text-[11px] bg-[#F5F5F2] text-[#69727C] px-2 py-0.5 rounded border border-[#E2E5E8] font-medium">
              INR (₹) Standard
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Quick stats in topbar */}
            <div className="hidden md:flex items-center gap-3 text-[#69727C]">
              <span>Active Orders: <strong className="text-[#17212B]">{orders.length}</strong></span>
              <span>•</span>
              <span>Sell Inquiries: <strong className="text-[#17212B]">{sellRequests.length}</strong></span>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E2E5E8]">
              <div className="w-7 h-7 rounded bg-[#17212B] text-white font-bold text-[11px] flex items-center justify-center">
                RV
              </div>
              <div className="hidden sm:block text-left">
                <span className="block font-bold text-[#17212B] text-xs leading-none">Rajesh Verma</span>
                <span className="text-[10px] text-[#69727C]">Store Proprietor</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Confirmation Modal for Resetting Demo Data */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#E2E5E8] space-y-4">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-[#17212B] font-heading">Reset Demo Store Data?</h3>
              <p className="text-xs text-[#69727C] mt-1.5 leading-relaxed">
                This will restore all smartphones, customer sell requests, orders, and sales records back to the original 3-month seed state (August – October 2026).
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="flex-1 py-2 px-3 rounded border border-[#E2E5E8] hover:bg-[#F5F5F2] text-xs font-semibold text-[#17212B] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2 px-3 rounded bg-[#E85D2A] hover:bg-[#d65120] text-white text-xs font-bold transition shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
