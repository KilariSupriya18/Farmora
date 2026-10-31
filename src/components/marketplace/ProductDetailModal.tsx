import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Store,
  Phone,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
  Award,
  ArrowRight,
  Heart,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { language, userRole, addToCart, isInWishlist, toggleWishlist, t, showToast } = useApp();

  const [quantity, setQuantity] = useState<number>(
    userRole === 'retailer' || userRole === 'restaurant'
      ? product.bulkTiers[0]?.minQuantity || product.minOrderQuantity
      : product.minOrderQuantity
  );

  const [selectedFulfilment, setSelectedFulfilment] = useState<'pickup' | 'delivery'>(
    product.fulfilment === 'pickup' ? 'pickup' : 'delivery'
  );

  const [imageError, setImageError] = useState(false);

  // Calculate tier applied
  let unitPrice = product.basePrice;
  let activeTierName = 'Standard Base Rate';
  let savings = 0;

  const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQuantity - a.minQuantity);
  for (const tier of sortedTiers) {
    if (quantity >= tier.minQuantity) {
      unitPrice = tier.pricePerUnit;
      activeTierName = tier.label;
      savings = tier.savingsPercentage;
      break;
    }
  }

  const totalPrice = quantity * unitPrice;

  const handleAdd = () => {
    addToCart(product, quantity, selectedFulfilment);
    onClose();
  };

  const handleRequestB2B = () => {
    showToast(`Bulk inquiry submitted to farmer ${product.farmer.name}. You will receive a direct call at your registered number.`, 'success');
    onClose();
  };

  const isWishlisted = isInWishlist(product.id);

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
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EBDDC4] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        
        {/* Modal Top Buttons: Wishlist & Close */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full shadow-md transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-white text-red-500'
                : 'bg-white/90 hover:bg-white text-stone-700 hover:text-red-500'
            }`}
            title={isWishlisted ? 'Remove from Saved' : 'Save to Favorites'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
            
            {/* Left: Product Image & Freshness Badges */}
            <div className="relative aspect-4/3 md:aspect-auto md:min-h-full bg-[#FAF6ED] overflow-hidden">
              {!imageError ? (
                <img
                  src={product.imageUrl}
                  alt={product.name[language]}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                  style={{ backgroundColor: `${product.fallbackColor}20` }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-sm"
                    style={{ backgroundColor: product.fallbackColor, color: '#fff' }}
                  >
                    <span className="font-serif text-3xl font-bold">
                      {product.name[language].charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {product.name[language]}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {product.pickupLocation.farmName}
                  </p>
                </div>
              )}

              {/* Scrim overlay for kicker */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#B9D49B]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Harvested: {product.harvestDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>Shelf life: {product.shelfLifeDays} days</span>
                </div>
                <p className="text-xs text-white/90">
                  {product.qualityGrade}
                </p>
              </div>
            </div>

            {/* Right: Specifications, Farmer Transparency, Volume Calculator */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Category & Status */}
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="uppercase tracking-wider font-bold text-[#285B37]">
                    {t.categories[product.category]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Batch Ref: {product.id}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {product.name[language]}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {product.description[language]}
                  </p>
                </div>

                {/* Farmer Profile Card */}
                <div className="p-3.5 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {product.farmer.photoUrl ? (
                        <img
                          src={product.farmer.photoUrl}
                          alt={product.farmer.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-[#285B37] shrink-0 shadow-xs"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#285B37] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {product.farmer.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900">
                            {product.farmer.name}
                          </span>
                          {product.farmer.isVerified && (
                            <span className="text-[10px] text-[#285B37] font-semibold flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3 text-[#285B37]" />
                              Verified Grower
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">
                          {product.pickupLocation.farmName} · {product.farmer.experienceYears} yrs farming
                        </p>
                      </div>
                    </div>

                    <a
                      href={`tel:${product.farmer.phone}`}
                      onClick={(e) => {
                        e.preventDefault();
                        showToast(`Farmer contact: ${product.farmer.phone}`, 'info');
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-[#285B37] text-[#285B37] hover:bg-[#285B37] hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{t.pricing.directContact}</span>
                    </a>
                  </div>

                  <div className="text-[11px] text-stone-600 flex items-center gap-1 pt-1 border-t border-[#EBDDC4]/50">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>
                      {product.pickupLocation.village}, {product.pickupLocation.district}, {product.pickupLocation.state}
                    </span>
                    <span className="text-stone-400">({product.pickupLocation.distanceKm} km away)</span>
                  </div>
                </div>

                {/* Wholesale Bulk Pricing Tiers Matrix */}
                {product.bulkTiers.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-stone-700 block">
                      Wholesale & B2B Volume Pricing:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {product.bulkTiers.map((tier) => {
                        const isCurrent = quantity >= tier.minQuantity;
                        return (
                          <button
                            key={tier.label}
                            type="button"
                            onClick={() => setQuantity(tier.minQuantity)}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-[#285B37] bg-[#EEF4F0]'
                                : 'border-[#EBDDC4] bg-white hover:bg-[#FAF6ED]'
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-stone-500 block truncate">
                              {tier.minQuantity}+ {tier.unit}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#285B37] block tabular-nums">
                              ₹{tier.pricePerUnit}/{product.unit}
                            </span>
                            <span className="text-[9px] font-bold text-[#E28236]">
                              Save {tier.savingsPercentage}%
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fulfilment Choice: Pickup vs Delivery */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-700 block">
                    {t.fulfilment.title}:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFulfilment('delivery')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedFulfilment === 'delivery'
                          ? 'border-[#285B37] bg-[#EEF4F0] ring-1 ring-[#285B37]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                        <Truck className="w-3.5 h-3.5 text-[#285B37]" />
                        <span>{t.fulfilment.delivery}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        {t.fulfilment.deliveryDesc} ({product.deliveryEstimateHours}h).
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFulfilment('pickup')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedFulfilment === 'pickup'
                          ? 'border-[#285B37] bg-[#EEF4F0] ring-1 ring-[#285B37]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                        <Store className="w-3.5 h-3.5 text-[#285B37]" />
                        <span>{t.fulfilment.pickup}</span>
                      </div>
                      <p className="text-[11px] text-[#285B37] font-semibold mt-1">
                        {t.fulfilment.pickupTiming}: {product.pickupLocation.pickupTiming}
                      </p>
                    </button>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs font-semibold text-stone-700 block">
                      Select Quantity:
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Min order: {product.minOrderQuantity} {product.unit} · Available: {product.availableQuantity} {product.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-[#FAF6ED] rounded-xl p-1 border border-[#EBDDC4]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(product.minOrderQuantity, q - (q > 50 ? 25 : q > 10 ? 5 : 1)))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 flex items-center justify-center text-stone-800 font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="px-2 font-mono text-sm font-bold text-stone-900 tabular-nums text-center min-w-[50px]">
                      {quantity} <span className="text-xs font-normal text-stone-600">{product.unit}</span>
                    </div>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.availableQuantity, q + (q >= 50 ? 25 : q >= 10 ? 5 : 1)))}
                      disabled={quantity >= product.availableQuantity}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors shadow-2xs ${
                        quantity >= product.availableQuantity
                          ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                          : 'bg-white hover:bg-stone-100 text-stone-800 cursor-pointer'
                      }`}
                      title={quantity >= product.availableQuantity ? 'Max available stock reached' : 'Increase quantity'}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {quantity >= product.availableQuantity && (
                  <p className="text-[10px] text-amber-700 font-semibold text-right">
                    Only {product.availableQuantity} {product.unit} available in current harvest
                  </p>
                )}

              </div>

              {/* Price Calculation & Action */}
              <div className="pt-4 border-t border-[#EBDDC4] space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block">
                      Effective Rate: ₹{unitPrice}/{product.unit} {savings > 0 && `(${savings}% bulk saving applied)`}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#285B37] font-mono tabular-nums">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#285B37] font-semibold block">
                      0% Farmer Platform Deductions
                    </span>
                    <span className="text-[10px] text-stone-400">
                      100% of harvest value goes to grower
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleAdd}
                    disabled={product.availableQuantity <= 0 || !product.inStock}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors ${
                      product.availableQuantity <= 0 || !product.inStock
                        ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        : 'bg-[#285B37] hover:bg-[#1E462A] text-white cursor-pointer'
                    }`}
                  >
                    <span>
                      {product.availableQuantity <= 0 || !product.inStock
                        ? t.pricing.outOfStock
                        : t.actions.addToCart}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#B9D49B]" />
                  </button>

                  <button
                    onClick={handleRequestB2B}
                    className="w-full py-3 px-4 bg-[#FAF6ED] hover:bg-[#EBDDC4] border border-[#EBDDC4] text-[#285B37] rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {t.actions.requestB2BQuote}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
