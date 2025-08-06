// src/components/dashboard/AddCoinModal.js
import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddCoinModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to search for coins via CoinGecko API
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value}`);
      setSearchResults(response.data.coins.slice(0, 5)); // Show top 5 results
    } catch (error) {
      console.error("Coin search failed:", error);
    }
  };

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setSearchTerm(coin.name);
    setSearchResults([]);
  };

  const handleAddCoin = async (e) => {
    e.preventDefault();
    if (!selectedCoin || !quantity || parseFloat(quantity) <= 0) {
      toast.error("Please select a coin and enter a valid quantity.");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not found");

      // Create a reference to the user's portfolio document for this coin
      const portfolioDocRef = doc(db, 'users', user.uid, 'portfolio', selectedCoin.id);
      
      // Add the coin data to Firestore
      await setDoc(portfolioDocRef, {
        id: selectedCoin.id,
        name: selectedCoin.name,
        symbol: selectedCoin.symbol,
        image: selectedCoin.large, // Use large image from search result
        quantity: parseFloat(quantity),
      });

      toast.success(`${selectedCoin.name} added to your portfolio!`);
      onClose(); // Close the modal on success
    } catch (error) {
      toast.error("Failed to add coin. Please try again.");
      console.error("Error adding to Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Add a New Coin</h2>
        <form onSubmit={handleAddCoin}>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for a coin (e.g., Bitcoin)"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {searchResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-gray-600 border border-gray-500 rounded-md mt-1">
                {searchResults.map(coin => (
                  <li
                    key={coin.id}
                    onClick={() => handleSelectCoin(coin)}
                    className="p-2 hover:bg-cyan-500 cursor-pointer flex items-center"
                  >
                    <img src={coin.thumb} alt={coin.name} className="w-6 h-6 mr-2 rounded-full" />
                    {coin.name} ({coin.symbol})
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6"
            min="0"
            step="any"
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 font-bold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 disabled:bg-gray-500">
              {loading ? 'Adding...' : 'Add Coin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoinModal;