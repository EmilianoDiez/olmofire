import { useState, FormEvent } from 'react';
import { CompanionData } from '../types/registration';

interface CompanionError {
  name?: string;
  age?: string;
  dni?: string;
  phone?: string;
}

const initialCompanion: CompanionData = {
  name: '',
  age: '',
  dni: '',
  phone: ''
};

export const useCompanionForm = (onSubmit: (companions: CompanionData[]) => void) => {
  const [companions, setCompanions] = useState<CompanionData[]>([{ ...initialCompanion }]);
  const [errors, setErrors] = useState<CompanionError[]>([{}]);

  const addCompanion = () => {
    if (companions.length < 3) {
      setCompanions([...companions, { ...initialCompanion }]);
      setErrors([...errors, {}]);
    }
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof CompanionData, value: string) => {
    const newCompanions = [...companions];
    newCompanions[index] = { ...newCompanions[index], [field]: value };
    setCompanions(newCompanions);

    if (errors[index]?.[field]) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: '' };
      setErrors(newErrors);
    }
  };

  const validate = (): boolean => {
    const newErrors = companions.map(companion => {
      const error: CompanionError = {};
      
      if (!companion.name.trim()) {
        error.name = 'El nombre es obligatorio';
      }
      
      if (!companion.age.trim()) {
        error.age = 'La edad es obligatoria';
      } else if (isNaN(Number(companion.age)) || Number(companion.age) < 0 || Number(companion.age) > 120) {
        error.age = 'Edad inválida';
      }
      
      if (!companion.dni.trim()) {
        error.dni = 'El DNI es obligatorio';
      } else if (!/^\d{7,8}$/.test(companion.dni)) {
        error.dni = 'DNI inválido (7-8 dígitos)';
      }
      
      if (Number(companion.age) >= 14) {
        if (!companion.phone?.trim()) {
          error.phone = 'El teléfono es obligatorio para mayores de 14 años';
        } else if (!/^\d{10}$/.test(companion.phone.replace(/\D/g, ''))) {
          error.phone = 'El teléfono debe tener 10 dígitos';
        }
      }
      
      return error;
    });

    setErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(companions);
    }
  };

  return {
    companions,
    errors,
    addCompanion,
    removeCompanion,
    handleChange,
    handleSubmit
  };
};