import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  ProduceCategory,
  Product,
  CartItem,
  Order,
  OrderStatus,
  SortOption,
  AvailabilityFilter,
  UserProfile,
} from '../types';
import { translations, TranslationKey } from '../data/translations';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  t: TranslationKey;
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  loginUser: (emailOrPhone: string, role?: UserRole) => void;
  signupUser: (profile: UserProfile) => void;
  logoutUser: () => void;
  activeDashboardTab: string;
  setActiveDashboardTab: (tab: string) => void;
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  activeCategory: ProduceCategory;
  setActiveCategory: (cat: ProduceCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStateFilter: string;
  setSelectedStateFilter: (state: string) => void;
  selectedFulfilmentFilter: 'all' | 'pickup' | 'delivery';
  setSelectedFulfilmentFilter: (f: 'all' | 'pickup' | 'delivery') => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  availabilityFilter: AvailabilityFilter;
  setAvailabilityFilter: (av: AvailabilityFilter) => void;
  minPrice: number | null;
  setMinPrice: (p: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (p: number | null) => void;
  resetFilters: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAddCropModalOpen: boolean;
  setIsAddCropModalOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  addToCart: (product: Product, quantity?: number, fulfilmentChoice?: 'pickup' | 'delivery') => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAtTimestamp'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  toggleProductInStock: (productId: string) => void;
  moderateProduct: (productId: string, status: 'approved' | 'flagged' | 'pending') => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  createOrder: (orderPayload: Omit<Order, 'id' | 'createdAt' | 'date'>) => Order;
  cancelOrder: (orderId: string, reason?: string) => void;
  canCancelOrder: (order: Order) => boolean;
  toggleFarmerVerification: (farmerId: string) => void;
  resetDemoData: () => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'farmora_products_v3';
const LOCAL_STORAGE_ORDERS = 'farmora_orders_v3';
const LOCAL_STORAGE_ROLE = 'farmora_role_v3';
const LOCAL_STORAGE_LANG = 'farmora_lang_v3';
const LOCAL_STORAGE_WISHLIST = 'farmora_wishlist_v3';
const LOCAL_STORAGE_USER = 'farmora_user_v3';

const DEFAULT_USERS_BY_ROLE: Record<UserRole, UserProfile> = {
  farmer: {
    name: 'Rameshwar Patil',
    email: 'rameshwar.patil@farmora.org',
    phone: '+91 98230 44120',
    role: 'farmer',
    farmName: 'Amrai Devgad Orchards',
    village: 'Devgad',
    district: 'Ratnagiri',
    state: 'Maharashtra',
    landAcreage: 18,
    certifications: 'GI-APEDA-MH-2026/041 · Organic NPOP',
  },
  household: {
    name: 'Sunita Sharma',
    email: 'sunita.sharma@gmail.com',
    phone: '+91 98490 12345',
    role: 'household',
    deliveryAddress: 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad, Telangana 500033',
  },
  retailer: {
    name: 'Sri Balaji Organics Mart',
    email: 'procurement@balajimart.in',
    phone: '+91 94411 90872',
    role: 'retailer',
    businessType: 'retailer',
    businessName: 'Sri Balaji Supermarket & Fresh Groceries',
    gstNumber: '36AAAAA0000A1Z5',
    deliveryAddress: 'Receiving Gate 2, Commercial Complex, Dilsukhnagar, Hyderabad 500060',
  },
  restaurant: {
    name: 'Chef Arvind Rao',
    email: 'arvind@olivebistrogreen.com',
    phone: '+91 91234 56789',
    role: 'restaurant',
    businessType: 'restaurant',
    businessName: 'The Olive Bistro & Organic Café',
    gstNumber: '36BBBBA1111B1Z2',
    deliveryAddress: 'Kitchen Receiving Dock, Road 45, Banjara Hills, Hyderabad 500034',
  },
  wholesaler: {
    name: 'Rajesh Agrawal',
    email: 'rajesh@deccanmanditraders.com',
    phone: '+91 93910 88210',
    role: 'wholesaler',
    businessType: 'wholesaler',
    businessName: 'Deccan Agriculture Trading & Mandi Logistics',
    gstNumber: '36CCCCA2222C1Z9',
    deliveryAddress: 'Warehouse Dock 4, Bowenpally APMC Market Yard, Secunderabad 500011',
  },
  admin: {
    name: 'Kavitha Ramamurthy',
    email: 'kavitha.admin@farmora.org',
    phone: '+91 1800-419-3276',
    role: 'admin',
    deliveryAddress: 'Farmora Operations Hub, Agri Tech Park, Hyderabad 500081',
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LANG);
    return (saved as Language) || 'en';
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ROLE);
    return (saved as UserRole) || 'household';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER);
      return saved ? JSON.parse(saved) : DEFAULT_USERS_BY_ROLE['household'];
    } catch {
      return DEFAULT_USERS_BY_ROLE['household'];
    }
  });

  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('overview');

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS);
      const list: Order[] = saved ? JSON.parse(saved) : INITIAL_ORDERS;
      return list.map((o: any) => ({
        ...o,
        status:
          o.status === 'pending'
            ? 'requested'
            : o.status === 'harvesting_packed'
            ? 'accepted'
            : o.status === 'in_transit_or_ready'
            ? 'ready'
            : o.status,
      }));
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-2', 'prod-4'];
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProduceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const [selectedFulfilmentFilter, setSelectedFulfilmentFilter] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recently_added');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_LANG, lang);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem(LOCAL_STORAGE_ROLE, role);
    setCurrentUser(DEFAULT_USERS_BY_ROLE[role] || DEFAULT_USERS_BY_ROLE['household']);
    setActiveDashboardTab('overview');
    showToast(`Switched active portal to ${translations[language].roles[role]}`, 'info');
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updates };
      return next;
    });
    showToast('Profile and settings updated successfully', 'success');
  };

  const loginUser = (emailOrPhone: string, role?: UserRole) => {
    const targetRole = role || userRole;
    setUserRoleState(targetRole);
    localStorage.setItem(LOCAL_STORAGE_ROLE, targetRole);
    
    const base = DEFAULT_USERS_BY_ROLE[targetRole];
    const user: UserProfile = {
      ...base,
      email: emailOrPhone.includes('@') ? emailOrPhone : base.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : base.phone,
    };
    setCurrentUser(user);
    setActiveDashboardTab('overview');
    showToast(`Signed in successfully as ${user.name} (${translations[language].roles[targetRole]})`, 'success');
  };

  const signupUser = (profile: UserProfile) => {
    setUserRoleState(profile.role);
    localStorage.setItem(LOCAL_STORAGE_ROLE, profile.role);
    setCurrentUser(profile);
    setActiveDashboardTab('overview');
    showToast(`Welcome to Farmora, ${profile.name}! Your account is active.`, 'success');
  };

  const logoutUser = () => {
    setUserRoleState('household');
    localStorage.setItem(LOCAL_STORAGE_ROLE, 'household');
    setCurrentUser(DEFAULT_USERS_BY_ROLE['household']);
    showToast('Signed out of session', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const toggleWishlist = (productId: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    const prodName = targetProduct ? targetProduct.name[language] : 'Produce item';

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed "${prodName}" from saved favorites`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${prodName}" to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const calculateEffectivePrice = (product: Product, quantity: number): { price: number; tierLabel?: string } => {
    let effective = product.basePrice;
    let label: string | undefined;

    const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQuantity - a.minQuantity);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQuantity) {
        effective = tier.pricePerUnit;
        label = tier.label;
        break;
      }
    }
    return { price: effective, tierLabel: label };
  };

  const addToCart = (product: Product, quantity: number = 1, fulfilmentChoice: 'pickup' | 'delivery' = 'delivery') => {
    // Look up live product to get current accurate availableQuantity
    const liveProduct = products.find((p) => p.id === product.id) || product;
    const maxStock = liveProduct.availableQuantity;

    if (maxStock <= 0 || !liveProduct.inStock) {
      showToast(`Sorry, ${product.name[language]} is currently out of stock.`, 'warning');
      return;
    }

    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.selectedFulfilment === fulfilmentChoice
    );
    const currentInCart = existingItem ? existingItem.quantity : 0;
    const requestedTotal = currentInCart + quantity;

    if (currentInCart >= maxStock) {
      showToast(`Cannot add more: Max available harvest stock (${maxStock} ${product.unit}) is already in your basket.`, 'warning');
      return;
    }

    const finalQty = Math.min(requestedTotal, maxStock);
    const addedActual = finalQty - currentInCart;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedFulfilment === fulfilmentChoice
      );

      const { price, tierLabel } = calculateEffectivePrice(product, finalQty);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: finalQty,
          appliedUnitPrice: price,
          tierApplied: tierLabel,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product: liveProduct,
            quantity: finalQty,
            selectedFulfilment: fulfilmentChoice,
            appliedUnitPrice: price,
            tierApplied: tierLabel,
          },
        ];
      }
    });

    if (requestedTotal > maxStock) {
      showToast(`Stock limit reached: Added remaining ${addedActual} ${product.unit} (Total: ${maxStock} ${product.unit})`, 'info');
    } else {
      showToast(`Added ${quantity} ${product.unit} of ${product.name[language]} to your basket`, 'success');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const liveProduct = products.find((p) => p.id === productId);
    const maxStock = liveProduct ? liveProduct.availableQuantity : 999999;

    let finalQty = quantity;
    if (quantity > maxStock) {
      finalQty = maxStock;
      showToast(`Cannot exceed available harvest stock (${maxStock} ${liveProduct?.unit || 'units'}).`, 'warning');
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const { price, tierLabel } = calculateEffectivePrice(item.product, finalQty);
          return {
            ...item,
            quantity: finalQty,
            appliedUnitPrice: price,
            tierApplied: tierLabel,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from basket', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'createdAtTimestamp'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProductData,
      id,
      createdAtTimestamp: Date.now(),
      moderationStatus: 'approved',
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Harvest listing "${newProduct.name[language]}" is now published!`, 'success');
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
    showToast('Crop listing updated successfully', 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Listing removed from farm catalog', 'info');
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, availableQuantity: Math.max(0, newStock), inStock: newStock > 0 } : p
      )
    );
    showToast('Product inventory updated', 'success');
  };

  const toggleProductInStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    showToast('Listing stock status updated', 'info');
  };

  const moderateProduct = (productId: string, status: 'approved' | 'flagged' | 'pending') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, moderationStatus: status } : p))
    );
    showToast(`Listing status updated to ${status.toUpperCase()}`, 'info');
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    if (targetOrder.status === 'cancelled') {
      showToast(`Order #${orderId} is already cancelled.`, 'info');
      return;
    }

    if (targetOrder.status === 'ready' || targetOrder.status === 'completed') {
      showToast(`Order #${orderId} cannot be cancelled as produce is already ${targetOrder.status}.`, 'warning');
      return;
    }

    // Restore reserved stock to live inventory
    setProducts((prev) =>
      prev.map((p) => {
        const orderItem = targetOrder.items.find((item) => item.productId === p.id);
        if (orderItem) {
          const restored = p.availableQuantity + orderItem.quantity;
          return {
            ...p,
            availableQuantity: restored,
            inStock: true,
          };
        }
        return p;
      })
    );

    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'cancelled' as OrderStatus } : ord))
    );

    showToast(`Order #${orderId} cancelled. Reserved stock restored to farmer inventory.`, 'info');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    if (newStatus === 'cancelled' && targetOrder.status !== 'cancelled') {
      cancelOrder(orderId, 'Status changed to cancelled');
      return;
    }

    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );

    const statusLabels: Record<OrderStatus, string> = {
      requested: 'Order Requested',
      accepted: 'Accepted by Farmer',
      ready: 'Ready for Pickup / Dispatch',
      completed: 'Completed & Fulfilled',
      cancelled: 'Cancelled',
    };

    showToast(`Order #${orderId} marked as ${statusLabels[newStatus]}`, 'success');
  };

  const canCancelOrder = (order: Order): boolean => {
    return order.status === 'requested' || order.status === 'accepted';
  };

  const createOrder = (orderPayload: Omit<Order, 'id' | 'createdAt' | 'date'>): Order => {
    // Validate stock to prevent overselling
    for (const item of orderPayload.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod || prod.availableQuantity < item.quantity) {
        const available = prod ? prod.availableQuantity : 0;
        showToast(`Stock limit reached for ${item.productName}: Only ${available} available.`, 'warning');
        throw new Error(`Insufficient stock for ${item.productName}`);
      }
    }

    // Deduct stock immediately upon order placement
    setProducts((prev) =>
      prev.map((p) => {
        const orderItem = orderPayload.items.find((item) => item.productId === p.id);
        if (orderItem) {
          const remaining = Math.max(0, p.availableQuantity - orderItem.quantity);
          return {
            ...p,
            availableQuantity: remaining,
            inStock: remaining > 0,
          };
        }
        return p;
      })
    );

    const newId = `FMR-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const newOrder: Order = {
      ...orderPayload,
      id: newId,
      date: now.toISOString().split('T')[0],
      createdAt: now.toISOString(),
      status: 'requested', // Initial state
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newId} submitted to farmer! Status: Requested`, 'success');
    return newOrder;
  };

  const toggleFarmerVerification = (farmerId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.farmer.id === farmerId) {
          return {
            ...p,
            farmer: {
              ...p.farmer,
              isVerified: !p.farmer.isVerified,
            },
          };
        }
        return p;
      })
    );
    showToast(`Updated farmer verification credentials`, 'success');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedStateFilter('all');
    setSelectedFulfilmentFilter('all');
    setSortOption('recently_added');
    setAvailabilityFilter('all');
    setMinPrice(null);
    setMaxPrice(null);
    showToast('Marketplace filters reset', 'info');
  };

  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setWishlist(['prod-1', 'prod-2', 'prod-4']);
    resetFilters();
    localStorage.removeItem(LOCAL_STORAGE_PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_ORDERS);
    localStorage.removeItem(LOCAL_STORAGE_WISHLIST);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    setCurrentUser(DEFAULT_USERS_BY_ROLE['household']);
    showToast('Demo data reset to fresh state', 'info');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.quantity * item.appliedUnitPrice,
    0
  );
  const wishlistCount = wishlist.length;

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userRole,
        setUserRole,
        t,
        currentUser,
        updateCurrentUser,
        loginUser,
        signupUser,
        logoutUser,
        activeDashboardTab,
        setActiveDashboardTab,
        products,
        orders,
        cart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
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
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAddCropModalOpen,
        setIsAddCropModalOpen,
        toasts,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        toggleProductInStock,
        moderateProduct,
        updateOrderStatus,
        createOrder,
        cancelOrder,
        canCancelOrder,
        toggleFarmerVerification,
        resetDemoData,
        cartCount,
        cartSubtotal,
        wishlistCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
