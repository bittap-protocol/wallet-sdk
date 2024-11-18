# BitTap Wallet JSSDK Technical Documentation

## 1. Introduction

BitTap Wallet JSSDK is a powerful tool that allows developers to easily integrate BitTap wallet functionality into their DApps. This document will guide you on how to use the main features of the SDK.

## 2. Installation

Install BitTap Wallet JSSDK using npm:

```bash
npm install @bittap/wallet-sdk
```

## 3. Initialization

First, import the SDK and create an instance:

```javascript
import { WalletSdk, Network } from '@bittap/wallet-sdk';

const walletSdk = new WalletSdk({ 
  network: Network.mainnet,
  // Optional parameters:
  autoConnection: true/false
});
```

## 4. Main Features

### 4.1 Connect Wallet

Before using any features of the SDK, you need to connect the wallet first. You can use the following code to connect the wallet:

```javascript
await walletSdk.connection((res) => {
  console.log('Connection successful', res);
});
```

### 4.2 Switch Network

After connecting the wallet, you can specify a network. By default, it is `Network.mainnet`. If you want to switch to the test network, use the following code:

```javascript
walletSdk.switchNetwork(Network.testnet);
```

### 4.3 Listen for Account Changes

After connecting the wallet, set up a listener which will automatically connect the wallet and listen for account changes. You can use the following code to listen for account changes:

```javascript
walletSdk.setOnAccountChangeHandler((result) => {
  console.log('Account changed', result);
});
```

### 4.4 Get Current Assets

After connecting the wallet, you can use the following code to get current assets:

```javascript
async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('Current assets', assets);
  console.log('BTC assets:', assets.filter((asset) => asset.asset_id === 'Base'));
}
```

### 4.5 Create Invoice

After connecting the wallet, you can use the following code to create an invoice for receiving Taproot assets:

```javascript
async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('Created invoice', invoice);
}
```

### 4.6 Transfer BTC

After connecting the wallet, you can use the following code to transfer BTC assets:

```javascript
async function transferBtc() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    // Optional parameters:
    min_conf: 6,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transferBtc(transferOptions);
  console.log('Transfer transaction', transferTrx);
}
```

### 4.7 Send Taproot Assets

```javascript
async function sendTaprootAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    // Optional parameters:
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendTaprootAssets(sendOptions);
  console.log('Send assets transaction', transferTrx);
}
```

### 4.8 Sign Message

```javascript
async function signMessage() {
  const message = 'Hello, BitTap!';
  const signature = await walletSdk.signMessage(message);
  console.log('Signature result', signature);
}
```

### 4.9 Listen for Transaction Status Changes

```javascript
async function setOnListenTransactionStatusHandler() {
  walletSdk.setOnListenTransactionStatusHandler((res) => {
    console.log('Transaction status changed', res);
  });
}
```

### 4.10 Add Transaction IDs to Listener Pool

```javascript
async function addListenTxId() {
  const txIds = [
    'your_transaction_id_1',
    'your_transaction_id_2'
  ];
  walletSdk.addListenTxId(txIds);
}
```

### 4.11 Search Taproot Assets
```javascript
searchAssets() {
  const searchOptions = {
    // Optional parameters, either asset_id or asset_name must be provided:
    asset_id: string,
    asset_name: string,
    page_num: 6, // Current page number
    page_size: 1  // Number of items per page
  };
  const searchResult = await walletSdk.searchAssets(searchOptions);
  console.log('Search result', searchResult);
}
```
### 4.12 Get All Taproot Assets Invoices List

Note: Each invoice can be used multiple times.

```javascript
searchAssets() {
  const pageOptions = {
    // Optional parameters:
    page_num: 6, // Current page number
    page_size: 1  // Number of items per page
  };
  const invoicesResult = await walletSdk.getInvoices(pageOptions);
  console.log('Result:', invoicesResult);
}
```



## 5. Example Code

Here's a complete example demonstrating how to use the main features of BitTap Wallet JSSDK:

Example code links:
* [VUE Example](https://bittap-vue.onebits.org/)
* [REACT Example](https://bittap-react.onebits.org/)

This example demonstrates how to initialize the SDK, connect the wallet, listen for account changes, and use various main features. You can modify and extend this example according to your needs.

Please note that in actual use, you need to handle errors and exceptions appropriately to ensure the stability and reliability of your application.
