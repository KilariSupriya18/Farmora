import React, { useState } from 'react';
import { UserRole } from '../../types';
import { AuthLayout } from './AuthLayout';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { ProfileSetupPage } from './ProfileSetupPage';

export type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'profile-setup';

interface AuthMainProps {
  initialScreen?: AuthScreen;
  defaultRole?: UserRole;
  onNavigateHome: () => void;
  onAuthSuccess: (role: UserRole) => void;
}

export const AuthMain: React.FC<AuthMainProps> = ({
  initialScreen = 'login',
  defaultRole = 'farmer',
  onNavigateHome,
  onAuthSuccess,
}) => {
  const [screen, setScreen] = useState<AuthScreen>(initialScreen);

  const screenHeaders: Record<AuthScreen, { title: string; subtitle: string }> = {
    login: {
      title: 'Sign In to Your Account',
      subtitle: 'Access your harvest orders, listed inventory, and transparent farmer direct rates.',
    },
    signup: {
      title: 'Create Your Farmora Account',
      subtitle: 'Join India’s direct grower marketplace as a Farmer, Household, or Commercial Buyer.',
    },
    'forgot-password': {
      title: 'Reset Account Password',
      subtitle: 'Receive a secure recovery code to restore your Farmora dashboard access.',
    },
    'profile-setup': {
      title: 'Complete Your Member Profile',
      subtitle: 'Configure your farm acreage, delivery address, or business commercial procurement settings.',
    },
  };

  const handleLoginSuccess = (role: UserRole) => {
    onAuthSuccess(role);
  };

  const handleSignUpSuccess = (role: UserRole, isNewRegistration?: boolean) => {
    if (isNewRegistration) {
      setScreen('profile-setup');
    } else {
      onAuthSuccess(role);
    }
  };

  const handleProfileComplete = (role: UserRole) => {
    onAuthSuccess(role);
  };

  return (
    <AuthLayout
      activeScreen={screen}
      onNavigateHome={onNavigateHome}
      title={screenHeaders[screen].title}
      subtitle={screenHeaders[screen].subtitle}
    >
      {screen === 'login' && (
        <LoginPage
          onSuccess={handleLoginSuccess}
          onNavigateSignUp={() => setScreen('signup')}
          onNavigateForgotPassword={() => setScreen('forgot-password')}
        />
      )}

      {screen === 'signup' && (
        <SignUpPage
          defaultRole={defaultRole}
          onSuccess={handleSignUpSuccess}
          onNavigateLogin={() => setScreen('login')}
        />
      )}

      {screen === 'forgot-password' && (
        <ForgotPasswordPage
          onNavigateLogin={() => setScreen('login')}
        />
      )}

      {screen === 'profile-setup' && (
        <ProfileSetupPage
          onComplete={handleProfileComplete}
          onSkip={() => onAuthSuccess(defaultRole)}
        />
      )}
    </AuthLayout>
  );
};
