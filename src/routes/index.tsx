import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Admin from '../pages/Admin';
import Monitor from '../pages/Monitor';
import Scanner from '../pages/Scanner';
import Reservations from '../pages/Reservations';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminProtectedRoute from '../components/auth/AdminProtectedRoute';
import MonitorProtectedRoute from '../components/auth/MonitorProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/scanner" element={<Scanner />} />
      
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        }
      />
      
      <Route
        path="/monitor"
        element={
          <MonitorProtectedRoute>
            <Monitor />
          </MonitorProtectedRoute>
        }
      />
    </Routes>
  );
}