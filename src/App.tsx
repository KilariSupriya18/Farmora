/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { RoleBanner } from './components/common/RoleBanner';
import { LandingPage } from './components/landing/LandingPage';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { FarmerPortal } from './components/farmer/FarmerPortal';
import { AddCropModal } from './components/farmer/AddCropModal';
import { B2BPortal } from './components/b2b/B2BPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { OrdersView } from './components/orders/OrdersView';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { Footer } from './components/common/Footer';
import { AuthMain, AuthScreen } from './components/auth/AuthMain';
import { DashboardMain } from './components/dashboard/DashboardMain';
import { Product, UserRole, ProduceCategory } from './types';

function MainAppContent() {
  const [activeView, setActiveView] = useState<
    'landing' | 'marketplace' | 'farmer' | 'b2b' | 'admin' | 'orders' | 'signin' | 'dashboard'
  >('landing');

  const [authInitialScreen, setAuthInitialScreen] = useState<AuthScreen>('login');
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('farmer');

  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
    role?: UserRole;
  }>({
    isOpen: false,
    mode: 'login',
  });

  const {
    selectedProduct,
    setSelectedProduct,
    isAddCropModalOpen,
    setIsAddCropModalOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setActiveCategory,
    setUserRole,
  } = useApp();

  const handleOpenAuth = (mode: 'login' | 'signup' | 'forgot-password' | 'profile-setup', role?: UserRole) => {
    if (role) {
      setUserRole(role);
      setAuthDefaultRole(role);
    }
    setAuthInitialScreen(mode);
    setActiveView('signin');
  };

  const handleAuthSuccess = (role: UserRole) => {
    setUserRole(role);
    setActiveView('dashboard');
  };

  const handleSelectCategory = (catKey: string) => {
    setActiveCategory(catKey as ProduceCategory);
    setActiveView('marketplace');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] text-stone-900 selection:bg-[#B9D49B] selection:text-[#285B37]">
      
      {/* 1. Complete Farmora Authentication Flow: Login, Sign-up, Forgot Password, Profile Setup */}
      {activeView === 'signin' ? (
        <AuthMain
          initialScreen={authInitialScreen}
          defaultRole={authDefaultRole}
          onNavigateHome={() => setActiveView('landing')}
          onAuthSuccess={handleAuthSuccess}
        />
      ) : activeView === 'dashboard' ? (
        /* 2. Comprehensive Role-Based Dashboard with Consistent Sidebar */
        <DashboardMain
          onNavigateHome={() => setActiveView('landing')}
          onNavigateMarketplace={() => setActiveView('marketplace')}
          onNavigateSignOut={() => setActiveView('landing')}
          onNavigateProfileSetup={() => {
            setAuthInitialScreen('profile-setup');
            setActiveView('signin');
          }}
          onOpenProductModal={(prod) => setSelectedProduct(prod)}
        />
      ) : activeView === 'landing' ? (
        /* 3. 10-Section Farmora Landing Page */
        <LandingPage
          onExploreProducts={() => setActiveView('marketplace')}
          onJoinFarmer={() => {
            setUserRole('farmer');
            setActiveView('dashboard');
          }}
          onOpenProduct={(prod) => setSelectedProduct(prod)}
          onOpenAuth={handleOpenAuth}
          onSelectCategory={handleSelectCategory}
        />
      ) : (
        /* 4. Marketplace & Interactive Portals Frame */
        <>
          {/* 3-Zone Sticky Header with Home Link */}
          <Header activeView={activeView} setActiveView={setActiveView} />

          {/* Role Switcher & Context Banner */}
          <RoleBanner onSwitchPortal={(view) => setActiveView(view)} />

          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-6">
            {activeView === 'marketplace' && (
              <MarketplaceView
                onOpenProduct={(prod) => setSelectedProduct(prod)}
                onNavigateToFarmer={() => {
                  setUserRole('farmer');
                  setActiveView('dashboard');
                }}
                onNavigateToB2B={() => {
                  setUserRole('retailer');
                  setActiveView('dashboard');
                }}
              />
            )}

            {activeView === 'farmer' && (
              <FarmerPortal onOpenAddCrop={() => setIsAddCropModalOpen(true)} />
            )}

            {activeView === 'b2b' && (
              <B2BPortal onOpenProduct={(prod) => setSelectedProduct(prod)} />
            )}

            {activeView === 'orders' && <OrdersView />}

            {activeView === 'admin' && <AdminPortal />}
          </main>

          {/* Portal Footer */}
          <Footer onNavigate={(view) => setActiveView(view)} />
        </>
      )}

      {/* Global Modals & Drawers */}
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Add Crop Listing Modal for Farmers */}
      {isAddCropModalOpen && (
        <AddCropModal onClose={() => setIsAddCropModalOpen(false)} />
      )}

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onViewOrders={() => setActiveView('orders')}
        />
      )}

      {/* Auth / Onboarding Modal */}
      {authModal.isOpen && (
        <AuthModal
          initialMode={authModal.mode}
          defaultRole={authModal.role}
          onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Notification Toasts */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
