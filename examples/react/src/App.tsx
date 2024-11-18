import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { WalletSdk, NetworkType } from '@bittap/wallet-sdk';
import NetworkSelector from './components/NetworkSelector';
import WalletControls from './components/WalletControls';
import WalletActions from './components/WalletActions';
import TabPanel from './components/TabPanel';
import LogOutput from './components/LogOutput';

function App() {
  const [logs, setLogs] = useState<string[]>(['Log output will appear here...']);
  const [isConn, setIsConn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoConnection, setAutoConnection] = useState(false);
  const [networkType, setNetworkType] = useState<NetworkType>(NetworkType.testnet);
  const [installed, setInstalled] = useState(false);
  const [walletSdk, setWalletSdk] = useState<WalletSdk | null>(null);

  useEffect(() => {
    const checkInstalled = () => {
      const isInstalled = WalletSdk.installed();
      setInstalled(isInstalled);
      if (!isInstalled) {
        setTimeout(checkInstalled, 1000);
      }
    };
    
    setTimeout(checkInstalled, 500);
  }, []);

  useEffect(() => {
    if (!isConn) {
      const sdk = new WalletSdk({ network: networkType, autoConnection });
      setWalletSdk(sdk);
    }
  }, [networkType, autoConnection, isConn]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `<span class="text-red-500">${new Date().toLocaleString()}</span> ${message}`]);
  };

  const clearLogs = () => setLogs([]);

  const handleConnect = async () => {
    if (!walletSdk) return;
    try {
      setLoading(true);
      const res = await walletSdk.connection();
      setIsConn(true);
      addLog(`Connected successfully.\nAccount: ${res.account.name}\nAddress: ${res.account.btcAddress}\nNetwork: ${res.network.name}`);
      
      walletSdk.setOnAccountChangeHandler(({account, network}) => {
        addLog(`Account change: ${JSON.stringify(account)} network: ${JSON.stringify(network)}`);
      });
      
      walletSdk.setOnListenTransactionStatusHandler((txInfo) => {
        addLog(`tx status change: ${JSON.stringify(txInfo)}`);
      });
    } catch (error: any) {
      addLog(`Connection failed: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!walletSdk) return;
    try {
      setLoading(true);
      walletSdk.DisConnection();
      addLog('Disconnected successfully');
      setIsConn(false);
    } catch (error: any) {
      addLog(`Disconnection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkSwitch = async (newNetwork: NetworkType) => {
    if (!walletSdk || !isConn) return;
    try {
      setLoading(true);
      const res = await walletSdk.switchNetwork(newNetwork);
      addLog(`Switch network successfully. Network: ${newNetwork}`);
      addLog(`Connected Info.\nAccount: ${res.account.name}\nAddress: ${res.account.btcAddress}\nNetwork: ${res.network.name}`);
      setNetworkType(newNetwork);
    } catch (error: any) {
      addLog(`Switch network failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!installed) {
    return (
      <div className="not-install w-full p-4 min-h-screen text-pink-500 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-4">BitTap Wallet SDK Demo</h3>
        <p className="text-lg">Please install the wallet extension first</p>
        <p className="py-10">
          <a 
            href="https://www.bittap.org/#wallet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-pink-600 text-3xl underline"
          >
            Install bittap wallet
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="fixed z-10 top-5 left-5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        <div className="flex items-center justify-center mb-8">
          <Wallet className="w-8 h-8 text-white mr-2" />
          <h1 className="text-3xl font-bold text-white">
            BitTap Wallet SDK Demo {isConn && <span className="text-blue-200">(connected)</span>}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <WalletControls
              isConnected={isConn}
              networkType={networkType}
              autoConnection={autoConnection}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              onNetworkChange={setNetworkType}
              onAutoConnectionChange={setAutoConnection}
              onNetworkSwitch={handleNetworkSwitch}
            />

            <WalletActions
              isConnected={isConn}
              walletSdk={walletSdk}
              onLog={addLog}
              setLoading={setLoading}
            />

            <TabPanel
              isConnected={isConn}
              walletSdk={walletSdk}
              onLog={addLog}
              setLoading={setLoading}
            />
          </div>

          <LogOutput logs={logs} onClear={clearLogs} />
        </div>
      </div>
    </div>
  );
}

export default App;