import React, { useState, useEffect } from 'react';
import {
  Package,
  Mail,
  MessageSquare,
  TrendingUp,
  Database,
  ExternalLink,
  CheckCircle2,
  Copy,
  Download,
  Search,
  Filter,
  ShieldCheck,
  RefreshCw,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  AlertCircle,
  Trash2,
  Truck,
  Printer,
  Box,
  MapPin,
  Check,
  FileText,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { OrderDetails } from '../types';
import {
  bookCourierShipment,
  printShippingLabel,
  printTaxInvoiceBill,
  calculatePackageDimensionsAndWeight,
  PICKUP_FACILITY
} from '../lib/shipping';
import {
  getShiprocketConfig,
  saveShiprocketConfig,
  pushOrderToShiprocket,
  testShiprocketAuth,
  ShiprocketConfig
} from '../lib/shiprocket';

interface SubscriberRecord {
  email: string;
  brand?: string;
  subscribed_at: string;
}

interface InquiryRecord {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export const Admin: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('manikanta_admin_auth') === 'true';
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'subscribers' | 'inquiries' | 'shipping' | 'supabase'>('orders');
  const [selectedCouriers, setSelectedCouriers] = useState<Record<string, string>>({});
  const [shippingSuccessMsg, setShippingSuccessMsg] = useState('');
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Shiprocket Automation State
  const [shiprocketConfig, setShiprocketConfig] = useState<ShiprocketConfig>(() => getShiprocketConfig());
  const [isTestingShiprocket, setIsTestingShiprocket] = useState(false);
  const [shiprocketTestResult, setShiprocketTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [pushingOrderId, setPushingOrderId] = useState<string | null>(null);

  const handleSaveShiprocket = () => {
    saveShiprocketConfig(shiprocketConfig);
    setShippingSuccessMsg('Shiprocket API configuration saved successfully!');
    setTimeout(() => setShippingSuccessMsg(''), 5000);
  };

  const handleTestShiprocket = async () => {
    if (!shiprocketConfig.email || !shiprocketConfig.password) {
      setShiprocketTestResult({ success: false, message: 'Please enter Shiprocket Email and Password first.' });
      return;
    }
    setIsTestingShiprocket(true);
    setShiprocketTestResult(null);
    const result = await testShiprocketAuth(shiprocketConfig.email, shiprocketConfig.password);
    setShiprocketTestResult(result);
    setIsTestingShiprocket(false);
  };

  const handleAutoPushShiprocket = async (order: OrderDetails) => {
    if (!shiprocketConfig.email || !shiprocketConfig.password) {
      alert('Please enter your Shiprocket Email and Password in the configuration panel above.');
      return;
    }
    setPushingOrderId(order.orderId);
    const result = await pushOrderToShiprocket(order, shiprocketConfig);
    setPushingOrderId(null);

    if (result.success) {
      try {
        const stored = localStorage.getItem('manikanta_orders_v1');
        if (stored) {
          setOrders(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Error refreshing orders', e);
      }
      setShippingSuccessMsg(result.message);
      setTimeout(() => setShippingSuccessMsg(''), 8000);
    } else {
      alert(`Shiprocket API Notice: ${result.message}`);
    }
  };

  const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'ayyappadairyfarms@gmail.com').trim().toLowerCase();
  const configuredPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'Manikanta@2026').trim();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputEmailClean = emailInput.trim().toLowerCase();
    const inputPasswordClean = passwordInput.trim();

    if (inputEmailClean === configuredEmail && inputPasswordClean === configuredPassword) {
      sessionStorage.setItem('manikanta_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please verify your Admin Email and Password, or update them in .env.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('manikanta_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
  };

  const clearLocalTestData = () => {
    if (window.confirm('Are you sure you want to clear old local test data from your browser?')) {
      localStorage.removeItem('manikanta_orders_v1');
      localStorage.removeItem('manikanta_subscribers');
      localStorage.removeItem('manikanta_inquiries');
      setOrders([]);
      setSubscribers([]);
      setInquiries([]);
    }
  };

  const handleBookShipment = (order: OrderDetails) => {
    const courier = selectedCouriers[order.orderId] || 'BlueDart Express Air';
    const updated = bookCourierShipment(order, courier);
    setOrders((prev) => prev.map((o) => (o.orderId === order.orderId ? updated : o)));
    setShippingSuccessMsg(`Shipment booked with ${courier}! AWB #${updated.shippingDetails?.awbNumber} generated.`);
    setTimeout(() => setShippingSuccessMsg(''), 6000);
  };

  const loadData = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);

    // 1. Load Orders
    try {
      const localOrders = JSON.parse(localStorage.getItem('manikanta_orders_v1') || '[]');
      setOrders(localOrders);

      if (supabase) {
        const { data: supaOrders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (supaOrders && supaOrders.length > 0) {
          console.log('Loaded Supabase orders:', supaOrders.length);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load Subscribers
    try {
      const localSubs = JSON.parse(localStorage.getItem('manikanta_subscribers') || '[]');
      setSubscribers(localSubs);

      if (supabase) {
        const { data: supaSubs } = await supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false });
        if (supaSubs && supaSubs.length > 0) {
          setSubscribers(supaSubs);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Load Inquiries
    try {
      const localInq = JSON.parse(localStorage.getItem('manikanta_inquiries') || '[]');
      setInquiries(localInq);

      if (supabase) {
        const { data: supaInq } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
        if (supaInq && supaInq.length > 0) {
          setInquiries(supaInq);
        }
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) return;
    const csvContent =
      'data:text/csv;charset=utf-8,Email,Brand,Subscribed At\n' +
      subscribers.map((s) => `"${s.email}","MANIKANTA GHEE — Ayyappa Dairy Farm","${s.subscribed_at}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `manikanta_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sqlSchemaScript = `-- ========================================================
-- MANIKANTA GHEE — AYYAPPA DAIRY FARM SUPABASE SQL SETUP
-- Run this in your Supabase SQL Editor to enable cloud storage
-- ========================================================

-- 1. Create Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  brand TEXT DEFAULT 'MANIKANTA GHEE — Ayyappa Dairy Farm',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_id TEXT,
  items JSONB,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Public Read/Write for Anon client (Development / Standard D2C)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert subscribers" ON public.subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select subscribers" ON public.subscribers FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select orders" ON public.orders FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select inquiries" ON public.inquiries FOR SELECT TO anon USING (true);
`;

  const copySQL = () => {
    navigator.clipboard.writeText(sqlSchemaScript);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 3000);
  };

  // If NOT authenticated, show the Admin Authentication Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#F4EBDD] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Lock Card */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] shadow-xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
            {/* Top decorative badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#432713] text-[#C49A45] flex items-center justify-center mx-auto shadow-md border border-[#C49A45]/40">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C49A45] block">
                  Ayyappa Dairy Farm
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#432713] mt-1">
                  MANIKANTA GHEE
                </h1>
                <p className="text-xs text-[#66594D] mt-1">
                  Restricted Access • Admin & Business Management Portal
                </p>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#432713] uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#70431F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. ayyappadairyfarms@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7DCCB] bg-[#F4EBDD]/20 text-[#432713] text-sm focus:outline-none focus:border-[#C49A45] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#432713] uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#70431F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#E7DCCB] bg-[#F4EBDD]/20 text-[#432713] text-sm focus:outline-none focus:border-[#C49A45] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#70431F] hover:text-[#432713] transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Unlock className="w-4 h-4" /> Unlock Admin Dashboard
              </button>
            </form>

            {/* Security Note */}
            <div className="pt-4 border-t border-[#E7DCCB] text-[11px] text-[#66594D] space-y-2">
              <div className="flex items-center gap-1.5 text-[#70431F] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" /> Secure Admin Verification
              </div>
              <p className="leading-relaxed">
                Credentials are encrypted and loaded from your private environment configuration. This screen is hidden from public customers.
              </p>
            </div>

            {/* Back to Store */}
            <div className="text-center pt-2">
              <a
                href="/"
                className="text-xs text-[#70431F] hover:text-[#C49A45] font-semibold transition-colors"
              >
                ← Return to Public Storefront
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF8] p-6 rounded-3xl border border-[#E7DCCB] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#C49A45] font-bold">
                Business Backend Portal
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                Authorized Session
              </span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#432713] mt-0.5">
              MANIKANTA GHEE — Admin Dashboard
            </h1>
            <p className="text-xs text-[#66594D] mt-1 font-sans">
              Ayyappa Dairy Farm • Live Orders, Newsletter Subscribers & Customer Inquiries
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="btn-outline-brown px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>
            <button
              onClick={clearLocalTestData}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#70431F] bg-[#F4EBDD] hover:bg-[#E7DCCB] border border-[#E7DCCB] transition-colors flex items-center gap-1.5"
              title="Clear old test orders/subscribers from browser cache"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Test Cache
            </button>
            <a
              href="https://supabase.com/dashboard/project/ikcnppjhtazfiwotgmak"
              target="_blank"
              rel="noreferrer"
              className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Database className="w-3.5 h-3.5" /> Supabase Console <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5 shadow-xs"
              title="Lock Admin and Log Out"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock & Log Out
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-semibold text-[#66594D]">Total Revenue</span>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">₹</span>
            </div>
            <p className="font-serif text-3xl font-bold text-[#432713]">₹{totalRevenue}</p>
            <p className="text-[11px] text-[#66594D] mt-1">Across all verified customer orders</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-semibold text-[#66594D]">Total Orders</span>
              <Package className="w-4 h-4 text-[#C49A45]" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#432713]">{orders.length}</p>
            <p className="text-[11px] text-[#66594D] mt-1">Customer buffalo ghee purchases</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-semibold text-[#66594D]">Newsletter Subscribers</span>
              <Mail className="w-4 h-4 text-[#C49A45]" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#432713]">{subscribers.length}</p>
            <p className="text-[11px] text-[#66594D] mt-1">Subscribed for dairy updates & stories</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-semibold text-[#66594D]">Contact Inquiries</span>
              <MessageSquare className="w-4 h-4 text-[#C49A45]" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#432713]">{inquiries.length}</p>
            <p className="text-[11px] text-[#66594D] mt-1">Bulk & general customer queries</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E7DCCB] pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                : 'text-[#432713] hover:bg-[#FFFDF8]'
            }`}
          >
            <Package className="w-4 h-4" /> Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'shipping'
                ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                : 'text-[#432713] hover:bg-[#FFFDF8]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#C49A45]" /> Couriers & Shiprocket ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'subscribers'
                ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                : 'text-[#432713] hover:bg-[#FFFDF8]'
            }`}
          >
            <Mail className="w-4 h-4" /> Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                : 'text-[#432713] hover:bg-[#FFFDF8]'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'supabase'
                ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                : 'text-[#432713] hover:bg-[#FFFDF8]'
            }`}
          >
            <Database className="w-4 h-4" /> Supabase Database & SQL
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#432713]">Customer Orders</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-[#66594D] py-8 text-center">No orders recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4EBDD] text-[#70431F] font-semibold uppercase">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone & Address</th>
                      <th className="p-3">Items Ordered</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3 text-right">Total (₹)</th>
                      <th className="p-3 text-right">Invoice & Label</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DCCB]">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-[#F4EBDD]/20">
                        <td className="p-3 font-mono font-bold text-[#432713]">{o.orderId}</td>
                        <td className="p-3">
                          <p className="font-semibold text-[#432713]">{o.customer?.fullName}</p>
                          <p className="text-[#66594D]">{o.customer?.email}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-[#432713]">{o.customer?.phone}</p>
                          <p className="text-[#66594D] max-w-xs truncate">{o.customer?.addressLine1}, {o.customer?.city}</p>
                        </td>
                        <td className="p-3">
                          {o.items?.map((it, idx) => (
                            <span key={idx} className="block text-[11px] text-[#432713]">
                              {it.quantity}× {it.name} ({it.size})
                            </span>
                          ))}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold block text-[10px]">
                            {o.paymentMethod}
                          </span>
                          {o.paymentId && <span className="text-[10px] text-[#70431F] font-mono block mt-0.5">{o.paymentId}</span>}
                        </td>
                        <td className="p-3 text-right font-bold text-sm text-[#432713]">₹{o.total}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => printTaxInvoiceBill(o)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#432713] text-[#FFFDF8] hover:bg-[#70431F] text-[11px] font-semibold inline-flex items-center gap-1 shadow-xs transition-colors"
                              title="Print Official Tax Invoice & Receipt Bill"
                            >
                              <FileText className="w-3 h-3 text-[#C49A45]" /> Bill Receipt
                            </button>
                            <button
                              onClick={() => printShippingLabel(o)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713] hover:border-[#C49A45] text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                              title="Print Shipping Label"
                            >
                              <Printer className="w-3 h-3 text-[#70431F]" /> Label
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7DCCB] pb-4">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#432713]">Newsletter Subscribers</h3>
                <p className="text-xs text-[#66594D]">Every email entered in the footer is saved here</p>
              </div>
              <button
                onClick={exportSubscribersCSV}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Export to CSV
              </button>
            </div>

            {subscribers.length === 0 ? (
              <p className="text-sm text-[#66594D] py-8 text-center">No subscribers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4EBDD] text-[#70431F] font-semibold uppercase">
                    <tr>
                      <th className="p-3">Subscriber Email</th>
                      <th className="p-3">Brand Entity</th>
                      <th className="p-3 text-right">Date Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DCCB]">
                    {subscribers.map((sub, i) => (
                      <tr key={i} className="hover:bg-[#F4EBDD]/20">
                        <td className="p-3 font-medium text-[#432713]">{sub.email}</td>
                        <td className="p-3 text-[#70431F]">MANIKANTA GHEE — Ayyappa Dairy Farm</td>
                        <td className="p-3 text-right text-[#66594D]">
                          {new Date(sub.subscribed_at).toLocaleDateString()} {new Date(sub.subscribed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#432713]">Customer Contact Messages</h3>
            {inquiries.length === 0 ? (
              <p className="text-sm text-[#66594D] py-8 text-center">No contact messages received yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-[#E7DCCB] bg-[#F4EBDD]/30 space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-[#E7DCCB] pb-2">
                      <div>
                        <span className="font-bold text-sm text-[#432713]">{inq.fullName}</span>
                        <span className="text-[#66594D] block text-[11px]">{inq.email} • {inq.phone}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#C49A45]/20 text-[#70431F] font-semibold uppercase text-[10px]">
                        {inq.subject}
                      </span>
                    </div>
                    <p className="text-[#432713] text-sm pt-1">{inq.message}</p>
                    <p className="text-[10px] text-[#66594D] text-right">
                      Received: {new Date(inq.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Shipping & Couriers (Shiprocket) */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            {/* Success Notification */}
            {shippingSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  {shippingSuccessMsg}
                </span>
                <span className="text-[11px] font-normal text-emerald-700">Delivery agent notified</span>
              </div>
            )}

            {/* Shiprocket Automated API Integration Panel */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DCCB] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-[#C49A45] font-bold">
                      Logistics API Engine
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                      Delhivery & Shadowfax Roadways
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#432713] mt-0.5">
                    Shiprocket API Automation & Doorstep Pickup
                  </h3>
                  <p className="text-xs text-[#66594D] mt-1 font-sans">
                    Automatically book <strong>Delhivery Surface</strong>, <strong>Shadowfax</strong>, or <strong>DTDC</strong> with 1 click. Generates official barcode labels and live customer tracking.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://app.shiprocket.in/login"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Shiprocket Dashboard
                  </a>
                </div>
              </div>

              {/* API Credentials Input Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                <div>
                  <label className="block font-semibold text-[#432713] mb-1">Shiprocket Login Email</label>
                  <input
                    type="email"
                    placeholder="shiprocket-account@gmail.com"
                    value={shiprocketConfig.email}
                    onChange={(e) => setShiprocketConfig({ ...shiprocketConfig, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7DCCB] bg-[#FFFDF8] text-[#432713] text-xs focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#432713] mb-1">Shiprocket Login Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={shiprocketConfig.password}
                    onChange={(e) => setShiprocketConfig({ ...shiprocketConfig, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7DCCB] bg-[#FFFDF8] text-[#432713] text-xs focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#432713] mb-1">Pickup Location Nickname</label>
                  <input
                    type="text"
                    placeholder="Ayyappa Dairy Farm or Primary"
                    value={shiprocketConfig.pickupLocation}
                    onChange={(e) => setShiprocketConfig({ ...shiprocketConfig, pickupLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7DCCB] bg-[#FFFDF8] text-[#432713] text-xs focus:outline-none focus:border-[#C49A45]"
                  />
                  <span className="text-[10px] text-[#70431F]">Must match Pickup Address name in Shiprocket</span>
                </div>

                <div>
                  <label className="block font-semibold text-[#432713] mb-1">Preferred Carrier Mode</label>
                  <select
                    value={shiprocketConfig.preferredCourier}
                    onChange={(e) =>
                      setShiprocketConfig({ ...shiprocketConfig, preferredCourier: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7DCCB] bg-[#FFFDF8] text-[#432713] text-xs focus:outline-none focus:border-[#C49A45]"
                  >
                    <option value="delhivery_surface">Delhivery Surface (Roadways — Best for Ghee)</option>
                    <option value="shadowfax_surface">Shadowfax Surface (Roadways)</option>
                    <option value="surface_lowest_rate">Auto-Assign Lowest Cost Surface</option>
                    <option value="express_air">Express Air (BlueDart / Delhivery Air)</option>
                  </select>
                </div>
              </div>

              {/* Actions & Connection Status */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E7DCCB]">
                <div className="text-[11px] text-[#66594D]">
                  {shiprocketTestResult && (
                    <span
                      className={`inline-flex items-center gap-1.5 font-semibold ${
                        shiprocketTestResult.success ? 'text-emerald-700' : 'text-amber-800'
                      }`}
                    >
                      {shiprocketTestResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      )}
                      {shiprocketTestResult.message}
                    </span>
                  )}
                  {!shiprocketTestResult && (
                    <span>
                      Save your Shiprocket email & password here to enable 1-click automated road parcel dispatch.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    disabled={isTestingShiprocket || !shiprocketConfig.email || !shiprocketConfig.password}
                    onClick={handleTestShiprocket}
                    className="px-3.5 py-1.5 rounded-xl border border-[#C49A45] text-[#70431F] text-xs font-semibold hover:bg-[#F4EBDD] transition-colors disabled:opacity-50"
                  >
                    {isTestingShiprocket ? 'Testing...' : 'Test API Connection'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveShiprocket}
                    className="btn-gold px-4 py-1.5 rounded-xl text-xs font-semibold shadow-xs"
                  >
                    Save API Credentials
                  </button>
                </div>
              </div>
            </div>

            {/* Courier Dispatch Facility & Rules Card */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DCCB] pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#432713]">
                    Yadadri Bhuvanagiri Dispatch Facility
                  </h3>
                  <p className="text-xs text-[#66594D] mt-1 font-sans">
                    Origin address for Delhivery, Shadowfax, and BlueDart pickup vans.
                  </p>
                </div>
              </div>

              {/* 3 Facility Metadata Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#F4EBDD]/40 border border-[#E7DCCB] space-y-1">
                  <span className="font-bold text-[#432713] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A45]" /> Verified Pickup Hub:
                  </span>
                  <p className="text-[#66594D] text-[11px] leading-relaxed">
                    {PICKUP_FACILITY.facilityName}<br />
                    {PICKUP_FACILITY.address}, {PICKUP_FACILITY.city}<br />
                    {PICKUP_FACILITY.state} - <strong>{PICKUP_FACILITY.pincode}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4EBDD]/40 border border-[#E7DCCB] space-y-1">
                  <span className="font-bold text-[#432713] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C49A45]" /> Roadways Carrier Fleet:
                  </span>
                  <p className="text-[#66594D] text-[11px] leading-relaxed">
                    <strong>Delhivery Surface</strong> & <strong>Shadowfax Surface</strong> for secure road transit of heavy ghee jars without cargo cabin pressure leaks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4EBDD]/40 border border-[#E7DCCB] space-y-1">
                  <span className="font-bold text-[#432713] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" /> Packaging Protocol:
                  </span>
                  <p className="text-[#66594D] text-[11px] leading-relaxed">
                    Inflatable Air Column Sleeves + 5-ply outer box + "FRAGILE GLASS GHEE" label mandatory.
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Awaiting Courier Dispatch */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#432713]">
                  Orders Awaiting Courier Dispatch & Label Generation
                </h3>
                <p className="text-xs text-[#66594D] mt-0.5">
                  1-click automated push to Shiprocket (Delhivery / Shadowfax) or manual booking.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#66594D] space-y-2">
                  <Box className="w-8 h-8 opacity-40 mx-auto text-[#C49A45]" />
                  <p>No orders recorded yet. When a customer orders ghee, they will appear here for courier booking.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const { grossWeightKg } = calculatePackageDimensionsAndWeight(order.items || []);
                    const selectedCourier = selectedCouriers[order.orderId] || order.shippingDetails?.courierName || 'Delhivery Surface (Roadways)';
                    const isDispatched = order.status === 'Dispatched' || order.status === 'Delivered';
                    const isPushing = pushingOrderId === order.orderId;

                    return (
                      <div
                        key={order.orderId}
                        className={`p-5 rounded-2xl border transition-all ${
                          isDispatched
                            ? 'bg-[#F4EBDD]/20 border-emerald-300'
                            : 'bg-[#FFFDF8] border-[#E7DCCB] shadow-xs'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Order & Customer Details */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#432713]">
                                #{order.orderId}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  isDispatched
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                                }`}
                              >
                                {isDispatched ? 'Ready for Pickup / In Transit' : 'Pending Courier Booking'}
                              </span>
                              <span className="text-[10px] text-[#66594D]">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-xs font-semibold text-[#432713]">
                              {order.customer.fullName} • Phone: {order.customer.phone}
                            </p>
                            <p className="text-[11px] text-[#66594D] max-w-xl">
                              {order.customer.addressLine1}, {order.customer.city}, {order.customer.state} -{' '}
                              <strong>{order.customer.pincode}</strong>
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#70431F]">
                              <span>
                                <strong>Items:</strong> {order.items.map((it) => `${it.quantity}× ${it.name} (${it.size})`).join(', ')}
                              </span>
                              <span>•</span>
                              <span>
                                <strong>Gross Weight:</strong> {grossWeightKg} KG
                              </span>
                              <span>•</span>
                              <span>
                                <strong>Total:</strong> ₹{order.total} ({order.paymentMethod})
                              </span>
                            </div>
                          </div>

                          {/* Courier Action Box */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
                            {/* Courier Dropdown */}
                            <select
                              value={selectedCourier}
                              disabled={isDispatched}
                              onChange={(e) =>
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [order.orderId]: e.target.value
                                })
                              }
                              className="px-3 py-2 rounded-xl border border-[#E7DCCB] bg-[#F4EBDD]/40 text-xs font-medium text-[#432713] focus:outline-none focus:border-[#C49A45]"
                            >
                              <option value="Delhivery Surface (Roadways)">Delhivery Surface (Roadways)</option>
                              <option value="Shadowfax Surface (Roadways)">Shadowfax Surface (Roadways)</option>
                              <option value="DTDC Surface (Roadways)">DTDC Surface (Roadways)</option>
                              <option value="BlueDart Express Air">BlueDart Express Air (Fragile Safe)</option>
                              <option value="India Post Speed Post">India Post Speed Post (Rural)</option>
                            </select>

                            {/* Book / Auto-Push / Re-book Button */}
                            {!isDispatched ? (
                              <div className="flex items-center gap-2">
                                <button
                                  disabled={isPushing}
                                  onClick={() => handleAutoPushShiprocket(order)}
                                  className="btn-gold px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                                  title="Automatically push to Shiprocket API, choose Delhivery/Shadowfax, and generate live AWB"
                                >
                                  <Zap className="w-3.5 h-3.5 text-[#FFFDF8]" />
                                  {isPushing ? 'Pushing to API...' : '⚡ Auto-Push Shiprocket'}
                                </button>
                                <button
                                  onClick={() => handleBookShipment(order)}
                                  className="px-3 py-2 rounded-xl border border-[#E7DCCB] text-[#70431F] text-xs font-semibold hover:bg-[#F4EBDD] transition-colors"
                                  title="Manual booking without API call"
                                >
                                  Manual
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => printTaxInvoiceBill(order)}
                                  className="btn-gold px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                                  title="Print Official Unique Tax Invoice & Bill Receipt"
                                >
                                  <FileText className="w-3.5 h-3.5" /> Bill Receipt
                                </button>
                                {order.shippingDetails?.labelUrl ? (
                                  <a
                                    href={order.shippingDetails.labelUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-outline-brown px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                                    title="Open Official Carrier Barcode Label"
                                  >
                                    <Printer className="w-3.5 h-3.5 text-[#C49A45]" /> Label PDF
                                  </a>
                                ) : (
                                  <button
                                    onClick={() => printShippingLabel(order)}
                                    className="btn-outline-brown px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                                    title="Print 4x6 / A4 Shipping Label"
                                  >
                                    <Printer className="w-3.5 h-3.5 text-[#C49A45]" /> Label
                                  </button>
                                )}
                                {order.shippingDetails?.trackingUrl && (
                                  <a
                                    href={order.shippingDetails.trackingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-100 transition-colors"
                                  >
                                    AWB: {order.shippingDetails.awbNumber} <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Supabase Cloud Setup */}
        {activeTab === 'supabase' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#C49A45]">
                Supabase PostgreSQL Cloud Tables
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#432713] mt-1">
                How to View Your Backend in Supabase
              </h3>
              <p className="text-xs sm:text-sm text-[#66594D] mt-1">
                Your project is connected to Supabase URL: <code className="bg-[#F4EBDD] px-2 py-0.5 rounded font-mono text-xs text-[#432713]">https://ikcnppjhtazfiwotgmak.supabase.co</code>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 1-Minute Supabase Database Setup:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Log in to your project at: <a href="https://supabase.com/dashboard/project/ikcnppjhtazfiwotgmak" target="_blank" rel="noreferrer" className="underline font-bold">Supabase Dashboard</a></li>
                <li>Click on <strong>SQL Editor</strong> on the left sidebar.</li>
                <li>Click <strong>New Query</strong>, paste the script below, and click <strong>Run</strong>!</li>
                <li>Now click <strong>Table Editor</strong> on the left sidebar. You will see <code>subscribers</code>, <code>orders</code>, and <code>inquiries</code> with live rows!</li>
              </ol>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#432713] uppercase tracking-wider">
                  Supabase Table Creation SQL Script:
                </span>
                <button
                  onClick={copySQL}
                  className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm"
                >
                  {copiedSQL ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy SQL
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#432713] text-[#F4EBDD] text-xs font-mono overflow-x-auto max-h-80 leading-relaxed">
                {sqlSchemaScript}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
