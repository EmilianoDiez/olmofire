import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Calendar, QrCode } from 'lucide-react';
import DailyStats from '../components/DailyStats';
import PendingApproval from '../components/PendingApproval';
import PricingDisplay from '../components/pricing/PricingDisplay';
import { usePoolStore } from '../store/usePoolStore';

const Home = () => {
  const { isAffiliatePending } = usePoolStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-750 max-w-2xl mx-auto">
          Para afiliados y afiliadas de <b>FADIUNC</b>
        </p>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          El beneficio es por orden de llegada, con cupo para bonificación al
          100% y al 50%.
        </h2>
      </div>

      <DailyStats />

      {isAffiliatePending && (
        <div className="mb-12">
          <PendingApproval />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <Link
          to="/register"
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <UserPlus className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-semibold text-gray-900">
            Registrarse
          </span>
        </Link>

        <Link
          to="/reservations"
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Calendar className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-semibold text-gray-900">Reservas</span>
        </Link>

        <Link
          to="/scanner"
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <QrCode className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-semibold text-gray-900">
            Escanear para ingresar
          </span>
        </Link>
      </div>

      <div className="mb-16">
        <PricingDisplay />
      </div>
    </div>
  );
};

export default Home;
