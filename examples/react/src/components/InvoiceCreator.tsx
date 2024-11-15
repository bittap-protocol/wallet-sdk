import React, { useState } from 'react';
import { Bitcoin, Search } from 'lucide-react';

interface InvoiceCreatorProps {
  connected: boolean;
  onCreateInvoice: (data: { assetId: string; amount: string }) => void;
}

const InvoiceCreator: React.FC<InvoiceCreatorProps> = ({ connected, onCreateInvoice }) => {
  const [activeTab, setActiveTab] = useState('invoice');
  
  // BTC Tab State
  const [btcAddress, setBtcAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  
  // Taproot Tab State
  const [taprootAddress, setTaprootAddress] = useState('');
  
  // Invoice Tab State
  const [assetId, setAssetId] = useState('');
  const [amount, setAmount] = useState('');
  
  // Search Tab State
  const [searchAssetId, setSearchAssetId] = useState('');
  const [searchAssetName, setSearchAssetName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (activeTab) {
      case 'btc':
        onCreateInvoice({ assetId: btcAddress, amount: btcAmount });
        break;
      case 'taproot':
        onCreateInvoice({ assetId: taprootAddress, amount: '0' });
        break;
      case 'invoice':
        onCreateInvoice({ assetId, amount });
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'btc', label: 'BTC' },
    { id: 'taproot', label: 'Taproot' },
    { id: 'invoice', label: 'Invoice' },
    { id: 'search', label: 'Search' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'btc':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Send BTC</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receive address:
              </label>
              <input
                type="text"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                disabled={!connected}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter BTC address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BTC amount:
              </label>
              <input
                type="text"
                value={btcAmount}
                onChange={(e) => setBtcAmount(e.target.value)}
                disabled={!connected}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter amount"
              />
            </div>
            <button
              onClick={() => onCreateInvoice({ assetId: btcAddress, amount: btcAmount })}
              disabled={!connected}
              className={`w-full py-2 rounded-lg font-medium ${
                connected
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Transfer BTC
            </button>
          </div>
        );

      case 'taproot':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Send Taproot Asset</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice address:
              </label>
              <input
                type="text"
                value={taprootAddress}
                onChange={(e) => setTaprootAddress(e.target.value)}
                disabled={!connected}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter Taproot address"
              />
            </div>
            <button
              onClick={() => onCreateInvoice({ assetId: taprootAddress, amount: '0' })}
              disabled={!connected}
              className={`w-full py-2 rounded-lg font-medium ${
                connected
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Transfer Taproot Asset
            </button>
          </div>
        );

      case 'invoice':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asset ID:
              </label>
              <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                disabled={!connected}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter asset ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asset Amount:
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!connected}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter amount"
              />
            </div>
            <button
              onClick={() => onCreateInvoice({ assetId, amount })}
              disabled={!connected}
              className={`w-full py-2 rounded-lg font-medium ${
                connected
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create Invoice
            </button>
          </div>
        );

      case 'search':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Search Assets</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asset ID:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchAssetId}
                  onChange={(e) => setSearchAssetId(e.target.value)}
                  disabled={!connected}
                  className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter asset ID to search..."
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                Asset Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchAssetName}
                  onChange={(e) => setSearchAssetName(e.target.value)}
                  disabled={!connected}
                  className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter asset Name to search..."
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <button
              onClick={() => onCreateInvoice({ assetId: searchAssetId, amount: '0' })}
              disabled={!connected || !searchAssetId}
              className={`w-full py-2 rounded-lg font-medium ${
                connected && searchAssetId
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Search
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderTabContent()}
      </form>
    </div>
  );
};

export default InvoiceCreator;