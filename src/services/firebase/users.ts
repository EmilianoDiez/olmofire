import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';
import type { FirebaseUser } from '../../types/firebase';

export const createUser = async (userData: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>) => {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const user: FirebaseUser = {
    ...userData,
    id,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await set(ref(db, `users/${id}`), user);
  return user;
};

export const getUserData = async (userId: string): Promise<FirebaseUser | null> => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  
  if (!snapshot.exists()) return null;
  
  return snapshot.val() as FirebaseUser;
};

export const getUserByDNI = async (dni: string): Promise<FirebaseUser | null> => {
  const userQuery = query(ref(db, 'users'), orderByChild('dni'), equalTo(dni));
  const snapshot = await get(userQuery);
  
  if (!snapshot.exists()) return null;
  
  const userData = Object.values(snapshot.val())[0] as FirebaseUser;
  return userData;
};

export const checkUserExists = async (dni: string): Promise<boolean> => {
  const user = await getUserByDNI(dni);
  return user !== null;
};