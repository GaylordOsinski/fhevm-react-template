/**
 * React Context for FHEVM Client
 */

import { createContext, useContext } from 'react';
import type { FhevmClient } from '../../core/FhevmClient';

export interface FhevmContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  network: string;
}

export const FhevmContext = createContext<FhevmContextValue | undefined>(undefined);

export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }
  return context;
}
