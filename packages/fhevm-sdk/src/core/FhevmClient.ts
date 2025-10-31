/**
 * FhevmClient - Core client for FHEVM operations
 *
 * Provides a unified interface for:
 * - Initializing FHEVM instance
 * - Encrypting inputs (euint8, euint16, euint32, euint64, ebool, eaddress)
 * - Decrypting outputs (userDecrypt with EIP-712 signatures)
 * - Managing access control permissions
 * - Contract interactions with encrypted data
 */

import { BrowserProvider, JsonRpcProvider, Signer } from 'ethers';
import { initFhevm, createInstance, FhevmInstance } from 'fhevmjs';
import type { Network, FhevmClientConfig, EncryptionResult } from './types';
import { validateAddress, validateNumber } from '../utils/validation';
import { NETWORK_CONFIGS } from '../config/networks';

export class FhevmClient {
  private fhevmInstance: FhevmInstance | null = null;
  private provider: BrowserProvider | JsonRpcProvider;
  private signer: Signer | null = null;
  private network: Network;
  private gatewayUrl: string;
  private initialized: boolean = false;

  constructor(config: FhevmClientConfig) {
    this.network = config.network;
    this.gatewayUrl = config.gatewayUrl || NETWORK_CONFIGS[config.network].gatewayUrl;

    if (typeof window !== 'undefined' && config.provider) {
      // Browser environment with wallet provider
      this.provider = new BrowserProvider(config.provider);
    } else if (config.rpcUrl) {
      // Node.js environment or custom RPC
      this.provider = new JsonRpcProvider(config.rpcUrl);
    } else {
      throw new Error('Either provider or rpcUrl must be provided');
    }
  }

  /**
   * Initialize the FHEVM instance
   * Must be called before any encryption/decryption operations
   */
  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize FHEVM global state
      await initFhevm();

      // Get signer if in browser
      if (this.provider instanceof BrowserProvider) {
        this.signer = await this.provider.getSigner();
      }

      // Create FHEVM instance with network-specific public key
      const networkConfig = NETWORK_CONFIGS[this.network];
      this.fhevmInstance = await createInstance({
        chainId: networkConfig.chainId,
        publicKey: networkConfig.publicKey,
        gatewayUrl: this.gatewayUrl,
      });

      this.initialized = true;
      console.log(`✅ FHEVM Client initialized for ${this.network}`);
    } catch (error) {
      console.error('Failed to initialize FHEVM client:', error);
      throw new Error(`FHEVM initialization failed: ${error}`);
    }
  }

  /**
   * Encrypt a 8-bit unsigned integer
   */
  async encrypt8(value: number): Promise<EncryptionResult> {
    this.ensureInitialized();
    validateNumber(value, 0, 255);

    const encrypted = this.fhevmInstance!.encrypt8(value);
    return {
      data: encrypted,
      type: 'euint8',
      value,
    };
  }

  /**
   * Encrypt a 16-bit unsigned integer
   */
  async encrypt16(value: number): Promise<EncryptionResult> {
    this.ensureInitialized();
    validateNumber(value, 0, 65535);

    const encrypted = this.fhevmInstance!.encrypt16(value);
    return {
      data: encrypted,
      type: 'euint16',
      value,
    };
  }

  /**
   * Encrypt a 32-bit unsigned integer
   */
  async encrypt32(value: number): Promise<EncryptionResult> {
    this.ensureInitialized();
    validateNumber(value, 0, 4294967295);

    const encrypted = this.fhevmInstance!.encrypt32(value);
    return {
      data: encrypted,
      type: 'euint32',
      value,
    };
  }

  /**
   * Encrypt a 64-bit unsigned integer
   */
  async encrypt64(value: bigint): Promise<EncryptionResult> {
    this.ensureInitialized();

    const encrypted = this.fhevmInstance!.encrypt64(value);
    return {
      data: encrypted,
      type: 'euint64',
      value: value.toString(),
    };
  }

  /**
   * Encrypt a boolean value
   */
  async encryptBool(value: boolean): Promise<EncryptionResult> {
    this.ensureInitialized();

    const encrypted = this.fhevmInstance!.encryptBool(value);
    return {
      data: encrypted,
      type: 'ebool',
      value,
    };
  }

  /**
   * Encrypt an address
   */
  async encryptAddress(address: string): Promise<EncryptionResult> {
    this.ensureInitialized();
    validateAddress(address);

    const encrypted = this.fhevmInstance!.encryptAddress(address);
    return {
      data: encrypted,
      type: 'eaddress',
      value: address,
    };
  }

  /**
   * Request decryption of encrypted value using EIP-712 signature
   *
   * @param ciphertext - The encrypted value handle
   * @param contractAddress - The contract address that owns the encrypted value
   * @returns Promise that resolves to the decrypted value
   */
  async decrypt(
    ciphertext: bigint | string,
    contractAddress: string
  ): Promise<bigint> {
    this.ensureInitialized();
    validateAddress(contractAddress);

    if (!this.signer) {
      throw new Error('Signer not available. Make sure you are in browser environment.');
    }

    try {
      // Create EIP-712 signature for decryption
      const eip712 = this.fhevmInstance!.createEIP712(
        typeof ciphertext === 'string' ? BigInt(ciphertext) : ciphertext,
        contractAddress
      );

      // Sign the typed data
      const signature = await this.signer.signTypedData(
        eip712.domain,
        { Reencrypt: eip712.types.Reencrypt },
        eip712.message
      );

      // Request decryption from gateway
      const decrypted = await this.fhevmInstance!.reencrypt(
        typeof ciphertext === 'string' ? BigInt(ciphertext) : ciphertext,
        contractAddress,
        signature,
        await this.signer.getAddress()
      );

      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error(`Failed to decrypt: ${error}`);
    }
  }

  /**
   * Public decryption (for values that are allowed to be publicly decrypted)
   */
  async publicDecrypt(
    ciphertext: bigint | string,
    contractAddress: string
  ): Promise<bigint> {
    this.ensureInitialized();
    validateAddress(contractAddress);

    try {
      const decrypted = await this.fhevmInstance!.publicDecrypt(
        typeof ciphertext === 'string' ? BigInt(ciphertext) : ciphertext,
        contractAddress
      );

      return decrypted;
    } catch (error) {
      console.error('Public decryption failed:', error);
      throw new Error(`Failed to public decrypt: ${error}`);
    }
  }

  /**
   * Get the current signer address
   */
  async getAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('Signer not available');
    }
    return await this.signer.getAddress();
  }

  /**
   * Get the provider instance
   */
  getProvider(): BrowserProvider | JsonRpcProvider {
    return this.provider;
  }

  /**
   * Get the signer instance
   */
  getSigner(): Signer | null {
    return this.signer;
  }

  /**
   * Get FHEVM instance (advanced usage)
   */
  getFhevmInstance(): FhevmInstance | null {
    return this.fhevmInstance;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  private ensureInitialized(): void {
    if (!this.initialized || !this.fhevmInstance) {
      throw new Error('FhevmClient not initialized. Call init() first.');
    }
  }
}

/**
 * Factory function to create and initialize FhevmClient
 *
 * @example
 * ```typescript
 * const client = await createFhevmClient({
 *   provider: window.ethereum,
 *   network: 'sepolia',
 * });
 * ```
 */
export async function createFhevmClient(
  config: FhevmClientConfig
): Promise<FhevmClient> {
  const client = new FhevmClient(config);
  await client.init();
  return client;
}

export type { FhevmClientConfig };
