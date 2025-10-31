/**
 * API Type Definitions
 * Type definitions for Next.js API routes
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: number;
}

export interface EncryptionApiRequest {
  value: number | boolean | string;
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool' | 'eaddress';
}

export interface DecryptionApiRequest {
  ciphertext: string;
  contractAddress: string;
  signature?: string;
}

export interface ComputationApiRequest {
  operation: string;
  operands: any[];
  contractAddress?: string;
}

export interface KeyApiRequest {
  action: 'refresh' | 'validate' | 'get';
  network?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: any;
}
