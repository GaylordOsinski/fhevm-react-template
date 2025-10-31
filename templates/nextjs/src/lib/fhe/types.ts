/**
 * FHE Type Definitions
 */

export type EncryptedType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool' | 'eaddress';

export type FheOperation = 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte';

export interface EncryptedValue {
  data: Uint8Array;
  type: EncryptedType;
  timestamp: number;
}

export interface DecryptionRequest {
  ciphertext: bigint | string;
  contractAddress: string;
  userAddress: string;
}

export interface ComputationRequest {
  operation: FheOperation;
  operands: bigint[];
  contractAddress: string;
}

export interface FheConfig {
  network: 'sepolia' | 'localhost' | 'zama';
  gatewayUrl?: string;
  rpcUrl?: string;
}
