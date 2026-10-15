/**
 * Report and Business Analytics Service
 * Implements strict accounting principles for the shop owner:
 * - Only counts completed sales
 * - Excludes cancelled or pending unfulfilled orders
 * - Calculates Estimated Gross Profit as: Completed Sales Revenue - Specific COGS
 * - Keeps Used Phone Purchase Expenditure separate from COGS
 * - Generates real CSV export data
 */

export const ReportService = {
  /**
   * Filter transactions by month (1-12) and year (e.g. 2026)
   */
  filterByMonth(transactions, year, month) {
    if (!transactions) return [];
    return transactions.filter(t => {
      const d = new Date(t.transactionDate);
      if (isNaN(d.getTime())) return false;
      const tYear = d.getFullYear();
      const tMonth = d.getMonth() + 1; // 1 to 12
      
      const yearMatch = !year || year === 'all' || tYear === Number(year);
      const monthMatch = !month || month === 'all' || tMonth === Number(month);
      return yearMatch && monthMatch;
    });
  },

  /**
   * Filter transactions by custom date range
   */
  filterByDateRange(transactions, startDate, endDate) {
    if (!transactions) return [];
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate + 'T23:59:59.999Z').getTime() : Infinity;

    return transactions.filter(t => {
      const time = new Date(t.transactionDate).getTime();
      return time >= start && time <= end;
    });
  },

  /**
   * Calculate summary metrics from sales and purchase transactions
   */
  calculateMetrics(salesTxns, purchaseTxns, currentInventoryCount = 0) {
    const validSales = (salesTxns || []).filter(t => t.status === 'Completed');
    const validPurchases = (purchaseTxns || []).filter(t => t.status === 'Completed');

    let newPhonesSold = 0;
    let usedPhonesSold = 0;
    let totalSalesRevenue = 0;
    let totalCogs = 0;
    let hasMissingCost = false;

    validSales.forEach(s => {
      const qty = s.quantity || 1;
      const amount = s.totalAmount || (s.unitPrice * qty) || 0;
      totalSalesRevenue += amount;

      if (s.category === 'new') {
        newPhonesSold += qty;
      } else {
        usedPhonesSold += qty;
      }

      if (s.costPrice !== undefined && s.costPrice !== null) {
        totalCogs += (Number(s.costPrice) * qty);
      } else {
        hasMissingCost = true;
      }
    });

    const totalPhonesSold = newPhonesSold + usedPhonesSold;

    let totalPurchaseExpenditure = 0;
    let usedPhonesPurchased = 0;

    validPurchases.forEach(p => {
      const qty = p.quantity || 1;
      usedPhonesPurchased += qty;
      totalPurchaseExpenditure += p.totalAmount || (p.unitPrice * qty) || 0;
    });

    // Gross profit = Sales Revenue - Cost of Goods Sold (for units sold)
    const estimatedGrossProfit = hasMissingCost ? null : (totalSalesRevenue - totalCogs);
    const grossMarginPercent = (totalSalesRevenue > 0 && estimatedGrossProfit !== null)
      ? ((estimatedGrossProfit / totalSalesRevenue) * 100).toFixed(1)
      : null;

    return {
      newPhonesSold,
      usedPhonesSold,
      totalPhonesSold,
      usedPhonesPurchased,
      totalSalesRevenue,
      totalPurchaseExpenditure,
      totalCogs,
      estimatedGrossProfit,
      grossMarginPercent,
      hasMissingCost,
      closingInventory: currentInventoryCount
    };
  },

  /**
   * Aggregate daily sales for charts
   */
  getDailySalesTrend(salesTxns, year, month) {
    const validSales = (salesTxns || []).filter(t => t.status === 'Completed');
    const daysInMonth = (year && month && month !== 'all' && year !== 'all') 
      ? new Date(Number(year), Number(month), 0).getDate() 
      : 31;

    const dailyMap = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const label = `${i} ${month !== 'all' && month ? '' : ''}`;
      dailyMap[i] = { day: `${i}`, newSales: 0, usedSales: 0, totalRevenue: 0 };
    }

    validSales.forEach(s => {
      const d = new Date(s.transactionDate);
      const dayNum = d.getDate();
      if (dailyMap[dayNum]) {
        const amount = s.totalAmount || 0;
        dailyMap[dayNum].totalRevenue += amount;
        if (s.category === 'new') {
          dailyMap[dayNum].newSales += amount;
        } else {
          dailyMap[dayNum].usedSales += amount;
        }
      }
    });

    return Object.values(dailyMap);
  },

  /**
   * Aggregate sales by Brand
   */
  getBrandPerformance(salesTxns, purchaseTxns) {
    const brandMap = {};

    (salesTxns || []).filter(t => t.status === 'Completed').forEach(s => {
      const brand = s.brand || 'Other';
      if (!brandMap[brand]) {
        brandMap[brand] = { brand, unitsSold: 0, salesRevenue: 0, purchaseExpenditure: 0 };
      }
      brandMap[brand].unitsSold += (s.quantity || 1);
      brandMap[brand].salesRevenue += (s.totalAmount || 0);
    });

    (purchaseTxns || []).filter(t => t.status === 'Completed').forEach(p => {
      const brand = p.brand || 'Other';
      if (!brandMap[brand]) {
        brandMap[brand] = { brand, unitsSold: 0, salesRevenue: 0, purchaseExpenditure: 0 };
      }
      brandMap[brand].purchaseExpenditure += (p.totalAmount || 0);
    });

    return Object.values(brandMap).sort((a, b) => b.salesRevenue - a.salesRevenue);
  },

  /**
   * Generate CSV content and trigger client-side download
   */
  exportToCSV(metrics, salesTxns, purchaseTxns, periodLabel = 'Report') {
    let csv = `TechWorldMobiles Monthly Business Performance Report - ${periodLabel}\r\n`;
    csv += `Generated On: ${new Date().toLocaleString('en-IN')}\r\n\r\n`;

    csv += `--- EXECUTIVE SUMMARY ---\r\n`;
    csv += `Total New Phones Sold,${metrics.newPhonesSold}\r\n`;
    csv += `Total Used Phones Sold,${metrics.usedPhonesSold}\r\n`;
    csv += `Total Phones Sold,${metrics.totalPhonesSold}\r\n`;
    csv += `Total Used Phones Purchased,${metrics.usedPhonesPurchased}\r\n`;
    csv += `Total Completed Sales Revenue (INR),₹${metrics.totalSalesRevenue}\r\n`;
    csv += `Cost of Goods Sold (COGS),₹${metrics.totalCogs}\r\n`;
    csv += `Estimated Gross Profit (Sales - COGS),₹${metrics.estimatedGrossProfit !== null ? metrics.estimatedGrossProfit : 'N/A'}\r\n`;
    csv += `Gross Margin,${metrics.grossMarginPercent ? metrics.grossMarginPercent + '%' : 'N/A'}\r\n`;
    csv += `Total Used Phone Purchase Expenditure,₹${metrics.totalPurchaseExpenditure}\r\n`;
    csv += `Closing Inventory Snapshot,${metrics.closingInventory} Units\r\n\r\n`;

    csv += `--- COMPLETED SALES TRANSACTIONS ---\r\n`;
    csv += `Transaction ID,Date,Category,Product Name,Brand,Customer Name,Order ID,Qty,Unit Price (INR),Total Amount (INR),Cost Price (COGS)\r\n`;
    (salesTxns || []).forEach(s => {
      const row = [
        s.id,
        new Date(s.transactionDate).toISOString().split('T')[0],
        s.category,
        `"${(s.productName || '').replace(/"/g, '""')}"`,
        s.brand,
        `"${(s.customerName || '').replace(/"/g, '""')}"`,
        s.orderId || 'Direct',
        s.quantity || 1,
        s.unitPrice,
        s.totalAmount,
        s.costPrice || ''
      ];
      csv += row.join(',') + '\r\n';
    });

    csv += `\r\n--- COMPLETED USED PHONE PURCHASE TRANSACTIONS ---\r\n`;
    csv += `Transaction ID,Date,Product Name,Brand,Seller Name,Sell Request ID,Qty,Purchase Cost (INR),Payment Method,Notes\r\n`;
    (purchaseTxns || []).forEach(p => {
      const row = [
        p.id,
        new Date(p.transactionDate).toISOString().split('T')[0],
        `"${(p.productName || '').replace(/"/g, '""')}"`,
        p.brand,
        `"${(p.sellerName || '').replace(/"/g, '""')}"`,
        p.sellRequestId || 'Counter',
        p.quantity || 1,
        p.totalAmount,
        p.paymentMethod || 'IMPS',
        `"${(p.notes || '').replace(/"/g, '""')}"`
      ];
      csv += row.join(',') + '\r\n';
    });

    // Create a Blob and trigger browser download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TechWorldMobiles_Report_${periodLabel.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
