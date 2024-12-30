import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PoolState } from '../types/store';
import { generateId } from '../utils/helpers';

export const usePoolStore = create<PoolState>()(
  persist(
    (set) => ({
      currentDate: new Date(),
      reservations: 0,
      entries: 0,
      entryHistory: [],
      isAffiliatePending: false,
      hasGrantedPermissions: false,
      authorizedCompanions: [],
      affiliates: [],
      pendingRegistrations: [],
      setReservations: (count) => set({ reservations: count }),
      setEntries: (count) => set({ entries: count }),
      setAffiliatePending: (pending) => set({ isAffiliatePending: pending }),
      setPermissionsGranted: (granted) => set({ hasGrantedPermissions: granted }),
      addAffiliate: (affiliate, companions = []) => {
        const affiliateId = generateId();
        const timestamp = new Date().toISOString();

        set((state) => {
          const affiliateRegistration = {
            id: affiliateId,
            type: 'affiliate' as const,
            data: affiliate,
            status: 'pending' as const,
            registrationDate: timestamp
          };

          const companionRegistrations = companions.map(companion => ({
            id: generateId(),
            type: 'companion' as const,
            data: {
              ...companion,
              affiliateId
            },
            status: 'pending' as const,
            registrationDate: timestamp
          }));

          const newAffiliate = {
            ...affiliate,
            id: affiliateId,
            status: 'pending',
            registrationDate: timestamp
          };

          const newCompanions = companions.map(companion => ({
            ...companion,
            id: generateId(),
            status: 'pending',
            affiliateId,
            registrationDate: timestamp
          }));

          return {
            affiliates: [...state.affiliates, newAffiliate],
            authorizedCompanions: [...state.authorizedCompanions, ...newCompanions],
            pendingRegistrations: [
              ...state.pendingRegistrations,
              affiliateRegistration,
              ...companionRegistrations
            ],
            isAffiliatePending: true
          };
        });
      },
      updateRegistrationStatus: (id, status) => {
        set((state) => {
          const registration = state.pendingRegistrations.find(r => r.id === id);
          if (!registration) return state;

          const updatedAffiliates = state.affiliates.map(affiliate =>
            affiliate.id === id ? { ...affiliate, status } : affiliate
          );

          const updatedCompanions = state.authorizedCompanions.map(companion =>
            companion.id === id ? { ...companion, status } : companion
          );

          const updatedRegistrations = state.pendingRegistrations.map(reg =>
            reg.id === id ? { ...reg, status } : reg
          );

          return {
            affiliates: updatedAffiliates,
            authorizedCompanions: updatedCompanions,
            pendingRegistrations: updatedRegistrations,
            isAffiliatePending: registration.type === 'affiliate' ? status === 'pending' : state.isAffiliatePending
          };
        });
      },
      addEntryRecord: (record) => set((state) => ({
        entryHistory: [
          { 
            ...record, 
            timestamp: new Date().toISOString() // Store as ISO string
          },
          ...state.entryHistory
        ],
        entries: state.entries + 1
      }))
    }),
    {
      name: 'pool-store',
    }
  )
);