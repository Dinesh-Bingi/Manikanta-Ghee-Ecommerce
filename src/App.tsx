import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoryBilona } from './pages/CategoryBilona';
import { CategoryModern } from './pages/CategoryModern';
import { ProductDetails } from './pages/ProductDetails';
import { OurStory } from './pages/OurStory';
import { OurProcess } from './pages/OurProcess';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { MyAccount } from './pages/MyAccount';
import { Admin } from './pages/Admin';
import { LegalPolicy } from './pages/LegalPolicy';

// Auto scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F4EBDD] text-[#432713] selection:bg-[#C49A45]/30 selection:text-[#432713]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/traditional-a2-bilona-buffalo-ghee" element={<CategoryBilona />} />
              <Route path="/modern-buffalo-ghee" element={<CategoryModern />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/our-process" element={<OurProcess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/admin" element={<Admin />} />
              {/* Official Legal & Compliance Policies */}
              <Route path="/privacy-policy" element={<LegalPolicy initialTab="privacy" />} />
              <Route path="/terms-and-conditions" element={<LegalPolicy initialTab="terms" />} />
              <Route path="/shipping-policy" element={<LegalPolicy initialTab="shipping" />} />
              <Route path="/refund-policy" element={<LegalPolicy initialTab="refund" />} />
              {/* Short URL Aliases */}
              <Route path="/privacy" element={<LegalPolicy initialTab="privacy" />} />
              <Route path="/terms" element={<LegalPolicy initialTab="terms" />} />
              <Route path="/shipping" element={<LegalPolicy initialTab="shipping" />} />
              <Route path="/returns" element={<LegalPolicy initialTab="refund" />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
