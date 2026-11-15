import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND_DETAILS } from '../data/products';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'refund';

interface LegalPolicyProps {
  initialTab?: PolicyType;
}

export const LegalPolicy: React.FC<LegalPolicyProps> = ({ initialTab }) => {
  const location = useLocation();

  const getTabFromPath = (): PolicyType => {
    const path = location.pathname.toLowerCase();
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('terms')) return 'terms';
    if (path.includes('shipping')) return 'shipping';
    if (path.includes('refund') || path.includes('return')) return 'refund';
    return initialTab || 'privacy';
  };

  const [activeTab, setActiveTab] = useState<PolicyType>(getTabFromPath);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const tabs: { id: PolicyType; label: string; icon: any; path: string }[] = [
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: ShieldCheck,
      path: '/privacy-policy'
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: FileText,
      path: '/terms-and-conditions'
    },
    {
      id: 'shipping',
      label: 'Shipping & Delivery',
      icon: Truck,
      path: '/shipping-policy'
    },
    {
      id: 'refund',
      label: 'Return & Refund Policy',
      icon: RotateCcw,
      path: '/refund-policy'
    }
  ];

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="Trust & Purity Protocol"
          title="Official Brand Policies & Legal Terms"
          subtitle="MANIKANTA GHEE (Ayyappa Dairy Farm) is committed to absolute transparency, food-grade purity, and customer safety."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-5 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#432713] px-3 pb-2 border-b border-[#E7DCCB] mb-2">
                Policy Directory
              </h3>
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <Link
                    key={t.id}
                    to={t.path}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                        : 'text-[#432713] hover:bg-[#F4EBDD]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#C49A45]' : 'text-[#70431F]'}`} />
                      {t.label}
                    </span>
                    <span className="text-xs">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Dairy Origin & Support Badge */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 shadow-xs space-y-4 text-xs font-sans">
              <div className="flex items-center gap-2.5 text-[#432713] font-bold border-b border-[#E7DCCB] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#C49A45]" />
                <span>Dairy Farm Headquarters</span>
              </div>
              <div className="space-y-2.5 text-[#66594D]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C49A45] flex-shrink-0 mt-0.5" />
                  <span>{BRAND_DETAILS.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                  <span>{BRAND_DETAILS.phone} (Direct & WhatsApp)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                  <span>{BRAND_DETAILS.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                  <span>Dispatch Mon – Sat: 8:00 AM – 7:00 PM IST</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 sm:p-12 shadow-sm space-y-8 text-sm font-sans text-[#66594D] leading-relaxed"
            >
              {/* =========================================================================
                  1. PRIVACY POLICY
              ========================================================================= */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
                      Data Safety & Confidentiality
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
                      Privacy Policy
                    </h1>
                    <p className="text-xs text-[#70431F] mt-1 font-mono">
                      Last Updated: November 2026 • Effective for all patrons across India
                    </p>
                  </div>

                  <p>
                    At <strong>MANIKANTA GHEE</strong> (operating under <strong>Ayyappa Dairy Farm</strong>), we honor the sanctity of your personal data with the same devotion we give to our pure Bilona curd-churning traditions. This Privacy Policy details how we collect, handle, and protect your information when you visit our website or purchase pure Indian water buffalo ghee.
                  </p>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      1. Information We Collect
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Customer Details:</strong> Name, delivery address, postal pincode, phone number, and email address provided during checkout, account creation, or newsletter enrollment.
                      </li>
                      <li>
                        <strong>Transaction Records:</strong> Order identifiers, items ordered, dispatch timestamps, and Razorpay payment reference IDs.
                      </li>
                      <li>
                        <strong>Technical Data:</strong> Browser session state, postal transit serviceability inquiries, and anonymous analytics to enhance store usability.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      2. Payment Security & Zero Card Storage
                    </h3>
                    <p>
                      All digital transactions on our website are processed through <strong>Razorpay Payment Gateway</strong>, which adheres to strict <strong>PCI-DSS Level 1 compliance</strong> and 256-bit SSL encryption. <strong>MANIKANTA GHEE never stores or has access to your credit/debit card numbers, CVV codes, bank login credentials, or UPI PINs.</strong>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      3. How We Use Your Information
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>To pack, insure, and dispatch sealed glass jars of pure buffalo ghee directly to your doorstep.</li>
                      <li>To send automated order confirmations, official tax receipts, and courier AWB tracking links via email and WhatsApp.</li>
                      <li>To notify patrons of seasonal festive small-batch churnings (only with your prior opt-in consent).</li>
                      <li><strong>Zero Data Selling:</strong> We never sell, rent, or lease customer contact lists to any marketing brokers or third parties.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      4. Contact Our Privacy Officer
                    </h3>
                    <p>
                      If you wish to review, update, or permanently delete your contact record from our dairy database, please write to us at{' '}
                      <a href="mailto:ayyappadairyfarms@gmail.com" className="font-bold text-[#C49A45] underline">
                        ayyappadairyfarms@gmail.com
                      </a>{' '}
                      or message our customer care team at <strong>+91 6303328180</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  2. TERMS AND CONDITIONS
              ========================================================================= */}
              {activeTab === 'terms' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
                      Patron Agreement
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
                      Terms & Conditions
                    </h1>
                    <p className="text-xs text-[#70431F] mt-1 font-mono">
                      Last Updated: November 2026 • Governing Law: Telangana, India
                    </p>
                  </div>

                  <p>
                    Welcome to <strong>MANIKANTA GHEE</strong>. By accessing this website or placing an order for our buffalo ghee products, you agree to be bound by the following terms, conditions, and farm operational standards.
                  </p>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      1. Brand Integrity & Purity Pledge
                    </h3>
                    <p>
                      MANIKANTA GHEE guarantees that every jar sold is prepared exclusively from <strong>100% pure Indian water buffalo milk fat</strong>. We operate an absolute zero-tolerance policy against:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Zero cow milk blending or cross-handling.</li>
                      <li>Zero adulteration with vegetable oils, palm fats, or hydrogenated vanaspati.</li>
                      <li>Zero artificial yellow dyes, synthetic fragrances, or chemical stabilizers.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      2. Product Pricing & Invoicing
                    </h3>
                    <p>
                      All prices displayed on the website are in Indian National Rupees (INR) and are <strong>inclusive of all applicable taxes (5% GST under Dairy HSN 0405 9020)</strong>. Shipping fees are computed transparently at checkout before order finalization.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      3. Order Acceptance & Inventory
                    </h3>
                    <p>
                      Our Traditional A2 Bilona Buffalo Ghee is crafted in small seasonal batches from cultured whole buffalo curd. While we maintain active inventory, high festive demand may occasionally cause a 24–48 hour batch ripening schedule. In such cases, customers will be promptly informed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      4. Legal Jurisdiction
                    </h3>
                    <p>
                      Any dispute, controversy, or claim arising out of or relating to purchases made through this website shall be governed by and construed in accordance with the laws of the State of Telangana, subject to the exclusive jurisdiction of the competent courts in <strong>Yadadri Bhuvanagiri District, Telangana, India</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  3. SHIPPING & DELIVERY POLICY
              ========================================================================= */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
                      Fragile Glass Safe Transit
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
                      Shipping & Delivery Policy
                    </h1>
                    <p className="text-xs text-[#70431F] mt-1 font-mono">
                      Doorstep Express Dispatch from Yadadri Bhuvanagiri, Telangana 508105
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F4EBDD]/50 border border-[#C49A45]/40 flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#C49A45] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#432713] text-sm">Complimentary Free Delivery:</h4>
                      <p className="text-xs text-[#66594D] mt-0.5">
                        All orders of ₹999 and above automatically qualify for <strong>FREE Express Shipping</strong> anywhere across India! Standard shipping fee of ₹90 applies on smaller orders.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      1. Logistics & Courier Partners
                    </h3>
                    <p>
                      We partner with India's premier air cargo and express courier carriers to guarantee quick transit and safe handling of fragile glass jars:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-xl bg-[#F4EBDD]/30 border border-[#E7DCCB]">
                        <p className="font-bold text-[#432713]">BlueDart Express Air</p>
                        <p className="text-[#66594D] mt-1">Priority fragile courier with real-time GPS tracking.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F4EBDD]/30 border border-[#E7DCCB]">
                        <p className="font-bold text-[#432713]">Delhivery Direct Air</p>
                        <p className="text-[#66594D] mt-1">Nationwide pincode reach covering 19,000+ Indian postal codes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      2. Transit Timelines by Region
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Telangana & Hyderabad Metro:</strong> 1 – 2 Business Days</li>
                      <li><strong>South India Metros (Bengaluru, Chennai):</strong> 2 – 3 Business Days</li>
                      <li><strong>National Metros (Mumbai, Delhi NCR, Kolkata, Pune):</strong> 2 – 4 Business Days</li>
                      <li><strong>Rest of India / Tier-2 & Tier-3 Towns:</strong> 3 – 5 Business Days</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      3. Shock-Resistant Glass Packaging
                    </h3>
                    <p>
                      Every glass jar is vacuum-sealed with food-grade protective nitrogen cushioning and encased inside an <strong>inflatable shock-absorbing multi-chamber air column</strong>. Jars are placed inside a double-wall corrugated shipping carton engineered to withstand drops up to 1.5 meters.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      4. Live Shipment Tracking
                    </h3>
                    <p>
                      Once your parcel is scanned at our dispatch hub in Yadadri Bhuvanagiri, you will receive an automated Airway Bill (AWB) number and direct tracking link via email. You can also monitor your live shipment status anytime in your <Link to="/account" className="font-bold text-[#C49A45] underline">My Account dashboard</Link>.
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  4. RETURN & REFUND POLICY
              ========================================================================= */}
              {activeTab === 'refund' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
                      Customer Assurance Guarantee
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium mt-1">
                      Return & Refund Policy
                    </h1>
                    <p className="text-xs text-[#70431F] mt-1 font-mono">
                      Food Safety Compliance & 100% Free Transit Damage Replacement
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-950">Food Safety Regulation Notice:</h4>
                      <p className="mt-0.5 leading-relaxed">
                        In accordance with Indian Food Safety and Standards (FSSAI) guidelines, edible dairy items sealed under sterile conditions cannot be returned once the protective jar seal is broken.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      1. 100% Free Replacement Guarantee
                    </h3>
                    <p>
                      If your order arrives damaged, broken, leaking, or if the vacuum seal has been compromised during transit:
                    </p>
                    <div className="p-5 rounded-2xl bg-[#F4EBDD]/40 border border-[#C49A45]/40 space-y-2 text-xs">
                      <p className="font-bold text-[#432713] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Hassle-Free 48-Hour Claim Process:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-[#66594D]">
                        <li>Take a clear photo or short video of the damaged glass jar and the shipping label on the box.</li>
                        <li>Send it to our WhatsApp support at <strong>+91 6303328180</strong> or email <strong>ayyappadairyfarms@gmail.com</strong> within 48 hours of delivery.</li>
                        <li>Our team will immediately dispatch a fresh replacement jar via priority air cargo at <strong>zero additional cost</strong>.</li>
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      2. Refund Processing Timelines
                    </h3>
                    <p>
                      In cases where a replacement cannot be provided, or if an order cancellation is approved prior to dispatch:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs">
                      <li><strong>Prepaid Orders (UPI / Cards / Net Banking):</strong> Full refund will be credited back to the original source account via Razorpay within <strong>5 to 7 business banking days</strong>.</li>
                      <li><strong>Cash on Delivery (COD) Orders:</strong> In eligible refund circumstances, refunds are issued via instant UPI bank transfer directly to the verified recipient.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-[#432713] font-semibold border-b border-[#E7DCCB] pb-2">
                      3. Order Cancellation
                    </h3>
                    <p>
                      Orders may be cancelled free of charge if requested before the shipment has been dispatched from our dairy facility. Please notify us immediately via WhatsApp at <strong>+91 6303328180</strong> with your Order ID.
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Support Callout */}
              <div className="pt-6 border-t border-[#E7DCCB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-[#432713]">Have questions regarding our policies?</p>
                  <p className="text-xs text-[#66594D]">Our dairy customer care team is available daily.</p>
                </div>
                <Link
                  to="/contact"
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact Support Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
