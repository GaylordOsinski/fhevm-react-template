/**
 * useEncrypt - Hook for encrypting values
 *
 * @example
 * ```tsx
 * const { encrypt32, isLoading, error } = useEncrypt();
 *
 * const handleEncrypt = async () => {
 *   const result = await encrypt32(1000);
 *   console.log('Encrypted:', result);
 * };
 * ```
 */

import { useState, useCallback } from 'react';
import { useFhevmClient } from './useFhevmClient';
import type { EncryptionResult } from '../../core/types';

export interface UseEncryptReturn {
  encrypt8: (value: number) => Promise<EncryptionResult>;
  encrypt16: (value: number) => Promise<EncryptionResult>;
  encrypt32: (value: number) => Promise<EncryptionResult>;
  encrypt64: (value: bigint) => Promise<EncryptionResult>;
  encryptBool: (value: boolean) => Promise<EncryptionResult>;
  encryptAddress: (address: string) => Promise<EncryptionResult>;
  isLoading: boolean;
  error: Error | null;
}

export function useEncrypt(): UseEncryptReturn {
  const { client, isInitialized } = useFhevmClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt8 = useCallback(
    async (value: number): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encrypt8(value);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  const encrypt16 = useCallback(
    async (value: number): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encrypt16(value);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  const encrypt32 = useCallback(
    async (value: number): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encrypt32(value);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  const encrypt64 = useCallback(
    async (value: bigint): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encrypt64(value);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  const encryptBool = useCallback(
    async (value: boolean): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encryptBool(value);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  const encryptAddress = useCallback(
    async (address: string): Promise<EncryptionResult> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.encryptAddress(address);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized]
  );

  return {
    encrypt8,
    encrypt16,
    encrypt32,
    encrypt64,
    encryptBool,
    encryptAddress,
    isLoading,
    error,
  };
}
