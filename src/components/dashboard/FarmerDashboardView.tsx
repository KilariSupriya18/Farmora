import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, Product } from '../../types';
import {
  Sprout,
  Plus,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  Store,
  Phone,
  ShieldCheck,
  AlertCircle,
  Edit2,
  Trash2,
  Save,
  Check,
  MapPin,
  FileText,
} from 'lucide-react';

interface FarmerDashboardViewProps {
  onOpenAddProduct: () => void;
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({
  onOpenAddProduct,
}) => {
  const {
    currentUser,
    updateCurrentUser,
    products,
    orders,
    updateProductStock,
    toggleProductInStock,
    updateOrderStatus,
    cancelOrder,
    showToast,
    t,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'profile'>('overview');

  // Inline editing state for stock
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockInputVal, setStockInputVal] = useState<number>(0);

  // Profile form state
  const [farmName, setFarmName] = useState(currentUser.farmName || 'Amrai Devgad Orchards');
  const [village, setVillage] = useState(currentUser.village || 'Devgad');
  const [district, setDistrict] = useState(currentUser.district || 'Ratnagiri');
  const [state, setState] = useState(currentUser.state || 'Maharashtra');
  const [landAcreage, setLandAcreage] = useState(currentUser.landAcreage || 18);
  const [phone, setPhone] = useState(currentUser.phone || '+91 98230 44120');
  const [certifications, setCertifications] = useState(
    currentUser.certifications || 'GI-APEDA-MH-2026/041 · Organic NPOP'
  );

  // KPIs
  const totalListedProducts = products.length;
  const activeOrders = orders.filter(
    (o) => o.status === 'requested' || o.status === 'accepted' || o.status === 'ready'
  );
  const totalInventoryKg = products.reduce((acc, p) => acc + p.availableQuantity, 0);
  const totalSalesRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleSaveStock = (productId: string) => {
    updateProductStock(productId, Number(stockInputVal));
    setEditingStockId(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      farmName,
      village,
      district,
      state,
      landAcreage: Number(landAcreage),
      phone,
      certifications,
    });
    showToast('Farmer profile and farm gate details saved!', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#285B37] text-white flex items-center justify-center font-bold text-2xl shadow-xs shrink-0">
              <Sprout className="w-9 h-9 text-[#B9D49B]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {t.dashboard.welcome}, {currentUser.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-2.5 py-0.5 rounded-full border border-[#B9D49B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.pricing.verifiedFarmer}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {currentUser.farmName || 'Devgad Orchards'} · {currentUser.village || 'Devgad'}, {currentUser.state || 'Maharashtra'} · {currentUser.landAcreage || 18} Acres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddProduct}
              className="px-5 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#B9D49B]" />
              <span>{t.farmerPortal.addNewListing}</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPIs: Total listed products, Active orders, Available inventory, Sales overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EBDDC4]">
          
          {/* Total listed products */}
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                {t.dashboard.statActiveCrops}
              </span>
              <Package className="w-4 h-4 text-stone-400" />
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                {totalListedProducts}
              </span>
              <span className="text-xs text-stone-500">{t.categories.all}</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              {products.filter((p) => p.inStock).length} {t.pricing.inStock}
            </span>
          </div>

          {/* Active orders */}
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                {t.dashboard.statPendingOrders}
              </span>
              <Clock className="w-4 h-4 text-[#F4A261]" />
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F4A261] font-mono">
                {activeOrders.length}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              {t.orderStatus.requested} / {t.orderStatus.accepted}
            </span>
          </div>

          {/* Available inventory */}
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                {t.dashboard.statInventory}
              </span>
              <Sprout className="w-4 h-4 text-[#285B37]" />
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                {totalInventoryKg.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500">kg</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              {t.pricing.stockAvailable}
            </span>
          </div>

          {/* Sales overview */}
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                {t.dashboard.statEarnings}
              </span>
              <TrendingUp className="w-4 h-4 text-[#285B37]" />
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#285B37] font-mono">
                ₹{totalSalesRevenue.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              100% {t.hero.trustDirect}
            </span>
          </div>

        </div>
      </div>

      {/* Tab Navigation for Farmer Section */}
      <div className="flex items-center gap-2 border-b border-[#EBDDC4] pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.overviewTab}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.productsTab} ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.ordersTab} ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.profileTab}
        </button>
      </div>

      {/* Tab: Overview (Summary of Orders & Products) */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Incoming Orders Preview */}
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Recent Incoming Orders
                </h2>
                <p className="text-xs text-stone-500">
                  Update harvesting and dispatch states directly
                </p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Produce Items</th>
                    <th className="py-3 px-3">Fulfilment</th>
                    <th className="py-3 px-3">Total Amount</th>
                    <th className="py-3 px-3">Status Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.slice(0, 4).map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF6ED]/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-stone-800">
                        {order.id}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-stone-900 block">{order.buyerName}</span>
                        <span className="text-[10px] text-stone-500 capitalize">{order.buyerRole}</span>
                      </td>
                      <td className="py-3 px-3 text-stone-700">
                        {order.items.map((it) => `${it.productName} (${it.quantity} ${it.unit})`).join(', ')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-700">
                          {order.fulfilmentType === 'pickup' ? (
                            <>
                              <Store className="w-3 h-3 text-[#285B37]" />
                              Farm Gate Pickup
                            </>
                          ) : (
                            <>
                              <Truck className="w-3 h-3 text-blue-600" />
                              Dawn Delivery
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {order.status === 'requested' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'accepted')}
                                className="px-2.5 py-1 bg-[#285B37] hover:bg-[#1E462A] text-white text-[11px] font-semibold rounded-lg cursor-pointer"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => cancelOrder(order.id, 'Farmer rejected')}
                                className="px-2 py-1 text-rose-700 hover:bg-rose-50 text-[11px] font-medium rounded-lg cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {order.status === 'accepted' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg cursor-pointer"
                            >
                              Mark Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                              Completed
                            </span>
                          )}
                          {order.status === 'cancelled' && (
                            <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Products Preview */}
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Listed Farm Inventory
                </h2>
                <p className="text-xs text-stone-500">
                  Quick stock adjustments and availability toggles
                </p>
              </div>
              <button
                onClick={() => setActiveTab('products')}
                className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
              >
                Manage All Products →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl border border-[#EBDDC4] bg-[#FAF6ED]/30 flex gap-3 items-center"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name.en}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-xs text-stone-900 truncate">
                      {prod.name.en}
                    </h3>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      ₹{prod.basePrice}/{prod.unit} · {prod.availableQuantity} {prod.unit} left
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          prod.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {prod.inStock ? 'Active' : 'Out of Stock'}
                      </span>
                      <button
                        onClick={() => toggleProductInStock(prod.id)}
                        className="text-[11px] text-[#285B37] hover:underline font-medium cursor-pointer"
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab: Manage Products Full Data Table */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Manage Crop Catalog & Available Stock
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Edit stock levels in real time, toggle marketplace availability, and set bulk quantities
              </p>
            </div>
            <button
              onClick={onOpenAddProduct}
              className="px-4 py-2.5 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#B9D49B]" />
              <span>Add New Crop</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Crop / Produce</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price / Unit</th>
                  <th className="py-3 px-3">Available Stock</th>
                  <th className="py-3 px-3">Fulfilment Mode</th>
                  <th className="py-3 px-3">Marketplace Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                    
                    {/* Crop Photo & Title */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name.en}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-stone-900 block text-xs truncate max-w-[180px]">
                            {prod.name.en}
                          </span>
                          <span className="text-[10px] text-stone-500 block">
                            Harvest: {prod.harvestDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 capitalize text-stone-700">
                      {prod.category}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-mono font-bold text-stone-900">
                      ₹{prod.basePrice} / {prod.unit}
                    </td>

                    {/* Available Stock with Inline Edit */}
                    <td className="py-3 px-3">
                      {editingStockId === prod.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={stockInputVal}
                            onChange={(e) => setStockInputVal(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-[#285B37] rounded-md text-xs font-mono font-bold"
                          />
                          <button
                            onClick={() => handleSaveStock(prod.id)}
                            className="p-1 rounded bg-[#285B37] text-white hover:bg-[#1E462A] cursor-pointer"
                            title="Save Stock"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-stone-800">
                            {prod.availableQuantity} {prod.unit}
                          </span>
                          <button
                            onClick={() => {
                              setEditingStockId(prod.id);
                              setStockInputVal(prod.availableQuantity);
                            }}
                            className="text-stone-400 hover:text-stone-800 cursor-pointer p-0.5"
                            title="Edit Stock Quantity"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Fulfilment Mode */}
                    <td className="py-3 px-3 capitalize text-stone-600">
                      {prod.fulfilment === 'both' ? 'Pickup & Delivery' : prod.fulfilment}
                    </td>

                    {/* Marketplace Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          prod.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {prod.inStock ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleProductInStock(prod.id)}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[#EBDDC4] hover:bg-[#FAF6ED] text-stone-700 cursor-pointer transition-colors"
                      >
                        {prod.inStock ? 'Pause' : 'Activate'}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Incoming Orders & Order Status Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Incoming Orders & Harvest Progression
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Advance orders through their agricultural lifecycle: from field harvest to packing and dispatch
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Order Details</th>
                  <th className="py-3 px-3">Buyer & Contact</th>
                  <th className="py-3 px-3">Items Ordered</th>
                  <th className="py-3 px-3">Fulfilment Slot</th>
                  <th className="py-3 px-3">Gross Total</th>
                  <th className="py-3 px-3">Order Lifecycle Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-4 px-3">
                      <span className="font-mono font-bold text-stone-900 block">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {order.date}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-3">
                      <span className="font-semibold text-stone-900 block">
                        {order.buyerName}
                      </span>
                      <span className="text-[10px] text-stone-500 capitalize block">
                        {order.buyerRole} buyer
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {order.buyerContact}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-3">
                      <div className="space-y-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-stone-700">
                            • {it.productName} — <span className="font-mono font-medium">{it.quantity} {it.unit}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Fulfilment */}
                    <td className="py-4 px-3">
                      <div className="text-[11px]">
                        <span className="font-semibold capitalize text-stone-800 block">
                          {order.fulfilmentType === 'pickup' ? 'Farm Gate Collection' : 'Dawn Delivery'}
                        </span>
                        <span className="text-[10px] text-stone-500 block max-w-[160px] truncate">
                          {order.fulfilmentDetails?.deliveryAddress || order.fulfilmentDetails?.farmPickupAddress || 'Farm Gate Pick Up'}
                        </span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-3 font-mono font-bold text-stone-900 text-sm">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>

                    {/* Status Management & Direct Farmer Actions */}
                    <td className="py-4 px-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          {order.status === 'requested' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'accepted')}
                                className="px-3 py-1 bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer"
                              >
                                {t.orderActions.acceptOrder}
                              </button>
                              <button
                                onClick={() => cancelOrder(order.id, 'Farmer rejected')}
                                className="px-2.5 py-1 text-rose-700 hover:bg-rose-50 border border-rose-200 text-xs font-medium rounded-lg cursor-pointer"
                              >
                                {t.orderActions.rejectOrder}
                              </button>
                            </>
                          )}
                          {order.status === 'accepted' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer"
                              >
                                {t.orderActions.markReady}
                              </button>
                              <button
                                onClick={() => cancelOrder(order.id, 'Farmer cancelled')}
                                className="px-2.5 py-1 text-stone-500 hover:bg-stone-100 text-xs font-medium rounded-lg cursor-pointer"
                              >
                                {t.actions.cancel}
                              </button>
                            </>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer"
                            >
                              {t.orderActions.markCompleted}
                            </button>
                          )}
                        </div>

                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`w-full px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer focus:outline-hidden ${
                            order.status === 'requested'
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : order.status === 'accepted'
                              ? 'bg-[#EEF4F0] text-[#285B37] border-[#B9D49B]'
                              : order.status === 'ready'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}
                        >
                          <option value="requested">{t.orderStatus.requested}</option>
                          <option value="accepted">{t.orderStatus.accepted}</option>
                          <option value="ready">{t.orderStatus.ready}</option>
                          <option value="completed">{t.orderStatus.completed}</option>
                          <option value="cancelled">{t.orderStatus.cancelled}</option>
                        </select>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Farmer Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Farmer Profile & Farm Gate Location
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Buyers and dispatch drivers use these coordinates and certifications to inspect and collect orders.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Farm Name / Estate
                </label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Contact Mobile Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Village / Mandi
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  District
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Total Land Under Cultivation (Acres)
                </label>
                <input
                  type="number"
                  value={landAcreage}
                  onChange={(e) => setLandAcreage(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  Certifications & GI Numbers
                </label>
                <input
                  type="text"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="e.g. GI-APEDA-MH-2026/041 · Organic NPOP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#B9D49B]" />
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
