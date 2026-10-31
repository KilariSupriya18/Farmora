import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, UserProfile } from '../../types';
import { authService } from '../../services/authService';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  Home,
  Store,
  Utensils,
  Warehouse,
  ShieldAlert,
  ShieldCheck,
  Check,
  ArrowRight,
  Camera,
  Sparkles,
} from 'lucide-react';

interface ProfileSetupPageProps {
  onComplete: (role: UserRole) => void;
  onSkip?: () => void;
}

export const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ onComplete, onSkip }) => {
  const { currentUser, updateCurrentUser, userRole, t, showToast } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [state, setState] = useState(currentUser.state || 'Telangana');
  const [district, setDistrict] = useState(currentUser.district || 'Medak');
  const [village, setVillage] = useState(currentUser.village || 'Siddipet');

  // Role specifics
  const [farmName, setFarmName] = useState(currentUser.farmName || 'Annapurna Jaivik Kshethram');
  const [landAcreage, setLandAcreage] = useState(currentUser.landAcreage ? String(currentUser.landAcreage) : '15');
  const [certifications, setCertifications] = useState(currentUser.certifications || 'Organic NPOP · PGS-India Jaivik');
  
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser.deliveryAddress || 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad 500033'
  );
  const [businessName, setBusinessName] = useState(currentUser.businessName || 'Green Organics Mart');
  const [gstNumber, setGstNumber] = useState(currentUser.gstNumber || '36AAAAA0000A1Z5');

  // Dietary / fulfillment preferences
  const [organicOnly, setOrganicOnly] = useState(true);
  const [preferredFulfilment, setPreferredFulfilment] = useState<'delivery' | 'pickup'>('delivery');
  const [saving, setSaving] = useState(false);

  const roleIcons: Record<UserRole, any> = {
    farmer: Sprout,
    household: Home,
    retailer: Store,
    restaurant: Utensils,
    wholesaler: Warehouse,
    admin: ShieldAlert,
  };
  const CurrentRoleIcon = roleIcons[userRole] || User;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updates: Partial<UserProfile> = {
      name: name.trim(),
      phone: phone.trim(),
      state,
      district,
      village: userRole === 'farmer' ? village : undefined,
      farmName: userRole === 'farmer' ? farmName : undefined,
      landAcreage: userRole === 'farmer' ? Number(landAcreage) || 0 : undefined,
      certifications: userRole === 'farmer' ? certifications : undefined,
      deliveryAddress: userRole !== 'farmer' ? deliveryAddress : undefined,
      businessName: userRole === 'retailer' || userRole === 'restaurant' || userRole === 'wholesaler' ? businessName : undefined,
      gstNumber: userRole === 'retailer' || userRole === 'restaurant' || userRole === 'wholesaler' ? gstNumber : undefined,
    };

    try {
      updateCurrentUser(updates);
      await authService.updateProfile(updates);
      showToast('Profile configuration saved! Entering your personalized dashboard.', 'success');
      onComplete(userRole);
    } catch {
      showToast('Profile updated locally.', 'info');
      onComplete(userRole);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Profile Summary Badge */}
      <div className="p-4 rounded-2xl bg-[#EEF4F0] border border-[#B9D49B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#285B37] text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
            {name ? name.charAt(0) : <CurrentRoleIcon className="w-6 h-6 text-[#B9D49B]" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">{name || 'New Member'}</span>
              <span className="text-[10px] font-semibold text-[#285B37] bg-white px-2 py-0.5 rounded-full border border-[#B9D49B]">
                {t.roles[userRole]}
              </span>
            </div>
            <span className="text-xs text-stone-500 font-mono block mt-0.5">{currentUser.email}</span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#285B37] bg-white px-2.5 py-1 rounded-xl border border-[#B9D49B] shadow-2xs hidden sm:block">
          Step: Profile Setup
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Core Identity */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            1. Member Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800">Contact Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 font-mono focus:outline-hidden focus:border-[#285B37] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800">State / Region</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800">District / Zone</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Role Specific Settings */}
        <div className="pt-3 border-t border-[#EBDDC4] space-y-3">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            2. {userRole === 'farmer' ? 'Farm & Agronomic Settings' : userRole === 'household' ? 'Delivery & Household Preferences' : userRole === 'admin' ? 'Security & Inspection Scope' : 'Commercial Procurement Parameters'}
          </span>

          {/* FARMER CONFIG */}
          {userRole === 'farmer' && (
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Farm / Orchard Brand Name</label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Farm Acreage</label>
                  <input
                    type="number"
                    value={landAcreage}
                    onChange={(e) => setLandAcreage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">Certifications & Quality Badges</label>
                <input
                  type="text"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="e.g. Organic NPOP · ZBNF · PGS-India"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                />
              </div>
            </div>
          )}

          {/* HOUSEHOLD CONFIG */}
          {userRole === 'household' && (
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">Primary Delivery Address</label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="organicOnly"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-[#285B37] accent-[#285B37]"
                />
                <label htmlFor="organicOnly" className="text-xs text-stone-700 cursor-pointer font-medium">
                  Prioritize certified organic & natural pesticide-free produce
                </label>
              </div>
            </div>
          )}

          {/* BUSINESS BUYER CONFIG */}
          {(userRole === 'retailer' || userRole === 'restaurant' || userRole === 'wholesaler') && (
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Commercial Entity Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">GSTIN / Mandi License Number</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">Receiving Bay / Commercial Address</label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                />
              </div>
            </div>
          )}

          {/* ADMIN CONFIG */}
          {userRole === 'admin' && (
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-stone-900">Admin Inspection Clearance</div>
              <p className="text-[11px] text-stone-500">
                Authorized for farm credential verification, batch quality auditing, and cold-chain compliance.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3">
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="py-3 px-5 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Skip for Now
            </button>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 px-5 rounded-xl bg-[#285B37] hover:bg-[#1E462A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:bg-stone-300"
          >
            {saving ? (
              <span>Saving Preferences...</span>
            ) : (
              <>
                <span>Save Profile & Enter {t.roles[userRole]} Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
