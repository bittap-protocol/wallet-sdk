# BitTap 钱包 JSSDK 技术文档

## 1. 简介

BitTap 钱包 JSSDK 是一个强大的工具，允许开发者轻松地将 BitTap 钱包功能集成到他们的 DApp 中。本文档将指导您如何使用 SDK 的主要功能。

## 2. 安装

使用 npm 安装 BitTap 钱包 JSSDK：

```bash
npm install @bittap/wallet-sdk
```

## 3. 初始化

首先，导入 SDK 并创建一个实例：

```javascript
import { WalletSdk, Network } from '@bittap/wallet-sdk';

const walletSdk = new WalletSdk({ network: Network.mainnet });
```

## 4. 主要功能

### 4.1 连接钱包

```javascript
walletSdk.connection((res) => {
  console.log('连接成功', res);
});
```

### 4.2 切换网络

```javascript
walletSdk.switchNetwork(Network.testnet);
```

### 4.3 监听账户变化

```javascript
walletSdk.onAccountChange((result) => {
  console.log('账户变化', result);
});
```

### 4.4 获取当前资产

```javascript
async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('当前资产', assets);
}
```

### 4.5 创建发票

```javascript
async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('创建的发票', invoice);
}
```

### 4.6 转账

```javascript
async function transfer() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    min_conf: 1,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transfer(transferOptions);
  console.log('转账交易', transferTrx);
}
```

### 4.7 发送资产

```javascript
async function sendAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendAssets(sendOptions);
  console.log('发送资产交易', transferTrx);
}
```

### 4.8 签名消息

```javascript
async function signMessage() {
  const message = 'Hello, BitTap!';
  const signature = await walletSdk.signMessage(message);
  console.log('签名结果', signature);
}
```

## 5. 示例代码

以下是一个完整的示例，展示了如何使用 BitTap 钱包 JSSDK 的主要功能：

```javascript
import { WalletSdk, Network } from '@bittap/wallet-sdk';

const walletSdk = new WalletSdk({ network: Network.mainnet });

// 连接钱包
walletSdk.connection((res) => {
  console.log('连接成功', res);
  
  // 获取当前资产
  getCurrentAssets();
  
  // 创建发票
  createInvoice();
  
  // 转账
  transfer();
  
  // 发送资产
  sendAssets();
  
  // 签名消息
  signMessage();
});

// 监听账户变化
walletSdk.onAccountChange((result) => {
  console.log('账户变化', result);
});

async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('当前资产', assets);
}

async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('创建的发票', invoice);
}

async function transfer() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    min_conf: 1,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transfer(transferOptions);
  console.log('转账交易', transferTrx);
}

async function sendAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendAssets(sendOptions);
  console.log('发送资产交易', transferTrx);
}

async function signMessage() {
  const message = 'Hello, BitTap!';
  const signature = await walletSdk.signMessage(message);
  console.log('签名结果', signature);
}
```

这个示例展示了如何初始化 SDK，连接钱包，监听账户变化，以及使用各种主要功能。您可以根据自己的需求修改和扩展这个示例。

请注意，在实际使用中，您需要适当地处理错误和异常情况，以确保您的应用程序的稳定性和可靠性。
