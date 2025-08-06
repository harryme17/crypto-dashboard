// src/components/dashboard/Portfolio.js

import React, { useState } from 'react'; // Add useState
import { useForm } from '@formspree/react'; // <-- Correct import name is 'useForm'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import AddCoinModal from './AddCoinModal'; // Import the new modal

const Portfolio = () => {
  // IMPORTANT: Replace with your actual Formspree Form ID
  // The hook is called 'useForm', not 'useFormspree'
  const [state, handleSubmit] = useForm("process.env.REACT_APP_FORMSPREE_ID"); 
  
  const { currentUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibili
  
  // --- Placeholder Data ---
  const portfolioValue = 12345.67;
  const marketSummary = "Bitcoin holds steady above $70k, while Ethereum sees a slight dip. Sentiment is cautiously bullish.";
  const newsSummary = "Regulatory discussions in the US are the main focus, potentially impacting stablecoins.";

  const handleEmailReport = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault(); 
    
    toast.loading('Sending report...');

    // handleSubmit expects the form data as an object
    handleSubmit({
      email: currentUser.gmail,
      portfolio_value: portfolioValue.toFixed(2),
      market_summary: marketSummary,
      news_summary: newsSummary,
      subject: `Your Crypto Dashboard Report for ${new Date().toLocaleDateString()}`
    });
  };

  // After submission, Formspree's state.succeeded will become true
  if (state.succeeded) {
      toast.dismiss(); // Dismiss the 'loading' toast
      toast.success("Report sent to your email!");
      // We could also reset the form state here if needed
  }

  if (state.errors) {
      toast.dismiss();
      toast.error("Could not send the report. Please try again.");
  }

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">My Portfolio</h2>
        {/* This button now opens the modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-cyan-300 transition-colors"
        >
          Add Coin
        </button>
      </div>

      <div className="text-4xl font-bold mb-2">${portfolioValue.toLocaleString()}</div>
      <p className="text-green-400 font-semibold">+ $250.30 (2.07%) Today</p>

      <div className="mt-6 space-y-3">
        <p className="text-gray-400">Your assets will be displayed here.</p>
      </div>
      
      {/* The button should be inside a <form> element for Formspree to work correctly */}
      <form onSubmit={handleEmailReport}>
        <button 
          type="submit"
          disabled={state.submitting}
          className="w-full mt-6 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-500"
        >
          {state.submitting ? 'Sending...' : "Email Today's Report"}
        </button>
      </form>
      {isModalOpen && <AddCoinModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Portfolio;