import React from 'react';
import { Check, X } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import type { PendingRegistration } from '../../services/firebase/admin';

interface RegistrationTableProps {
  registrations: PendingRegistration[];
  type: 'user' | 'companion';
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  type,
  onApprove,
  onReject
}) => {
  if (registrations.length === 0) {
    return (
      <p className="text-gray-500">
        No hay {type === 'user' ? 'afiliados' : 'acompañantes'} pendientes de aprobación
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              DNI
            </th>
            {type === 'user' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td className="px-6 py-4 whitespace-nowrap">{registration.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registration.dni}</td>
              {type === 'user' && (
                <td className="px-6 py-4 whitespace-nowrap">{registration.email}</td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(registration.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onApprove(registration.id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => onReject(registration.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <X size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;