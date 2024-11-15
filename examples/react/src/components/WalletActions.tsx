import React from 'react';
import { Coins, FileText, MessageSquare, Plus } from 'lucide-react';

interface WalletActionsProps {
  connected: boolean;
  onAction: (action: string) => void;
}

const WalletActions: React.FC<WalletActionsProps> = ({ connected, onAction }) => {
  const actions = [
    { name: 'getCurrentAssets', icon: <Coins className="w-4 h-4" />, label: 'Get Assets' },
    { name: 'getInvoices', icon: <FileText className="w-4 h-4" />, label: 'Get Invoices' },
    { name: 'signMessage', icon: <MessageSquare className="w-4 h-4" />, label: 'Sign Message' },
    { name: 'addListenTxid', icon: <Plus className="w-4 h-4" />, label: 'Add Listen Txid' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {actions.map((action) => (
        <button
          key={action.name}
          onClick={() => onAction(action.name)}
          disabled={!connected}
          className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
            connected
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {action.icon}
          <span className="text-sm font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default WalletActions;