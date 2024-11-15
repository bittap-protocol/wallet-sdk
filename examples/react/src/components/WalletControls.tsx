import React from 'react';
import { Network, Wallet } from 'lucide-react';
import NetworkSelector from './NetworkSelector';
import NetworkSwitcher from './NetworkSwitcher';

interface WalletControlsProps {
  network: string;
  connected: boolean;
  autoConnect: boolean;
  onNetworkChange: (network: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onAutoConnectChange: (value: boolean) => void;
}

const WalletControls: React.FC<WalletControlsProps> = ({
  network,
  connected,
  autoConnect,
  onNetworkChange,
  onConnect,
  onDisconnect,
  onAutoConnectChange,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-4">
        <NetworkSelector 
          currentNetwork={network}
          onChange={onNetworkChange}
        />
        <button
          onClick={connected ? onDisconnect : onConnect}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            connected 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {connected ? (
            <>
              <Network className="w-4 h-4" />
              Disconnect Wallet
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </>
          )}
        </button>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoConnect}
            onChange={(e) => onAutoConnectChange(e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Auto Connection</span>
        </label>
      </div>
      
      {/* Network Switching Buttons */}
      <NetworkSwitcher 
        onSwitch={onNetworkChange}
        disabled={!connected}
      />
    </div>
  );
};

export default WalletControls;