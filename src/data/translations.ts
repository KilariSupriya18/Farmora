import { Language } from '../types';

export interface TranslationSchema {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    marketplace: string;
    farmerPortal: string;
    bulkB2B: string;
    adminPortal: string;
    orders: string;
    cart: string;
    dashboard: string;
    signIn: string;
    wishlist: string;
    exploreProducts: string;
    howItWorks: string;
    aboutUs: string;
    getStarted: string;
  };
  roles: {
    farmer: string;
    household: string;
    retailer: string;
    restaurant: string;
    wholesaler: string;
    admin: string;
    farmerSub: string;
    householdSub: string;
    retailerSub: string;
    restaurantSub: string;
    wholesalerSub: string;
    adminSub: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    allLocations: string;
    exploreCta: string;
    farmerCta: string;
    trustDirect: string;
    trustFresh: string;
    trustTransparent: string;
    trustFulfilment: string;
  };
  categories: {
    all: string;
    vegetables: string;
    fruits: string;
    grains: string;
    pulses: string;
    dairy: string;
    spices: string;
    dairy_honey: string;
    organic: string;
  };
  fulfilment: {
    title: string;
    all: string;
    pickup: string;
    delivery: string;
    pickupDesc: string;
    deliveryDesc: string;
    slot: string;
    morningSlot: string;
    eveningSlot: string;
    pickupTiming: string;
    addressPrompt: string;
    farmLocation: string;
    distance: string;
  };
  pricing: {
    perUnit: string;
    minOrder: string;
    bulkSavings: string;
    viewTiers: string;
    harvestDate: string;
    shelfLife: string;
    days: string;
    grade: string;
    verifiedFarmer: string;
    directContact: string;
    inStock: string;
    outOfStock: string;
    stockAvailable: string;
  };
  actions: {
    addToCart: string;
    requestB2BQuote: string;
    bookPickup: string;
    viewDetails: string;
    checkout: string;
    addProduce: string;
    updateStatus: string;
    verifyFarm: string;
    filter: string;
    reset: string;
    close: string;
    submitOrder: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    continueShopping: string;
    proceedCheckout: string;
    viewOrders: string;
    login: string;
    signUp: string;
    back: string;
  };
  orderStatus: {
    requested: string;
    accepted: string;
    ready: string;
    completed: string;
    cancelled: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  orderActions: {
    acceptOrder: string;
    rejectOrder: string;
    markReady: string;
    markCompleted: string;
    cancelOrder: string;
    confirmCancelTitle: string;
    confirmCancelDesc: string;
    keepOrder: string;
    cannotCancel: string;
    stockRestoredNotice: string;
    trackingTitle: string;
    trackingSubtitle: string;
    farmGuaranteed: string;
    filterAll: string;
    noOrders: string;
    orderedOn: string;
    orderTotal: string;
    orderItems: string;
  };
  checkout: {
    modalTitle: string;
    buyerDetails: string;
    fullName: string;
    phoneNumber: string;
    deliveryAddress: string;
    fulfilmentMethod: string;
    deliveryOption: string;
    pickupOption: string;
    deliverySlotLabel: string;
    pickupTimingLabel: string;
    pickupLocationsTitle: string;
    paymentMethodLabel: string;
    cashOnDelivery: string;
    cashOnDeliveryDesc: string;
    upiOnline: string;
    upiOnlineDesc: string;
    bankTransfer: string;
    bankTransferDesc: string;
    orderSummary: string;
    produceSubtotal: string;
    deliveryFee: string;
    freePickup: string;
    totalPayable: string;
    submitBtn: string;
    confirmedTitle: string;
    confirmedDesc: string;
    viewOrdersBtn: string;
    continueShoppingBtn: string;
  };
  marketplace: {
    searchPlaceholder: string;
    filtersTitle: string;
    allOrigins: string;
    priceRange: string;
    minPrice: string;
    maxPrice: string;
    availability: string;
    allHarvests: string;
    onlyInStock: string;
    sortBy: string;
    priceLowHigh: string;
    priceHighLow: string;
    recentlyAdded: string;
    showingResults: string;
    noProduceFound: string;
    tryAdjusting: string;
    clearAllFilters: string;
    viewProduceDetails: string;
    quickAdd: string;
    addedNotification: string;
  };
  dashboard: {
    dashboard: string;
    welcome: string;
    switchPerspective: string;
    navigation: string;
    browseMarketplace: string;
    savedWishlist: string;
    shoppingBasket: string;
    signOut: string;
    homePage: string;
    exploreMarket: string;
    overviewTab: string;
    productsTab: string;
    ordersTab: string;
    profileTab: string;
    currentOrdersTab: string;
    historyTab: string;
    savedTab: string;
    businessTab: string;
    moderationTab: string;
    farmersTab: string;
    analyticsTab: string;
    statEarnings: string;
    statActiveCrops: string;
    statPendingOrders: string;
    statInventory: string;
    statSpent: string;
    statCurrentOrders: string;
    statSavedItems: string;
    saveProfile: string;
    updateStock: string;
  };
  wishlist: {
    title: string;
    itemsSaved: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    moveToBasket: string;
    remove: string;
    clearAll: string;
  };
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    emailOrPhone: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    selectRole: string;
    businessType: string;
    keepSignedIn: string;
    signInBtn: string;
    signUpBtn: string;
    alreadyHaveAccount: string;
    needAccount: string;
    backToHome: string;
  };
  farmerPortal: {
    title: string;
    subtitle: string;
    totalRevenue: string;
    activeListings: string;
    pendingDispatch: string;
    farmAcreage: string;
    addNewListing: string;
    cropName: string;
    cropCategory: string;
    basePrice: string;
    availableQty: string;
    unitSelect: string;
    bulkTierConfig: string;
    allowPickup: string;
    allowDelivery: string;
    dispatchOrders: string;
  };
  b2bPortal: {
    title: string;
    subtitle: string;
    tierTitle: string;
    sampleBox: string;
    recurringContract: string;
    logisticsNote: string;
  };
  adminPortal: {
    title: string;
    subtitle: string;
    verifiedCount: string;
    totalVolumeTraded: string;
    disputeRate: string;
    verifyBtn: string;
    verifiedStatus: string;
    pendingReview: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    platformFee: string;
    deliveryFee: string;
    freePickup: string;
    total: string;
    placeOrder: string;
    orderConfirmed: string;
    orderNumber: string;
    unitsDirect: string;
    emptyTitle: string;
    exploreBtn: string;
    proceedCheckout: string;
    clearCart: string;
    overstockAlert: string;
  };
  validation: {
    stockWarning: string;
    addressRequired: string;
    orderSuccess: string;
    orderCancelled: string;
    profileSaved: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    brand: 'Farmora',
    tagline: 'Fresh from farms. Directly to you.',
    nav: {
      home: 'Home',
      marketplace: 'Marketplace',
      farmerPortal: 'Farmer Studio',
      bulkB2B: 'B2B & Wholesale',
      adminPortal: 'Market Oversight',
      orders: 'My Orders',
      cart: 'Cart',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      wishlist: 'Wishlist',
      exploreProducts: 'Explore Products',
      howItWorks: 'How It Works',
      aboutUs: 'About Us',
      getStarted: 'Get Started',
    },
    roles: {
      farmer: 'Farmer',
      household: 'Household Buyer',
      retailer: 'Retailer (Store)',
      restaurant: 'Restaurant & Chef',
      wholesaler: 'Wholesaler (Mandi)',
      admin: 'Market Admin',
      farmerSub: 'List crops, inventory & track dispatch',
      householdSub: 'Fresh daily kitchen staples from nearby farms',
      retailerSub: 'Bulk weekly shop replenishment at tiered rates',
      restaurantSub: 'Grade-A morning farm deliveries for kitchens',
      wholesalerSub: 'Metric tons & truckload freight directly from fields',
      adminSub: 'Farmer verification, dispute resolution & volume analytics',
    },
    hero: {
      badge: 'Zero Middleman Markup · 100% Direct Farmer Payout',
      title: 'Harvested Today. On Your Table Tomorrow.',
      subtitle: 'Connecting passionate growers with family tables, neighborhood stores, artisan restaurants, and agricultural traders.',
      searchPlaceholder: 'Search tomatoes, Alphonso mangoes, organic rice, cold-pressed oils...',
      searchBtn: 'Find Produce',
      allLocations: 'All Farm Origins',
      exploreCta: 'Explore Fresh Produce',
      farmerCta: 'Join as a Farmer',
      trustDirect: 'Direct Farmer Connections',
      trustFresh: 'Peak Field Freshness',
      trustTransparent: 'Transparent Fair Pricing',
      trustFulfilment: 'Flexible Pickup & Chilled Delivery',
    },
    categories: {
      all: 'All Harvests',
      vegetables: 'Vegetables',
      fruits: 'Fresh Fruits',
      grains: 'Grains',
      pulses: 'Pulses & Lentils',
      dairy: 'Dairy Products',
      spices: 'Spices & Herbs',
      dairy_honey: 'Dairy & Honey',
      organic: 'Organic Certified',
    },
    fulfilment: {
      title: 'Fulfilment Method',
      all: 'All Methods',
      pickup: 'Farm Gate Pickup',
      delivery: 'Direct Farm Delivery',
      pickupDesc: 'Collect directly at farm gate. Meet the grower & zero delivery fee.',
      deliveryDesc: 'Chilled transit straight from the field to your door or warehouse dock.',
      slot: 'Preferred Slot',
      morningSlot: 'Morning (6:00 AM – 9:30 AM)',
      eveningSlot: 'Evening (4:30 PM – 8:00 PM)',
      pickupTiming: 'Daily pickup window: 7:00 AM – 6:00 PM',
      addressPrompt: 'Enter your delivery address / warehouse dock',
      farmLocation: 'Farm Gate Location',
      distance: 'km from your location',
    },
    pricing: {
      perUnit: 'per',
      minOrder: 'Min order',
      bulkSavings: 'Tiered Bulk Pricing Available',
      viewTiers: 'View Wholesale Tiers',
      harvestDate: 'Harvested',
      shelfLife: 'Shelf Life',
      days: 'days',
      grade: 'Quality Grade',
      verifiedFarmer: 'Verified Grower',
      directContact: 'Call Farmer',
      inStock: 'In Stock',
      outOfStock: 'Harvest Exhausted',
      stockAvailable: 'available in field storage',
    },
    actions: {
      addToCart: 'Add to Cart',
      requestB2BQuote: 'Request Bulk Contract',
      bookPickup: 'Book Farm Pickup',
      viewDetails: 'View Farm Details',
      checkout: 'Proceed to Checkout',
      addProduce: 'Add Fresh Crop Batch',
      updateStatus: 'Update Dispatch',
      verifyFarm: 'Verify Farm Badge',
      filter: 'Filter',
      reset: 'Reset Filters',
      close: 'Close',
      submitOrder: 'Confirm Direct Order',
      save: 'Save Changes',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      continueShopping: 'Continue Shopping',
      proceedCheckout: 'Proceed to Checkout',
      viewOrders: 'View My Orders',
      login: 'Sign In',
      signUp: 'Register Account',
      back: 'Back',
    },
    orderStatus: {
      requested: '1. Requested (Awaiting Farmer)',
      accepted: '2. Accepted by Farmer',
      ready: '3. Harvested & Ready',
      completed: '4. Completed & Fulfilled',
      cancelled: '5. Cancelled (Stock Restored)',
      step1: 'Requested',
      step2: 'Accepted',
      step3: 'Ready',
      step4: 'Completed',
      step5: 'Cancelled',
    },
    orderActions: {
      acceptOrder: 'Accept Order',
      rejectOrder: 'Reject Order',
      markReady: 'Mark Ready for Pickup/Dispatch',
      markCompleted: 'Mark Completed & Fulfilled',
      cancelOrder: 'Cancel Order',
      confirmCancelTitle: 'Confirm Order Cancellation',
      confirmCancelDesc: 'Are you sure you want to cancel this order? The reserved produce quantity will be immediately restored to the farmer’s live available inventory.',
      keepOrder: 'Keep Order Active',
      cannotCancel: 'Order is already packed or completed and cannot be cancelled.',
      stockRestoredNotice: 'Reserved stock was automatically returned to available inventory.',
      trackingTitle: 'Order Tracking & Harvest History',
      trackingSubtitle: 'Direct field status updates, delivery schedules, and farmer pickup receipts',
      farmGuaranteed: 'Direct Farm Origin Guaranteed',
      filterAll: 'All Orders',
      noOrders: 'No orders found matching this filter.',
      orderedOn: 'Ordered on',
      orderTotal: 'Order Total',
      orderItems: 'Ordered Items',
    },
    checkout: {
      modalTitle: 'Complete Direct Farm Order',
      buyerDetails: 'Buyer Information',
      fullName: 'Full Name',
      phoneNumber: 'Contact Phone Number',
      deliveryAddress: 'Delivery Address or Warehouse Dock',
      fulfilmentMethod: 'Fulfilment Method',
      deliveryOption: 'Direct Delivery to Door',
      pickupOption: 'Farm Gate Pickup',
      deliverySlotLabel: 'Preferred Delivery Schedule',
      pickupTimingLabel: 'Pickup Window & Timing',
      pickupLocationsTitle: 'Farm Gate Origin Locations:',
      paymentMethodLabel: 'Payment Option',
      cashOnDelivery: 'Cash on Delivery / Pickup',
      cashOnDeliveryDesc: 'Inspect fresh harvest produce before completing payment on site.',
      upiOnline: 'Simulated UPI / Digital Payment',
      upiOnlineDesc: 'Demonstration of instant digital direct settlement to the grower.',
      bankTransfer: 'B2B Trade Invoice (Net-30)',
      bankTransferDesc: 'Available for supermarkets, hotels and agricultural trade enterprises.',
      orderSummary: 'Order Summary',
      produceSubtotal: 'Produce Subtotal',
      deliveryFee: 'Delivery Fee',
      freePickup: 'FREE (Farm Pickup)',
      totalPayable: 'Total Payable',
      submitBtn: 'Confirm & Submit Order',
      confirmedTitle: 'Order Successfully Placed!',
      confirmedDesc: 'Your order has been directly submitted to the farmer. Reserved produce stock has been allocated.',
      viewOrdersBtn: 'Track in My Orders',
      continueShoppingBtn: 'Explore More Produce',
    },
    marketplace: {
      searchPlaceholder: 'Search tomatoes, Alphonso mangoes, organic rice, cold-pressed oils...',
      filtersTitle: 'Filters & Sourcing',
      allOrigins: 'All Farm Origins',
      priceRange: 'Price Range (₹)',
      minPrice: 'Min ₹',
      maxPrice: 'Max ₹',
      availability: 'Harvest Availability',
      allHarvests: 'All Harvest Batches',
      onlyInStock: 'In Stock Only',
      sortBy: 'Sort By',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      recentlyAdded: 'Recently Harvested',
      showingResults: 'fresh produce batches available directly from fields',
      noProduceFound: 'No produce matches your filters',
      tryAdjusting: 'Try adjusting your search query, price brackets, or clearing filters.',
      clearAllFilters: 'Reset All Filters',
      viewProduceDetails: 'View Farm Details',
      quickAdd: 'Quick Add',
      addedNotification: 'Added to your farm basket!',
    },
    dashboard: {
      dashboard: 'Dashboard',
      welcome: 'Welcome back',
      switchPerspective: 'Switch Perspective',
      navigation: 'Navigation',
      browseMarketplace: 'Browse Marketplace',
      savedWishlist: 'Saved Produce Wishlist',
      shoppingBasket: 'Shopping Basket',
      signOut: 'Sign Out',
      homePage: 'Home Page',
      exploreMarket: 'Explore Marketplace',
      overviewTab: 'Overview',
      productsTab: 'Manage Crops',
      ordersTab: 'Orders',
      profileTab: 'Farmer Profile & Gate',
      currentOrdersTab: 'Active Orders',
      historyTab: 'Order History',
      savedTab: 'Saved Produce',
      businessTab: 'Business Procurement',
      moderationTab: 'Produce Moderation',
      farmersTab: 'Farmer Registry',
      analyticsTab: 'Marketplace Metrics',
      statEarnings: 'Direct Earnings (Net)',
      statActiveCrops: 'Active Crop Batches',
      statPendingOrders: 'Orders to Dispatch',
      statInventory: 'Live Harvest Inventory',
      statSpent: 'Total Produce Procured',
      statCurrentOrders: 'Active Field Orders',
      statSavedItems: 'Saved Favorites',
      saveProfile: 'Save Profile & Settings',
      updateStock: 'Update Available Stock',
    },
    wishlist: {
      title: 'Saved Favorites & Wishlist',
      itemsSaved: 'produce items saved',
      emptyTitle: 'Your wishlist is currently empty',
      emptyDesc: 'Save harvest batches from the marketplace to quickly access fresh produce batches you love.',
      exploreBtn: 'Discover Farm Produce',
      moveToBasket: 'Move to Basket',
      remove: 'Remove',
      clearAll: 'Clear All',
    },
    auth: {
      signInTitle: 'Welcome Back to Farmora',
      signInSubtitle: 'Access your account and continue connecting directly with growers and buyers',
      signUpTitle: 'Join the Direct Farm Network',
      signUpSubtitle: 'Register in seconds as a grower, household, or wholesale business buyer',
      emailOrPhone: 'Email or Mobile Number',
      password: 'Password',
      fullName: 'Full Name',
      phoneNumber: 'Mobile Phone',
      selectRole: 'Select Your Account Type',
      businessType: 'Business Classification',
      keepSignedIn: 'Keep me signed in on this device',
      signInBtn: 'Sign In to Account',
      signUpBtn: 'Create Account',
      alreadyHaveAccount: 'Already have an account? Sign In',
      needAccount: 'Need an account? Sign Up',
      backToHome: 'Back to Farmora Home',
    },
    farmerPortal: {
      title: 'Farmer Production Studio',
      subtitle: 'Manage your active crop listings, harvest inventory, and order fulfilment.',
      totalRevenue: 'Direct Earnings (Net)',
      activeListings: 'Active Crops',
      pendingDispatch: 'Orders to Fulfill',
      farmAcreage: 'Total Land Cultivated',
      addNewListing: 'Add New Harvest Batch',
      cropName: 'Crop / Product Name',
      cropCategory: 'Category',
      basePrice: 'Retail Price (₹/unit)',
      availableQty: 'Available Harvest (kg/units)',
      unitSelect: 'Unit of Measure',
      bulkTierConfig: 'Configure B2B Bulk Discount Tiers',
      allowPickup: 'Enable Farm Gate Pickup',
      allowDelivery: 'Enable Local Delivery',
      dispatchOrders: 'Received Farm Orders',
    },
    b2bPortal: {
      title: 'Commercial & Institutional Supply',
      subtitle: 'Custom tailored procurement for grocery chains, cloud kitchens, hotels, and agricultural trading mandis.',
      tierTitle: 'Volume Sourcing Tiers',
      sampleBox: 'Request 5kg Sample Crate',
      recurringContract: 'Setup Weekly Standing Order',
      logisticsNote: 'Farmora coordinates refrigerated freight trucks for loads exceeding 500 kg.',
    },
    adminPortal: {
      title: 'Marketplace Operations & Oversight',
      subtitle: 'Monitor fair pricing, farmer compliance verification, and regional volume health.',
      verifiedCount: 'Verified Organic Farms',
      totalVolumeTraded: 'Metric Tons Moved',
      disputeRate: 'Quality Dispute Rate',
      verifyBtn: 'Verify Credentials',
      verifiedStatus: 'Verified & Inspected',
      pendingReview: 'Document Review Pending',
    },
    cart: {
      title: 'Your Farm Basket',
      empty: 'Your basket is currently empty. Discover fresh harvest from local growers!',
      subtotal: 'Produce Subtotal',
      platformFee: 'Farmer Direct Platform Fee (0%)',
      deliveryFee: 'Fulfilment Fee',
      freePickup: 'FREE (Farm Pickup)',
      total: 'Total Payable',
      placeOrder: 'Place Order',
      orderConfirmed: 'Order Confirmed! Farmer Notified.',
      orderNumber: 'Order ID',
      unitsDirect: 'units direct from verified growers',
      emptyTitle: 'Your basket is empty',
      exploreBtn: 'Explore Fresh Produce',
      proceedCheckout: 'Proceed to Checkout',
      clearCart: 'Clear Basket',
      overstockAlert: 'Some produce quantities exceed available harvest stock. Please adjust quantities.',
    },
    validation: {
      stockWarning: 'Stock limit reached. You cannot add more than the available harvest quantity.',
      addressRequired: 'Please provide your delivery address or receiving dock details.',
      orderSuccess: 'Order submitted to farmer! Status: Requested',
      orderCancelled: 'Order cancelled successfully. Reserved harvest quantity restored to stock.',
      profileSaved: 'Profile details saved successfully.',
    },
  },
  te: {
    brand: 'ఫార్మోరా (Farmora)',
    tagline: 'రైతు పొలం నుండి సూటిగా మీ చేతుల్లోకి.',
    nav: {
      home: 'హోమ్',
      marketplace: 'సంత / మార్కెట్',
      farmerPortal: 'రైతు వేదిక',
      bulkB2B: 'టోకు & హోల్‌సేల్',
      adminPortal: 'మార్కెట్ పర్యవేక్షణ',
      orders: 'నా ఆర్డర్లు',
      cart: 'బుట్ట',
      dashboard: 'డ్యాష్‌బోర్డ్',
      signIn: 'లాగిన్',
      wishlist: 'ఇష్టమైనవి',
      exploreProducts: 'ఉత్పత్తుల అన్వేషణ',
      howItWorks: 'ఇది ఎలా పనిచేస్తుంది?',
      aboutUs: 'మా గురించి',
      getStarted: 'ప్రారంభించండి',
    },
    roles: {
      farmer: 'రైతు (Farmer)',
      household: 'ఇంటి కొనుగోలుదారులు',
      retailer: 'చిల్లర దుకాణదారుడు',
      restaurant: 'రెస్టారెంట్ & హోటల్',
      wholesaler: 'హోల్‌సేలర్ / మండి వర్తకుడు',
      admin: 'మార్కెట్ నిర్వాహకుడు',
      farmerSub: 'పంట వివరాలు చేర్చండి & నేరుగా అమ్మండి',
      householdSub: 'తాజా కూరగాయలు, పండ్లు రోజూ పొందండి',
      retailerSub: 'దుకాణాల కోసం రాయితీతో కూడిన టోకు సరుకు',
      restaurantSub: 'చెఫ్‌ల కోసం ప్రథమ శ్రేణి తాజా ఉత్పత్తులు',
      wholesalerSub: 'క్వింటాళ్లు, టన్నుల కొద్దీ పొలం వద్దే కొనుగోలు',
      adminSub: 'రైతుల ధృవీకరణ & నాణ్యత పర్యవేక్షణ',
    },
    hero: {
      badge: 'దళారీలు లేని వ్యవస్థ · రైతుకు 100% న్యాయమైన ధర',
      title: 'ఈ రోజే కోసిన తాజా పంట. నేరుగా మీ ఇళ్లకు.',
      subtitle: 'కష్టపడి పండించే రైతులను నేరుగా కుటుంబాలు, వ్యాపారులు మరియు రెస్టారెంట్లతో అనుసంధానించే వేదిక.',
      searchPlaceholder: 'టమాటాలు, బంగినపల్లి మామిడి, ఆర్గానిక్ బియ్యం, నూనెలు...',
      searchBtn: 'వెతకండి',
      allLocations: 'అన్ని ప్రాంతాలు',
      exploreCta: 'తాజా పంటలను చూడండి',
      farmerCta: 'రైతుగా చేరండి',
      trustDirect: 'రైతులతో ప్రత్యక్ష సంబంధం',
      trustFresh: 'పొలంలో కోసిన సహజ తాజాదనం',
      trustTransparent: 'పారదర్శకమైన రైతు ధరలు',
      trustFulfilment: 'పొలం పికప్ లేదా చల్లని డెలివరీ',
    },
    categories: {
      all: 'అన్ని ఉత్పత్తులు',
      vegetables: 'తాజా కూరగాయలు',
      fruits: 'పండ్లు',
      grains: 'ధాన్యాలు (Grains)',
      pulses: 'పప్పుధాన్యాలు (Pulses)',
      dairy: 'పాల ఉత్పత్తులు (Dairy)',
      spices: 'మసాలా దినుసులు',
      dairy_honey: 'పాల ఉత్పత్తులు & స్వచ్ఛమైన తేనె',
      organic: 'సేంద్రీయ (ఆర్గానిక్)',
    },
    fulfilment: {
      title: 'డెలివరీ పద్ధతి',
      all: 'అన్ని పద్ధతులు',
      pickup: 'పొలం వద్దే పికప్ (Farm Pickup)',
      delivery: 'ఇంటి వద్దకే డెలివరీ (Direct Delivery)',
      pickupDesc: 'రైతు పొలానికి వెళ్లి స్వయంగా సేకరించండి. డెలివరీ ఛార్జీ సున్నా.',
      deliveryDesc: 'పొలం నుండి నేరుగా మీ ఇంటికి లేదా గోదాముకు చేరవేత.',
      slot: 'సమయ స్లాట్',
      morningSlot: 'ఉదయం (6:00 AM – 9:30 AM)',
      eveningSlot: 'సాయంత్రం (4:30 PM – 8:00 PM)',
      pickupTiming: 'పికప్ వేళలు: ఉదయం 7:00 నుండి సాయంత్రం 6:00 వరకు',
      addressPrompt: 'మీ చిరునామా లేదా గోడౌన్ వివరాలు నమోదు చేయండి',
      farmLocation: 'పొలం ఉన్న ప్రదేశం',
      distance: 'కి.మీ దూరం',
    },
    pricing: {
      perUnit: 'ఒక',
      minOrder: 'కనిష్ట ఆర్డర్',
      bulkSavings: 'టోకు రాయితీలు కలవు',
      viewTiers: 'టోకు ధరల పట్టిక',
      harvestDate: 'కోత తేదీ',
      shelfLife: 'తాజాదనం కాలం',
      days: 'రోజులు',
      grade: 'నాణ్యత శ్రేణి',
      verifiedFarmer: 'ధృవీకరించబడిన రైతు',
      directContact: 'రైతుతో మాట్లాడండి',
      inStock: 'నిల్వ ఉంది',
      outOfStock: 'ప్రస్తుతం అయిపోయింది',
      stockAvailable: 'పొలం నిల్వలో అందుబాటులో ఉంది',
    },
    actions: {
      addToCart: 'బుట్టలో వేయండి',
      requestB2BQuote: 'టోకు ఒప్పందం కోరండి',
      bookPickup: 'పికప్ బుక్ చేయండి',
      viewDetails: 'రైతు & పంట వివరాలు',
      checkout: 'చెల్లింపుకు వెళ్లండి',
      addProduce: 'కొత్త పంట వివరాలు నమోదు',
      updateStatus: 'ఆర్డర్ స్థితి మార్చండి',
      verifyFarm: 'రైతుకు ధృవీకరణ ఇవ్వండి',
      filter: 'వడపోత',
      reset: 'రీసెట్ చేయండి',
      close: 'మూసివేయి',
      submitOrder: 'ఆర్డర్ ఖరారు చేయండి',
      save: 'భద్రపరచండి',
      cancel: 'రద్దు చేయి',
      edit: 'సవరించు',
      delete: 'తొలగించు',
      continueShopping: 'ఇతర ఉత్పత్తులు చూడండి',
      proceedCheckout: 'చెల్లింపుకు వెళ్లండి',
      viewOrders: 'నా ఆర్డర్లు చూడండి',
      login: 'లాగిన్',
      signUp: 'ఖాతా తెరవండి',
      back: 'వెనుకకు',
    },
    orderStatus: {
      requested: '1. అభ్యర్థించబడింది (రైతు ఆమోదం కోసం)',
      accepted: '2. రైతు అంగీకరించారు',
      ready: '3. కోత కోసి సిద్ధంగా ఉంది',
      completed: '4. పూర్తయింది & అందించబడింది',
      cancelled: '5. రద్దు చేయబడింది (నిల్వ పునరుద్ధరించబడింది)',
      step1: 'అభ్యర్థన',
      step2: 'ఆమోదం',
      step3: 'సిద్ధం',
      step4: 'పూర్తి',
      step5: 'రద్దు',
    },
    orderActions: {
      acceptOrder: 'ఆర్డర్ ఆమోదించు',
      rejectOrder: 'ఆర్డర్ తిరస్కరించు',
      markReady: 'పికప్/డెలివరీకి సిద్ధంగా గుర్తించు',
      markCompleted: 'పూర్తయినట్లు నమోదు చేయి',
      cancelOrder: 'ఆర్డర్ రద్దు చేయి',
      confirmCancelTitle: 'ఆర్డర్ రద్దును నిర్ధారించండి',
      confirmCancelDesc: 'మీరు నిజంగా ఈ ఆర్డర్‌ను రద్దు చేయాలనుకుంటున్నారా? కేటాయించిన పంట నిల్వలు వెంటనే తిరిగి రైతు జాబితాకు జోడించబడతాయి.',
      keepOrder: 'ఆర్డర్ ఉంచండి',
      cannotCancel: 'ఆర్డర్ ఇప్పటికే సిద్ధమైంది లేదా పూర్తయింది, కాబట్టి రద్దు చేయడం సాధ్యం కాదు.',
      stockRestoredNotice: 'కేటాయించిన సరుకు నిల్వలు స్వయంచాలకంగా రైతు వద్దకు తిరిగి చేరాయి.',
      trackingTitle: 'ఆర్డర్ల పర్యవేక్షణ & పంట చరిత్ర',
      trackingSubtitle: 'పొలం నుండి నేరుగా సమాచారం, డెలివరీ సమయాలు మరియు పికప్ రసీదులు',
      farmGuaranteed: 'నేరుగా పొలం నుండి నూరు శాతం హామీ',
      filterAll: 'అన్ని ఆర్డర్లు',
      noOrders: 'ఈ వర్గంలో ఎలాంటి ఆర్డర్లు లేవు.',
      orderedOn: 'ఆర్డర్ చేసిన తేదీ',
      orderTotal: 'ఆర్డర్ మొత్తం',
      orderItems: 'ఆర్డర్ చేసిన పంటలు',
    },
    checkout: {
      modalTitle: 'రైతు నుండి నేరుగా కొనుగోలు చెల్లింపు',
      buyerDetails: 'కొనుగోలుదారు సమాచారం',
      fullName: 'పూర్తి పేరు',
      phoneNumber: 'సంప్రదింపు ఫోన్ నంబర్',
      deliveryAddress: 'డెలివరీ చిరునామా లేదా గోదాము వివరాలు',
      fulfilmentMethod: 'డెలివరీ పద్ధతి ఎంచుకోండి',
      deliveryOption: 'ఇంటి వద్దకే నేరుగా డెలివరీ',
      pickupOption: 'పొలం వద్దే పికప్ (ఉచితం)',
      deliverySlotLabel: 'డెలివరీ సమయ స్లాట్',
      pickupTimingLabel: 'పికప్ చేసుకోబోయే సమయం',
      pickupLocationsTitle: 'ఈ ఆర్డర్ కోసం పొలాల చిరునామాలు:',
      paymentMethodLabel: 'చెల్లింపు విధానం ఎంచుకోండి',
      cashOnDelivery: 'వస్తువు అందిన తర్వాత నగదు చెల్లింపు (COD)',
      cashOnDeliveryDesc: 'పొలం వద్ద లేదా ఇంటి వద్ద సరుకు నాణ్యత పరిశీలించిన తర్వాతే చెల్లించండి.',
      upiOnline: 'యూపీఐ / డిజిటల్ చెల్లింపు (డెమో)',
      upiOnlineDesc: 'రైతు బ్యాంక్ ఖాతాకు నేరుగా తక్షణ జమ అయ్యే ప్రక్రియ నమూనా.',
      bankTransfer: 'హోల్‌సేల్ వ్యాపార ఇన్వాయిస్ (30 రోజుల గడువు)',
      bankTransferDesc: 'నమోదిత సూపర్ మార్కెట్లు, రెస్టారెంట్లు మరియు మండి వర్తకులకు మాత్రమే.',
      orderSummary: 'ఆర్డర్ సారాంశం',
      produceSubtotal: 'సరుకుల మొత్తం విలువ',
      deliveryFee: 'డెలివరీ ఛార్జీ',
      freePickup: 'ఉచితం (పొలం పికప్)',
      totalPayable: 'మొత్తం చెల్లించవలసినది',
      submitBtn: 'ఆర్డర్ ఖరారు చేయండి',
      confirmedTitle: 'ఆర్డర్ విజయవంతంగా నమోదైంది!',
      confirmedDesc: 'మీ ఆర్డర్ సమాచారం నేరుగా రైతుకు చేరింది. మీ కోసం పంట నిల్వలు కేటాయించబడ్డాయి.',
      viewOrdersBtn: 'నా ఆర్డర్లలో చూడండి',
      continueShoppingBtn: 'ఇతర పంటలను చూడండి',
    },
    marketplace: {
      searchPlaceholder: 'టమాటాలు, బంగినపల్లి మామిడి, ఆర్గానిక్ బియ్యం, నూనెలు వెతకండి...',
      filtersTitle: 'ఫిల్టర్లు & ఎంపికలు',
      allOrigins: 'అన్ని ప్రాంతాలు',
      priceRange: 'ధర శ్రేణి (₹)',
      minPrice: 'కనిష్ట ₹',
      maxPrice: 'గరిష్ట ₹',
      availability: 'పంట లభ్యత',
      allHarvests: 'అన్ని పంటలు',
      onlyInStock: 'నిల్వ ఉన్నవి మాత్రమే',
      sortBy: 'క్రమబద్ధీకరించండి',
      priceLowHigh: 'ధర: తక్కువ నుండి ఎక్కువ',
      priceHighLow: 'ధర: ఎక్కువ నుండి తక్కువ',
      recentlyAdded: 'ఇటీవల కోసినవి',
      showingResults: 'రైతుల నుండి నేరుగా అందుబాటులో ఉన్న తాజా పంటలు',
      noProduceFound: 'మీరు ఎంచుకున్న వివరాలకు సరిపోలే పంటలు లేవు',
      tryAdjusting: 'ఫిల్టర్లు మార్చండి లేదా వెతుకుతున్న పదాలను సరిచూసుకోండి.',
      clearAllFilters: 'అన్ని ఫిల్టర్లు తొలగించండి',
      viewProduceDetails: 'రైతు & పంట వివరాలు చూడండి',
      quickAdd: 'త్వరగా చేర్చండి',
      addedNotification: 'మీ బుట్టలో చేర్చబడింది!',
    },
    dashboard: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      welcome: 'పునఃస్వాగతం',
      switchPerspective: 'పాత్రను మార్చండి',
      navigation: 'నావిగేషన్',
      browseMarketplace: 'సంతలో వెతకండి',
      savedWishlist: 'ఇష్టమైన పంటలు (విష్‌లిస్ట్)',
      shoppingBasket: 'సరుకుల బుట్ట',
      signOut: 'లాగ్ అవుట్',
      homePage: 'ప్రధాన పేజీ',
      exploreMarket: 'సంతను అన్వేషించండి',
      overviewTab: 'సారాంశం',
      productsTab: 'పంటల నిర్వహణ',
      ordersTab: 'ఆర్డర్లు',
      profileTab: 'రైతు & పొలం వివరాలు',
      currentOrdersTab: 'చేరవలసిన ఆర్డర్లు',
      historyTab: 'గత ఆర్డర్లు',
      savedTab: 'దాచుకున్న పంటలు',
      businessTab: 'వ్యాపార కొనుగోళ్లు',
      moderationTab: 'పంటల నాణ్యత సమీక్ష',
      farmersTab: 'రైతుల డైరెక్టరీ',
      analyticsTab: 'మార్కెట్ విశ్లేషణ',
      statEarnings: 'రైతు నికర ఆదాయం',
      statActiveCrops: 'అమ్మకంలో ఉన్న పంటలు',
      statPendingOrders: 'పంపవలసిన ఆర్డర్లు',
      statInventory: 'మొత్తం అందుబాటులో ఉన్న నిల్వలు',
      statSpent: 'మొత్తం కొనుగోలు విలువ',
      statCurrentOrders: 'చేరుతున్న ఆర్డర్లు',
      statSavedItems: 'ఇష్టపడిన పంటలు',
      saveProfile: 'వివరాలు భద్రపరచండి',
      updateStock: 'నిల్వలను సవరించండి',
    },
    wishlist: {
      title: 'మీ అభిమాన పంటల జాబితా (Wishlist)',
      itemsSaved: 'పంటలు భద్రపరచబడ్డాయి',
      emptyTitle: 'మీ ఇష్టాల జాబితా ఖాళీగా ఉంది',
      emptyDesc: 'మీకు నచ్చిన నాణ్యమైన పంటలను సులభంగా తిరిగి కొనుగోలు చేయడానికి గుండె గుర్తుపై నొక్కండి.',
      exploreBtn: 'తాజా పంటలను చూడండి',
      moveToBasket: 'బుట్టలోకి మార్చండి',
      remove: 'తొలగించు',
      clearAll: 'అన్నీ తొలగించు',
    },
    auth: {
      signInTitle: 'ఫార్మోరాకు స్వాగతం',
      signInSubtitle: 'మీ ఖాతాలోకి ప్రవేశించి నేరుగా రైతులతో లేదా కొనుగోలుదారులతో సంప్రదించండి',
      signUpTitle: 'రైతు మార్కెట్‌లో చేరండి',
      signUpSubtitle: 'రైతుగా, ఇంటి కొనుగోలుదారుగా లేదా వ్యాపారిగా సులభంగా నమోదు చేసుకోండి',
      emailOrPhone: 'ఈమెయిల్ లేదా మొబైల్ నంబర్',
      password: 'పాస్‌వర్డ్',
      fullName: 'పూర్తి పేరు',
      phoneNumber: 'మొబైల్ ఫోన్',
      selectRole: 'మీ ఖాతా రకాన్ని ఎంచుకోండి',
      businessType: 'వ్యాపార వర్గీకరణ',
      keepSignedIn: 'ఈ పరికరంలో లాగిన్ అయి ఉండండి',
      signInBtn: 'ఖాతాలోకి ప్రవేశించండి',
      signUpBtn: 'కొత్త ఖాతా సృష్టించండి',
      alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి',
      needAccount: 'ఖాతా లేదా? నమోదు చేసుకోండి',
      backToHome: 'ఫార్మోరా హోమ్‌కు వెళ్లండి',
    },
    farmerPortal: {
      title: 'రైతు వేదిక & స్టూడియో',
      subtitle: 'మీ పంట జాబితా, నిల్వలు మరియు వచ్చిన ఆర్డర్లను ఒకే చోట నిర్వహించండి.',
      totalRevenue: 'రైతు ఖాతాకు చేరిన నికర ఆదాయం',
      activeListings: 'అమ్మకంలో ఉన్న పంటలు',
      pendingDispatch: 'పంపవలసిన ఆర్డర్లు',
      farmAcreage: 'సాగు విస్తీర్ణం (ఎకరాలు)',
      addNewListing: 'కొత్త పంటను చేర్చండి',
      cropName: 'పంట / సరుకు పేరు',
      cropCategory: 'వర్గం',
      basePrice: 'రిటైల్ ధర (₹/యూనిట్)',
      availableQty: 'అందుబాటులో ఉన్న పంట పరిమాణం',
      unitSelect: 'కొలత యూనిట్',
      bulkTierConfig: 'హోల్‌సేల్ రాయితీ ధరలు నిర్ణయించండి',
      allowPickup: 'పొలం వద్ద పికప్ అనుమతించండి',
      allowDelivery: 'స్థానిక డెలివరీ అందించండి',
      dispatchOrders: 'వచ్చిన ఆర్డర్లు & డెలివరీ స్థితి',
    },
    b2bPortal: {
      title: 'వాణిజ్య & పెద్ద ఎత్తున కొనుగోళ్లు',
      subtitle: 'కిరాణా దుకాణాలు, రెస్టారెంట్లు, క్యాటరింగ్ మరియు మండి ట్రేడర్ల కోసం ప్రత్యేక ధరలు.',
      tierTitle: 'టోకు కొనుగోలు ధరల శ్రేణులు',
      sampleBox: '5 కిలోల శాంపిల్ బాక్స్ కోరండి',
      recurringContract: 'వారపు సరఫరా ఒప్పందం',
      logisticsNote: '500 కిలోలకు మించిన ఆర్డర్లకు శీతలీకరణ రవాణా వాహన సౌకర్యం కలదు.',
    },
    adminPortal: {
      title: 'మార్కెట్‌ప్లేస్ నిర్వహణ & పర్యవేక్షణ',
      subtitle: 'రైతుల వివరాల పరిశీలన, ధృవీకరణ మరియు న్యాయమైన వాణిజ్య పర్యవేక్షణ.',
      verifiedCount: 'ధృవీకరించబడిన సేంద్రీయ పొలాలు',
      totalVolumeTraded: 'విక్రయించబడిన మొత్తం మెట్రిక్ టన్నులు',
      disputeRate: 'ఫిర్యాదుల నిష్పత్తి',
      verifyBtn: 'పత్రాలు ధృవీకరించండి',
      verifiedStatus: 'ధృవీకరించబడింది',
      pendingReview: 'పరిశీలనలో ఉంది',
    },
    cart: {
      title: 'మీ సరుకుల బుట్ట',
      empty: 'మీ బుట్ట ప్రస్తుతం ఖాళీగా ఉంది. స్థానిక రైతుల తాజా ఉత్పత్తులను ఎంచుకోండి!',
      subtotal: 'సరుకుల మొత్తం',
      platformFee: 'రైతు సహాయ ఫీజు (0% ఉచితం)',
      deliveryFee: 'రవాణా ఛార్జీ',
      freePickup: 'ఉచితం (పొలం పికప్)',
      total: 'మొత్తం చెల్లించవలసినది',
      placeOrder: 'ఆర్డర్ ఇవ్వండి',
      orderConfirmed: 'ఆర్డర్ విజయవంతంగా నమోదైంది! రైతుకు సమాచారం చేరింది.',
      orderNumber: 'ఆర్డర్ సంఖ్య',
      unitsDirect: 'రైతుల నుండి నేరుగా సేకరించిన యూనిట్లు',
      emptyTitle: 'మీ బుట్ట ఖాళీగా ఉంది',
      exploreBtn: 'తాజా పంటలను చూడండి',
      proceedCheckout: 'చెల్లింపుకు వెళ్లండి',
      clearCart: 'బుట్టను ఖాళీ చేయి',
      overstockAlert: 'కొన్ని పంటల పరిమాణం అందుబాటులో ఉన్న నిల్వల కంటే ఎక్కువగా ఉంది. దయచేసి తగ్గించండి.',
    },
    validation: {
      stockWarning: 'నిల్వల పరిమితి దాటింది. అందుబాటులో ఉన్న పంట కంటే ఎక్కువ చేర్చలేరు.',
      addressRequired: 'దయచేసి మీ డెలివరీ చిరునామా నమోదు చేయండి.',
      orderSuccess: 'ఆర్డర్ రైతుకు చేరింది! స్థితి: అభ్యర్థించబడింది',
      orderCancelled: 'ఆర్డర్ విజయవంతంగా రద్దయింది. పంట నిల్వలు తిరిగి చేర్చబడ్డాయి.',
      profileSaved: 'ప్రొఫైల్ వివరాలు భద్రపరచబడ్డాయి.',
    },
  },
  hi: {
    brand: 'फ़ारमोरा (Farmora)',
    tagline: 'खेतों से ताज़ा। सीधे आप तक।',
    nav: {
      home: 'होम',
      marketplace: 'सब्ज़ी-मंडी / बाज़ार',
      farmerPortal: 'किसान स्टूडियो',
      bulkB2B: 'थोक व व्यापार',
      adminPortal: 'मंडी निगरानी',
      orders: 'मेरे ऑर्डर्स',
      cart: 'टोकरी',
      dashboard: 'डैशबोर्ड',
      signIn: 'साइन इन',
      wishlist: 'पसंदीदा',
      exploreProducts: 'फसलें देखें',
      howItWorks: 'यह कैसे काम करता है?',
      aboutUs: 'हमारे बारे में',
      getStarted: 'शुरुआत करें',
    },
    roles: {
      farmer: 'किसान (Farmer)',
      household: 'घरेलू खरीदार',
      retailer: 'खुदरा व्यापारी / दुकान',
      restaurant: 'होटल व शेफ',
      wholesaler: 'थोक आढ़ती / मंडी',
      admin: 'मंडी प्रबंधक',
      farmerSub: 'फसलें सूचीबद्ध करें, स्टॉक संभालें व सीधे बेचें',
      householdSub: 'रसोई के लिए रोज़ाना ताज़ा फल व हरी सब्ज़ियां',
      retailerSub: 'दुकानदारों के लिए विशेष थोक छूट दरें',
      restaurantSub: 'शेफ के लिए सुबह की पहली कटाई की ताज़ा डिलीवरी',
      wholesalerSub: 'खेत से सीधे ट्रकलोड व मीट्रिक टन में खरीद',
      adminSub: 'किसान सत्यापन, विवाद समाधान और गुणवत्ता नियंत्रण',
    },
    hero: {
      badge: 'बिचौलियों का कोई शुल्क नहीं · किसान को 100% उचित दाम',
      title: 'आज ही कटी ताज़ी फसल। कल आपकी मेज़ पर।',
      subtitle: 'मेहनती किसानों को सीधे परिवारों, पड़ोस की दुकानों, होटलों और थोक व्यापारियों से जोड़ने वाला भरोसेमंद मंच।',
      searchPlaceholder: 'टमाटर, अल्फांसो आम, जैविक चावल, शुद्ध सरसों का तेल खोजें...',
      searchBtn: 'फसल खोजें',
      allLocations: 'सभी क्षेत्र',
      exploreCta: 'ताज़ी फसलें देखें',
      farmerCta: 'किसान के रूप में जुड़ें',
      trustDirect: 'किसानों से सीधा संपर्क',
      trustFresh: 'खेत की असली ताज़गी',
      trustTransparent: 'पारदर्शी व उचित मूल्य',
      trustFulfilment: 'खेत से पिकअप या घर तक डिलीवरी',
    },
    categories: {
      all: 'सभी फसलें',
      vegetables: 'हरी सब्जियां',
      fruits: 'ताज़े फल',
      grains: 'अनाज (Grains)',
      pulses: 'दालें और दलहन (Pulses)',
      dairy: 'डेयरी उत्पाद (Dairy)',
      spices: 'खड़े व पिसे मसाले',
      dairy_honey: 'डेयरी व शुद्ध शहद',
      organic: 'जैविक प्रमाणित',
    },
    fulfilment: {
      title: 'वितरण का तरीका',
      all: 'सभी विकल्प',
      pickup: 'खेत पर आकर पिकअप (Farm Pickup)',
      delivery: 'सीधे घर तक डिलीवरी (Direct Delivery)',
      pickupDesc: 'किसान के खेत पर जाकर स्वयं फसल लें। कोई डिलीवरी शुल्क नहीं।',
      deliveryDesc: 'खेत से सुरक्षित व वातानुकूलित तरीके से सीधे आपके पते पर डिलीवरी।',
      slot: 'पसंदीदा समय',
      morningSlot: 'सुबह (6:00 AM – 9:30 AM)',
      eveningSlot: 'शाम (4:30 PM – 8:00 PM)',
      pickupTiming: 'पिकअप समय: सुबह 7:00 बजे से शाम 6:00 बजे तक',
      addressPrompt: 'अपना डिलीवरी का पता या गोदाम का स्थान दर्ज करें',
      farmLocation: 'खेत का स्थान',
      distance: 'कि.मी. दूरी',
    },
    pricing: {
      perUnit: 'प्रति',
      minOrder: 'न्यूनतम ऑर्डर',
      bulkSavings: 'थोक खरीद पर विशेष छूट',
      viewTiers: 'थोक मूल्य दरें देखें',
      harvestDate: 'फसल कटाई तिथि',
      shelfLife: 'ताज़गी की अवधि',
      days: 'दिन',
      grade: 'गुणवत्ता ग्रेड',
      verifiedFarmer: 'सत्यापित किसान',
      directContact: 'किसान से बात करें',
      inStock: 'उपलब्ध है',
      outOfStock: 'स्टॉक समाप्त',
      stockAvailable: 'खेत भंडार में उपलब्ध मात्रा',
    },
    actions: {
      addToCart: 'टोकरी में डालें',
      requestB2BQuote: 'थोक अनुबंध मांगें',
      bookPickup: 'पिकअप बुक करें',
      viewDetails: 'किसान व फसल विवरण',
      checkout: 'चेकआउट के लिए आगे बढ़ें',
      addProduce: 'नई फसल जोड़ें',
      updateStatus: 'ऑर्डर स्थिति बदलें',
      verifyFarm: 'किसान सत्यापित करें',
      filter: 'फ़िल्टर',
      reset: 'रीसेट करें',
      close: 'बंद करें',
      submitOrder: 'ऑर्डर पक्का करें',
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      edit: 'बदलें',
      delete: 'हटाएं',
      continueShopping: 'खरीदारी जारी रखें',
      proceedCheckout: 'चेकआउट करें',
      viewOrders: 'मेरे ऑर्डर्स देखें',
      login: 'साइन इन',
      signUp: 'नया खाता बनाएं',
      back: 'वापस',
    },
    orderStatus: {
      requested: '1. अनुरोध किया गया (किसान स्वीकृति प्रतीक्षित)',
      accepted: '2. किसान द्वारा स्वीकृत',
      ready: '3. तैयार व पैक किया गया',
      completed: '4. पूरा व वितरित',
      cancelled: '5. रद्द किया गया (स्टॉक वापस जोड़ा गया)',
      step1: 'अनुरोध',
      step2: 'स्वीकृत',
      step3: 'तैयार',
      step4: 'पूर्ण',
      step5: 'रद्द',
    },
    orderActions: {
      acceptOrder: 'ऑर्डर स्वीकार करें',
      rejectOrder: 'ऑर्डर अस्वीकार करें',
      markReady: 'पिकअप/डिलीवरी के लिए तैयार चिह्नित करें',
      markCompleted: 'पूर्ण व वितरित चिह्नित करें',
      cancelOrder: 'ऑर्डर रद्द करें',
      confirmCancelTitle: 'ऑर्डर रद्दीकरण की पुष्टि करें',
      confirmCancelDesc: 'क्या आप सचमुच यह ऑर्डर रद्द करना चाहते हैं? आरक्षित फसल मात्रा तुरंत किसान के उपलब्ध स्टॉक में वापस जोड़ दी जाएगी।',
      keepOrder: 'ऑर्डर बनाए रखें',
      cannotCancel: 'ऑर्डर पैक हो चुका है या पूरा हो चुका है, इसे रद्द नहीं किया जा सकता।',
      stockRestoredNotice: 'आरक्षित फसल मात्रा स्वतः किसान के स्टॉक में पुनः जोड़ दी गई है।',
      trackingTitle: 'ऑर्डर ट्रैकिंग व खरीद इतिहास',
      trackingSubtitle: 'सीधे खेत से वास्तविक स्थिति, डिलीवरी समय व किसान पिकअप रसीद',
      farmGuaranteed: 'खेत से सीधी प्राप्ति की गारंटी',
      filterAll: 'सभी ऑर्डर्स',
      noOrders: 'इस श्रेणी में कोई ऑर्डर नहीं मिला।',
      orderedOn: 'ऑर्डर की तारीख',
      orderTotal: 'कुल राशि',
      orderItems: 'ऑर्डर की गई फसलें',
    },
    checkout: {
      modalTitle: 'सीधे खेत से ऑर्डर पूरा करें',
      buyerDetails: 'खरीदार का विवरण',
      fullName: 'पूरा नाम',
      phoneNumber: 'मोबाइल नंबर',
      deliveryAddress: 'डिलीवरी का पता या गोदाम',
      fulfilmentMethod: 'वितरण का तरीका चुनें',
      deliveryOption: 'सीधे घर/दुकान तक डिलीवरी',
      pickupOption: 'खेत पर जाकर पिकअप (मुफ़्त)',
      deliverySlotLabel: 'पसंदीदा डिलीवरी समय',
      pickupTimingLabel: 'पिकअप का समय',
      pickupLocationsTitle: 'इस ऑर्डर के लिए खेतों का पता:',
      paymentMethodLabel: 'भुगतान का तरीका चुनें',
      cashOnDelivery: 'डिलीवरी/पिकअप पर नकद भुगतान (COD)',
      cashOnDeliveryDesc: 'फसल की गुणवत्ता जांचने के बाद ही मौके पर भुगतान करें।',
      upiOnline: 'यूपीआई / ऑनलाइन भुगतान (डेमो)',
      upiOnlineDesc: 'किसान के बैंक खाते में त्वरित डिजिटल ट्रांसफर का डेमो।',
      bankTransfer: 'थोक व्यापार चालान (30 दिन का समय)',
      bankTransferDesc: 'पंजीकृत सुपरमार्केट्स, होटल्स और मंडी व्यापारियों के लिए मान्य।',
      orderSummary: 'ऑर्डर सारांश',
      produceSubtotal: 'सामान का कुल मूल्य',
      deliveryFee: 'डिलीवरी शुल्क',
      freePickup: 'मुफ़्त (खेत पिकअप)',
      totalPayable: 'कुल देय राशि',
      submitBtn: 'ऑर्डर पक्का करें व भेजें',
      confirmedTitle: 'ऑर्डर सफलतापूर्वक दर्ज हुआ!',
      confirmedDesc: 'आपका ऑर्डर सीधे किसान को भेज दिया गया है और फसल आरक्षित कर ली गई है।',
      viewOrdersBtn: 'मेरे ऑर्डर्स में देखें',
      continueShoppingBtn: 'और फसलें देखें',
    },
    marketplace: {
      searchPlaceholder: 'टमाटर, अल्फांसो आम, जैविक चावल, तेल आदि खोजें...',
      filtersTitle: 'फ़िल्टर्स व चयन',
      allOrigins: 'सभी क्षेत्र',
      priceRange: 'मूल्य सीमा (₹)',
      minPrice: 'न्यूनतम ₹',
      maxPrice: 'अधिकतम ₹',
      availability: 'उपलब्धता',
      allHarvests: 'सभी फसलें',
      onlyInStock: 'केवल उपलब्ध स्टॉक',
      sortBy: 'क्रमबद्ध करें',
      priceLowHigh: 'मूल्य: कम से अधिक',
      priceHighLow: 'मूल्य: अधिक से कम',
      recentlyAdded: 'हाल ही में कटी फसलें',
      showingResults: 'सीधे खेतों से उपलब्ध ताज़ी फसलें',
      noProduceFound: 'आपकी खोज के अनुसार कोई उत्पाद नहीं मिला',
      tryAdjusting: 'कृपया फ़िल्टर बदलें या अलग शब्द लिखकर खोजें।',
      clearAllFilters: 'सभी फ़िल्टर साफ़ करें',
      viewProduceDetails: 'पूरा विवरण देखें',
      quickAdd: 'झटपट जोड़ें',
      addedNotification: 'आपकी टोकरी में जोड़ा गया!',
    },
    dashboard: {
      dashboard: 'डैशबोर्ड',
      welcome: 'स्वागत है',
      switchPerspective: 'भूमिका बदलें',
      navigation: 'नेविगेशन',
      browseMarketplace: 'मंडी में फसलें देखें',
      savedWishlist: 'पसंदीदा फसलें (विशलिस्ट)',
      shoppingBasket: 'खरीदारी टोकरी',
      signOut: 'लॉग आउट',
      homePage: 'मुख्य पृष्ठ',
      exploreMarket: 'मंडी देखें',
      overviewTab: 'अवलोकन',
      productsTab: 'फसल प्रबंधन',
      ordersTab: 'ऑर्डर्स',
      profileTab: 'किसान व खेत प्रोफ़ाइल',
      currentOrdersTab: 'सक्रिय ऑर्डर्स',
      historyTab: 'ऑर्डर इतिहास',
      savedTab: 'सहेजे गए उत्पाद',
      businessTab: 'थोक खरीद विवरण',
      moderationTab: 'फसल समीक्षा',
      farmersTab: 'किसान सूची',
      analyticsTab: 'मंडी विश्लेषण',
      statEarnings: 'किसान की सीधी कमाई',
      statActiveCrops: 'सूचीबद्ध फसलें',
      statPendingOrders: 'लंबित ऑर्डर्स',
      statInventory: 'उपलब्ध कुल स्टॉक',
      statSpent: 'कुल खरीद राशि',
      statCurrentOrders: 'सक्रिय ऑर्डर्स',
      statSavedItems: 'सहेजे गए उत्पाद',
      saveProfile: 'प्रोफ़ाइल सुरक्षित करें',
      updateStock: 'स्टॉक अपडेट करें',
    },
    wishlist: {
      title: 'पसंदीदा फसलें व विशलिस्ट',
      itemsSaved: 'उत्पाद सहेजे गए',
      emptyTitle: 'आपकी पसंदीदा सूची अभी खाली है',
      emptyDesc: 'अपनी मनपसंद ताज़ी फसलों को आसानी से दोबारा देखने के लिए दिल के निशान पर क्लिक करें।',
      exploreBtn: 'खेत की फसलें देखें',
      moveToBasket: 'टोकरी में डालें',
      remove: 'हटाएं',
      clearAll: 'सभी हटाएं',
    },
    auth: {
      signInTitle: 'फ़ारमोरा में आपका स्वागत है',
      signInSubtitle: 'अपने खाते में प्रवेश करें और सीधे किसानों या खरीदारों से जुड़ें',
      signUpTitle: 'किसान बाज़ार से जुड़ें',
      signUpSubtitle: 'किसान, परिवार या थोक व्यापारी के रूप में तुरंत पंजीकरण करें',
      emailOrPhone: 'ईमेल या मोबाइल नंबर',
      password: 'पासवर्ड',
      fullName: 'पूरा नाम',
      phoneNumber: 'मोबाइल फोन',
      selectRole: 'खाता प्रकार चुनें',
      businessType: 'व्यापार का प्रकार',
      keepSignedIn: 'मुझे इस डिवाइस पर साइन इन रखें',
      signInBtn: 'खाते में प्रवेश करें',
      signUpBtn: 'नया खाता बनाएं',
      alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
      needAccount: 'खाता नहीं है? पंजीकरण करें',
      backToHome: 'फ़ारमोरा होम पर वापस जाएं',
    },
    farmerPortal: {
      title: 'किसान उत्पादन स्टूडियो',
      subtitle: 'अपनी फसलों की सूची, कटाई का स्टॉक और प्राप्त ऑर्डर्स को प्रबंधित करें।',
      totalRevenue: 'सीधी कमाई (शुद्ध लाभ)',
      activeListings: 'सक्रिय फसलें',
      pendingDispatch: 'भेजे जाने वाले ऑर्डर्स',
      farmAcreage: 'कुल कृषि भूमि (एकड़)',
      addNewListing: 'नई फसल का बैच जोड़ें',
      cropName: 'फसल का नाम',
      cropCategory: 'श्रेणी',
      basePrice: 'खुदरा मूल्य (₹/यूनिट)',
      availableQty: 'उपलब्ध कटाई मात्रा (किग्रा/यूनिट)',
      unitSelect: 'माप की इकाई',
      bulkTierConfig: 'थोक खरीद हेतु विशेष दरें तय करें',
      allowPickup: 'खेत पर आकर पिकअप की सुविधा दें',
      allowDelivery: 'स्थानीय डिलीवरी की सुविधा दें',
      dispatchOrders: 'प्राप्त ऑर्डर्स और आपूर्ति स्थिति',
    },
    b2bPortal: {
      title: 'व्यावसायिक और थोक आपूर्ति',
      subtitle: 'सुपरमार्केट, होटल, रेस्टोरेंट और मंडी व्यापारियों के लिए पारदर्शी थोक खरीद।',
      tierTitle: 'थोक मात्रा मूल्य निर्धारण',
      sampleBox: '5 किग्रा का सैंपल बॉक्स मंगाएं',
      recurringContract: 'साप्ताहिक नियमित आपूर्ति समझौता',
      logisticsNote: '500 किग्रा से अधिक के ऑर्डर पर वातानुकूलित (कोल्ड-चेन) मालवाहक ट्रक की सुविधा उपलब्ध है।',
    },
    adminPortal: {
      title: 'मंडी संचालन और निगरानी',
      subtitle: 'उचित मूल्य, किसान प्रमाणीकरण और क्षेत्रीय व्यापार का निरीक्षण करें।',
      verifiedCount: 'सत्यापित जैविक खेत',
      totalVolumeTraded: 'कुल व्यापार (मीट्रिक टन)',
      disputeRate: 'शिकायत दर',
      verifyBtn: 'दस्तावेज़ सत्यापित करें',
      verifiedStatus: 'सत्यापित और सुरक्षित',
      pendingReview: 'दस्तावेज़ समीक्षाधीन',
    },
    cart: {
      title: 'आपकी ताज़ा टोकरी',
      empty: 'आपकी टोकरी अभी खाली है। स्थानीय किसानों की ताज़ी फसलें चुनें!',
      subtotal: 'सामान का कुल मूल्य',
      platformFee: 'किसान कल्याण शुल्क (0% मुफ़्त)',
      deliveryFee: 'डिलीवरी शुल्क',
      freePickup: 'मुफ़्त (खेत पिकअप)',
      total: 'कुल देय राशि',
      placeOrder: 'ऑर्डर दें',
      orderConfirmed: 'ऑर्डर पक्का हो गया! किसान को सूचना भेज दी गई है।',
      orderNumber: 'ऑर्डर संख्या',
      unitsDirect: 'सत्यापित किसानों से सीधी इकाइयाँ',
      emptyTitle: 'आपकी टोकरी खाली है',
      exploreBtn: 'ताज़ी फसलें देखें',
      proceedCheckout: 'चेकआउट के लिए आगे बढ़ें',
      clearCart: 'टोकरी खाली करें',
      overstockAlert: 'कुछ फसलों की मात्रा उपलब्ध स्टॉक से अधिक है। कृपया मात्रा कम करें।',
    },
    validation: {
      stockWarning: 'स्टॉक सीमा पार हो गई है। उपलब्ध फसल से अधिक नहीं जोड़ा जा सकता।',
      addressRequired: 'कृपया अपना डिलीवरी का पता दर्ज करें।',
      orderSuccess: 'ऑर्डर किसान को भेज दिया गया! स्थिति: अनुरोध किया गया',
      orderCancelled: 'ऑर्डर रद्द कर दिया गया। फसल मात्रा पुनः स्टॉक में जोड़ी गई।',
      profileSaved: 'प्रोफ़ाइल विवरण सुरक्षित किया गया।',
    },
  },
};

export type TranslationKey = TranslationSchema;
