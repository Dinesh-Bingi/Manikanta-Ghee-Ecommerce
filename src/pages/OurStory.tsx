import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Sparkles, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { BuffaloIntegrityBanner } from '../components/BuffaloIntegrityBanner';

export const OurStory: React.FC = () => {
  return (
    <div className="bg-[#F4EBDD] min-h-screen">
      {/* Story Hero */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E7DCCB] text-[#70431F] text-xs font-semibold uppercase tracking-[0.2em] shadow-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C49A45]" />
          Our Heritage & Ethos
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#432713] font-medium leading-[1.15] mb-6">
          More Than Ghee. A Tradition We Carry Forward.
        </h1>

        <p className="font-sans text-lg sm:text-xl text-[#66594D] leading-relaxed">
          At MANIKANTA, our journey began with a simple revelation: that the authentic, coarse-grained, aromatic buffalo ghee that once defined Indian festive feasts had slowly been displaced by bland, mass-produced commodity fats. We set out to restore that sacred heritage.
        </p>
      </section>

      {/* Visual Image Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[#E7DCCB] relative">
          <img
            src="/images/murrah_buffaloes.png"
            alt="Majestic Indian Murrah water buffaloes in green pastures"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#432713]/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-[#FFFDF8]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C49A45] font-semibold">
                Ethical Buffalo Dairy
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">
                Indian Murrah Water Buffaloes
              </h3>
            </div>
            <span className="text-xs text-[#F4EBDD]/90 bg-[#432713]/80 px-3 py-1.5 rounded-full border border-[#C49A45]/30">
              Pasture Grazed • Zero Cow Milk Blending
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Story Chapters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-20">
        {/* Chapter 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
              Chapter I • The Buffalo Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium leading-tight">
              Why We Devote Ourselves Exclusively to Buffalo Ghee
            </h2>
            <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
              In Indian gastronomy and culinary lore, buffalo milk has always occupied a revered pedestal for making makkhan and ghee. Buffalo milk is naturally denser in wholesome milk solids (7.5% - 8.5% fat), creating a more stable, aromatic, and distinctly granular (danedar) ghee crystal structure.
            </p>
            <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
              When simmered slowly, the milk solids in buffalo butter develop deep caramelized hazelnut nuances that make sweets, rotis, and aromatic biryanis unforgettable.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-md bg-[#FFFDF8]">
              <img
                src="/images/bilona_product.png"
                alt="Manikanta Traditional Bilona Ghee with earthen pot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-md bg-[#FFFDF8]">
              <img
                src="/images/bilona_process.png"
                alt="Traditional wooden bilona churning in terracotta pot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
              Chapter II • The Two Paths
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium leading-tight">
              Honoring Both Vedic Artistry and Modern Precision
            </h2>
            <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
              We recognized that modern Indian households require two distinct ghee experiences:
            </p>
            <ul className="space-y-3 text-sm text-[#432713]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C49A45] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Traditional A2 Bilona Buffalo Ghee:</strong> Handcrafted through ancient overnight whole-curd setting and bidirectional wooden churning for sacred rituals, festive cooking, and deep roasted fragrance.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C49A45] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Modern Buffalo Ghee:</strong> Clarified in closed hygienic stainless steel kettles with digital temperature control, offering families pristine culinary purity at everyday value with a 250°C smoke point.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
              Chapter III • Animal Welfare
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#432713] font-medium leading-tight">
              Ethical Care and Pasture Grazing
            </h2>
            <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
              Purity is not something added at the end; it begins in the lives of our water buffaloes. Our partner herds roam free in verdant pasturelands, drink clean water, and feed on natural seasonal green fodder.
            </p>
            <p className="text-sm sm:text-base text-[#66594D] leading-relaxed">
              We enforce strict zero-tolerance policies against hormonal stimulants (such as oxytocin) or chemical feed additives. A calm, respected animal gives wholesome, nutritious milk that carries natural vitality.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-md bg-[#FFFDF8]">
              <img
                src="/images/lifestyle_pour.png"
                alt="Golden ghee drizzling on warm Indian meal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Integrity Banner */}
      <BuffaloIntegrityBanner />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#432713] text-[#FFFDF8] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-medium">
            Taste the Golden Essence of Tradition
          </h3>
          <p className="text-sm sm:text-base text-[#F4EBDD]/80">
            Choose between our Vedic Bilona and Modern Clarified Buffalo Ghee, delivered fresh to your doorstep in heavy protective glass jars.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md"
            >
              Explore Our Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
