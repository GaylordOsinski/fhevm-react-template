/**
 * Validation Utilities
 * Input validation and data checking functions
 */

/**
 * Validate number for encryption type
 */
export function validateForEncryptionType(
  value: number,
  type: 'euint8' | 'euint16' | 'euint32' | 'euint64'
): { valid: boolean; error?: string } {
  const ranges = {
    euint8: { min: 0, max: 255 },
    euint16: { min: 0, max: 65535 },
    euint32: { min: 0, max: 4294967295 },
    euint64: { min: 0, max: BigInt('18446744073709551615') },
  };

  const range = ranges[type];

  if (type === 'euint64') {
    const bigValue = BigInt(value);
    if (bigValue < 0 || bigValue > range.max) {
      return {
        valid: false,
        error: `Value must be between 0 and ${range.max} for ${type}`,
      };
    }
  } else {
    if (value < range.min || value > range.max) {
      return {
        valid: false,
        error: `Value must be between ${range.min} and ${range.max} for ${type}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Check if string is a valid number
 */
export function isNumericString(str: string): boolean {
  return /^-?\d+$/.test(str);
}

/**
 * Validate contract ABI
 */
export function isValidABI(abi: any): boolean {
  return Array.isArray(abi) && abi.length > 0;
}

/**
 * Validate function arguments
 */
export function validateFunctionArgs(
  args: any[],
  expectedCount: number
): { valid: boolean; error?: string } {
  if (args.length !== expectedCount) {
    return {
      valid: false,
      error: `Expected ${expectedCount} arguments, got ${args.length}`,
    };
  }
  return { valid: true };
}
