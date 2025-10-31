# FHEVM Next.js Example

This is a Next.js application demonstrating the usage of the FHEVM SDK.

## Features

- Client-side encryption using FHEVM SDK
- React hooks for easy integration (`useEncrypt`, `useDecrypt`, `useFhevmClient`)
- MetaMask wallet connection
- Tailwind CSS styling
- TypeScript support

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- MetaMask browser extension
- Sepolia testnet ETH

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Connect MetaMask

Make sure MetaMask is installed and connected to Sepolia testnet.

### 2. Encrypt Data

Enter a number and click "Encrypt" to see client-side encryption in action.

### 3. Decrypt Data

To decrypt data, you need:
- A deployed FHEVM contract address
- An encrypted value stored in that contract
- Permission to decrypt (granted by the contract)

## SDK Integration

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm-sdk/core/react';

// Wrap your app with FhevmProvider
<FhevmProvider network="sepolia" provider={window.ethereum}>
  <App />
</FhevmProvider>

// Use hooks in your components
const { encrypt32 } = useEncrypt();
const encrypted = await encrypt32(1000);
```

## Learn More

- [FHEVM SDK Documentation](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama Documentation](https://docs.zama.ai/)
