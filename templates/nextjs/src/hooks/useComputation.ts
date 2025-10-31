/**
 * useComputation Hook
 * Hook for homomorphic computation operations
 */

import { useState, useCallback } from 'react';
import { useContract } from '@fhevm-sdk/core/react';

export type ComputationOperation = 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'ne' | 'gt' | 'lt';

export function useComputation() {
  const { writeContract, readContract, isLoading } = useContract();
  const [lastComputation, setLastComputation] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const performComputation = useCallback(async ({
    contractAddress,
    abi,
    functionName,
    encryptedOperands,
    operation,
  }: {
    contractAddress: string;
    abi: any[];
    functionName: string;
    encryptedOperands: Uint8Array[];
    operation: ComputationOperation;
  }) => {
    setError('');

    try {
      const result = await writeContract({
        contractAddress,
        abi,
        functionName,
        args: encryptedOperands,
      });

      setLastComputation({
        operation,
        functionName,
        timestamp: Date.now(),
        result,
      });

      return result;
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      throw err;
    }
  }, [writeContract]);

  const readComputationResult = useCallback(async ({
    contractAddress,
    abi,
    functionName,
    args = [],
  }: {
    contractAddress: string;
    abi: any[];
    functionName: string;
    args?: any[];
  }) => {
    setError('');

    try {
      const result = await readContract({
        contractAddress,
        abi,
        functionName,
        args,
      });

      return result;
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      throw err;
    }
  }, [readContract]);

  const simulateComputation = useCallback((
    operation: ComputationOperation,
    operand1: number,
    operand2: number
  ): number => {
    switch (operation) {
      case 'add':
        return operand1 + operand2;
      case 'sub':
        return operand1 - operand2;
      case 'mul':
        return operand1 * operand2;
      case 'div':
        return Math.floor(operand1 / operand2);
      case 'eq':
        return operand1 === operand2 ? 1 : 0;
      case 'ne':
        return operand1 !== operand2 ? 1 : 0;
      case 'gt':
        return operand1 > operand2 ? 1 : 0;
      case 'lt':
        return operand1 < operand2 ? 1 : 0;
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }, []);

  return {
    // Computation methods
    performComputation,
    readComputationResult,
    simulateComputation,

    // State
    isLoading,
    error,
    lastComputation,
  };
}
