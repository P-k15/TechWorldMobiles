import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [newProducts, setNewProducts] = useState(() => StorageService.getNewProducts());
  const [usedProducts, setUsedProducts] = useState(() => StorageService.getUsedProducts());
  const [orders, setOrders] = useState(() => StorageService.getOrders());
  const [sellRequests, setSellRequests] = useState(() => StorageService.getSellRequests());
  const [salesTransactions, setSalesTransactions] = useState(() => StorageService.getSalesTransactions());
  const [purchaseTransactions, setPurchaseTransactions] = useState(() => StorageService.getPurchaseTransactions());

  // Sync to localStorage
  useEffect(() => {
    StorageService.saveNewProducts(newProducts);
  }, [newProducts]);

  useEffect(() => {
    StorageService.saveUsedProducts(usedProducts);
  }, [usedProducts]);

  useEffect(() => {
    StorageService.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    StorageService.saveSellRequests(sellRequests);
  }, [sellRequests]);

  useEffect(() => {
    StorageService.saveSalesTransactions(salesTransactions);
  }, [salesTransactions]);

  useEffect(() => {
    StorageService.savePurchaseTransactions(purchaseTransactions);
  }, [purchaseTransactions]);

  // --- Product CRUD ---
  const addNewProduct = (productData) => {
    const id = `np-${Date.now()}`;
    const newProd = {
      ...productData,
      id,
      type: 'new',
      stock: Number(productData.stock) || 0,
      price: Number(productData.price) || 0,
      mrp: Number(productData.mrp) || Number(productData.price) || 0,
      costPrice: Number(productData.costPrice) || Math.round(Number(productData.price) * 0.85),
      images: Array.isArray(productData.images) && productData.images.length > 0 
        ? productData.images 
        : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    };
    setNewProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateNewProduct = (id, updatedFields) => {
    setNewProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteNewProduct = (id) => {
    setNewProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const addUsedProduct = (productData) => {
    const id = `up-${Date.now()}`;
    const newUsed = {
      ...productData,
      id,
      type: 'used',
      category: 'Pre-Owned',
      stock: Number(productData.stock) || 1,
      price: Number(productData.price) || 0,
      purchaseCost: Number(productData.purchaseCost) || Math.round(Number(productData.price) * 0.75),
      condition: productData.condition || 'Good',
      images: Array.isArray(productData.images) && productData.images.length > 0 
        ? productData.images 
        : ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'],
    };
    setUsedProducts((prev) => [newUsed, ...prev]);
    return newUsed;
  };

  const updateUsedProduct = (id, updatedFields) => {
    setUsedProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteUsedProduct = (id) => {
    setUsedProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Customer Order Placement ---
  const createCustomerOrder = (orderData) => {
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      orderDate: new Date().toISOString(),
      ...orderData,
      fulfilmentStatus: 'Confirmed',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid',
    };

    // Decrement inventory stock
    if (Array.isArray(orderData.items)) {
      orderData.items.forEach((item) => {
        const qtyToReduce = item.quantity || 1;
        if (item.type === 'used') {
          setUsedProducts((prev) =>
            prev.map((p) => {
              if (p.id === item.id) {
                const updatedStock = Math.max(0, (p.stock || 0) - qtyToReduce);
                return { ...p, stock: updatedStock };
              }
              return p;
            })
          );
        } else {
          setNewProducts((prev) =>
            prev.map((p) => {
              if (p.id === item.id) {
                const updatedStock = Math.max(0, (p.stock || 0) - qtyToReduce);
                return { ...p, stock: updatedStock };
              }
              return p;
            })
          );
        }
      });
    }

    setOrders((prev) => [newOrder, ...prev]);
    return orderId;
  };

  // --- Update Order Status ---
  const updateOrderStatus = (orderId, fulfilmentStatus, paymentStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated = {
            ...ord,
            fulfilmentStatus: fulfilmentStatus || ord.fulfilmentStatus,
            paymentStatus: paymentStatus || ord.paymentStatus,
          };

          // Business Rule: Record completed sales transaction only when both Delivered and Paid, and not already recorded
          if (updated.fulfilmentStatus === 'Delivered' && updated.paymentStatus === 'Paid' && !updated.transactionId) {
            const txnId = `TXN-S-${Date.now().toString().slice(-4)}`;
            updated.transactionId = txnId;

            // Generate transactions for line items
            (updated.items || []).forEach((item, idx) => {
              const saleTxn = {
                id: `${txnId}-${idx + 1}`,
                transactionDate: new Date().toISOString(),
                type: 'sale',
                category: item.type || 'new',
                productId: item.id,
                productName: item.name,
                brand: item.brand || 'Other',
                customerName: updated.customer.fullName,
                orderId: updated.id,
                quantity: item.quantity,
                unitPrice: item.price,
                costPrice: item.costPrice || Math.round(item.price * 0.8),
                totalAmount: item.subtotal || (item.price * item.quantity),
                paymentMethod: updated.paymentMethod,
                status: 'Completed',
              };
              setSalesTransactions((txns) => [saleTxn, ...txns]);
            });
          }

          return updated;
        }
        return ord;
      })
    );
  };

  // --- Customer Sell Request Submission ---
  const submitCustomerSellRequest = (requestData) => {
    const nextSeq = String(sellRequests.length + 1).padStart(3, '0');
    const refId = `REQ-2026-${nextSeq}`;
    const newRequest = {
      id: refId,
      submissionDate: new Date().toISOString(),
      status: 'Submitted',
      inspectionNotes: 'Awaiting initial team evaluation.',
      offeredPrice: null,
      finalAgreedPrice: null,
      purchaseDate: null,
      ...requestData,
    };

    setSellRequests((prev) => [newRequest, ...prev]);
    return refId;
  };

  // --- Admin Update Sell Request ---
  const updateSellRequest = (requestId, updates) => {
    setSellRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const updated = { ...req, ...updates };

          // Business Rule: When Purchase Completed is selected, create corresponding purchase record and add to used inventory
          if (updates.status === 'Purchase Completed' && req.status !== 'Purchase Completed') {
            const purchaseCost = Number(updates.finalAgreedPrice) || Number(req.expectedPrice) || 20000;
            const purchaseDate = updates.purchaseDate || new Date().toISOString();
            const purchaseTxnId = `TXN-P-${Date.now().toString().slice(-4)}`;

            // Check if purchase transaction already recorded
            const alreadyExists = purchaseTransactions.some((pt) => pt.sellRequestId === req.id);
            if (!alreadyExists) {
              const newPurchaseTxn = {
                id: purchaseTxnId,
                transactionDate: purchaseDate,
                type: 'purchase',
                category: 'used',
                productId: `up-req-${req.id}`,
                productName: `${req.brand} ${req.model} (${req.storage || '128GB'})`,
                brand: req.brand,
                sellerName: req.customerName,
                sellRequestId: req.id,
                quantity: 1,
                unitPrice: purchaseCost,
                totalAmount: purchaseCost,
                paymentMethod: 'IMPS Bank Transfer',
                status: 'Completed',
                notes: updates.inspectionNotes || 'Store purchase completed upon verification.',
              };
              setPurchaseTransactions((pt) => [newPurchaseTxn, ...pt]);

              // Automatically add to Used Phone Inventory so it can be resold!
              const resellingPrice = Math.round(purchaseCost * 1.25);
              const newUsedPhone = {
                id: `up-buy-${req.id}`,
                name: `${req.brand} ${req.model}`,
                brand: req.brand,
                type: 'used',
                category: 'Pre-Owned',
                sku: `USED-${req.brand.toUpperCase()}-${(req.model || '').replace(/\s+/g, '')}-${req.storage || '128'}`.toUpperCase(),
                price: resellingPrice,
                originalPrice: Math.round(resellingPrice * 1.4),
                purchaseCost: purchaseCost,
                storage: req.storage || '128GB',
                ram: req.ram || '8GB',
                color: req.color || 'Standard',
                condition: req.physicalCondition || 'Good',
                batteryHealth: req.batteryHealth || '88%',
                isInspected: true,
                inspectionStatus: 'Certified — 42-Point Check Passed',
                warranty: '6 Months TechWorldMobiles Limited Warranty',
                knownDefects: req.knownDefects || 'Minor cosmetic signs of normal usage.',
                repairHistory: req.repairHistory || 'Inspected and certified original.',
                billAvailable: Boolean(req.billAvailable),
                boxAvailable: Boolean(req.boxAvailable),
                accessoriesIncluded: req.accessories ? [req.accessories] : ['Compatible Charging Cable'],
                stock: 1,
                rating: 4.6,
                images: Array.isArray(req.photos) && req.photos.length > 0 
                  ? req.photos 
                  : ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'],
                description: `Certified pre-owned ${req.brand} ${req.model} acquired from customer. Thoroughly inspected and backed by TechWorldMobiles warranty.`,
              };

              setUsedProducts((used) => [newUsedPhone, ...used]);
            }
          }

          return updated;
        }
        return req;
      })
    );
  };

  // --- Reset Entire Demo State ---
  const resetDemoData = () => {
    StorageService.resetAllToSeed();
    setNewProducts(StorageService.getNewProducts());
    setUsedProducts(StorageService.getUsedProducts());
    setOrders(StorageService.getOrders());
    setSellRequests(StorageService.getSellRequests());
    setSalesTransactions(StorageService.getSalesTransactions());
    setPurchaseTransactions(StorageService.getPurchaseTransactions());
  };

  return (
    <AdminContext.Provider
      value={{
        newProducts,
        usedProducts,
        orders,
        sellRequests,
        salesTransactions,
        purchaseTransactions,
        addNewProduct,
        updateNewProduct,
        deleteNewProduct,
        addUsedProduct,
        updateUsedProduct,
        deleteUsedProduct,
        createCustomerOrder,
        updateOrderStatus,
        submitCustomerSellRequest,
        updateSellRequest,
        resetDemoData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
