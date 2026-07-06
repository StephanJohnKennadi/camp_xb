import React from 'react';
import { useCart } from '../../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    checkout,
    isCheckingOut
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Slide-over cart sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-sand border-l border-primary/10 shadow-2xl z-50 flex flex-col h-full"
          >
            {/* Cart Header */}
            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="font-display font-bold text-lg">Your Gear Bag</h2>
                <span className="bg-accent text-primary font-bold text-xs px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={toggleCart}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="bg-primary/5 p-6 rounded-full text-primary/40">
                    <ShoppingBag className="w-16 h-16" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary">Your bag is empty</h3>
                  <p className="text-gray-500 max-w-xs text-sm">
                    Looks like you haven't added any premium outdoor gear to your inventory yet.
                  </p>
                  <Link 
                    to="/store" 
                    onClick={toggleCart}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-6 py-3 rounded-full transition-all text-sm shadow-md"
                  >
                    Go Shop Gear
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 bg-white p-4 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    <img 
                      src={item.productImage} 
                      alt={item.productTitle} 
                      className="w-20 h-20 object-cover rounded-xl border border-primary/5 bg-sand"
                    />
                    
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="font-display font-semibold text-primary truncate leading-snug">
                        <Link 
                          to={`/store/${item.productHandle}`} 
                          onClick={toggleCart}
                          className="hover:underline"
                        >
                          {item.productTitle}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        Variant: {item.variantTitle}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 border border-primary/10 rounded-full px-2 py-0.5 bg-sand">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-display font-semibold text-sm w-5 text-center text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <span className="font-display font-bold text-primary">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Footer / Checkout Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-primary/10 bg-white space-y-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>${getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-accent-hover font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-dashed border-primary/10 my-2 pt-2 flex justify-between font-display font-bold text-lg text-primary">
                    <span>Total Estimated</span>
                    <span>${getCartTotal()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 bg-sand p-2.5 rounded-lg border border-primary/5">
                  <ShieldCheck className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                  <span>Secure transactions. Fulfilled directly through official Shopify storefront checkout.</span>
                </div>

                <button
                  onClick={checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary hover:bg-primary-light disabled:bg-primary/60 text-white font-display font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 text-base shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Initiating Checkout...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
