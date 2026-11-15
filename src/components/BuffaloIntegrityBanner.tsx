import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Flame, CheckCircle, PackageCheck, Droplets } from 'lucide-react';

export const BuffaloIntegrityBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const pillars = [
    {
      icon: Droplets,
      title: 'Buffalo Milk Only',
      desc: '100% single-source pure Indian water buffalo milk. Strictly zero cow milk blending.'
    },
    {
      icon: Sparkles,
      title: 'Tradition-Inspired Craftsmanship',
      desc: 'Authentic slow Vedic Bilona and standardized thermal clarification methods.'
    },
    {
      icon: Flame,
      title: 'High Smoke Point (250°C)',
      desc: 'Naturally stable for daily deep frying, golden tadka, and traditional Indian sweets.'
    },
    {
      icon: PackageCheck,
      title: 'Carefully Packed in Glass',
      desc: 'Airtight food-grade glass jars preserving natural grain structure and nutty fragrance.'
    }
  ];

  if (compact) {
    return (
      <div className="bg-[#FFFDF8] border-y border-[#E7DCCB] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#70431F]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
            <span className="font-semibold text-[#432713]">Brand Integrity:</span>
            <span>Exclusively Pure Buffalo Ghee (Zero Cow Milk)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#C49A45]" />
            <span>Tested for Adulteration & Chemical Purity</span>
          </div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-[#C49A45]" />
            <span>Direct Safe Dispatch Across India</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#FFFDF8] border-y border-[#E7DCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F4EBDD]/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center flex-shrink-0 text-[#C49A45] shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#432713] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
