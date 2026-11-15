import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      product.name.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#432713]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-2xl shadow-2xl border border-[#E7DCCB] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-[#E7DCCB] bg-[#F4EBDD]/50">
              <Search className="w-5 h-5 text-[#C49A45] mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pure buffalo ghee, bilona churned, 500ml..."
                className="w-full bg-transparent text-[#432713] placeholder-[#66594D]/60 text-base sm:text-lg focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#66594D] hover:text-[#432713] mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#E7DCCB]/60 text-[#432713] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions / Filter tags */}
            <div className="px-6 py-3 bg-[#FFFDF8] border-b border-[#E7DCCB]/60 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[#66594D] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" /> Suggestions:
              </span>
              <button
                onClick={() => setQuery('Bilona')}
                className="px-2.5 py-1 rounded-full bg-[#F4EBDD] text-[#70431F] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
              >
                Traditional A2 Bilona
              </button>
              <button
                onClick={() => setQuery('Modern')}
                className="px-2.5 py-1 rounded-full bg-[#F4EBDD] text-[#70431F] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
              >
                Modern Buffalo Ghee
              </button>
              <button
                onClick={() => setQuery('500ml')}
                className="px-2.5 py-1 rounded-full bg-[#F4EBDD] text-[#70431F] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
              >
                500ml Jars
              </button>
              <button
                onClick={() => setQuery('Danedar')}
                className="px-2.5 py-1 rounded-full bg-[#F4EBDD] text-[#70431F] hover:bg-[#C49A45] hover:text-[#FFFDF8] transition-colors"
              >
                Danedar Grain
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-base font-serif text-[#432713] mb-1">No buffalo ghee matched "{query}"</p>
                  <p className="text-xs text-[#66594D]">
                    We exclusively sell pure buffalo ghee. Try searching for "Bilona", "Modern", or jar sizes like "500ml".
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl border border-[#E7DCCB] hover:border-[#C49A45] bg-[#FFFDF8] hover:bg-[#F4EBDD]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex items-center gap-4 cursor-pointer flex-1"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F4EBDD] border border-[#E7DCCB] flex-shrink-0">
                        <img
                          src={product.heroImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C49A45]">
                          {product.category === 'traditional-bilona'
                            ? 'Vedic Bilona Churned'
                            : 'Modern Clarified'}
                        </span>
                        <h4 className="font-serif text-lg text-[#432713] hover:text-[#C49A45] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#66594D] line-clamp-1">
                          {product.shortDescription}
                        </p>
                        <p className="text-sm font-semibold text-[#70431F] mt-1">
                          From ₹{product.jarSizes[0].price} <span className="text-xs font-normal text-[#66594D]">({product.jarSizes[0].size})</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          addToCart(product, product.jarSizes[1]?.size || product.jarSizes[0].size, 1);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#C49A45] text-[#FFFDF8] hover:bg-[#70431F] transition-colors"
                      >
                        Quick Add
                      </button>
                      <button
                        onClick={() => handleSelectProduct(product.slug)}
                        className="p-1.5 rounded-lg border border-[#E7DCCB] text-[#432713] hover:border-[#C49A45] hover:text-[#C49A45] transition-colors"
                        title="View details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#F4EBDD]/60 border-t border-[#E7DCCB] flex items-center justify-between text-xs text-[#66594D]">
              <span>100% Pure Buffalo Milk Ghee</span>
              <Link
                to="/shop"
                onClick={onClose}
                className="text-[#70431F] font-semibold hover:underline flex items-center gap-1"
              >
                View all categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
