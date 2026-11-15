import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { totalItemsCount, openCart } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnterShop = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsShopDropdownOpen(true);
  };

  const handleMouseLeaveShop = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 200);
  };

  const isShopActive =
    location.pathname === '/shop' ||
    location.pathname === '/traditional-a2-bilona-buffalo-ghee' ||
    location.pathname === '/modern-buffalo-ghee' ||
    location.pathname.startsWith('/product');

  return (
    <>
      {/* Top Announcement Ribbon */}
      <div className="bg-[#432713] text-[#FFFDF8] py-2 px-4 text-xs tracking-wide font-sans relative z-40 border-b border-[#C49A45]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45] flex-shrink-0" />
            <span>
              <strong>100% Pure Buffalo Ghee Only</strong> • Complimentary Delivery On Orders Above ₹999 Across India
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-[#F4EBDD]/95 backdrop-blur-md shadow-sm border-b border-[#E7DCCB] py-3.5'
            : 'bg-[#F4EBDD]/80 backdrop-blur-xs py-4 border-b border-[#E7DCCB]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* 1. Left Column: Brand Logo & Tagline (Fixed Width Container) */}
            <div className="flex-shrink-0 min-w-[200px] sm:min-w-[240px]">
              <Link to="/" className="inline-flex flex-col group">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#432713] flex items-center justify-center border border-[#C49A45] shadow-xs flex-shrink-0">
                    {/* Stylized Ghee Diwa / Kalash Droplet */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 3C12 3 6 10 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 10 12 3 12 3Z"
                        fill="#C49A45"
                      />
                      <circle cx="12" cy="15" r="2.5" fill="#FFFDF8" />
                    </svg>
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.08em] text-[#432713] group-hover:text-[#70431F] transition-colors leading-none">
                    MANIKANTA
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#70431F] font-semibold pl-[46px] mt-1 font-sans block">
                  Tradition • Purity • Quality
                </span>
              </Link>
            </div>

            {/* 2. Center Column: Exact Navigation Links (Home | Shop | Our Story | Our Process | Contact) */}
            <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 flex-1 px-4">
              {/* Home */}
              <Link
                to="/"
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 ${
                  location.pathname === '/'
                    ? 'text-[#70431F] font-bold'
                    : 'text-[#432713] hover:text-[#C49A45]'
                }`}
              >
                Home
                {location.pathname === '/' && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C49A45] rounded-full"
                  />
                )}
              </Link>

              {/* Shop with Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
              >
                <Link
                  to="/shop"
                  className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors inline-flex items-center gap-1.5 py-1 ${
                    isShopActive
                      ? 'text-[#70431F] font-bold'
                      : 'text-[#432713] hover:text-[#C49A45]'
                  }`}
                >
                  Shop
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isShopDropdownOpen ? 'rotate-180 text-[#C49A45]' : 'text-[#66594D]'
                    }`}
                  />
                  {isShopActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C49A45] rounded-full"
                    />
                  )}
                </Link>

                {/* Luxury Dropdown Menu */}
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50"
                    >
                      <div className="bg-[#FFFDF8] rounded-2xl shadow-xl border border-[#E7DCCB] p-3 space-y-1 overflow-hidden">
                        {/* Category 1: Traditional A2 Bilona */}
                        <Link
                          to="/traditional-a2-bilona-buffalo-ghee"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4EBDD]/60 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#C49A45] flex-shrink-0 mt-0.5 group-hover:border-[#C49A45]">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[#C49A45] block">
                              Vedic Hand-Churned
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#432713] group-hover:text-[#70431F]">
                              Traditional A2 Bilona Buffalo Ghee
                            </h4>
                            <p className="text-[11px] text-[#66594D] mt-0.5 line-clamp-1">
                              Cultured curd churn, coarse danedar grain
                            </p>
                          </div>
                        </Link>

                        {/* Category 2: Modern Buffalo Ghee */}
                        <Link
                          to="/modern-buffalo-ghee"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4EBDD]/60 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#F4EBDD] border border-[#E7DCCB] flex items-center justify-center text-[#70431F] flex-shrink-0 mt-0.5 group-hover:border-[#C49A45]">
                            <Flame className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[#70431F] block">
                              Everyday Clarified
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#432713] group-hover:text-[#70431F]">
                              Modern Buffalo Ghee
                            </h4>
                            <p className="text-[11px] text-[#66594D] mt-0.5 line-clamp-1">
                              250°C smoke point for daily rotis & tadka
                            </p>
                          </div>
                        </Link>

                        {/* Divider & All Products Link */}
                        <div className="pt-2 border-t border-[#E7DCCB]/60 px-3 pb-1">
                          <Link
                            to="/shop"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="text-xs font-semibold text-[#70431F] hover:text-[#C49A45] flex items-center justify-between transition-colors py-1"
                          >
                            <span>Explore All Buffalo Ghee Jars</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Our Story */}
              <Link
                to="/our-story"
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 ${
                  location.pathname === '/our-story'
                    ? 'text-[#70431F] font-bold'
                    : 'text-[#432713] hover:text-[#C49A45]'
                }`}
              >
                Our Story
                {location.pathname === '/our-story' && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C49A45] rounded-full"
                  />
                )}
              </Link>

              {/* Our Process */}
              <Link
                to="/our-process"
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 ${
                  location.pathname === '/our-process'
                    ? 'text-[#70431F] font-bold'
                    : 'text-[#432713] hover:text-[#C49A45]'
                }`}
              >
                Our Process
                {location.pathname === '/our-process' && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C49A45] rounded-full"
                  />
                )}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 ${
                  location.pathname === '/contact'
                    ? 'text-[#70431F] font-bold'
                    : 'text-[#432713] hover:text-[#C49A45]'
                }`}
              >
                Contact
                {location.pathname === '/contact' && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C49A45] rounded-full"
                  />
                )}
              </Link>
            </nav>

            {/* 3. Right Column: Action Icons (Search, Account, Bag, Mobile Toggle) */}
            <div className="flex-shrink-0 min-w-[140px] sm:min-w-[180px] flex items-center justify-end gap-2 sm:gap-3.5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-[#E7DCCB]/70 text-[#432713] transition-colors"
                aria-label="Search buffalo ghee"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Link */}
              <Link
                to="/account"
                className="p-2 rounded-full hover:bg-[#E7DCCB]/70 text-[#432713] transition-colors"
                aria-label="My Account"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Shopping Bag Button with Counter */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full hover:bg-[#E7DCCB]/70 text-[#432713] transition-colors flex items-center justify-center"
                aria-label="Open Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#C49A45] text-[#FFFDF8] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#432713] hover:bg-[#E7DCCB]/70 transition-colors ml-1"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#FFFDF8] border-b border-[#E7DCCB] shadow-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                <div className="text-xs uppercase tracking-widest text-[#70431F] font-semibold mb-2">
                  Navigation
                </div>

                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#432713] hover:bg-[#F4EBDD]"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 text-[#C49A45]" />
                  </Link>

                  <div className="py-2 px-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#70431F] block mb-2">
                      Shop Categories
                    </span>
                    <div className="space-y-1.5 pl-2 border-l-2 border-[#C49A45]/40">
                      <Link
                        to="/shop"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1.5 text-xs font-semibold text-[#432713] hover:text-[#C49A45]"
                      >
                        All Buffalo Ghee Products
                      </Link>
                      <Link
                        to="/traditional-a2-bilona-buffalo-ghee"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1.5 text-xs font-medium text-[#66594D] hover:text-[#C49A45]"
                      >
                        🏺 Traditional A2 Bilona Buffalo Ghee
                      </Link>
                      <Link
                        to="/modern-buffalo-ghee"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1.5 text-xs font-medium text-[#66594D] hover:text-[#C49A45]"
                      >
                        🍲 Modern Buffalo Ghee
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/our-story"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#432713] hover:bg-[#F4EBDD]"
                  >
                    <span>Our Story</span>
                    <ChevronRight className="w-4 h-4 text-[#C49A45]" />
                  </Link>

                  <Link
                    to="/our-process"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#432713] hover:bg-[#F4EBDD]"
                  >
                    <span>Our Process</span>
                    <ChevronRight className="w-4 h-4 text-[#C49A45]" />
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#432713] hover:bg-[#F4EBDD]"
                  >
                    <span>Contact</span>
                    <ChevronRight className="w-4 h-4 text-[#C49A45]" />
                  </Link>
                </div>

                <div className="pt-4 border-t border-[#E7DCCB] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-[#66594D]">
                    <span>Pure Buffalo Ghee Only</span>
                    <span className="font-semibold text-[#70431F]">Tradition • Purity • Quality</span>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full btn-outline-brown text-center py-2.5 rounded-xl text-xs font-semibold"
                  >
                    My Account & Past Orders
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
