import React from 'react';
import { NetworkType } from '@bittap/wallet-sdk';
import { Network, Wallet } from 'lucide-react';
import NetworkSelector from './NetworkSelector';

interface WalletControlsProps {
  isConnected: boolean;
  networkType: NetworkType;
  autoConnection: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onNetworkChange: (network: NetworkType) => void;
  onAutoConnectionChange: (value: boolean) => void;
  onNetworkSwitch: (network: NetworkType) => void;
}

const WalletControls: React.FC<WalletControlsProps> = ({
  isConnected,
  networkType,
  autoConnection,
  onConnect,
  onDisconnect,
  onNetworkChange,
  onAutoConnectionChange,
  onNetworkSwitch,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <NetworkSelector
            currentNetwork={networkType}
            onChange={onNetworkChange}
            disabled={isConnected}
          />
          
          <button
            onClick={isConnected ? onDisconnect : onConnect}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              isConnected
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isConnected ? (
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
              checked={autoConnection}
              onChange={(e) => onAutoConnectionChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Auto Connection</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {[NetworkType.mainnet, NetworkType.testnet, NetworkType.regtest].map((network) => (
            <button
              key={network}
              onClick={() => onNetworkSwitch(network)}
              disabled={!isConnected}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isConnected
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Switch Network('{network}')
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletControls;