/**
 * DecryptionDemo Component
 *
 * Demonstrates decrypting encrypted values using FHEVM
 */

import React, { useState } from 'react';
import { useFhevmDemo } from '../hooks/useFhevmDemo';

export function DecryptionDemo() {
  const {
    isConnected,
    isInitialized,
    encryptedValue,
    decryptedValue,
    isDecrypting,
    decryptError,
    decryptNumber,
    clearDecryption,
  } = useFhevmDemo();

  const [ciphertextInput, setCiphertextInput] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  // Auto-fill ciphertext from encryption demo
  React.useEffect(() => {
    if (encryptedValue && !ciphertextInput) {
      setCiphertextInput(encryptedValue);
    }
  }, [encryptedValue]);

  const handleDecrypt = async () => {
    setLocalError(null);

    // Validate inputs
    if (!ciphertextInput.trim()) {
      setLocalError('Please enter a ciphertext value');
      return;
    }

    if (!contractAddress.trim()) {
      setLocalError('Please enter a contract address');
      return;
    }

    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      setLocalError('Invalid contract address format');
      return;
    }

    try {
      await decryptNumber(ciphertextInput, contractAddress);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  const handleClear = () => {
    clearDecryption();
    setLocalError(null);
  };

  const handleUseEncrypted = () => {
    if (encryptedValue) {
      setCiphertextInput(encryptedValue);
      setLocalError(null);
    }
  };

  const isDisabled = !isConnected || !isInitialized || isDecrypting;

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Decryption Demo</h3>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
            FHEVM Decrypt
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400">
          Decrypt an encrypted value from a smart contract. You need the ciphertext and
          the contract address to perform decryption.
        </p>

        {/* Ciphertext Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="ciphertext-input" className="label">
              Encrypted Value (Ciphertext)
            </label>
            {encryptedValue && (
              <button
                onClick={handleUseEncrypted}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Use encrypted value
              </button>
            )}
          </div>
          <textarea
            id="ciphertext-input"
            value={ciphertextInput}
            onChange={(e) => setCiphertextInput(e.target.value)}
            placeholder="0x..."
            className="input min-h-[80px] resize-none font-mono text-xs"
            disabled={isDisabled}
          />
        </div>

        {/* Contract Address Input */}
        <div className="space-y-2">
          <label htmlFor="contract-input" className="label">
            Contract Address
          </label>
          <input
            id="contract-input"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="input font-mono"
            disabled={isDisabled}
          />
          <p className="text-xs text-gray-500">
            Enter the address of the contract that owns this encrypted value
          </p>
        </div>

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          disabled={isDisabled}
          className="btn btn-primary w-full"
        >
          {isDecrypting ? (
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Decrypting...</span>
            </span>
          ) : (
            'Decrypt Value'
          )}
        </button>

        {/* Decrypted Result */}
        {decryptedValue && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="label">Decrypted Value</label>
              <button
                onClick={handleClear}
                className="text-xs text-gray-400 hover:text-gray-300"
              >
                Clear
              </button>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg border border-purple-500/30">
              <p className="text-3xl text-purple-400 font-bold text-center">
                {decryptedValue}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Successfully decrypted using FHEVM</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {(localError || decryptError) && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{localError || decryptError?.message}</p>
          </div>
        )}

        {/* Status Messages */}
        {!isConnected && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <p className="text-sm text-yellow-400">
              Please connect your wallet to use decryption features
            </p>
          </div>
        )}

        {isConnected && !isInitialized && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
            <p className="text-sm text-blue-400">
              Initializing FHEVM client...
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h4 className="text-sm font-semibold text-white mb-2">How it works:</h4>
          <ul className="space-y-1 text-xs text-gray-400">
            <li>• Paste the encrypted ciphertext from a contract</li>
            <li>• Enter the contract address that owns the value</li>
            <li>• Click "Decrypt" to reveal the original value</li>
            <li>• Requires proper permissions and access control</li>
          </ul>
        </div>

        {/* Warning */}
        <div className="p-3 bg-orange-500/10 border border-orange-500/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="text-sm text-orange-400 font-medium">Note:</p>
              <p className="text-xs text-orange-400/80 mt-1">
                This is a demo. In production, decryption requires proper access control
                and you must be authorized to decrypt the value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
