import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND_DETAILS } from '../data/products';
import { saveInquiryToSupabase } from '../lib/supabase';
import { sendContactInquiryEmail } from '../lib/email';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveInquiryToSupabase(formState);
    await sendContactInquiryEmail(formState);
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you sell or blend cow ghee in any product?',
      a: 'Never. Manikanta Ghee strictly manufactures and sells 100% pure buffalo ghee only. We do not source cow milk or manufacture cow ghee products.'
    },
    {
      q: 'How is fragile glass jar shipping protected during transit?',
      a: 'We pack each glass jar in custom-molded high-density shock-absorbing honeycomb air cushions and sturdy multi-ply corrugated boxes. In the rare event of transit damage, we provide an immediate no-questions-asked replacement.'
    },
    {
      q: 'What is the shelf life and ideal storage condition?',
      a: 'Both our Bilona and Modern Buffalo Ghee have a shelf life of 12 months from manufacturing. Store at room temperature in a dry pantry away from direct moisture. Do not refrigerate, as cooling inhibits natural danedar grain formation.'
    },
    {
      q: 'Do you offer bulk orders for weddings, temples, and corporate gifting?',
      a: 'Yes! We supply custom-packaged jars and tins for wedding gifting, festive hampers, and institutional culinary kitchens. Select "Bulk & Corporate Gifting" in the contact form or call our support line.'
    }
  ];

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          kicker="Get In Touch"
          title="We Are Here to Assist You"
          subtitle="Whether you have questions regarding our Bilona craft, bulk orders, or your existing shipment, our dairy care team is delighted to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 shadow-xs space-y-6">
              <h3 className="font-serif text-2xl text-[#432713] font-medium border-b border-[#E7DCCB] pb-4">
                Customer Care & Dairy Facility
              </h3>

              <div className="space-y-4 text-sm font-sans text-[#432713]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#C49A45] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#66594D] font-semibold block">
                      Dairy Heritage Center
                    </span>
                    <span className="text-[#432713] leading-relaxed">{BRAND_DETAILS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#C49A45] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#66594D] font-semibold block">
                      Telephone & WhatsApp Support
                    </span>
                    <span className="text-[#432713] font-medium block">{BRAND_DETAILS.phone}</span>
                    <span className="text-xs text-[#70431F]">WhatsApp: {BRAND_DETAILS.whatsapp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#C49A45] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#66594D] font-semibold block">
                      Email Inquiries
                    </span>
                    <span className="text-[#432713] font-medium">{BRAND_DETAILS.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#C49A45] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#66594D] font-semibold block">
                      Operating Hours
                    </span>
                    <span className="text-[#432713]">Monday – Saturday: 9:00 AM – 9.00 PM IST</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4EBDD]/60 border border-[#E7DCCB] text-xs text-[#70431F] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>Certified FSSAI Registration Lic. No. {BRAND_DETAILS.fssaiNumber}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-10 shadow-xs">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#432713] font-medium mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#66594D] mb-6 font-sans">
                Fill in your details and our customer care team will respond within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#432713] font-medium">Thank You!</h4>
                  <p className="text-sm text-[#66594D] max-w-md mx-auto">
                    Your inquiry has been received. Our dairy customer care team will get back to you shortly at {formState.email || 'your email'}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ fullName: '', email: '', phone: '', subject: 'general', message: '' });
                    }}
                    className="btn-outline-brown px-5 py-2 rounded-xl text-xs font-semibold mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.fullName}
                        onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5">
                        Inquiry Nature
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                      >
                        <option value="general">Product Inquiry / Order Assistance</option>
                        <option value="bulk">Bulk & Corporate Festive Gifting</option>
                        <option value="distribution">Retail & Distribution Partnerships</option>
                        <option value="feedback">Quality Feedback / Culinary Story</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#432713] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please share details about your inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EBDD]/50 border border-[#E7DCCB] text-sm text-[#432713] focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-gold py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <section className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[#C49A45] text-xs uppercase tracking-[0.2em] font-semibold">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-3xl text-[#432713] font-medium mt-1">
              Common Questions About Manikanta Ghee
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F4EBDD]/40 border border-[#E7DCCB] space-y-2 text-left"
              >
                <h4 className="font-serif text-lg font-medium text-[#432713] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
