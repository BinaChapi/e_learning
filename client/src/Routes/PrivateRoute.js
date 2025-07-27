import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({role }) => {
  const { isAuthenticated, user,loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton screen
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;