import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceCard } from './ProduceCard';
import { ProduceCategory, Product, SortOption, AvailabilityFilter } from '../../types';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Sprout,
  Store,
  ArrowRight,
  ArrowUpDown,
  X,
  RotateCcw,
  Heart,
} from 'lucide-react';

interface MarketplaceViewProps {
  onOpenProduct: (product: Product) => void;
  onNavigateToFarmer: () => void;
  onNavigateToB2B: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onOpenProduct,
  onNavigateToFarmer,
  onNavigateToB2B,
}) => {
  const {
    products,
    language,
    t,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedStateFilter,
    setSelectedStateFilter,
    selectedFulfilmentFilter,
    setSelectedFulfilmentFilter,
    sortOption,
    setSortOption,
    availabilityFilter,
    setAvailabilityFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    resetFilters,
    wishlistCount,
    setIsWishlistOpen,
  } = useApp();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const categories: { key: ProduceCategory; label: string }[] = [
    { key: 'all', label: t.categories.all },
    { key: 'vegetables', label: t.categories.vegetables },
    { key: 'fruits', label: t.categories.fruits },
    { key: 'grains', label: t.categories.grains },
    { key: 'pulses', label: t.categories.pulses },
    { key: 'dairy', label: t.categories.dairy },
    { key: 'organic', label: t.categories.organic },
    { key: 'spices', label: t.categories.spices },
  ];

  const states = [
    { id: 'all', label: t.marketplace.allOrigins },
    { id: 'Telangana', label: 'Telangana' },
    { id: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { id: 'Maharashtra', label: 'Maharashtra' },
    { id: 'Tamil Nadu', label: 'Tamil Nadu' },
    { id: 'Punjab', label: 'Punjab' },
    { id: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { id: 'Jammu & Kashmir', label: 'Jammu & Kashmir' },
  ];

  // Filtering & Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const matchNameEn = p.name.en.toLowerCase().includes(q);
        const matchNameTe = p.name.te.toLowerCase().includes(q);
        const matchNameHi = p.name.hi.toLowerCase().includes(q);
        const matchFarmer = p.farmer.name.toLowerCase().includes(q);
        const matchFarm = p.pickupLocation.farmName.toLowerCase().includes(q);
        const matchVillage = p.pickupLocation.village.toLowerCase().includes(q);
        const matchDesc = p.description.en.toLowerCase().includes(q);
        return matchNameEn || matchNameTe || matchNameHi || matchFarmer || matchFarm || matchVillage || matchDesc;
      });
    }

    // 2. Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'organic') {
        list = list.filter((p) => p.isOrganic);
      } else if (activeCategory === 'dairy') {
        list = list.filter((p) => p.category === 'dairy' || p.category === 'dairy_honey');
      } else {
        list = list.filter((p) => p.category === activeCategory);
      }
    }

    // 3. Location filter
    if (selectedStateFilter !== 'all') {
      list = list.filter((p) => p.pickupLocation.state === selectedStateFilter);
    }

    // 4. Fulfilment filter
    if (selectedFulfilmentFilter === 'pickup') {
      list = list.filter((p) => p.fulfilment !== 'delivery');
    } else if (selectedFulfilmentFilter === 'delivery') {
      list = list.filter((p) => p.deliveryAvailable);
    }

    // 5. Price range filter
    if (minPrice !== null && !isNaN(minPrice)) {
      list = list.filter((p) => p.basePrice >= minPrice);
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
      list = list.filter((p) => p.basePrice <= maxPrice);
    }

    // 6. Availability filter
    if (availabilityFilter === 'in_stock') {
      list = list.filter((p) => p.inStock && p.availableQuantity > 0);
    } else if (availabilityFilter === 'bulk_available') {
      list = list.filter((p) => p.availableQuantity >= 100);
    }

    // 7. Sort options
    switch (sortOption) {
      case 'price_asc':
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price_desc':
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'popular':
        list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'recently_added':
      default:
        list.sort((a, b) => (b.createdAtTimestamp || 0) - (a.createdAtTimestamp || 0));
        break;
    }

    return list;
  }, [
    products,
    searchQuery,
    activeCategory,
    selectedStateFilter,
    selectedFulfilmentFilter,
    minPrice,
    maxPrice,
    availabilityFilter,
    sortOption,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    activeCategory !== 'all' ||
    selectedStateFilter !== 'all' ||
    selectedFulfilmentFilter !== 'all' ||
    minPrice !== null ||
    maxPrice !== null ||
    availabilityFilter !== 'all' ||
    sortOption !== 'recently_added';

  return (
    <div className="space-y-6 pb-20">
      
      {/* Sample Catalog Transparency Notice */}
      <div className="p-3.5 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#285B37] shrink-0" />
          <span className="font-semibold text-stone-900">
            {t.brand} · {t.tagline}
          </span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-600">
            {filteredAndSortedProducts.length} {t.marketplace.showingResults}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#EBDDC4] hover:border-[#285B37] text-stone-800 font-semibold cursor-pointer transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{t.nav.wishlist} ({wishlistCount})</span>
          </button>
        </div>
      </div>

      {/* Main Search & Quick Controls Bar */}
      <section className="bg-white rounded-3xl border border-[#EBDDC4] p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Row 1: Search Input + Origin State Selector + Sort Select */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input (Col 6) */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.marketplace.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 bg-[#FAF6ED]/40 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#285B37] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location State Filter (Col 3) */}
          <div className="md:col-span-3 relative">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-white">
              <MapPin className="w-4 h-4 text-[#285B37] shrink-0" />
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="w-full text-xs sm:text-sm text-stone-800 bg-transparent outline-none cursor-pointer font-medium"
              >
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Dropdown (Col 3) */}
          <div className="md:col-span-3 relative">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-white">
              <ArrowUpDown className="w-4 h-4 text-[#285B37] shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full text-xs sm:text-sm text-stone-800 bg-transparent outline-none cursor-pointer font-medium"
              >
                <option value="recently_added">{t.marketplace.recentlyAdded}</option>
                <option value="price_asc">{t.marketplace.priceLowHigh}</option>
                <option value="price_desc">{t.marketplace.priceHighLow}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Row 2: Category Filters Tabs */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#285B37] text-white shadow-xs'
                    : 'bg-[#FAF6ED] hover:bg-[#EBDDC4] text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter toggle trigger */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              isFilterPanelOpen || (minPrice !== null || maxPrice !== null || availabilityFilter !== 'all')
                ? 'bg-[#285B37] text-white border-[#285B37]'
                : 'bg-white hover:bg-[#FAF6ED] text-stone-700 border-[#EBDDC4]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.actions.filter}</span>
            {(minPrice !== null || maxPrice !== null || availabilityFilter !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-[#F4A261]" />
            )}
          </button>
        </div>

        {/* Expandable Advanced Filter Panel: Min/Max Price, Fulfilment, Availability */}
        {isFilterPanelOpen && (
          <div className="pt-4 border-t border-[#EBDDC4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
            
            {/* Price Filter (Min - Max) */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block">
                {t.marketplace.priceRange}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder={t.marketplace.minPrice}
                  min={0}
                  value={minPrice !== null ? minPrice : ''}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-stone-900"
                />
                <span className="text-stone-400 font-bold">—</span>
                <input
                  type="number"
                  placeholder={t.marketplace.maxPrice}
                  min={0}
                  value={maxPrice !== null ? maxPrice : ''}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-stone-900"
                />
              </div>
            </div>

            {/* Fulfilment Filter */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block">
                {t.fulfilment.title}
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentFilter('all')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    selectedFulfilmentFilter === 'all'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.fulfilment.all}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentFilter('delivery')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    selectedFulfilmentFilter === 'delivery'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.fulfilment.delivery}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentFilter('pickup')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    selectedFulfilmentFilter === 'pickup'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.fulfilment.pickup}
                </button>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-[#FAF6ED] border border-[#EBDDC4]">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block">
                {t.marketplace.availability}
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setAvailabilityFilter('all')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    availabilityFilter === 'all'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.marketplace.allHarvests}
                </button>
                <button
                  type="button"
                  onClick={() => setAvailabilityFilter('in_stock')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    availabilityFilter === 'in_stock'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.marketplace.onlyInStock}
                </button>
                <button
                  type="button"
                  onClick={() => setAvailabilityFilter('bulk_available')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    availabilityFilter === 'bulk_available'
                      ? 'bg-[#285B37] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  Bulk 100+
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Applied Filters Strip & Results Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#EBDDC4]/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">
              {filteredAndSortedProducts.length} {t.marketplace.showingResults}
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#285B37] hover:text-[#1E462A] font-semibold flex items-center gap-1 cursor-pointer underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.marketplace.clearAllFilters}</span>
            </button>
          )}
        </div>

      </section>

      {/* Product Cards Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProduceCard
              key={product.id}
              product={product}
              onSelect={onOpenProduct}
            />
          ))}
        </section>
      ) : (
        /* Empty Filter State */
        <div className="bg-white rounded-3xl border border-[#EBDDC4] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF6ED] text-[#285B37] flex items-center justify-center mx-auto">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            {t.marketplace.noProduceFound}
          </h3>
          <p className="text-xs text-stone-600">
            {t.marketplace.tryAdjusting}
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#285B37] text-white rounded-xl text-xs font-semibold hover:bg-[#1E462A] transition-colors cursor-pointer"
          >
            {t.marketplace.clearAllFilters}
          </button>
        </div>
      )}

      {/* Footer Role Guides for B2B & Farmer Direct */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-3xl bg-[#EEF4F0] border border-[#B9D49B] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#285B37] text-white flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5 text-[#B9D49B]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                {t.farmerPortal.title}
              </h4>
              <p className="text-stone-600 mt-0.5">
                {t.hero.farmerCta} · 0% commission
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToFarmer}
            className="px-4 py-2 bg-[#285B37] hover:bg-[#1E462A] text-white rounded-xl font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <span>{t.farmerPortal.addNewListing}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B9D49B]" />
          </button>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EBDDC4] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] text-[#285B37] border border-[#EBDDC4] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 text-[#285B37]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                {t.b2bPortal.title}
              </h4>
              <p className="text-stone-600 mt-0.5">
                {t.roles.retailer}, {t.roles.restaurant} & {t.roles.wholesaler}
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToB2B}
            className="px-4 py-2 bg-[#FAF6ED] hover:bg-[#EBDDC4] text-[#285B37] border border-[#EBDDC4] rounded-xl font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <span>{t.b2bPortal.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
