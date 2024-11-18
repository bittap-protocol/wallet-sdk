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

const walletSdk = new WalletSdk({ 
  network: Network.mainnet
  // 可选参数：
  autoConnection: true/false
});
```

## 4. 主要功能

### 4.1 连接钱包

在使用 SDK 的任何功能之前，您需要先连接钱包。您可以使用以下代码连接钱包：

```javascript
await walletSdk.connection((res) => {
  console.log('连接成功', res);
});
```

### 4.2 切换网络

在连接钱包之后，您可以指定网络。默认情况下，它是 `Network.mainnet`。如果您想切换到测试网络，可以使用以下代码：

```javascript
walletSdk.switchNetwork(Network.testnet);
```

### 4.3 监听账户变化

在连接钱包之后，设定监听，这将自动连接钱包并监听账户变化。您可以使用以下代码监听账户变化：

```javascript
walletSdk.setOnAccountChangeHandler((result) => {
  console.log('账户变化', result);
});
```

### 4.4 获取当前资产

在连接钱包之后，您可以使用以下代码获取当前资产：

```javascript
async function getCurrentAssets() {
  const assets = await walletSdk.getCurrentAssets();
  console.log('当前资产', assets);
  console.log('BTC资产：', assets.filter((asset) => asset.asset_id === 'Base'));
}
```

### 4.5 创建发票

在连接钱包之后，您可以使用以下代码创建接收Taproot资产的发票：

```javascript
async function createInvoice() {
  const invoice = await walletSdk.createInvoice({
    asset_id: 'your_asset_id',
    amount: 100000
  });
  console.log('创建的发票', invoice);
}
```

### 4.6 BTC转账

在连接钱包之后，您可以使用以下代码进行BTC资产转账：

```javascript
async function transferBtc() {
  const transferOptions = {
    recv_addr: 'recipient_address',
    amount: 100000,
    // 以下为可选参数
    min_conf: 6,
    fee_rate: 1
  };
  const transferTrx = await walletSdk.transferBtc(transferOptions);
  console.log('转账交易', transferTrx);
}
```

### 4.7 发送Taproot资产

```javascript
async function sendTaprootAssets() {
  const sendOptions = {
    receive_addr: 'recipient_address',
    // 以下为可选参数
    fee_rate: 1
  };
  const transferTrx = await walletSdk.sendTaprootAssets(sendOptions);
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

### 4.9 监听交易状态变化

```javascript
async function setOnListenTransactionStatusHandler() {
  walletSdk.setOnListenTransactionStatusHandler((res) => {
    console.log('交易状态变化', res);
  }));
}
```

### 4.10 提交交易ID到监听池

```javascript
async function addListenTxId() {
  const txIds = [
    'your_transaction_id_1',
    'your_transaction_id_2'
  ]
  walletSdk.addListenTxId(txIds);
}
```

### 4.11 搜索Taproot资产
```javascript
searchAssets() {
  const searchOptions = {
    // 以下为可选参数 asset_id 和 asset_name 必须提示其中之一
    asset_id: string
    asset_name: string,
    page_num: 6, // 当前页码
    page_size: 1  // 每页数量
  };
  const searchResult = await walletSdk.searchAssets(searchOptions);
  console.log('搜索结果', searchResult);
}
```
### 4.12 获取所有Taproot资产发票列表

注意：每张发票都可以使用多次

```javascript
searchAssets() {
  const pageOptions = {
    // 以下为可选参数 
    page_num: 6, // 当前页码
    page_size: 1  // 每页数量
  };
  const invoicesResult = await walletSdk.getInvoices(pageOptions);
  console.log('结果:', invoicesResult);
}
```



## 5. 示例代码

以下是一个完整的示例，展示了如何使用 BitTap 钱包 JSSDK 的主要功能：

示例代码连接: 
* [VUE 示例](https://bittap-vue.onebits.org/)
* [REACT 示例](https://bittap-react.onebits.org/)

这个示例展示了如何初始化 SDK，连接钱包，监听账户变化，以及使用各种主要功能。您可以根据自己的需求修改和扩展这个示例。

请注意，在实际使用中，您需要适当地处理错误和异常情况，以确保您的应用程序的稳定性和可靠性。
