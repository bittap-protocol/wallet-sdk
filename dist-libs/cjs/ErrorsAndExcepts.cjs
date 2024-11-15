'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RejectError =
  exports.CommunicationError =
  exports.UnknownError =
  exports.SignatureFailedError =
  exports.NetworkUnavailableError =
  exports.InsufficientAssetsError =
  exports.InvalidBTCAddressError =
  exports.AssetNotFoundError =
  exports.BitTapError =
    void 0;
/**
 * Custom error class for BitTap Wallet SDK
 */
class BitTapError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BitTapError';
  }
}
exports.BitTapError = BitTapError;
/**
 * Error thrown when an asset does not exist
 */
class AssetNotFoundError extends BitTapError {
  constructor(assetId) {
    super(`Asset with ID ${assetId} does not exist`);
    this.name = 'AssetNotFoundError';
  }
}
exports.AssetNotFoundError = AssetNotFoundError;
/**
 * Error thrown when a BTC address is invalid
 */
class InvalidBTCAddressError extends BitTapError {
  constructor(address) {
    super(`Invalid BTC address: ${address}`);
    this.name = 'InvalidBTCAddressError';
  }
}
exports.InvalidBTCAddressError = InvalidBTCAddressError;
/**
 * Error thrown when there are insufficient assets for a transaction
 */
class InsufficientAssetsError extends BitTapError {
  constructor(assetId, required, available) {
    super(
      `Insufficient assets: required ${required}, available ${available} for asset ${assetId}`,
    );
    this.name = 'InsufficientAssetsError';
  }
}
exports.InsufficientAssetsError = InsufficientAssetsError;
/**
 * Error thrown when the network is unavailable
 */
class NetworkUnavailableError extends BitTapError {
  constructor(_message = '') {
    super(_message || 'Network is currently unavailable');
    this.name = 'NetworkUnavailableError';
  }
}
exports.NetworkUnavailableError = NetworkUnavailableError;
/**
 * Error thrown when a signature operation fails
 */
class SignatureFailedError extends BitTapError {
  constructor(reason) {
    super(`Signature operation failed: ${reason}`);
    this.name = 'SignatureFailedError';
  }
}
exports.SignatureFailedError = SignatureFailedError;
/**
 * Error thrown for unknown errors
 */
class RejectError extends BitTapError {
  constructor(message) {
    super(`Reject request: ${message}`);
    this.name = 'UnknownError';
  }
}
exports.RejectError = RejectError;
/**
 * Error thrown for unknown errors
 */
class UnknownError extends BitTapError {
  constructor(message) {
    super(`An unknown error occurred: ${message}`);
    this.name = 'UnknownError';
  }
}
exports.UnknownError = UnknownError;
/**
 * Error thrown when there's a communication error
 */
class CommunicationError extends BitTapError {
  constructor(details) {
    super(`Communication error: ${details}`);
    this.name = 'CommunicationError';
  }
}
exports.CommunicationError = CommunicationError;
