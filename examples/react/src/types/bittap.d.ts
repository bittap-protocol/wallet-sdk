declare module '@bittap/wallet-sdk' {
  export enum NetworkType {
    mainnet = 'mainnet',
    testnet = 'testnet',
    regtest = 'regtest'
  }

  export interface Account {
    name: string;
    btcAddress: string;
  }

  export interface Network {
    name: string;
  }

  export interface ConnectionResponse {
    account: Account;
    network: Network;
  }

  export interface TransactionInfo {
    txid: string;
    status: string;
    confirmations: number;
  }

  export interface SearchAssetsParams {
    asset_id?: string;
    asset_name?: string;
    page_num?: number;
    page_size?: number;
  }

  export interface CreateInvoiceParams {
    asset_id: string;
    amount: number;
  }

  export interface TransferBtcParams {
    recv_addr: string;
    amount: number;
  }

  export interface SendTaprootAssetsParams {
    receive_addr: string;
  }

  export interface WalletSdkOptions {
    network: NetworkType;
    autoConnection: boolean;
  }

  export class WalletSdk {
    constructor(options: WalletSdkOptions);
    static installed(): boolean;
    
    connection(): Promise<ConnectionResponse>;
    DisConnection(): void;
    
    getCurrentAssets(): Promise<any[]>;
    getInvoices(): Promise<any[]>;
    searchAssets(params: SearchAssetsParams): Promise<any>;
    createInvoice(params: CreateInvoiceParams): Promise<any>;
    
    transferBtc(params: TransferBtcParams): Promise<{ txid: string }>;
    sendTaprootAssets(params: SendTaprootAssetsParams): Promise<{ txid: string }>;
    
    switchNetwork(network: NetworkType): Promise<ConnectionResponse>;
    signMessage(message: string): Promise<any>;
    
    setOnAccountChangeHandler(handler: (data: { account: Account; network: Network }) => void): void;
    setOnListenTransactionStatusHandler(handler: (txInfo: TransactionInfo) => void): void;
    
    addListenTxId(txids: string[]): void;
  }

  export const Utils: {
    isTxId(txid: string): boolean;
  };
}