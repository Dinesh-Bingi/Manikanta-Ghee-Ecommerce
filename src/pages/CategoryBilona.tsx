import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Check, ShoppingBag, ArrowRight, Star, Droplets, Info } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TRADITIONAL_BILONA_STEPS } from '../data/processData';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/SectionHeading';

export const CategoryBilona: React.FC = () => {
  const bilonaProduct = PRODUCTS.find((p) => p.category === 'traditional-bilona')!;
  const [selectedSize, setSelectedSize] = useState(bilonaProduct.jarSizes[1].size); // 500ml default
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const currentOption = bilonaProduct.jarSizes.find((s) => s.size === selectedSize) || bilonaProduct.jarSizes[0];

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(bilonaProduct, selectedSize, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="bg-[#F4EBDD] min-h-screen">
      {/* Category Hero */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Info & Buy Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E7DCCB] text-[#70431F] text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C49A45]" />
              Vedic Bilona Churned • 100% Buffalo Milk Only
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#432713] font-medium leading-tight">
              Traditional A2 Bilona Buffalo Ghee
            </h1>

            <p className="font-sans text-lg text-[#66594D] leading-relaxed">
              An authentic expression of traditional craftsmanship. Slow-churned bidirectionally with wooden churners from naturally cultured buffalo curd.
            </p>

            {/* Price & Size Selector */}
            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] shadow-sm space-y-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-serif font-bold text-[#432713]">
                    ₹{currentOption.price}
                  </span>
                  {currentOption.originalPrice && (
                    <span className="text-sm text-[#66594D] line-through ml-2">
                      ₹{currentOption.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  Fresh Batch In Stock
                </span>
              </div>

              {/* Jar Size Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#432713] uppercase tracking-wider mb-2">
                  Select Jar Volume:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bilonaProduct.jarSizes.map((opt) => (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedSize(opt.size)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                        selectedSize === opt.size
                          ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                          : 'bg-[#F4EBDD]/60 text-[#432713] hover:bg-[#E7DCCB]'
                      }`}
                    >
                      {opt.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-[#E7DCCB] rounded-xl bg-[#F4EBDD]/40 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#432713] hover:text-[#C49A45] text-base px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-[#432713] px-2 font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#432713] hover:text-[#C49A45] text-base px-2 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="flex-1 btn-gold py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Bag (₹{currentOption.price * quantity})
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#66594D] border-t border-[#E7DCCB]/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" /> Verified 100% Buffalo Milk
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" /> Naturally Granular (Danedar)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-[#E7DCCB] bg-[#FFFDF8] shadow-2xl">
              <img
                src={bilonaProduct.heroImage}
                alt="Manikanta Traditional A2 Bilona Buffalo Ghee glass jar with wooden churner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vedic Bilona Craft Deep Dive (6 Stages) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] border-y border-[#E7DCCB]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            kicker="Ancient Vedic Craft"
            title="The 6-Stage Bilona Journey"
            subtitle="We adhere strictly to the traditional curd-based method. Industrial cream separation is never used for our Bilona ghee."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRADITIONAL_BILONA_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-[#F4EBDD]/40 border border-[#E7DCCB] hover:border-[#C49A45] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#432713] text-[#FFFDF8] font-serif font-bold text-lg flex items-center justify-center mb-4 shadow-xs">
                    0{step.stepNumber}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#432713] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#C49A45] font-semibold mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7DCCB]/60 text-[11px] text-[#70431F] space-y-1">
                  <p><strong>Vessel:</strong> {step.vesselOrTool}</p>
                  <p><strong>Timeline:</strong> {step.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Notice & A2 Standards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-[#FFFDF8] border border-[#C49A45]/40 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#C49A45]/15 text-[#C49A45] flex items-center justify-center flex-shrink-0 mt-1">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-xl text-[#432713] font-medium">
              Lab-Verified Purity & Applicable A2 Standards
            </h4>
            <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed font-sans">
              Indigenous Indian water buffalo milk naturally carries the A2 beta-casein protein variant. At Manikanta, our A2 declarations are rooted in certified dairy laboratory screening for protein typing and fatty acid profiles. We never make unsubstantiated medicinal or curative claims — our pride is pure, authentic, traditional food.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#70431F]">
              <span>✓ Certified Murrah Buffalo Herds</span>
              <span>✓ No Palm Oil or Vegetable Fats</span>
              <span>✓ Triple-Filtered Muslin Cloth</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
