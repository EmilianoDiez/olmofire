import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';
import type { FirebaseCompanion } from '../../types/firebase';

export const createCompanion = async (companionData: Omit<FirebaseCompanion, 'id' | 'createdAt' | 'updatedAt'>) => {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const companion: FirebaseCompanion = {
    ...companionData,
    id,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await set(ref(db, `companions/${id}`), companion);
  return companion;
};

export const getApprovedCompanions = async (userId: string) => {
  try {
    const companionsRef = ref(db, 'companions');
    const companionsQuery = query(
      companionsRef,
      orderByChild('userId'),
      equalTo(userId)
    );
    
    const snapshot = await get(companionsQuery);
    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val())
      .filter((companion: FirebaseCompanion) => companion.status === 'approved')
      .map(({ id, name, dni }: FirebaseCompanion) => ({
        id,
        name,
        dni
      }));
  } catch (error) {
    console.error('Error fetching approved companions:', error);
    throw error;
  }
};