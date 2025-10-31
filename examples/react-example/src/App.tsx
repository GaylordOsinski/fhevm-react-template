/**
 * Main App Component
 *
 * FHEVM React Example - Demonstrating Fully Homomorphic Encryption
 */

import React from 'react';
import { FhevmProvider } from '@fhevm-sdk/core/react';
import { WalletConnect } from './components/WalletConnect';
import { EncryptionDemo } from './components/EncryptionDemo';
import { DecryptionDemo } from './components/DecryptionDemo';
import { getEthereumProvider } from './lib/fhevm-client';
import './App.css';

function App() {
  const provider = getEthereumProvider();

  return (
    <FhevmProvider
      network="sepolia"
      provider={provider}
      gatewayUrl="https://gateway.zama.ai"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">FHEVM React Example</h1>
                  <p className="text-sm text-gray-400">
                    Fully Homomorphic Encryption Demo
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://docs.zama.ai/fhevm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="https://github.com/zama-ai/fhevm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="mb-8">
              <div className="card">
                <h2 className="text-xl font-bold text-white mb-3">
                  Welcome to FHEVM React Example
                </h2>
                <p className="text-gray-400 mb-4">
                  This example demonstrates how to integrate the FHEVM SDK into a React
                  application. You can encrypt and decrypt data using Fully Homomorphic
                  Encryption (FHE), enabling privacy-preserving computations on the
                  blockchain.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                    React 18
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                    FHEVM SDK
                  </span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                    Vite
                  </span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-medium rounded-full">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="mb-8">
              <WalletConnect />
            </div>

            {/* Demo Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Encryption Demo */}
              <EncryptionDemo />

              {/* Decryption Demo */}
              <DecryptionDemo />
            </div>

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Privacy First</h3>
                </div>
                <p className="text-sm text-gray-400">
                  All data is encrypted using FHE, ensuring complete privacy while
                  enabling computations on encrypted data.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Developer Friendly</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Simple React hooks and components make it easy to integrate FHEVM
                  into your application.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Production Ready</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Built with TypeScript, includes error handling, loading states, and
                  follows React best practices.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Built with FHEVM SDK by Zama
              </p>
            </div>
          </div>
        </main>
      </div>
    </FhevmProvider>
  );
}

export default App;
