// src/components/dashboard/CryptoChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader } from '../core/Loader';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 rounded border border-gray-600">
        <p className="text-white">{`${label}`}</p>
        <p className="text-cyan-400">{`Price: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const CryptoChart = ({ coin, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7); // Default to 7 days
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coin) return;
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`, {
          params: { vs_currency: 'usd', days: days }
        });
        
        const formattedData = data.prices.map(price => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        }));
        setChartData(formattedData);
      } catch (err) {
        setError("Could not load chart data.");
        console.error("Chart data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [coin, days]);

  if (!coin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-4xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3 rounded-full"/>
            <h3 className="text-2xl font-bold text-white">{coin.name} Chart</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        </div>
        
        <div className="flex justify-center gap-2 mb-4">
          {[1, 7, 30, 90, 365].map(d => (
            <button key={d} onClick={() => setDays(d)} className={`px-3 py-1 text-sm rounded-md ${days === d ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-cyan-600`}>
              {d === 1 ? '1D' : d === 365 ? '1Y' : `${d}D`}
            </button>
          ))}
        </div>

        <div className="h-96">
          {loading && <Loader />}
          {error && <p className="text-red-400 text-center pt-16">{error}</p>}
          {!loading && !error && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="date" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#A0AEC0" tickFormatter={(value) => `$${value.toLocaleString()}`} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="#2DD4BF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;