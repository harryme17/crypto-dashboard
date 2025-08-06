// src/components/core/Header.js
import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      // The PrivateRoute will automatically redirect to the login page
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center shadow-lg border-b border-gray-700 sticky top-0 z-40">
      <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">Crypto AI Dashboard</h1>
      {currentUser && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;