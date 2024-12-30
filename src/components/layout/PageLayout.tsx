import React from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import AppRoutes from '../../routes';

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="content-wrapper">
        <Header />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};