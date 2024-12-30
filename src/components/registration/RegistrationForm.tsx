import React, { useState } from 'react';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import FormField from '../common/FormField';
import { AffiliateFormData, CompanionData } from '../../types/registration';

interface RegistrationFormProps {
  onSubmit: (data: AffiliateFormData, companions?: CompanionData[]) => Promise<void>;
  initialData: AffiliateFormData;
  isLoading: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  onSubmit, 
  initialData,
  isLoading 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [companions, setCompanions] = useState<CompanionData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companionErrors, setCompanionErrors] = useState<Record<string, Record<string, string>>[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateMainForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos';
    }

    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (!/^\d{7,8}$/.test(formData.dni)) {
      newErrors.dni = 'DNI inválido (7-8 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanions = () => {
    const newErrors = companions.map(companion => {
      const error: Record<string, string> = {};
      
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

    setCompanionErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const isMainFormValid = validateMainForm();
    const areCompanionsValid = companions.length === 0 || validateCompanions();

    if (!isMainFormValid || !areCompanionsValid) return;

    try {
      await onSubmit(formData, companions.length > 0 ? companions : undefined);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Error al registrar usuario');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addCompanion = () => {
    if (companions.length < 3) {
      setCompanions([...companions, { name: '', age: '', dni: '', phone: '' }]);
      setCompanionErrors([...companionErrors, {}]);
    }
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
    setCompanionErrors(companionErrors.filter((_, i) => i !== index));
  };

  const handleCompanionChange = (index: number, field: keyof CompanionData, value: string) => {
    const newCompanions = [...companions];
    newCompanions[index] = { ...newCompanions[index], [field]: value };
    setCompanions(newCompanions);

    if (companionErrors[index]?.[field]) {
      const newErrors = [...companionErrors];
      newErrors[index] = { ...newErrors[index], [field]: '' };
      setCompanionErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Datos del Afiliado</h3>

        {submitError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}

        <div className="space-y-4">
          <FormField
            label="Nombre Completo"
            name="name"
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
            placeholder="Ingresá tu nombre completo"
            disabled={isLoading}
          />

          <FormField
            label="DNI"
            name="dni"
            value={formData.dni}
            error={errors.dni}
            onChange={handleChange}
            placeholder="Ingresá tu DNI"
            disabled={isLoading}
          />

          <FormField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            placeholder="Ingresá tu email"
            disabled={isLoading}
          />

          <FormField
            label="Teléfono"
            name="phone"
            type="tel"
            value={formData.phone}
            error={errors.phone}
            onChange={handleChange}
            placeholder="Ingresá tu número de teléfono"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Companions Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Acompañantes (opcional)
          </h3>
          {companions.length < 3 && (
            <button
              type="button"
              onClick={addCompanion}
              className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
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
                <h4 className="font-medium text-gray-900">Acompañante {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeCompanion(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Nombre Completo"
                  name={`companion-${index}-name`}
                  value={companion.name}
                  error={companionErrors[index]?.name}
                  onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                  placeholder="Ingresá el nombre"
                  disabled={isLoading}
                />

                <FormField
                  label="Edad"
                  name={`companion-${index}-age`}
                  type="number"
                  value={companion.age}
                  error={companionErrors[index]?.age}
                  onChange={(e) => handleCompanionChange(index, 'age', e.target.value)}
                  placeholder="Ingresá la edad"
                  min="0"
                  max="120"
                  disabled={isLoading}
                />

                <FormField
                  label="DNI"
                  name={`companion-${index}-dni`}
                  value={companion.dni}
                  error={companionErrors[index]?.dni}
                  onChange={(e) => handleCompanionChange(index, 'dni', e.target.value)}
                  placeholder="Ingresá el DNI"
                  disabled={isLoading}
                />

                {Number(companion.age) >= 14 && (
                  <FormField
                    label="Teléfono Celular"
                    name={`companion-${index}-phone`}
                    type="tel"
                    value={companion.phone || ''}
                    error={companionErrors[index]?.phone}
                    onChange={(e) => handleCompanionChange(index, 'phone', e.target.value)}
                    placeholder="Ingresá el teléfono"
                    disabled={isLoading}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Registrando...' : 'Completar Registro'}
      </button>
    </form>
  );
};

export default RegistrationForm;