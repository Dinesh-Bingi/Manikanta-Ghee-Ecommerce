import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Info,
  Droplets,
  Flame,
  Check
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { TRADITIONAL_BILONA_STEPS, MODERN_BUFFALO_STEPS } from '../data/processData';

export const OurProcess: React.FC = () => {
  const [activeProcessTab, setActiveProcessTab] = useState<'bilona' | 'modern'>('bilona');

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <SectionHeading
          kicker="Artisanship & Science"
          title="Our Production Processes"
          subtitle="We maintain strict transparency: Our Traditional A2 Bilona Buffalo Ghee and Modern Buffalo Ghee follow two completely independent craft methodologies."
        />

        {/* Process Selector Switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FFFDF8] p-1.5 rounded-2xl border border-[#E7DCCB] shadow-sm flex items-center gap-2">
            <button
              onClick={() => setActiveProcessTab('bilona')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeProcessTab === 'bilona'
                  ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                  : 'text-[#66594D] hover:text-[#432713] hover:bg-[#F4EBDD]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              Traditional Vedic Bilona (6 Stages)
            </button>
            <button
              onClick={() => setActiveProcessTab('modern')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeProcessTab === 'modern'
                  ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                  : 'text-[#66594D] hover:text-[#432713] hover:bg-[#F4EBDD]'
              }`}
            >
              <Flame className="w-4 h-4 text-[#C49A45]" />
              Modern Clarified Ghee (4 Stages)
            </button>
          </div>
        </div>

        {/* Dynamic Process Content */}
        {activeProcessTab === 'bilona' ? (
          <div className="space-y-12">
            {/* Intro Hero Box for Bilona */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#C49A45]/20 text-[#70431F] text-xs font-semibold uppercase tracking-wider">
                  Vedic Hand-Churned Curd Method
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium leading-tight">
                  The Ancient Bilona Method: Pure Cultured Buffalo Curd
                </h3>
                <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
                  Unlike modern industrial ghee made by centrifuging raw uncultured milk cream, genuine Bilona ghee can only be made from <strong>cultured whole curd</strong>.
                </p>
                <p className="text-sm text-[#66594D] leading-relaxed">
                  By culturing whole buffalo milk overnight in unglazed earthen clay pots, beneficial lactic acid bacteria break down lactose and develop complex organic acids. When churned with two-way wooden bilona ropes, the butter retains delicate aromatics and sets into prized coarse crystals (danedar).
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#70431F]">
                  <span>✓ 30 Liters Milk = ~1 Liter Ghee</span>
                  <span>✓ Slow Firewood Simmer</span>
                  <span>✓ Natural Grain Crystallization</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-md">
                  <img
                    src="/images/bilona_process.png"
                    alt="Bilona churning in clay pot"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 6 Steps Timeline */}
            <div className="space-y-6">
              {TRADITIONAL_BILONA_STEPS.map((step) => (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#FFFDF8] rounded-2xl border border-[#E7DCCB] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:border-[#C49A45] transition-all"
                >
                  <div className="lg:col-span-1 flex lg:flex-col items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#432713] text-[#FFFDF8] font-serif text-xl font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[10px] text-[#70431F] font-bold uppercase tracking-widest hidden lg:block text-center">
                      Step {step.stepNumber}
                    </span>
                  </div>

                  <div className="lg:col-span-7 space-y-2">
                    <h4 className="font-serif text-2xl text-[#432713] font-medium">
                      {step.title}
                    </h4>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#C49A45]">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-[#66594D] leading-relaxed pt-1">
                      {step.description}
                    </p>
                    <ul className="pt-2 space-y-1.5 text-xs text-[#432713]">
                      {step.details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C49A45] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 bg-[#F4EBDD]/50 rounded-xl p-4 border border-[#E7DCCB] text-xs text-[#70431F] space-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#66594D] block">
                        Vessel / Equipment:
                      </span>
                      <span className="font-medium text-[#432713]">{step.vesselOrTool}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#66594D] block">
                        Process Duration:
                      </span>
                      <span className="font-medium text-[#432713]">{step.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="text-center pt-4">
              <Link
                to="/product/traditional-a2-bilona-buffalo-ghee"
                className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md"
              >
                Order Traditional A2 Bilona Ghee <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Intro Hero Box for Modern Ghee */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#70431F]/15 text-[#70431F] text-xs font-semibold uppercase tracking-wider">
                  Precision Thermal Clarification
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium leading-tight">
                  Modern Buffalo Ghee: Hygienic Closed-System Clarification
                </h3>
                <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
                  For modern Indian kitchens requiring everyday culinary excellence and a consistent high smoke point (250°C), we employ standardized closed-loop stainless steel clarification.
                </p>
                <p className="text-sm text-[#66594D] leading-relaxed">
                  Farm-fresh buffalo milk is cream-separated under strict sanitary conditions, pasteurized, and simmered in computer-monitored multi-jacketed SS 316 kettles. This gently evaporates moisture without scorching, yielding pure golden clarification.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#70431F]">
                  <span>✓ High Smoke Point 250°C</span>
                  <span>✓ Sterile Closed Environment</span>
                  <span>✓ Zero Palm Oil or Hydrogenated Fats</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-md">
                  <img
                    src="/images/modern_product.png"
                    alt="Modern Buffalo Ghee jar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 4 Steps Timeline */}
            <div className="space-y-6">
              {MODERN_BUFFALO_STEPS.map((step) => (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#FFFDF8] rounded-2xl border border-[#E7DCCB] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:border-[#C49A45] transition-all"
                >
                  <div className="lg:col-span-1 flex lg:flex-col items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#70431F] text-[#FFFDF8] font-serif text-xl font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[10px] text-[#70431F] font-bold uppercase tracking-widest hidden lg:block text-center">
                      Step {step.stepNumber}
                    </span>
                  </div>

                  <div className="lg:col-span-7 space-y-2">
                    <h4 className="font-serif text-2xl text-[#432713] font-medium">
                      {step.title}
                    </h4>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#C49A45]">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-[#66594D] leading-relaxed pt-1">
                      {step.description}
                    </p>
                    <ul className="pt-2 space-y-1.5 text-xs text-[#432713]">
                      {step.details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C49A45] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 bg-[#F4EBDD]/50 rounded-xl p-4 border border-[#E7DCCB] text-xs text-[#70431F] space-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#66594D] block">
                        Equipment Standard:
                      </span>
                      <span className="font-medium text-[#432713]">{step.vesselOrTool}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#66594D] block">
                        Speed & Precision:
                      </span>
                      <span className="font-medium text-[#432713]">{step.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="text-center pt-4">
              <Link
                to="/product/modern-buffalo-ghee"
                className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md"
              >
                Order Modern Buffalo Ghee <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
