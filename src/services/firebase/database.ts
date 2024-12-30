import { ref, get, set, remove, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';

export const createDocument = async <T extends { id: string }>(
  path: string,
  data: T
): Promise<T> => {
  await set(ref(db, `${path}/${data.id}`), data);
  return data;
};

export const getDocument = async <T>(
  path: string,
  id: string
): Promise<T | null> => {
  const snapshot = await get(ref(db, `${path}/${id}`));
  return snapshot.exists() ? snapshot.val() as T : null;
};

export const queryDocuments = async <T>(
  path: string,
  field: string,
  value: string | number | boolean
): Promise<T[]> => {
  const queryRef = query(ref(db, path), orderByChild(field), equalTo(value));
  const snapshot = await get(queryRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const updateDocument = async <T>(
  path: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = ref(db, `${path}/${id}`);
  const snapshot = await get(docRef);
  if (!snapshot.exists()) throw new Error('Document not found');
  
  await set(docRef, {
    ...snapshot.val(),
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteDocument = async (
  path: string,
  id: string
): Promise<void> => {
  await remove(ref(db, `${path}/${id}`));
};