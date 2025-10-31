/**
 * Type definitions for FHEVM SDK
 */

import type { Eip1193Provider } from 'ethers';

export type Network = 'sepolia' | 'localhost' | 'zama';

export type EncryptedType =
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'
  | 'ebool'
  | 'eaddress';

export interface FhevmClientConfig {
  provider?: Eip1193Provider;
  rpcUrl?: string;
  network: Network;
  gatewayUrl?: string;
}

export interface EncryptionResult {
  data: Uint8Array;
  type: EncryptedType;
  value: number | string | boolean | bigint;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  gatewayUrl: string;
  publicKey?: string;
}

export interface DecryptionRequest {
  ciphertext: bigint | string;
  contractAddress: string;
  userAddress: string;
}

export interface ContractCallParams {
  contractAddress: string;
  abi: any[];
  functionName: string;
  args: any[];
  value?: bigint;
}
