/**
 * Authentication related types
 */

// User interface matching NextAuth session data
export interface User {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  accessToken?: string;
  refreshToken?: string;
}

// Auth context type for the context provider
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
} 