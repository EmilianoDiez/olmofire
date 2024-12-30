import React from 'react';
import { Clock, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const PendingApproval: React.FC = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-start space-x-3">
        <Clock className="w-6 h-6 text-yellow-600 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-yellow-900">Aprobación Pendiente</h3>
          <p className="mt-2 text-yellow-700">
            Tu registro está pendiente de aprobación por FADIUNC. Una vez verificado tu estado de afiliado,
            recibirás un correo electrónico con las instrucciones para acceder al sistema de reservas.
          </p>
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-800">
              Si no recibís el correo dentro de las próximas 24 horas, por favor contactá a FADIUNC:
              <br />
              <a 
                href={`mailto:${CONTACT_INFO.EMAIL}`} 
                className="inline-flex items-center text-yellow-800 hover:text-yellow-900 mt-1"
              >
                <Mail className="w-4 h-4 mr-1" />
                {CONTACT_INFO.EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;