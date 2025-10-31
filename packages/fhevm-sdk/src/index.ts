/**
 * @fhevm-sdk/core - Universal FHEVM SDK
 *
 * Framework-agnostic SDK for building confidential dApps with Fully Homomorphic Encryption
 * Compatible with React, Next.js, Vue, Node.js, and any frontend framework
 *
 * @example
 * ```typescript
 * import { FhevmClient, createFhevmClient } from '@fhevm-sdk/core';
 *
 * // Initialize client
 * const client = await createFhevmClient({
 *   provider: window.ethereum,
 *   network: 'sepolia',
 *   gatewayUrl: 'https://gateway.zama.ai'
 * });
 *
 * // Encrypt data
 * const encrypted = await client.encrypt32(1000);
 *
 * // Decrypt data
 * const decrypted = await client.decrypt(encryptedValue, contractAddress);
 * ```
 */

export * from './core/FhevmClient';
export * from './core/encryption';
export * from './core/decryption';
export * from './core/contracts';
export * from './core/types';
export * from './utils/helpers';
export * from './utils/validation';
export * from './config/networks';

// Re-export for convenience
export { createFhevmClient, type FhevmClientConfig } from './core/FhevmClient';
