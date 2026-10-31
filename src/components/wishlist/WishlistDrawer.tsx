import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, Trash2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    addToCart,
    language,
    t,
  } = useApp();

  React.useEffect(() => {
    if (!isWishlistOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, p.minOrderQuantity, 'delivery');
    });
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#FAF6ED] border-b border-[#EBDDC4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#285B37] text-white flex items-center justify-center shadow-xs">
                <Heart className="w-5 h-5 text-[#B9D49B] fill-[#B9D49B]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  {t.wishlist.title}
                </h2>
                <p className="text-xs text-stone-500">
                  {savedProducts.length} {t.wishlist.itemsSaved}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF6ED] flex items-center justify-center text-stone-400">
                  <Heart className="w-7 h-7 text-stone-300" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-800">
                  {t.wishlist.emptyTitle}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  {t.wishlist.emptyDesc}
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-4 py-2 bg-[#285B37] text-white rounded-xl text-xs font-semibold hover:bg-[#1E462A] cursor-pointer"
                >
                  {t.wishlist.exploreBtn}
                </button>
              </div>
            ) : (
              savedProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-[#EBDDC4] bg-[#FAF6ED]/40 space-y-3 hover:border-[#B9D49B] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name[language]}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-stone-900 text-sm line-clamp-1">
                          {p.name[language]}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-stone-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer shrink-0"
                          title={t.wishlist.remove}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {p.farmer.name} · {p.pickupLocation.farmName}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-1">
                        <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">
                          {p.pickupLocation.village}, {p.pickupLocation.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EBDDC4]/60">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#285B37] tabular-nums">
                        ₹{p.basePrice}
                      </span>
                      <span className="text-[11px] text-stone-500"> / {p.unit}</span>
                      <span className="text-[10px] text-stone-400 block">
                        {t.pricing.stockAvailable}: {p.availableQuantity} {p.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(p, p.minOrderQuantity, 'delivery');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#285B37] hover:bg-[#1E462A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B9D49B]" />
                      <span>{t.wishlist.moveToBasket}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedProducts.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FAF6ED] border-t border-[#EBDDC4] space-y-2">
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.wishlist.moveToBasket} ({savedProducts.length})</span>
                <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                {t.hero.badge}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
