import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { authService, DEMO_PROFILES } from '../../services/authService';
import {
  Eye,
  EyeOff,
  Sprout,
  Home,
  Store,
  Utensils,
  Warehouse,
  ShieldAlert,
  ArrowRight,
  AlertCircle,
  Check,
  ChevronDown,
  Sparkles,
  Lock,
  Mail,
} from 'lucide-react';

interface LoginPageProps {
  onSuccess: (role: UserRole) => void;
  onNavigateSignUp: () => void;
  onNavigateForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccess,
  onNavigateSignUp,
  onNavigateForgotPassword,
}) => {
  const { loginUser, showToast, t } = useApp();

  const [email, setEmail] = useState('rameshwar.patil@farmora.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const roleIcons: Record<UserRole, any> = {
    farmer: Sprout,
    household: Home,
    retailer: Store,
    restaurant: Utensils,
    wholesaler: Warehouse,
    admin: ShieldAlert,
  };

  const handleSelectDemoProfile = (demo: typeof DEMO_PROFILES[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setDemoDropdownOpen(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email or registered phone number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (result.error || !result.user) {
        setErrorMessage(result.error?.message || 'Login failed. Please verify your credentials.');
        setLoading(false);
        return;
      }

      // Sync with application state
      loginUser(result.user.email, result.user.role);
      showToast(`Welcome back, ${result.user.name}! Redirecting to ${t.roles[result.user.role]} dashboard...`, 'success');
      onSuccess(result.user.role);
    } catch {
      setErrorMessage('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1-Click Demo Profiles Picker for Fast Evaluation */}
      <div className="p-3.5 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E28236]" />
            <span>Quick 1-Click Demo Profiles:</span>
          </span>
          <span className="text-[10px] text-stone-500">Instant Role Login</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
            className="w-full px-3 py-2 bg-white rounded-xl border border-[#EBDDC4] text-xs font-semibold text-stone-800 hover:bg-stone-50 flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
          >
            <span className="truncate">
              {DEMO_PROFILES.find((d) => d.email === email)?.label || 'Select any test persona to autofill'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          </button>

          {demoDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-1.5 z-40 max-h-72 overflow-y-auto">
              {DEMO_PROFILES.map((acc) => {
                const Icon = roleIcons[acc.role] || Sprout;
                const isSelected = email.toLowerCase() === acc.email.toLowerCase();
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectDemoProfile(acc)}
                    className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-start gap-2.5 cursor-pointer ${
                      isSelected ? 'bg-[#EEF4F0] text-[#285B37]' : 'hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#285B37] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-[#B9D49B]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {acc.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#285B37]" />}
                      </div>
                      <span className="text-[11px] text-stone-600 block truncate font-mono">
                        {acc.email}
                      </span>
                      <span className="text-[10px] text-stone-500 block truncate">
                        {acc.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Main Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email or Phone Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-800 block">
            Email or Registered Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="e.g. rameshwar.patil@farmora.org or +91 98230 44120"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-800">
              Password <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={onNavigateForgotPassword}
              className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-stone-600 hover:text-stone-900">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-sm border-stone-300 text-[#285B37] focus:ring-0 cursor-pointer accent-[#285B37]"
            />
            <span>Remember this device</span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-[#285B37] hover:bg-[#1E462A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Farmora</span>
              <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
            </>
          )}
        </button>

      </form>

      {/* Switch to Sign Up */}
      <div className="pt-4 border-t border-[#EBDDC4] text-center">
        <p className="text-xs text-stone-600">
          New to Farmora?{' '}
          <button
            type="button"
            onClick={onNavigateSignUp}
            className="font-bold text-[#285B37] hover:underline cursor-pointer ml-1"
          >
            Create an Account
          </button>
        </p>
      </div>

    </div>
  );
};
