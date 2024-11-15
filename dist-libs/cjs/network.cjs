'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getNetworks = exports.NetworkType = void 0;
// Import the networks module from the bitcoinjs-lib library
const bitcoinjs_lib_1 = require('bitcoinjs-lib');
/**
 * Define an enumerated type containing three network types: mainnet, testnet, and regtest
 */
var NetworkType;
(function (NetworkType) {
  NetworkType['mainnet'] = 'mainnet';
  NetworkType['testnet'] = 'testnet';
  NetworkType['regtest'] = 'regtest';
})(NetworkType || (exports.NetworkType = NetworkType = {}));
/**
 * According to the incoming network type, return the corresponding bitcoinjs-lib network configuration object
 * @param {Network} network - The network type to be obtained
 * @returns {Object} - The corresponding network configuration object
 */
const getNetworks = network => {
  // Determine whether the incoming network type is the main network
  if (network === NetworkType.mainnet) {
    // Return the network configuration object of the main network
    return bitcoinjs_lib_1.networks.bitcoin;
  }
  // Determine whether the incoming network type is the test network
  else if (network === NetworkType.testnet) {
    // Return the network configuration object of the test network
    return bitcoinjs_lib_1.networks.testnet;
  }
  // If it is neither the main network nor the test network, it defaults to the regression test network
  else {
    // Return the network configuration object of the regression test network
    return bitcoinjs_lib_1.networks.regtest;
  }
};
exports.getNetworks = getNetworks;
