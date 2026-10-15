import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { AdminProvider } from './context/AdminContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import QuickViewModal from './components/common/QuickViewModal';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import NewPhonesPage from './pages/customer/NewPhonesPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import UsedPhonesPage from './pages/customer/UsedPhonesPage';
import UsedProductDetailPage from './pages/customer/UsedProductDetailPage';
import SellPhonePage from './pages/customer/SellPhonePage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderSuccessPage from './pages/customer/OrderSuccessPage';
import WishlistPage from './pages/customer/WishlistPage';
import AboutPage from './pages/customer/AboutPage';
import ContactPage from './pages/customer/ContactPage';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import NewInventoryPage from './pages/admin/NewInventoryPage';
import UsedInventoryPage from './pages/admin/UsedInventoryPage';
import OrdersPage from './pages/admin/OrdersPage';
import SellRequestsPage from './pages/admin/SellRequestsPage';
import PurchaseRecordsPage from './pages/admin/PurchaseRecordsPage';
import SalesTransactionsPage from './pages/admin/SalesTransactionsPage';
import MonthlyReportsPage from './pages/admin/MonthlyReportsPage';
import CustomersPage from './pages/admin/CustomersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Customer Site Wrapper Layout
function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <GlobalSearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            {/* Customer Storefront Routes */}
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<HomePage />} />
              <Route path="phones" element={<NewPhonesPage />} />
              <Route path="phones/:id" element={<ProductDetailPage />} />
              <Route path="second-hand" element={<UsedPhonesPage />} />
              <Route path="second-hand/:id" element={<UsedProductDetailPage />} />
              <Route path="sell" element={<SellPhonePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Merchant / Admin ERP Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="new-inventory" element={<NewInventoryPage />} />
              <Route path="used-inventory" element={<UsedInventoryPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="sell-requests" element={<SellRequestsPage />} />
              <Route path="purchases" element={<PurchaseRecordsPage />} />
              <Route path="sales-transactions" element={<SalesTransactionsPage />} />
              <Route path="reports" element={<MonthlyReportsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<CustomerLayout />}>
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AdminProvider>
  );
}
