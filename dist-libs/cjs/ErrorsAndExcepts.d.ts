/**
 * Custom error class for BitTap Wallet SDK
 */
declare class BitTapError extends Error {
    constructor(message: string);
}
/**
 * Error thrown when an asset does not exist
 */
declare class AssetNotFoundError extends BitTapError {
    constructor(assetId: string);
}
/**
 * Error thrown when a BTC address is invalid
 */
declare class InvalidBTCAddressError extends BitTapError {
    constructor(address: string);
}
/**
 * Error thrown when there are insufficient assets for a transaction
 */
declare class InsufficientAssetsError extends BitTapError {
    constructor(assetId: string, required: number, available: number);
}
/**
 * Error thrown when the network is unavailable
 */
declare class NetworkUnavailableError extends BitTapError {
    constructor(_message?: string);
}
/**
 * Error thrown when a signature operation fails
 */
declare class SignatureFailedError extends BitTapError {
    constructor(reason: string);
}
/**
 * Error thrown for unknown errors
 */
declare class RejectError extends BitTapError {
    constructor(message: string);
}
/**
 * Error thrown for unknown errors
 */
declare class UnknownError extends BitTapError {
    constructor(message: string);
}
/**
 * Error thrown when there's a communication error
 */
declare class CommunicationError extends BitTapError {
    constructor(details: string);
}
export { BitTapError, AssetNotFoundError, InvalidBTCAddressError, InsufficientAssetsError, NetworkUnavailableError, SignatureFailedError, UnknownError, CommunicationError, RejectError };
