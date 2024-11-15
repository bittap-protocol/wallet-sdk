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

const walletSdk = new WalletSdk({ network: Network.mainnet });
```

## 4. Main Features

### 4.1 Connect Wallet

```javascript
walletSdk.connection((res) => {
  console.log('Connection successful', res);
});
```

### 4.2 Switch Network

```javascript
walletSdk.switchNetwork(Network.testnet);
```

### 4.3 Listen for Account Changes

```javascript
walletSdk.onAccountChange((result) => {
  console.log('Account changed', result);
});
```

### 4.4 Get Current Assets

```javascript
async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('Current assets', assets);
}
```

### 4.5 Create Invoice

```javascript
async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('Created invoice', invoice);
}
```

### 4.6 Transfer

```javascript
async function transfer() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    min_conf: 1,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transfer(transferOptions);
  console.log('Transfer transaction', transferTrx);
}
```

### 4.7 Send Assets

```javascript
async function sendAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendAssets(sendOptions);
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

## 5. Example Code

Here's a complete example demonstrating how to use the main features of BitTap Wallet JSSDK:

```javascript
import { WalletSdk, Network } from '@bittap/wallet-sdk';

const walletSdk = new WalletSdk({ network: Network.mainnet });

// Connect wallet
walletSdk.connection((res) => {
  console.log('Connection successful', res);
  
  // Get current assets
  getCurrentAssets();
  
  // Create invoice
  createInvoice();
  
  // Transfer
  transfer();
  
  // Send assets
  sendAssets();
  
  // Sign message
  signMessage();
});

// Listen for account changes
walletSdk.onAccountChange((result) => {
  console.log('Account changed', result);
});

async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('Current assets', assets);
}

async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('Created invoice', invoice);
}

async function transfer() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    min_conf: 1,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transfer(transferOptions);
  console.log('Transfer transaction', transferTrx);
}

async function sendAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendAssets(sendOptions);
  console.log('Send assets transaction', transferTrx);
}

async function signMessage() {
  const message = 'Hello, BitTap!';
  const signature = await walletSdk.signMessage(message);
  console.log('Signature result', signature);
}
```

This example demonstrates how to initialize the SDK, connect the wallet, listen for account changes, and use various main features. You can modify and extend this example according to your needs.

Please note that in actual use, you need to handle errors and exceptions appropriately to ensure the stability and reliability of your application.
