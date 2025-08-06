import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../core/Loader'; // Assume you have a Loader component

const MarketTable = ({ onCoinSelect }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 50, page: 1, sparkline: false }
        });
        setCoins(res.data);
      } catch (error) {
        console.error("Error fetching coin data", error);
      }
      setLoading(false);
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);

  if (loading) return <div className="bg-gray-800 p-4 rounded-lg shadow-xl flex justify-center items-center h-96"><Loader /></div>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-white">Market Overview</h2>
      <input
        type="text"
        placeholder="Search for a crypto..."
        className="w-full bg-gray-700 p-3 rounded mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-3">Coin</th>
              <th className="p-3">Price</th>
              <th className="p-3">24h Change</th>
              <th className="p-3 hidden sm:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.slice(0, 20).map(coin => (
              <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors duration-200" onClick={() => onCoinSelect(coin)}>
                <td className="p-3 flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3 rounded-full"/>
                  <div>
                    <span className="font-bold">{coin.name}</span>
                    <span className="text-gray-400 block sm:hidden">{coin.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td className="p-3 font-mono">{formatCurrency(coin.current_price)}</td>
                <td className={`p-3 font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-3 hidden sm:table-cell font-mono">{formatCurrency(coin.market_cap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;