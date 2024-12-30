import { ref, get, set, update, remove } from 'firebase/database';
import { db } from '../lib/firebase/database';

// Generic database operations
export const dbOperations = {
  create: async <T extends { id: string }>(path: string, data: T): Promise<T> => {
    await set(ref(db, `${path}/${data.id}`), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return data;
  },

  get: async <T>(path: string, id: string): Promise<T | null> => {
    const snapshot = await get(ref(db, `${path}/${id}`));
    return snapshot.exists() ? snapshot.val() as T : null;
  },

  update: async <T>(path: string, id: string, data: Partial<T>): Promise<void> => {
    const updates = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await update(ref(db, `${path}/${id}`), updates);
  },

  delete: async (path: string, id: string): Promise<void> => {
    await remove(ref(db, `${path}/${id}`));
  }
};