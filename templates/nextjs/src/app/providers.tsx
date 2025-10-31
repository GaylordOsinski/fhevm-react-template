'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FhevmProvider } from '@fhevm-sdk/core/react';

export function Providers({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">MetaMask Required</h2>
          <p>Please install MetaMask to use this application</p>
        </div>
      </div>
    );
  }

  return (
    <FhevmProvider network="sepolia" provider={provider}>
      {children}
    </FhevmProvider>
  );
}
