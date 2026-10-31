import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order } from '../../types';
import {
  ShoppingBag,
  Heart,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Store,
  MapPin,
  FileText,
  Building2,
  Utensils,
  Warehouse,
  Home,
  Save,
  ArrowRight,
  ExternalLink,
  Trash2,
  Plus,
} from 'lucide-react';

interface BuyerDashboardViewProps {
  onBrowseMarketplace: () => void;
  onOpenProductModal: (product: Product) => void;
}

export const BuyerDashboardView: React.FC<BuyerDashboardViewProps> = ({
  onBrowseMarketplace,
  onOpenProductModal,
}) => {
  const {
    currentUser,
    updateCurrentUser,
    orders,
    cart,
    cartCount,
    setIsCartOpen,
    wishlist,
    products,
    removeFromCart,
    addToCart,
    toggleWishlist,
    cancelOrder,
    canCancelOrder,
    showToast,
    t,
    language,
  } = useApp();

  const isBusiness =
    currentUser.role === 'retailer' ||
    currentUser.role === 'restaurant' ||
    currentUser.role === 'wholesaler';

  const [activeTab, setActiveTab] = useState<'overview' | 'current' | 'history' | 'saved' | 'business' | 'profile'>(
    'overview'
  );

  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  // Profile form state
  const [name, setName] = useState(currentUser.name || 'Sunita Sharma');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98490 12345');
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser.deliveryAddress || 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad 500033'
  );
  const [businessName, setBusinessName] = useState(
    currentUser.businessName || (isBusiness ? 'The Olive Bistro & Kitchen' : '')
  );
  const [gstNumber, setGstNumber] = useState(
    currentUser.gstNumber || (isBusiness ? '36AAAAA1111A1Z5' : '')
  );

  // Filter orders for buyer (exact 5-stage workflow)
  const currentOrders = orders.filter(
    (o) => o.status === 'requested' || o.status === 'accepted' || o.status === 'ready'
  );
  const completedOrders = orders.filter((o) => o.status === 'completed' || o.status === 'cancelled');

  // Wishlist products
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      phone,
      deliveryAddress,
      businessName: isBusiness ? businessName : undefined,
      gstNumber: isBusiness ? gstNumber : undefined,
    });
    showToast('Profile & delivery preferences updated successfully!', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#285B37] text-white flex items-center justify-center font-bold text-2xl shadow-xs shrink-0">
              {currentUser.role === 'restaurant' && <Utensils className="w-8 h-8 text-[#B9D49B]" />}
              {currentUser.role === 'retailer' && <Store className="w-8 h-8 text-[#B9D49B]" />}
              {currentUser.role === 'wholesaler' && <Warehouse className="w-8 h-8 text-[#B9D49B]" />}
              {currentUser.role === 'household' && <Home className="w-8 h-8 text-[#B9D49B]" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {t.dashboard.welcome}, {currentUser.name}
                </h1>
                
                {/* Business Type Badge */}
                {isBusiness ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-2.5 py-0.5 rounded-full border border-[#B9D49B] capitalize">
                    <Building2 className="w-3.5 h-3.5" />
                    {t.roles[currentUser.role]}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-2.5 py-0.5 rounded-full border border-[#B9D49B]">
                    <Home className="w-3.5 h-3.5" />
                    {t.roles.household}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {isBusiness && currentUser.businessName ? `${currentUser.businessName} · ` : ''}
                {currentUser.deliveryAddress || 'Hyderabad Hub'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBrowseMarketplace}
              className="px-5 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#B9D49B]" />
              <span>{t.dashboard.browseMarketplace}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-3 bg-[#FAF6ED] hover:bg-[#EBDDC4] text-stone-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-[#EBDDC4] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.cart}</span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#F4A261] text-stone-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EBDDC4]">
          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Active Shipments
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl font-bold text-[#F4A261] font-mono">
                {currentOrders.length}
              </span>
              <span className="text-xs text-stone-500">in transit</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              Direct from farm gate
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Fulfilled Orders
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl font-bold text-stone-900 font-mono">
                {completedOrders.length}
              </span>
              <span className="text-xs text-stone-500">deliveries</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              100% farm-origin receipts
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Saved Favorites
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl font-bold text-red-500 font-mono">
                {savedProducts.length}
              </span>
              <span className="text-xs text-stone-500">crops</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              In your personal wishlist
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Estimated Savings
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-2xl font-bold text-[#285B37] font-mono">
                22% - 35%
              </span>
            </div>
            <span className="text-[10px] text-[#285B37] font-medium block mt-1">
              Zero wholesale commission markups
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'current'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.currentOrdersTab} ({currentOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.historyTab} ({completedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-[#285B37] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
          }`}
        >
          {t.dashboard.savedTab} ({savedProducts.length})
        </button>
        {isBusiness && (
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'business'
                ? 'bg-[#285B37] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6ED]'
            }`}
          >
            {t.dashboard.businessTab}
          </button>
        )}
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

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Active Orders Highlight */}
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Current Harvest Shipments
                </h2>
                <p className="text-xs text-stone-500">
                  Real-time direct status from farmer's field to your location
                </p>
              </div>
              <button
                onClick={() => setActiveTab('current')}
                className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
              >
                View Details →
              </button>
            </div>

            {currentOrders.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6ED]/40 rounded-2xl border border-dashed border-[#EBDDC4]">
                <Package className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-600 font-medium">No active orders right now.</p>
                <button
                  onClick={onBrowseMarketplace}
                  className="mt-3 text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
                >
                  Explore Fresh Produce →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-[#EBDDC4] bg-[#FAF6ED]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-xs">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          Placed on {order.date}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-stone-800 mt-1">
                        {order.items.map((i) => `${i.productName} (${i.quantity} ${i.unit})`).join(', ')}
                      </p>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        {order.fulfilmentType === 'pickup' ? 'Farm Gate Collection' : 'Dawn Doorstep Delivery'} · {order.fulfilmentDetails?.deliveryAddress || order.fulfilmentDetails?.farmPickupAddress || 'Direct Pickup'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          order.status === 'requested'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : order.status === 'accepted'
                            ? 'bg-[#EEF4F0] text-[#285B37] border border-[#B9D49B]'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                        }`}
                      >
                        {order.status === 'requested' && '1. Requested'}
                        {order.status === 'accepted' && '2. Accepted by Farmer'}
                        {order.status === 'ready' && '3. Ready for Delivery/Pickup'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Products Highlight */}
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Saved Favorite Produce
                </h2>
                <p className="text-xs text-stone-500">
                  Quick access to seasonal crops you love
                </p>
              </div>
              <button
                onClick={() => setActiveTab('saved')}
                className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
              >
                View All Saved ({savedProducts.length}) →
              </button>
            </div>

            {savedProducts.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6ED]/40 rounded-2xl border border-dashed border-[#EBDDC4]">
                <Heart className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-600 font-medium">Your wishlist is empty.</p>
                <p className="text-[11px] text-stone-500 mt-1">Tap the heart on any crop card in the marketplace to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl border border-[#EBDDC4] bg-white space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={p.imageUrl}
                        alt={p.name.en}
                        className="w-full h-32 rounded-xl object-cover border border-stone-100"
                      />
                      <h3 className="font-semibold text-xs text-stone-900 mt-2 truncate">
                        {p.name.en}
                      </h3>
                      <p className="text-[10px] text-stone-500">{p.farmer.name} · {p.pickupLocation.village}</p>
                      <div className="mt-1 font-mono font-bold text-xs text-stone-900">
                        ₹{p.basePrice} <span className="text-[10px] font-normal text-stone-500">/{p.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p, 1, 'delivery')}
                      className="w-full py-2 bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B9D49B]" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab: Current Orders */}
      {activeTab === 'current' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Active Orders & Live Tracking
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Direct connection with harvesting farmers and temperature-controlled dispatch vehicles
            </p>
          </div>

          {currentOrders.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF6ED]/40 rounded-2xl border border-dashed border-[#EBDDC4]">
              <Package className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-stone-800">No active orders</h3>
              <p className="text-xs text-stone-500 mt-1">Discover fresh seasonal harvests direct from regional farmers.</p>
              <button
                onClick={onBrowseMarketplace}
                className="mt-4 px-4 py-2 bg-[#285B37] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Explore Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-[#EBDDC4] p-5 bg-[#FAF6ED]/30 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EBDDC4] gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-stone-900">{order.id}</span>
                        <span className="text-xs text-stone-500">Ordered {order.date}</span>
                      </div>
                      <span className="text-xs text-stone-600 block mt-0.5">
                        Fulfilment: {order.fulfilmentType === 'pickup' ? 'Farm Gate Collection' : 'Dawn Delivery'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">Total Payable</span>
                      <span className="font-mono font-bold text-base text-stone-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Progression Bar */}
                  <div className="py-2">
                    <div className="text-[11px] font-semibold text-stone-600 mb-2">
                      Order Status: <span className="text-[#285B37] font-bold uppercase">{order.status}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium">
                      <div className="p-2 rounded-lg bg-[#285B37] text-white font-bold">
                        1. Requested
                      </div>
                      <div className={`p-2 rounded-lg ${order.status === 'accepted' || order.status === 'ready' || order.status === 'completed' ? 'bg-[#285B37] text-white font-bold' : 'bg-stone-100 text-stone-400'}`}>
                        2. Accepted
                      </div>
                      <div className={`p-2 rounded-lg ${order.status === 'ready' || order.status === 'completed' ? 'bg-[#285B37] text-white font-bold' : 'bg-stone-100 text-stone-400'}`}>
                        3. Ready
                      </div>
                      <div className={`p-2 rounded-lg ${order.status === 'completed' ? 'bg-[#285B37] text-white font-bold' : 'bg-stone-100 text-stone-400'}`}>
                        4. Completed
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                      Ordered Crops
                    </span>
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-stone-800">
                        <span>• {it.productName} ({it.quantity} {it.unit})</span>
                        <span className="font-mono font-semibold">₹{(it.unitPrice * it.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Destination & Cancel Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#EBDDC4]/60 text-[11px]">
                    <div className="text-stone-600">
                      Destination: <span className="font-medium text-stone-900">{order.fulfilmentDetails?.deliveryAddress || order.fulfilmentDetails?.farmPickupAddress || 'Direct Fulfilment Point'}</span>
                    </div>

                    {canCancelOrder(order) ? (
                      cancellingOrderId === order.id ? (
                        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-1.5 rounded-lg">
                          <span className="text-rose-800 font-medium text-xs">Confirm cancel?</span>
                          <button
                            onClick={() => {
                              cancelOrder(order.id, 'Buyer requested cancellation');
                              setCancellingOrderId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold text-xs cursor-pointer hover:bg-rose-700"
                          >
                            Yes, Cancel
                          </button>
                          <button
                            onClick={() => setCancellingOrderId(null)}
                            className="px-2 py-0.5 rounded bg-white border border-stone-300 text-stone-700 text-xs cursor-pointer hover:bg-stone-50"
                          >
                            Back
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCancellingOrderId(order.id)}
                          className="px-3 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer transition-colors self-start sm:self-auto"
                        >
                          Cancel Order
                        </button>
                      )
                    ) : (
                      <span className="text-[10px] text-stone-400 italic">
                        Cancellation closed ({order.status === 'ready' ? 'Produce packed & ready' : 'Completed'})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Order History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Completed Orders & Farm Origin Receipts
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Archived farm gate receipts and re-order shortcuts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Produce Summary</th>
                  <th className="py-3 px-3">Total Paid</th>
                  <th className="py-3 px-3">Fulfilment</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {completedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF6ED]/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-3 text-stone-600">
                      {order.date}
                    </td>
                    <td className="py-3 px-3 text-stone-800">
                      {order.items.map((it) => `${it.productName} (${it.quantity} ${it.unit})`).join(', ')}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-stone-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 capitalize text-stone-600">
                      {order.fulfilmentType}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Fulfilled
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => showToast(`Downloaded invoice for ${order.id}`, 'info')}
                        className="text-[#285B37] hover:underline font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Saved Products (Wishlist) */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Saved Wishlist ({savedProducts.length})
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Seasonal crops and trusted farmer listings saved for regular buying
              </p>
            </div>
            <button
              onClick={onBrowseMarketplace}
              className="text-xs font-semibold text-[#285B37] hover:underline cursor-pointer"
            >
              Browse More Crops →
            </button>
          </div>

          {savedProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF6ED]/40 rounded-2xl border border-dashed border-[#EBDDC4]">
              <Heart className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-stone-800">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 mt-1">Click the heart icon on any produce card in the marketplace to add it here.</p>
              <button
                onClick={onBrowseMarketplace}
                className="mt-4 px-4 py-2 bg-[#285B37] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-[#EBDDC4] p-4 bg-white flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={p.imageUrl}
                        alt={p.name.en}
                        className="w-full h-40 rounded-xl object-cover"
                      />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-red-500 shadow-xs hover:bg-white cursor-pointer"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4 fill-red-500" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-stone-900">{p.name.en}</h3>
                      <p className="text-xs text-stone-500">
                        {p.farmer.name} · {p.pickupLocation.village}, {p.pickupLocation.state}
                      </p>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="font-mono font-bold text-sm text-stone-900">₹{p.basePrice}</span>
                        <span className="text-xs text-stone-500">/{p.unit}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 block mt-1">
                        Stock: {p.availableQuantity} {p.unit} available
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(p, 1, 'delivery')}
                      className="flex-1 py-2.5 bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B9D49B]" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Business & Invoicing (Only for B2B) */}
      {isBusiness && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-3 py-1 rounded-full border border-[#B9D49B] capitalize">
              <Building2 className="w-4 h-4" />
              B2B Commercial Accounts & Standing Orders
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Bulk Procurement & Invoicing Details
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              As a registered {currentUser.businessType || currentUser.role}, you enjoy volume tier pricing, GST input credits, and scheduled harvest runs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Registered GSTIN
              </span>
              <span className="font-mono font-bold text-sm text-stone-900 mt-1 block">
                {currentUser.gstNumber || '36AAAAA1111A1Z5'}
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">
                ITC eligible electronic tax invoices
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Standing Harvest Contract
              </span>
              <span className="font-semibold text-sm text-stone-900 mt-1 block">
                Tuesday & Friday Dawn Drops
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">
                Delivered before 7:30 AM
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Payment Terms
              </span>
              <span className="font-semibold text-sm text-stone-900 mt-1 block">
                Net-15 Trade Credit
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">
                Pre-approved credit line: ₹2,50,000
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Profile & Address Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Buyer Profile & Delivery Address
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Your default delivery instructions and contact details for harvest dispatch drivers
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
              />
            </div>

            {isBusiness && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Business / Entity Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">
                    GSTIN Number
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">
                Primary Delivery Address / Receiving Dock
              </label>
              <textarea
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#B9D49B]" />
              <span>Save Buyer Settings</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
