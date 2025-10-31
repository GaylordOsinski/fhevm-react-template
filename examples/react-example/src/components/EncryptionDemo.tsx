/**
 * EncryptionDemo Component
 *
 * Demonstrates encrypting numbers using FHEVM
 */

import React, { useState } from 'react';
import { useFhevmDemo } from '../hooks/useFhevmDemo';

export function EncryptionDemo() {
  const {
    isConnected,
    isInitialized,
    encryptedValue,
    isEncrypting,
    encryptError,
    encryptNumber,
    clearEncryption,
  } = useFhevmDemo();

  const [inputValue, setInputValue] = useState<string>('42');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    setLocalError(null);

    // Validate input
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      setLocalError('Please enter a valid number');
      return;
    }

    if (numValue < 0 || numValue > 4294967295) {
      setLocalError('Number must be between 0 and 4,294,967,295 (uint32)');
      return;
    }

    try {
      await encryptNumber(numValue);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleClear = () => {
    clearEncryption();
    setLocalError(null);
  };

  const handleCopy = async () => {
    if (encryptedValue) {
      try {
        await navigator.clipboard.writeText(encryptedValue);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const isDisabled = !isConnected || !isInitialized || isEncrypting;

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Encryption Demo</h3>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
            FHEVM Encrypt
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400">
          Encrypt a number using Fully Homomorphic Encryption. The encrypted value can be
          used in smart contracts while keeping the actual value private.
        </p>

        {/* Input Section */}
        <div className="space-y-2">
          <label htmlFor="encrypt-input" className="label">
            Number to Encrypt (uint32)
          </label>
          <div className="flex space-x-2">
            <input
              id="encrypt-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number (0 - 4,294,967,295)"
              className="input flex-1"
              disabled={isDisabled}
              min="0"
              max="4294967295"
            />
            <button
              onClick={handleEncrypt}
              disabled={isDisabled}
              className="btn btn-primary whitespace-nowrap"
            >
              {isEncrypting ? (
                <span className="flex items-center space-x-2">
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
                  <span>Encrypting...</span>
                </span>
              ) : (
                'Encrypt'
              )}
            </button>
          </div>
        </div>

        {/* Encrypted Result */}
        {encryptedValue && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="label">Encrypted Value</label>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="text-xs text-blue-400 hover:text-blue-300"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
                <button
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-gray-300"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-green-500/30">
              <p className="text-xs text-green-400 font-mono break-all">
                {encryptedValue}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-400"
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
              <span>Successfully encrypted using FHEVM</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {(localError || encryptError) && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{localError || encryptError?.message}</p>
          </div>
        )}

        {/* Status Messages */}
        {!isConnected && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <p className="text-sm text-yellow-400">
              Please connect your wallet to use encryption features
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
            <li>• Enter a number between 0 and 4,294,967,295</li>
            <li>• Click "Encrypt" to encrypt using FHEVM</li>
            <li>• The encrypted value can be used in smart contracts</li>
            <li>• The original value remains private and secure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
