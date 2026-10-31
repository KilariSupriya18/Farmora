import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language, UserRole } from '../../types';
import { ShoppingBag, ChevronDown, Check, Sprout, Store, Utensils, Warehouse, ShieldAlert, Home, UserCheck, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeView: 'landing' | 'marketplace' | 'farmer' | 'b2b' | 'admin' | 'orders' | 'dashboard' | 'signin';
  setActiveView: (view: 'landing' | 'marketplace' | 'farmer' | 'b2b' | 'admin' | 'orders' | 'dashboard' | 'signin') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const {
    language,
    setLanguage,
    userRole,
    setUserRole,
    currentUser,
    t,
    cartCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleIcons: Record<UserRole, React.ReactNode> = {
    farmer: <Sprout className="w-4 h-4 text-[#285B37]" />,
    household: <Home className="w-4 h-4 text-[#285B37]" />,
    retailer: <Store className="w-4 h-4 text-[#285B37]" />,
    restaurant: <Utensils className="w-4 h-4 text-[#285B37]" />,
    wholesaler: <Warehouse className="w-4 h-4 text-[#285B37]" />,
    admin: <ShieldAlert className="w-4 h-4 text-[#285B37]" />,
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setRoleDropdownOpen(false);

    // Contextually switch view to match the selected role's primary workflow
    if (role === 'farmer') {
      setActiveView('dashboard');
    } else if (role === 'admin') {
      setActiveView('dashboard');
    } else if (role === 'retailer' || role === 'restaurant' || role === 'wholesaler') {
      setActiveView('dashboard');
    } else {
      setActiveView('marketplace');
    }
  };

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'EN' },
    { code: 'te', label: 'తెలుగు', script: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी', script: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#EBDDC4] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#285B37] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1E462A] transition-colors">
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
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean Single-Line Typography) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => setActiveView('landing')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'landing'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => setActiveView('marketplace')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'marketplace'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.marketplace}
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'dashboard'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.dashboard}
          </button>

          <button
            onClick={() => {
              setActiveView('farmer');
              if (userRole !== 'farmer') setUserRole('farmer');
            }}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'farmer'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.farmerPortal}
          </button>

          <button
            onClick={() => {
              setActiveView('b2b');
              if (userRole === 'household' || userRole === 'farmer') {
                setUserRole('retailer');
              }
            }}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'b2b'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.bulkB2B}
          </button>

          <button
            onClick={() => setActiveView('orders')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeView === 'orders'
                ? 'text-[#285B37] font-semibold border-b-2 border-[#285B37]'
                : 'hover:text-[#285B37]'
            }`}
          >
            {t.nav.orders}
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Role Selector, Language, Cart, Sign In) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Sign In Button / Profile Shortcut */}
          <button
            onClick={() => setActiveView('signin')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#285B37]" />
            <span className="truncate max-w-[90px]">{currentUser ? currentUser.name.split(' ')[0] : t.nav.signIn}</span>
          </button>
          
          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#F4EBD7]/50 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
              title="Switch user perspective"
            >
              <span className="shrink-0">{roleIcons[userRole]}</span>
              <span className="hidden sm:inline font-semibold text-[#285B37]">
                {t.roles[userRole]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-stone-100 bg-[#FAF6ED]/70">
                  <p className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                    {t.dashboard.switchPerspective}:
                  </p>
                </div>
                {(['farmer', 'household', 'retailer', 'restaurant', 'wholesaler', 'admin'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#FAF6ED] transition-colors cursor-pointer ${
                      userRole === role ? 'bg-[#F4EBD7]/60' : ''
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">{roleIcons[role]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-900 truncate">
                          {t.roles[role]}
                        </span>
                        {userRole === role && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {t.roles[`${role}Sub` as keyof typeof t.roles]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#F4EBD7]/50 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
              aria-label="Select Language"
            >
              <span className="text-[#285B37] font-bold">
                {language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF6ED] cursor-pointer ${
                      language === l.code ? 'font-bold text-[#285B37] bg-[#FAF6ED]/70' : 'text-stone-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            title={t.nav.wishlist}
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="hidden sm:inline">{t.nav.wishlist}</span>
            {wishlistCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FAF6ED] text-stone-900 border border-[#EBDDC4] leading-none">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Basket / Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#B9D49B]" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#F4A261] text-stone-900 leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Navigation Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-700 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-3 pt-3 border-t border-[#EBDDC4] space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1 text-xs sm:text-sm font-medium text-stone-800">
            <button
              onClick={() => {
                setActiveView('landing');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'landing' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => {
                setActiveView('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'marketplace' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.marketplace}
            </button>
            <button
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'dashboard' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.dashboard}
            </button>
            <button
              onClick={() => {
                setActiveView('farmer');
                if (userRole !== 'farmer') setUserRole('farmer');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'farmer' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.farmerPortal}
            </button>
            <button
              onClick={() => {
                setActiveView('b2b');
                if (userRole === 'household' || userRole === 'farmer') setUserRole('retailer');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'b2b' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.bulkB2B}
            </button>
            <button
              onClick={() => {
                setActiveView('orders');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'orders' ? 'bg-[#285B37] text-white font-semibold' : 'hover:bg-[#FAF6ED]'
              }`}
            >
              {t.nav.orders}
            </button>
            <button
              onClick={() => {
                setActiveView('signin');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-[#FAF6ED] text-[#285B37] font-semibold flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{currentUser ? currentUser.name : t.nav.signIn}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
