# FHEVM Universal SDK

> **Universal, framework-agnostic SDK for building confidential dApps with Fully Homomorphic Encryption**

A production-ready, developer-friendly SDK that makes building privacy-preserving blockchain applications as simple as using wagmi or ethers.js. Compatible with React, Next.js, Vue, Node.js, and any frontend framework.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![FHEVM](https://img.shields.io/badge/FHEVM-0.6.0-green)](https://docs.zama.ai/)

📹 **[Video Demo](./demo.mp4)** | 🚀 **[Live Next.js Demo](#examples)** | 📦 **[NPM Package](#installation)**

---

## 🎯 What is This?

The **FHEVM Universal SDK** is a comprehensive toolkit that simplifies building confidential blockchain applications using Zama's Fully Homomorphic Encryption (FHE). It wraps all necessary packages and provides a clean, intuitive API similar to popular Web3 libraries like wagmi.

### Why This SDK?

**Before FHEVM SDK:**
```javascript
// Complex setup with multiple dependencies
import { initFhevm } from 'fhevmjs';
import { createInstance } from 'fhevmjs';
// Manual EIP-712 signature creation
// Complex error handling
// Framework-specific integration
// 50+ lines of boilerplate code
```

**With FHEVM SDK:**
```javascript
// Simple, clean integration
import { createFhevmClient } from '@fhevm-sdk/core';

const client = await createFhevmClient({
  provider: window.ethereum,
  network: 'sepolia',
});

const encrypted = await client.encrypt32(1000);
// Just works! ✨
```

---

## ✨ Key Features

### 🎨 **Framework Agnostic**
- ✅ Works with React, Next.js, Vue, Svelte, Angular
- ✅ Node.js backend support
- ✅ Vanilla JavaScript compatible
- ✅ TypeScript-first with full type safety

### 🔒 **Complete Privacy Toolkit**
- ✅ Client-side encryption (euint8, euint16, euint32, euint64, ebool, eaddress)
- ✅ EIP-712 signature-based decryption
- ✅ Public decryption for allowed values
- ✅ Access control management

### ⚡ **Developer Experience**
- ✅ Wagmi-like React hooks (`useEncrypt`, `useDecrypt`, `useContract`)
- ✅ < 10 lines to get started
- ✅ Comprehensive TypeScript types
- ✅ Minimal dependencies
- ✅ Automatic provider detection

### 🚀 **Production Ready**
- ✅ Multi-network support (Sepolia, Zama Devnet, Localhost)
- ✅ Error handling and validation
- ✅ Gas optimization
- ✅ Battle-tested with real applications

---

## 🚀 Quick Start

### Installation

```bash
# From root directory
npm install

# Bootstrap all packages
npm run bootstrap

# Build the SDK
npm run build:sdk
```

### Basic Usage (Vanilla JavaScript)

```javascript
import { createFhevmClient } from '@fhevm-sdk/core';

// 1. Initialize client
const client = await createFhevmClient({
  provider: window.ethereum,
  network: 'sepolia',
});

// 2. Encrypt data
const encrypted = await client.encrypt32(1000);

// 3. Use in contract call
await contract.submitEncryptedValue(encrypted.data);

// 4. Decrypt result
const decrypted = await client.decrypt(ciphertext, contractAddress);
```

### React Integration

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm-sdk/core/react';

// 1. Wrap your app
function App() {
  return (
    <FhevmProvider network="sepolia" provider={window.ethereum}>
      <YourComponents />
    </FhevmProvider>
  );
}

// 2. Use hooks in components
function EncryptionDemo() {
  const { encrypt32, isLoading } = useEncrypt();
  const { decrypt } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt32(1000);
    console.log('Encrypted!', result);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Next.js Integration

See [`examples/nextjs-example`](./examples/nextjs-example) for a complete Next.js 14 App Router example.

---

## 📦 Project Structure

```
fhevm-universal-sdk/
├── packages/
│   └── fhevm-sdk/              # Core SDK package
│       ├── src/
│       │   ├── core/           # Core client & utilities
│       │   │   ├── FhevmClient.ts
│       │   │   ├── types.ts
│       │   │   └── ...
│       │   ├── react/          # React hooks & providers
│       │   │   ├── hooks/
│       │   │   ├── provider/
│       │   │   └── context/
│       │   ├── config/         # Network configurations
│       │   └── utils/          # Helper functions
│       └── package.json
│
├── examples/
│   ├── nextjs-example/         # Next.js 14 App Router example
│   ├── react-example/          # React SPA example (planned)
│   └── agriculture-insurance/  # Real-world example
│
├── contracts/                  # Example smart contracts
│   └── PrivateAgricultureInsurance.sol
│
├── scripts/                    # Deployment scripts
│   └── deploy.js
│
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Root package.json (workspaces)
└── README.md                   # This file
```

---

## 🎓 Examples

### Example 1: Next.js Application

**Location:** `examples/nextjs-example`

A complete Next.js 14 application with:
- App Router architecture
- FHEVM SDK integration
- Tailwind CSS styling
- MetaMask connection
- Interactive encryption/decryption demo

**Run it:**
```bash
npm run dev:nextjs
```

### Example 2: Agriculture Insurance

**Location:** `examples/agriculture-insurance`

Real-world confidential insurance application featuring:
- Privacy-preserving policy creation
- Encrypted claim submission
- Confidential damage assessment
- Smart contract integration

**Features:**
- Encrypted coverage amounts (euint32)
- Private premium calculations
- Confidential claim processing
- Role-based access control

---

## 🛠️ SDK API Reference

### Core Client

#### `createFhevmClient(config)`

Factory function to create and initialize FHEVM client.

```typescript
import { createFhevmClient } from '@fhevm-sdk/core';

const client = await createFhevmClient({
  provider: window.ethereum,  // EIP-1193 provider
  network: 'sepolia',         // 'sepolia' | 'localhost' | 'zama'
  gatewayUrl?: string,        // Optional custom gateway
  rpcUrl?: string,            // Optional custom RPC
});
```

#### Encryption Methods

```typescript
// Encrypt 8-bit unsigned integer (0-255)
await client.encrypt8(value: number): Promise<EncryptionResult>

// Encrypt 16-bit unsigned integer (0-65535)
await client.encrypt16(value: number): Promise<EncryptionResult>

// Encrypt 32-bit unsigned integer (0-4294967295)
await client.encrypt32(value: number): Promise<EncryptionResult>

// Encrypt 64-bit unsigned integer
await client.encrypt64(value: bigint): Promise<EncryptionResult>

// Encrypt boolean
await client.encryptBool(value: boolean): Promise<EncryptionResult>

// Encrypt Ethereum address
await client.encryptAddress(address: string): Promise<EncryptionResult>
```

#### Decryption Methods

```typescript
// User decryption with EIP-712 signature
await client.decrypt(
  ciphertext: bigint | string,
  contractAddress: string
): Promise<bigint>

// Public decryption (for publicly accessible values)
await client.publicDecrypt(
  ciphertext: bigint | string,
  contractAddress: string
): Promise<bigint>
```

### React Hooks

#### `useFhevmClient()`

Access the FHEVM client instance.

```typescript
const { client, isInitialized, network } = useFhevmClient();
```

#### `useEncrypt()`

Hook for encrypting values.

```typescript
const {
  encrypt8,
  encrypt16,
  encrypt32,
  encrypt64,
  encryptBool,
  encryptAddress,
  isLoading,
  error,
} = useEncrypt();

// Usage
const result = await encrypt32(1000);
```

#### `useDecrypt()`

Hook for decrypting values.

```typescript
const { decrypt, publicDecrypt, isLoading, error } = useDecrypt();

// Usage
const decrypted = await decrypt(ciphertext, contractAddress);
```

#### `useContract()`

Hook for contract interactions.

```typescript
const { writeContract, readContract, isLoading, error } = useContract();

// Write (send transaction)
await writeContract({
  contractAddress: '0x...',
  abi: contractABI,
  functionName: 'createPolicy',
  args: [encryptedValue.data, ...otherArgs],
  value: 0n, // Optional ETH value
});

// Read (call view function)
const result = await readContract({
  contractAddress: '0x...',
  abi: contractABI,
  functionName: 'getPolicyCount',
  args: [],
});
```

---

## 🔧 Development Commands

### Root Level Commands

```bash
# Install all dependencies
npm run install:all

# Build SDK package
npm run build:sdk

# Run Next.js example
npm run dev:nextjs

# Run React example
npm run dev:react

# Run Agriculture Insurance example
npm run dev:agriculture

# Compile smart contracts
npm run compile:contracts

# Deploy contracts
npm run deploy:localhost
npm run deploy:sepolia

# Run tests
npm run test
npm run test:sdk

# Lint and format
npm run lint
npm run format

# Clean build artifacts
npm run clean
```

### SDK Development

```bash
cd packages/fhevm-sdk

# Build SDK
npm run build

# Run tests
npm run test

# Watch mode for development
npm run dev
```

---

## 📋 Smart Contract Integration

### Example Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@fhevm/solidity/TFHE.sol";

contract ConfidentialExample {
    mapping(address => euint32) private balances;

    function deposit(bytes calldata encryptedAmount) external {
        euint32 amount = FHE.asEuint32(encryptedAmount);
        balances[msg.sender] = FHE.add(balances[msg.sender], amount);
        FHE.allow(balances[msg.sender], msg.sender);
    }

    function getBalance() external view returns (euint32) {
        return balances[msg.sender];
    }
}
```

### Frontend Integration

```typescript
import { useEncrypt, useContract } from '@fhevm-sdk/core/react';

function DepositComponent() {
  const { encrypt32 } = useEncrypt();
  const { writeContract } = useContract();

  const handleDeposit = async (amount: number) => {
    // 1. Encrypt the amount
    const encrypted = await encrypt32(amount);

    // 2. Send to contract
    await writeContract({
      contractAddress: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'deposit',
      args: [encrypted.data],
    });
  };

  return <button onClick={() => handleDeposit(1000)}>Deposit</button>;
}
```

---

## 🌐 Network Support

| Network | Chain ID | Status | Gateway URL |
|---------|----------|--------|-------------|
| Sepolia Testnet | 11155111 | ✅ Supported | https://gateway.sepolia.zama.ai |
| Zama Devnet | 8009 | ✅ Supported | https://gateway.devnet.zama.ai |
| Local Hardhat | 31337 | ✅ Supported | http://localhost:8546 |

---

## 📊 Comparison with Other Solutions

| Feature | FHEVM SDK | fhevmjs alone | Custom Integration |
|---------|-----------|---------------|-------------------|
| Setup Lines | < 10 | ~50 | ~100+ |
| Framework Support | All | Manual | Manual |
| React Hooks | ✅ Built-in | ❌ None | 🔧 Build yourself |
| TypeScript | ✅ Full | ⚠️ Partial | 🔧 Build yourself |
| Error Handling | ✅ Built-in | 🔧 Manual | 🔧 Manual |
| Validation | ✅ Automatic | ❌ None | 🔧 Manual |
| Multi-network | ✅ Built-in | 🔧 Manual | 🔧 Manual |
| Documentation | ✅ Complete | ⚠️ Limited | ❌ None |
| Learning Curve | Low | Medium | High |

---

## 🎯 Use Cases

### 1. **Privacy-Preserving Finance**
- Confidential transactions
- Private balances
- Encrypted voting power
- Hidden bid auctions

### 2. **Healthcare Records**
- Encrypted patient data
- Private medical history
- Confidential prescriptions
- HIPAA-compliant storage

### 3. **Supply Chain**
- Confidential pricing
- Private inventory levels
- Encrypted supplier information
- Hidden cost structures

### 4. **Insurance** (See Example)
- Private policy amounts
- Confidential claims
- Encrypted risk assessments
- Hidden premium calculations

### 5. **Gaming**
- Hidden player stats
- Encrypted loot boxes
- Private inventory
- Confidential matchmaking

---

## 🔒 Security Best Practices

### 1. **Validate Input**
```typescript
// SDK handles validation automatically
await client.encrypt32(value); // Throws if value > 4,294,967,295
```

### 2. **Handle Errors**
```typescript
try {
  const encrypted = await encrypt32(value);
} catch (error) {
  console.error('Encryption failed:', error);
  // Handle error appropriately
}
```

### 3. **Manage Permissions**
```solidity
// In your contract
FHE.allow(encryptedValue, authorizedAddress);
```

### 4. **Secure Keys**
- Never commit private keys
- Use environment variables
- Use hardware wallets in production

---

## 🧪 Testing

### Run SDK Tests

```bash
cd packages/fhevm-sdk
npm run test
```

### Test Coverage

The SDK includes comprehensive tests for:
- ✅ Client initialization
- ✅ Encryption methods (all types)
- ✅ Decryption flows
- ✅ Error handling
- ✅ Validation logic
- ✅ React hooks
- ✅ Network configurations

---

## 🛣️ Roadmap

### Phase 1 - Core SDK ✅ (Current)
- [x] Framework-agnostic core client
- [x] React hooks and providers
- [x] TypeScript definitions
- [x] Multi-network support
- [x] Comprehensive documentation

### Phase 2 - Extended Support 🚧
- [ ] Vue 3 composables
- [ ] Svelte stores
- [ ] Angular services
- [ ] React Native support

### Phase 3 - Advanced Features 📅
- [ ] Encrypted token standards (ERC-20, ERC-721)
- [ ] Encrypted governance primitives
- [ ] SDK CLI for scaffolding
- [ ] Visual debugger

### Phase 4 - Ecosystem 🔮
- [ ] Official NPM package
- [ ] CDN distribution
- [ ] Plugin marketplace
- [ ] Developer grants program

---

## 🤝 Contributing

Contributions are welcome! This project is open source and built for the community.

### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd fhevm-universal-sdk

# Install dependencies
npm install

# Build SDK
npm run build:sdk

# Run examples
npm run dev:nextjs
```

### Guidelines

- Write TypeScript with full type safety
- Add tests for new features
- Update documentation
- Follow existing code style
- Create meaningful commit messages

---

## 📚 Resources

### Official Documentation
- 📖 [Zama FHEVM Docs](https://docs.zama.ai/)
- 📖 [fhevmjs Documentation](https://github.com/zama-ai/fhevmjs)
- 📖 [Solidity TFHE Library](https://github.com/zama-ai/fhevm)

### Community
- 💬 [Zama Discord](https://discord.com/invite/zama)
- 🐦 [Zama Twitter](https://twitter.com/zama_fhe)
- 🎓 [FHEVM Tutorials](https://docs.zama.ai/fhevm)

### Related Projects
- 🔗 [fhevm-react-template (original)](https://github.com/zama-ai/fhevm-react-template)
- 🔗 [FHEVM Hardhat Template](https://github.com/zama-ai/fhevm-hardhat-template)

---

## 🎬 Video Demonstration

**[Watch demo.mp4](./demo.mp4)** to see the SDK in action:

- ✅ Quick setup (< 5 minutes)
- ✅ Next.js integration
- ✅ Agriculture Insurance example
- ✅ Encryption and decryption flows
- ✅ Smart contract deployment

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2024 FHEVM SDK Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

### Built For
- **Zama FHEVM Bounty Challenge** - Building the next generation of privacy-preserving Web3

### Special Thanks
- **Zama Team** - For pioneering FHE technology and FHEVM
- **fhevmjs Contributors** - For the foundation library
- **Open Source Community** - For inspiration and support

---

## 📞 Support

### Questions?
- 📧 Create an issue in the repository
- 💬 Join [Zama Discord](https://discord.com/invite/zama)
- 📖 Check [Zama Documentation](https://docs.zama.ai/)

### Found a Bug?
Please open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details

---

<div align="center">

**Built with ❤️ for the Privacy-First Web3 Future**

*Making Confidential Computing Simple, Accessible, and Developer-Friendly*

⭐ **Star this repo if you find it useful!**

[📦 View Package](#installation) • [🚀 Quick Start](#quick-start) • [📖 API Docs](#sdk-api-reference) • [💡 Examples](#examples)

**Powered by Zama FHEVM** 🔐

</div>
