import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Card } from './layout/Card';
import CompanionSelector from './CompanionSelector';
import { usePoolStore } from '../store/usePoolStore';
import { useReservationStore } from '../store/useReservationStore';
import { useAuth } from '../hooks/useAuth';

interface ReservationFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  approvedCompanions: Array<{ id: string; name: string; dni: string }>;
  isLoading: boolean;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ 
  onSubmit, 
  onCancel,
  approvedCompanions,
  isLoading
}) => {
  const { user } = useAuth();
  const { addReservation, hasActiveReservation } = useReservationStore();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    companionIds: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setFormData(prev => ({ ...prev, date: newDate }));
    setErrors({});

    if (user && hasActiveReservation(user.id, newDate)) {
      setErrors({ date: 'Ya tenés una reserva activa para esta fecha' });
    }
  };

  const handleCompanionSelection = (selectedIds: string[]) => {
    setFormData(prev => ({ ...prev, companionIds: selectedIds }));
    if (errors.companions) {
      setErrors(prev => ({ ...prev, companions: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitError(null);

    try {
      const selectedCompanions = approvedCompanions.filter(
        companion => formData.companionIds.includes(companion.id)
      );

      const reservation = {
        date: formData.date,
        affiliateId: user.id,
        affiliateName: user.name,
        affiliateDni: user.dni,
        affiliateEmail: user.email,
        companions: selectedCompanions
      };

      await addReservation(reservation);
      onSubmit();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear la reserva';
      setSubmitError(message);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Reserva</h2>

          {submitError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full pl-10 pr-4 py-4 text-lg rounded-lg border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            {errors.date && (
              <p className="mt-2 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
        </div>

        <div className="border-t pt-8">
          <CompanionSelector
            onSelect={handleCompanionSelection}
            selectedIds={formData.companionIds}
            maxSelections={3}
            companions={approvedCompanions}
          />
        </div>

        <div className="flex flex-col space-y-4 pt-8">
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="w-full bg-blue-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Confirmar Reserva
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors shadow-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;