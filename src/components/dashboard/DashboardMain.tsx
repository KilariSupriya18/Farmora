import React from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardLayout } from './DashboardLayout';
import { FarmerDashboardView } from './FarmerDashboardView';
import { BuyerDashboardView } from './BuyerDashboardView';
import { AdminDashboardView } from './AdminDashboardView';
import { Product } from '../../types';

interface DashboardMainProps {
  onNavigateHome: () => void;
  onNavigateMarketplace: () => void;
  onNavigateSignOut: () => void;
  onNavigateProfileSetup?: () => void;
  onOpenProductModal: (product: Product) => void;
}

export const DashboardMain: React.FC<DashboardMainProps> = ({
  onNavigateHome,
  onNavigateMarketplace,
  onNavigateSignOut,
  onNavigateProfileSetup,
  onOpenProductModal,
}) => {
  const { userRole, setIsAddCropModalOpen } = useApp();

  return (
    <DashboardLayout
      onNavigateHome={onNavigateHome}
      onNavigateMarketplace={onNavigateMarketplace}
      onNavigateSignOut={onNavigateSignOut}
      onNavigateProfileSetup={onNavigateProfileSetup}
    >
      {userRole === 'farmer' && (
        <FarmerDashboardView onOpenAddProduct={() => setIsAddCropModalOpen(true)} />
      )}

      {(userRole === 'household' ||
        userRole === 'retailer' ||
        userRole === 'restaurant' ||
        userRole === 'wholesaler') && (
        <BuyerDashboardView
          onBrowseMarketplace={onNavigateMarketplace}
          onOpenProductModal={onOpenProductModal}
        />
      )}

      {userRole === 'admin' && (
        <AdminDashboardView onOpenProductModal={onOpenProductModal} />
      )}
    </DashboardLayout>
  );
};
