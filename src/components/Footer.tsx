import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Instagram, Facebook, Youtube, Check } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';
import { saveSubscriberToSupabase } from '../lib/supabase';
import { sendNewsletterWelcomeEmail } from '../lib/email';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // 1. Save subscriber email into Supabase and localStorage
    await saveSubscriberToSupabase(email);

    // 2. Dispatch real welcome email via EmailJS (if configured)
    await sendNewsletterWelcomeEmail(email);

    setSubscribed(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-[#432713] text-[#F4EBDD] pt-16 pb-12 border-t border-[#70431F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="bg-[#70431F]/40 border border-[#C49A45]/30 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C49A45]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-[#C49A45] text-xs uppercase tracking-[0.2em] font-semibold block mb-2 font-sans">
                Stay Connected With Manikanta
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFFDF8] font-medium leading-tight">
                Discover our products, stories and dairy updates.
              </h3>
              <p className="text-sm text-[#F4EBDD]/75 mt-2 max-w-xl font-sans">
                Join our circle of culinary enthusiasts for seasonal batch releases, traditional Indian recipes, and dairy heritage insights.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#FFFDF8]/10 text-[#FFFDF8] placeholder-[#F4EBDD]/50 border border-[#C49A45]/30 focus:outline-none focus:border-[#C49A45] text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#C49A45] text-[#FFFDF8] font-semibold text-xs tracking-wider uppercase hover:bg-[#B38936] transition-all flex items-center justify-center gap-1.5 shadow-md flex-shrink-0 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    'Subscribing...'
                  ) : subscribed ? (
                    <>
                      <Check className="w-4 h-4" /> Joined
                    </>
                  ) : (
                    <>
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-[#F4EBDD]/60 mt-2 font-sans">
                We respect your privacy. No spam, strictly dairy integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#70431F]/80">
          {/* Brand Info & Pledge */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#70431F] flex items-center justify-center border border-[#C49A45]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3C12 3 6 10 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 10 12 3 12 3Z"
                    fill="#C49A45"
                  />
                  <circle cx="12" cy="15" r="2.5" fill="#FFFDF8" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FFFDF8]">
                MANIKANTA GHEE
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C49A45] font-semibold">
              Tradition • Purity • Quality
            </p>
            <p className="text-sm text-[#F4EBDD]/80 leading-relaxed pr-6 font-sans">
              We manufacture and sell pure buffalo ghee only. Sourced from indigenous Indian water buffalo herds and crafted with reverence for ancient Vedic Bilona and precision hygienic methods.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_DETAILS.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#70431F] flex items-center justify-center text-[#F4EBDD] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#70431F] flex items-center justify-center text-[#F4EBDD] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_DETAILS.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#70431F] flex items-center justify-center text-[#F4EBDD] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] font-medium mb-4 pb-1 border-b border-[#C49A45]/30 inline-block">
              Shop Buffalo Ghee
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link
                  to="/shop"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/traditional-a2-bilona-buffalo-ghee"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Traditional A2 Bilona Ghee
                </Link>
              </li>
              <li>
                <Link
                  to="/modern-buffalo-ghee"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Modern Buffalo Ghee
                </Link>
              </li>
              <li>
                <Link
                  to="/product/traditional-a2-bilona-buffalo-ghee"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Vedic Hand-Churned Jars
                </Link>
              </li>
              <li>
                <Link
                  to="/product/modern-buffalo-ghee"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Everyday Culinary Jars
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Process */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] font-medium mb-4 pb-1 border-b border-[#C49A45]/30 inline-block">
              Heritage & Craft
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link
                  to="/our-story"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link
                  to="/our-process"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  The Bilona Process
                </Link>
              </li>
              <li>
                <Link
                  to="/our-process"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Modern Clarification
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Bulk & Gifting Inquiries
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="text-[#F4EBDD]/80 hover:text-[#C49A45] transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] font-medium mb-4 pb-1 border-b border-[#C49A45]/30 inline-block">
              Customer Support
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-sans text-[#F4EBDD]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A45] flex-shrink-0 mt-0.5" />
                <span>{BRAND_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>{BRAND_DETAILS.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>{BRAND_DETAILS.email}</span>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#70431F] text-[11px] font-semibold text-[#FFFDF8] border border-[#C49A45]/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                  FSSAI Lic: {BRAND_DETAILS.fssaiNumber}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policies and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F4EBDD]/70 font-sans">
          <p>© {new Date().getFullYear()} MANIKANTA GHEE. All rights reserved. Buffalo Ghee Only.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/contact" className="hover:text-[#C49A45] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#C49A45] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-[#C49A45] transition-colors">
              Shipping & Delivery Policy
            </Link>
            <Link to="/contact" className="hover:text-[#C49A45] transition-colors">
              Return & Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
