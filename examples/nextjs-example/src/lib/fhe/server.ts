/**
 * Server-side FHE Operations
 * Utility functions for Next.js API routes
 */

/**
 * Validate encryption request
 */
export function validateEncryptionRequest(data: {
  value: any;
  type: string;
}): { valid: boolean; error?: string } {
  const { value, type } = data;

  if (value === undefined || value === null) {
    return { valid: false, error: 'Value is required' };
  }

  const validTypes = ['euint8', 'euint16', 'euint32', 'euint64', 'ebool', 'eaddress'];
  if (!validTypes.includes(type)) {
    return { valid: false, error: `Invalid type. Must be one of: ${validTypes.join(', ')}` };
  }

  // Type-specific validation
  if (type === 'euint8' && (value < 0 || value > 255)) {
    return { valid: false, error: 'Value must be between 0 and 255 for euint8' };
  }

  if (type === 'euint16' && (value < 0 || value > 65535)) {
    return { valid: false, error: 'Value must be between 0 and 65535 for euint16' };
  }

  if (type === 'euint32' && (value < 0 || value > 4294967295)) {
    return { valid: false, error: 'Value must be between 0 and 4294967295 for euint32' };
  }

  if (type === 'ebool' && typeof value !== 'boolean') {
    return { valid: false, error: 'Value must be a boolean for ebool' };
  }

  return { valid: true };
}

/**
 * Validate decryption request
 */
export function validateDecryptionRequest(data: {
  ciphertext: any;
  contractAddress: any;
}): { valid: boolean; error?: string } {
  const { ciphertext, contractAddress } = data;

  if (!ciphertext) {
    return { valid: false, error: 'Ciphertext is required' };
  }

  if (!contractAddress) {
    return { valid: false, error: 'Contract address is required' };
  }

  // Basic Ethereum address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    return { valid: false, error: 'Invalid Ethereum address format' };
  }

  return { valid: true };
}

/**
 * Validate computation request
 */
export function validateComputationRequest(data: {
  operation: string;
  operands: any[];
}): { valid: boolean; error?: string } {
  const { operation, operands } = data;

  const validOperations = ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'gt', 'lt', 'gte', 'lte'];

  if (!validOperations.includes(operation)) {
    return {
      valid: false,
      error: `Invalid operation. Must be one of: ${validOperations.join(', ')}`,
    };
  }

  if (!Array.isArray(operands) || operands.length < 2) {
    return { valid: false, error: 'At least 2 operands are required' };
  }

  return { valid: true };
}

/**
 * Log FHE operation for monitoring
 */
export function logFheOperation(
  operation: string,
  details: Record<string, any>
): void {
  const timestamp = new Date().toISOString();
  console.log(`[FHE ${timestamp}] ${operation}:`, details);
}
