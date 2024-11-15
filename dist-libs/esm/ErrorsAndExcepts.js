/**
 * Custom error class for BitTap Wallet SDK
 */
class BitTapError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BitTapError';
  }
}
/**
 * Error thrown when an asset does not exist
 */
class AssetNotFoundError extends BitTapError {
  constructor(assetId) {
    super(`Asset with ID ${assetId} does not exist`);
    this.name = 'AssetNotFoundError';
  }
}
/**
 * Error thrown when a BTC address is invalid
 */
class InvalidBTCAddressError extends BitTapError {
  constructor(address) {
    super(`Invalid BTC address: ${address}`);
    this.name = 'InvalidBTCAddressError';
  }
}
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
/**
 * Error thrown when the network is unavailable
 */
class NetworkUnavailableError extends BitTapError {
  constructor(_message = '') {
    super(_message || 'Network is currently unavailable');
    this.name = 'NetworkUnavailableError';
  }
}
/**
 * Error thrown when a signature operation fails
 */
class SignatureFailedError extends BitTapError {
  constructor(reason) {
    super(`Signature operation failed: ${reason}`);
    this.name = 'SignatureFailedError';
  }
}
/**
 * Error thrown for unknown errors
 */
class RejectError extends BitTapError {
  constructor(message) {
    super(`Reject request: ${message}`);
    this.name = 'UnknownError';
  }
}
/**
 * Error thrown for unknown errors
 */
class UnknownError extends BitTapError {
  constructor(message) {
    super(`An unknown error occurred: ${message}`);
    this.name = 'UnknownError';
  }
}
/**
 * Error thrown when there's a communication error
 */
class CommunicationError extends BitTapError {
  constructor(details) {
    super(`Communication error: ${details}`);
    this.name = 'CommunicationError';
  }
}
export {
  BitTapError,
  AssetNotFoundError,
  InvalidBTCAddressError,
  InsufficientAssetsError,
  NetworkUnavailableError,
  SignatureFailedError,
  UnknownError,
  CommunicationError,
  RejectError,
};
