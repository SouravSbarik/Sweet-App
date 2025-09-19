import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const { user, logout } = useAuth();
  return (
    <header className="bg-blue-100 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Brand */}
        <h1 className="text-2xl sm:text-4xl outline-2 rounded-tr-2xl rounded-bl-2xl outline-amber-500 px-4 py-2 font-bold text-amber-500 font-serif">
          Sweetify
        </h1>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-right">
            <span className="text-gray-800 font-medium text-lg">{user.username}</span>
            <span className="text-md bg-pink-100 text-pink-700 font-semibold px-2 py-1 rounded-full ml-2 capitalize">
              {user.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="text-xl cursor-pointer font-medium text-gray-600 hover:text-pink-800 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-gray-800 hover:text-pink-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/5 shadow-md px-4 py-3 space-y-2">
          <div className="flex flex-row justify-center items-center">
            <span className="text-gray-800 font-medium">{user.username}</span>
            <span className="text-xs bg-pink-100 text-pink-700 font-semibold px-2 py-1 rounded-full capitalize mt-1">
              {user.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="w-full text-center text-lg font-medium text-gray-600 hover:text-pink-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};


