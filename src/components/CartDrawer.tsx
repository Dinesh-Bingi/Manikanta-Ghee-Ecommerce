import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    grandTotal,
    totalItemsCount
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#432713]/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FFFDF8] shadow-2xl flex flex-col z-10 border-l border-[#E7DCCB]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E7DCCB] bg-[#F4EBDD]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C49A45]" />
                <h3 className="font-serif text-xl font-medium text-[#432713]">
                  Your Shopping Bag ({totalItemsCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-full hover:bg-[#E7DCCB] text-[#432713] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3.5 bg-[#F4EBDD]/70 border-b border-[#E7DCCB] text-xs">
              <div className="flex items-center justify-between font-sans mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-[#432713]">
                  <Truck className="w-4 h-4 text-[#C49A45]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      Unlocked: Complimentary Express Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#70431F]">₹{amountNeededForFreeShipping}</strong> more for free delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-semibold text-[#70431F]">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#C49A45] rounded-full"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#C49A45] mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#432713] mb-2">Your Bag is Empty</h4>
                  <p className="text-sm text-[#66594D] max-w-xs mb-6">
                    Experience the timeless richness of pure buffalo ghee, slow-churned with traditional craftsmanship.
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/shop');
                    }}
                    className="btn-gold px-6 py-2.5 rounded-lg text-sm font-medium"
                  >
                    Explore Our Ghee
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#E7DCCB] bg-[#FFFDF8] hover:border-[#C49A45]/60 transition-colors flex gap-3.5"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F4EBDD] border border-[#E7DCCB] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base font-medium text-[#432713] leading-snug truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#66594D]/60 hover:text-red-700 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#70431F] font-medium mt-0.5">
                          Jar Size: <span className="font-semibold">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7DCCB]/40">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E7DCCB] rounded-lg bg-[#F4EBDD]/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#E7DCCB] text-[#432713] transition-colors rounded-l"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#432713] font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#E7DCCB] text-[#432713] transition-colors rounded-r"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#432713]">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#66594D]">
                              (₹{item.price} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#E7DCCB] bg-[#F4EBDD]/60 space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#66594D]">
                    <span>Bag Subtotal</span>
                    <span className="font-medium text-[#432713]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#66594D]">
                    <span>Shipping Charges</span>
                    <span className="font-medium text-[#432713]">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-semibold text-[#432713] pt-2 border-t border-[#E7DCCB]">
                    <span>Estimated Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full btn-gold py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block w-full text-center text-xs font-semibold text-[#70431F] hover:underline py-1"
                  >
                    View Detailed Bag & Delivery Notes
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#66594D] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>100% Pure Buffalo Ghee • Tamper-Evident Packaging</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
