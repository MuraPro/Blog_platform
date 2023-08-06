import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = sessionStorage.getItem('auth');
  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
