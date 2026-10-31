import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowLeft, ShieldCheck, ChevronDown, Check, Info } from 'lucide-react';
import { Language } from '../../types';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeScreen: 'login' | 'signup' | 'forgot-password' | 'profile-setup';
  onNavigateHome: () => void;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  activeScreen,
  onNavigateHome,
  title,
  subtitle,
}) => {
  const { language, setLanguage, t } = useApp();
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF6ED] text-stone-900 flex flex-col font-sans selection:bg-[#B9D49B] selection:text-[#285B37]">
      
      {/* Top Header Bar */}
      <header className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#EBDDC4] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#285B37] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#285B37]" />
          <span>{t.actions.back}</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-[#285B37] flex items-center justify-center text-white shadow-xs">
            <Sprout className="w-4 h-4 text-[#B9D49B]" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-[#285B37] tracking-tight block leading-none">
              Farmora
            </span>
            <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider hidden sm:block">
              {t.tagline}
            </span>
          </div>
        </button>

        {/* Top Right: Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            aria-label="Select Language"
          >
            <span className="text-[#285B37] font-bold">
              {language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
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
      </header>

      {/* Demo Notice Banner */}
      <div className="bg-[#FAF6ED] border-b border-[#EBDDC4] px-4 py-2 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs text-stone-600">
          <Info className="w-3.5 h-3.5 text-[#285B37] shrink-0" />
          <span>
            <strong>Demo Authentication Mode:</strong> Local client verification with pre-seeded demo profiles. Ready for production Supabase Auth integration.
          </span>
        </div>
      </div>

      {/* Main Split Layout: Form on Left, Showcase on Right */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 p-4 sm:p-6 lg:p-10 gap-8 items-start">
        
        {/* Form Container (Col 1-7 on desktop) */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-sm">
            
            {/* Header Titles */}
            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-bold text-[#285B37] uppercase tracking-wider block">
                Farmora Secure Portal
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Injected Form Body */}
            {children}

          </div>
        </div>

        {/* Visual Showcase (Col 8-12 on desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col space-y-6 sticky top-24">
          
          {/* Large Farm Photo with Overlay */}
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-md border border-[#EBDDC4] bg-[#F4EBD7]">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
              alt="Farmer in organic fields"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Bottom Quote & Trust Metric */}
            <div className="absolute bottom-6 inset-x-6 space-y-3 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#B9D49B] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Agricultural Collective</span>
              </div>

              <blockquote className="text-sm font-serif italic text-[#FAF6ED] leading-relaxed">
                "Farmora gives us direct pricing transparency and dignity for our labor. Households and restaurants receive harvest within hours."
              </blockquote>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
                <div>
                  <span className="font-bold text-white block">Rameshwar Patil</span>
                  <span className="text-[11px] text-white/60">Devgad Organic Orchards · 18 Acres</span>
                </div>
                <span className="font-mono text-[#B9D49B] text-xs font-bold">100% Net Payout</span>
              </div>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#EBDDC4] text-center">
            <div>
              <span className="font-serif text-lg font-bold text-[#285B37] block font-mono">500+</span>
              <span className="text-[10px] text-stone-500 block">Verified Farmers</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#285B37] block font-mono">0%</span>
              <span className="text-[10px] text-stone-500 block">Middleman Cuts</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#285B37] block font-mono">&lt; 24h</span>
              <span className="text-[10px] text-stone-500 block">Field to Kitchen</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
