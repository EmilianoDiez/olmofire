import React from 'react';
import { Users } from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useCompanions } from '../hooks/useCompanions';

interface CompanionSelectorProps {
  onSelect: (companions: string[]) => void;
  selectedIds: string[];
  maxSelections: number;
  companions: Array<{ id: string; name: string; dni: string }>;
}

const CompanionSelector: React.FC<CompanionSelectorProps> = ({
  onSelect,
  selectedIds,
  maxSelections,
  companions
}) => {
  const { user } = useFirebaseAuth();
  const { loading } = useCompanions(user?.id);

  const handleCompanionToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter(selectedId => selectedId !== id));
    } else if (selectedIds.length < maxSelections) {
      onSelect([...selectedIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (companions.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay acompañantes autorizados
        </h3>
        <p className="text-gray-600">
          Registrá tus acompañantes y esperá la aprobación de FADIUNC
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Acompañantes Autorizados
        </h3>
        <span className="text-sm text-gray-500">
          {selectedIds.length}/{maxSelections} seleccionados
        </span>
      </div>

      <div className="grid gap-4">
        {companions.map((companion) => (
          <div
            key={companion.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              selectedIds.includes(companion.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            } cursor-pointer transition-colors`}
            onClick={() => handleCompanionToggle(companion.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{companion.name}</p>
                <p className="text-sm text-gray-500">DNI: {companion.dni}</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectedIds.includes(companion.id)}
              onChange={() => {}}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanionSelector;