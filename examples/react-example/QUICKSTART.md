# FHEVM React Example - Quick Start Guide

Get up and running with the FHEVM React example in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MetaMask browser extension
- Basic knowledge of React

## Quick Setup

### 1. Install Dependencies

```bash
cd examples/react-example
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at http://localhost:3000

### 3. Connect MetaMask

1. Click "Connect Wallet" button
2. Approve connection in MetaMask
3. Switch to Sepolia testnet if needed

### 4. Try Encryption

1. Enter a number (e.g., 42)
2. Click "Encrypt"
3. Copy the encrypted value

### 5. Try Decryption

1. Use the encrypted value from step 4
2. Enter a contract address
3. Click "Decrypt Value"

## That's It!

You now have a working FHEVM React application. 🎉

## Next Steps

- Read the [full README](./README.md) for detailed documentation
- Explore the [components](./src/components/) to see how they work
- Check out the [custom hook](./src/hooks/useFhevmDemo.ts) implementation
- Build your own features using the FHEVM SDK

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── WalletConnect.tsx
│   ├── EncryptionDemo.tsx
│   └── DecryptionDemo.tsx
├── hooks/              # Custom hooks
│   └── useFhevmDemo.ts
├── lib/                # Utilities
│   └── fhevm-client.ts
├── App.tsx             # Main app
└── main.tsx            # Entry point
```

## Key Components

### WalletConnect
Handles MetaMask connection and displays wallet info.

### EncryptionDemo
Encrypt numbers using FHEVM with a simple interface.

### DecryptionDemo
Decrypt encrypted values with contract address input.

### useFhevmDemo Hook
Custom hook that provides all FHEVM functionality.

## Troubleshooting

### Port already in use?
```bash
# Use a different port
npm run dev -- --port 3001
```

### MetaMask not detected?
- Install MetaMask extension
- Refresh the page
- Check browser console for errors

### Build errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [Full README](./README.md)
- [FHEVM Docs](https://docs.zama.ai/fhevm)
- [React Docs](https://react.dev)

---

**Need help?** Check the [full README](./README.md) or open an issue on GitHub.
