import { Network as BTCNetwork } from 'bitcoinjs-lib';
/**
 * Define an enumerated type containing three network types: mainnet, testnet, and regtest
 */
export declare enum NetworkType {
    mainnet = "mainnet",
    testnet = "testnet",
    regtest = "regtest"
}
/**
 * According to the incoming network type, return the corresponding bitcoinjs-lib network configuration object
 * @param {Network} network - The network type to be obtained
 * @returns {Object} - The corresponding network configuration object
 */
export declare const getNetworks: (network: NetworkType) => BTCNetwork;
export { BTCNetwork };
