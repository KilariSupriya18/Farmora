import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceCategory, QualityGrade, BulkPricingTier, FulfilmentOption } from '../../types';
import { X, Sprout, Plus, Trash2, ShieldCheck, Check } from 'lucide-react';

interface AddCropModalProps {
  onClose: () => void;
}

const PRESET_PHOTOS = [
  {
    name: 'Fresh Tomatoes',
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    color: '#E28236',
  },
  {
    name: 'Green Spinach',
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    color: '#8CAE66',
  },
  {
    name: 'Alphonso Mangoes',
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    color: '#F4A261',
  },
  {
    name: 'Crisp Carrots',
    url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
    color: '#E28236',
  },
  {
    name: 'Grains & Rice',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    color: '#F4EBD7',
  },
  {
    name: 'Chilli & Spices',
    url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    color: '#E28236',
  },
];

export const AddCropModal: React.FC<AddCropModalProps> = ({ onClose }) => {
  const { addProduct, t, language } = useApp();

  const [nameEn, setNameEn] = useState('');
  const [nameTe, setNameTe] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [category, setCategory] = useState<Exclude<ProduceCategory, 'all'>>('vegetables');
  const [descEn, setDescEn] = useState('');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'crate (25kg)' | 'bundle' | 'litre'>('kg');
  const [basePrice, setBasePrice] = useState<number>(40);
  const [availableQuantity, setAvailableQuantity] = useState<number>(200);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(2);
  const [harvestDate, setHarvestDate] = useState('Today 6:00 AM');
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(6);
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>('Organic Certified (NPOP)');
  const [isOrganic, setIsOrganic] = useState(true);
  const [allowPickup, setAllowPickup] = useState(true);
  const [allowDelivery, setAllowDelivery] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Bulk Tiers
  const [bulkTiers, setBulkTiers] = useState<BulkPricingTier[]>([
    { minQuantity: 25, unit: 'kg', pricePerUnit: 32, label: 'Store (25kg+)', savingsPercentage: 20 },
    { minQuantity: 100, unit: 'kg', pricePerUnit: 26, label: 'Wholesale (100kg+)', savingsPercentage: 35 },
  ]);

  const handleAddTier = () => {
    setBulkTiers((prev) => [
      ...prev,
      {
        minQuantity: 250,
        unit,
        pricePerUnit: Math.round(basePrice * 0.65),
        label: `Bulk Lot (250${unit}+)`,
        savingsPercentage: 35,
      },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setBulkTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let fulfilment: FulfilmentOption = 'both';
    if (allowPickup && !allowDelivery) fulfilment = 'pickup';
    if (!allowPickup && allowDelivery) fulfilment = 'delivery';

    addProduct({
      name: {
        en: nameEn.trim() || 'Fresh Farm Harvest',
        te: nameTe.trim() || nameEn.trim() || 'తాజా రైతు పంట',
        hi: nameHi.trim() || nameEn.trim() || 'ताज़ी खेत की उपज',
      },
      category,
      description: {
        en: descEn.trim() || 'Naturally cultivated fresh harvest directly from our farm soil.',
        te: 'మా సొంత పొలంలో రసాయనాలు లేకుండా పండించిన తాజా పంట.',
        hi: 'हमारे खेत से सीधे तोड़ी गई बिना रसायन वाली ताज़ी फसल।',
      },
      unit,
      basePrice: Number(basePrice),
      availableQuantity: Number(availableQuantity),
      minOrderQuantity: Number(minOrderQuantity),
      harvestDate,
      shelfLifeDays: Number(shelfLifeDays),
      qualityGrade,
      fulfilment,
      pickupLocation: {
        farmName: 'Annapurna Jaivik Kshethram',
        village: 'Siddipet',
        district: 'Medak',
        state: 'Telangana',
        pickupTiming: '6:30 AM – 6:00 PM',
        distanceKm: 14,
      },
      deliveryAvailable: allowDelivery,
      deliveryEstimateHours: 12,
      farmer: {
        id: 'f-curr',
        name: 'You (Farmer Ramesh Rao)',
        phone: '+91 94400 55112',
        experienceYears: 18,
        landAcreage: 12,
        isVerified: true,
      },
      bulkTiers,
      imageUrl: customImageUrl.trim() || selectedPhoto.url,
      fallbackColor: selectedPhoto.color,
      isOrganic,
      inStock: true,
      rating: 5.0,
      reviewCount: 1,
      featured: true,
    });

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
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EBDDC4] overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#FAF6ED] border-b border-[#EBDDC4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#285B37] text-white flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#B9D49B]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                {t.farmerPortal.addNewListing}
              </h3>
              <p className="text-xs text-stone-500">
                Directly list your farm produce for households, stores & restaurants
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Crop Names (Multilingual) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              1. Crop Identification
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Name in English *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crisp Sweet Corn"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Name in Telugu (తెలుగు)
                </label>
                <input
                  type="text"
                  placeholder="e.g. తీపి మొక్కజొన్న"
                  value={nameTe}
                  onChange={(e) => setNameTe(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Name in Hindi (हिन्दी)
                </label>
                <input
                  type="text"
                  placeholder="e.g. मीठी मकई"
                  value={nameHi}
                  onChange={(e) => setNameHi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37] bg-white cursor-pointer"
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fresh Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="pulses">Pulses & Lentils</option>
                  <option value="dairy">Dairy Products</option>
                  <option value="dairy_honey">Dairy & Honey</option>
                  <option value="spices">Spices & Herbs</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Quality Grade *
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => {
                    const val = e.target.value as QualityGrade;
                    setQualityGrade(val);
                    setIsOrganic(val.includes('Organic') || val.includes('Natural'));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37] bg-white cursor-pointer"
                >
                  <option value="Organic Certified (NPOP)">Organic Certified (NPOP)</option>
                  <option value="Natural ZBNF (Chemical Free)">Natural ZBNF (Chemical Free)</option>
                  <option value="Grade A Premium (Export Quality)">Grade A Premium (Export Quality)</option>
                  <option value="Grade B Standard Fresh">Grade B Standard Fresh</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Crop & Soil Story
              </label>
              <textarea
                rows={2}
                placeholder="Describe cultivation methods, seed source, soil care, or taste notes..."
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
              />
            </div>
          </div>

          {/* Pricing & Units */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              2. Quantity & Retail Pricing
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Unit of Measure
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="quintal">Quintal (100kg)</option>
                  <option value="crate (25kg)">Crate (25kg)</option>
                  <option value="bundle">Bundle</option>
                  <option value="litre">Litre</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Retail Price (₹/{unit}) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Available Qty ({unit}) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Min Order Qty ({unit})
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={minOrderQuantity}
                  onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Harvest Timestamp
                </label>
                <input
                  type="text"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Freshness / Shelf Life (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  value={shelfLifeDays}
                  onChange={(e) => setShelfLifeDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Wholesale B2B Tier Configuration */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  3. Wholesale & Commercial Tiers (B2B)
                </span>
                <span className="text-[11px] text-stone-500">
                  Offer discounts to restaurants, grocery stores & bulk traders
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddTier}
                className="text-xs text-[#285B37] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tier
              </button>
            </div>

            <div className="space-y-2">
              {bulkTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-[#FAF6ED] rounded-xl border border-[#EBDDC4]"
                >
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Min Qty</span>
                      <input
                        type="number"
                        value={tier.minQuantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBulkTiers((prev) =>
                            prev.map((t, i) => (i === idx ? { ...t, minQuantity: val } : t))
                          );
                        }}
                        className="w-full px-2 py-1 bg-white rounded border border-stone-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block">Tier Price (₹/{unit})</span>
                      <input
                        type="number"
                        value={tier.pricePerUnit}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const sav = Math.round(((basePrice - val) / basePrice) * 100);
                          setBulkTiers((prev) =>
                            prev.map((t, i) =>
                              i === idx ? { ...t, pricePerUnit: val, savingsPercentage: sav } : t
                            )
                          );
                        }}
                        className="w-full px-2 py-1 bg-white rounded border border-stone-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block">Tier Label</span>
                      <input
                        type="text"
                        value={tier.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBulkTiers((prev) =>
                            prev.map((t, i) => (i === idx ? { ...t, label: val } : t))
                          );
                        }}
                        className="w-full px-2 py-1 bg-white rounded border border-stone-300 text-xs"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fulfilment Modes */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              4. Fulfilment Capabilities
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer hover:bg-[#FAF6ED]/30">
                <input
                  type="checkbox"
                  checked={allowPickup}
                  onChange={(e) => setAllowPickup(e.target.checked)}
                  className="mt-0.5 accent-[#285B37]"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Allow Farm Gate Pickup
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Buyers can collect freshly harvested produce directly at your field.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer hover:bg-[#FAF6ED]/30">
                <input
                  type="checkbox"
                  checked={allowDelivery}
                  onChange={(e) => setAllowDelivery(e.target.checked)}
                  className="mt-0.5 accent-[#285B37]"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Allow Local Chilled Delivery
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Dispatched in refrigerated vehicles straight to doorsteps or warehouse docks.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Photo Selection */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              5. Harvest Photo Asset
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((p) => {
                const isSelected = selectedPhoto.name === p.name && !customImageUrl;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(p);
                      setCustomImageUrl('');
                    }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected ? 'border-[#285B37] ring-2 ring-[#B9D49B]' : 'border-stone-200'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#285B37]/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-stone-200">
            <button
              type="submit"
              className="w-full py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Publish Farm Harvest Batch
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
