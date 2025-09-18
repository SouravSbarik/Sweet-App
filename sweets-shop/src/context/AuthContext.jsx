import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/sweetApi.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuthResponse = (data) => {
        const userData = { username: data.username, role: data.role };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', data.token);
        setUser(userData);
        setToken(data.token);
        setError(null);
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogin(credentials);
            handleAuthResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiRegister(credentials);
            handleAuthResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

