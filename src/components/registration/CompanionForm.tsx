import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import CompanionFormField from './CompanionFormField';
import { CompanionData } from '../../types/registration';
import { useCompanionForm } from '../../hooks/useCompanionForm';

interface CompanionFormProps {
  onSubmit: (companions: CompanionData[]) => void;
}

const CompanionForm: React.FC<CompanionFormProps> = ({ onSubmit }) => {
  const {
    companions,
    errors,
    addCompanion,
    removeCompanion,
    handleChange,
    handleSubmit
  } = useCompanionForm(onSubmit);

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
                aria-label="Eliminar acompañante"
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

export default CompanionForm;