import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  MapPin,
  MessageSquareQuote
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CUSTOMER_REVIEWS, SAMPLE_DISCLAIMER_NOTICE } from '../data/testimonials';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/SectionHeading';
import { estimateDeliveryByPincode } from '../lib/shipping';
import { BuffaloIntegrityBanner } from '../components/BuffaloIntegrityBanner';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const otherProduct = PRODUCTS.find((p) => p.id !== product.id)!;

  const [activeImage, setActiveImage] = useState(product.heroImage);
  const [selectedSize, setSelectedSize] = useState(
    product.jarSizes[1]?.size || product.jarSizes[0].size
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'process' | 'nutrition' | 'storage' | 'lab'>('specs');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Filter reviews for this product
  const reviews = CUSTOMER_REVIEWS.filter((r) => r.productId === product.id);

  const currentOption =
    product.jarSizes.find((o) => o.size === selectedSize) || product.jarSizes[0];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      const est = estimateDeliveryByPincode(pincode);
      if (est.isServiceable) {
        setPincodeStatus(`✓ Available! Expected delivery by ${est.expectedDeliveryDate} via ${est.courierName} (${est.estimatedDays}). Insured fragile glass dispatch from Ayyappa Dairy Farm.`);
      } else {
        setPincodeStatus('Please enter a valid 6-digit Indian postal pincode.');
      }
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian postal pincode.');
    }
  };

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#66594D] mb-8 font-sans">
          <Link to="/" className="hover:text-[#432713] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]" />
          <Link to="/shop" className="hover:text-[#432713] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]" />
          <span className="text-[#432713] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section: Gallery & Purchase Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="aspect-square rounded-3xl overflow-hidden border border-[#E7DCCB] bg-[#FFFDF8] shadow-lg relative group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
                <span className="bg-[#432713]/90 text-[#FFFDF8] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-xs border border-[#C49A45]/30">
                  {product.badge}
                </span>
                <span className="bg-[#FFFDF8]/95 text-[#70431F] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E7DCCB]">
                  100% Buffalo Milk Only
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all bg-[#FFFDF8] ${
                    activeImage === img
                      ? 'border-[#C49A45] shadow-sm scale-95'
                      : 'border-[#E7DCCB] hover:border-[#C49A45]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Pricing, Selectors, CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C49A45]">
                  {product.categoryDisplayName}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#432713] font-medium leading-tight mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-[#C49A45]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C49A45] text-[#C49A45]'
                          : 'text-[#C49A45]/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#432713]">{product.rating}</span>
                <span className="text-xs text-[#66594D]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#432713]">
                  ₹{currentOption.price}
                </span>
                {currentOption.originalPrice && (
                  <span className="text-base text-[#66594D] line-through">
                    ₹{currentOption.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#70431F] font-semibold ml-1">
                  (Incl. of all taxes)
                </span>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                In Stock ({currentOption.sku})
              </span>
            </div>

            {/* Short Tagline & Description */}
            <p className="text-sm text-[#66594D] leading-relaxed font-sans">
              {product.shortDescription}
            </p>

            {/* Jar Size Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#432713] uppercase tracking-wider">
                  Available Jar Sizes:
                </span>
                <span className="text-[#70431F] font-bold">
                  {currentOption.size} (~{currentOption.weightGrams}g net)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.jarSizes.map((opt) => (
                  <button
                    key={opt.size}
                    onClick={() => setSelectedSize(opt.size)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                      selectedSize === opt.size
                        ? 'bg-[#432713] text-[#FFFDF8] shadow-md border-transparent'
                        : 'bg-[#FFFDF8] text-[#432713] border border-[#E7DCCB] hover:border-[#C49A45]'
                    }`}
                  >
                    <span>{opt.size}</span>
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                      ₹{opt.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Dual CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E7DCCB] rounded-xl bg-[#FFFDF8] px-3 py-2.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#432713] hover:text-[#C49A45] text-lg px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-[#432713] px-3 font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#432713] hover:text-[#C49A45] text-lg px-2 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
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

              <button
                onClick={handleBuyNow}
                className="w-full btn-outline-brown bg-[#FFFDF8] py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#C49A45]" /> Buy Now — Instant Checkout
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E7DCCB] text-xs">
              <span className="font-semibold text-[#432713] block mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C49A45]" /> Check Delivery Estimate:
              </span>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#F4EBDD]/50 border border-[#E7DCCB] text-xs text-[#432713] focus:outline-none focus:border-[#C49A45]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#70431F] text-[#FFFDF8] rounded-lg text-xs font-semibold hover:bg-[#432713] transition-colors"
                >
                  Verify
                </button>
              </form>
              {pincodeStatus && (
                <p className="mt-2 text-xs text-[#70431F] font-medium">{pincodeStatus}</p>
              )}
            </div>

            {/* Key Quality Assurances */}
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-[#66594D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>100% Buffalo Milk Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>Free Shipping over ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>Insured Fragile Glass Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                <span>12 Months Shelf Life</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-6 sm:p-10 mb-16 shadow-xs">
          {/* Tab Headers */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E7DCCB] pb-4 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'specs'
                  ? 'bg-[#432713] text-[#FFFDF8]'
                  : 'text-[#66594D] hover:bg-[#F4EBDD]'
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'process'
                  ? 'bg-[#432713] text-[#FFFDF8]'
                  : 'text-[#66594D] hover:bg-[#F4EBDD]'
              }`}
            >
              Craft & Origin
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'nutrition'
                  ? 'bg-[#432713] text-[#FFFDF8]'
                  : 'text-[#66594D] hover:bg-[#F4EBDD]'
              }`}
            >
              Ingredients & Nutrition
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'storage'
                  ? 'bg-[#432713] text-[#FFFDF8]'
                  : 'text-[#66594D] hover:bg-[#F4EBDD]'
              }`}
            >
              Storage & Shelf Life
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'lab'
                  ? 'bg-[#432713] text-[#FFFDF8]'
                  : 'text-[#66594D] hover:bg-[#F4EBDD]'
              }`}
            >
              Lab Testing & Verification
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-sm font-sans text-[#432713]">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3.5 rounded-xl bg-[#F4EBDD]/40 border border-[#E7DCCB] flex justify-between"
                  >
                    <span className="text-xs text-[#66594D] font-medium">{spec.label}</span>
                    <span className="text-xs font-semibold text-[#432713] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-xl font-medium text-[#432713]">
                  Preparation Heritage: {product.name}
                </h3>
                {product.longDescription.map((p, i) => (
                  <p key={i} className="text-[#66594D] leading-relaxed">
                    {p}
                  </p>
                ))}
                <div className="pt-2">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#70431F] mb-2">
                    Key Features of This Category:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#432713]">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#432713] mb-1">
                    Ingredients Statement
                  </h4>
                  <p className="text-xs text-[#66594D]">{product.ingredients}</p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-medium text-[#432713] mb-3">
                    Nutritional Information (Approximate values per 15g serving)
                  </h4>
                  <div className="max-w-xl overflow-hidden rounded-xl border border-[#E7DCCB]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F4EBDD] text-[#70431F] font-semibold">
                        <tr>
                          <th className="p-3">Nutrient Parameter</th>
                          <th className="p-3 text-right">Value per 15g (~1 Tbsp)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7DCCB] bg-[#FFFDF8]">
                        <tr>
                          <td className="p-3 font-medium">Energy</td>
                          <td className="p-3 text-right font-semibold">{product.nutritionalInfo.energyKcal}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Total Milk Fat</td>
                          <td className="p-3 text-right font-semibold">{product.nutritionalInfo.totalFat}</td>
                        </tr>
                        <tr>
                          <td className="p-3 pl-6 text-[#66594D]">Saturated Fat</td>
                          <td className="p-3 text-right">{product.nutritionalInfo.saturatedFat}</td>
                        </tr>
                        <tr>
                          <td className="p-3 pl-6 text-[#66594D]">Monounsaturated Fat</td>
                          <td className="p-3 text-right">{product.nutritionalInfo.monounsaturatedFat}</td>
                        </tr>
                        <tr>
                          <td className="p-3 pl-6 text-[#66594D]">Polyunsaturated Fat</td>
                          <td className="p-3 text-right">{product.nutritionalInfo.polyunsaturatedFat}</td>
                        </tr>
                        <tr>
                          <td className="p-3 pl-6 text-[#66594D]">Trans Fat</td>
                          <td className="p-3 text-right">{product.nutritionalInfo.transFat}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Cholesterol</td>
                          <td className="p-3 text-right">{product.nutritionalInfo.cholesterol}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Carbohydrates / Protein</td>
                          <td className="p-3 text-right">0.0 g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-[#66594D] mt-2 italic">
                    * Values based on standard laboratory testing of pure buffalo milk fat.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-medium text-[#432713]">
                  Storage & Preservation Instructions
                </h4>
                <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed">
                  {product.storageInstructions}
                </p>
                <div className="p-4 rounded-xl bg-[#F4EBDD]/60 border border-[#E7DCCB] text-xs text-[#70431F] space-y-2">
                  <p><strong>Danedar Grain Preservation Tip:</strong> To keep your buffalo ghee coarse and granular, store at room temperature away from heat sources. Chilling in a refrigerator causes rapid uniform solidification that suppresses the classic granular grain.</p>
                  <p><strong>Manufacturing & Packaging:</strong> {product.manufacturingInfo}</p>
                </div>
              </div>
            )}

            {activeTab === 'lab' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-medium text-[#432713]">
                  Certified Laboratory Verification
                </h4>
                <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed">
                  {product.labVerificationNotice}
                </p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
                  <p className="font-semibold">Verification Guarantees:</p>
                  <p>• 100% Indian Water Buffalo Milk Fat (Zero cow milk adulteration)</p>
                  <p>• Total absence of synthetic colors, beta-carotene dyes, or hydrogenated vegetable oils</p>
                  <p>• Tested under Food Safety and Standards Authority of India (FSSAI) compliance standards</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews for this Product */}
        <section className="mb-16">
          <SectionHeading
            align="left"
            kicker="Customer Voices"
            title={`Reviews for ${product.name}`}
            subtitle="Verified reviews and impressions from home kitchens celebrating authentic buffalo ghee."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C49A45] mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C49A45] text-[#C49A45]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-lg text-[#432713] font-medium mb-1">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7DCCB]/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#432713]">{rev.author}</span>
                    <span className="text-[#66594D] block text-[11px]">{rev.city} • {rev.date}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Purchase
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#66594D]/75 italic">
            {SAMPLE_DISCLAIMER_NOTICE}
          </p>
        </section>

        {/* Explore Other Category Recommendation */}
        <section className="bg-[#FFFDF8] rounded-3xl border border-[#E7DCCB] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C49A45] font-semibold">
                Also From Manikanta
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#432713] font-medium mt-1">
                Explore: {otherProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#66594D] max-w-xl mt-1">
                {otherProduct.shortDescription}
              </p>
            </div>
            <Link
              to={`/product/${otherProduct.slug}`}
              className="btn-gold px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 flex-shrink-0"
            >
              View Alternative <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
