import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Monitor, Users, Calendar, ScanLine } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  requiresAdmin?: boolean;
  requiresMonitor?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { 
    id: 'home',
    label: 'Inicio', 
    path: '/',
    icon: Users,
    className: 'font-bold',
    isPrimary: true
  },
  { 
    id: 'register',
    label: 'Resgistrase', 
    path: '/register',
    icon: Users,
    isPrimary: true,
    hideWhenAuth: true    
  },
  { 
    id: 'reservations',
    label: 'Reserva', 
    path: '/reservations',
    icon: Calendar,
    isPrimary: true,
    requiresAuth: true    
  },
  {
    id: 'scanner',
    label: 'Escanear',
    path: '/scanner',
    icon: ScanLine,
    isPrimary: true    
  },
  { 
    id: 'monitor',
    label: 'Monitor Olmo', 
    path: '/monitor',
    isPrimary: false
  }
];

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const filteredItems = NAV_ITEMS.filter(item => {
    if (isAuthenticated && item.hideWhenAuth) return false;
    if (!isAuthenticated && item.requiresAuth) return false;
    return true;
  });

  const getNavItemStyle = (item: typeof NAV_ITEMS[0], isActive: boolean) => {
    const baseClass = "flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors";
    const activeClass = isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-600";
    const textStyle = item.isPrimary ? "font-bold" : "text-gray-500";
    return `${baseClass} ${activeClass} ${textStyle}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex items-center space-x-4">
              {filteredItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={getNavItemStyle(item, isActive)}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hola, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={getNavItemStyle(item, isActive)}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <>
                <div className="px-4 py-3 text-gray-700 border-t">
                  Hola, {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;