/**
 * Validation utilities for FHEVM SDK
 */

/**
 * Validate Ethereum address format
 */
export function validateAddress(address: string): void {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`Invalid Ethereum address: ${address}`);
  }
}

/**
 * Validate number is within range
 */
export function validateNumber(value: number, min: number, max: number): void {
  if (!Number.isInteger(value)) {
    throw new Error(`Value must be an integer, got: ${value}`);
  }
  if (value < min || value > max) {
    throw new Error(`Value ${value} out of range [${min}, ${max}]`);
  }
}

/**
 * Validate bigint is positive
 */
export function validateBigInt(value: bigint): void {
  if (value < 0n) {
    throw new Error(`BigInt value must be non-negative, got: ${value}`);
  }
}
