import { create } from 'zustand';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/firebase/database';
import type { FirebaseEntry } from '../types/firebase';

interface PoolState {
  entries: FirebaseEntry[];
  loading: boolean;
  error: string | null;
  subscribeToEntries: () => void;
  unsubscribeFromEntries: () => void;
}

export const usePoolStore = create<PoolState>((set) => ({
  entries: [],
  loading: false,
  error: null,

  subscribeToEntries: () => {
    set({ loading: true });
    
    const entriesRef = ref(db, 'entries');
    onValue(entriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const entries = Object.values(snapshot.val()) as FirebaseEntry[];
        set({ entries, loading: false });
      } else {
        set({ entries: [], loading: false });
      }
    }, (error) => {
      set({ error: error.message, loading: false });
    });
  },

  unsubscribeFromEntries: () => {
    const entriesRef = ref(db, 'entries');
    off(entriesRef);
  }
}));