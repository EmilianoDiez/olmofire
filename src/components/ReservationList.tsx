import React from 'react';
import { Calendar, Users, X } from 'lucide-react';
import { useReservationStore } from '../store/useReservationStore';
import { useAuth } from '../hooks/useAuth';
import { formatDateForDisplay } from '../utils/dateHandling';

const ReservationList = () => {
  const { user } = useAuth();
  const { reservations, cancelReservation } = useReservationStore();

  if (!user) return null;

  const userReservations = Object.entries(reservations)
    .flatMap(([date, dateReservations]) =>
      dateReservations
        .filter(r => r.affiliateId === user.id && r.status === 'active')
        .map(r => ({ ...r, date }))
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (userReservations.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tenés reservas activas
        </h3>
        <p className="text-gray-600">
          Hacé una nueva reserva para disfrutar de la pileta
        </p>
      </div>
    );
  }

  const handleCancelReservation = (id: string) => {
    if (window.confirm('¿Estás seguro que querés cancelar esta reserva?')) {
      cancelReservation(id);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Tus Reservas Activas</h3>
      
      {userReservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center text-gray-900">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              {formatDateForDisplay(reservation.date)}
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              {reservation.companions.length} acompañantes
              {reservation.companions.length > 0 && (
                <span className="text-sm ml-2">
                  ({reservation.companions.map(c => `${c.name} (DNI: ${c.dni})`).join(', ')})
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => handleCancelReservation(reservation.id)}
            className="text-red-600 hover:text-red-700 p-2 transition-colors"
            title="Cancelar reserva"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReservationList;