# TechWorldMobiles — Premium Mobile E-Commerce & Second-Hand Phone Marketplace

> **"Your Next Phone. Your Best Deal."**  
> A high-fidelity, interactive, responsive static prototype designed for presentation to mobile retail shop owners.

---

## 📱 Executive Overview

**TechWorldMobiles** demonstrates how an Indian brick-and-mortar smartphone retail business can operate a unified commercial e-commerce platform and second-hand phone marketplace. 

The application delivers a dual-experience architecture:
1. **Customer-Facing Storefront**: Online shopping for brand new smartphones, an inspected pre-owned device marketplace, and an interactive 6-step trade-in wizard for selling used phones.
2. **Merchant Administration ERP (`/admin`)**: A comprehensive management dashboard featuring real-time KPI metrics, Recharts visual analytics, dual inventory management (New vs Pre-Owned), customer buyback pipeline management, order fulfilment tracking, and financial monthly accounting reports with real CSV export and print layouts.

All functionality operates locally in the browser with **localStorage client-side persistence** and zero external database dependencies.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React.js 19 with Vite 8
* **Styling**: Tailwind CSS v4 (Mobile-first, responsive, accessible contrast)
* **Routing**: React Router 7 (`react-router-dom`)
* **Icons**: Lucide React
* **Data Visualizations**: Recharts
* **State Management**: React Context (`StoreContext` + `AdminContext`)
* **Persistence Layer**: LocalStorage Service with safe fallbacks and seed data re-seeding

---

## 🎨 Visual Design System

* **Primary**: Deep Midnight Navy (`#101828`)
* **Secondary**: Electric Blue (`#2563EB`)
* **Accent**: Cyan (`#06B6D4`)
* **Background**: Soft Off-White (`#F8FAFC`)
* **Surface Cards**: Pure White (`#FFFFFF`)
* **Text Primary**: Dark Charcoal (`#111827`)
* **Text Secondary**: Slate Gray (`#64748B`)
* **Badges**: Emerald Green (Excellent/In Stock), Blue (Good), Amber (Fair/Pending), Rose (Out of Stock/Cancelled)
* **Typography**: Inter sans-serif typeface
* **Currency**: Indian Rupee (`₹` - INR format, e.g. `₹79,900`, `₹1,24,999`)

---

## 🚀 Getting Started Locally

### 1. Prerequisites
* **Node.js**: v18.0.0 or later (v20+ recommended)
* **npm**: v9.0.0 or later

### 2. Installation
Navigate to the project root directory:
```bash
cd C:\Users\Lenovo\.gemini\antigravity\scratch\mobix-store
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local Vite URL (typically `http://localhost:5173`).

### 4. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🌟 Key Features Implemented

### Part A: Customer Storefront
* **Global Navigation**: Announcement bar, TechWorldMobiles logo, dynamic links, instant global search trigger, wishlist counter, live shopping cart badge, and demo admin portal quick-switch.
* **Home Page**: Split-layout hero section with floating price tags, "Shop by Brand" category cards (Apple, Samsung, OnePlus, Xiaomi, Vivo, OPPO), Best-Selling phones grid, second-hand promo banner, "Why Choose TechWorldMobiles" 4-card value proposition, and featured pre-owned deals.
* **New Phones Listing (`/phones`)**: Product catalog with left filter sidebar (desktop) and slide-out filter drawer (mobile), brand selection, price bracket filters, RAM/storage filters, sorting options, and quick-add to cart.
* **Product Detail Page (`/phones/:id`)**: High-resolution gallery with thumbnail switcher, storage and color selectors, live stock indicator, quantity adjuster, Add to Cart, Buy Now, technical specifications table, and a simulated Indian PIN code delivery checker.
* **Global Search Modal**: Instant real-time autocomplete search across new phones, used phones, brands, and price tiers.
* **Quick View Modal**: Instant overlay on product cards allowing customers to inspect specs and add variants to cart without navigating away.

### Part B: Second-Hand Marketplace
* **Pre-Owned Listing (`/second-hand`)**: Distinctive marketplace visual treatment, condition grade badges (*Excellent*, *Good*, *Fair*), battery health indicators (*87%*, *91%*), 42-point test tags, and clear price-vs-MRP savings.
* **Used Phone Details (`/second-hand/:id`)**: Comprehensive diagnostic report, transparent cosmetic defect disclosures, original invoice availability, retail box status, included accessories checklist, and store warranty duration.

### Part C: "Sell Your Phone" 6-Step Trade-in Wizard (`/sell`)
* **Step 1**: Brand, Model, Storage, RAM, Color, Purchase Year.
* **Step 2**: Physical condition grading, battery health, screen state, functional test status, defect disclosures, invoice/box availability.
* **Step 3**: Expected price in INR with guidance pricing.
* **Step 4**: Photo upload with local browser `URL.createObjectURL` previews and removal capability.
* **Step 5**: Customer name, verified 10-digit Indian phone number, email, and preferred contact channel.
* **Step 6**: Comprehensive confirmation review with instant submission disclaimer.
* **Instant Submission Feedback**: Generates a unique Reference ID (e.g., `REQ-2026-009`), logs the request directly into the Admin Buyback Pipeline, and updates the status to *"Submitted — Awaiting Review"*.

### Part D: Shopping Cart & Checkout
* **Cart Page (`/cart`)**: Variant key uniqueness preventing accidental duplicates, quantity steppers, free delivery calculations above ₹1,000, and price breakdowns.
* **Checkout Page (`/checkout`)**: Multi-step checkout with form validation (Indian phone numbers, 6-digit PIN codes), selectable demo payment methods (*Cash on Delivery*, *UPI Demo*, *Online Card Demo*), and order placement.
* **Order Confirmation (`/order-success/:orderId`)**: Displays generated Order ID, delivery address, purchased items, and a direct link to track the order in the Admin Dashboard.
* **Stock Decrement Integration**: Placing an order automatically deducts available inventory units across the catalog. When stock hits 0, it dynamically marks the product as *Out of Stock*.

### Part E: Shop Owner Administration Dashboard (`/admin`)
* **ERP Layout**: Fixed sidebar with navigation badges, top bar with store profile and active INR status, and prominent `"DEMO ADMIN"` badge.
* **Overview Dashboard (`/admin`)**:
  * 6 Real-time KPI Cards: Total Sales Revenue, Handsets Sold, Used Phones Purchased, Current Stock Units, Pending Orders, and Pending Sell Requests.
  * Recharts visual analytics: Monthly sales revenue vs purchase expenditure trends, sales volume by category (New vs Used), and brand distribution.
  * Recent activity feed displaying latest orders and customer trade-in submissions.
* **Inventory Management**:
  * **New Phone Inventory (`/admin/new-inventory`)**: SKU management, procurement cost (COGS), selling price, manual stock increment/decrement, and Add/Edit/Delete modals.
  * **Used Phone Inventory (`/admin/used-inventory`)**: Pre-owned stock management with battery health, condition grading, purchase cost tracking, and estimated gross margin calculation.
* **Sell Requests Pipeline (`/admin/sell-requests`)**:
  * Full customer submissions table with filter tabs.
  * Review Modal: Inspect customer uploaded photos, specifications, and defect notes.
  * Workflow statuses: *Submitted*, *Under Review*, *Inspection Required*, *Offer Made*, *Accepted*, *Rejected*, *Purchase Completed*.
  * **Acquisition Automation**: Marking a request as *"Purchase Completed"* prompts for the final agreed price and purchase date, logs a completed Purchase Transaction, and automatically stocks the handset into the second-hand inventory for resale.
* **Order Management (`/admin/orders`)**:
  * Track orders, customer addresses, and line items.
  * Fulfilment statuses: *Confirmed*, *Shipped*, *Delivered*, *Cancelled*.
  * Distinct payment statuses: *Paid*, *Pending (COD)*, *Refunded*.
  * Strict accounting: Cancelled orders are excluded from completed sales revenue. Marking an order *Delivered* and *Paid* automatically records a completed sales transaction.
* **Purchase Records (`/admin/purchases`)**: Audit ledger of all second-hand handsets bought from customers.
* **Sales Transactions (`/admin/sales-transactions`)**: Audit ledger of fulfilled sales with realized gross profit per unit.
* **Customers Directory (`/admin/customers`)**: Aggregated directory of buyers and sellers with lifetime spend.

### Part F: Business Analytics & Monthly Reports (`/admin/reports`)
* **Report Controls**: Month selector (*August 2026*, *September 2026*, *October 2026*, or *Full Period*), Year selector, Custom Date Range filter, Apply/Reset buttons.
* **Accounting Principles Enforced**:
  * Only counts completed sales (excludes cancelled or unfulfilled orders).
  * Excludes pending orders from realized revenue.
  * Calculates **Estimated Gross Profit** as: `Completed Sales Revenue - Applicable Cost of Goods Sold (COGS) of Units Sold`.
  * Used Phone Purchase Expenditure is kept strictly separate from sales revenue and COGS.
* **Visual Reports**:
  * 8 Financial Summary Cards (Sales Revenue, Specific COGS, Estimated Gross Profit, Gross Margin %, Acquisition Outflow, New Units Sold, Used Units Sold, Total Units Sold, Closing Inventory).
  * Recharts Daily Sales Trend Area Chart.
  * Category Volume Breakdown Pie Chart.
  * Brand Performance Matrix (Units sold, revenue, purchase expenditure).
  * Complete Transaction Audit Trail reconciling with summary totals.
* **Export & Print**:
  * **Real CSV Export**: Generates a downloadable `.csv` file matching current filter selections with executive summary, sales ledger, and purchase ledger.
  * **Print-Optimized Layout**: Browser print stylesheet (`@media print`) that cleans away sidebars, headers, and buttons for clean paper reports.

### Part G: Seed Data & State Reset
* **Pre-seeded Dataset**:
  * 14 New Smartphones (Apple, Samsung, OnePlus, Xiaomi, Vivo, OPPO).
  * 8 Inspected Pre-Owned Smartphones.
  * 10 Demo Customer Orders (spanning August, September, October 2026).
  * 8 Customer Used-Phone Sell Requests across various workflow stages.
  * 15 Completed Sales Transactions + 8 Completed Purchase Transactions.
* **Reset Demo Data Button**: Located in sidebar and `/admin/settings`. Opens a confirmation modal that restores the entire application back to its pristine seed state.

---

## 🔒 Prototype Simulation Notices

This application is built as a commercial presentation prototype:
* **No Real Payment Gateway**: Selecting UPI or Card demo payment simulates checkout without transferring real funds.
* **No SMS/Email Server**: Email subscriptions and order confirmations trigger local UI toasts.
* **No Backend Server**: All data resides in browser `localStorage`.
#   T e c h W o r l d M o b i l e s  
 