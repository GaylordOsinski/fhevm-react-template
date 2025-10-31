/**
 * useFhevmClient - Access FHEVM client instance
 *
 * @example
 * ```tsx
 * const { client, isInitialized } = useFhevmClient();
 *
 * if (isInitialized) {
 *   const encrypted = await client.encrypt32(1000);
 * }
 * ```
 */

import { useFhevmContext } from '../context/FhevmContext';
import type { FhevmClient } from '../../core/FhevmClient';

export interface UseFhevmClientReturn {
  client: FhevmClient | null;
  isInitialized: boolean;
  network: string;
}

export function useFhevmClient(): UseFhevmClientReturn {
  const { client, isInitialized, network } = useFhevmContext();
  return { client, isInitialized, network };
}
