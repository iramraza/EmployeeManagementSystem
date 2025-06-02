import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const role = localStorage.getItem('role');
  console.log('Dashboard role:', role);

  if (!role) {
    return <div>Please login to access the dashboard.</div>;
  }

  return role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
