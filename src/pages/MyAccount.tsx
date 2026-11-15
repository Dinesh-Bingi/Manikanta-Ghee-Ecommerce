import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  MapPin,
  RefreshCw,
  FileText,
  User,
  ShieldCheck,
  ChevronRight,
  Truck,
  Calendar,
  Sparkles,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/SectionHeading';
import { printTaxInvoiceBill } from '../lib/shipping';

interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export const MyAccount: React.FC = () => {
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'subscription' | 'reports'>('orders');

  // Customer Dynamic Addresses (Saved by the customer themselves)
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    try {
      const stored = localStorage.getItem('manikanta_saved_addresses');
      if (stored) return JSON.parse(stored);
      return [];
    } catch {
      return [];
    }
  });

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Telangana',
    pincode: ''
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.addressLine1 || !addressForm.city || !addressForm.pincode) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      ...addressForm,
      isDefault: addresses.length === 0
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    localStorage.setItem('manikanta_saved_addresses', JSON.stringify(updated));
    setIsAddingNewAddress(false);
    setAddressForm({
      label: 'Home',
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: 'Telangana',
      pincode: ''
    });
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('manikanta_saved_addresses', JSON.stringify(updated));
  };

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="Customer Portal"
          title="My Account & Dairy Subscriptions"
          subtitle="Manage your past orders, tracked shipments, delivery addresses, and monthly buffalo ghee allocations."
        />

        {/* Dashboard Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs space-y-2">
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#E7DCCB] mb-2">
                <div className="w-12 h-12 rounded-full bg-[#432713] text-[#C49A45] flex items-center justify-center font-serif text-xl font-bold">
                  MG
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#432713]">Manikanta Patron</h3>
                  <p className="text-xs text-[#66594D]">Verified Buffalo Ghee Member</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                    : 'text-[#432713] hover:bg-[#F4EBDD]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#C49A45]" /> Orders & Tracking ({orders.length})
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('subscription')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'subscription'
                    ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                    : 'text-[#432713] hover:bg-[#F4EBDD]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#C49A45]" /> Monthly Ghee Allocation
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                    : 'text-[#432713] hover:bg-[#F4EBDD]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C49A45]" /> Saved Addresses
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'reports'
                    ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                    : 'text-[#432713] hover:bg-[#F4EBDD]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#C49A45]" /> Lab Testing Certificates
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] text-xs text-[#70431F] space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C49A45]" /> Brand Guarantee:
              </p>
              <p className="text-[#66594D] leading-relaxed">
                Every jar dispatch is logged with its production batch and sealed under protective nitrogen cushioning.
              </p>
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="lg:col-span-8">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs">
                  <h3 className="font-serif text-2xl text-[#432713] font-medium mb-6 pb-3 border-b border-[#E7DCCB]">
                    Order History & Live Dispatch Tracking
                  </h3>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#C49A45] mx-auto">
                        <Package className="w-8 h-8 opacity-60" />
                      </div>
                      <h4 className="font-serif text-xl text-[#432713]">No Orders Placed Yet</h4>
                      <p className="text-xs sm:text-sm text-[#66594D] max-w-sm mx-auto">
                        Experience the golden essence of traditional Bilona or modern clarified buffalo ghee.
                      </p>
                      <Link
                        to="/shop"
                        className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm"
                      >
                        Explore Our Ghee
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order.orderId}
                          className="p-6 rounded-2xl border border-[#E7DCCB] bg-[#F4EBDD]/30 space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7DCCB] pb-3 text-xs">
                            <div>
                              <span className="font-serif text-base font-bold text-[#432713]">
                                Order #{order.orderId}
                              </span>
                              <span className="text-[#66594D] block text-[11px] mt-0.5">
                                Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
                                {order.status}
                              </span>
                              <span className="font-serif text-base font-bold text-[#432713]">
                                ₹{order.total}
                              </span>
                            </div>
                          </div>

                          {/* Items in this order */}
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover border border-[#E7DCCB]"
                                  />
                                  <div>
                                    <p className="font-semibold text-[#432713]">{item.name}</p>
                                    <p className="text-[#66594D]">Size: {item.size} • Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <span className="font-semibold text-[#432713]">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Courier Shipment Bar */}
                          <div className="pt-3 border-t border-[#E7DCCB] text-xs space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#70431F] font-medium">
                              <span className="flex items-center gap-1.5">
                                <Truck className="w-4 h-4 text-[#C49A45]" />{' '}
                                <strong>Courier:</strong> {order.shippingDetails?.courierName || 'BlueDart Express Air'} (AWB: {order.shippingDetails?.awbNumber || `MK-${order.orderId}`})
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  {order.shippingDetails?.pickupStatus || 'Packed & Insured'}
                                </span>
                                {order.shippingDetails?.trackingUrl && (
                                  <a
                                    href={order.shippingDetails.trackingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-bold text-[#C49A45] hover:underline"
                                  >
                                    Track Live →
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#E7DCCB]/60">
                              <div className="text-[#66594D] text-[11px]">
                                Delivering to: {order.customer.fullName}, {order.customer.addressLine1}, {order.customer.city} - {order.customer.pincode}
                                {order.shippingDetails?.estimatedDelivery && (
                                  <span className="ml-2 font-semibold text-[#432713]">• Expected by {order.shippingDetails.estimatedDelivery}</span>
                                )}
                              </div>
                              <button
                                onClick={() => printTaxInvoiceBill(order)}
                                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#432713] text-[#FFFDF8] hover:bg-[#70431F] text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                                title="Download Official Tax Invoice Bill"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#C49A45]" /> Bill Receipt
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-[#E7DCCB] pb-4">
                  <span className="text-xs uppercase tracking-widest text-[#C49A45] font-semibold">
                    Fresh Heritage Batches
                  </span>
                  <h3 className="font-serif text-2xl text-[#432713] font-medium mt-1">
                    Monthly Buffalo Ghee Allocation Club
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66594D] mt-1 font-sans">
                    Reserve jars from our weekly dawn Bilona churns or fresh modern clarification batches. Delivered automatically on the 1st of every month with 15% subscriber privilege.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl border border-[#C49A45] bg-[#F4EBDD]/40 space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C49A45] text-[#FFFDF8] text-[10px] font-bold uppercase tracking-wider">
                      Vedic Bilona Reserve
                    </span>
                    <h4 className="font-serif text-lg text-[#432713] font-semibold">
                      1000ml Monthly Bilona Jar
                    </h4>
                    <p className="text-xs text-[#66594D]">
                      Guaranteed allocation from the first week’s earthen pot curd churn.
                    </p>
                    <p className="font-serif text-xl font-bold text-[#432713]">
                      ₹1,435 <span className="text-xs font-normal text-[#66594D]">/ month (Save ₹255)</span>
                    </p>
                    <button className="w-full btn-gold py-2 rounded-xl text-xs font-semibold uppercase tracking-wider">
                      Subscribe to Bilona Club
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-[#E7DCCB] bg-[#FFFDF8] space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#70431F] text-[#FFFDF8] text-[10px] font-bold uppercase tracking-wider">
                      Everyday Culinary Reserve
                    </span>
                    <h4 className="font-serif text-lg text-[#432713] font-semibold">
                      1000ml Monthly Modern Ghee
                    </h4>
                    <p className="text-xs text-[#66594D]">
                      Freshly clarified for daily high-heat Indian kitchen cooking.
                    </p>
                    <p className="font-serif text-xl font-bold text-[#432713]">
                      ₹950 <span className="text-xs font-normal text-[#66594D]">/ month (Save ₹170)</span>
                    </p>
                    <button className="w-full btn-outline-brown py-2 rounded-xl text-xs font-semibold uppercase tracking-wider">
                      Subscribe to Modern Club
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DCCB] pb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#432713] font-medium">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-[#66594D] mt-0.5">
                      Manage your delivery locations for fast 1-click checkout.
                    </p>
                  </div>
                  {!isAddingNewAddress && (
                    <button
                      onClick={() => setIsAddingNewAddress(true)}
                      className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New Address
                    </button>
                  )}
                </div>

                {/* Add New Address Form Modal/Panel */}
                {isAddingNewAddress && (
                  <form onSubmit={handleSaveAddress} className="p-5 rounded-2xl bg-[#F4EBDD]/40 border border-[#C49A45] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E7DCCB] pb-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#432713]">
                        Enter Your Delivery Address
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="text-xs text-[#70431F] hover:underline"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">Address Label</label>
                        <select
                          value={addressForm.label}
                          onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        >
                          <option value="Home">Home (Residence)</option>
                          <option value="Office">Office / Workplace</option>
                          <option value="Farm / Facility">Farm / Facility</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                          placeholder="Recipient full name"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">6-Digit Pincode</label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                          placeholder="e.g. 500039"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-[#432713] mb-1">Flat, House No., Building, Street</label>
                        <input
                          type="text"
                          required
                          value={addressForm.addressLine1}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                          placeholder="e.g. House No. 4-12, Main Road"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">City / Town</label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          placeholder="e.g. Hyderabad"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#432713] mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          placeholder="e.g. Telangana"
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF8] border border-[#E7DCCB] text-[#432713]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="px-4 py-2 rounded-lg border border-[#E7DCCB] text-xs font-semibold text-[#70431F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-gold px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Saved Addresses List */}
                {addresses.length === 0 && !isAddingNewAddress ? (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-[#E7DCCB] bg-[#F4EBDD]/20 space-y-3">
                    <MapPin className="w-8 h-8 text-[#C49A45] opacity-50 mx-auto" />
                    <h4 className="font-serif text-lg text-[#432713]">No Addresses Saved Yet</h4>
                    <p className="text-xs text-[#66594D] max-w-sm mx-auto">
                      You haven't saved any delivery addresses yet. Add your address or it will be saved automatically when you place your first order.
                    </p>
                    <button
                      onClick={() => setIsAddingNewAddress(true)}
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Delivery Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-5 rounded-2xl border border-[#C49A45] bg-[#F4EBDD]/30 space-y-2 text-xs relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#432713]">{addr.label}</span>
                          <div className="flex items-center gap-2">
                            {addr.isDefault && (
                              <span className="text-[10px] uppercase font-bold text-[#C49A45] bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#C49A45]/40">
                                Default
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete this address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="font-semibold text-[#432713]">{addr.fullName}</p>
                        <p className="text-[#66594D] font-sans leading-relaxed">
                          {addr.addressLine1}{addr.addressLine2 ? ', ' + addr.addressLine2 : ''}<br />
                          {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        </p>
                        {addr.phone && (
                          <p className="text-[#70431F] font-medium pt-1">Contact: {addr.phone}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-4">
                  Laboratory Test Reports & Certificates
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    {
                      title: 'Batch MK-BIL-2026-11 Purity & Adulteration Certificate',
                      lab: 'National Dairy Research & Quality Laboratory',
                      date: 'Nov 2026',
                      result: '100% Pure Buffalo Milk Fat (Zero cow milk / vegetable fats)'
                    },
                    {
                      title: 'A2 Beta-Casein Protein Variant Characterization',
                      lab: 'Certified Food & Dairy Chromatography Institute',
                      date: 'Oct 2026',
                      result: 'Pure A2 Variant Conformation'
                    },
                    {
                      title: 'FSSAI License & Hygiene Compliance Statement',
                      lab: 'FSSAI License 11223334000128',
                      date: 'Valid through 2028',
                      result: 'Grade A Processing Standards'
                    }
                  ].map((cert, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E7DCCB] bg-[#F4EBDD]/30 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-[#432713]">{cert.title}</p>
                        <p className="text-[#66594D]">{cert.lab} • {cert.date}</p>
                        <p className="text-emerald-700 font-medium mt-1">Status: {cert.result}</p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-[#C49A45] text-[#FFFDF8] font-semibold text-[11px] cursor-pointer hover:bg-[#70431F] transition-colors">
                        View Report
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
