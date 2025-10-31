'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt, useFhevmClient } from '@fhevm-sdk/core/react';

export default function Home() {
  const { isInitialized, network } = useFhevmClient();
  const { encrypt32, isLoading: encryptLoading } = useEncrypt();
  const { decrypt, isLoading: decryptLoading } = useDecrypt();

  const [value, setValue] = useState('');
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [decryptedValue, setDecryptedValue] = useState<string>('');
  const [contractAddress, setContractAddress] = useState('');

  const handleEncrypt = async () => {
    try {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        alert('Please enter a valid number');
        return;
      }

      const result = await encrypt32(numValue);
      setEncryptedData(Array.from(result.data).join(','));
      alert('Value encrypted successfully!');
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Encryption failed: ' + (error as Error).message);
    }
  };

  const handleDecrypt = async () => {
    try {
      if (!contractAddress) {
        alert('Please enter a contract address');
        return;
      }

      // This is a demo - in real usage you'd get ciphertext from contract
      alert('Decryption requires a real encrypted value from a contract');
    } catch (error) {
      console.error('Decryption failed:', error);
      alert('Decryption failed: ' + (error as Error).message);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">FHEVM Next.js Example</h1>
          <p className="text-gray-600">
            Demonstrating the FHEVM SDK with Next.js
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Status: {isInitialized ? '✅ Initialized' : '⏳ Initializing...'}</p>
            <p className="text-sm text-gray-600">Network: {network}</p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Encryption Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Encrypt Data</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter a number (0 - 4,294,967,295):
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter value to encrypt"
                />
              </div>
              <button
                onClick={handleEncrypt}
                disabled={!isInitialized || encryptLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {encryptLoading ? 'Encrypting...' : 'Encrypt'}
              </button>
              {encryptedData && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Encrypted Data:</p>
                  <div className="p-3 bg-gray-50 rounded text-xs break-all">
                    {encryptedData.substring(0, 100)}...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decryption Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Decrypt Data</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contract Address:
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="0x..."
                />
              </div>
              <button
                onClick={handleDecrypt}
                disabled={!isInitialized || decryptLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {decryptLoading ? 'Decrypting...' : 'Decrypt'}
              </button>
              {decryptedValue && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Decrypted Value:</p>
                  <div className="p-3 bg-gray-50 rounded font-mono">
                    {decryptedValue}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>1. Encryption:</strong> The SDK uses Zama's FHEVM to encrypt
              your data client-side before sending to the blockchain.
            </p>
            <p>
              <strong>2. Computation:</strong> Smart contracts can perform operations
              on encrypted data without decrypting it.
            </p>
            <p>
              <strong>3. Decryption:</strong> Only authorized users can decrypt values
              using EIP-712 signatures.
            </p>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>Built with FHEVM SDK • Powered by Zama</p>
        </footer>
      </div>
    </main>
  );
}
