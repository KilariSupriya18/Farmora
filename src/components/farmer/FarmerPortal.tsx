import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Sprout,
  Plus,
  TrendingUp,
  PackageCheck,
  Truck,
  Store,
  Clock,
  CheckCircle2,
  Phone,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

interface FarmerPortalProps {
  onOpenAddCrop: () => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({ onOpenAddCrop }) => {
  const { products, orders, updateOrderStatus, cancelOrder, language, t } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  // Filter orders related to this portal or farm
  const farmerOrders = orders;

  const totalEarnings = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.status === 'requested' || o.status === 'accepted').length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner & Profile Header */}
      <section className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#285B37] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <Sprout className="w-8 h-8 text-[#B9D49B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {t.farmerPortal.title}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Direct Producer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Annapurna Jaivik Kshethram · Siddipet, Medak, Telangana (18 Acres Organic)
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAddCrop}
            className="px-5 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#B9D49B]" />
            <span>{t.farmerPortal.addNewListing}</span>
          </button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EBDDC4]">
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.farmerPortal.totalRevenue}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono tabular-nums">
                ₹{totalEarnings.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              100% direct bank payout · 0% fees
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.farmerPortal.activeListings}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
                {products.length}
              </span>
              <span className="text-xs text-stone-500">crops listed</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Live in regional buyers' feed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.farmerPortal.pendingDispatch}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E28236] font-mono tabular-nums">
                {pendingCount}
              </span>
              <span className="text-xs text-stone-500">orders</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Requires harvesting or packing
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              {t.farmerPortal.farmAcreage}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
                18.5
              </span>
              <span className="text-xs text-stone-500">Acres</span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              ZBNF & NPOP Registered
            </span>
          </div>
        </div>
      </section>

      {/* Tabs: Active Inventory vs Received Orders */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EBDDC4] pb-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
            }`}
          >
            Active Crop Inventory ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
            }`}
          >
            <span>{t.farmerPortal.dispatchOrders}</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F4A261] text-stone-900">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-[#EBDDC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6ED] text-stone-700 font-bold border-b border-[#EBDDC4] text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Crop & Grade</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Available Stock</th>
                    <th className="py-3 px-4">Retail Price</th>
                    <th className="py-3 px-4">Wholesale Tiers</th>
                    <th className="py-3 px-4">Fulfilment Options</th>
                    <th className="py-3 px-4">Harvest Freshness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBDDC4]/50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">
                              {p.name[language]}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {p.qualityGrade}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-stone-700 capitalize">
                        {p.category}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 tabular-nums">
                        {p.availableQuantity} {p.unit}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#285B37] tabular-nums">
                        ₹{p.basePrice} / {p.unit}
                      </td>

                      <td className="py-3.5 px-4">
                        {p.bulkTiers.length > 0 ? (
                          <div className="space-y-0.5">
                            {p.bulkTiers.map((bt) => (
                              <span key={bt.label} className="text-[10px] text-stone-600 block">
                                {bt.minQuantity}+: <strong className="font-mono">₹{bt.pricePerUnit}</strong> ({bt.savingsPercentage}% off)
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-stone-400 text-[11px]">No bulk tiers</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
                          {p.fulfilment !== 'delivery' && (
                            <span className="flex items-center gap-0.5 text-[#285B37] font-semibold">
                              <Store className="w-3 h-3" /> Pickup
                            </span>
                          )}
                          {p.deliveryAvailable && (
                            <span className="flex items-center gap-0.5 text-stone-700">
                              <Truck className="w-3 h-3 text-stone-400" /> Delivery
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-stone-600">
                        <span>{p.harvestDate}</span>
                        <span className="text-stone-400 block">{p.shelfLifeDays} days life</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders to Fulfill */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {farmerOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EBDDC4] p-12 text-center">
                <p className="text-stone-500 text-xs">No orders received yet.</p>
              </div>
            ) : (
              farmerOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl border border-[#EBDDC4] p-4 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBDDC4]/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-stone-900">
                        Order #{ord.id}
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-xs text-stone-500">{ord.date}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#285B37] bg-[#EEF4F0] px-2 py-0.5 rounded-md">
                        {ord.buyerRole}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {ord.status === 'requested' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'accepted')}
                            className="px-2.5 py-1 rounded-lg bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => cancelOrder(ord.id, 'Farmer rejected')}
                            className="px-2 py-1 rounded-lg text-rose-700 hover:bg-rose-50 text-xs font-medium cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {ord.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'ready')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          Mark as Ready
                        </button>
                      )}
                      {ord.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}

                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#EBDDC4] bg-white text-[#285B37] focus:outline-hidden cursor-pointer"
                      >
                        <option value="requested">1. Requested</option>
                        <option value="accepted">2. Accepted</option>
                        <option value="ready">3. Ready</option>
                        <option value="completed">4. Completed</option>
                        <option value="cancelled">5. Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Buyer & Logistics Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FAF6ED] p-3 rounded-xl border border-[#EBDDC4]">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                        Buyer Details
                      </span>
                      <span className="font-bold text-stone-900 block mt-0.5">
                        {ord.buyerName}
                      </span>
                      <span className="text-stone-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {ord.buyerContact}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                        Fulfilment Mode
                      </span>
                      <span className="font-bold text-stone-900 flex items-center gap-1 mt-0.5">
                        {ord.fulfilmentType === 'delivery' ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#285B37]" /> Direct Delivery
                          </>
                        ) : (
                          <>
                            <Store className="w-3.5 h-3.5 text-[#285B37]" /> Farm Gate Pickup
                          </>
                        )}
                      </span>
                      <span className="text-stone-500 text-[11px] block mt-0.5 line-clamp-1">
                        {ord.fulfilmentDetails.deliveryAddress || ord.fulfilmentDetails.farmPickupAddress}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                        Schedule / Timing
                      </span>
                      <span className="font-medium text-stone-800 block mt-0.5">
                        {ord.fulfilmentDetails.scheduledSlot || ord.fulfilmentDetails.pickupTime || 'Standard Hours'}
                      </span>
                      <span className="text-[11px] text-[#285B37] font-semibold mt-0.5 block">
                        Payment: {ord.paymentMethod.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[11px] font-semibold text-stone-600 block">
                      Ordered Crops:
                    </span>
                    <div className="divide-y divide-[#EBDDC4]/40">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="py-1.5 flex items-center justify-between">
                          <span className="text-stone-800">
                            {it.productName} — <strong>{it.quantity} {it.unit}</strong>
                          </span>
                          <span className="font-mono font-bold text-stone-900 tabular-nums">
                            ₹{it.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EBDDC4]/60">
                    <span className="text-xs text-stone-500">
                      Total Farmer Payout (100% Net):
                    </span>
                    <span className="font-serif text-lg font-bold text-[#285B37] font-mono tabular-nums">
                      ₹{ord.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </section>

    </div>
  );
};
