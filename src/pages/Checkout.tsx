import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Package,
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { loadRazorpayScript } from '../lib/razorpay';
import { saveOrderToSupabase } from '../lib/supabase';
import { bookCourierShipment, printTaxInvoiceBill } from '../lib/shipping';

export const Checkout: React.FC = () => {
  const { items, subtotal, shippingFee, grandTotal, createOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Karnataka',
    pincode: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const expressSurcharge = deliveryMethod === 'express' ? 120 : 0;
  const finalPayable = grandTotal + expressSurcharge;

  const handleOrderSuccess = async (paymentId?: string) => {
    const rawOrder = createOrder({
      items: [...items],
      subtotal,
      shipping: shippingFee + expressSurcharge,
      discount: 0,
      total: finalPayable,
      customer: { ...formData },
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI (Razorpay Verified)'
          : paymentMethod === 'card'
          ? 'Credit/Debit Card (Razorpay Verified)'
          : paymentMethod === 'netbanking'
          ? 'Net Banking (Razorpay Verified)'
          : 'Cash on Delivery (Pay on Arrival)',
      paymentId: paymentId || undefined
    });

    // Auto-assign courier logistics & AWB tracking based on customer delivery choice
    const placedOrder = bookCourierShipment(
      rawOrder,
      deliveryMethod === 'express' ? 'BlueDart Express Air' : 'Delhivery Direct Air'
    );

    // Sync to Supabase in the background
    await saveOrderToSupabase(placedOrder);

    setCompletedOrder(placedOrder);
    setIsSubmitting(false);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // 1. If Cash On Delivery is chosen
    if (paymentMethod === 'cod') {
      setTimeout(() => {
        handleOrderSuccess('COD-PENDING');
      }, 800);
      return;
    }

    // 2. Online Payment via Razorpay
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      setErrorMessage(
        'Razorpay Key is not detected in your environment. Please ensure VITE_RAZORPAY_KEY_ID is set in your .env file.'
      );
      setIsSubmitting(false);
      return;
    }

    // Ensure Razorpay SDK script is loaded
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded || !(window as any).Razorpay) {
      setErrorMessage(
        'Unable to reach Razorpay checkout servers. Please check your internet connection or disable adblockers.'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const options = {
        key: razorpayKey,
        amount: Math.round(finalPayable * 100), // Amount in paise
        currency: 'INR',
        name: 'MANIKANTA GHEE',
        description: `Pure Buffalo Ghee Order (${items.length} items)`,
        image: '/favicon.svg',
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#C49A45' // Brand gold
        },
        handler: function (response: any) {
          if (response.razorpay_payment_id) {
            handleOrderSuccess(response.razorpay_payment_id);
          } else {
            setErrorMessage('Payment was completed but no payment verification ID was returned.');
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          }
        }
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on('payment.failed', function (response: any) {
        setErrorMessage(
          `Payment Failed: ${response.error.description || 'Transaction was declined by bank'}`
        );
        setIsSubmitting(false);
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error('Razorpay invocation error:', err);
      setErrorMessage(`Failed to open Razorpay checkout: ${err.message || 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  // If order is completed, show the order confirmation receipt!
  if (completedOrder) {
    return (
      <div className="bg-[#F4EBDD] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 sm:p-12 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
              Payment Confirmed & Logged
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
              Thank You For Your Patronage
            </h1>
            <p className="text-sm text-[#66594D] mt-2 font-sans">
              Order ID: <strong className="text-[#432713]">{completedOrder.orderId}</strong>
            </p>
            {completedOrder.paymentId && (
              <p className="text-xs text-[#70431F] font-mono mt-1 bg-[#F4EBDD]/60 inline-block px-3 py-1 rounded-full border border-[#E7DCCB]">
                Razorpay Payment Ref: {completedOrder.paymentId}
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-left text-xs sm:text-sm font-sans space-y-3">
            <div className="flex justify-between border-b border-[#E7DCCB] pb-3">
              <span className="text-[#66594D]">Customer Name:</span>
              <span className="font-semibold text-[#432713]">{completedOrder.customer.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#E7DCCB] pb-3">
              <span className="text-[#66594D]">Shipping Destination:</span>
              <span className="font-semibold text-[#432713] text-right">
                {completedOrder.customer.addressLine1}, {completedOrder.customer.city},{' '}
                {completedOrder.customer.state} - {completedOrder.customer.pincode}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E7DCCB] pb-3">
              <span className="text-[#66594D]">Payment Gateway Status:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {completedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-serif text-base font-bold text-[#432713]">Total Amount Paid:</span>
              <span className="font-serif text-lg font-bold text-[#432713]">
                ₹{completedOrder.total}
              </span>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="text-left space-y-3 pt-2">
            <h4 className="font-serif text-lg text-[#432713] font-medium">Items in this dispatch:</h4>
            <div className="divide-y divide-[#E7DCCB] border border-[#E7DCCB] rounded-xl overflow-hidden">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#FFFDF8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="font-medium text-[#432713]">{item.name}</p>
                      <p className="text-[#66594D]">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#432713]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F4EBDD]/60 border border-[#C49A45]/40 text-xs text-[#432713] text-left flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#C49A45] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sm text-[#432713]">
                Assigned Carrier: {completedOrder.shippingDetails?.courierName || 'BlueDart Express Air'}
              </p>
              <p className="text-[#66594D] text-xs">
                AWB Tracking Code: <strong className="font-mono text-[#70431F]">{completedOrder.shippingDetails?.awbNumber}</strong> • Estimated Delivery by: <strong>{completedOrder.shippingDetails?.estimatedDelivery || '2-4 Days'}</strong>
              </p>
              <p className="text-[11px] text-[#70431F]">
                Packed with inflatable air column cushioning from <strong>Ayyappa Dairy Farm, Yadadri Bhuvanagiri</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => printTaxInvoiceBill(completedOrder)}
              className="flex-1 btn-gold py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> Download / Print Official Bill Receipt
            </button>
            <Link
              to="/account"
              className="btn-outline-brown py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <Truck className="w-4 h-4" /> Track in Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no completed order
  if (items.length === 0) {
    return (
      <div className="bg-[#F4EBDD] min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#432713]">Your Bag is Empty</h2>
          <p className="text-sm text-[#66594D]">
            Please add pure buffalo ghee to your bag before checking out.
          </p>
          <Link to="/shop" className="btn-gold inline-block px-6 py-2.5 rounded-xl text-xs font-semibold uppercase">
            Explore Buffalo Ghee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
            Complete Your Buffalo Ghee Order
          </h1>
          <p className="text-sm text-[#66594D] mt-1 font-sans">
            Insured fragile transit across India in tamper-evident food grade glass jars.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact & Delivery Address */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#432713] text-[#FFFDF8] text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                    Phone Number (for Courier & UPI OTP) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                  Email Address (for Invoice & Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                  Flat, House No., Building, Street *
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  placeholder="House / Flat No., Apartment / Street"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other State / UT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                    placeholder="6-digit PIN code"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#432713] text-[#FFFDF8] text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Delivery Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#C49A45] bg-[#F4EBDD]/50 shadow-xs'
                      : 'border-[#E7DCCB] hover:border-[#C49A45]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="text-[#C49A45] focus:ring-[#C49A45]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#432713]">
                        Standard Insured Courier (3-5 Days)
                      </p>
                      <p className="text-xs text-[#66594D]">
                        Protective honeycomb packaging for glass jars
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#432713]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-[#C49A45] bg-[#F4EBDD]/50 shadow-xs'
                      : 'border-[#E7DCCB] hover:border-[#C49A45]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="text-[#C49A45] focus:ring-[#C49A45]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#432713]">
                        Express Priority Air (1-2 Days)
                      </p>
                      <p className="text-xs text-[#66594D]">
                        Fastest dispatch from heritage dairy warehouse
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#432713]">
                    +₹120
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#432713] text-[#FFFDF8] text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Payment Method
              </h2>

              {/* Gateway integration active badge */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Razorpay Payment Gateway Connected:</strong> Key ID <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-[11px]">{import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_...'}</code> is active. Selecting UPI, Cards, or Net Banking will launch the official Razorpay test payment modal.
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  {
                    id: 'upi',
                    label: 'UPI (Google Pay, PhonePe, Paytm, BHIM)',
                    desc: 'Opens Razorpay Instant UPI QR & VPA Payment'
                  },
                  {
                    id: 'card',
                    label: 'Credit / Debit Cards (Visa, MasterCard, RuPay)',
                    desc: 'Secure 256-bit encrypted card checkout via Razorpay'
                  },
                  {
                    id: 'netbanking',
                    label: 'Net Banking (All Major Indian Banks)',
                    desc: 'Direct secure bank transfer via Razorpay'
                  },
                  {
                    id: 'cod',
                    label: 'Cash on Delivery (Pay on Arrival)',
                    desc: 'Pay cash or UPI upon delivery'
                  }
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#C49A45] bg-[#F4EBDD]/50 shadow-xs'
                        : 'border-[#E7DCCB] hover:border-[#C49A45]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id as any)}
                        className="text-[#C49A45] focus:ring-[#C49A45]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#432713]">{m.label}</p>
                        <p className="text-xs text-[#66594D]">{m.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-5 sticky top-28">
              <h3 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-4">
                Order Review ({items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-[#E7DCCB]" />
                      <div>
                        <p className="font-semibold text-[#432713] leading-tight">{item.name}</p>
                        <p className="text-[#66594D]">Size: {item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#432713]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="border-t border-[#E7DCCB] pt-4 space-y-2 text-sm font-sans">
                <div className="flex justify-between text-[#66594D]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#432713]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#66594D]">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-[#432713]">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                {deliveryMethod === 'express' && (
                  <div className="flex justify-between text-[#70431F] text-xs">
                    <span>Express Air Surcharge</span>
                    <span>+₹120</span>
                  </div>
                )}
                <div className="flex justify-between text-[#66594D] text-xs">
                  <span>Dairy GST (Included)</span>
                  <span className="font-semibold text-[#70431F]">5% (HSN 0405 9020)</span>
                </div>
                <div className="pt-3 border-t border-[#E7DCCB] flex justify-between items-baseline">
                  <span className="font-serif text-xl font-bold text-[#432713]">Total Payable</span>
                  <span className="font-serif text-2xl font-bold text-[#432713]">
                    ₹{finalPayable}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Opening Razorpay Gateway...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {paymentMethod === 'cod'
                      ? `Place Order with COD (₹${finalPayable})`
                      : `Pay with Razorpay (₹${finalPayable})`}
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[11px] text-[#66594D] space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                  100% Buffalo Ghee Purity Guarantee
                </p>
                <p>Non-Adulterated • Handcrafted & Hermetically Sealed</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
