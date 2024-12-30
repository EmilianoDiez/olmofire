import React, { useState } from 'react';
import { Plus, Minus, Users } from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { createCompanion } from '../services/firebase/companions';
import type { FirebaseCompanion } from '../types/firebase';

interface Companion {
  name: string;
  age: string;
  dni: string;
  phone?: string;
}

interface CompanionFormProps {
  onSubmit: (companions: Array<Companion>) => void;
}

const CompanionForm: React.FC<CompanionFormProps> = ({ onSubmit }) => {
  const { user } = useFirebaseAuth();
  const [companions, setCompanions] = useState<Array<Companion>>([{ name: '', age: '', dni: '', phone: '' }]);
  const [errors, setErrors] = useState<Array<{ name?: string; age?: string; dni?: string; phone?: string }>>([{}]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCompanion = () => {
    if (companions.length < 3) {
      setCompanions([...companions, { name: '', age: '', dni: '', phone: '' }]);
      setErrors([...errors, {}]);
    }
  };

  const removeCompanion = (index: number) => {
    const newCompanions = companions.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setCompanions(newCompanions);
    setErrors(newErrors);
  };

  const handleChange = (index: number, field: keyof Companion, value: string) => {
    const newCompanions = [...companions];
    newCompanions[index][field] = value;
    setCompanions(newCompanions);

    if (errors[index]?.[field]) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: '' };
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = companions.map(companion => {
      const error: { name?: string; age?: string; dni?: string; phone?: string } = {};
      if (!companion.name.trim()) error.name = 'El nombre es obligatorio';
      if (!companion.age.trim()) error.age = 'La edad es obligatoria';
      else if (isNaN(Number(companion.age)) || Number(companion.age) < 0 || Number(companion.age) > 120) {
        error.age = 'Edad inválida';
      }
      if (!companion.dni.trim()) error.dni = 'El DNI es obligatorio';
      else if (!/^\d{7,8}$/.test(companion.dni)) {
        error.dni = 'DNI inválido (7-8 dígitos)';
      }
      if (Number(companion.age) >= 14) {
        if (!companion.phone?.trim()) error.phone = 'El teléfono es obligatorio para mayores de 14 años';
        else if (!/^\d{10}$/.test(companion.phone.replace(/\D/g, ''))) {
          error.phone = 'El teléfono debe tener 10 dígitos';
        }
      }
      return error;
    });

    setErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Create companions in Firebase
      const companionPromises = companions.map(companion => 
        createCompanion({
          userId: user.id,
          name: companion.name,
          dni: companion.dni,
          age: parseInt(companion.age),
          phone: companion.phone,
          status: 'pending'
        } as Omit<FirebaseCompanion, 'id' | 'createdAt' | 'updatedAt'>)
      );

      await Promise.all(companionPromises);
      onSubmit(companions);
    } catch (error) {
      console.error('Error creating companions:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Agregar Acompañantes de su Grupo Primario</h2>
        </div>
        {companions.length < 3 && (
          <button
            type="button"
            onClick={addCompanion}
            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Agregar Acompañante
          </button>
        )}
      </div>

      <div className="space-y-6">
        {companions.map((companion, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Acompañante {index + 1}</h3>
              {companions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCompanion(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={companion.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors[index]?.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ingresá el nombre"
                />
                {errors[index]?.name && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  value={companion.age}
                  onChange={(e) => handleChange(index, 'age', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors[index]?.age ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ingresá la edad"
                  min="0"
                  max="120"
                />
                {errors[index]?.age && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNI
                </label>
                <input
                  type="text"
                  value={companion.dni}
                  onChange={(e) => handleChange(index, 'dni', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors[index]?.dni ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Ingresá el DNI"
                />
                {errors[index]?.dni && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].dni}</p>
                )}
              </div>

              {Number(companion.age) >= 14 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono Celular
                  </label>
                  <input
                    type="tel"
                    value={companion.phone || ''}
                    onChange={(e) => handleChange(index, 'phone', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors[index]?.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Ingresá el teléfono"
                  />
                  {errors[index]?.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].phone}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Registrando...' : 'Completar Registro'}
      </button>
    </form>
  );
};

export default CompanionForm;