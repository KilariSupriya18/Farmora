import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import {
  X,
  CheckCircle2,
  Truck,
  Store,
  QrCode,
  Banknote,
  Building,
  ArrowRight,
  Package,
} from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
  onViewOrders: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onViewOrders }) => {
  const { cart, cartSubtotal, userRole, currentUser, createOrder, t, language, showToast } = useApp();

  const [buyerName, setBuyerName] = useState(currentUser.name || 'Sunita Sharma');
  const [buyerContact, setBuyerContact] = useState(currentUser.phone || '+91 98490 12345');
  
  // Explicit delivery vs pickup selection
  const [fulfilmentType, setFulfilmentType] = useState<'delivery' | 'pickup'>('delivery');
  
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser.deliveryAddress || 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad, Telangana - 500033'
  );
  const [deliverySlot, setDeliverySlot] = useState<'morning' | 'evening'>('morning');
  const [pickupDate, setPickupDate] = useState('Tomorrow, 9:00 AM');
  
  // Payment options: Cash on Pickup/Delivery or Simulated Demo Payment
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'upi_online' | 'bank_transfer_net30'>(
    userRole === 'wholesaler' || userRole === 'restaurant' || userRole === 'retailer'
      ? 'bank_transfer_net30'
      : 'cash_on_delivery'
  );

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Delivery fee calculation
  const deliveryFee = fulfilmentType === 'delivery' ? (cartSubtotal >= 1000 ? 0 : 60) : 0;
  const finalTotal = cartSubtotal + deliveryFee;

  // Farm locations for pickup
  const uniqueFarmLocations = Array.from(
    new Set(cart.map((i) => `${i.product.pickupLocation.farmName} (${i.product.pickupLocation.village}, ${i.product.pickupLocation.state})`))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fulfilmentType === 'delivery' && !deliveryAddress.trim()) {
      showToast(t.validation.addressRequired, 'warning');
      return;
    }

    const orderItems = cart.map((i) => ({
      productId: i.product.id,
      productName: i.product.name[language],
      quantity: i.quantity,
      unit: i.product.unit,
      unitPrice: i.appliedUnitPrice,
      totalPrice: i.quantity * i.appliedUnitPrice,
      farmerName: i.product.farmer.name,
    }));

    try {
      const newOrder = createOrder({
        buyerRole: userRole,
        buyerName,
        buyerContact,
        items: orderItems,
        totalAmount: finalTotal,
        fulfilmentType,
        fulfilmentDetails: {
          deliveryAddress: fulfilmentType === 'delivery' ? deliveryAddress : undefined,
          scheduledSlot:
            fulfilmentType === 'delivery'
              ? deliverySlot === 'morning'
                ? t.fulfilment.morningSlot
                : t.fulfilment.eveningSlot
              : undefined,
          pickupTime: fulfilmentType === 'pickup' ? pickupDate : undefined,
          farmPickupAddress: fulfilmentType === 'pickup' ? uniqueFarmLocations.join(', ') : undefined,
        },
        status: 'requested', // Step 1: Requested
        paymentMethod,
      });

      setConfirmedOrder(newOrder);
    } catch {
      // Stock validation error was surfaced in toast by createOrder
    }
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
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#FAF6ED] border-b border-[#EBDDC4] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {confirmedOrder ? t.checkout.confirmedTitle : t.checkout.modalTitle}
            </h3>
            <p className="text-xs text-stone-500">
              {confirmedOrder
                ? `Order #${confirmedOrder.id} · ${t.orderStatus.requested}`
                : t.hero.badge}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {confirmedOrder ? (
            /* Order Confirmation & Receipt */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#B9D49B]/30 text-[#285B37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#285B37]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  {t.checkout.confirmedTitle}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  {t.checkout.confirmedDesc}
                </p>
              </div>

              {/* Status Roadmap Highlight */}
              <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] text-left space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#EBDDC4]/60 pb-2">
                  <span className="font-semibold text-stone-800">Order ID: {confirmedOrder.id}</span>
                  <span className="text-stone-500 font-mono">{confirmedOrder.date}</span>
                </div>

                {/* 5-Stage Visual Tracker */}
                <div className="py-2">
                  <div className="text-[11px] font-semibold text-stone-600 mb-2">
                    {t.actions.updateStatus}: <span className="text-[#285B37] font-bold">{t.orderStatus.step1}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="p-2 rounded-lg bg-[#285B37] text-white font-bold">
                      1. {t.orderStatus.step1}
                    </div>
                    <div className="p-2 rounded-lg bg-stone-100 text-stone-400">
                      2. {t.orderStatus.step2}
                    </div>
                    <div className="p-2 rounded-lg bg-stone-100 text-stone-400">
                      3. {t.orderStatus.step3}
                    </div>
                    <div className="p-2 rounded-lg bg-stone-100 text-stone-400">
                      4. {t.orderStatus.step4}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>{t.checkout.buyerDetails}:</span>
                    <span className="font-medium text-stone-900">{confirmedOrder.buyerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.checkout.fulfilmentMethod}:</span>
                    <span className="font-medium text-stone-900 capitalize">
                      {confirmedOrder.fulfilmentType === 'delivery' ? t.checkout.deliveryOption : t.checkout.pickupOption}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.fulfilment.title}:</span>
                    <span className="font-medium text-stone-900 text-right max-w-xs truncate">
                      {confirmedOrder.fulfilmentDetails.deliveryAddress || confirmedOrder.fulfilmentDetails.farmPickupAddress}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EBDDC4]/60 font-bold text-sm text-[#285B37]">
                    <span>{t.checkout.totalPayable}:</span>
                    <span className="font-mono">₹{confirmedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewOrders();
                  }}
                  className="px-6 py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Package className="w-4 h-4 text-[#B9D49B]" />
                  <span>{t.checkout.viewOrdersBtn}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 border border-[#EBDDC4] bg-white hover:bg-[#FAF6ED] text-stone-800 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
                >
                  {t.checkout.continueShoppingBtn}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Buyer Contact details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  1. {t.checkout.buyerDetails}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {t.checkout.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 block">
                      {t.checkout.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerContact}
                      onChange={(e) => setBuyerContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Fulfilment Selection (Delivery vs Pickup) */}
              <div className="space-y-3 pt-2 border-t border-[#EBDDC4]">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  2. {t.checkout.fulfilmentMethod}
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfilmentType('delivery')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      fulfilmentType === 'delivery'
                        ? 'border-[#285B37] bg-[#EEF4F0] text-[#285B37] shadow-xs'
                        : 'border-[#EBDDC4] bg-white text-stone-700 hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <Truck className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-xs block">{t.fulfilment.delivery}</span>
                      <span className="text-[10px] text-stone-500 block">
                        {cartSubtotal >= 1000 ? t.checkout.freePickup : '₹60 standard fee'}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfilmentType('pickup')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      fulfilmentType === 'pickup'
                        ? 'border-[#285B37] bg-[#EEF4F0] text-[#285B37] shadow-xs'
                        : 'border-[#EBDDC4] bg-white text-stone-700 hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <Store className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-xs block">{t.fulfilment.pickup}</span>
                      <span className="text-[10px] text-stone-500 block">{t.checkout.freePickup}</span>
                    </div>
                  </button>
                </div>

                {/* Conditional Fields: Address for Delivery, or Farm info for Pickup */}
                {fulfilmentType === 'delivery' ? (
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        {t.checkout.deliveryAddress}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder={t.fulfilment.addressPrompt}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#285B37] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        {t.checkout.deliverySlotLabel}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliverySlot('morning')}
                          className={`py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                            deliverySlot === 'morning'
                              ? 'border-[#285B37] bg-[#285B37] text-white font-semibold'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {t.fulfilment.morningSlot}
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliverySlot('evening')}
                          className={`py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                            deliverySlot === 'evening'
                              ? 'border-[#285B37] bg-[#285B37] text-white font-semibold'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {t.fulfilment.eveningSlot}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-2 text-xs">
                    <span className="font-semibold text-stone-800 block">
                      {t.checkout.pickupLocationsTitle}
                    </span>
                    <ul className="space-y-1 text-stone-600 text-[11px]">
                      {uniqueFarmLocations.map((loc, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-[#285B37] shrink-0" />
                          <span>{loc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                        {t.checkout.pickupTimingLabel}:
                      </label>
                      <select
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 focus:outline-hidden"
                      >
                        <option value="Today, 3:00 PM – 6:00 PM">Today, 3:00 PM – 6:00 PM</option>
                        <option value="Tomorrow, 8:00 AM – 11:00 AM">Tomorrow, 8:00 AM – 11:00 AM</option>
                        <option value="Tomorrow, 3:00 PM – 6:00 PM">Tomorrow, 3:00 PM – 6:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method (Demo / Simulated / Cash) */}
              <div className="space-y-3 pt-2 border-t border-[#EBDDC4]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    3. {t.checkout.paymentMethodLabel}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">
                    Demo Mode
                  </span>
                </div>

                <div className="space-y-2">
                  <label
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-[#285B37] bg-[#EEF4F0]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Banknote className="w-4 h-4 text-[#285B37]" />
                      <div>
                        <span className="text-xs font-semibold text-stone-900 block">
                          {t.checkout.cashOnDelivery}
                        </span>
                        <span className="text-[10px] text-stone-500">{t.checkout.cashOnDeliveryDesc}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cash_on_delivery'}
                      onChange={() => setPaymentMethod('cash_on_delivery')}
                      className="text-[#285B37]"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('upi_online')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi_online'
                        ? 'border-[#285B37] bg-[#EEF4F0]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-4 h-4 text-[#285B37]" />
                      <div>
                        <span className="text-xs font-semibold text-stone-900 block">
                          {t.checkout.upiOnline}
                        </span>
                        <span className="text-[10px] text-stone-500">{t.checkout.upiOnlineDesc}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi_online'}
                      onChange={() => setPaymentMethod('upi_online')}
                      className="text-[#285B37]"
                    />
                  </label>

                  {(userRole === 'wholesaler' || userRole === 'restaurant' || userRole === 'retailer') && (
                    <label
                      onClick={() => setPaymentMethod('bank_transfer_net30')}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer_net30'
                          ? 'border-[#285B37] bg-[#EEF4F0]'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Building className="w-4 h-4 text-[#285B37]" />
                        <div>
                          <span className="text-xs font-semibold text-stone-900 block">
                            {t.checkout.bankTransfer}
                          </span>
                          <span className="text-[10px] text-stone-500">{t.checkout.bankTransferDesc}</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bank_transfer_net30'}
                        onChange={() => setPaymentMethod('bank_transfer_net30')}
                        className="text-[#285B37]"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-2 text-xs">
                <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] block">
                  {t.checkout.orderSummary}
                </span>

                <div className="space-y-1 divide-y divide-[#EBDDC4]/60">
                  {cart.map((i, idx) => (
                    <div key={idx} className="flex justify-between py-1 text-stone-700">
                      <span>
                        {i.product.name[language]} ({i.quantity} {i.product.unit})
                      </span>
                      <span className="font-mono font-medium">
                        ₹{(i.quantity * i.appliedUnitPrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EBDDC4] space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>{t.checkout.produceSubtotal}:</span>
                    <span className="font-mono font-semibold text-stone-900">₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.checkout.deliveryFee} ({fulfilmentType === 'delivery' ? t.fulfilment.delivery : t.fulfilment.pickup}):</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? <span className="text-[#285B37] font-semibold">{t.checkout.freePickup}</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#285B37]">
                    <span>{t.cart.platformFee}:</span>
                    <span className="font-semibold">{t.checkout.freePickup}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EBDDC4] flex justify-between items-baseline font-bold text-sm text-[#285B37]">
                  <span>{t.checkout.totalPayable}:</span>
                  <span className="font-mono text-base">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.checkout.submitBtn} (₹{finalTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
