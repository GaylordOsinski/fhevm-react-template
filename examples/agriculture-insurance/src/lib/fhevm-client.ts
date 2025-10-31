/**
 * FHEVM Client Utility
 * Helper functions for working with the FHEVM SDK and Ethereum
 */

import { BrowserProvider } from 'ethers';

/**
 * Get the Ethereum provider from window.ethereum
 */
export function getEthereumProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum;
  }
  return null;
}

/**
 * Request account access from MetaMask
 */
export async function requestAccounts(): Promise<string[]> {
  const provider = getEthereumProvider();
  if (!provider) {
    throw new Error('MetaMask not detected. Please install MetaMask.');
  }

  try {
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    }) as string[];
    return accounts;
  } catch (error) {
    if ((error as any).code === 4001) {
      throw new Error('User rejected the connection request');
    }
    throw error;
  }
}

/**
 * Get the current connected account
 */
export async function getAccount(): Promise<string | null> {
  const provider = getEthereumProvider();
  if (!provider) return null;

  try {
    const accounts = await provider.request({
      method: 'eth_accounts'
    }) as string[];
    return accounts[0] || null;
  } catch (error) {
    console.error('Error getting account:', error);
    return null;
  }
}

/**
 * Get the current network/chain ID
 */
export async function getChainId(): Promise<string | null> {
  const provider = getEthereumProvider();
  if (!provider) return null;

  try {
    const chainId = await provider.request({
      method: 'eth_chainId'
    }) as string;
    return chainId;
  } catch (error) {
    console.error('Error getting chain ID:', error);
    return null;
  }
}

/**
 * Create an ethers BrowserProvider from window.ethereum
 */
export async function createProvider(): Promise<BrowserProvider> {
  const provider = getEthereumProvider();
  if (!provider) {
    throw new Error('MetaMask not detected');
  }
  return new BrowserProvider(provider);
}

/**
 * Format address for display (0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Check if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== 'undefined' && !!window.ethereum;
}

/**
 * Format date from timestamp
 */
export function formatDate(timestamp: bigint | number): string {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  return new Date(ts * 1000).toLocaleDateString();
}

/**
 * Format date and time from timestamp
 */
export function formatDateTime(timestamp: bigint | number): string {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  return new Date(ts * 1000).toLocaleString();
}

/**
 * Network configuration
 */
export const NETWORKS = {
  sepolia: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    rpcUrl: 'https://rpc.sepolia.org',
  },
  localhost: {
    chainId: '0x7a69',
    chainName: 'Local Network',
    rpcUrl: 'http://localhost:8545',
  },
} as const;

export type NetworkName = keyof typeof NETWORKS;

/**
 * Switch to a specific network
 */
export async function switchNetwork(networkName: NetworkName): Promise<void> {
  const provider = getEthereumProvider();
  if (!provider) {
    throw new Error('MetaMask not detected');
  }

  const network = NETWORKS[networkName];
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
  } catch (error: any) {
    // Network doesn't exist, try to add it
    if (error.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: network.chainId,
            chainName: network.chainName,
            rpcUrls: [network.rpcUrl],
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
