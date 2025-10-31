/**
 * useEncryption Hook
 * Enhanced encryption hook with validation and error handling
 */

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm-sdk/core/react';
import { validateForEncryptionType } from '../lib/utils/validation';

export function useEncryption() {
  const {
    encrypt8,
    encrypt16,
    encrypt32,
    encrypt64,
    encryptBool,
    encryptAddress,
    isLoading,
    error: sdkError
  } = useEncrypt();

  const [validationError, setValidationError] = useState<string>('');
  const [lastEncrypted, setLastEncrypted] = useState<any>(null);

  const encryptNumber = useCallback(async (
    value: number,
    type: 'euint8' | 'euint16' | 'euint32' | 'euint64' = 'euint32'
  ) => {
    setValidationError('');

    // Validate input
    const validation = validateForEncryptionType(value, type);
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid value');
      throw new Error(validation.error);
    }

    try {
      let result;
      switch (type) {
        case 'euint8':
          result = await encrypt8(value);
          break;
        case 'euint16':
          result = await encrypt16(value);
          break;
        case 'euint32':
          result = await encrypt32(value);
          break;
        case 'euint64':
          result = await encrypt64(BigInt(value));
          break;
      }

      setLastEncrypted({
        type,
        originalValue: value,
        encrypted: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }, [encrypt8, encrypt16, encrypt32, encrypt64]);

  const encryptBoolean = useCallback(async (value: boolean) => {
    setValidationError('');

    try {
      const result = await encryptBool(value);
      setLastEncrypted({
        type: 'ebool',
        originalValue: value,
        encrypted: result,
        timestamp: Date.now(),
      });
      return result;
    } catch (error) {
      console.error('Boolean encryption failed:', error);
      throw error;
    }
  }, [encryptBool]);

  const encryptEthAddress = useCallback(async (address: string) => {
    setValidationError('');

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      const error = 'Invalid Ethereum address format';
      setValidationError(error);
      throw new Error(error);
    }

    try {
      const result = await encryptAddress(address);
      setLastEncrypted({
        type: 'eaddress',
        originalValue: address,
        encrypted: result,
        timestamp: Date.now(),
      });
      return result;
    } catch (error) {
      console.error('Address encryption failed:', error);
      throw error;
    }
  }, [encryptAddress]);

  const clearLastEncrypted = useCallback(() => {
    setLastEncrypted(null);
    setValidationError('');
  }, []);

  return {
    // Encryption methods
    encryptNumber,
    encryptBoolean,
    encryptAddress: encryptEthAddress,

    // Direct access to SDK methods
    encrypt8,
    encrypt16,
    encrypt32,
    encrypt64,
    encryptBool,

    // State
    isLoading,
    error: validationError || sdkError,
    lastEncrypted,
    clearLastEncrypted,
  };
}
