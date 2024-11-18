import React from 'react';
import { Trash2 } from 'lucide-react';

interface LogOutputProps {
  logs: string[];
  onClear: () => void;
}

const LogOutput: React.FC<LogOutputProps> = ({ logs, onClear }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Log Output</h2>
        <button
          onClick={onClear}
          className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          aria-label="Clear logs"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 h-[calc(100%-4rem)] overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">Log output will appear here...</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="text-gray-700 border-b border-gray-100 py-1 last:border-0"
              dangerouslySetInnerHTML={{ __html: log }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LogOutput;