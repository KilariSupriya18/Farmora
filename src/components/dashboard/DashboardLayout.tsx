import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, Language } from '../../types';
import {
  Sprout,
  Home,
  Store,
  Utensils,
  Warehouse,
  ShieldAlert,
  ShoppingBag,
  Heart,
  Package,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  Check,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateMarketplace: () => void;
  onNavigateSignOut: () => void;
  onNavigateProfileSetup?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onNavigateHome,
  onNavigateMarketplace,
  onNavigateSignOut,
  onNavigateProfileSetup,
}) => {
  const {
    currentUser,
    userRole,
    setUserRole,
    cartCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    language,
    setLanguage,
    t,
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const roleIcons: Record<UserRole, any> = {
    farmer: Sprout,
    household: Home,
    retailer: Store,
    restaurant: Utensils,
    wholesaler: Warehouse,
    admin: ShieldAlert,
  };

  const roleColors: Record<UserRole, string> = {
    farmer: 'text-[#285B37] bg-[#EEF4F0]',
    household: 'text-emerald-800 bg-emerald-50',
    retailer: 'text-indigo-800 bg-indigo-50',
    restaurant: 'text-amber-800 bg-amber-50',
    wholesaler: 'text-purple-800 bg-purple-50',
    admin: 'text-rose-800 bg-rose-50',
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const handleSwitchRole = (role: UserRole) => {
    setUserRole(role);
    setRoleSwitcherOpen(false);
  };

  const CurrentRoleIcon = roleIcons[userRole] || User;

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-stone-900 flex flex-col lg:flex-row">
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#EBDDC4] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl border border-[#EBDDC4] bg-white text-stone-700 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#285B37] flex items-center justify-center text-white">
              <Sprout className="w-4 h-4 text-[#B9D49B]" />
            </div>
            <span className="font-serif text-lg font-bold text-[#285B37]">
              Farmora
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2 py-1 rounded-lg border border-[#EBDDC4] bg-white text-stone-800 text-xs font-semibold"
            >
              <span>{language.toUpperCase()}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between ${
                      language === l.code ? 'font-bold text-[#285B37] bg-[#FAF6ED]' : 'text-stone-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 rounded-xl border border-[#EBDDC4] bg-white text-stone-700 relative cursor-pointer"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-xl bg-[#285B37] text-white relative cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#B9D49B]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F4A261] text-stone-900 text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Persistent Left Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#EBDDC4] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Sidebar Header */}
          <div className="p-5 border-b border-[#EBDDC4] flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs group-hover:bg-[#1E462A] transition-colors">
                <Sprout className="w-5 h-5 text-[#B9D49B]" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-[#285B37] leading-none block">
                  Farmora
                </span>
                <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase">
                  {t.tagline}
                </span>
              </div>
            </button>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current User Profile Card */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#285B37] text-white flex items-center justify-center font-bold text-sm shrink-0">
                <CurrentRoleIcon className="w-5 h-5 text-[#B9D49B]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-xs text-stone-900 block truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-stone-500 block truncate">
                  {currentUser.email}
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${roleColors[userRole]}`}>
                  {t.roles[userRole]}
                </span>
              </div>
            </div>

            {onNavigateProfileSetup && (
              <button
                onClick={onNavigateProfileSetup}
                className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-stone-50 border border-[#EBDDC4] text-stone-700 hover:text-[#285B37] text-[11px] font-semibold rounded-xl transition-colors cursor-pointer text-center block"
              >
                Profile Setup & Preferences →
              </button>
            )}
          </div>

          {/* Navigation Items (Role-Contextual) */}
          <div className="px-3 space-y-1 flex-1 overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              {t.dashboard.navigation}
            </div>

            <button
              onClick={onNavigateMarketplace}
              className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium text-stone-700 hover:bg-[#FAF6ED] hover:text-[#285B37] flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#285B37]" />
              <span>{t.dashboard.browseMarketplace}</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium text-stone-700 hover:bg-[#FAF6ED] hover:text-[#285B37] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>{t.dashboard.savedWishlist}</span>
              </div>
              {wishlistCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#FAF6ED] text-stone-800 border border-[#EBDDC4]">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium text-stone-700 hover:bg-[#FAF6ED] hover:text-[#285B37] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#285B37]" />
                <span>{t.dashboard.shoppingBasket}</span>
              </div>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#F4A261] text-stone-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Sidebar Footer: Role Switcher & Sign Out */}
        <div className="p-4 border-t border-[#EBDDC4] space-y-3 bg-[#FAF6ED]/40">
          
          {/* Quick Role Switcher */}
          <div className="relative">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              {t.dashboard.switchPerspective}:
            </span>
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#EBDDC4] text-left flex items-center justify-between text-xs font-semibold text-stone-800 hover:bg-[#FAF6ED] transition-colors cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CurrentRoleIcon className="w-3.5 h-3.5 text-[#285B37] shrink-0" />
                <span className="truncate">{t.roles[userRole]}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-1.5 z-50">
                {(['farmer', 'household', 'restaurant', 'retailer', 'wholesaler', 'admin'] as UserRole[]).map((r) => {
                  const Icon = roleIcons[r] || User;
                  return (
                    <button
                      key={r}
                      onClick={() => handleSwitchRole(r)}
                      className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        userRole === r ? 'bg-[#FAF6ED] font-bold text-[#285B37]' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#285B37]" />
                        <span>{t.roles[r]}</span>
                      </div>
                      {userRole === r && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Home and Sign Out links */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={onNavigateHome}
              className="text-stone-600 hover:text-[#285B37] font-medium cursor-pointer"
            >
              {t.dashboard.homePage}
            </button>
            <button
              onClick={onNavigateSignOut}
              className="text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.dashboard.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Top Breadcrumb & Action Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-[#EBDDC4] bg-[#FAF6ED]/95 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <button onClick={onNavigateHome} className="hover:text-stone-900 cursor-pointer">
              Farmora
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-800 font-semibold capitalize">
              {t.roles[userRole]} {t.dashboard.dashboard}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher in Dashboard Top Bar */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="text-[#285B37] font-bold">{language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
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
                      className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-[#FAF6ED] cursor-pointer ${
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

            <button
              onClick={onNavigateMarketplace}
              className="px-3 py-1.5 bg-white border border-[#EBDDC4] hover:bg-[#FAF6ED] text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#285B37]" />
              <span>{t.dashboard.exploreMarket}</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="px-3 py-1.5 bg-white border border-[#EBDDC4] hover:bg-[#FAF6ED] text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>{t.nav.wishlist} ({wishlistCount})</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B9D49B]" />
              <span>{t.nav.cart} ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Dashboard Main Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Backdrop for mobile sidebar */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
        />
      )}
    </div>
  );
};
