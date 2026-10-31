import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, Truck, Store, ArrowRight, ShoppingBag, AlertTriangle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    products,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    t,
    language,
    showToast,
  } = useApp();

  React.useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  // Check if any cart item exceeds live available stock
  const overStockItems = cart.filter((item) => {
    const liveProd = products.find((p) => p.id === item.product.id) || item.product;
    return item.quantity > liveProd.availableQuantity;
  });

  const handleProceedToCheckout = () => {
    if (overStockItems.length > 0) {
      showToast(t.cart.overstockAlert, 'warning');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#FAF6ED] border-b border-[#EBDDC4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#285B37] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#B9D49B]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  {t.cart.title}
                </h2>
                <p className="text-xs text-stone-500">
                  {cartCount} {t.cart.unitsDirect}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Overstock Warning Banner if any stock changed */}
          {overStockItems.length > 0 && (
            <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t.cart.overstockAlert}</span>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF6ED] flex items-center justify-center text-[#285B37]">
                  <ShoppingBag className="w-7 h-7 text-stone-400" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-800">
                  {t.cart.emptyTitle}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  {t.cart.empty}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 bg-[#285B37] text-white rounded-xl text-xs font-semibold hover:bg-[#1E462A] cursor-pointer"
                >
                  {t.cart.exploreBtn}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const liveProd = products.find((p) => p.id === item.product.id) || item.product;
                const maxStock = liveProd.availableQuantity;
                const isAtLimit = item.quantity >= maxStock;
                const isOverStock = item.quantity > maxStock;
                const step = item.quantity >= 50 ? 25 : item.quantity >= 10 ? 5 : 1;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedFulfilment}`}
                    className={`p-3.5 rounded-2xl border transition-colors space-y-3 ${
                      isOverStock
                        ? 'border-amber-400 bg-amber-50/50'
                        : 'border-[#EBDDC4] bg-[#FAF6ED]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#285B37] font-semibold">
                          {item.selectedFulfilment === 'pickup' ? (
                            <span className="flex items-center gap-1">
                              <Store className="w-3 h-3 text-[#285B37]" />
                              {t.fulfilment.pickup} ({item.product.pickupLocation.farmName})
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-stone-600">
                              <Truck className="w-3 h-3 text-stone-400" />
                              {t.fulfilment.delivery}
                            </span>
                          )}
                        </div>

                        <h4 className="font-semibold text-stone-900 text-sm mt-0.5 truncate">
                          {item.product.name[language]}
                        </h4>

                        <p className="text-[11px] text-stone-500 truncate">
                          {t.pricing.verifiedFarmer}: {item.product.farmer.name} · {item.product.pickupLocation.village}
                        </p>

                        {/* Stock validation note */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-mono ${isOverStock ? 'text-rose-700 font-bold' : isAtLimit ? 'text-amber-700 font-semibold' : 'text-stone-500'}`}>
                            {t.pricing.stockAvailable}: {maxStock} {item.product.unit}
                          </span>
                        </div>

                        {item.tierApplied && (
                          <span className="text-[10px] font-semibold text-[#E28236] block mt-0.5">
                            Tier: {item.tierApplied}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                        title={t.actions.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EBDDC4]/60">
                      {/* Quantity Stepper with Stock Limit Prevention */}
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-[#EBDDC4] p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, Math.max(0, item.quantity - step))}
                          className="w-6 h-6 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="font-mono text-xs font-bold text-stone-800 w-10 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateCartQuantity(item.product.id, Math.min(maxStock, item.quantity + step))}
                          disabled={isAtLimit}
                          className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${
                            isAtLimit
                              ? 'text-stone-300 bg-stone-50 cursor-not-allowed'
                              : 'text-stone-700 hover:bg-stone-100'
                          }`}
                          title={isAtLimit ? 'Max available stock reached' : 'Increase quantity'}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal Calculation */}
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-[#285B37] tabular-nums block">
                          ₹{(item.quantity * item.appliedUnitPrice).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          ₹{item.appliedUnitPrice} / {item.product.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal, Fees & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FAF6ED] border-t border-[#EBDDC4] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    ₹{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#285B37]">
                  <span>{t.cart.platformFee}</span>
                  <span className="font-semibold">{t.checkout.freePickup}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.fulfilment.title}</span>
                  <span className="text-stone-700 font-medium">Selected at checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EBDDC4] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">
                    {t.cart.total}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#285B37] font-mono tabular-nums">
                    ₹{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  disabled={overStockItems.length > 0}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all ${
                    overStockItems.length > 0
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-[#285B37] hover:bg-[#1E462A] text-white cursor-pointer'
                  }`}
                >
                  <span>{t.actions.checkout}</span>
                  <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-stone-400 hover:text-stone-600 underline cursor-pointer"
                >
                  {t.cart.clearCart}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
