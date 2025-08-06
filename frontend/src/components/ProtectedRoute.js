import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.clear();
      return <Navigate to="/login" />;
    }
    return children;
  } catch (e) {
    return <Navigate to="/login" />;
  }
}
