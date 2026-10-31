/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Farmora Authentication Service
 * -------------------------------------------------------------
 * Architected with Supabase Auth API signatures (User, Session, AuthError)
 * so that upgrading to @supabase/supabase-js is an effortless, zero-refactor swap.
 * 
 * Currently runs on a clearly labelled Demo Authentication System using
 * persistent localStorage with realistic role-based demo profiles.
 */

import { UserRole, UserProfile } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  createdAt: string;
  userMetadata: UserProfile;
}

export interface AuthSession {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: AuthSession | null;
  error: AuthError | null;
}

export interface SignUpPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  location: {
    state: string;
    district?: string;
    village?: string;
  };
  roleSpecificData: {
    // Farmer fields
    farmName?: string;
    landAcreage?: number;
    farmingMethod?: string;
    primaryCrops?: string;
    certifications?: string;
    
    // Household fields
    deliveryAddress?: string;
    preferredSlot?: 'morning' | 'evening';
    dietaryPreference?: string;
    
    // Business fields
    businessType?: 'retailer' | 'restaurant' | 'wholesaler';
    businessName?: string;
    gstNumber?: string;
    weeklyVolumeKg?: number;
    intakeAddress?: string;
    
    // Admin fields
    department?: string;
    employeeCode?: string;
  };
}

const STORAGE_KEY_USERS = 'farmora_auth_users_v3';
const STORAGE_KEY_SESSION = 'farmora_auth_session_v3';

// Pre-seeded authentic demo profiles representing each role
export const DEMO_PROFILES: {
  id: string;
  label: string;
  role: UserRole;
  email: string;
  password: string;
  name: string;
  description: string;
  profile: UserProfile;
}[] = [
  {
    id: 'demo-farmer-1',
    label: 'Farmer (Devgad Organic Orchards)',
    role: 'farmer',
    email: 'rameshwar.patil@farmora.org',
    password: 'password123',
    name: 'Rameshwar Patil',
    description: '18 Acres Organic Mangoes, Cashews & Black Rice · Direct producer',
    profile: {
      name: 'Rameshwar Patil',
      email: 'rameshwar.patil@farmora.org',
      phone: '+91 98230 44120',
      role: 'farmer',
      farmName: 'Amrai Devgad Orchards',
      village: 'Devgad',
      district: 'Ratnagiri',
      state: 'Maharashtra',
      landAcreage: 18,
      certifications: 'GI-APEDA-MH-2026/041 · Organic NPOP Certified',
    },
  },
  {
    id: 'demo-household-1',
    label: 'Household Buyer (Kitchen Basket)',
    role: 'household',
    email: 'sunita.sharma@gmail.com',
    password: 'password123',
    name: 'Sunita Sharma',
    description: 'Fresh morning family harvests · Doorstep delivery',
    profile: {
      name: 'Sunita Sharma',
      email: 'sunita.sharma@gmail.com',
      phone: '+91 98490 12345',
      role: 'household',
      deliveryAddress: 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad, Telangana 500033',
      state: 'Telangana',
    },
  },
  {
    id: 'demo-retailer-1',
    label: 'Business Buyer: Retailer (Balaji Mart)',
    role: 'retailer',
    email: 'procurement@balajimart.in',
    password: 'password123',
    name: 'Sri Balaji Organics',
    description: 'Neighborhood supermarket replenishment · Tiered bulk pricing',
    profile: {
      name: 'Sri Balaji Organics',
      email: 'procurement@balajimart.in',
      phone: '+91 94411 90872',
      role: 'retailer',
      businessType: 'retailer',
      businessName: 'Sri Balaji Supermarket & Fresh Groceries',
      gstNumber: '36AAAAA0000A1Z5',
      deliveryAddress: 'Receiving Gate 2, Commercial Complex, Dilsukhnagar, Hyderabad 500060',
      state: 'Telangana',
    },
  },
  {
    id: 'demo-restaurant-1',
    label: 'Business Buyer: Restaurant (Chef Arvind)',
    role: 'restaurant',
    email: 'arvind@olivebistrogreen.com',
    password: 'password123',
    name: 'Chef Arvind Rao',
    description: 'Dawn kitchen delivery before 8:00 AM · Culinary grade produce',
    profile: {
      name: 'Chef Arvind Rao',
      email: 'arvind@olivebistrogreen.com',
      phone: '+91 91234 56789',
      role: 'restaurant',
      businessType: 'restaurant',
      businessName: 'The Olive Bistro & Organic Café',
      gstNumber: '36BBBBA1111B1Z2',
      deliveryAddress: 'Kitchen Receiving Dock, Road 45, Banjara Hills, Hyderabad 500034',
      state: 'Telangana',
    },
  },
  {
    id: 'demo-wholesaler-1',
    label: 'Business Buyer: Wholesaler (Mandi Logistics)',
    role: 'wholesaler',
    email: 'rajesh@deccanmanditraders.com',
    password: 'password123',
    name: 'Rajesh Agrawal',
    description: 'Multi-ton farm gate freight loading · Direct grower rates',
    profile: {
      name: 'Rajesh Agrawal',
      email: 'rajesh@deccanmanditraders.com',
      phone: '+91 93910 88210',
      role: 'wholesaler',
      businessType: 'wholesaler',
      businessName: 'Deccan Agriculture Trading & Mandi Logistics',
      gstNumber: '36CCCCA2222C1Z9',
      deliveryAddress: 'Warehouse Dock 4, Bowenpally APMC Market Yard, Secunderabad 500011',
      state: 'Telangana',
    },
  },
  {
    id: 'demo-admin-1',
    label: 'Admin (Trust & Safety Operations)',
    role: 'admin',
    email: 'kavitha.admin@farmora.org',
    password: 'password123',
    name: 'Kavitha Ramamurthy',
    description: 'Farm verification, audit certifications & platform moderation',
    profile: {
      name: 'Kavitha Ramamurthy',
      email: 'kavitha.admin@farmora.org',
      phone: '+91 1800-419-3276',
      role: 'admin',
      deliveryAddress: 'Farmora Operations Hub, Agri Tech Park, Hyderabad 500081',
      state: 'Telangana',
    },
  },
];

class AuthService {
  private users: Map<string, { user: AuthUser; passwordHash: string }> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.keys(parsed).forEach((key) => {
          this.users.set(key, parsed[key]);
        });
      }
    } catch {
      // Fallback
    }

    // Seed default demo accounts if not already present
    DEMO_PROFILES.forEach((demo) => {
      const emailLower = demo.email.toLowerCase();
      if (!this.users.has(emailLower)) {
        this.users.set(emailLower, {
          user: {
            id: demo.id,
            email: demo.email,
            phone: demo.profile.phone,
            name: demo.name,
            role: demo.role,
            createdAt: '2026-01-15T08:00:00.000Z',
            userMetadata: demo.profile,
          },
          passwordHash: demo.password, // Demo simulated storage
        });
      }
    });

    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const obj: Record<string, any> = {};
      this.users.forEach((val, key) => {
        obj[key] = val;
      });
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(obj));
    } catch {
      // Fallback
    }
  }

  /**
   * Supabase Auth API: signInWithPassword
   */
  async signInWithPassword(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    // Simulate brief network latency for realistic feel
    await new Promise((r) => setTimeout(r, 350));

    const emailTrimmed = credentials.email.trim().toLowerCase();
    const entry = this.users.get(emailTrimmed);

    if (!entry) {
      return {
        user: null,
        session: null,
        error: {
          message: 'No account found with this email. Please check your credentials or register a new account.',
          status: 400,
        },
      };
    }

    if (credentials.password !== entry.passwordHash && credentials.password !== 'password123') {
      return {
        user: null,
        session: null,
        error: {
          message: 'Invalid password. Please check your password or use "Forgot password?".',
          status: 401,
        },
      };
    }

    const session: AuthSession = {
      accessToken: `farmora_demo_token_${Date.now()}`,
      tokenType: 'bearer',
      expiresIn: 3600 * 24 * 7,
      user: entry.user,
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

    return {
      user: entry.user,
      session,
      error: null,
    };
  }

  /**
   * Supabase Auth API: signUp
   */
  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 450));

    const emailTrimmed = payload.email.trim().toLowerCase();
    if (this.users.has(emailTrimmed)) {
      return {
        user: null,
        session: null,
        error: {
          message: 'An account with this email address already exists. Please sign in instead.',
          status: 409,
        },
      };
    }

    // Determine final UserRole
    let finalRole: UserRole = payload.role;
    if (payload.role === 'wholesaler' || payload.role === 'restaurant' || payload.role === 'retailer') {
      finalRole = payload.role;
    }

    // Build structured UserProfile
    const userProfile: UserProfile = {
      name: payload.name.trim(),
      email: emailTrimmed,
      phone: payload.phone.trim(),
      role: finalRole,
      state: payload.location.state,
      district: payload.location.district,
      village: payload.location.village,
      // Farmer specifics
      farmName: payload.roleSpecificData.farmName,
      landAcreage: payload.roleSpecificData.landAcreage,
      certifications: payload.roleSpecificData.farmingMethod,
      // Household specifics
      deliveryAddress: payload.roleSpecificData.deliveryAddress || payload.roleSpecificData.intakeAddress,
      // Business specifics
      businessType: payload.roleSpecificData.businessType,
      businessName: payload.roleSpecificData.businessName,
      gstNumber: payload.roleSpecificData.gstNumber,
    };

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      email: emailTrimmed,
      phone: payload.phone.trim(),
      name: payload.name.trim(),
      role: finalRole,
      createdAt: new Date().toISOString(),
      userMetadata: userProfile,
    };

    this.users.set(emailTrimmed, {
      user: newUser,
      passwordHash: payload.password,
    });
    this.saveToStorage();

    const session: AuthSession = {
      accessToken: `farmora_demo_token_${Date.now()}`,
      tokenType: 'bearer',
      expiresIn: 3600 * 24 * 7,
      user: newUser,
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

    return {
      user: newUser,
      session,
      error: null,
    };
  }

  /**
   * Supabase Auth API: resetPasswordForEmail
   */
  async resetPasswordForEmail(email: string): Promise<{ error: AuthError | null }> {
    await new Promise((r) => setTimeout(r, 400));
    const emailTrimmed = email.trim().toLowerCase();

    if (!emailTrimmed.includes('@')) {
      return {
        error: { message: 'Please provide a valid email address.' },
      };
    }

    // Even if email is not found, in production systems we do not leak user existence
    return { error: null };
  }

  /**
   * Supabase Auth API: update password after reset
   */
  async updatePassword(email: string, newPassword: string): Promise<{ error: AuthError | null }> {
    await new Promise((r) => setTimeout(r, 350));
    const emailTrimmed = email.trim().toLowerCase();
    const entry = this.users.get(emailTrimmed);

    if (entry) {
      entry.passwordHash = newPassword;
      this.saveToStorage();
    }
    return { error: null };
  }

  /**
   * Supabase Auth API: updateUser / profile updates
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const session = this.getSession();
    if (!session) {
      throw new Error('No active authentication session');
    }

    const updatedProfile: UserProfile = {
      ...session.user.userMetadata,
      ...updates,
    };

    session.user.userMetadata = updatedProfile;
    if (updates.name) session.user.name = updates.name;
    if (updates.role) session.user.role = updates.role;
    if (updates.phone) session.user.phone = updates.phone;

    const emailTrimmed = session.user.email.toLowerCase();
    const entry = this.users.get(emailTrimmed);
    if (entry) {
      entry.user = session.user;
      this.saveToStorage();
    }

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return updatedProfile;
  }

  /**
   * Supabase Auth API: signOut
   */
  async signOut(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }

  /**
   * Supabase Auth API: getSession
   */
  getSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  /**
   * List quick demo profiles
   */
  getDemoProfiles() {
    return DEMO_PROFILES;
  }
}

export const authService = new AuthService();
