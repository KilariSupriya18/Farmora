import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, Truck, Store, Plus, Check, ShieldCheck, Clock, Heart } from 'lucide-react';

interface ProduceCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProduceCard: React.FC<ProduceCardProps> = ({ product, onSelect }) => {
  const { language, userRole, addToCart, wishlist, toggleWishlist, t } = useApp();
  const [imageError, setImageError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const isB2B = userRole === 'retailer' || userRole === 'restaurant' || userRole === 'wholesaler';
  const isWishlisted = wishlist.includes(product.id);

  // Best tier discount for B2B preview
  const bestTier = product.bulkTiers.length > 0 ? product.bulkTiers[product.bulkTiers.length - 1] : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = isB2B ? product.bulkTiers[0]?.minQuantity || product.minOrderQuantity : 1;
    addToCart(product, qty, 'delivery');
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-[#EBDDC4] hover:border-[#285B37] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image Container with Fallback */}
      <div className="relative aspect-4/3 w-full bg-[#FAF6ED] overflow-hidden">
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.name[language]}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
            style={{ backgroundColor: `${product.fallbackColor}15` }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-xs"
              style={{ backgroundColor: product.fallbackColor, color: '#FFFFFF' }}
            >
              <span className="font-serif text-xl font-bold">
                {product.name[language].charAt(0)}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-800">
              {product.name[language]}
            </span>
            <span className="text-[11px] text-stone-500 mt-1">
              {product.pickupLocation.farmName}
            </span>
          </div>
        )}

        {/* Quiet Harvest Time Kicker on Top-Left */}
        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
          <Clock className="w-3 h-3 text-[#B9D49B]" />
          <span>{product.harvestDate}</span>
        </div>

        {/* Wishlist Button on Top-Right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-xs transition-all shadow-xs cursor-pointer ${
            isWishlisted
              ? 'bg-white text-red-500 shadow-sm'
              : 'bg-black/40 hover:bg-white text-white hover:text-red-500'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Organic Certification Tag */}
        {product.isOrganic && (
          <div className="absolute bottom-2.5 left-2.5 bg-[#285B37] text-white text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-[#B9D49B]" />
            <span>Organic Certified</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Farm Location */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#285B37] text-[11px]">
              {t.categories[product.category]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              {product.pickupLocation.village}, {product.pickupLocation.state}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-[#285B37] transition-colors">
            {product.name[language]}
          </h3>

          {/* Farmer Name & Farm Attribution with Indian Farmer Avatar */}
          <div className="flex items-center gap-1.5 mt-1.5">
            {product.farmer.photoUrl ? (
              <img
                src={product.farmer.photoUrl}
                alt={product.farmer.name}
                className="w-5 h-5 rounded-full object-cover border border-[#B9D49B] shrink-0"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-[#285B37] text-white text-[9px] flex items-center justify-center font-bold shrink-0">
                {product.farmer.name.charAt(0)}
              </div>
            )}
            <p className="text-xs text-stone-600 truncate">
              By <strong className="text-stone-800">{product.farmer.name}</strong> <span className="text-stone-400">({product.pickupLocation.farmName})</span>
            </p>
          </div>

          {/* Available Quantity */}
          <div className="flex items-center justify-between text-[11px] text-stone-600 mt-2 font-medium">
            <span className="text-[#285B37]">
              {t.pricing.stockAvailable}: <strong>{product.availableQuantity} {product.unit}</strong>
            </span>
            <span className="text-stone-400">
              {t.pricing.minOrder}: {product.minOrderQuantity} {product.unit}
            </span>
          </div>

          {/* Fulfilment availability */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1.5 pt-1.5 border-t border-[#EBDDC4]/50">
            {product.deliveryAvailable && (
              <span className="flex items-center gap-1 text-stone-700">
                <Truck className="w-3 h-3 text-[#285B37]" />
                {t.fulfilment.delivery} ({product.deliveryEstimateHours}h)
              </span>
            )}
            {product.fulfilment !== 'delivery' && (
              <>
                {product.deliveryAvailable && <span aria-hidden="true">·</span>}
                <span className="flex items-center gap-1 text-[#285B37] font-medium">
                  <Store className="w-3 h-3 text-[#285B37]" />
                  {t.fulfilment.pickup} ({product.pickupLocation.distanceKm} km)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#EBDDC4]/60 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-bold text-[#285B37] tabular-nums">
                ₹{product.basePrice}
              </span>
              <span className="text-xs text-stone-500">
                / {product.unit}
              </span>
            </div>

            {/* B2B wholesale incentive preview */}
            {isB2B && bestTier ? (
              <p className="text-[11px] text-[#E28236] font-semibold mt-0.5">
                {t.roles.wholesaler}: ₹{bestTier.pricePerUnit}/{product.unit} ({bestTier.savingsPercentage}% off)
              </p>
            ) : (
              <p className="text-[10px] text-stone-400 mt-0.5">
                {t.pricing.verifiedFarmer}
              </p>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
              addedAnim
                ? 'bg-[#B9D49B] text-[#1E462A]'
                : 'bg-[#285B37] hover:bg-[#1E462A] text-white'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>✓</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#B9D49B]" />
                <span>{t.actions.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
