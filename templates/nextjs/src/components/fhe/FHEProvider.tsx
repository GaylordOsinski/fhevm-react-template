'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { FhevmProvider as SDKProvider } from '@fhevm-sdk/core/react';

interface FHEContextValue {
  isReady: boolean;
  error: string | null;
}

const FHEContext = createContext<FHEContextValue>({
  isReady: false,
  error: null,
});

export const useFHEContext = () => useContext(FHEContext);

interface FHEProviderProps {
  children: React.ReactNode;
  network?: 'sepolia' | 'localhost' | 'zama';
}

/**
 * FHE Provider Component
 * Wraps the application with FHEVM SDK provider and additional context
 */
export const FHEProvider: React.FC<FHEProviderProps> = ({
  children,
  network = 'sepolia',
}) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if window.ethereum is available
    if (typeof window !== 'undefined' && window.ethereum) {
      setIsReady(true);
    } else {
      setError('MetaMask not found. Please install MetaMask.');
    }
  }, []);

  return (
    <FHEContext.Provider value={{ isReady, error }}>
      <SDKProvider network={network} provider={typeof window !== 'undefined' ? window.ethereum : undefined}>
        {children}
      </SDKProvider>
    </FHEContext.Provider>
  );
};
