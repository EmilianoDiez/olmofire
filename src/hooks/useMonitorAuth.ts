import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MonitorAuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useMonitorAuth = create<MonitorAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'monitor-auth',
    }
  )
);