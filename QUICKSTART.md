# Quick Start Guide

Get started with FHEVM Universal SDK in under 10 minutes!

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Clone or navigate to project
cd fhevm-universal-sdk

# Install all dependencies
npm install

# Bootstrap workspaces
npm run bootstrap
```

### Step 2: Build SDK (1 minute)

```bash
npm run build:sdk
```

### Step 3: Run Example (2 minutes)

```bash
# Start Next.js example
npm run dev:nextjs

# Open http://localhost:3000
```

That's it! 🎉 You now have a working FHEVM application.

---

## 🎯 Your First Encrypted Transaction

### 1. Basic Encryption Example

Create a new file `my-first-encryption.js`:

```javascript
import { createFhevmClient } from '@fhevm-sdk/core';

async function main() {
  // 1. Initialize client
  console.log('🔧 Initializing FHEVM client...');
  const client = await createFhevmClient({
    provider: window.ethereum,
    network: 'sepolia',
  });

  // 2. Encrypt a value
  console.log('🔐 Encrypting value 1000...');
  const encrypted = await client.encrypt32(1000);
  console.log('✅ Encrypted!', encrypted);

  // 3. Use in contract (example)
  console.log('📝 Ready to use in smart contract!');
  console.log('Encrypted data:', encrypted.data);
}

main();
```

### 2. React Component Example

```tsx
import { useEncrypt } from '@fhevm-sdk/core/react';

function MyFirstComponent() {
  const { encrypt32, isLoading } = useEncrypt();

  const handleEncrypt = async () => {
    const result = await encrypt32(1000);
    console.log('Encrypted!', result);
    alert('Value encrypted successfully!');
  };

  return (
    <button onClick={handleEncrypt} disabled={isLoading}>
      {isLoading ? 'Encrypting...' : 'Encrypt 1000'}
    </button>
  );
}
```

### 3. Full Contract Interaction

```tsx
import { useEncrypt, useContract } from '@fhevm-sdk/core/react';

const CONTRACT_ADDRESS = '0x...';
const CONTRACT_ABI = [...];

function SubmitEncryptedData() {
  const { encrypt32 } = useEncrypt();
  const { writeContract, isLoading } = useContract();

  const handleSubmit = async () => {
    // 1. Encrypt the value
    const encrypted = await encrypt32(1000);

    // 2. Send to smart contract
    await writeContract({
      contractAddress: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitEncryptedValue',
      args: [encrypted.data],
    });

    alert('Transaction sent!');
  };

  return (
    <button onClick={handleSubmit} disabled={isLoading}>
      Submit Encrypted Value
    </button>
  );
}
```

---

## 🏗️ Project Setup Options

### Option A: Use Existing Examples

**Fastest way to start:**

```bash
# Next.js (recommended)
npm run dev:nextjs

# React
npm run dev:react

# Agriculture Insurance
npm run dev:agriculture
```

### Option B: Create New Next.js App

```bash
# Create new Next.js app
npx create-next-app@latest my-fhevm-app
cd my-fhevm-app

# Install SDK
npm install @fhevm-sdk/core ethers

# Copy provider setup from examples/nextjs-example/src/app/providers.tsx
```

### Option C: Add to Existing Project

```bash
# In your existing project
npm install @fhevm-sdk/core ethers

# Then use the SDK
import { createFhevmClient } from '@fhevm-sdk/core';
```

---

## 🎓 Learning Path

### Day 1: Basics
1. ✅ Run Next.js example
2. ✅ Understand encryption flow
3. ✅ Try different encryption types
4. ✅ Connect MetaMask

### Day 2: Integration
1. ✅ Deploy example contract
2. ✅ Interact with contract
3. ✅ Decrypt values
4. ✅ Handle errors

### Day 3: Build
1. ✅ Create your own contract
2. ✅ Build custom UI
3. ✅ Implement full flow
4. ✅ Deploy to testnet

---

## 📖 Next Steps

### Explore Examples

1. **Next.js Example** (`examples/nextjs-example`)
   - Modern Next.js 14 app
   - Full FHEVM integration
   - Tailwind CSS styling

2. **Agriculture Insurance** (`examples/agriculture-insurance`)
   - Real-world use case
   - Complete workflow
   - Privacy-preserving logic

### Read Documentation

- [Main README](./README.md) - Complete overview
- [API Reference](./README.md#sdk-api-reference) - All SDK methods
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [Contributing](./CONTRIBUTING.md) - Contribute to SDK

### Deploy Contracts

```bash
# Local testing
npm run node              # Terminal 1
npm run deploy:localhost  # Terminal 2

# Sepolia testnet
npm run deploy:sepolia
```

### Join Community

- 💬 [Zama Discord](https://discord.com/invite/zama)
- 📖 [Zama Docs](https://docs.zama.ai/)
- 🐦 [Twitter](https://twitter.com/zama_fhe)

---

## 🐛 Common Issues

### Issue: "FHEVM client not initialized"

**Solution:**
```tsx
// Make sure you wrap your app with FhevmProvider
<FhevmProvider network="sepolia" provider={window.ethereum}>
  <App />
</FhevmProvider>
```

### Issue: "MetaMask not detected"

**Solution:**
1. Install MetaMask browser extension
2. Reload the page
3. Connect your wallet

### Issue: "Network mismatch"

**Solution:**
```bash
# In MetaMask, switch to Sepolia testnet
# Or update your config to match current network
```

### Issue: Build fails

**Solution:**
```bash
# Clean and rebuild
npm run clean
rm -rf node_modules
npm install
npm run build:sdk
```

---

## ✅ Checklist

Before you start building:

- [ ] Node.js >= 16.0.0 installed
- [ ] MetaMask extension installed
- [ ] Connected to Sepolia testnet
- [ ] Have Sepolia ETH from faucet
- [ ] SDK built successfully
- [ ] Example running locally

---

## 🎬 Video Tutorial

Watch [demo.mp4](./demo.mp4) for a complete walkthrough:
- ✅ Installation and setup
- ✅ Running examples
- ✅ Encryption and decryption
- ✅ Contract deployment
- ✅ Full application flow

---

## 💡 Pro Tips

### 1. Use TypeScript

TypeScript provides excellent autocomplete and type safety:

```typescript
import type { EncryptionResult } from '@fhevm-sdk/core';

const result: EncryptionResult = await client.encrypt32(1000);
```

### 2. Handle Errors Gracefully

```typescript
try {
  const encrypted = await encrypt32(value);
} catch (error) {
  console.error('Encryption failed:', error);
  // Show user-friendly error message
}
```

### 3. Test Locally First

Always test on localhost before deploying to testnet:

```bash
npm run node              # Start local node
npm run deploy:localhost  # Deploy locally
npm run dev:nextjs        # Test frontend
```

### 4. Monitor Gas Usage

FHE operations can be expensive:

```typescript
// Check gas before sending
const gasEstimate = await contract.estimateGas.submitEncryptedValue(data);
console.log('Estimated gas:', gasEstimate.toString());
```

---

## 🚀 Ready to Build?

You're all set! Start building privacy-preserving dApps:

1. **Choose a use case** (DeFi, Gaming, Healthcare, etc.)
2. **Design your contract** (what data needs encryption?)
3. **Build your UI** (using SDK hooks)
4. **Test thoroughly** (local → testnet → mainnet)
5. **Deploy and share** (show the world!)

---

## 📞 Need Help?

- 📖 [Full Documentation](./README.md)
- 💬 [GitHub Issues](https://github.com/your-repo/issues)
- 🎓 [Zama Docs](https://docs.zama.ai/)
- 💬 [Discord Community](https://discord.com/invite/zama)

---

**Happy Building! 🎉**

*Making confidential computing simple, one encryption at a time.*
