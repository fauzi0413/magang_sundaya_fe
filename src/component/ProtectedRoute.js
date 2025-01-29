import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (!auth) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    if (requiredRole && auth.role !== requiredRole) {
        // If the role doesn't match, redirect to a "Not Authorized" page or home
        return <Navigate to="/" />;
    }

    // If authenticated and role matches, render the child components
    return children;
};

export default ProtectedRoute;