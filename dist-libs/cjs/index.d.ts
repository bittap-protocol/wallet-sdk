import { NetworkType, BTCNetwork } from "./network";
/**
 * Interface for connection options.
 * @interface ConnectionOptions
 * @property {string} network - The network identifier.
 */
export interface ConnectionOptions {
    network: NetworkType | string;
    autoConnection?: boolean;
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
        name: NetworkType;
        network: BTCNetwork;
    };
    /**
     * The account information
     * @property {Account} account - The account information.
     */
    account: Account;
}
/**
 * Enum representing the status of a transaction.
 * @enum {string}
 */
export declare enum TxsStatus {
    pending = "pending",
    confirmed = "confirmed",
    failed = "failed"
}
/**
 * Interface representing the response of a transaction information request.
 * @interface ResponseTxInfo
 */
export interface ResponseTxInfo {
    status: TxsStatus;
    txid: string;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
}
/**
 * Interface representing a row in the current account assets list.
 * @interface CurrentAccountAssetsRow
 */
export interface CurrentAccountAssetsRow {
    asset_name: string;
    amount: number;
    decimal: 8 | 0;
    type: 0 | 1;
    asset_id: string;
}
/**
 * Interface representing options for requesting a page.
 * @interface RequestPageOptions
 */
export interface RequestPageOptions {
    page_num?: number;
    page_size?: number;
}
/**
 * Interface representing options for requesting asset information.
 * @interface RequestAssetOptions
 * @extends {RequestPageOptions}
 */
export interface RequestAssetOptions extends RequestPageOptions {
    asset_id?: string;
    asset_name?: string;
}
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
/**
 * Type representing the current account assets as an array of rows.
 * @typedef {CurrentAccountAssetsRow[]} CurrentAccountAssets
 */
export type CurrentAccountAssets = CurrentAccountAssetsRow[];
/**
 * Interface representing options for requesting invoice information.
 * @interface RequestInvoiceOptions
 */
export interface RequestInvoiceOptions {
    asset_id: string;
    amount: number;
}
/**
 * Enum representing the version of an asset.
 * @enum {string}
 */
export declare enum AssetVersion {
    ASSET_VERSION_V0 = 0,
    ASSET_VERSION_V1 = 1
}
/**
 * Enum representing the type of an asset.
 * @enum {number}
 */
export declare enum AssetType {
    NORMAL = 0,
    COLLECTIBLE = 1
}
/**
 * Interface representing a row in the response of an invoice request.
 * @interface ResponseInvoiceRow
 * @extends {RequestInvoiceOptions}
 */
export interface ResponseInvoiceRow extends RequestInvoiceOptions {
    encoded: string;
    asset_type: AssetType;
    group_key?: null | string;
    script_key: string;
    internal_key: string;
    tapscript_sibling?: null | string;
    taproot_output_key: string;
    proof_courier_addr?: string;
    asset_version?: AssetVersion;
}
/**
 * Interface representing options for transferring assets.
 * @interface TransferOptions
 */
export interface TransferOptions {
    recv_addr: string;
    amount?: number;
    min_conf?: number;
    fee_rate?: number;
}
/**
 * Interface representing options for sending assets.
 * @interface SendAssetsOptions
 */
export interface SendAssetsOptions {
    receive_addr: string;
    fee_rate?: number;
}
/**
 * Interface representing a queue item for the bridge.
 * @interface BridgeQueue
 */
interface BridgeQueue {
    type: string;
    data?: unknown;
    callback?: Function;
    time?: number;
    requestId?: string;
    reject?: Function;
    client_id: string;
}
/**
 * Interface representing a wallet provider instance.
 * @interface WalletProvider
 */
interface WalletProvider {
    client_id: string;
}
/**
 * Interface representing the bridge for interacting with the wallet SDK.
 * @interface WalletSdkJsBridge
 */
interface WalletSdkJsBridge {
    /**
     * initialization js bridge return a WalletProvider
     */
    init(): WalletProvider;
    /**
     * send request to js bridge.
     * @param queue - The queue item to send.
     */
    sendRequestJsBridge(queue: BridgeQueue): void;
}
/**
 * Class utility.
 */
export declare class Utils {
    /**
     * Verify if a string is a valid URL.
     * @param {string} url - The URL to verify.
     * @returns {boolean} - True if the URL is valid, false otherwise.
     */
    static isUrl(url: string): boolean;
    /**
     * Verify if a string is a valid asset ID.
     * @param {string} id - The asset ID to verify.
     * @returns {boolean} - True if the asset ID is valid, false otherwise.
     */
    static isAssetId(id: string): boolean;
    /**
     * Verify if a string is a valid Bitcoin address.
     * @param {string} address - The Bitcoin address to verify.
     * @returns {boolean} - True if the Bitcoin address is valid, false otherwise.
     */
    static isValidBitcoinAddress(address: string): boolean;
    /**
     * Verify if a string is a valid transaction ID.
     * @param {string} txid - The transaction ID to verify.
     * @returns {boolean} - True if the transaction ID is valid, false otherwise.
     */
    static isTxId(txid: string): boolean;
}
/**
 * Bittap wallet js SDK.
 * This class provides functionality for interacting with a wallet.
 * @class WalletSdk
 * @constructor
 * @param {ConnectionOptions} _initOpts - The initialization options for the wallet SDK.
 */
export declare class WalletSdk {
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
    _currentAccount: Account;
    /**
     * The onAccountChange handler function.
     * @private
     * @property {Function|null} _onAccountChangeHandler - The handler function for account change events.
     */
    _onAccountChangeHandler: Function | null;
    /**
     * Indicates whether the wallet is connected.
     * @private
     * @property {boolean} _conn - True if connected, false otherwise.
     */
    _conn: boolean;
    /**
     * The wallet provider.
     */
    _provider: WalletProvider;
    /**
     * The onListenTransaction handler function.
     * @private
     * @property {Function|null} _onListenTransactionHandler - The handler function for transaction change events.
     */
    _onListenTransactionHandler: Function | null;
    /**
     * The wallet provider of bittap wallet js bridge.
     */
    _walletProvider: WalletSdkJsBridge;
    constructor(_initOpts?: ConnectionOptions);
    /**
     * Checks if the Bittap Wallet is installed by checking if the 'BittapWalletInjected'
     * property exists on the window object.
     * @returns {boolean} - True if the wallet is installed, false otherwise.
     */
    static installed(): boolean;
    /**
     * Returns the current state of the wallet.
     * @private
     * @method getCurrentSate
     * @returns {ConnectionResponse} - The current network and account information.
     */
    private getCurrentSate;
    /**
     * Checks if the wallet is connected.
     * @private
     * @method checkConnection
     */
    private checkConnection;
    /**
     * Connects to the Bittap wallet SDK.
     * @method connection
     * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
     */
    connection(): Promise<ConnectionResponse>;
    /**
     * Set the auto-connect attribute.
     * If set to true, the wallet SDK will attempt to automatically connect to the wallet.
     * If set to false, the user will need to manually connect to the wallet.
     * @param {boolean} _autoConnection - The value of the auto-connect attribute to be set.
     */
    setAutoConnection(_autoConnection: boolean): void;
    /**
     * Switches the network of the wallet SDK.
     * @method switchNetwork
     * @param {NetworkType} _network - The new network type to switch to.
     * @param {string} [url] - Optional URL for the new network.
     * @returns {Promise<ConnectionResponse>} - A promise that resolves to the connection response.
     */
    switchNetwork(_network: NetworkType, url?: string): Promise<ConnectionResponse>;
    /**
     * Registers a callback function to be executed when the account changes.
     * @method setOnAccountChangeHandler
     * @param {Function} func - The callback function to be executed.
     *                         Takes an object with network and account information as a parameter.
     */
    setOnAccountChangeHandler(func: (result: ConnectionResponse) => void): void;
    /**
     * Adds a listener for all transactions and calls a callback function when a transaction occurs.
     * @method setOnListenTransactionStatusHandler
     * @param {Function} func - The callback function to be called when a transaction occurs.
     *                         Takes a ResponseTxInfo object as a parameter.
     */
    setOnListenTransactionStatusHandler(func: (res: ResponseTxInfo) => void): void;
    /**
     * Retrieves the current assets of the wallet.
     * @method getCurrentAssets
     * @returns {Promise<CurrentAccountAssets>} - A promise that resolves to an array of current account assets.
     */
    getCurrentAssets(): Promise<CurrentAccountAssets>;
    /**
     * Retrieves the current invoices of the wallet.
     * @method getInvoices
     * @param {RequestPageOptions} _opts - The options for requesting invoices.
     * @returns {Promise<ResponseInvoiceRow[]>} - A promise that resolves to an array of current account invoices.
     */
    getInvoices(_opts?: RequestPageOptions): Promise<ResponseInvoiceRow[]>;
    /**
     * Creates an invoice of current wallet account.
     * @method createInvoice
     * @param {RequestInvoiceOptions} _opts - The options for creating the invoice.
     * @returns {Promise<ResponseInvoiceRow>} - A promise that resolves to the created invoice details.
     */
    createInvoice(_opts: RequestInvoiceOptions): Promise<ResponseInvoiceRow>;
    /**
     * Searches for assets based on the provided options.
     *
     * @param {RequestAssetOptions} _opts - The options for the asset search.
     * @returns {Promise<ResponseAssetRow>} - A promise that resolves to the search results.
     * @throws {BitTapError} - If neither asset_id nor asset_name is provided.
     */
    searchAssets(_opts?: RequestAssetOptions): Promise<ResponseAssetRow>;
    /**
     * Adds a listener for a specific transaction ID and calls a callback function when the transaction occurs.
     * @method addListenTxId
     * @param {string[]} txIds - The transaction IDs to listen for.
     */
    addListenTxId(txIds: string[]): void;
    /**
     * Transfers BTC assets.
     * @method transferBtc
     * @param {TransferOptions} _opts - The transfer options.
     * @throws {BitTapError} - If recv_addr or amount is not provided.
     * @returns {Promise<ResponseTxInfo>} - A promise that resolves to the transfer transaction details.
     */
    transferBtc(_opts: TransferOptions): Promise<ResponseTxInfo>;
    /**
     * Sends taproot assets.
     * @method sendTaprootAssets
     * @param {SendAssetsOptions} _opts - The send assets options.
     * @throws {BitTapError} - If receive_addr is not provided.
     * @returns {Promise<ResponseTxInfo>} - A promise that resolves to the transfer transaction details.
     */
    sendTaprootAssets(_opts: SendAssetsOptions): Promise<ResponseTxInfo>;
    /**
     * Signs a message.
     * @method signMessage
     * @param {string} _msg - The message to sign.
     * @returns {Promise<string>} - A promise that resolves to the signed message.
     */
    signMessage(_msg: string): Promise<string>;
    /**
     * Resets internal data.
     * @private
     * @method resetData
     */
    private resetData;
    /**
     * Disconnects from the wallet.
     * @method DisConnection
     */
    DisConnection(): void;
}
export { NetworkType, BTCNetwork, getNetworks } from "./network";
export { BitTapError, AssetNotFoundError, InvalidBTCAddressError, InsufficientAssetsError, NetworkUnavailableError, SignatureFailedError, UnknownError, CommunicationError } from './ErrorsAndExcepts';
