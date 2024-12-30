import React from 'react';
import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Reservas</h1>
              <p className="text-sm">FADIUNC y El Olmo</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;