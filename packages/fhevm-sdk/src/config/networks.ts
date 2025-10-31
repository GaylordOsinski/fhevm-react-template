/**
 * Network configurations for FHEVM SDK
 */

import type { NetworkConfig } from '../core/types';

export const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    gatewayUrl: 'https://gateway.sepolia.zama.ai',
  },
  localhost: {
    chainId: 31337,
    name: 'Local Hardhat Network',
    rpcUrl: 'http://localhost:8545',
    gatewayUrl: 'http://localhost:8546',
  },
  zama: {
    chainId: 8009,
    name: 'Zama Devnet',
    rpcUrl: 'https://devnet.zama.ai',
    gatewayUrl: 'https://gateway.devnet.zama.ai',
  },
};
