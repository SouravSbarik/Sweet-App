import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../common/Spinner';
import { UserIcon, LockIcon } from '../common/Icons';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const { login, register, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = isLogin 
      ? { username, password } 
      : { username, password, role };  // include role for register

    if (isLogin) {
      await login(credentials);
    } else {
      await register(credentials);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        {isLogin ? 'Welcome Back!' : 'Create Account'}
      </h2>
      <p className="text-center text-gray-500 mb-6">
        {isLogin ? 'Sign in to continue' : 'Get started with your free account'}
      </p>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <UserIcon />
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Role selector only for Register */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:bg-pink-300"
        >
          {loading ? <Spinner /> : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-pink-500 hover:text-pink-700 font-semibold cursor-pointer"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};
