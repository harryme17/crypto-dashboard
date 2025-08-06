import React, { useState } from 'react';
import Header from '../components/core/Header';
import MarketTable from '../components/dashboard/MarketTable';
import Portfolio from '../components/dashboard/Portfolio';
import MarketSummary from '../components/ai/MarketSummary';
import NewsSummary from '../components/ai/NewsSummary';
import CryptoChart from '../components/dashboard/CryptoChart';

const DashboardPage = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <MarketSummary />
            <MarketTable onCoinSelect={setSelectedCoin} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Portfolio />
            <NewsSummary />
          </div>
        </div>
      </main>

      {/* Chart Modal */}
      {selectedCoin && <CryptoChart coin={selectedCoin} onClose={() => setSelectedCoin(null)} />}
    </div>
  );
};

export default DashboardPage;