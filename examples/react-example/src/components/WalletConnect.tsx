/**
 * WalletConnect Component
 *
 * Displays wallet connection status and provides connect/disconnect functionality
 */

import React from 'react';
import { useFhevmDemo } from '../hooks/useFhevmDemo';

export function WalletConnect() {
  const {
    account,
    chainId,
    isConnected,
    isMetaMaskInstalled,
    isInitialized,
    network,
    connectWallet,
    disconnectWallet,
    formatAddress,
  } = useFhevmDemo();

  const [isConnecting, setIsConnecting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await connectWallet();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setError(null);
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div>
              <h3 className="text-lg font-semibold text-white">MetaMask Not Found</h3>
              <p className="text-sm text-gray-400">Please install MetaMask to use this app</p>
            </div>
          </div>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isConnected ? 'Connected' : 'Disconnected'}
              </h3>
              {isConnected && account && (
                <p className="text-sm text-gray-400 font-mono">{formatAddress(account)}</p>
              )}
            </div>
          </div>

          {/* Connect/Disconnect Button */}
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="btn btn-secondary"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="btn btn-primary"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>

        {/* Network Info */}
        {isConnected && (
          <div className="pt-4 border-t border-gray-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network:</span>
              <span className="text-white font-medium">{network}</span>
            </div>
            {chainId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Chain ID:</span>
                <span className="text-white font-mono">{chainId}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">FHEVM Status:</span>
              <span
                className={`font-medium ${
                  isInitialized ? 'text-green-400' : 'text-yellow-400'
                }`}
              >
                {isInitialized ? 'Initialized' : 'Initializing...'}
              </span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Info Message */}
        {!isConnected && !error && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
            <p className="text-sm text-blue-400">
              Connect your wallet to start using FHEVM encryption features
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
