import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { BuffaloIntegrityBanner } from '../components/BuffaloIntegrityBanner';
import { PRODUCTS } from '../data/products';
import { GheeCategory } from '../types';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | GheeCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.jarSizes[0].price - b.jarSizes[0].price;
    }
    if (sortBy === 'price-desc') {
      return b.jarSizes[0].price - a.jarSizes[0].price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // featured
  });

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <SectionHeading
          kicker="Authentic Buffalo Dairy"
          title="Explore Our Pure Buffalo Ghee Collection"
          subtitle="Directly sourced from indigenous Indian water buffalo herds. Discover the ancient Vedic Bilona method and modern culinary clarified ghee."
        />

        {/* Category & Sorting Controls */}
        <div className="bg-[#FFFDF8] rounded-2xl border border-[#E7DCCB] p-4 sm:p-6 mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                  : 'bg-[#F4EBDD]/60 text-[#432713] hover:bg-[#E7DCCB]'
              }`}
            >
              All Buffalo Ghee ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('traditional-bilona')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === 'traditional-bilona'
                  ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                  : 'bg-[#F4EBDD]/60 text-[#432713] hover:bg-[#E7DCCB]'
              }`}
            >
              Traditional A2 Bilona
            </button>
            <button
              onClick={() => setSelectedCategory('modern-buffalo')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === 'modern-buffalo'
                  ? 'bg-[#432713] text-[#FFFDF8] shadow-sm'
                  : 'bg-[#F4EBDD]/60 text-[#432713] hover:bg-[#E7DCCB]'
              }`}
            >
              Modern Buffalo Ghee
            </button>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-[#66594D] font-medium whitespace-nowrap">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#F4EBDD] text-[#432713] border border-[#E7DCCB] text-xs font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-[#C49A45]"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#432713] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Buffalo Purity Reassurance */}
        <BuffaloIntegrityBanner compact />

        {/* Category Knowledge Guide Box */}
        <div className="mt-16 bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#C49A45] text-xs uppercase tracking-[0.2em] font-semibold">
              Buyer's Guide
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#432713] font-medium">
              Which Buffalo Ghee Should You Choose?
            </h3>
            <p className="text-sm text-[#66594D] leading-relaxed">
              Both products are crafted exclusively from 100% pure Indian buffalo milk without any cow milk, palm fat, or artificial coloring.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-6">
              <div className="p-5 rounded-2xl bg-[#F4EBDD]/50 border border-[#E7DCCB]">
                <h4 className="font-serif text-lg text-[#432713] font-semibold mb-1">
                  Choose Traditional A2 Bilona
                </h4>
                <p className="text-xs text-[#66594D] leading-relaxed">
                  Best for those seeking ancient Ayurvedic wellness, festive cooking, rich coarse (danedar) texture, and deeply toasted caramel notes. Made from whole cultured buffalo curd churned slowly with wooden churners.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4EBDD]/50 border border-[#E7DCCB]">
                <h4 className="font-serif text-lg text-[#432713] font-semibold mb-1">
                  Choose Modern Buffalo Ghee
                </h4>
                <p className="text-xs text-[#66594D] leading-relaxed">
                  Best for everyday family culinary use: hot rotis, daily dal tadka, sautéing vegetables, and high-heat cooking (250°C smoke point). Clarified in closed hygienic stainless kettles offering clean, silky golden butterfat at everyday value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
