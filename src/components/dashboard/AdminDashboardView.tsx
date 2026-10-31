import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  TrendingUp,
  MapPin,
  FileCheck,
  UserCheck,
  Activity,
  Layers,
  Search,
  Check,
  Ban,
  Eye,
} from 'lucide-react';

interface AdminDashboardViewProps {
  onOpenProductModal?: (product: Product) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onOpenProductModal,
}) => {
  const {
    products,
    orders,
    moderateProduct,
    toggleFarmerVerification,
    currentUser,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'farmers' | 'analytics'>('moderation');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'flagged'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique farmers
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
  const totalGMV = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // Filter products for moderation
  const filteredProducts = products.filter((p) => {
    const status = p.moderationStatus || 'approved';
    if (filterStatus !== 'all' && status !== filterStatus) return false;
    if (
      searchTerm &&
      !p.name.en.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleApprove = (productId: string) => {
    moderateProduct(productId, 'approved');
  };

  const handleFlag = (productId: string) => {
    moderateProduct(productId, 'flagged');
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome & Platform Overview */}
      <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#285B37] text-white flex items-center justify-center font-bold text-2xl shadow-xs shrink-0">
              <ShieldAlert className="w-8 h-8 text-[#B9D49B]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Trust, Safety & Marketplace Operations
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-2.5 py-0.5 rounded-full border border-[#B9D49B]">
                  Admin Hub
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Moderator: {currentUser.name} ({currentUser.email}) · Reviewing harvests across 4 agricultural states
              </p>
            </div>
          </div>
        </div>

        {/* Operational Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EBDDC4]">
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Verified Producers
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono">
                {farmersList.filter((f) => f.isVerified).length} / {farmersList.length}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Farm gate audit complete
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Total Volume Traded
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                {totalVolumeTons}
              </span>
              <span className="text-xs text-stone-500">Metric Tons</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Live in active catalog
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Direct Farmer GMV
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono">
                ₹{totalGMV.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              100% direct to producers
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Flagged Content
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                {products.filter((p) => p.moderationStatus === 'flagged').length}
              </span>
              <span className="text-xs text-stone-500">listings</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Requires quality check
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EBDDC4] pb-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'moderation'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          Moderate Product Listings ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('farmers')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'farmers'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          Review Farmers & KYC ({farmersList.length})
        </button>
      </div>

      {/* Tab: Moderation */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Product Listings Moderation Queue
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Audit crop claims, organic certifications, pricing benchmarks, and photo authenticity
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF6ED] border border-[#EBDDC4]">
              {(['all', 'approved', 'pending', 'flagged'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-[#285B37] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Produce Details</th>
                  <th className="py-3 px-3">Producer / Farm</th>
                  <th className="py-3 px-3">Quality & Cert</th>
                  <th className="py-3 px-3">Price & Stock</th>
                  <th className="py-3 px-3">Moderation Status</th>
                  <th className="py-3 px-3 text-right">Moderator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => {
                  const status = p.moderationStatus || 'approved';
                  return (
                    <tr key={p.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name.en}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-stone-900 block text-xs truncate max-w-[170px]">
                              {p.name.en}
                            </span>
                            <span className="text-[10px] text-stone-500 capitalize">
                              {p.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-stone-900 block">{p.farmer.name}</span>
                        <span className="text-[10px] text-stone-500">{p.pickupLocation.village}, {p.pickupLocation.state}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-stone-800 font-medium block">{p.qualityGrade}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{p.certificationNumber || 'NPOP Verified'}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-stone-900 block">₹{p.basePrice}/{p.unit}</span>
                        <span className="text-[10px] text-stone-500 font-mono">{p.availableQuantity} {p.unit} in field</span>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : status === 'flagged'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                          {status === 'flagged' && <AlertTriangle className="w-3 h-3" />}
                          {status === 'pending' && <Activity className="w-3 h-3" />}
                          <span className="capitalize">{status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(p.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                              title="Approve Listing"
                            >
                              Approve
                            </button>
                          )}
                          {status !== 'flagged' && (
                            <button
                              onClick={() => handleFlag(p.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium cursor-pointer"
                              title="Flag for Quality Inspection"
                            >
                              Flag
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Farmers & KYC Verification */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Farmer Producer Audits & Land Certifications
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Verify patta passbook records, soil test reports, and GI geographical tags before granting the trust badge.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Farmer & Farm Name</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Cultivation Acreage</th>
                  <th className="py-3 px-3">Official Certification</th>
                  <th className="py-3 px-3">Trust Badge Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {farmersList.map((f) => (
                  <tr key={f.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-stone-900 text-xs block">
                        {f.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {f.farmName}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-stone-800 block">{f.village}</span>
                      <span className="text-[10px] text-stone-500">{f.state}</span>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-medium text-stone-900">
                      {f.landAcreage || 12} Acres
                    </td>

                    <td className="py-3.5 px-3 font-mono text-stone-700">
                      {f.cert}
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          f.isVerified
                            ? 'bg-[#EEF4F0] text-[#285B37] border border-[#B9D49B]'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {f.isVerified ? 'Verified Producer' : 'Unverified / Pending'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => toggleFarmerVerification(f.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          f.isVerified
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-[#285B37] text-white hover:bg-[#1E462A]'
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

    </div>
  );
};
