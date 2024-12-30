import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase/database';

export const checkExistingUser = async (email: string, dni: string) => {
  try {
    // Check by email
    const emailQuery = query(
      ref(db, 'users'),
      orderByChild('email'),
      equalTo(email)
    );
    const emailSnapshot = await get(emailQuery);
    
    if (emailSnapshot.exists()) {
      return {
        exists: true,
        field: 'email'
      };
    }

    // Check by DNI
    const dniQuery = query(
      ref(db, 'users'),
      orderByChild('dni'),
      equalTo(dni)
    );
    const dniSnapshot = await get(dniQuery);
    
    if (dniSnapshot.exists()) {
      return {
        exists: true,
        field: 'dni'
      };
    }

    return {
      exists: false,
      field: undefined
    };
  } catch (error) {
    console.error('Error checking existing user:', error);
    throw error;
  }
};