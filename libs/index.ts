// Import the Network module from the current directory's network file
import { BitTapError, NetworkUnavailableError, RejectError, SignatureFailedError } from "./ErrorsAndExcepts";
import { NetworkType, getNetworks, BTCNetwork } from "./network";

/**
 * Interface for connection options.
 * @interface ConnectionOptions
 * @property {string} network - The network identifier.
 */
export interface ConnectionOptions{
    // The network identifier
    network: NetworkType|string;
    autoConnection?: boolean
}

/**
 * Interface for an account.
 * @interface Account
 * @property {string} name - The name of the account.
 * @property {string} btcAddress - The Bitcoin address of the account.
 */
export interface Account {
    /**
     * The name of the account
     */
    name: string;
    /**
     * The Bitcoin address of the account
     */ 
    btcAddress: string;
}

/**
 * Interface for the response of a connection operation.
 * @interface ConnectionResponse
 * @property {ConnectionOptions} - The connection options.
 * @property {Account} account - The account information.
 */
export interface ConnectionResponse {
    /**
     * network information.
     */
    network: {
        name: NetworkType,
        network: BTCNetwork
    }
    /**
     * The account information
     * @property {Account} account - The account information.
     */
    account: Account;
}

// Define an enumeration type named TxsStatus.
/**
 * Enum representing the status of a transaction.
 * @enum {string}
 */
export enum TxsStatus {
    // Transaction status is pending.
    pending = "pending",
    // Transaction status is confirmed.
    confirmed = "confirmed",
    // Transaction status is failed.
    failed = "failed",
}

// Export an interface named ResponseTxInfo.
/**
 * Interface representing the response of a transaction information request.
 * @interface ResponseTxInfo
 */
export interface ResponseTxInfo {
    // Represents the status of a transaction.
    status: TxsStatus;
    // Transaction ID.
    txid: string;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
}

// Export an interface named CurrentAccountAssetsRow.
/**
 * Interface representing a row in the current account assets list.
 * @interface CurrentAccountAssetsRow
 */
export interface CurrentAccountAssetsRow {
    // Name of the asset.
    asset_name: string;
    // Amount of the asset.
    amount: number;
    // Decimal places of the asset.
    decimal: 8|0;
    // Type of the asset.
    type: 0|1;
    // Asset ID.
    asset_id: string;
}

// Export an interface named RequestPageOptions.
/**
 * Interface representing options for requesting a page.
 * @interface RequestPageOptions
 */
export interface RequestPageOptions {
    page_num?: number;
    page_size?: number;
}

// Export an interface named RequestAssetOptions which extends RequestPageOptions.
/**
 * Interface representing options for requesting asset information.
 * @interface RequestAssetOptions
 * @extends {RequestPageOptions}
 */
export interface RequestAssetOptions extends RequestPageOptions{
    // Asset ID.
    asset_id?: string;
    asset_name?: string;
}

// Export an interface named ResponseAssetRow.
/**
 * Interface representing a row in the response of an asset request.
 * @interface ResponseAssetRow
 */
export interface ResponseAssetRow {
    asset_name: string;
    asset_id: string;
    total_supply: number;
    asset_type: number;
}

// Export a type alias named CurrentAccountAssets which is an array of CurrentAccountAssetsRow.
/**
 * Type representing the current account assets as an array of rows.
 * @typedef {CurrentAccountAssetsRow[]} CurrentAccountAssets
 */
export type CurrentAccountAssets = CurrentAccountAssetsRow[];

// Export an interface named RequestInvoiceOptions.
/**
 * Interface representing options for requesting invoice information.
 * @interface RequestInvoiceOptions
 */
export interface RequestInvoiceOptions {
    // Asset ID.
    asset_id: string;
    // Amount.
    amount: number;
}

// Export an enumeration named AssetVersion.
/**
 * Enum representing the version of an asset.
 * @enum {string}
 */
export enum AssetVersion {
    ASSET_VERSION_V0,
    ASSET_VERSION_V1
}

// Export an enumeration named AssetType.
/**
 * Enum representing the type of an asset.
 * @enum {number}
 */
export enum AssetType {
    NORMAL = 0,
    COLLECTIBLE = 1
}

// Export an interface named ResponseInvoiceRow which extends RequestInvoiceOptions.
/**
 * Interface representing a row in the response of an invoice request.
 * @interface ResponseInvoiceRow
 * @extends {RequestInvoiceOptions}
 */
export interface ResponseInvoiceRow extends RequestInvoiceOptions {
    // Encoded value.
    encoded: string;
    // Asset type.
    asset_type: AssetType;
    // Group key (can be null).
    group_key?: null|string;
    // Script key.
    script_key: string;
    // Internal key.
    internal_key: string;
    // Tapscript sibling (can be null).
    tapscript_sibling?: null|string;
    // Taproot output key.
    taproot_output_key: string;
    // Proof courier address (can be null).
    proof_courier_addr?: string;
    // Asset version (can be of type AssetVersion or null).
    asset_version?: AssetVersion
}

// Export an interface named TransferOptions.
/**
 * Interface representing options for transferring assets.
 * @interface TransferOptions
 */
export interface TransferOptions{
    // Receiving address.
    recv_addr: string;
    // Amount to transfer.
    amount?: number;
    // Minimum confirmations required.
    min_conf?: number;
    // Fee rate.
    fee_rate?: number;
}

// Export an interface named SendAssetsOptions.
/**
 * Interface representing options for sending assets.
 * @interface SendAssetsOptions
 */
export interface SendAssetsOptions{
    // Receiving address.
    receive_addr: string;
    // Fee rate.
    fee_rate?: number;
}

// Define an interface named BridgeQueue.
/**
 * Interface representing a queue item for the bridge.
 * @interface BridgeQueue
 */
interface BridgeQueue {
    // The type of the queue item.
    type: string;
    // The data associated with the queue item.
    data?: unknown;
    // callback function
    callback?: Function;
    // timestamp.
    time?: number;
    // request Id.
    requestId?: string;
    // reject function
    reject?: Function;
    // client id
    client_id: string;
}

/**
 * Interface representing a wallet provider instance.
 * @interface WalletProvider
 */
interface WalletProvider {
    // The client ID.
    client_id: string;
}

// Define an interface named WalletSdkJsBridge.
/**
 * Interface representing the bridge for interacting with the wallet SDK.
 * @interface WalletSdkJsBridge
 */
interface WalletSdkJsBridge {
    /**
     * initialization js bridge return a WalletProvider
     */
    init():WalletProvider;
    
    /**
     * send request to js bridge.
     * @param queue - The queue item to send.
     */
    sendRequestJsBridge(queue: BridgeQueue):void;
}

/**
 * Class utility.
 */
export class Utils {
    /**
     * Verify if a string is a valid URL.
     * @param {string} url - The URL to verify.
     * @returns {boolean} - True if the URL is valid, false otherwise.
     */
    static isUrl(url: string) : boolean{
        // return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(url)
        return /^(http|ftp|https):\/\/[\w\-_]+/.test(url);
    }
    
    /**
     * Verify if a string is a valid asset ID.
     * @param {string} id - The asset ID to verify.
     * @returns {boolean} - True if the asset ID is valid, false otherwise.
     */
    static isAssetId(id:string):boolean {
        return /^[0-9a-f]{64}$/.test(id);
    }

    /**
     * Verify if a string is a valid Bitcoin address.
     * @param {string} address - The Bitcoin address to verify.
     * @returns {boolean} - True if the Bitcoin address is valid, false otherwise.
     */
    static isValidBitcoinAddress(address: string): boolean {
        const regex = /^(bc1p|bcrt|tb1q)[a-zA-HJ-NP-Z0-9]{38,40}$/;
        return regex.test(address);
    }

    /**
     * Verify if a string is a valid transaction ID.
     * @param {string} txid - The transaction ID to verify.
     * @returns {boolean} - True if the transaction ID is valid, false otherwise.
     */
    static isTxId(txid: string): boolean {
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
    _currentWorkType: BTCNetwork;
    /**
     * @private
     * @property {boolean} _autoConnection - True if auto-connection is enabled, false otherwise.
     */
    _autoConnection: boolean;
    /**
     * The current work type name of the wallet SDK. Defaults to mainnet.
     * @private
     * @property {NetworkType} _currentWorkTypeName - The network name the wallet is currently operating on.
     */
    _currentWorkTypeName: NetworkType;
    /**
     * The current account information.
     * @private
     * @property {Account} _currentAccount - The current account details.
     */
    _currentAccount: Account = {
        name: "",
        btcAddress: ""
    };
    /**
     * The onAccountChange handler function.
     * @private
     * @property {Function|null} _onAccountChangeHandler - The handler function for account change events.
     */
    _onAccountChangeHandler: Function | null = null;
    /**
     * Indicates whether the wallet is connected.
     * @private
     * @property {boolean} _conn - True if connected, false otherwise.
     */
    _conn: boolean = false;

    /**
     * The wallet provider.
     */
    _provider!: WalletProvider;

    /**
     * The onListenTransaction handler function.
     * @private
     * @property {Function|null} _onListenTransactionHandler - The handler function for transaction change events.
     */
    _onListenTransactionHandler: Function | null = null;

    /**
     * The wallet provider of bittap wallet js bridge.
     */
    _walletProvider!: WalletSdkJsBridge;

    constructor(_initOpts: ConnectionOptions = {network: NetworkType.mainnet, autoConnection: false}) {
        
        const opts = Object.assign({
            network: NetworkType.mainnet,
            autoConnection: false,
        }, _initOpts);
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
    public static installed(){
        return Object.prototype.hasOwnProperty.call(window, 'BittapWalletInjected');
    }

    /**
     * Returns the current state of the wallet.
     * @private
     * @method getCurrentSate
     * @returns {ConnectionResponse} - The current network and account information.
     */
    private getCurrentSate(): ConnectionResponse {
        return {
            network: {
                name: this._currentWorkTypeName,
                network: this._currentWorkType
            },
            account: this._currentAccount
        };
    }

    /**
     * Checks if the wallet is connected.
     * @private
     * @method checkConnection
     */
    private checkConnection(){
        if(!WalletSdk.installed()){
            throw new BitTapError("BittapWalletInjected not installed");
        }        
        if(!this._conn){
            throw new BitTapError("Bittap Wallet not connected");
        }
    }

    /**
     * Connects to the Bittap wallet SDK.
     * @method connection
     * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
     */
    connection(): Promise<ConnectionResponse> {
        return new Promise((resolve, reject) => {
            try {
                if(!WalletSdk.installed()){
                    throw new BitTapError("BittapWalletInjected not installed");
                }
                if(this._conn){
                    throw new BitTapError("Bittap wallet is connected.");
                }
                // @ts-ignore
                this._walletProvider = window.BittapWalletInjected as _walletProvider;
                this._provider = this._walletProvider.init();
                // console.log('client_id: ', this._provider.client_id);
                this._walletProvider.sendRequestJsBridge({
                    type: "connectionWallet",
                    client_id:this._provider.client_id,
                    data: {
                        network: this._currentWorkTypeName,
                        autoConnection: this._autoConnection
                    },
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
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
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    setAutoConnection(_autoConnection: boolean): void {
        this._autoConnection = _autoConnection;
    }

    /**
     * Switches the network of the wallet SDK.
     * @method switchNetwork
     * @param {NetworkType} _network - The new network type to switch to.
     * @param {string} [url] - Optional URL for the new network.
     * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
     */
    switchNetwork(_network: NetworkType, url?: string): Promise<ConnectionResponse> {
        return new Promise((resolve, reject) => {
            this.checkConnection();
            // Implementation not provided.
            if(!_network){
                throw new NetworkUnavailableError("Network not provided");
            }
            if(_network === this._currentWorkTypeName){
                throw new NetworkUnavailableError("Network not changed");
            }
            this._walletProvider.sendRequestJsBridge({
                type: "switchNetwork",
                client_id: this._provider.client_id,
                data: {
                    network: _network,
                    url
                },
                callback: () => {
                    this._currentWorkTypeName = _network;
                    this._currentWorkType = getNetworks(this._currentWorkTypeName);
                    resolve(this.getCurrentSate());
                },
                reject: (res: { err: any; }) => {
                    // If an error occurs, reject the promise with the error
                    reject(res.err);
                }
            });
        });
    }

    /**
     * Registers a callback function to be executed when the account changes.
     * @method setOnAccountChangeHandler
     * @param {Function} func - The callback function to be executed.
     *                         Takes an object with network and account information as a parameter.
     */
    setOnAccountChangeHandler(func: (result: ConnectionResponse) => void): void {
        this.checkConnection();
        if(typeof func === "function") {
            this._onAccountChangeHandler = func;
            this._walletProvider.sendRequestJsBridge({
                type: "onAccountChange",
                client_id: this._provider.client_id,
                data: {},
                callback: (res:{  data: ConnectionResponse }) => {
                    // console.log('onAccountChange res: ', res.data);
                    if(Object.prototype.hasOwnProperty.call(res.data,'network') && Object.prototype.hasOwnProperty.call(res.data.network,'name') &&
                        Object.prototype.hasOwnProperty.call(res.data,'account') && Object.prototype.hasOwnProperty.call(res.data.account,'btcAddress')
                        && Object.prototype.hasOwnProperty.call(res.data.account,'name')){
                        const { account, network } = res.data;
                        this._currentAccount.btcAddress = account.btcAddress;
                        this._currentAccount.name = account.name;
                        this._currentWorkTypeName = network.name;
                        this._currentWorkType = getNetworks(this._currentWorkTypeName);
                    }
                    if(this._onAccountChangeHandler && typeof this._onAccountChangeHandler === "function") {
                        // @ts-ignore
                        this._onAccountChangeHandler(this.getCurrentSate());
                    }
                }
            });
        }
    }

    /**
     * Adds a listener for all transactions and calls a callback function when a transaction occurs.
     * @method setOnListenTransactionStatusHandler
     * @param {Function} func - The callback function to be called when a transaction occurs.
     *                         Takes a ResponseTxInfo object as a parameter.
     */
    setOnListenTransactionStatusHandler(func: (res: ResponseTxInfo) => void):void {
        this.checkConnection();
        if(typeof func === "function") {
            this._onListenTransactionHandler = func;
            this._walletProvider.sendRequestJsBridge({
                client_id: this._provider.client_id,
                type: "onListenTransaction",
                data: {},
                callback: (res: { data: ResponseTxInfo}) => {
                    // console.log('onListenTransaction res: ', res);
                    if(this._onListenTransactionHandler && typeof this._onListenTransactionHandler === "function") {
                        this._onListenTransactionHandler(res.data);
                    }
                }
            });
        }else{
            throw new BitTapError("func is not a function");
        }
    }

    /**
     * Retrieves the current assets of the wallet.
     * @method getCurrentAssets
     * @returns {Promise<CurrentAccountAssets>} - A promise that resolves to an array of current account assets.
     */
    async getCurrentAssets(): Promise<CurrentAccountAssets> {
        return new Promise((resolve, reject) => {
            try {
                
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "getCurrentAssets",
                    data: {},
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('getCurrentAssets');
                        }
                        // console.log('SDK getCurrentAssets on res: ', res);
                        const assets: CurrentAccountAssets = res.data;
                        resolve(assets);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    async getInvoices(_opts: RequestPageOptions = {}): Promise<ResponseInvoiceRow[]> {
        return new Promise((resolve, reject) => {
            try {
                // @ts-ignore
                _opts.page_num = Math.max(Math.floor(_opts.page_num), 1);
                // Ensure page_size is at least 10
                // @ts-ignore
                _opts.page_size = Math.max(Math.floor( _opts.page_size), 10);
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "getInvoices",
                    data: { ..._opts },
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('getInvoices');
                        }
                        // console.log('SDK getInvoices on res: ', res);
                        const invoices: ResponseInvoiceRow[] = res.data;
                        resolve(invoices);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    async createInvoice(_opts: RequestInvoiceOptions): Promise<ResponseInvoiceRow> {
        this.checkConnection();
        return new Promise((resolve, reject) => {
            try {
                
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "createInvoice",
                    data: {..._opts},
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('createInvoice');
                        }
                        resolve(res.data);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    async searchAssets(_opts: RequestAssetOptions={}): Promise<ResponseAssetRow> {
        // Check if the wallet is connected
        this.checkConnection();
        // Return a new Promise that will resolve or reject based on the search result
        return new Promise((resolve, reject) => {
            try {
                // Check if either asset_id or asset_name is provided
                if(!_opts.asset_id && !_opts.asset_name){
                    // If not, throw a BitTapError
                    throw new BitTapError("asset_id or asset_name is required");
                }
                // Ensure page_num is at least 1
                // @ts-ignore
                _opts.page_num = Math.max(Math.floor(_opts.page_num), 1);
                // Ensure page_size is at least 10
                // @ts-ignore
                _opts.page_size = Math.max(Math.floor( _opts.page_size), 10);
                // Send a request to the wallet provider to search for assets
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "searchAssets",
                    data: {..._opts},
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('searchAssets');
                        }
                        // If successful, resolve the promise with the search results
                        resolve(res.data);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    addListenTxId(txIds: string[]): void {
        this.checkConnection();
        if(txIds.length === 0){
            throw new BitTapError("txIds is required");
        }
        if(!this._onListenTransactionHandler || typeof this._onListenTransactionHandler !== "function") {
            throw new BitTapError("onListenTransactionHandler is not set a function.");
        }
        if(txIds.some(txId => !Utils.isTxId(txId))){
            throw new BitTapError("Invalid txid.");
        }
        this._walletProvider.sendRequestJsBridge({
            client_id: this._provider.client_id,
            type: "addListenTxId",
            data: {
                txIds
            },
            callback: () => {}
        });
    }

    /**
     * Transfers BTC assets.
     * @method transferBtc
     * @param {TransferOptions} _opts - The transfer options.
     * @throws {BitTapError} - If recv_addr or amount is not provided.
     * @returns {Promise<ResponseTxInfo>} - A promise that resolves to the transfer transaction details.
     */
    async transferBtc(_opts: TransferOptions): Promise<ResponseTxInfo> {
        this.checkConnection();
        return new Promise((resolve, reject) => {
            try {
                if(!_opts.recv_addr && !_opts.amount){
                    throw new BitTapError("recv_addr or amount is required");
                }
                // @ts-ignore
                _opts.amount = Math.floor(_opts.amount);
                // @ts-ignore
                _opts.min_conf = Math.max(Math.floor(_opts.min_conf), 6);
                // @ts-ignore
                _opts.fee_rate = Math.max(Math.floor(_opts.fee_rate), 1);
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "transferBtc",
                    data: {..._opts},
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('transferBtc');
                        }
                        resolve(res.data);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    async sendTaprootAssets(_opts: SendAssetsOptions): Promise<ResponseTxInfo> {
        this.checkConnection();
        return new Promise((resolve, reject) => {
            try {
                if(!_opts.receive_addr){
                    throw new BitTapError("receive_addr is required");
                }
                
                // @ts-ignore
                _opts.fee_rate = Math.max(Math.floor(_opts.fee_rate), 1);
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "sendTaprootAssets",
                    data: {..._opts},
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new RejectError('sendTaprootAssets');
                        }
                        resolve(res.data);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    async signMessage(_msg: string): Promise<string> {
        this.checkConnection();
        return new Promise((resolve, reject) => {
            try {
                if(!_msg){
                    throw new BitTapError("_msg is required");
                }
                this._walletProvider.sendRequestJsBridge({
                    client_id: this._provider.client_id,
                    type: "signMessage",
                    data: {
                        msg: _msg
                    },
                    // @ts-ignore
                    callback: (res:any) => {
                        if(Object.prototype.hasOwnProperty.call(res.data,'rejectResult') && res.data.rejectResult){
                            throw new SignatureFailedError('signMessage');
                        }
                        resolve(res.data.resultMessage);
                    },
                    reject: (res: { err: any; }) => {
                        // If an error occurs, reject the promise with the error
                        reject(res.err);
                    }
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
    private resetData(){
        this._currentAccount = {
            name: "",
           btcAddress: ""
       };
       this._onAccountChangeHandler = null;
       this._onListenTransactionHandler = null;
    }

    /**
     * Disconnects from the wallet.
     * @method DisConnection
     */
    DisConnection():void{
        this.checkConnection();
        this._walletProvider.sendRequestJsBridge({
            client_id: this._provider.client_id,
            type: "DisConnection",
            data: {},
            callback: () => {}
        });
        this.resetData();
        this._conn = false;
    }
}

// Export the NetworkType enum and BTCNetwork type
export { NetworkType, BTCNetwork, getNetworks } from "./network";

// Export the BitTapError class
export {
    BitTapError,
    AssetNotFoundError,
    InvalidBTCAddressError,
    InsufficientAssetsError,
    NetworkUnavailableError,
    SignatureFailedError,
    UnknownError,
    CommunicationError
} from './ErrorsAndExcepts';
