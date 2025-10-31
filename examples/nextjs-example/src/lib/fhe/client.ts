/**
 * Client-side FHE Operations
 * Wrapper functions for FHEVM SDK operations
 */

import { createFhevmClient } from '@fhevm-sdk/core';
import type { FhevmClient, EncryptionResult } from '@fhevm-sdk/core';

let clientInstance: FhevmClient | null = null;

/**
 * Initialize FHEVM client
 */
export async function initializeFhevmClient(
  provider: any,
  network: 'sepolia' | 'localhost' | 'zama' = 'sepolia'
): Promise<FhevmClient> {
  if (!clientInstance) {
    clientInstance = await createFhevmClient({
      provider,
      network,
    });
  }
  return clientInstance;
}

/**
 * Get existing client instance
 */
export function getClient(): FhevmClient | null {
  return clientInstance;
}

/**
 * Encrypt a value for contract use
 */
export async function encryptValue(
  value: number | bigint | boolean,
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool'
): Promise<EncryptionResult> {
  const client = getClient();
  if (!client) {
    throw new Error('FHEVM client not initialized. Call initializeFhevmClient first.');
  }

  switch (type) {
    case 'euint8':
      return await client.encrypt8(Number(value));
    case 'euint16':
      return await client.encrypt16(Number(value));
    case 'euint32':
      return await client.encrypt32(Number(value));
    case 'euint64':
      return await client.encrypt64(BigInt(value));
    case 'ebool':
      return await client.encryptBool(Boolean(value));
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}

/**
 * Decrypt a ciphertext
 */
export async function decryptValue(
  ciphertext: bigint | string,
  contractAddress: string
): Promise<bigint> {
  const client = getClient();
  if (!client) {
    throw new Error('FHEVM client not initialized');
  }

  return await client.decrypt(ciphertext, contractAddress);
}

/**
 * Public decrypt (for publicly accessible values)
 */
export async function publicDecryptValue(
  ciphertext: bigint | string,
  contractAddress: string
): Promise<bigint> {
  const client = getClient();
  if (!client) {
    throw new Error('FHEVM client not initialized');
  }

  return await client.publicDecrypt(ciphertext, contractAddress);
}
