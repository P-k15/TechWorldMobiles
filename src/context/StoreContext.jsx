import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Cart State
  const [cart, setCart] = useState(() => StorageService.getCart());
  // Wishlist State
  const [wishlist, setWishlist] = useState(() => StorageService.getWishlist());
  // Toasts
  const [toasts, setToasts] = useState([]);
  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync cart to storage
  useEffect(() => {
    StorageService.saveCart(cart);
  }, [cart]);

  // Sync wishlist to storage
  useEffect(() => {
    StorageService.saveWishlist(wishlist);
  }, [wishlist]);

  // Toast dispatch
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedVariant = {}) => {
    const variantKey = `${product.id}_${selectedVariant.storage || product.storage || 'def'}_${selectedVariant.color || product.color || 'def'}`;
    
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantKey === variantKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          subtotal: newQty * updated[existingIndex].price,
        };
        return updated;
      } else {
        const newItem = {
          cartItemId: variantKey,
          variantKey,
          id: product.id,
          name: product.name,
          brand: product.brand,
          type: product.type || 'new',
          price: product.price,
          originalPrice: product.mrp || product.originalPrice || product.price,
          costPrice: product.costPrice || product.purchaseCost || Math.round(product.price * 0.82),
          storage: selectedVariant.storage || product.storage,
          color: selectedVariant.color || product.color,
          condition: product.condition || null,
          image: (product.images && product.images[0]) || '',
          quantity,
          subtotal: product.price * quantity,
        };
        return [...prev, newItem];
      }
    });

    addToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (variantKey) => {
    setCart((prev) => prev.filter((item) => item.variantKey !== variantKey));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (variantKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(variantKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.variantKey === variantKey
          ? { ...item, quantity: newQty, subtotal: item.price * newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Added "${product.name}" to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toasts,
        addToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
