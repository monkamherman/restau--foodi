
import { User, Session } from '@supabase/supabase-js';

export type Role = 'user' | 'admin' | 'super-admin';

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  userRoles: Role[];
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
};
