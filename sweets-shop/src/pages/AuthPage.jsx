import React from 'react';
import { AuthForm } from '../components/auth/AuthForm';

export const AuthPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
            <AuthForm />
        </div>
    );
};
