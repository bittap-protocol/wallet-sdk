import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import NetworkSelector from './components/NetworkSelector';
import WalletControls from './components/WalletControls';
import WalletActions from './components/WalletActions';
import InvoiceCreator from './components/InvoiceCreator';
import LogOutput from './components/LogOutput';

function App() {
  const [network, setNetwork] = useState('testnet');
  const [connected, setConnected] = useState(false);
  const [autoConnect, setAutoConnect] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const handleConnect = () => {
    setConnected(true);
    addLog('Wallet connected successfully');
  };

  const handleDisconnect = () => {
    setConnected(false);
    addLog('Wallet disconnected');
  };

  const handleNetworkSwitch = (newNetwork: string) => {
    if (newNetwork === network) {
      addLog(`Already on ${newNetwork} network`);
      return;
    }
    setNetwork(newNetwork);
    addLog(`Switched to ${newNetwork} network`);
    // Disconnect wallet when switching networks
    if (connected) {
      handleDisconnect();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Wallet className="w-8 h-8 text-white mr-2" />
          <h1 className="text-3xl font-bold text-white">Wallet SDK Demo</h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Controls and Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="space-y-6">
                {/* Network Selection & Connection */}
                <WalletControls 
                  network={network}
                  connected={connected}
                  autoConnect={autoConnect}
                  onNetworkChange={handleNetworkSwitch}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  onAutoConnectChange={setAutoConnect}
                />
                
                {/* Wallet Actions */}
                <WalletActions 
                  connected={connected}
                  onAction={(action) => addLog(`Executed action: ${action}`)}
                />
              </div>
            </div>

            {/* Invoice Creation */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <InvoiceCreator 
                connected={connected}
                onCreateInvoice={(data) => addLog(`Created invoice: ${JSON.stringify(data)}`)}
              />
            </div>
          </div>

          {/* Right Column - Log Output */}
          <div className="h-full">
            <LogOutput 
              logs={logs} 
              onClear={clearLogs} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;