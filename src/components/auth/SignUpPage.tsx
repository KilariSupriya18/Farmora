import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { authService, SignUpPayload } from '../../services/authService';
import {
  Sprout,
  Home,
  Store,
  Utensils,
  Warehouse,
  ShieldAlert,
  ArrowRight,
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  MapPin,
  Building,
  User,
  Phone,
  Lock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface SignUpPageProps {
  onSuccess: (role: UserRole, isNewRegistration?: boolean) => void;
  onNavigateLogin: () => void;
  defaultRole?: UserRole;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSuccess,
  onNavigateLogin,
  defaultRole = 'farmer',
}) => {
  const { signupUser, showToast, t } = useApp();

  // Registration step: 1 = Role selection, 2 = Credentials & Role-specific details
  const [step, setStep] = useState<1 | 2>(1);

  // Selected primary role
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<'farmer' | 'household' | 'business' | 'admin'>(
    defaultRole === 'farmer'
      ? 'farmer'
      : defaultRole === 'household'
      ? 'household'
      : defaultRole === 'admin'
      ? 'admin'
      : 'business'
  );

  // Business sub-type (when business is selected)
  const [businessType, setBusinessType] = useState<'retailer' | 'restaurant' | 'wholesaler'>(
    defaultRole === 'wholesaler'
      ? 'wholesaler'
      : defaultRole === 'restaurant'
      ? 'restaurant'
      : 'retailer'
  );

  // Common credentials
  const [name, setName] = useState('Ananya Rao');
  const [email, setEmail] = useState('ananya.rao@example.com');
  const [phone, setPhone] = useState('+91 98490 67120');
  const [password, setPassword] = useState('Farmora2026!');
  const [confirmPassword, setConfirmPassword] = useState('Farmora2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState('Telangana');
  const [district, setDistrict] = useState('Medak');

  // Role-specific fields
  // Farmer
  const [farmName, setFarmName] = useState('Sri Laxmi Jaivik Farms');
  const [landAcreage, setLandAcreage] = useState('12.5');
  const [farmingMethod, setFarmingMethod] = useState('Organic NPOP Certified');
  const [primaryCrops, setPrimaryCrops] = useState('Tomatoes, Spinach, Chillies, Millets');
  const [village, setVillage] = useState('Siddipet Rural');

  // Household
  const [deliveryAddress, setDeliveryAddress] = useState('Plot 42, Vasant Vihar, Madhapur, Hyderabad - 500081');
  const [preferredSlot, setPreferredSlot] = useState<'morning' | 'evening'>('morning');

  // Business
  const [businessName, setBusinessName] = useState('Green Grocers Mart');
  const [gstNumber, setGstNumber] = useState('36AAAAA1234A1Z5');
  const [weeklyVolumeKg, setWeeklyVolumeKg] = useState('250');
  const [intakeAddress, setIntakeAddress] = useState('Receiving Dock 1, Commercial Market, Jubilee Hills, Hyderabad');

  // Admin
  const [department, setDepartment] = useState('Trust, Safety & Farm Verification');
  const [employeeCode, setEmployeeCode] = useState('FMR-TS-048');

  // Validation & UI states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'farmer' as const,
      title: 'Farmer / Grower',
      tagline: 'Sell direct to buyers with 0% middleman cuts',
      desc: 'List fresh vegetables, fruits, grains and pulses. Receive guaranteed payment direct to your bank.',
      icon: Sprout,
    },
    {
      id: 'household' as const,
      title: 'Household Buyer',
      tagline: 'Farm-to-kitchen fresh daily harvest',
      desc: 'Purchase natural produce harvested within hours of dispatch. Doorstep delivery or farm pickup.',
      icon: Home,
    },
    {
      id: 'business' as const,
      title: 'Business Buyer',
      tagline: 'Bulk institutional & commercial procurement',
      desc: 'For Retail Stores, Restaurants, Chefs, and APMC Wholesalers seeking tiered farm gate pricing.',
      icon: Store,
    },
    {
      id: 'admin' as const,
      title: 'Admin / Inspector',
      tagline: 'Platform trust & quality operations',
      desc: 'Audit farmer organic credentials, moderate product listings, and oversee cold-chain logistics.',
      icon: ShieldAlert,
    },
  ];

  const handleProceedToDetails = () => {
    setErrorMessage(null);
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter your full name or entity name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter carefully.');
      return;
    }

    // Determine final system role
    let computedRole: UserRole = 'household';
    if (selectedRoleCategory === 'farmer') {
      computedRole = 'farmer';
    } else if (selectedRoleCategory === 'admin') {
      computedRole = 'admin';
    } else if (selectedRoleCategory === 'business') {
      computedRole = businessType; // 'retailer' | 'restaurant' | 'wholesaler'
    }

    // Role-specific validations
    if (computedRole === 'farmer' && !farmName.trim()) {
      setErrorMessage('Please provide your Farm or Orchard name.');
      return;
    }

    if ((computedRole === 'retailer' || computedRole === 'restaurant' || computedRole === 'wholesaler') && !businessName.trim()) {
      setErrorMessage('Please enter your Registered Business Name.');
      return;
    }

    setLoading(true);

    try {
      const payload: SignUpPayload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: computedRole,
        location: {
          state,
          district,
          village: selectedRoleCategory === 'farmer' ? village : undefined,
        },
        roleSpecificData: {
          farmName: selectedRoleCategory === 'farmer' ? farmName : undefined,
          landAcreage: selectedRoleCategory === 'farmer' ? Number(landAcreage) || 0 : undefined,
          farmingMethod: selectedRoleCategory === 'farmer' ? farmingMethod : undefined,
          primaryCrops: selectedRoleCategory === 'farmer' ? primaryCrops : undefined,
          deliveryAddress: selectedRoleCategory === 'household' ? deliveryAddress : undefined,
          preferredSlot: selectedRoleCategory === 'household' ? preferredSlot : undefined,
          businessType: selectedRoleCategory === 'business' ? businessType : undefined,
          businessName: selectedRoleCategory === 'business' ? businessName : undefined,
          gstNumber: selectedRoleCategory === 'business' ? gstNumber : undefined,
          weeklyVolumeKg: selectedRoleCategory === 'business' ? Number(weeklyVolumeKg) || 0 : undefined,
          intakeAddress: selectedRoleCategory === 'business' ? intakeAddress : undefined,
          department: selectedRoleCategory === 'admin' ? department : undefined,
          employeeCode: selectedRoleCategory === 'admin' ? employeeCode : undefined,
        },
      };

      const result = await authService.signUp(payload);

      if (result.error || !result.user) {
        setErrorMessage(result.error?.message || 'Failed to create account.');
        setLoading(false);
        return;
      }

      // Synchronize with app context
      signupUser(result.user.userMetadata);
      showToast(`Account created for ${result.user.name} as ${t.roles[computedRole]}!`, 'success');

      // Forward to profile completion or dashboard
      onSuccess(computedRole, true);
    } catch {
      setErrorMessage('An unexpected error occurred during account registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EBDDC4] text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1 ? 'bg-[#285B37] text-white' : 'bg-[#EEF4F0] text-[#285B37]'
            }`}
          >
            1
          </span>
          <span className={step === 1 ? 'text-[#285B37] font-bold' : 'text-stone-500'}>
            Select Your Role
          </span>
        </div>

        <div className="w-8 h-px bg-[#EBDDC4]" />

        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? 'bg-[#285B37] text-white' : 'bg-stone-100 text-stone-400'
            }`}
          >
            2
          </span>
          <span className={step === 2 ? 'text-[#285B37] font-bold' : 'text-stone-400'}>
            Account & Role Details
          </span>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: USER ROLE SELECTION */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Please choose the profile type that best describes your participation on Farmora. You can access other perspectives anytime in demo mode.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRoleCategory === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoleCategory(r.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#285B37] bg-[#EEF4F0] ring-1 ring-[#285B37] shadow-xs'
                      : 'border-stone-200 bg-white hover:border-[#B9D49B] hover:bg-[#FAF6ED]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[#285B37] text-white flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#B9D49B]" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#285B37] bg-[#285B37]' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">{r.title}</h3>
                      <span className="text-[11px] font-semibold text-[#285B37] block mt-0.5">
                        {r.tagline}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business Sub-role Selector if Business is selected */}
          {selectedRoleCategory === 'business' && (
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-2.5 animate-in fade-in duration-150">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Specify Your Commercial Entity Type: <span className="text-red-500">*</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'retailer' as const, label: 'Retailer (Store)', icon: Store },
                  { id: 'restaurant' as const, label: 'Restaurant / Chef', icon: Utensils },
                  { id: 'wholesaler' as const, label: 'Wholesaler (Mandi)', icon: Warehouse },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBusinessType(b.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      businessType === b.id
                        ? 'border-[#285B37] bg-white text-[#285B37] shadow-2xs ring-1 ring-[#285B37]'
                        : 'border-[#EBDDC4] bg-white/70 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <b.icon className="w-4 h-4 text-[#285B37] shrink-0" />
                    <span className="truncate">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleProceedToDetails}
            className="w-full py-3 px-4 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-4"
          >
            <span>Continue to Registration Details</span>
            <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
          </button>
        </div>
      )}

      {/* STEP 2: CREDENTIALS & ROLE-SPECIFIC REGISTRATION FORM */}
      {step === 2 && (
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div className="p-3 rounded-xl bg-[#EEF4F0] border border-[#B9D49B] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-600">Registering as:</span>
              <strong className="text-[#285B37] capitalize font-bold">
                {selectedRoleCategory === 'business' ? `${businessType} (Business Buyer)` : `${selectedRoleCategory}`}
              </strong>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#285B37] font-semibold underline hover:text-[#1E462A] cursor-pointer"
            >
              Change Role
            </button>
          </div>

          {/* Core Credentials Section */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              1. Account Identity & Contact
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Full Name / Contact Person <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Rameshwar Patil"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 98490 12345"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@domain.com"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min. 6 characters"
                    className="w-full pl-3 pr-9 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-type password"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37] focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">State / Region</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37]"
                >
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">District / City</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Medak, Hyderabad, Ratnagiri"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#FAF6ED]/30 text-xs text-stone-900 focus:outline-hidden focus:border-[#285B37]"
                />
              </div>
            </div>
          </div>

          {/* 2. Role-Specific Details Section */}
          <div className="pt-3 border-t border-[#EBDDC4] space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              2. {selectedRoleCategory === 'farmer' ? 'Farm & Agronomic Details' : selectedRoleCategory === 'household' ? 'Delivery Address & Slot' : selectedRoleCategory === 'business' ? 'Business Procurement Information' : 'Operational Verification'}
            </span>

            {/* FARMER SPECIFICS */}
            {selectedRoleCategory === 'farmer' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">
                      Farm / Orchard Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      required
                      placeholder="e.g. Prakriti Jaivik Farms"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">Total Cultivated Land (Acres)</label>
                    <input
                      type="number"
                      value={landAcreage}
                      onChange={(e) => setLandAcreage(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">Farming Method / Certification</label>
                    <select
                      value={farmingMethod}
                      onChange={(e) => setFarmingMethod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                    >
                      <option value="Organic NPOP Certified">Organic NPOP Certified</option>
                      <option value="Natural ZBNF (Subhash Palekar Natural Farming)">Natural ZBNF (Zero Budget Chemical Free)</option>
                      <option value="PGS-India Green Jaivik">PGS-India Green Jaivik</option>
                      <option value="Conventional Fresh Harvest">Conventional Fresh Harvest</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">Village / Gram Panchayat</label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder="e.g. Siddipet Rural"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Primary Crops Grown This Season</label>
                  <input
                    type="text"
                    value={primaryCrops}
                    onChange={(e) => setPrimaryCrops(e.target.value)}
                    placeholder="e.g. Tomatoes, Spinach, Mangoes, Turmeric"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                  />
                </div>
              </div>
            )}

            {/* HOUSEHOLD SPECIFICS */}
            {selectedRoleCategory === 'household' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">
                    Primary Home Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    placeholder="Flat / House No, Street, Apartment Name, Landmark, Pincode"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Preferred Delivery Window</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredSlot('morning')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        preferredSlot === 'morning'
                          ? 'border-[#285B37] bg-white text-[#285B37] shadow-2xs ring-1 ring-[#285B37]'
                          : 'border-stone-200 bg-white/70 text-stone-600'
                      }`}
                    >
                      Morning Dawn (6:30 AM – 9:00 AM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredSlot('evening')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        preferredSlot === 'evening'
                          ? 'border-[#285B37] bg-white text-[#285B37] shadow-2xs ring-1 ring-[#285B37]'
                          : 'border-stone-200 bg-white/70 text-stone-600'
                      }`}
                    >
                      Evening (5:00 PM – 8:00 PM)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS SPECIFICS */}
            {selectedRoleCategory === 'business' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">
                      Registered Business / Outlet Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      placeholder="e.g. Sri Balaji Supermarket"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">GSTIN / Trade Reg (Optional)</label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="36AAAAA0000A1Z5"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Estimated Weekly Volume (kg)</label>
                  <input
                    type="number"
                    value={weeklyVolumeKg}
                    onChange={(e) => setWeeklyVolumeKg(e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">Receiving Gate / Loading Dock Address</label>
                  <textarea
                    rows={2}
                    value={intakeAddress}
                    onChange={(e) => setIntakeAddress(e.target.value)}
                    placeholder="Backdoor Loading Bay, Street, City, Pincode"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                  />
                </div>
              </div>
            )}

            {/* ADMIN SPECIFICS */}
            {selectedRoleCategory === 'admin' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800">Employee ID / Code</label>
                    <input
                      type="text"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="py-3 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Back to Role Selection
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl bg-[#285B37] hover:bg-[#1E462A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Switch to Login */}
      <div className="pt-4 border-t border-[#EBDDC4] text-center">
        <p className="text-xs text-stone-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="font-bold text-[#285B37] hover:underline cursor-pointer ml-1"
          >
            Sign In
          </button>
        </p>
      </div>

    </div>
  );
};
