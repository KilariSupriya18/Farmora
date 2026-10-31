import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ROLE_CONFIGS } from '../../data/mockData';
import { RefreshCw, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface RoleBannerProps {
  onSwitchPortal: (view: 'landing' | 'marketplace' | 'farmer' | 'b2b' | 'admin' | 'orders') => void;
}

export const RoleBanner: React.FC<RoleBannerProps> = ({ onSwitchPortal }) => {
  const { userRole, setUserRole, language, resetDemoData, t } = useApp();

  const currentConfig = ROLE_CONFIGS.find((r) => r.id === userRole) || ROLE_CONFIGS[1];

  const handleQuickRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'farmer') onSwitchPortal('farmer');
    else if (role === 'admin') onSwitchPortal('admin');
    else if (role === 'retailer' || role === 'restaurant' || role === 'wholesaler') onSwitchPortal('b2b');
    else onSwitchPortal('marketplace');
  };

  return (
    <div className="bg-[#F4EBD7] border-b border-[#EBDDC4] py-2 px-4 lg:px-8 text-xs text-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Active Role & Context description */}
        <div className="flex items-center flex-wrap gap-2 text-stone-700">
          <span className="font-semibold text-[#285B37] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#285B37]" />
            {currentConfig.label[language]}
          </span>
          <span className="text-stone-400">/</span>
          <span className="text-stone-600 line-clamp-1">
            {currentConfig.tagline[language]}
          </span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-500 font-mono text-[11px]">
            Scale: {currentConfig.typicalOrderScale}
          </span>
        </div>

        {/* Quick Role switcher chips & Demo reset */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] text-stone-500 uppercase tracking-wider shrink-0 font-medium">
            {t.dashboard.switchPerspective}:
          </span>

          <div className="flex items-center gap-1 p-0.5 bg-white/70 rounded-lg border border-[#EBDDC4]">
            {(['household', 'farmer', 'retailer', 'restaurant', 'wholesaler', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleQuickRole(r)}
                className={`px-2 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  userRole === r
                    ? 'bg-[#285B37] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
                }`}
              >
                {t.roles[r]}
              </button>
            ))}
          </div>

          <button
            onClick={resetDemoData}
            title="Reset to default authentic farm harvest data"
            className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#285B37] px-2 py-1 rounded hover:bg-white/80 transition-colors shrink-0 cursor-pointer ml-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
