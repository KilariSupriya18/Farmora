export type Language = 'en' | 'te' | 'hi';

export type UserRole =
  | 'farmer'
  | 'household'
  | 'retailer'
  | 'restaurant'
  | 'wholesaler'
  | 'admin';

export type ProduceCategory =
  | 'all'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'pulses'
  | 'dairy'
  | 'dairy_honey'
  | 'spices'
  | 'organic';

export type FulfilmentOption = 'pickup' | 'delivery' | 'both';

export type SortOption =
  | 'recently_added'
  | 'price_asc'
  | 'price_desc'
  | 'popular';

export type AvailabilityFilter = 'all' | 'in_stock' | 'bulk_available';

export type QualityGrade =
  | 'Organic Certified (NPOP)'
  | 'Natural ZBNF (Chemical Free)'
  | 'Grade A Premium (Export Quality)'
  | 'Grade B Standard Fresh';

export interface FarmerProfile {
  id: string;
  name: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  experienceYears: number;
  landAcreage: number;
  isVerified: boolean;
  bio: {
    en: string;
    te: string;
    hi: string;
  };
  specialties: string[];
  certificationNumber: string;
  avatarUrl?: string;
  photoUrl?: string;
  rating: number;
}

export interface BulkPricingTier {
  minQuantity: number;
  unit: string;
  pricePerUnit: number;
  label: string;
  savingsPercentage: number;
}

export interface Product {
  id: string;
  createdAtTimestamp: number;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  category: Exclude<ProduceCategory, 'all'>;
  description: {
    en: string;
    te: string;
    hi: string;
  };
  unit: 'kg' | 'quintal' | 'crate (25kg)' | 'bundle' | 'litre';
  basePrice: number; // in ₹ INR per unit
  availableQuantity: number;
  minOrderQuantity: number;
  harvestDate: string;
  shelfLifeDays: number;
  qualityGrade: QualityGrade;
  certificationNumber?: string;
  fulfilment: FulfilmentOption;
  pickupLocation: {
    farmName: string;
    village: string;
    district: string;
    state: string;
    pickupTiming: string;
    distanceKm: number;
  };
  deliveryAvailable: boolean;
  deliveryEstimateHours: number;
  farmer: {
    id: string;
    name: string;
    phone: string;
    experienceYears: number;
    landAcreage: number;
    isVerified: boolean;
    photoPlaceholderBg?: string;
    photoUrl?: string;
  };
  bulkTiers: BulkPricingTier[];
  imageUrl: string;
  fallbackColor: string;
  isOrganic: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  moderationStatus?: 'approved' | 'pending' | 'flagged';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  businessType?: 'retailer' | 'restaurant' | 'wholesaler';
  businessName?: string;
  gstNumber?: string;
  deliveryAddress?: string;
  farmName?: string;
  village?: string;
  district?: string;
  state?: string;
  landAcreage?: number;
  certifications?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFulfilment: 'pickup' | 'delivery';
  appliedUnitPrice: number;
  tierApplied?: string;
}

export type OrderStatus =
  | 'requested'
  | 'accepted'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  date: string;
  buyerRole: UserRole;
  buyerName: string;
  buyerContact: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    farmerName: string;
  }[];
  totalAmount: number;
  fulfilmentType: 'pickup' | 'delivery';
  fulfilmentDetails: {
    deliveryAddress?: string;
    scheduledSlot?: string;
    pickupTime?: string;
    farmPickupAddress?: string;
  };
  status: OrderStatus;
  paymentMethod: 'cash_on_delivery' | 'upi_online' | 'bank_transfer_net30';
  notes?: string;
  createdAt: string;
}

export interface RoleConfig {
  id: UserRole;
  label: {
    en: string;
    te: string;
    hi: string;
  };
  tagline: {
    en: string;
    te: string;
    hi: string;
  };
  badgeColor: string;
  typicalOrderScale: string;
}
