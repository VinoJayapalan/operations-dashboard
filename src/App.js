import React from 'react';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import './styles/global.css';

export default function App() {
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
}
