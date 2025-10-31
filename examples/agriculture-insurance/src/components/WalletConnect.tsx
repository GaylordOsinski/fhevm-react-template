/**
 * WalletConnect Component
 * Handles wallet connection and displays connection status
 */

import { useState, useEffect } from 'react';
import { requestAccounts, getAccount, formatAddress, isMetaMaskInstalled } from '../lib/fhevm-client';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    const account = await getAccount();
    if (account) {
      setAddress(account);
      setConnected(true);
      onConnect(account);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      setAddress(null);
      setConnected(false);
    } else {
      // User switched accounts
      window.location.reload();
    }
  };

  const handleConnect = async () => {
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask to use this application');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accounts = await requestAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        setConnected(true);
        onConnect(account);
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect">
      {error && (
        <div className="alert alert-warning">
          {error}
        </div>
      )}

      {connected && address ? (
        <div className="wallet-info">
          <span className="wallet-address">{formatAddress(address)}</span>
          <button className="btn btn-success btn-sm" disabled>
            Connected
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}
