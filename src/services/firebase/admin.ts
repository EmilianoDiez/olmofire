import { ref, get, set } from 'firebase/database';
import { db } from '../../lib/firebase/database';

export interface PendingRegistration {
  id: string;
  name: string;
  dni: string;
  email?: string;
  created_at: string;
}

export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.val().role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
};

export const getPendingRegistrations = async () => {
  try {
    const usersRef = ref(db, 'users');
    const companionsRef = ref(db, 'companions');
    
    const [usersSnapshot, companionsSnapshot] = await Promise.all([
      get(usersRef),
      get(companionsRef)
    ]);

    const users: PendingRegistration[] = [];
    const companions: PendingRegistration[] = [];

    if (usersSnapshot.exists()) {
      usersSnapshot.forEach((child) => {
        const user = child.val();
        if (user.status === 'pending') {
          users.push({
            id: user.id,
            name: user.name,
            dni: user.dni,
            email: user.email,
            created_at: user.createdAt
          });
        }
      });
    }

    if (companionsSnapshot.exists()) {
      companionsSnapshot.forEach((child) => {
        const companion = child.val();
        if (companion.status === 'pending') {
          companions.push({
            id: companion.id,
            name: companion.name,
            dni: companion.dni,
            created_at: companion.createdAt
          });
        }
      });
    }

    return { users, companions };
  } catch (error) {
    console.error('Error getting pending registrations:', error);
    throw error;
  }
};

export const approveUser = async (userId: string, adminName: string) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new Error('User not found');
    }

    const user = snapshot.val();
    await set(userRef, {
      ...user,
      status: 'approved',
      approvedBy: adminName,
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error approving user:', error);
    throw error;
  }
};

export const rejectUser = async (userId: string, adminName: string) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new Error('User not found');
    }

    const user = snapshot.val();
    await set(userRef, {
      ...user,
      status: 'rejected',
      rejectedBy: adminName,
      rejectedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error rejecting user:', error);
    throw error;
  }
};

export const approveCompanion = async (companionId: string, adminName: string) => {
  try {
    const companionRef = ref(db, `companions/${companionId}`);
    const snapshot = await get(companionRef);
    
    if (!snapshot.exists()) {
      throw new Error('Companion not found');
    }

    const companion = snapshot.val();
    await set(companionRef, {
      ...companion,
      status: 'approved',
      approvedBy: adminName,
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error approving companion:', error);
    throw error;
  }
};

export const rejectCompanion = async (companionId: string, adminName: string) => {
  try {
    const companionRef = ref(db, `companions/${companionId}`);
    const snapshot = await get(companionRef);
    
    if (!snapshot.exists()) {
      throw new Error('Companion not found');
    }

    const companion = snapshot.val();
    await set(companionRef, {
      ...companion,
      status: 'rejected',
      rejectedBy: adminName,
      rejectedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error rejecting companion:', error);
    throw error;
  }
};