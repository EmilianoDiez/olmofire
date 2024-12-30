import { useState } from 'react';
import { createEntry, getDailyEntries } from '../services/firebase/entries';
import type { FirebaseEntry } from '../types/firebase';

export const useEntries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<FirebaseEntry[]>([]);

  const loadDailyEntries = async (date: string) => {
    setLoading(true);
    setError(null);

    try {
      const dailyEntries = await getDailyEntries(date);
      setEntries(dailyEntries);
      return dailyEntries;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load entries';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData: Omit<FirebaseEntry, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);

    try {
      const newEntry = await createEntry(entryData);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create entry';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    entries,
    loadDailyEntries,
    addEntry,
    loading,
    error
  };
};