import { useState, useCallback } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../lib/firebase/auth';
import { getUserByDNI } from '../services/firebase/users';
import type { FirebaseUser } from '../types/firebase';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (dni: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserByDNI(dni);
      if (!user) {
        return false;
      }

      // Sign in with Firebase using email/password
      await signInWithEmailAndPassword(auth, user.email, dni); // Using DNI as password for simplicity
      setUser(user);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);

    try {
      // Create Firebase auth user with email/password
      await createUserWithEmailAndPassword(auth, userData.email, userData.dni); // Using DNI as password
      setUser(userData as FirebaseUser);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    register,
    signOut,
    isAuthenticated: user !== null
  };
};