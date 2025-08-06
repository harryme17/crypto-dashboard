// src/components/core/Loader.js
import React from 'react';

export const Loader = ({ fullScreen = false, className = '' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 ${className}`}></div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
    </div>
  );
};