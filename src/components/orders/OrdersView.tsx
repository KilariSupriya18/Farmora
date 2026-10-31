import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Package,
  Truck,
  Store,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, cancelOrder, canCancelOrder, t } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'requested':
        return (
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            {t.orderStatus.requested}
          </span>
        );
      case 'accepted':
        return (
          <span className="text-xs font-semibold text-[#285B37] bg-[#EEF4F0] px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#B9D49B]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#285B37]" />
            {t.orderStatus.accepted}
          </span>
        );
      case 'ready':
        return (
          <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-blue-300">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            {t.orderStatus.ready}
          </span>
        );
      case 'completed':
        return (
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {t.orderStatus.completed}
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-stone-300">
            <XCircle className="w-3.5 h-3.5 text-stone-500" />
            {t.orderStatus.cancelled}
          </span>
        );
    }
  };

  const handleConfirmCancel = (orderId: string) => {
    cancelOrder(orderId, 'Cancelled by buyer');
    setCancellingOrderId(null);
  };

  const filterTabs = [
    { id: 'all', label: t.orderActions.filterAll },
    { id: 'requested', label: t.orderStatus.step1 },
    { id: 'accepted', label: t.orderStatus.step2 },
    { id: 'ready', label: t.orderStatus.step3 },
    { id: 'completed', label: t.orderStatus.step4 },
    { id: 'cancelled', label: t.orderStatus.step5 },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#EBDDC4] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {t.orderActions.trackingTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t.orderActions.trackingSubtitle}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6ED] border border-[#EBDDC4] text-xs font-medium text-stone-700 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#285B37]" />
            <span>{t.orderActions.farmGuaranteed}</span>
          </div>
        </div>

        {/* Filter bar: exact 5 order flow states */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === st.id
                  ? 'bg-[#285B37] text-white shadow-xs'
                  : 'bg-[#FAF6ED] text-stone-700 hover:bg-[#EBDDC4]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EBDDC4] p-12 text-center max-w-md mx-auto space-y-3">
            <Package className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-800">
              {t.orderActions.noOrders}
            </h3>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-[#EBDDC4] p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBDDC4]/60 pb-3">
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <span className="font-mono font-bold text-base text-stone-900">
                    Order #{ord.id}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500 font-mono">{ord.date}</span>
                  <span className="text-stone-400">·</span>
                  <span className="font-semibold text-stone-700 capitalize">
                    {ord.buyerName} ({t.roles[ord.buyerRole as keyof typeof t.roles] || ord.buyerRole})
                  </span>
                </div>

                <div>{getStatusBadge(ord.status)}</div>
              </div>

              {/* 5-Stage Visual Progress Bar */}
              {ord.status !== 'cancelled' ? (
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-lg bg-[#285B37] text-white font-bold">
                      1. {t.orderStatus.step1}
                    </div>
                    <div
                      className={`p-2 rounded-lg font-semibold ${
                        ord.status === 'accepted' || ord.status === 'ready' || ord.status === 'completed'
                          ? 'bg-[#285B37] text-white'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      2. {t.orderStatus.step2}
                    </div>
                    <div
                      className={`p-2 rounded-lg font-semibold ${
                        ord.status === 'ready' || ord.status === 'completed'
                          ? 'bg-[#285B37] text-white'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      3. {t.orderStatus.step3}
                    </div>
                    <div
                      className={`p-2 rounded-lg font-semibold ${
                        ord.status === 'completed'
                          ? 'bg-[#285B37] text-white'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      4. {t.orderStatus.step4}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>{t.orderActions.stockRestoredNotice}</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">{t.orderStatus.step5}</span>
                </div>
              )}

              {/* Fulfilment info strip */}
              <div className="p-3.5 rounded-xl bg-[#FAF6ED] border border-[#EBDDC4] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                    {t.fulfilment.title}
                  </span>
                  <span className="font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                    {ord.fulfilmentType === 'delivery' ? (
                      <>
                        <Truck className="w-3.5 h-3.5 text-[#285B37]" />
                        {t.fulfilment.delivery}
                      </>
                    ) : (
                      <>
                        <Store className="w-3.5 h-3.5 text-[#285B37]" />
                        {t.fulfilment.pickup}
                      </>
                    )}
                  </span>
                  <p className="text-stone-600 text-[11px] mt-0.5">
                    {ord.fulfilmentDetails.deliveryAddress || ord.fulfilmentDetails.farmPickupAddress}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                    {t.fulfilment.slot} & {t.checkout.paymentMethodLabel}
                  </span>
                  <span className="font-semibold text-stone-800 block mt-0.5">
                    {ord.fulfilmentDetails.scheduledSlot || ord.fulfilmentDetails.pickupTime || t.fulfilment.pickupTiming}
                  </span>
                  <span className="text-[11px] text-[#285B37] font-medium block mt-0.5">
                    {ord.paymentMethod === 'cash_on_delivery'
                      ? t.checkout.cashOnDelivery
                      : ord.paymentMethod === 'upi_online'
                      ? t.checkout.upiOnline
                      : t.checkout.bankTransfer}
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  {t.orderActions.orderItems}:
                </span>
                <div className="divide-y divide-stone-100">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <span className="text-stone-800">
                        {it.productName} — <strong>{it.quantity} {it.unit}</strong>{' '}
                        <span className="text-stone-400">({it.farmerName})</span>
                      </span>
                      <span className="font-mono font-bold text-stone-900 tabular-nums">
                        ₹{it.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer with Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-[#EBDDC4]/60 gap-3">
                <div>
                  <span className="text-xs text-stone-500 block">
                    {t.orderActions.orderTotal}:
                  </span>
                  <span className="font-serif text-xl font-bold text-[#285B37] font-mono tabular-nums">
                    ₹{ord.totalAmount.toLocaleString()}
                  </span>
                </div>

                {/* Buyer Cancel Action when permitted */}
                <div className="flex items-center gap-2">
                  {canCancelOrder(ord) ? (
                    cancellingOrderId === ord.id ? (
                      <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-2 rounded-xl text-xs">
                        <span className="text-rose-800 font-medium">{t.orderActions.confirmCancelDesc}</span>
                        <button
                          onClick={() => handleConfirmCancel(ord.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
                        >
                          {t.actions.cancel}
                        </button>
                        <button
                          onClick={() => setCancellingOrderId(null)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer"
                        >
                          {t.orderActions.keepOrder}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCancellingOrderId(ord.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                        title={t.orderActions.cancelOrder}
                      >
                        {t.orderActions.cancelOrder}
                      </button>
                    )
                  ) : ord.status === 'ready' || ord.status === 'completed' ? (
                    <span className="text-[11px] text-stone-400 font-medium">
                      {t.orderActions.cannotCancel}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
