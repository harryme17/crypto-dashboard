import React, { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase';
import { Loader } from '../core/Loader';

const MarketSummary = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const getMarketSummary = httpsCallable(functions, 'getMarketSummary');
        const result = await getMarketSummary();
        setSummary(result.data.summary);
      } catch (error) {
        console.error("Error fetching market summary:", error);
        setSummary("AI summary could not be loaded. Please try again later.");
      }
      setLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg shadow-xl text-white animate-fade-in">
      <h3 className="text-xl font-bold mb-2 flex items-center">
        <span className="mr-2">🧠</span> AI Market Pulse
      </h3>
      {loading ? <div className="h-6"><Loader light={true}/></div> : <p className="font-light">{summary}</p>}
    </div>
  );
};

export default MarketSummary;