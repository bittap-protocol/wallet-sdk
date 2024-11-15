// Import the Network module from the current directory's network file
import {
  BitTapError,
  NetworkUnavailableError,
  RejectError,
  SignatureFailedError,
} from './ErrorsAndExcepts';
import { NetworkType, getNetworks } from './network';
// Define an enumeration type named TxsStatus.
/**
 * Enum representing the status of a transaction.
 * @enum {string}
 */
export var TxsStatus;
(function (TxsStatus) {
  // Transaction status is pending.
  TxsStatus['pending'] = 'pending';
  // Transaction status is confirmed.
  TxsStatus['confirmed'] = 'confirmed';
  // Transaction status is failed.
  TxsStatus['failed'] = 'failed';
})(TxsStatus || (TxsStatus = {}));
// Export an enumeration named AssetVersion.
/**
 * Enum representing the version of an asset.
 * @enum {string}
 */
export var AssetVersion;
(function (AssetVersion) {
  AssetVersion[(AssetVersion['ASSET_VERSION_V0'] = 0)] = 'ASSET_VERSION_V0';
  AssetVersion[(AssetVersion['ASSET_VERSION_V1'] = 1)] = 'ASSET_VERSION_V1';
})(AssetVersion || (AssetVersion = {}));
// Export an enumeration named AssetType.
/**
 * Enum representing the type of an asset.
 * @enum {number}
 */
export var AssetType;
(function (AssetType) {
  AssetType[(AssetType['NORMAL'] = 0)] = 'NORMAL';
  AssetType[(AssetType['COLLECTIBLE'] = 1)] = 'COLLECTIBLE';
})(AssetType || (AssetType = {}));
/**
 * Class utility.
 */
export class Utils {
  /**
   * Verify if a string is a valid URL.
   * @param {string} url - The URL to verify.
   * @returns {boolean} - True if the URL is valid, false otherwise.
   */
  static isUrl(url) {
    // return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(url)
    return /^(http|ftp|https):\/\/[\w\-_]+/.test(url);
  }
  /**
   * Verify if a string is a valid asset ID.
   * @param {string} id - The asset ID to verify.
   * @returns {boolean} - True if the asset ID is valid, false otherwise.
   */
  static isAssetId(id) {
    return /^[0-9a-f]{64}$/.test(id);
  }
  /**
   * Verify if a string is a valid Bitcoin address.
   * @param {string} address - The Bitcoin address to verify.
   * @returns {boolean} - True if the Bitcoin address is valid, false otherwise.
   */
  static isValidBitcoinAddress(address) {
    const regex = /^(bc1p|bcrt|tb1q)[a-zA-HJ-NP-Z0-9]{38,40}$/;
    return regex.test(address);
  }
  /**
   * Verify if a string is a valid transaction ID.
   * @param {string} txid - The transaction ID to verify.
   * @returns {boolean} - True if the transaction ID is valid, false otherwise.
   */
  static isTxId(txid) {
    return /^[a-fA-F0-9]{64}$/.test(txid);
  }
}
/**
 * Bittap wallet js SDK.
 * This class provides functionality for interacting with a wallet.
 * @class WalletSdk
 * @constructor
 * @param {ConnectionOptions} _initOpts - The initialization options for the wallet SDK.
 */
export class WalletSdk {
  /**
   * The current work type of the wallet SDK. Defaults to mainnet.
   * @private
   * @property {BTCNetwork} _currentWorkType - The network the wallet is currently operating on.
   */
  _currentWorkType;
  /**
   * @private
   * @property {boolean} _autoConnection - True if auto-connection is enabled, false otherwise.
   */
  _autoConnection;
  /**
   * The current work type name of the wallet SDK. Defaults to mainnet.
   * @private
   * @property {NetworkType} _currentWorkTypeName - The network name the wallet is currently operating on.
   */
  _currentWorkTypeName;
  /**
   * The current account information.
   * @private
   * @property {Account} _currentAccount - The current account details.
   */
  _currentAccount = {
    name: '',
    btcAddress: '',
  };
  /**
   * The onAccountChange handler function.
   * @private
   * @property {Function|null} _onAccountChangeHandler - The handler function for account change events.
   */
  _onAccountChangeHandler = null;
  /**
   * Indicates whether the wallet is connected.
   * @private
   * @property {boolean} _conn - True if connected, false otherwise.
   */
  _conn = false;
  /**
   * The wallet provider.
   */
  _provider;
  /**
   * The onListenTransaction handler function.
   * @private
   * @property {Function|null} _onListenTransactionHandler - The handler function for transaction change events.
   */
  _onListenTransactionHandler = null;
  /**
   * The wallet provider of bittap wallet js bridge.
   */
  _walletProvider;
  constructor(
    _initOpts = { network: NetworkType.mainnet, autoConnection: false },
  ) {
    const opts = Object.assign(
      {
        network: NetworkType.mainnet,
        autoConnection: false,
      },
      _initOpts,
    );
    this._currentWorkTypeName = opts.network;
    this._autoConnection = opts.autoConnection;
    // Set the current work type based on the provided initialization options.
    this._currentWorkType = getNetworks(this._currentWorkTypeName);
    this._conn = false;
  }
  /**
   * Checks if the Bittap Wallet is installed by checking if the 'BittapWalletInjected'
   * property exists on the window object.
   * @returns {boolean} - True if the wallet is installed, false otherwise.
   */
  static installed() {
    return Object.prototype.hasOwnProperty.call(window, 'BittapWalletInjected');
  }
  /**
   * Returns the current state of the wallet.
   * @private
   * @method getCurrentSate
   * @returns {ConnectionResponse} - The current network and account information.
   */
  getCurrentSate() {
    return {
      network: {
        name: this._currentWorkTypeName,
        network: this._currentWorkType,
      },
      account: this._currentAccount,
    };
  }
  /**
   * Checks if the wallet is connected.
   * @private
   * @method checkConnection
   */
  checkConnection() {
    if (!WalletSdk.installed()) {
      throw new BitTapError('BittapWalletInjected not installed');
    }
    if (!this._conn) {
      throw new BitTapError('Bittap Wallet not connected');
    }
  }
  /**
   * Connects to the Bittap wallet SDK.
   * @method connection
   * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
   */
  connection() {
    return new Promise((resolve, reject) => {
      try {
        if (!WalletSdk.installed()) {
          throw new BitTapError('BittapWalletInjected not installed');
        }
        if (this._conn) {
          throw new BitTapError('Bittap wallet is connected.');
        }
        // @ts-ignore
        this._walletProvider = window.BittapWalletInjected;
        this._provider = this._walletProvider.init();
        // console.log('client_id: ', this._provider.client_id);
        this._walletProvider.sendRequestJsBridge({
          type: 'connectionWallet',
          client_id: this._provider.client_id,
          data: {
            network: this._currentWorkTypeName,
            autoConnection: this._autoConnection,
          },
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('connectionWallet');
            }
            const { account, network } = res.data;
            this._currentAccount.btcAddress = account.btcAddress;
            this._currentAccount.name = account.name;
            this._currentWorkTypeName = network;
            // this.switchNetwork(this._currentWorkTypeName);
            this._conn = true;
            resolve(this.getCurrentSate());
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Set the auto-connect attribute.
   * If set to true, the wallet SDK will attempt to automatically connect to the wallet.
   * If set to false, the user will need to manually connect to the wallet.
   * @param {boolean} _autoConnection - The value of the auto-connect attribute to be set.
   */
  setAutoConnection(_autoConnection) {
    this._autoConnection = _autoConnection;
  }
  /**
   * Switches the network of the wallet SDK.
   * @method switchNetwork
   * @param {NetworkType} _network - The new network type to switch to.
   * @param {string} [url] - Optional URL for the new network.
   * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
   */
  switchNetwork(_network, url) {
    return new Promise((resolve, reject) => {
      this.checkConnection();
      // Implementation not provided.
      if (!_network) {
        throw new NetworkUnavailableError('Network not provided');
      }
      if (_network === this._currentWorkTypeName) {
        throw new NetworkUnavailableError('Network not changed');
      }
      this._walletProvider.sendRequestJsBridge({
        type: 'switchNetwork',
        client_id: this._provider.client_id,
        data: {
          network: _network,
          url,
        },
        callback: () => {
          this._currentWorkTypeName = _network;
          this._currentWorkType = getNetworks(this._currentWorkTypeName);
          resolve(this.getCurrentSate());
        },
        reject: res => {
          // If an error occurs, reject the promise with the error
          reject(res.err);
        },
      });
    });
  }
  /**
   * Registers a callback function to be executed when the account changes.
   * @method setOnAccountChangeHandler
   * @param {Function} func - The callback function to be executed.
   *                         Takes an object with network and account information as a parameter.
   */
  setOnAccountChangeHandler(func) {
    this.checkConnection();
    if (typeof func === 'function') {
      this._onAccountChangeHandler = func;
      this._walletProvider.sendRequestJsBridge({
        type: 'onAccountChange',
        client_id: this._provider.client_id,
        data: {},
        callback: res => {
          // console.log('onAccountChange res: ', res.data);
          if (
            Object.prototype.hasOwnProperty.call(res.data, 'network') &&
            Object.prototype.hasOwnProperty.call(res.data.network, 'name') &&
            Object.prototype.hasOwnProperty.call(res.data, 'account') &&
            Object.prototype.hasOwnProperty.call(
              res.data.account,
              'btcAddress',
            ) &&
            Object.prototype.hasOwnProperty.call(res.data.account, 'name')
          ) {
            const { account, network } = res.data;
            this._currentAccount.btcAddress = account.btcAddress;
            this._currentAccount.name = account.name;
            this._currentWorkTypeName = network.name;
            this._currentWorkType = getNetworks(this._currentWorkTypeName);
          }
          if (
            this._onAccountChangeHandler &&
            typeof this._onAccountChangeHandler === 'function'
          ) {
            // @ts-ignore
            this._onAccountChangeHandler(this.getCurrentSate());
          }
        },
      });
    }
  }
  /**
   * Adds a listener for all transactions and calls a callback function when a transaction occurs.
   * @method setOnListenTransactionStatusHandler
   * @param {Function} func - The callback function to be called when a transaction occurs.
   *                         Takes a ResponseTxInfo object as a parameter.
   */
  setOnListenTransactionStatusHandler(func) {
    this.checkConnection();
    if (typeof func === 'function') {
      this._onListenTransactionHandler = func;
      this._walletProvider.sendRequestJsBridge({
        client_id: this._provider.client_id,
        type: 'onListenTransaction',
        data: {},
        callback: res => {
          // console.log('onListenTransaction res: ', res);
          if (
            this._onListenTransactionHandler &&
            typeof this._onListenTransactionHandler === 'function'
          ) {
            this._onListenTransactionHandler(res.data);
          }
        },
      });
    } else {
      throw new BitTapError('func is not a function');
    }
  }
  /**
   * Retrieves the current assets of the wallet.
   * @method getCurrentAssets
   * @returns {Promise<CurrentAccountAssets>} - A promise that resolves to an array of current account assets.
   */
  async getCurrentAssets() {
    return new Promise((resolve, reject) => {
      try {
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'getCurrentAssets',
          data: {},
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('getCurrentAssets');
            }
            // console.log('SDK getCurrentAssets on res: ', res);
            const assets = res.data;
            resolve(assets);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Retrieves the current invoices of the wallet.
   * @method getInvoices
   * @param {RequestPageOptions} _opts - The options for requesting invoices.
   * @returns {Promise<ResponseInvoiceRow[]>} - A promise that resolves to an array of current account invoices.
   */
  async getInvoices(_opts = {}) {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        _opts.page_num = Math.max(Math.floor(_opts.page_num), 1);
        // Ensure page_size is at least 10
        // @ts-ignore
        _opts.page_size = Math.max(Math.floor(_opts.page_size), 10);
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'getInvoices',
          data: { ..._opts },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('getInvoices');
            }
            // console.log('SDK getInvoices on res: ', res);
            const invoices = res.data;
            resolve(invoices);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Creates an invoice of current wallet account.
   * @method createInvoice
   * @param {RequestInvoiceOptions} _opts - The options for creating the invoice.
   * @returns {Promise<ResponseInvoiceRow>} - A promise that resolves to the created invoice details.
   */
  async createInvoice(_opts) {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      try {
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'createInvoice',
          data: { ..._opts },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('createInvoice');
            }
            resolve(res.data);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Searches for assets based on the provided options.
   *
   * @param {RequestAssetOptions} _opts - The options for the asset search.
   * @returns {Promise<ResponseAssetRow>} - A promise that resolves to the search results.
   * @throws {BitTapError} - If neither asset_id nor asset_name is provided.
   */
  async searchAssets(_opts = {}) {
    // Check if the wallet is connected
    this.checkConnection();
    // Return a new Promise that will resolve or reject based on the search result
    return new Promise((resolve, reject) => {
      try {
        // Check if either asset_id or asset_name is provided
        if (!_opts.asset_id && !_opts.asset_name) {
          // If not, throw a BitTapError
          throw new BitTapError('asset_id or asset_name is required');
        }
        // Ensure page_num is at least 1
        // @ts-ignore
        _opts.page_num = Math.max(Math.floor(_opts.page_num), 1);
        // Ensure page_size is at least 10
        // @ts-ignore
        _opts.page_size = Math.max(Math.floor(_opts.page_size), 10);
        // Send a request to the wallet provider to search for assets
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'searchAssets',
          data: { ..._opts },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('searchAssets');
            }
            // If successful, resolve the promise with the search results
            resolve(res.data);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        // If an error occurs, reject the promise with the error
        reject(error);
      }
    });
  }
  /**
   * Adds a listener for a specific transaction ID and calls a callback function when the transaction occurs.
   * @method addListenTxId
   * @param {string[]} txIds - The transaction IDs to listen for.
   */
  addListenTxId(txIds) {
    this.checkConnection();
    if (txIds.length === 0) {
      throw new BitTapError('txIds is required');
    }
    if (
      !this._onListenTransactionHandler ||
      typeof this._onListenTransactionHandler !== 'function'
    ) {
      throw new BitTapError(
        'onListenTransactionHandler is not set a function.',
      );
    }
    if (txIds.some(txId => !Utils.isTxId(txId))) {
      throw new BitTapError('Invalid txid.');
    }
    this._walletProvider.sendRequestJsBridge({
      client_id: this._provider.client_id,
      type: 'addListenTxId',
      data: {
        txIds,
      },
      callback: () => {},
    });
  }
  /**
   * Transfers BTC assets.
   * @method transferBtc
   * @param {TransferOptions} _opts - The transfer options.
   * @throws {BitTapError} - If recv_addr or amount is not provided.
   * @returns {Promise<ResponseTxInfo>} - A promise that resolves to the transfer transaction details.
   */
  async transferBtc(_opts) {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      try {
        if (!_opts.recv_addr && !_opts.amount) {
          throw new BitTapError('recv_addr or amount is required');
        }
        // @ts-ignore
        _opts.amount = Math.floor(_opts.amount);
        // @ts-ignore
        _opts.min_conf = Math.max(Math.floor(_opts.min_conf), 6);
        // @ts-ignore
        _opts.fee_rate = Math.max(Math.floor(_opts.fee_rate), 1);
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'transferBtc',
          data: { ..._opts },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('transferBtc');
            }
            resolve(res.data);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Sends taproot assets.
   * @method sendTaprootAssets
   * @param {SendAssetsOptions} _opts - The send assets options.
   * @throws {BitTapError} - If receive_addr is not provided.
   * @returns {Promise<ResponseTxInfo>} - A promise that resolves to the transfer transaction details.
   */
  async sendTaprootAssets(_opts) {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      try {
        if (!_opts.receive_addr) {
          throw new BitTapError('receive_addr is required');
        }
        // @ts-ignore
        _opts.fee_rate = Math.max(Math.floor(_opts.fee_rate), 1);
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'sendTaprootAssets',
          data: { ..._opts },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new RejectError('sendTaprootAssets');
            }
            resolve(res.data);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Signs a message.
   * @method signMessage
   * @param {string} _msg - The message to sign.
   * @returns {Promise<string>} - A promise that resolves to the signed message.
   */
  async signMessage(_msg) {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      try {
        if (!_msg) {
          throw new BitTapError('_msg is required');
        }
        this._walletProvider.sendRequestJsBridge({
          client_id: this._provider.client_id,
          type: 'signMessage',
          data: {
            msg: _msg,
          },
          // @ts-ignore
          callback: res => {
            if (
              Object.prototype.hasOwnProperty.call(res.data, 'rejectResult') &&
              res.data.rejectResult
            ) {
              throw new SignatureFailedError('signMessage');
            }
            resolve(res.data.resultMessage);
          },
          reject: res => {
            // If an error occurs, reject the promise with the error
            reject(res.err);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Resets internal data.
   * @private
   * @method resetData
   */
  resetData() {
    this._currentAccount = {
      name: '',
      btcAddress: '',
    };
    this._onAccountChangeHandler = null;
    this._onListenTransactionHandler = null;
  }
  /**
   * Disconnects from the wallet.
   * @method DisConnection
   */
  DisConnection() {
    this.checkConnection();
    this._walletProvider.sendRequestJsBridge({
      client_id: this._provider.client_id,
      type: 'DisConnection',
      data: {},
      callback: () => {},
    });
    this.resetData();
    this._conn = false;
  }
}
// Export the NetworkType enum and BTCNetwork type
export { NetworkType, getNetworks } from './network';
// Export the BitTapError class
export {
  BitTapError,
  AssetNotFoundError,
  InvalidBTCAddressError,
  InsufficientAssetsError,
  NetworkUnavailableError,
  SignatureFailedError,
  UnknownError,
  CommunicationError,
} from './ErrorsAndExcepts';
