import { createContext } from 'react';
import type { User } from '@auth/user';

export type CookieAuthContextType = {
  authStatus: 'configuring' | 'authenticated' | 'unauthenticated';
  isAuthenticated: boolean;
  user: User | null;
  signIn?: (payload: { email: string; password: string }) => Promise<{ user: User; accessToken?: string; refreshToken?: string }>;
  signUp?: (payload: { displayName: string; email: string; password: string }) => Promise<{ user: User; accessToken?: string; refreshToken?: string }>;
  signOut?: () => void;
  updateUser?: (user: Partial<User>) => Promise<Response>;
  refreshToken?: () => Promise<Response>;
};

const CookieAuthContext = createContext<CookieAuthContextType>({
  authStatus: 'configuring',
  isAuthenticated: false,
  user: null
});

export default CookieAuthContext;
