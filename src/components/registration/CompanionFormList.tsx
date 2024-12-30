import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { CompanionData } from '../../types/registration';
import CompanionFormField from './CompanionFormField';
import { validateDNI, validatePhone, validateAge } from '../../utils/validation';

interface CompanionFormListProps {
  onSubmit: (companions: CompanionData[]) => void;
}

const CompanionFormList: React.FC<CompanionFormListProps> = ({ onSubmit }) => {
  const [companions, setCompanions] = useState<CompanionData[]>([{ name: '', age: '', dni: '', phone: '' }]);
  const [errors, setErrors] = useState<Array<Record<string, string>>>([{}]);

  const addCompanion = () => {
    if (companions.length < 3) {
      setCompanions([...companions, { name: '', age: '', dni: '', phone: '' }]);
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

  const validate = () => {
    const newErrors = companions.map(companion => {
      const error: Record<string, string> = {};
      
      if (!companion.name.trim()) error.name = 'El nombre es obligatorio';
      
      const ageError = validateAge(companion.age);
      if (ageError) error.age = ageError;
      
      const dniError = validateDNI(companion.dni);
      if (dniError) error.dni = dniError;
      
      if (Number(companion.age) >= 14) {
        const phoneError = validatePhone(companion.phone || '');
        if (phoneError) error.phone = phoneError;
      }
      
      return error;
    });

    setErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(companions);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {companions.map((companion, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Acompañante {index + 1}
            </h3>
            {companions.length > 1 && (
              <button
                type="button"
                onClick={() => removeCompanion(index)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Minus size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompanionFormField
              label="Nombre Completo"
              name={`name-${index}`}
              value={companion.name}
              error={errors[index]?.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Ingresá el nombre"
            />

            <CompanionFormField
              label="Edad"
              name={`age-${index}`}
              type="number"
              value={companion.age}
              error={errors[index]?.age}
              onChange={(e) => handleChange(index, 'age', e.target.value)}
              placeholder="Ingresá la edad"
              min="0"
              max="120"
            />

            <CompanionFormField
              label="DNI"
              name={`dni-${index}`}
              value={companion.dni}
              error={errors[index]?.dni}
              onChange={(e) => handleChange(index, 'dni', e.target.value)}
              placeholder="Ingresá el DNI"
            />

            {Number(companion.age) >= 14 && (
              <CompanionFormField
                label="Teléfono Celular"
                name={`phone-${index}`}
                type="tel"
                value={companion.phone || ''}
                error={errors[index]?.phone}
                onChange={(e) => handleChange(index, 'phone', e.target.value)}
                placeholder="Ingresá el teléfono"
              />
            )}
          </div>
        </div>
      ))}

      {companions.length < 3 && (
        <button
          type="button"
          onClick={addCompanion}
          className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Plus size={20} className="mr-2" />
          Agregar Acompañante
        </button>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Completar Registro
      </button>
    </form>
  );
};

export default CompanionFormList;