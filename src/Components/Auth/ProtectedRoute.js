// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default ProtectedRoute