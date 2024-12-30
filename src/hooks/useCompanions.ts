import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/firebase/database';
import type { FirebaseCompanion } from '../types/firebase';

export const useCompanions = (userId: string | undefined) => {
  const [companions, setCompanions] = useState<FirebaseCompanion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setCompanions([]);
      setLoading(false);
      return;
    }

    const companionsRef = ref(db, 'companions');
    setLoading(true);

    const unsubscribe = onValue(companionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const companionsData = snapshot.val();
        const userCompanions = Object.values(companionsData)
          .filter((companion: any) => 
            companion.userId === userId && 
            companion.status === 'approved'
          );
        setCompanions(userCompanions as FirebaseCompanion[]);
      } else {
        setCompanions([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading companions:', error);
      setError(error.message);
      setLoading(false);
    });

    return () => {
      off(companionsRef);
    };
  }, [userId]);

  return {
    companions,
    loading,
    error
  };
};