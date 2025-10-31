/**
 * FHE Type Definitions
 * Type definitions for FHE operations in the Next.js example
 */

export type EncryptedType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool' | 'eaddress';

export type FheOperation = 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte';

export interface EncryptionResult {
  data: Uint8Array;
  type: EncryptedType;
}

export interface DecryptionRequest {
  ciphertext: bigint | string;
  contractAddress: string;
  userAddress: string;
}

export interface ComputationRequest {
  operation: FheOperation;
  operands: Uint8Array[];
  contractAddress: string;
}

export interface FhevmConfig {
  network: 'sepolia' | 'localhost' | 'zama';
  provider?: any;
  gatewayUrl?: string;
  rpcUrl?: string;
}

export interface ContractCallParams {
  contractAddress: string;
  abi: any[];
  functionName: string;
  args: any[];
  value?: bigint;
}

export interface KeyInfo {
  network: string;
  publicKey?: string;
  lastUpdated: string;
  status: 'active' | 'expired' | 'pending';
}

export interface OperationLog {
  type: 'encrypt' | 'decrypt' | 'compute';
  timestamp: number;
  success: boolean;
  details?: any;
  error?: string;
}
