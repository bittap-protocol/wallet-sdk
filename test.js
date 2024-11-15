// import { WalletSdk } from '@bittap/wallet-sdk';
const { WalletSdk, NetworkType } = require('@bittap/wallet-sdk')
const bitTapWallet = new WalletSdk()

console.log('walletSdk: ', bitTapWallet)

bitTapWallet.connection({
    network: NetworkType.mainnet,
})

