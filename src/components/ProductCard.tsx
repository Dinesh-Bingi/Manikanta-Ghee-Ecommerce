import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(
    product.jarSizes[1]?.size || product.jarSizes[0].size
  );
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const currentOption =
    product.jarSizes.find((o) => o.size === selectedSize) || product.jarSizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedSize, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-luxury rounded-2xl overflow-hidden flex flex-col group relative"
    >
      {/* Category Ribbon / Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
        <span className="bg-[#432713]/90 text-[#FFFDF8] text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-[#C49A45]/30">
          {product.badge || 'Pure Buffalo Ghee'}
        </span>
        <span className="bg-[#FFFDF8]/95 text-[#70431F] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E7DCCB] shadow-xs">
          100% Buffalo Milk Only
        </span>
      </div>

      {/* Product Image Showcase with Hover Zoom */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative aspect-square overflow-hidden bg-[#FBF7F0] border-b border-[#E7DCCB]"
      >
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#432713]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-[#C49A45]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#C49A45] text-[#C49A45]'
                      : 'text-[#C49A45]/40'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#432713]">
              {product.rating}
            </span>
            <span className="text-xs text-[#66594D]">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif text-2xl font-medium text-[#432713] group-hover:text-[#C49A45] transition-colors leading-snug mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-sm text-[#66594D] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Jar Size Selection Chips */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#66594D] font-medium">Select Jar Size:</span>
              <span className="text-[#70431F] font-semibold">{currentOption.size}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {product.jarSizes.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => setSelectedSize(opt.size)}
                  className={`py-1.5 px-1 text-center text-xs rounded-lg font-medium transition-all ${
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
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-4 border-t border-[#E7DCCB]/60">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#432713]">
              ₹{currentOption.price}
            </span>
            {currentOption.originalPrice && (
              <span className="text-sm text-[#66594D]/60 line-through">
                ₹{currentOption.originalPrice}
              </span>
            )}
            <span className="text-xs text-emerald-700 font-semibold ml-auto bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isAdding
                  ? 'bg-emerald-700 text-white'
                  : 'btn-gold shadow-sm'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </>
              )}
            </button>

            <Link
              to={`/product/${product.slug}`}
              className="w-full btn-outline-brown py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:border-[#432713]"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
