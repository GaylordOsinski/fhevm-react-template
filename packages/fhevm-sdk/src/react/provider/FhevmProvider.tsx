/**
 * FhevmProvider - React Provider for FHEVM Client
 *
 * Wrap your app with this provider to enable FHEVM hooks
 *
 * @example
 * ```tsx
 * import { FhevmProvider } from '@fhevm-sdk/core/react';
 *
 * function App() {
 *   return (
 *     <FhevmProvider network="sepolia" provider={window.ethereum}>
 *       <YourApp />
 *     </FhevmProvider>
 *   );
 * }
 * ```
 */

import React, { useEffect, useState, ReactNode } from 'react';
import { FhevmClient, createFhevmClient } from '../../core/FhevmClient';
import type { FhevmClientConfig, Network } from '../../core/types';
import { FhevmContext } from '../context/FhevmContext';

export interface FhevmProviderProps {
  children: ReactNode;
  network: Network;
  provider?: any;
  rpcUrl?: string;
  gatewayUrl?: string;
}

export function FhevmProvider({
  children,
  network,
  provider,
  rpcUrl,
  gatewayUrl,
}: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initClient() {
      try {
        const config: FhevmClientConfig = {
          network,
          provider,
          rpcUrl,
          gatewayUrl,
        };

        const fhevmClient = await createFhevmClient(config);

        if (isMounted) {
          setClient(fhevmClient);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Failed to initialize FHEVM client:', error);
      }
    }

    initClient();

    return () => {
      isMounted = false;
    };
  }, [network, provider, rpcUrl, gatewayUrl]);

  return (
    <FhevmContext.Provider value={{ client, isInitialized, network }}>
      {children}
    </FhevmContext.Provider>
  );
}
