import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  MapPin,
  FileCheck,
  UserCheck,
  Activity,
  Layers,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { products, orders, toggleFarmerVerification, language, t } = useApp();

  const [activeTab, setActiveTab] = useState<'verification' | 'disputes' | 'analytics'>('verification');

  // Extract unique farmers from products
  const farmerMap = new Map<string, any>();
  products.forEach((p) => {
    if (!farmerMap.has(p.farmer.id)) {
      farmerMap.set(p.farmer.id, {
        ...p.farmer,
        farmName: p.pickupLocation.farmName,
        village: p.pickupLocation.village,
        state: p.pickupLocation.state,
        cropsCount: products.filter((item) => item.farmer.id === p.farmer.id).length,
        cert: p.certificationNumber || 'PGS-India Jaivik 2026',
      });
    }
  });
  const farmersList = Array.from(farmerMap.values());

  const totalVolumeKg = products.reduce((acc, p) => acc + p.availableQuantity, 0);
  const totalVolumeTons = (totalVolumeKg / 1000).toFixed(1);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <section className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4F0] text-[#285B37] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Farmora Agricultural Trust & Safety Operations</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            {t.adminPortal.title}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t.adminPortal.subtitle}
          </p>
        </div>

        {/* Operational Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EBDDC4]">
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.adminPortal.verifiedCount}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono tabular-nums">
                {farmersList.filter((f) => f.isVerified).length} / {farmersList.length}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Farms field-inspected
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.adminPortal.totalVolumeTraded}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
                {totalVolumeTons}
              </span>
              <span className="text-xs text-stone-500">Metric Tons</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Across 4 agricultural zones
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.adminPortal.disputeRate}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono tabular-nums">
                0.12%
              </span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              High freshness compliance
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Middleman Margin Removed
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E28236] font-mono tabular-nums">
                100%
              </span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Direct grower payouts
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EBDDC4] pb-2">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'verification'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
            }`}
          >
            Farmer Credential Verification ({farmersList.length})
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'disputes'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
            }`}
          >
            Quality & Freshness Compliance
          </button>
        </div>

        {/* Tab 1: Farmer Verification Table */}
        {activeTab === 'verification' && (
          <div className="bg-white rounded-3xl border border-[#EBDDC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6ED] text-stone-700 font-bold border-b border-[#EBDDC4] text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Farmer & Orchard</th>
                    <th className="py-3 px-4">Region / State</th>
                    <th className="py-3 px-4">Acreage & Tenure</th>
                    <th className="py-3 px-4">Certification ID</th>
                    <th className="py-3 px-4">Active Batches</th>
                    <th className="py-3 px-4">Badge Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBDDC4]/50">
                  {farmersList.map((f) => (
                    <tr key={f.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{f.name}</div>
                        <div className="text-[11px] text-stone-500">{f.farmName}</div>
                      </td>

                      <td className="py-3.5 px-4 text-stone-700">
                        {f.village}, {f.state}
                      </td>

                      <td className="py-3.5 px-4 text-stone-700">
                        {f.landAcreage > 0 ? `${f.landAcreage} Acres` : 'Tribal Coop'} · {f.experienceYears} yrs
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                        {f.cert}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                        {f.cropsCount} crops
                      </td>

                      <td className="py-3.5 px-4">
                        {f.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#285B37] bg-[#EEF4F0] px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {t.adminPortal.verifiedStatus}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E28236] bg-[#FAF6ED] px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {t.adminPortal.pendingReview}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toggleFarmerVerification(f.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            f.isVerified
                              ? 'bg-[#FAF6ED] hover:bg-stone-200 text-stone-700 border border-[#EBDDC4]'
                              : 'bg-[#285B37] hover:bg-[#1E462A] text-white shadow-2xs'
                          }`}
                        >
                          {f.isVerified ? 'Revoke Badge' : 'Grant Verified Badge'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Quality & Compliance */}
        {activeTab === 'disputes' && (
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Freshness & Fulfilment Compliance Record
            </h3>
            <p className="text-xs text-stone-600">
              Farmora maintains a cold-chain protocol with temperature-logged transit. All batches are backed by our 100% farm freshness guarantee.
            </p>

            <div className="p-4 rounded-2xl bg-[#EEF4F0] border border-[#B9D49B] flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#285B37] shrink-0" />
              <div className="text-xs text-stone-800">
                <span className="font-bold text-[#285B37]">0 Active Escalations</span> · 42 orders successfully delivered or collected at farm gate over the past 7 days with zero freshness complaints.
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
