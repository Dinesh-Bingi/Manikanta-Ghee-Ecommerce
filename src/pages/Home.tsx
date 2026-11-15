import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, Star, HeartHandshake, Eye, Award } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { BuffaloIntegrityBanner } from '../components/BuffaloIntegrityBanner';
import { PRODUCTS, BRAND_DETAILS } from '../data/products';
import { TRADITIONAL_BILONA_STEPS, MODERN_BUFFALO_STEPS } from '../data/processData';
import { CUSTOMER_REVIEWS, SAMPLE_DISCLAIMER_NOTICE } from '../data/testimonials';

export const Home: React.FC = () => {
  return (
    <div className="bg-[#F4EBDD] overflow-hidden">
      {/* 4.B HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C49A45]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Editorial Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E7DCCB] text-[#70431F] text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C49A45] animate-pulse" />
              100% Pure Buffalo Ghee Only
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#432713] font-medium leading-[1.12] tracking-tight">
              THE GOLDEN ESSENCE OF TRADITION.
            </h1>

            {/* Subheading */}
            <p className="font-sans text-lg sm:text-xl text-[#66594D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Pure buffalo ghee, crafted with tradition and brought to your home with care.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="btn-gold w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                Explore Our Ghee
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/our-story"
                className="btn-outline-brown w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 bg-[#FFFDF8]"
              >
                Our Story
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-[#E7DCCB] grid grid-cols-3 gap-3 text-left">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#432713]">100%</p>
                <p className="text-[11px] text-[#66594D] uppercase tracking-wider font-medium">Buffalo Milk</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#432713]">Bilona</p>
                <p className="text-[11px] text-[#66594D] uppercase tracking-wider font-medium">Hand Churned</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#432713]">Danedar</p>
                <p className="text-[11px] text-[#66594D] uppercase tracking-wider font-medium">Golden Grain</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Product Image Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Visual Glass Jar Presentation Card */}
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[#E7DCCB] bg-[#FFFDF8]">
              <img
                src="/images/hero_jar.png"
                alt="MANIKANTA GHEE Premium Buffalo Ghee Glass Jar with vintage brass spoon"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#432713]/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Reassurance Floating Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#E7DCCB] shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#70431F] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
                    Artisanal Indian Dairy
                  </div>
                  <h4 className="font-serif text-lg text-[#432713] font-medium">
                    Manikanta Pure Buffalo Ghee
                  </h4>
                  <p className="text-xs text-[#66594D]">
                    Naturally rich in aroma & granular crystal structure
                  </p>
                </div>
                <Link
                  to="/shop"
                  className="w-9 h-9 rounded-full bg-[#C49A45] text-[#FFFDF8] flex items-center justify-center hover:bg-[#70431F] transition-colors flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4.C BRAND INTRODUCTION (Split Layout) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] border-y border-[#E7DCCB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Buffalo Dairy Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E7DCCB] shadow-lg relative bg-[#F4EBDD]">
              <img
                src="/images/murrah_buffaloes.png"
                alt="Majestic Indian Murrah water buffaloes grazing in lush green rural pasture"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#432713]/90 text-[#FFFDF8] text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md border border-[#C49A45]/40 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                100% Indian Murrah Buffalo Milk Only
              </div>
            </div>
          </motion.div>

          {/* Text Story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A45]/15 text-[#70431F] text-xs font-semibold tracking-widest uppercase">
              Pure Dairy Heritage
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#432713] font-medium leading-tight">
              Rooted in Tradition. Made for Every Home.
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#66594D] leading-relaxed">
              At MANIKANTA, we believe that great ghee begins with quality milk, thoughtful preparation and respect for traditional craftsmanship.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#66594D] leading-relaxed">
              We specialize exclusively in pure buffalo ghee. The rich, creamy milk of indigenous Indian water buffaloes yields higher natural milk fat, giving our ghee its prized golden-grainy texture, elevated 250°C smoke point, and unmistakable nutty fragrance that enlivens everyday meals.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#432713] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#C49A45] flex-shrink-0" />
                <span>Zero cow milk blending — Strictly 100% buffalo milk</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#432713] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#C49A45] flex-shrink-0" />
                <span>Naturally granular (danedar) texture without artificial chilling</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#432713] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#C49A45] flex-shrink-0" />
                <span>Prepared with verified lab testing for absolute non-adulteration</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#70431F] hover:text-[#C49A45] transition-colors"
              >
                Read our complete heritage story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4.D SHOP OUR GHEE (Two Category Cards) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          kicker="Our Product Collection"
          title="Two Distinct Expressions of Buffalo Ghee"
          subtitle="Whether you seek the slow-churned Vedic Bilona method or modern culinary clarity, both categories are made exclusively from 100% pure buffalo milk."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4.E OUR CRAFT / PRODUCTION PROCESS TEASER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] border-y border-[#E7DCCB]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            kicker="The Craft of Clarification"
            title="Honoring Two Distinct Traditions"
            subtitle="We never confuse traditional Bilona curd-churning with modern cream-clarification. Here is how each method achieves its signature purity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Traditional Bilona Category Box */}
            <div className="p-8 rounded-3xl bg-[#F4EBDD]/60 border border-[#E7DCCB] hover:border-[#C49A45] transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#E7DCCB]">
                  <img
                    src="/images/bilona_process.png"
                    alt="Traditional Vedic Bilona wooden churning process in clay pot"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#C49A45] text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider">
                    6-Stage Vedic Method
                  </span>
                  <span className="text-xs text-[#70431F] font-semibold">Slow Earthen Curd Churning</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#432713] mb-3">
                  Traditional A2 Bilona Buffalo Ghee
                </h3>
                <p className="text-sm text-[#66594D] leading-relaxed mb-6">
                  Rooted in ancient Ayurveda. We naturally ferment whole buffalo milk into curd in clay pots, hand-churn it bidirectionally with a wooden bilona to extract makkhan butter, and slow-simmer over firewood embers.
                </p>

                {/* Steps Mini Flow */}
                <div className="space-y-2 mb-6">
                  {TRADITIONAL_BILONA_STEPS.slice(0, 4).map((step) => (
                    <div key={step.stepNumber} className="flex items-center gap-3 text-xs text-[#432713]">
                      <span className="w-5 h-5 rounded-full bg-[#432713] text-[#FFFDF8] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {step.stepNumber}
                      </span>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  ))}
                  <p className="text-xs text-[#70431F] italic pl-8">+ 2 more stages of firewood simmering and muslin filtration</p>
                </div>
              </div>

              <Link
                to="/our-process"
                className="w-full btn-gold py-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Explore Bilona Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Modern Buffalo Category Box */}
            <div className="p-8 rounded-3xl bg-[#F4EBDD]/60 border border-[#E7DCCB] hover:border-[#C49A45] transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#E7DCCB]">
                  <img
                    src="/images/modern_product.png"
                    alt="Manikanta Modern Buffalo Ghee jar with golden clarified ghee"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#70431F] text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider">
                    4-Stage Modern Method
                  </span>
                  <span className="text-xs text-[#70431F] font-semibold">Thermal Precision Clarification</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#432713] mb-3">
                  Modern Buffalo Ghee
                </h3>
                <p className="text-sm text-[#66594D] leading-relaxed mb-6">
                  Tailored for contemporary everyday culinary excellence. Fresh buffalo cream is separated and clarified in sealed stainless-steel kettles with digital temperature control, preserving clean buttery flavor and high smoke stability.
                </p>

                {/* Steps Mini Flow */}
                <div className="space-y-2 mb-6">
                  {MODERN_BUFFALO_STEPS.map((step) => (
                    <div key={step.stepNumber} className="flex items-center gap-3 text-xs text-[#432713]">
                      <span className="w-5 h-5 rounded-full bg-[#70431F] text-[#FFFDF8] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {step.stepNumber}
                      </span>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/our-process"
                className="w-full btn-outline-brown bg-[#FFFDF8] py-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Explore Modern Process <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.F WHY MANIKANTA? (4 Feature Pillars) */}
      <BuffaloIntegrityBanner />

      {/* 4.G LIFESTYLE SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EBDD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Lifestyle Photography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#E7DCCB] relative">
                <img
                  src="/images/lifestyle_pour.png"
                  alt="Golden pure buffalo ghee being gently poured over hot phulkas and dal tadka in warm sunlight"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#432713]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E7DCCB] text-xs text-[#432713] flex items-center justify-between">
                  <div>
                    <p className="font-serif text-base font-semibold">Everyday Indian Culinary Bliss</p>
                    <p className="text-[#66594D]">Rich aroma, high smoke point, and unmistakable golden clarity</p>
                  </div>
                  <span className="text-[#C49A45] font-bold text-sm">250°C</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Editorial Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A45]/15 text-[#70431F] text-xs font-semibold uppercase tracking-widest">
                Culinary Soul
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#432713] font-medium leading-tight">
                A Little Golden Goodness in Every Meal.
              </h2>

              <p className="text-base text-[#66594D] leading-relaxed font-sans">
                In Indian kitchens, ghee is not merely an ingredient; it is a sacred blessing that connects hearth, home, and family.
              </p>

              <p className="text-sm text-[#66594D] leading-relaxed font-sans">
                A spoonful of Manikanta Buffalo Ghee poured over steaming hot rice, freshly roasted phulkas, or sizzling dal tadka unlocks a warm, toasted fragrance that fills the entire home. With its natural thermal endurance, it preserves delicate spice aromatics without smoking or losing nuance.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E7DCCB]">
                  <p className="font-serif text-2xl font-bold text-[#432713]">250°C</p>
                  <p className="text-xs text-[#66594D] mt-1">High Thermal Smoke Point for Sautéing</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E7DCCB]">
                  <p className="font-serif text-2xl font-bold text-[#432713]">100%</p>
                  <p className="text-xs text-[#66594D] mt-1">Pure Buffalo Milk Fat • Zero Palm Oil</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Bring Golden Goodness Home <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4.H BRAND STORY SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#432713] text-[#FFFDF8] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8]/10 text-[#C49A45] text-xs font-semibold uppercase tracking-[0.2em] border border-[#C49A45]/30">
            Our Heritage & Commitment
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
            More Than Ghee. A Tradition We Carry Forward.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#F4EBDD]/80 leading-relaxed max-w-3xl mx-auto">
            MANIKANTA was born from a singular conviction: that the authentic richness of pure Indian buffalo ghee deserves to be preserved with uncompromising dignity. We honor the farmers who rear our buffaloes with kindness, the age-old clay curd vessels of our ancestors, and the modern families who demand transparent purity on their dining table.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/our-story"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C49A45] text-[#FFFDF8] font-semibold text-xs uppercase tracking-wider hover:bg-[#B38936] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Our Complete Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/our-process"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#F4EBDD]/40 text-[#F4EBDD] font-semibold text-xs uppercase tracking-wider hover:bg-[#FFFDF8]/10 transition-all flex items-center justify-center gap-2"
            >
              View Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* 4.I CUSTOMER REVIEWS / TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          kicker="Customer Experiences"
          title="Loved in Kitchens Across India"
          subtitle="Read honest feedback from home chefs, traditional cooks, and families who celebrate the authentic grain and aroma of Manikanta Buffalo Ghee."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CUSTOMER_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E7DCCB] hover:border-[#C49A45] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C49A45] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C49A45] text-[#C49A45]" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-[#432713] font-medium mb-2 leading-snug">
                  "{review.title}"
                </h4>
                <p className="text-xs sm:text-sm text-[#66594D] leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7DCCB]/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#432713]">{review.author}</p>
                  <p className="text-[#66594D]">{review.city}</p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Sample Disclaimer */}
        <p className="text-center text-xs text-[#66594D]/75 italic max-w-2xl mx-auto">
          {SAMPLE_DISCLAIMER_NOTICE}
        </p>
      </section>
    </div>
  );
};
