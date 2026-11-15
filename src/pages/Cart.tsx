import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/SectionHeading';

export const Cart: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    grandTotal,
    clearCart
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MANIKANTA10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Welcome Discount Applied!');
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try MANIKANTA10 for 10% off.');
      setCouponSuccess(null);
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = grandTotal - discountAmount;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="bg-[#F4EBDD] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-10 text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#C49A45] mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 opacity-70" />
          </div>
          <h2 className="font-serif text-3xl text-[#432713] font-medium mb-2">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-[#66594D] mb-6 leading-relaxed">
            Discover the rich aroma and authentic danedar texture of 100% pure buffalo ghee.
          </p>
          <Link
            to="/shop"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md"
          >
            Explore Ghee Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="Shopping Bag"
          title="Review Your Buffalo Ghee Selection"
          subtitle="Carefully packed in food-grade glass jars to preserve granular texture and delicate nutty aroma."
        />

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FFFDF8] rounded-2xl border border-[#E7DCCB] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm font-sans mb-2">
            <span className="flex items-center gap-2 font-medium text-[#432713]">
              <Truck className="w-4 h-4 text-[#C49A45]" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold">
                  Congratulations! You have unlocked Complimentary Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#70431F]">₹{amountNeededForFreeShipping}</strong> more of pure buffalo ghee for free shipping across India.
                </span>
              )}
            </span>
            <span className="font-semibold text-[#70431F] text-xs">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#F4EBDD] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${freeShippingProgress}%` }}
              className="h-full bg-[#C49A45] rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs divide-y divide-[#E7DCCB]">
              {items.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  {/* Image */}
                  <Link
                    to={`/product/${item.productSlug}`}
                    className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F4EBDD] border border-[#E7DCCB] flex-shrink-0"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Title & Jar Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C49A45]">
                      {item.category === 'traditional-bilona' ? 'Vedic Bilona Churned' : 'Modern Clarified'}
                    </span>
                    <Link to={`/product/${item.productSlug}`}>
                      <h4 className="font-serif text-xl font-medium text-[#432713] hover:text-[#C49A45] transition-colors">
                        {item.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#70431F] font-semibold mt-1">
                      Jar Size: {item.size} • 100% Buffalo Milk Only
                    </p>
                    <p className="text-xs text-[#66594D] mt-0.5">
                      ₹{item.price} per unit
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E7DCCB] rounded-xl bg-[#F4EBDD]/40 px-2 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-[#E7DCCB] text-[#432713] transition-colors rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#432713] font-sans">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-[#E7DCCB] text-[#432713] transition-colors rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right sm:w-28 flex sm:flex-col justify-between items-center sm:items-end w-full">
                    <span className="font-serif text-xl font-bold text-[#432713]">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-[#66594D]/70 hover:text-red-700 flex items-center gap-1 transition-colors mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#70431F] hover:underline flex items-center gap-1"
              >
                ← Continue Shopping Buffalo Ghee
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-[#66594D] hover:text-red-700 transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-[#66594D]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#432713]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount (10%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#66594D]">
                  <span>Delivery Charges</span>
                  <span className="font-medium text-[#432713]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[#66594D] text-xs">
                  <span>Dairy GST (Included)</span>
                  <span className="font-semibold text-[#70431F]">5% (HSN 0405 9020)</span>
                </div>

                <div className="pt-3 border-t border-[#E7DCCB] flex justify-between items-baseline">
                  <span className="font-serif text-xl font-bold text-[#432713]">Final Total</span>
                  <span className="font-serif text-2xl font-bold text-[#432713]">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Coupon Box */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#C49A45]" /> Apply Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try MANIKANTA10"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-xs text-[#432713] uppercase focus:outline-none focus:border-[#C49A45]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#70431F] text-[#FFFDF8] rounded-xl text-xs font-semibold hover:bg-[#432713] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-xs text-emerald-700 mt-1.5 font-medium">{couponSuccess}</p>
                )}
                {couponError && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">{couponError}</p>
                )}
              </form>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-gold py-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-[#66594D] space-y-1 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                  Tamper-Evident Safety Seal On Every Glass Jar
                </p>
                <p>Zero cow milk • Strictly 100% Indian Buffalo Ghee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
