import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NetworkSelectorProps {
  currentNetwork: string;
  onChange: (network: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ currentNetwork, onChange }) => {
  const networks = ['testnet', 'mainnet', 'regtest'];

  return (
    <div className="relative inline-block">
      <select
        value={currentNetwork}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {networks.map((network) => (
          <option key={network} value={network}>
            {network}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default NetworkSelector;