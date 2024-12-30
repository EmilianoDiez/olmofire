import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../../constants/contact';

interface ContactInfoProps {
  showEmail?: boolean;
  showPhone?: boolean;
  showAddress?: boolean;
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  showEmail = true,
  showPhone = false,
  showAddress = false,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {showEmail && CONTACT_INFO.EMAIL && (
        <a
          href={`mailto:${CONTACT_INFO.EMAIL}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <Mail className="w-4 h-4 mr-2" />
          {CONTACT_INFO.EMAIL}
        </a>
      )}
      
      {showPhone && CONTACT_INFO.PHONE && (
        <a
          href={`tel:${CONTACT_INFO.PHONE}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <Phone className="w-4 h-4 mr-2" />
          {CONTACT_INFO.PHONE}
        </a>
      )}
      
      {showAddress && CONTACT_INFO.ADDRESS && (
        <div className="inline-flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {CONTACT_INFO.ADDRESS}
        </div>
      )}
    </div>
  );
};