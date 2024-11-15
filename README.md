# BitTap Wallet JSSDK

BitTap Wallet JSSDK is a powerful tool that allows developers to easily integrate BitTap wallet functionality into their DApps.

## Features

- Easy-to-use API
- Support for mainnet and testnet
- Provides wallet connection, asset management, transfer functionality, and more
- Full TypeScript support

## Installation

Install BitTap Wallet JSSDK using npm:

```bash
npm install @bittap/wallet-sdk
```

## Quick Start

Here's a simple example demonstrating how to initialize the SDK and connect to the wallet:

```javascript
import { WalletSdk, Network } from '@bittap/wallet-sdk';

const walletSdk = new WalletSdk({ network: Network.mainnet });

walletSdk.connection((res) => {
  console.log('Connection successful', res);
});
```

## Documentation

For detailed usage instructions and API documentation, please refer to the following files:

- [English Documentation](./Tutorials.en_US.md)
- [中文文档](./Tutorials.zh_CN.md)

## Main Functions

- Connect wallet
- Switch network
- Listen for account changes
- Get current assets
- Create invoice
- Transfer
- Send assets
- Sign messages

## Contributing

We welcome community contributions! If you find a bug or have a suggestion for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact Us

If you have any questions or need support, please contact us through:

- Email: [bittapwallet@gmail.com](mailto:bittapwallet@gmail.com)
- Twitter: [@BittapLab](https://x.com/BittapLab)
- Linktr: [@bittap](https://linktr.ee/bittap)
- Official Website: [https://www.bittap.org](https://www.bittap.org)

Thank you for using BitTap Wallet JSSDK!
