import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase/auth';
import { createUser } from '../services/firebase/users';
import { createCompanion } from '../services/firebase/companions';
import type { AffiliateFormData, CompanionData } from '../types/registration';

export const useRegistrationFlow = (navigate: NavigateFunction) => {
  const [step, setStep] = useState(1);
  const [mainUser, setMainUser] = useState<AffiliateFormData>({
    name: '',
    email: '',
    phone: '',
    dni: ''
  });

  const handleMainUserSubmit = (userData: AffiliateFormData) => {
    setMainUser(userData);
    setStep(2);
  };

  const handleSkipCompanions = async () => {
    try {
      // Create Firebase auth user
      await createUserWithEmailAndPassword(auth, mainUser.email, mainUser.dni);
      
      // Create user document in Firebase
      await createUser({
        ...mainUser,
        status: 'pending'
      });
      
      navigate('/signin');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCompanionsSubmit = async (companions: CompanionData[]) => {
    try {
      // Create Firebase auth user
      await createUserWithEmailAndPassword(auth, mainUser.email, mainUser.dni);
      
      // Create user document
      const user = await createUser({
        ...mainUser,
        status: 'pending'
      });

      // Create companion documents
      await Promise.all(
        companions.map(companion =>
          createCompanion({
            ...companion,
            userId: user.id,
            age: parseInt(companion.age),
            status: 'pending'
          })
        )
      );

      navigate('/signin');
    } catch (error) {
      console.error('Error registering user and companions:', error);
    }
  };

  return {
    step,
    mainUser,
    handleMainUserSubmit,
    handleCompanionsSubmit,
    handleSkipCompanions
  };
};