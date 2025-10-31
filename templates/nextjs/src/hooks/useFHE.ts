/**
 * useFHE Hook
 * Comprehensive FHE operations hook combining encryption, decryption, and utilities
 */

import { useState, useCallback } from 'react';
import { useEncrypt, useDecrypt, useFhevmClient } from '@fhevm-sdk/core/react';

export function useFHE() {
  const { client, isInitialized, network } = useFhevmClient();
  const encryptHook = useEncrypt();
  const decryptHook = useDecrypt();

  const [operations, setOperations] = useState<any[]>([]);

  const addOperation = useCallback((operation: any) => {
    setOperations(prev => [...prev, { ...operation, timestamp: Date.now() }]);
  }, []);

  const clearOperations = useCallback(() => {
    setOperations([]);
  }, []);

  const encryptWithLog = useCallback(async (
    value: number | bigint | boolean,
    type: 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool'
  ) => {
    const startTime = Date.now();
    let result;

    try {
      switch (type) {
        case 'euint8':
          result = await encryptHook.encrypt8(Number(value));
          break;
        case 'euint16':
          result = await encryptHook.encrypt16(Number(value));
          break;
        case 'euint32':
          result = await encryptHook.encrypt32(Number(value));
          break;
        case 'euint64':
          result = await encryptHook.encrypt64(BigInt(value));
          break;
        case 'ebool':
          result = await encryptHook.encryptBool(Boolean(value));
          break;
      }

      addOperation({
        type: 'encrypt',
        inputType: type,
        value: value.toString(),
        duration: Date.now() - startTime,
        success: true,
      });

      return result;
    } catch (error) {
      addOperation({
        type: 'encrypt',
        inputType: type,
        value: value.toString(),
        duration: Date.now() - startTime,
        success: false,
        error: (error as Error).message,
      });
      throw error;
    }
  }, [encryptHook, addOperation]);

  const decryptWithLog = useCallback(async (
    ciphertext: bigint | string,
    contractAddress: string
  ) => {
    const startTime = Date.now();

    try {
      const result = await decryptHook.decrypt(ciphertext, contractAddress);

      addOperation({
        type: 'decrypt',
        contractAddress,
        duration: Date.now() - startTime,
        success: true,
      });

      return result;
    } catch (error) {
      addOperation({
        type: 'decrypt',
        contractAddress,
        duration: Date.now() - startTime,
        success: false,
        error: (error as Error).message,
      });
      throw error;
    }
  }, [decryptHook, addOperation]);

  return {
    // Client info
    client,
    isInitialized,
    network,

    // Encryption methods
    encrypt: encryptWithLog,
    ...encryptHook,

    // Decryption methods
    decrypt: decryptWithLog,
    publicDecrypt: decryptHook.publicDecrypt,

    // Operation tracking
    operations,
    clearOperations,

    // Loading states
    isLoading: encryptHook.isLoading || decryptHook.isLoading,
    error: encryptHook.error || decryptHook.error,
  };
}
