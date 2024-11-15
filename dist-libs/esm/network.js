// Import the networks module from the bitcoinjs-lib library
import { networks } from 'bitcoinjs-lib';
/**
 * Define an enumerated type containing three network types: mainnet, testnet, and regtest
 */
export var NetworkType;
(function (NetworkType) {
  NetworkType['mainnet'] = 'mainnet';
  NetworkType['testnet'] = 'testnet';
  NetworkType['regtest'] = 'regtest';
})(NetworkType || (NetworkType = {}));
/**
 * According to the incoming network type, return the corresponding bitcoinjs-lib network configuration object
 * @param {Network} network - The network type to be obtained
 * @returns {Object} - The corresponding network configuration object
 */
export const getNetworks = network => {
  // Determine whether the incoming network type is the main network
  if (network === NetworkType.mainnet) {
    // Return the network configuration object of the main network
    return networks.bitcoin;
  }
  // Determine whether the incoming network type is the test network
  else if (network === NetworkType.testnet) {
    // Return the network configuration object of the test network
    return networks.testnet;
  }
  // If it is neither the main network nor the test network, it defaults to the regression test network
  else {
    // Return the network configuration object of the regression test network
    return networks.regtest;
  }
};
