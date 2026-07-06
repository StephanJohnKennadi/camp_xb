import React, { createContext, useContext, useState, useEffect } from 'react';
import { shopifyService } from '../services/shopify';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('camp_revive_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from local storage:', e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('camp_revive_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, variant, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.variantId === variant.id);
      
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, {
          productId: product.id,
          productTitle: product.title,
          productHandle: product.handle,
          productImage: product.images[0],
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: quantity
        }];
      }
    });
    
    // Automatically open the cart drawer for great premium UX interaction
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId) => {
    setCartItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = async () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const checkoutItems = cartItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }));
      
      const checkoutUrl = await shopifyService.createCheckout(checkoutItems);
      
      // Redirect the user to Shopify checkout page (or mock success page)
      window.location.href = checkoutUrl;
    } catch (e) {
      console.error('Checkout redirect failed:', e);
      alert('Checkout failed, redirecting to fallback order confirmation.');
      window.location.href = `/inquiry-success?type=store&ref=ORD-${Math.floor(Math.random() * 90000) + 10000}`;
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      isCheckingOut,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      getCartTotal,
      getCartCount,
      checkout,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
