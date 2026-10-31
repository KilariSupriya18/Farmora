import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Language, UserRole } from '../../types';
import {
  LANDING_CATEGORIES,
  FARMER_SPOTLIGHTS,
  BUYER_PERSONAS,
  CategoryCardData,
} from '../../data/landingData';
import { ProduceCard } from '../marketplace/ProduceCard';
import {
  Sprout,
  Menu,
  X,
  ChevronDown,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Truck,
  Store,
  HeartHandshake,
  BadgePercent,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Send,
  Home,
  Utensils,
  Warehouse,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Heart,
} from 'lucide-react';

interface LandingPageProps {
  onExploreProducts: () => void;
  onJoinFarmer: () => void;
  onOpenProduct: (product: Product) => void;
  onOpenAuth: (mode: 'login' | 'signup', role?: UserRole) => void;
  onSelectCategory: (categoryKey: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreProducts,
  onJoinFarmer,
  onOpenProduct,
  onOpenAuth,
  onSelectCategory,
}) => {
  const { language, setLanguage, products, cartCount, setIsCartOpen, wishlistCount, setIsWishlistOpen, t } = useApp();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Language dropdown in nav
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  // How it works active tab: 'farmers' vs 'buyers'
  const [howItWorksTab, setHowItWorksTab] = useState<'farmers' | 'buyers'>('buyers');
  // Newsletter email state for footer
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'English' },
    { code: 'te', label: 'తెలుగు', script: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी', script: 'हिन्दी' },
  ];

  // Featured sample products (first 4 curated from real catalog)
  const featuredProducts = products.slice(0, 4);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => setNewsletterSent(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-[#FAF6ED] text-stone-900 min-h-screen">
      
      {/* =========================================================================
          SECTION 1. NAVIGATION BAR (Sticky, clean 3-zone, language switch, mobile)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#EBDDC4] px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#285B37] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1E462A] transition-colors">
              <Sprout className="w-5 h-5 text-[#B9D49B]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#285B37] leading-none block">
                Farmora
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase hidden sm:block">
                Direct Farmer Market
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-[#285B37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection('featured-categories')}
              className="hover:text-[#285B37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.exploreProducts}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#285B37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection('about-us')}
              className="hover:text-[#285B37] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.aboutUs}
            </button>
          </nav>

          {/* Right Action Controls: Language, Login, Get Started */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <span>{language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6ED] cursor-pointer ${
                        language === l.code ? 'font-bold text-[#285B37] bg-[#EEF4F0]' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-xl text-stone-700 hover:text-red-500 hover:bg-white border border-[#EBDDC4] transition-colors relative cursor-pointer"
              title={t.nav.wishlist}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#FAF6ED] text-stone-900 border border-[#EBDDC4] leading-none shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-xl text-stone-700 hover:text-[#285B37] hover:bg-white border border-[#EBDDC4] transition-colors relative cursor-pointer"
              title={t.nav.cart}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#F4A261] text-stone-900 leading-none shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#285B37] hover:bg-[#FAF6ED] border border-[#285B37]/30 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.actions.login}
            </button>

            {/* Get Started Primary Button */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#285B37] hover:bg-[#1E462A] text-white shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.nav.getStarted}
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-lg text-stone-700 bg-white border border-[#EBDDC4] relative cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#F4A261] text-stone-900">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Clean Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-[#EBDDC4] space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left py-1.5 hover:text-[#285B37]"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection('featured-categories')}
                className="text-left py-1.5 hover:text-[#285B37]"
              >
                {t.nav.exploreProducts}
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-1.5 hover:text-[#285B37]"
              >
                {t.nav.howItWorks}
              </button>
              <button
                onClick={() => scrollToSection('about-us')}
                className="text-left py-1.5 hover:text-[#285B37]"
              >
                {t.nav.aboutUs}
              </button>
            </nav>

            <div className="pt-2 border-t border-[#EBDDC4] flex items-center justify-between">
              <span className="text-xs text-stone-500 font-semibold">Language:</span>
              <div className="flex items-center gap-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg ${
                      language === l.code ? 'bg-[#285B37] text-white font-bold' : 'bg-white text-stone-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="py-2.5 text-center text-xs font-semibold rounded-xl border border-[#285B37] text-[#285B37] bg-white cursor-pointer"
              >
                {t.actions.login}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="py-2.5 text-center text-xs font-semibold rounded-xl bg-[#285B37] text-white cursor-pointer"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 2. HERO SECTION (Visually striking split layout, farm photo, CTAs)
          ========================================================================= */}
      <section id="home" className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 sm:pt-14 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Supporting Text, CTAs, Trust Indicators */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF4F0] text-[#285B37] text-xs font-semibold border border-[#B9D49B]/50">
              <Sprout className="w-3.5 h-3.5 text-[#285B37]" />
              <span>Direct Agricultural Marketplace · Zero Intermediaries</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#285B37] leading-[1.12] text-balance">
              Fresh from farms. Directly to you.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              Farmora connects hardworking farmers directly with households, grocery retailers, artisan restaurants, and wholesalers. Enjoy authentic produce harvested hours before delivery, while growers receive 100% fair payout.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-7 py-3.5 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>Explore Fresh Produce</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </button>

              <button
                onClick={onJoinFarmer}
                className="px-7 py-3.5 bg-white hover:bg-[#FAF6ED] text-[#285B37] border-2 border-[#285B37] rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sprout className="w-4 h-4 text-[#285B37]" />
                <span>Join as a Farmer</span>
              </button>
            </div>

            {/* Trust Indicators Strip (Clean unboxed metadata) */}
            <div className="pt-6 border-t border-[#EBDDC4] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="font-serif text-2xl font-bold text-[#285B37] block font-mono tabular-nums">
                  500+
                </span>
                <span className="text-xs text-stone-600 block mt-0.5">
                  Verified Local Farmers
                </span>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-[#285B37] block font-mono tabular-nums">
                  100%
                </span>
                <span className="text-xs text-stone-600 block mt-0.5">
                  Direct Farmer Payout
                </span>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-[#285B37] block font-mono tabular-nums">
                  &lt; 24h
                </span>
                <span className="text-xs text-stone-600 block mt-0.5">
                  Harvest to Delivery
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visually striking large photograph with authentic overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-1/1 lg:aspect-4/5 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F4EBD7]">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
                alt="Farmer smiling in lush field with basket of fresh harvest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Gradient Scrim for readable overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#285B37] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#285B37]" />
                    Prakriti Jaivik Farms, Medak
                  </span>
                  <span className="font-mono text-stone-500 text-[11px]">Today 5:30 AM</span>
                </div>
                <p className="text-xs text-stone-700 font-medium">
                  Fresh heirloom vine tomatoes & spinach picked at dawn for morning dispatch.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  <span>Farm Gate Pickup Ready</span>
                  <span aria-hidden="true">·</span>
                  <span>Chilled Van Route Active</span>
                </div>
              </div>
            </div>

            {/* Decorative Sage Stamp */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B9D49B] border-2 border-white text-[#1E462A] flex flex-col items-center justify-center text-center shadow-md p-1 leading-tight rotate-12">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tight">100%</span>
              <span className="text-[9px] sm:text-[10px] font-semibold">Fresh</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3. TRUST / VALUE SECTION
          ========================================================================= */}
      <section className="bg-white border-y border-[#EBDDC4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
              The Farmora Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              A Transparent Supply Chain Built on Real Trust
            </h2>
            <p className="text-sm text-stone-600">
              We cut through multi-layered distributor networks so you receive superior agricultural freshness while farmers earn the income they genuinely deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Direct Farmer Connections */}
            <div className="p-6 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] hover:border-[#B9D49B] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6 text-[#B9D49B]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Direct Farmer Connections
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Know exactly who grew your food. Connect directly with verified growers, learn their soil practices, and trade without any predatory commission.
              </p>
            </div>

            {/* Value 2: Fresh Agricultural Produce */}
            <div className="p-6 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] hover:border-[#B9D49B] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-[#B9D49B]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Fresh Agricultural Produce
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Picked at peak ripeness rather than artificially delayed in aging cold storage. Enjoy maximum natural sweetness, crunch, and nutritional density.
              </p>
            </div>

            {/* Value 3: Transparent Pricing */}
            <div className="p-6 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] hover:border-[#B9D49B] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <BadgePercent className="w-6 h-6 text-[#B9D49B]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Transparent Pricing
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Clear per-unit prices with published tiered volume discounts. Zero hidden broker markups or inflated retail chain distributor margins.
              </p>
            </div>

            {/* Value 4: Pickup and Delivery Options */}
            <div className="p-6 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] hover:border-[#B9D49B] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6 text-[#B9D49B]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Pickup & Delivery Options
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Flexible fulfilment: Collect fresh crates directly at the farm gate for free, or schedule temperature-logged chilled delivery to your home or dock.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4. FEATURED CATEGORIES
          ========================================================================= */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 lg:px-8 py-14 sm:py-20 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
              Curated Harvests
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Featured Categories
            </h2>
            <p className="text-sm text-stone-600">
              Select any category to browse seasonal harvests from local farming communities.
            </p>
          </div>

          <button
            onClick={onExploreProducts}
            className="text-xs sm:text-sm font-semibold text-[#285B37] hover:text-[#1E462A] flex items-center gap-1.5 cursor-pointer underline underline-offset-4 self-start sm:self-auto"
          >
            <span>View All Produce</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANDING_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryKey)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-[#EBDDC4] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Photography */}
              <img
                src={cat.imageUrl}
                alt={cat.name[language]}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-1.5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#B9D49B] uppercase tracking-wider">
                    {cat.itemCount} Fresh Batches
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#285B37] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#B9D49B] transition-colors">
                  {cat.name[language]}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {cat.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5. FEATURED PRODUCTS
          ========================================================================= */}
      <section className="bg-white border-y border-[#EBDDC4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
                Today's Best Picks
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Featured Farm Products
              </h2>
              <p className="text-sm text-stone-600">
                Directly available for immediate delivery or farm gate collection.
              </p>
            </div>

            <button
              onClick={onExploreProducts}
              className="text-xs sm:text-sm font-semibold text-[#285B37] hover:text-[#1E462A] flex items-center gap-1.5 cursor-pointer underline underline-offset-4 self-start sm:self-auto"
            >
              <span>Explore All {products.length} Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProduceCard
                key={p.id}
                product={p}
                onSelect={onOpenProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6. HOW FARMORA WORKS (Two separate flows: Farmers vs Buyers)
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 lg:px-8 py-14 sm:py-20 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
            Transparent Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            How Farmora Works
          </h2>
          <p className="text-sm text-stone-600">
            A streamlined digital marketplace engineered for agricultural honesty and frictionless logistics.
          </p>

          {/* Interactive Flow Switcher */}
          <div className="inline-flex p-1 bg-white rounded-2xl border border-[#EBDDC4] mt-2">
            <button
              onClick={() => setHowItWorksTab('buyers')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                howItWorksTab === 'buyers'
                  ? 'bg-[#285B37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              For Buyers (Households & B2B)
            </button>
            <button
              onClick={() => setHowItWorksTab('farmers')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                howItWorksTab === 'farmers'
                  ? 'bg-[#285B37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              For Farmers & Producers
            </button>
          </div>
        </div>

        {/* Dynamic Flow View */}
        {howItWorksTab === 'buyers' ? (
          /* Buyer Flow */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#B9D49B] block font-mono">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Explore Produce
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Browse real-time morning harvests by category, farm location, or organic certification. See harvest timestamps and transparent farmer profiles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#B9D49B] block font-mono">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Select Quantity & Tier
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Choose small household quantities or take advantage of tiered bulk discounts for retail stores, restaurants, and wholesale traders.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#B9D49B] block font-mono">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Choose Fulfilment
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Opt for free direct farm gate pickup to meet the grower in person, or select refrigerated chilled doorstep delivery in convenient time slots.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#B9D49B] block font-mono">
                04
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Receive Fresh Produce
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Get field-fresh harvests packed with care. Pay conveniently via UPI, Cash on Delivery, or Net-30 invoice with zero broker markups.
              </p>
            </div>

          </div>
        ) : (
          /* Farmer Flow */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#285B37] block font-mono">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Register Your Farm
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Create your verified grower profile in under 2 minutes. Enter your farm location, land acreage, and organic or natural farming credentials.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#285B37] block font-mono">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                List Fresh Batches
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Upload your crops, specify harvest dates, set your base price per kg/crate, and configure wholesale tiers to attract commercial buyers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#285B37] block font-mono">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Receive Direct Orders
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Get instant notifications on your phone when local families, nearby stores, or city restaurants book your produce.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBDDC4] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#285B37] block font-mono">
                04
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Fulfil & Get Paid 100%
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Hand over crates during scheduled farm gate visits or load onto Farmora chilled transport vans. Receive direct bank payout with 0% platform cuts.
              </p>
            </div>

          </div>
        )}

      </section>

      {/* =========================================================================
          SECTION 7. FARMER SPOTLIGHT
          ========================================================================= */}
      <section id="about-us" className="bg-[#FAF6ED] border-y border-[#EBDDC4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
              Meet the Stewards of the Soil
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Farmer Spotlight
            </h2>
            <p className="text-sm text-stone-600">
              Real stories from generational and progressive farmers who bring natural, honest food to our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FARMER_SPOTLIGHTS.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white rounded-3xl border border-[#EBDDC4] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Portrait with Badge */}
                  <div className="relative aspect-4/3 w-full bg-[#FAF6ED] overflow-hidden">
                    <img
                      src={farmer.imageUrl}
                      alt={farmer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#285B37] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B9D49B]" />
                      <span>{farmer.specialty[language]}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        {farmer.name}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{farmer.location}, {farmer.state}</span>
                      </p>
                    </div>

                    <div className="text-xs text-[#285B37] font-semibold flex items-center gap-2 py-1 border-y border-[#EBDDC4]/50">
                      <span>{farmer.experienceYears} Years Farming</span>
                      <span aria-hidden="true">·</span>
                      <span>{farmer.landAcreage} Acres</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {farmer.bio[language]}
                    </p>
                  </div>
                </div>

                {/* Farmer Quote */}
                <div className="p-6 pt-0">
                  <div className="p-3.5 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/70">
                    <p className="text-xs italic text-stone-700 leading-relaxed">
                      "{farmer.quote[language]}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8. WHO CAN BUY?
          ========================================================================= */}
      <section className="bg-white border-b border-[#EBDDC4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#285B37] block">
              Multi-Scale Agricultural Procurement
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Who Can Buy on Farmora?
            </h2>
            <p className="text-sm text-stone-600">
              From family dinner tables to commercial distribution mandis, Farmora caters to every scale of demand with tailored pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_PERSONAS.map((buyer) => {
              const Icon =
                buyer.iconName === 'Home'
                  ? Home
                  : buyer.iconName === 'Store'
                  ? Store
                  : buyer.iconName === 'Utensils'
                  ? Utensils
                  : Warehouse;

              return (
                <div
                  key={buyer.id}
                  className="p-6 rounded-3xl bg-[#FAF6ED]/60 border border-[#EBDDC4] hover:border-[#285B37] transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#285B37] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 text-[#B9D49B]" />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        {buyer.title[language]}
                      </h3>
                      <span className="text-xs font-semibold text-[#285B37] block mt-0.5">
                        {buyer.subtitle[language]}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 block mt-0.5">
                        Scale: {buyer.scale}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {buyer.description[language]}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-[#EBDDC4]/60">
                      {buyer.benefits[language].map((b, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#285B37] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onOpenAuth('signup', buyer.roleKey)}
                    className="w-full py-2.5 rounded-xl border border-[#285B37] text-[#285B37] hover:bg-[#285B37] hover:text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Start as {buyer.title[language]}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9. CALL TO ACTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14 sm:py-20">
        <div className="rounded-3xl bg-[#285B37] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-lg">
          
          {/* Subtle background radial pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B9D49B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#B9D49B] text-xs font-semibold">
              <Sprout className="w-3.5 h-3.5" />
              Empowering India's Agricultural Future
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Grow your reach. Sell directly.
            </h2>

            <p className="text-sm sm:text-base text-[#FAF6ED]/85 leading-relaxed">
              Whether you are an organic farmer seeking direct fair income or a conscious buyer hungry for real farm-to-table freshness, Farmora is built for you. Join our fast-growing community today.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('signup', 'farmer')}
                className="px-8 py-3.5 bg-[#FAF6ED] hover:bg-white text-[#285B37] rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer text-center"
              >
                Join Farmora
              </button>

              <button
                onClick={onExploreProducts}
                className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10. FOOTER
          ========================================================================= */}
      <footer className="bg-[#1E462A] text-white pt-14 pb-8 border-t border-black/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Col 1 & 2: Brand Description */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-[#285B37] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#285B37]" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight">Farmora</span>
              </div>

              <p className="text-xs sm:text-sm text-[#FAF6ED]/80 leading-relaxed max-w-sm">
                Farmora is a modern agricultural marketplace connecting generational and organic farmers directly with households, grocery retailers, culinary kitchens, and wholesale mandis.
              </p>

              <p className="text-xs text-[#B9D49B] font-medium">
                Fresh from farms. Directly to you.
              </p>
            </div>

            {/* Col 3: Navigation Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-[#FAF6ED]/75">
                <li>
                  <button
                    onClick={() => scrollToSection('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('featured-categories')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about-us')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={onExploreProducts}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Live Marketplace
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Information Placeholder */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
                Contact & Hubs
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FAF6ED]/75">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#B9D49B] shrink-0 mt-0.5" />
                  <span>
                    Farmora Agro Logistics Hub, Plot 14, Agri Tech Park, Hyderabad, Telangana 500081
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B9D49B] shrink-0" />
                  <span>+91 1800-419-3276 (Toll Free)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B9D49B] shrink-0" />
                  <span>care@farmora.market</span>
                </li>
              </ul>
            </div>

            {/* Col 5: Language Options & Social Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
                Language
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    language === 'en' ? 'bg-[#FAF6ED] text-[#285B37] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    language === 'te' ? 'bg-[#FAF6ED] text-[#285B37] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    language === 'hi' ? 'bg-[#FAF6ED] text-[#285B37] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Social Links Placeholder */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block">
                  Connect With Growers
                </span>
                <div className="flex items-center gap-3 text-xs text-[#FAF6ED]/80">
                  <span className="hover:text-white cursor-pointer transition-colors">WhatsApp Community</span>
                  <span aria-hidden="true">·</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                  <span aria-hidden="true">·</span>
                  <span className="hover:text-white cursor-pointer transition-colors">YouTube Stories</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
            <span>© 2026 Farmora Technologies Pvt Ltd. All rights reserved.</span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span aria-hidden="true">·</span>
              <span className="hover:text-white cursor-pointer">Farmer Terms</span>
              <span aria-hidden="true">·</span>
              <span className="hover:text-white cursor-pointer">FSSAI Compliance</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
