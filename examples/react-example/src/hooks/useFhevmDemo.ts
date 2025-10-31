/**
 * Custom hook for FHEVM demo functionality
 *
 * This hook provides a simplified interface for common FHEVM operations
 * including wallet connection, encryption, and decryption.
 */

import { useState, useEffect, useCallback } from 'react';
import { useFhevmClient } from '@fhevm-sdk/core/react';
import { useEncrypt } from '@fhevm-sdk/core/react';
import { useDecrypt } from '@fhevm-sdk/core/react';
import {
  requestAccounts,
  getAccount,
  getChainId,
  isMetaMaskInstalled,
  formatAddress,
} from '../lib/fhevm-client';

export interface UseFhevmDemoReturn {
  // Wallet state
  account: string | null;
  chainId: string | null;
  isConnected: boolean;
  isMetaMaskInstalled: boolean;

  // FHEVM state
  isInitialized: boolean;
  network: string;

  // Encryption state
  encryptedValue: string | null;
  isEncrypting: boolean;
  encryptError: Error | null;

  // Decryption state
  decryptedValue: string | null;
  isDecrypting: boolean;
  decryptError: Error | null;

  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  encryptNumber: (value: number) => Promise<void>;
  decryptNumber: (ciphertext: string, contractAddress: string) => Promise<void>;
  clearEncryption: () => void;
  clearDecryption: () => void;

  // Utilities
  formatAddress: (address: string) => string;
}

export function useFhevmDemo(): UseFhevmDemoReturn {
  // Wallet state
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // FHEVM hooks
  const { client, isInitialized, network } = useFhevmClient();
  const {
    encrypt32,
    isLoading: isEncrypting,
    error: encryptError,
  } = useEncrypt();
  const {
    decrypt,
    isLoading: isDecrypting,
    error: decryptError,
  } = useDecrypt();

  // Encryption/Decryption state
  const [encryptedValue, setEncryptedValue] = useState<string | null>(null);
  const [decryptedValue, setDecryptedValue] = useState<string | null>(null);

  // Check if MetaMask is installed
  const metaMaskInstalled = isMetaMaskInstalled();

  /**
   * Load initial wallet state
   */
  useEffect(() => {
    async function loadWalletState() {
      if (!metaMaskInstalled) return;

      try {
        const currentAccount = await getAccount();
        const currentChainId = await getChainId();

        if (currentAccount) {
          setAccount(currentAccount);
          setChainId(currentChainId);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error loading wallet state:', error);
      }
    }

    loadWalletState();
  }, [metaMaskInstalled]);

  /**
   * Listen for account changes
   */
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        setAccount(null);
        setIsConnected(false);
      } else {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    };

    const handleChainChanged = (newChainId: string) => {
      setChainId(newChainId);
      // Reload the page as recommended by MetaMask
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  /**
   * Connect wallet
   */
  const connectWallet = useCallback(async () => {
    if (!metaMaskInstalled) {
      throw new Error('MetaMask not installed');
    }

    try {
      const accounts = await requestAccounts();
      const currentChainId = await getChainId();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setChainId(currentChainId);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }, [metaMaskInstalled]);

  /**
   * Disconnect wallet (clear state only, MetaMask doesn't support true disconnect)
   */
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setIsConnected(false);
    setEncryptedValue(null);
    setDecryptedValue(null);
  }, []);

  /**
   * Encrypt a number using FHEVM
   */
  const encryptNumber = useCallback(
    async (value: number) => {
      if (!isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      try {
        const result = await encrypt32(value);
        setEncryptedValue(result.data);
        setDecryptedValue(null); // Clear previous decryption
      } catch (error) {
        console.error('Encryption error:', error);
        throw error;
      }
    },
    [isInitialized, encrypt32]
  );

  /**
   * Decrypt a ciphertext using FHEVM
   */
  const decryptNumber = useCallback(
    async (ciphertext: string, contractAddress: string) => {
      if (!isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      try {
        const result = await decrypt(ciphertext, contractAddress);
        setDecryptedValue(result.toString());
      } catch (error) {
        console.error('Decryption error:', error);
        throw error;
      }
    },
    [isInitialized, decrypt]
  );

  /**
   * Clear encryption state
   */
  const clearEncryption = useCallback(() => {
    setEncryptedValue(null);
  }, []);

  /**
   * Clear decryption state
   */
  const clearDecryption = useCallback(() => {
    setDecryptedValue(null);
  }, []);

  return {
    // Wallet state
    account,
    chainId,
    isConnected,
    isMetaMaskInstalled: metaMaskInstalled,

    // FHEVM state
    isInitialized,
    network,

    // Encryption state
    encryptedValue,
    isEncrypting,
    encryptError,

    // Decryption state
    decryptedValue,
    isDecrypting,
    decryptError,

    // Actions
    connectWallet,
    disconnectWallet,
    encryptNumber,
    decryptNumber,
    clearEncryption,
    clearDecryption,

    // Utilities
    formatAddress,
  };
}
