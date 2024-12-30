import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase/auth';
import { getUserRole } from '../services/firebase/admin';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const role = await getUserRole(userCredential.user.uid);
          
          if (role !== 'admin') {
            throw new Error('Unauthorized access');
          }
          
          set({ isAuthenticated: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Error de autenticación';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        auth.signOut();
        set({ isAuthenticated: false, error: null });
      }
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated })
    }
  )
);