import React from 'react';
import { WalletSdk, Utils } from '@bittap/wallet-sdk';
import { Coins, FileText, MessageSquare, Plus } from 'lucide-react';

interface WalletActionsProps {
  isConnected: boolean;
  walletSdk: WalletSdk | null;
  onLog: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

const WalletActions: React.FC<WalletActionsProps> = ({
  isConnected,
  walletSdk,
  onLog,
  setLoading,
}) => {
  const handleGetCurrentAssets = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.getCurrentAssets();
      onLog(`getCurrentAssets successfully: ${JSON.stringify(result)}`);
    } catch (error: any) {
      onLog(`getCurrentAssets failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInvoices = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.getInvoices();
      onLog(`getInvoices successfully: ${JSON.stringify(result)}`);
    } catch (error: any) {
      onLog(`getInvoices failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignMessage = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const msgText = `Hello world\nApp Name: ${document.title}\nLocation: ${location.href}\nNetwork: ${walletSdk.network}\nDate time: ${new Date().toLocaleString()}\nNonce: ${Date.now()}`;
      onLog(`signMessage msgText: ${JSON.stringify(msgText)}`);
      const result = await walletSdk.signMessage(msgText);
      onLog(`signMessage successfully: ${JSON.stringify(result)}`);
    } catch (error: any) {
      onLog(`signMessage failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListenTxId = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      const txid = prompt('txid: ', '863dab73f536578a7cc08aa35d680e553d9aea300e20dadad794aef11b40dae7');
      if (!txid || !Utils.isTxId(txid)) {
        throw new Error('Invalid txid');
      }
      setLoading(true);
      walletSdk.addListenTxId([txid]);
      onLog(`Added txid to listen: ${txid}`);
    } catch (error: any) {
      onLog(`addListenTxId failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const actions = [
    { name: 'Get Assets', icon: <Coins className="w-4 h-4" />, onClick: handleGetCurrentAssets },
    { name: 'Get Invoices', icon: <FileText className="w-4 h-4" />, onClick: handleGetInvoices },
    { name: 'Sign Message', icon: <MessageSquare className="w-4 h-4" />, onClick: handleSignMessage },
    { name: 'Add Listen Txid', icon: <Plus className="w-4 h-4" />, onClick: handleAddListenTxId },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            disabled={!isConnected}
            className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
              isConnected
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletActions;