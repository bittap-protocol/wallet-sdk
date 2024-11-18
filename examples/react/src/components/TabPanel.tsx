import React, { useState } from 'react';
import { WalletSdk } from '@bittap/wallet-sdk';
import clsx from 'clsx';

interface TabPanelProps {
  isConnected: boolean;
  walletSdk: WalletSdk | null;
  onLog: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ isConnected, walletSdk, onLog, setLoading }) => {
  const [activeTab, setActiveTab] = useState('BTC');
  const [btcForm, setBtcForm] = useState({
    recv_addr: 'bcrt1q4q2xuwa4t94n3hf2a7eyzl4wr3tnxs3qdsyx4q',
    amount: Math.floor(0.00001 * 10**8),
  });
  const [taprootForm, setTaprootForm] = useState({
    receive_addr: '',
  });
  const [invoiceForm, setInvoiceForm] = useState({
    asset_id: '',
    amount: '',
  });
  const [searchForm, setSearchForm] = useState({
    asset_id: '',
    asset_name: '',
    page_num: 1,
    page_size: 10,
  });

  const handleTransferBtc = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.transferBtc({
        recv_addr: btcForm.recv_addr,
        amount: btcForm.amount,
      });
      onLog(`transferBtc successfully: ${JSON.stringify(result)}`);
      const { txid } = result;
      walletSdk.addListenTxId([txid]);
    } catch (error: any) {
      onLog(`transferBtc failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferTaproot = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.sendTaprootAssets({
        receive_addr: taprootForm.receive_addr,
      });
      onLog(`transferTaprootAsset successfully: ${JSON.stringify(result)}`);
      const { txid } = result;
      walletSdk.addListenTxId([txid]);
    } catch (error: any) {
      onLog(`transferTaprootAsset failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.createInvoice({
        asset_id: invoiceForm.asset_id,
        amount: Math.floor(Number(invoiceForm.amount)),
      });
      onLog(`createInvoice successfully: ${JSON.stringify(result)}`);
    } catch (error: any) {
      onLog(`createInvoice failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAssets = async () => {
    if (!walletSdk || !isConnected) return;
    try {
      setLoading(true);
      const result = await walletSdk.searchAssets({
        asset_id: searchForm.asset_id,
        asset_name: searchForm.asset_name,
        page_num: Math.max(Math.floor(searchForm.page_num), 1),
        page_size: Math.max(Math.floor(searchForm.page_size), 10),
      });
      onLog(`searchAssets successfully: ${JSON.stringify(result)}`);
    } catch (error: any) {
      onLog(`searchAssets failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['BTC', 'Taproot', 'Invoice', 'Search'];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'BTC' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Send BTC</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receive address:
                </label>
                <input
                  type="text"
                  value={btcForm.recv_addr}
                  onChange={(e) => setBtcForm({ ...btcForm, recv_addr: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BTC amount:
                </label>
                <input
                  type="number"
                  value={btcForm.amount}
                  onChange={(e) => setBtcForm({ ...btcForm, amount: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <button
                onClick={handleTransferBtc}
                disabled={!isConnected}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Transfer BTC
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Taproot' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Send Taproot Asset</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice address:
                </label>
                <input
                  type="text"
                  value={taprootForm.receive_addr}
                  onChange={(e) => setTaprootForm({ ...taprootForm, receive_addr: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <button
                onClick={handleTransferTaproot}
                disabled={!isConnected}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Transfer Taproot Asset
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Invoice' && (
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset ID:
                </label>
                <input
                  type="text"
                  value={invoiceForm.asset_id}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, asset_id: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset amount:
                </label>
                <input
                  type="number"
                  value={invoiceForm.amount}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <button
                onClick={handleCreateInvoice}
                disabled={!isConnected}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Create Invoice
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Search' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Search Assets</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset ID:
                </label>
                <input
                  type="text"
                  value={searchForm.asset_id}
                  onChange={(e) => setSearchForm({ ...searchForm, asset_id: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Name:
                </label>
                <input
                  type="text"
                  value={searchForm.asset_name}
                  onChange={(e) => setSearchForm({ ...searchForm, asset_name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Number:
                </label>
                <input
                  type="number"
                  value={searchForm.page_num}
                  onChange={(e) => setSearchForm({ ...searchForm, page_num: Number(e.target.value) })}
                  min="1"
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Size:
                </label>
                <input
                  type="number"
                  value={searchForm.page_size}
                  onChange={(e) => setSearchForm({ ...searchForm, page_size: Number(e.target.value) })}
                  min="10"
                  className="w-full p-2 border rounded-lg"
                  disabled={!isConnected}
                />
              </div>
              <button
                onClick={handleSearchAssets}
                disabled={!isConnected}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Search Assets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPanel;