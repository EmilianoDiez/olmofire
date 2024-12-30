import { useState } from 'react';
import { createUser } from '../services/firebase/users';
import { createCompanion } from '../services/firebase/companions';
import type { FirebaseUser, FirebaseCompanion } from '../types/firebase';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    userData: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>,
    companions?: Array<Omit<FirebaseCompanion, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const user = await createUser(userData);

      if (companions?.length) {
        await Promise.all(
          companions.map(companion =>
            createCompanion({
              ...companion,
              userId: user.id
            })
          )
        );
      }

      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    clearError: () => setError(null)
  };
};