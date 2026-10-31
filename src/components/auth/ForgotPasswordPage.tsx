import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigateLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigateLogin }) => {
  const { showToast } = useApp();

  const [email, setEmail] = useState('rameshwar.patil@farmora.org');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulated in-browser password reset flow
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.resetPasswordForEmail(email.trim());
      if (res.error) {
        setErrorMessage(res.error.message);
        setLoading(false);
        return;
      }

      setLinkSent(true);
      setResendTimer(60);
      showToast(`Recovery verification token generated for ${email}`, 'success');
    } catch {
      setErrorMessage('Could not initiate password reset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await authService.updatePassword(email.trim(), newPassword);
      setResetCompleted(true);
      showToast('Password updated successfully! You can now sign in.', 'success');
    } catch {
      setErrorMessage('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* State 1: Reset Complete */}
      {resetCompleted ? (
        <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Password Reset Successfully
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your Farmora account credentials for <strong>{email}</strong> have been updated.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateLogin}
            className="w-full py-3 px-4 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-4"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
          </button>
        </div>
      ) : linkSent ? (
        /* State 2: Simulated Token Received & New Password Input */
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="p-4 rounded-2xl bg-[#EEF4F0] border border-[#B9D49B] text-xs text-stone-800 space-y-1.5">
            <div className="flex items-center gap-2 text-[#285B37] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#285B37]" />
              <span>Simulated Verification Code Verified</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              In this demo authentication environment, your reset token is instantly pre-validated for <strong>{email}</strong>. Enter your new password below.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-800 block">
                Enter New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-800 block">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:bg-stone-300"
            >
              {loading ? <span>Updating Password...</span> : <span>Save New Password & Continue</span>}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EBDDC4]">
            <span className="text-stone-500">
              {resendTimer > 0 ? `Resend token in ${resendTimer}s` : 'Did not receive code?'}
            </span>
            {resendTimer === 0 && (
              <button
                type="button"
                onClick={handleSendLink}
                className="font-semibold text-[#285B37] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend Code</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* State 3: Enter Email to Send Recovery Link */
        <form onSubmit={handleSendLink} className="space-y-4">
          
          <p className="text-xs text-stone-600 leading-relaxed">
            Enter the email address associated with your Farmora account. We will dispatch a secure recovery token to restore your access.
          </p>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-800 block">
              Registered Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:bg-stone-300"
          >
            {loading ? (
              <span>Dispatching Link...</span>
            ) : (
              <>
                <span>Send Password Reset Token</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </>
            )}
          </button>

        </form>
      )}

      {/* Back to Sign In Link */}
      <div className="pt-4 border-t border-[#EBDDC4] text-center">
        <button
          type="button"
          onClick={onNavigateLogin}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#285B37] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>
      </div>

    </div>
  );
};
