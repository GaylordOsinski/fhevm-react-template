/**
 * useContract - Hook for interacting with FHEVM contracts
 *
 * @example
 * ```tsx
 * const { writeContract, readContract, isLoading } = useContract();
 *
 * const tx = await writeContract({
 *   contractAddress: '0x...',
 *   abi: contractABI,
 *   functionName: 'submitEncryptedData',
 *   args: [encryptedValue],
 * });
 * ```
 */

import { useState, useCallback } from 'react';
import { Contract } from 'ethers';
import { useFhevmClient } from './useFhevmClient';

export interface WriteContractParams {
  contractAddress: string;
  abi: any[];
  functionName: string;
  args: any[];
  value?: bigint;
}

export interface ReadContractParams {
  contractAddress: string;
  abi: any[];
  functionName: string;
  args?: any[];
}

export interface UseContractReturn {
  writeContract: (params: WriteContractParams) => Promise<any>;
  readContract: (params: ReadContractParams) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}

export function useContract(): UseContractReturn {
  const { client, isInitialized } = useFhevmClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const writeContract = useCallback(
    async (params: WriteContractParams): Promise<any> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      const signer = client.getSigner();
      if (!signer) {
        throw new Error('Signer not available');
      }

      setIsLoading(true);
      setError(null);

      try {
        const contract = new Contract(params.contractAddress, params.abi, signer);
        const tx = await contract[params.functionName](...params.args, {
          value: params.value || 0n,
        });
        const receipt = await tx.wait();
        return receipt;
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

  const readContract = useCallback(
    async (params: ReadContractParams): Promise<any> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      const provider = client.getProvider();

      setIsLoading(true);
      setError(null);

      try {
        const contract = new Contract(params.contractAddress, params.abi, provider);
        const result = await contract[params.functionName](...(params.args || []));
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
    writeContract,
    readContract,
    isLoading,
    error,
  };
}
