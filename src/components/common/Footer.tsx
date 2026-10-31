import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, ShieldCheck, HeartHandshake, Truck, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'marketplace' | 'farmer' | 'b2b' | 'admin' | 'orders') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useApp();

  return (
    <footer className="bg-[#285B37] text-white pt-12 pb-8 border-t border-[#1E462A]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-white/10 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#B9D49B] flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct Farm Sourcing</h4>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Produce harvested the same morning from verified regional grower collectives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#B9D49B] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">0% Middleman Deduction</h4>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Farmers receive 100% of their listed price with zero predatory commission.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#B9D49B] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pickup & Chilled Transit</h4>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Choose farm gate collection or direct cold-chain transport to your kitchen.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#B9D49B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#B9D49B]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Trilingual Access</h4>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Native interface in English, Telugu (తెలుగు), and Hindi (हिन्दी).
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white text-[#285B37] flex items-center justify-center">
                <Sprout className="w-4 h-4 text-[#285B37]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Farmora</span>
            </div>
            <p className="text-xs text-[#FAF6ED]/80">
              {t.tagline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/80">
            <button
              onClick={() => onNavigate('marketplace')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.marketplace}
            </button>
            <button
              onClick={() => onNavigate('farmer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.farmerPortal}
            </button>
            <button
              onClick={() => onNavigate('b2b')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.bulkB2B}
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.orders}
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.adminPortal}
            </button>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/60">Language:</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                language === 'en' ? 'bg-white text-[#285B37] font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                language === 'te' ? 'bg-white text-[#285B37] font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                language === 'hi' ? 'bg-white text-[#285B37] font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-2">
          <span>© 2026 Farmora Technologies Pvt Ltd. All rights reserved.</span>
          <span>Connecting Farmers to Households, Retailers, Restaurants & Wholesalers.</span>
        </div>

      </div>
    </footer>
  );
};
