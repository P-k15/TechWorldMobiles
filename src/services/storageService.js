/**
 * LocalStorage Persistence and State Management Service
 */

import { NEW_PHONES, USED_PHONES } from '../data/mockProducts';
import { MOCK_ORDERS } from '../data/mockOrders';
import { MOCK_SELL_REQUESTS } from '../data/mockSellRequests';
import { MOCK_SALES_TRANSACTIONS, MOCK_PURCHASE_TRANSACTIONS } from '../data/mockTransactions';

const KEYS = {
  NEW_PRODUCTS: 'techworldmobiles_new_products_v1',
  USED_PRODUCTS: 'techworldmobiles_used_products_v1',
  ORDERS: 'techworldmobiles_orders_v1',
  SELL_REQUESTS: 'techworldmobiles_sell_requests_v1',
  SALES_TXNS: 'techworldmobiles_sales_txns_v1',
  PURCHASE_TXNS: 'techworldmobiles_purchase_txns_v1',
  CART: 'techworldmobiles_cart_v1',
  WISHLIST: 'techworldmobiles_wishlist_v1',
};

function safeGet(key, fallback) {
  try {
    let raw = localStorage.getItem(key);
    // Graceful migration from legacy key if new key not yet populated
    if (!raw && key.startsWith('techworldmobiles_')) {
      const legacyKey = key.replace('techworldmobiles_', 'mobix_');
      raw = localStorage.getItem(legacyKey);
      if (raw) {
        try {
          localStorage.setItem(key, raw);
        } catch (_) {
          // Ignore quota errors if any
        }
      }
    }
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
  } catch (e) {
    console.warn(`Failed to parse localStorage key ${key}`, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write to localStorage key ${key}`, e);
  }
}

export const StorageService = {
  // --- Initialize or Load ---
  getNewProducts() {
    const stored = safeGet(KEYS.NEW_PRODUCTS, null);
    if (!stored) {
      safeSet(KEYS.NEW_PRODUCTS, NEW_PHONES);
      return NEW_PHONES;
    }
    return stored;
  },

  getUsedProducts() {
    const stored = safeGet(KEYS.USED_PRODUCTS, null);
    if (!stored) {
      safeSet(KEYS.USED_PRODUCTS, USED_PHONES);
      return USED_PHONES;
    }
    return stored;
  },

  getOrders() {
    const stored = safeGet(KEYS.ORDERS, null);
    if (!stored) {
      safeSet(KEYS.ORDERS, MOCK_ORDERS);
      return MOCK_ORDERS;
    }
    return stored;
  },

  getSellRequests() {
    const stored = safeGet(KEYS.SELL_REQUESTS, null);
    if (!stored) {
      safeSet(KEYS.SELL_REQUESTS, MOCK_SELL_REQUESTS);
      return MOCK_SELL_REQUESTS;
    }
    return stored;
  },

  getSalesTransactions() {
    const stored = safeGet(KEYS.SALES_TXNS, null);
    if (!stored) {
      safeSet(KEYS.SALES_TXNS, MOCK_SALES_TRANSACTIONS);
      return MOCK_SALES_TRANSACTIONS;
    }
    return stored;
  },

  getPurchaseTransactions() {
    const stored = safeGet(KEYS.PURCHASE_TXNS, null);
    if (!stored) {
      safeSet(KEYS.PURCHASE_TXNS, MOCK_PURCHASE_TRANSACTIONS);
      return MOCK_PURCHASE_TRANSACTIONS;
    }
    return stored;
  },

  getCart() {
    return safeGet(KEYS.CART, []);
  },

  getWishlist() {
    return safeGet(KEYS.WISHLIST, []);
  },

  // --- Save Setters ---
  saveNewProducts(products) {
    safeSet(KEYS.NEW_PRODUCTS, products);
  },

  saveUsedProducts(products) {
    safeSet(KEYS.USED_PRODUCTS, products);
  },

  saveOrders(orders) {
    safeSet(KEYS.ORDERS, orders);
  },

  saveSellRequests(requests) {
    safeSet(KEYS.SELL_REQUESTS, requests);
  },

  saveSalesTransactions(txns) {
    safeSet(KEYS.SALES_TXNS, txns);
  },

  savePurchaseTransactions(txns) {
    safeSet(KEYS.PURCHASE_TXNS, txns);
  },

  saveCart(cart) {
    safeSet(KEYS.CART, cart);
  },

  saveWishlist(wishlist) {
    safeSet(KEYS.WISHLIST, wishlist);
  },

  // --- Reset Entire Demo State ---
  resetAllToSeed() {
    try {
      localStorage.setItem(KEYS.NEW_PRODUCTS, JSON.stringify(NEW_PHONES));
      localStorage.setItem(KEYS.USED_PRODUCTS, JSON.stringify(USED_PHONES));
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(MOCK_ORDERS));
      localStorage.setItem(KEYS.SELL_REQUESTS, JSON.stringify(MOCK_SELL_REQUESTS));
      localStorage.setItem(KEYS.SALES_TXNS, JSON.stringify(MOCK_SALES_TRANSACTIONS));
      localStorage.setItem(KEYS.PURCHASE_TXNS, JSON.stringify(MOCK_PURCHASE_TRANSACTIONS));
      localStorage.setItem(KEYS.CART, JSON.stringify([]));
      localStorage.setItem(KEYS.WISHLIST, JSON.stringify([]));
      return true;
    } catch (e) {
      console.error('Failed to reset localStorage seed', e);
      return false;
    }
  }
};
