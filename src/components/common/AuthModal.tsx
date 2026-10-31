import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Sprout, Home, Store, Utensils, Warehouse, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  initialMode?: 'login' | 'signup';
  defaultRole?: UserRole;
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'login',
  defaultRole,
  onClose,
  onSuccess,
}) => {
  const { userRole, setUserRole, language, t, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole || userRole);
  const [name, setName] = useState(
    selectedRole === 'farmer'
      ? 'Rameshwar Patil'
      : selectedRole === 'restaurant'
      ? 'Chef Arvind (Olive Bistro)'
      : selectedRole === 'retailer'
      ? 'Sri Balaji Organics'
      : 'Sunita Sharma'
  );
  const [phone, setPhone] = useState('+91 98490 54321');

  const roleOptions: { id: UserRole; title: string; desc: string; icon: any }[] = [
    {
      id: 'household',
      title: 'Household Buyer',
      desc: 'Buy daily fresh vegetables & kitchen staples',
      icon: Home,
    },
    {
      id: 'farmer',
      title: 'Farmer / Producer',
      desc: 'Sell your harvest directly with 0% middleman fees',
      icon: Sprout,
    },
    {
      id: 'retailer',
      title: 'Retailer (Store)',
      desc: 'Stock your grocery shop at wholesale tiered rates',
      icon: Store,
    },
    {
      id: 'restaurant',
      title: 'Restaurant & Chef',
      desc: 'Culinary grade dawn deliveries before 8:00 AM',
      icon: Utensils,
    },
    {
      id: 'wholesaler',
      title: 'Wholesaler / Mandi',
      desc: 'Multi-ton truckload lots straight from farm gates',
      icon: Warehouse,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(selectedRole);
    showToast(
      mode === 'login'
        ? `Welcome back, ${name}! Signed in as ${selectedRole}.`
        : `Welcome to Farmora, ${name}! Your ${selectedRole} profile is active.`,
      'success'
    );
    onSuccess(selectedRole);
    onClose();
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EBDDC4] overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF6ED] border-b border-[#EBDDC4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5 text-[#B9D49B]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                {mode === 'login' ? 'Sign In to Farmora' : 'Get Started with Farmora'}
              </h3>
              <p className="text-xs text-stone-500">
                Fresh from farms. Directly to you.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#FAF6ED] rounded-xl border border-[#EBDDC4]">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#285B37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#285B37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Select User Persona */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Select Your Role on Farmora:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRole === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(opt.id);
                      if (opt.id === 'farmer') setName('Rameshwar Patil');
                      else if (opt.id === 'restaurant') setName('Chef Arvind (Olive Bistro)');
                      else if (opt.id === 'retailer') setName('Sri Balaji Organics');
                      else setName('Sunita Sharma');
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#285B37] bg-[#EEF4F0] ring-1 ring-[#285B37]'
                        : 'border-[#EBDDC4] hover:bg-[#FAF6ED]/60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#285B37] text-white' : 'bg-[#FAF6ED] text-[#285B37]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">
                          {opt.title}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#285B37] bg-[#B9D49B]/40 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3 pt-2 border-t border-[#EBDDC4]">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                {selectedRole === 'farmer' ? 'Farmer Name / Farm Identity' : 'Full Name / Entity Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Mobile Number (SMS / WhatsApp verification)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
              />
            </div>
          </div>

          {/* Trust hint */}
          <div className="p-3 rounded-xl bg-[#FAF6ED] border border-[#EBDDC4] text-[11px] text-stone-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#285B37] shrink-0" />
            <span>
              100% Direct Settlement Guarantee · Instant access to regional farmer networks.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Continue to Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
          </button>

        </form>

      </div>
    </div>
  );
};
