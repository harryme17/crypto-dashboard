// src/components/ai/MarketSummary.js
import React, { useState, useEffect } from 'react';
import { Loader } from '../core/Loader';

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l1.293-1.293a1 1 0 011.414 0l.586.586a1 1 0 001.414 0l.586-.586a1 1 0 011.414 0L17 6v13m-8-3h6m-6 3h6m-6-3a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1v-2a1 1 0 00-1-1m-6-6h6" />
    </svg>
);


const MarketSummary = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We will make this function call our backend later.
    // For now, we simulate a delay and show placeholder text.
    const fetchSummary = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        setSummary("Bitcoin rose by 2%, while Ethereum remains stable. The overall market trend appears to be bullish based on recent trading volumes.");
        setLoading(false);
      }, 1500); // Simulate network delay
    };
    fetchSummary();
  }, []);

  const renderContent = () => {
    if (loading) return <div className="h-10 flex items-center"><Loader /></div>;
    if (error) return <p className="text-red-400">{error}</p>;
    return <p className="text-gray-300 font-light">{summary}</p>;
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 sm:p-6 rounded-xl shadow-2xl text-white">
      <div className="flex items-center mb-2">
        <BrainIcon />
        <h3 className="text-xl font-bold">AI Market Pulse</h3>
      </div>
      {renderContent()}
    </div>
  );
};

export default MarketSummary;