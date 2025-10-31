/**
 * useDecrypt - Hook for decrypting encrypted values
 *
 * @example
 * ```tsx
 * const { decrypt, publicDecrypt, isLoading } = useDecrypt();
 *
 * const decrypted = await decrypt(ciphertext, contractAddress);
 * ```
 */

import { useState, useCallback } from 'react';
import { useFhevmClient } from './useFhevmClient';

export interface UseDecryptReturn {
  decrypt: (ciphertext: bigint | string, contractAddress: string) => Promise<bigint>;
  publicDecrypt: (ciphertext: bigint | string, contractAddress: string) => Promise<bigint>;
  isLoading: boolean;
  error: Error | null;
}

export function useDecrypt(): UseDecryptReturn {
  const { client, isInitialized } = useFhevmClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (ciphertext: bigint | string, contractAddress: string): Promise<bigint> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.decrypt(ciphertext, contractAddress);
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

  const publicDecrypt = useCallback(
    async (ciphertext: bigint | string, contractAddress: string): Promise<bigint> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.publicDecrypt(ciphertext, contractAddress);
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
    decrypt,
    publicDecrypt,
    isLoading,
    error,
  };
}
