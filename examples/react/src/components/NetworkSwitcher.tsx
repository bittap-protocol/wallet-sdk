import React from 'react';

interface NetworkSwitcherProps {
  onSwitch: (network: string) => void;
  disabled: boolean;
}

const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ onSwitch, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSwitch('mainnet')}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Switch Network('mainnet')
      </button>
      <button
        onClick={() => onSwitch('testnet')}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Switch Network('testnet')
      </button>
      <button
        onClick={() => onSwitch('regtest')}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Switch Network('regtest')
      </button>
    </div>
  );
};

export default NetworkSwitcher;