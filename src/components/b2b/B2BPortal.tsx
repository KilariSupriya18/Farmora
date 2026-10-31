import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Store,
  Utensils,
  Warehouse,
  Truck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface B2BPortalProps {
  onOpenProduct: (product: Product) => void;
}

export const B2BPortal: React.FC<B2BPortalProps> = ({ onOpenProduct }) => {
  const { products, userRole, setUserRole, language, t, showToast } = useApp();

  const [contractCrop, setContractCrop] = useState(products[0]?.id || '');
  const [contractQty, setContractQty] = useState('150');
  const [contractFreq, setContractFreq] = useState<'daily' | 'biweekly' | 'weekly'>('weekly');
  const [contractEntity, setContractEntity] = useState(
    userRole === 'restaurant'
      ? 'The Olive Tree Café & Bistro'
      : userRole === 'wholesaler'
      ? 'Deccan Mandi Trading Co.'
      : 'Sri Balaji Retail Mart'
  );
  const [contractPhone, setContractPhone] = useState('+91 98490 88210');

  const selectedCropObj = products.find((p) => p.id === contractCrop) || products[0];

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Standing contract agreement initiated for ${contractQty} ${selectedCropObj.unit} of ${selectedCropObj.name[language]}. The farm collective logistics team will contact you within 2 hours.`,
      'success'
    );
  };

  const handleSampleRequest = (product: Product) => {
    showToast(`5kg Chef Sample Crate requested for ${product.name[language]} from ${product.farmer.name}. Dispatched via express van.`, 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Editorial Header */}
      <section className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6ED] text-[#285B37] text-xs font-semibold border border-[#EBDDC4]">
            <Layers className="w-3.5 h-3.5 text-[#285B37]" />
            <span>Commercial & Institutional Procurement Engine</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            {t.b2bPortal.title}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t.b2bPortal.subtitle}
          </p>
        </div>

        {/* Role Selector Tabs within B2B */}
        <div className="mt-8 pt-6 border-t border-[#EBDDC4] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-2">
            Procurement Tier:
          </span>

          <button
            onClick={() => setUserRole('retailer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              userRole === 'retailer'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'bg-[#FAF6ED] hover:bg-[#EBDDC4] text-stone-700'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Retailers (50kg – 500kg)</span>
          </button>

          <button
            onClick={() => setUserRole('restaurant')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              userRole === 'restaurant'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'bg-[#FAF6ED] hover:bg-[#EBDDC4] text-stone-700'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Restaurants & Chefs (Morning Dawn Delivery)</span>
          </button>

          <button
            onClick={() => setUserRole('wholesaler')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              userRole === 'wholesaler'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'bg-[#FAF6ED] hover:bg-[#EBDDC4] text-stone-700'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            <span>Wholesalers & Mandis (1 – 20 Metric Tons)</span>
          </button>
        </div>
      </section>

      {/* Role-Specific Advantages Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF6ED] rounded-2xl border border-[#EBDDC4] p-5 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-[#285B37] text-white flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#B9D49B]" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {userRole === 'restaurant'
              ? 'Guaranteed Pre-8 AM Kitchen Delivery'
              : userRole === 'wholesaler'
              ? 'Scheduled Freight Truck Dispatch'
              : 'Consistent Twice-Weekly Replenishment'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {userRole === 'restaurant'
              ? 'Picked at twilight so executive chefs receive dewy, crisp vegetables in time for lunch prep.'
              : userRole === 'wholesaler'
              ? 'Multi-ton direct loading straight from farm collection yards into refrigerated freight trucks.'
              : 'Automated standing replenishment schedule so your neighborhood store shelves never run dry.'}
          </p>
        </div>

        <div className="bg-[#FAF6ED] rounded-2xl border border-[#EBDDC4] p-5 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-[#285B37] text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#B9D49B]" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            Batch Laboratory Test Reports
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            All organic and export-grade lots include NPOP certification numbers, zero-residue lab tests, and FSSAI traceability.
          </p>
        </div>

        <div className="bg-[#FAF6ED] rounded-2xl border border-[#EBDDC4] p-5 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-[#285B37] text-white flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#B9D49B]" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            Net-30 B2B Credit & GST Invoicing
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eligible registered commercial institutions enjoy verified 30-day payment terms with direct GST input credit invoices.
          </p>
        </div>
      </section>

      {/* Wholesale Produce Matrix with Direct Bulk Ordering */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Bulk Produce Catalog & Tier Rates
            </h2>
            <p className="text-xs text-stone-500">
              Click any harvest to inspect farm origin or request direct bulk assignment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => {
            const topTier = p.bulkTiers[p.bulkTiers.length - 1];
            return (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="bg-white rounded-2xl border border-[#EBDDC4] hover:border-[#285B37] p-4 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#285B37]">
                      {p.qualityGrade}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm line-clamp-1">
                      {p.name[language]}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {p.pickupLocation.farmName} · {p.pickupLocation.village}, {p.pickupLocation.state}
                    </p>
                    <span className="text-[11px] text-stone-600 font-medium mt-0.5 block">
                      Available: {p.availableQuantity} {p.unit}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-stone-400 block line-through">
                      ₹{p.basePrice}/{p.unit} (Retail)
                    </span>
                    <span className="font-mono text-base font-bold text-[#285B37] tabular-nums block">
                      ₹{topTier ? topTier.pricePerUnit : p.basePrice}/{p.unit}
                    </span>
                    {topTier && (
                      <span className="text-[10px] text-[#E28236] font-bold">
                        Save {topTier.savingsPercentage}% at {topTier.minQuantity}+ {topTier.unit}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {userRole === 'restaurant' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSampleRequest(p);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#FAF6ED] text-[#285B37] hover:bg-[#EBDDC4] border border-[#EBDDC4] cursor-pointer"
                      >
                        5kg Sample
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProduct(p);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#285B37] text-white hover:bg-[#1E462A] cursor-pointer"
                    >
                      Configure Bulk
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Standing Contract Agreement Simulator */}
      <section className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Setup Weekly Standing Farm Contract
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Lock in guaranteed harvest allocation directly with regional farmer collectives at fixed pre-agreed wholesale rates.
          </p>

          <form onSubmit={handleContractSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Business Entity / Restaurant Name
                </label>
                <input
                  type="text"
                  required
                  value={contractEntity}
                  onChange={(e) => setContractEntity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Procurement Head Phone
                </label>
                <input
                  type="tel"
                  required
                  value={contractPhone}
                  onChange={(e) => setContractPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#285B37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Select Crop Harvest
                </label>
                <select
                  value={contractCrop}
                  onChange={(e) => setContractCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.en} ({p.farmer.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Target Volume per Dispatch ({selectedCropObj.unit})
                </label>
                <input
                  type="number"
                  min={25}
                  value={contractQty}
                  onChange={(e) => setContractQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Dispatch Frequency
                </label>
                <select
                  value={contractFreq}
                  onChange={(e) => setContractFreq(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white"
                >
                  <option value="daily">Daily Morning (Kitchens)</option>
                  <option value="biweekly">Twice Weekly (Retail Stores)</option>
                  <option value="weekly">Weekly Full Truckload (Wholesale)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Submit Standing Order Agreement
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};
