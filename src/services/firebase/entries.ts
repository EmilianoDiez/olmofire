import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';
import type { FirebaseEntry } from '../../types/firebase';

export const createEntry = async (entryData: Omit<FirebaseEntry, 'id' | 'createdAt'>) => {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const entry: FirebaseEntry = {
    ...entryData,
    id,
    createdAt: timestamp
  };

  await set(ref(db, `entries/${id}`), entry);
  return entry;
};

export const getDailyEntries = async (date: string) => {
  const entryQuery = query(
    ref(db, 'entries'),
    orderByChild('entryDate'),
    equalTo(date)
  );
  
  const snapshot = await get(entryQuery);
  if (!snapshot.exists()) return [];
  
  return Object.values(snapshot.val()) as FirebaseEntry[];
};