import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { auth } from '../../lib/firebase/auth';
import { db } from '../../lib/firebase/database';
import type { FirebaseUser } from '../../types/firebase';

export const registerUser = async (userData: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    // First check if user already exists
    const userQuery = query(
      ref(db, 'users'), 
      orderByChild('dni'), 
      equalTo(userData.dni)
    );
    
    const snapshot = await get(userQuery);
    if (snapshot.exists()) {
      throw new Error('Ya existe un usuario con ese DNI');
    }

    // Create Firebase auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.dni // Using DNI as initial password
    );

    // Create user document in Realtime Database
    const id = userCredential.user.uid;
    const timestamp = new Date().toISOString();

    const user: FirebaseUser = {
      id,
      email: userData.email,
      dni: userData.dni,
      name: userData.name,
      phone: userData.phone || null,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await set(ref(db, `users/${id}`), user);
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      // Handle specific Firebase Auth errors
      if (error.message.includes('email-already-in-use')) {
        throw new Error('Ya existe un usuario con ese email');
      }
      throw error;
    }
    throw new Error('Error en el registro');
  }
};

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
      return { exists: true, field: 'email' };
    }

    // Check by DNI
    const dniQuery = query(
      ref(db, 'users'),
      orderByChild('dni'),
      equalTo(dni)
    );
    const dniSnapshot = await get(dniQuery);
    
    if (dniSnapshot.exists()) {
      return { exists: true, field: 'dni' };
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking existing user:', error);
    throw error;
  }
};