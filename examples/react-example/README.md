# FHEVM React Example

A complete React Single Page Application (SPA) demonstrating integration with the FHEVM SDK for Fully Homomorphic Encryption on the blockchain.

## Overview

This example showcases how to build a privacy-preserving dApp using React and FHEVM. It includes:

- Wallet connection with MetaMask
- Encryption of numbers using FHE
- Decryption of encrypted values
- Clean, modern UI with Tailwind CSS
- TypeScript for type safety
- React 18 features and best practices

## Features

### 🔐 Encryption Demo
- Encrypt numbers (uint32) using FHEVM
- Real-time encryption with loading states
- Copy encrypted values to clipboard
- Visual feedback for successful operations

### 🔓 Decryption Demo
- Decrypt encrypted values from contracts
- Input validation for ciphertext and contract addresses
- Auto-fill from encryption demo
- Clear error handling and user guidance

### 👛 Wallet Integration
- Connect/disconnect MetaMask wallet
- Display wallet address and network info
- Real-time connection status updates
- Network switching support

### 🎨 Modern UI/UX
- Dark theme with gradient backgrounds
- Responsive design for all screen sizes
- Loading states and error handling
- Accessibility-focused components

## Tech Stack

- **React 18** - UI library with hooks and modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **FHEVM SDK** - Fully Homomorphic Encryption
- **Ethers.js** - Ethereum wallet integration
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
react-example/
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx      # Wallet connection UI
│   │   ├── EncryptionDemo.tsx     # Encryption interface
│   │   └── DecryptionDemo.tsx     # Decryption interface
│   ├── hooks/
│   │   └── useFhevmDemo.ts        # Custom FHEVM hook
│   ├── lib/
│   │   └── fhevm-client.ts        # FHEVM utilities
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # Custom styles
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── tailwind.config.js              # Tailwind config
└── README.md                       # This file
```

## Prerequisites

Before running this example, ensure you have:

1. **Node.js** (v18 or higher)
2. **MetaMask** browser extension installed
3. **Sepolia testnet** ETH (for transactions)

## Installation

1. Navigate to this directory:
```bash
cd examples/react-example
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How to Use

### 1. Connect Your Wallet

1. Click **"Connect Wallet"** button
2. Approve the connection in MetaMask
3. Ensure you're on the Sepolia testnet

### 2. Encrypt a Number

1. Enter a number (0 - 4,294,967,295) in the encryption input
2. Click **"Encrypt"**
3. Wait for the encryption to complete
4. Copy the encrypted value if needed

### 3. Decrypt a Value

1. Paste the encrypted ciphertext (or use the one from encryption)
2. Enter the contract address that owns the encrypted value
3. Click **"Decrypt Value"**
4. View the decrypted result

## Code Examples

### Using the FHEVM Provider

```tsx
import { FhevmProvider } from '@fhevm-sdk/core/react';

function App() {
  return (
    <FhevmProvider
      network="sepolia"
      provider={window.ethereum}
      gatewayUrl="https://gateway.zama.ai"
    >
      <YourApp />
    </FhevmProvider>
  );
}
```

### Using FHEVM Hooks

```tsx
import { useFhevmClient, useEncrypt, useDecrypt } from '@fhevm-sdk/core/react';

function Component() {
  const { client, isInitialized } = useFhevmClient();
  const { encrypt32, isLoading, error } = useEncrypt();
  const { decrypt } = useDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt32(1000);
    console.log('Encrypted:', result.data);
  };

  const handleDecrypt = async (ciphertext: string, contract: string) => {
    const decrypted = await decrypt(ciphertext, contract);
    console.log('Decrypted:', decrypted.toString());
  };

  return (
    <div>
      {isInitialized && (
        <button onClick={handleEncrypt}>Encrypt</button>
      )}
    </div>
  );
}
```

### Custom Hook Pattern

```tsx
import { useFhevmDemo } from './hooks/useFhevmDemo';

function MyComponent() {
  const {
    account,
    isConnected,
    connectWallet,
    encryptNumber,
    decryptNumber,
    encryptedValue,
    decryptedValue,
  } = useFhevmDemo();

  return (
    <div>
      {!isConnected ? (
        <button onClick={connectWallet}>Connect</button>
      ) : (
        <>
          <button onClick={() => encryptNumber(42)}>Encrypt 42</button>
          {encryptedValue && (
            <p>Encrypted: {encryptedValue}</p>
          )}
        </>
      )}
    </div>
  );
}
```

## Configuration

### Network Configuration

Edit `src/lib/fhevm-client.ts` to add or modify networks:

```typescript
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
  // Add your custom network here
};
```

### Styling

This example uses Tailwind CSS. Customize the theme in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        },
      },
    },
  },
};
```

## Components

### WalletConnect

Handles wallet connection and displays connection status.

**Features:**
- MetaMask detection
- Connect/disconnect functionality
- Network information display
- FHEVM initialization status

### EncryptionDemo

Demonstrates encrypting numbers using FHEVM.

**Features:**
- Number input validation
- Real-time encryption
- Copy to clipboard
- Error handling and loading states

### DecryptionDemo

Demonstrates decrypting encrypted values.

**Features:**
- Ciphertext input
- Contract address validation
- Auto-fill from encryption demo
- Clear result display

## Hooks

### useFhevmDemo

A comprehensive custom hook that combines all FHEVM functionality:

```typescript
const {
  // Wallet state
  account,
  chainId,
  isConnected,
  isMetaMaskInstalled,

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
} = useFhevmDemo();
```

## Troubleshooting

### MetaMask Connection Issues

**Problem:** Wallet won't connect
**Solution:**
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network
- Try refreshing the page

### Encryption Fails

**Problem:** Encryption returns an error
**Solution:**
- Ensure wallet is connected
- Wait for FHEVM client to initialize
- Check that the number is within valid range (0 - 4,294,967,295)

### Decryption Fails

**Problem:** Decryption doesn't work
**Solution:**
- Verify the ciphertext is valid
- Ensure contract address is correct (0x followed by 40 hex characters)
- Check that you have permission to decrypt the value

### Build Errors

**Problem:** TypeScript errors during build
**Solution:**
```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo
npm run build
```

## Best Practices

### 1. Error Handling

Always wrap FHEVM operations in try-catch blocks:

```tsx
try {
  await encryptNumber(value);
} catch (error) {
  console.error('Encryption failed:', error);
  // Handle error appropriately
}
```

### 2. Loading States

Show loading indicators during async operations:

```tsx
{isEncrypting && <LoadingSpinner />}
```

### 3. Input Validation

Validate user input before processing:

```tsx
if (isNaN(value) || value < 0 || value > 4294967295) {
  setError('Invalid number');
  return;
}
```

### 4. User Feedback

Provide clear feedback for all operations:

```tsx
{encryptedValue && (
  <div className="success-message">
    Successfully encrypted!
  </div>
)}
```

## Security Considerations

1. **Never expose private keys** in your code
2. **Validate all inputs** before encryption/decryption
3. **Use environment variables** for sensitive configuration
4. **Implement proper access control** for decryption operations
5. **Keep dependencies updated** for security patches

## Performance Optimization

### Code Splitting

Vite automatically splits code. For manual splitting:

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Memoization

Use React.memo for expensive components:

```tsx
export const EncryptionDemo = React.memo(function EncryptionDemo() {
  // Component code
});
```

## Testing

### Running Tests

```bash
npm test
```

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { WalletConnect } from './components/WalletConnect';

test('renders connect button when not connected', () => {
  render(<WalletConnect />);
  expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
});
```

## Deployment

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

Create `.env` file for production:

```env
VITE_GATEWAY_URL=https://gateway.zama.ai
VITE_NETWORK=sepolia
```

## Resources

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Ethers.js Documentation](https://docs.ethers.org)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- [GitHub Issues](https://github.com/zama-ai/fhevm/issues)
- [Discord Community](https://discord.fhe.org)
- [Documentation](https://docs.zama.ai/fhevm)

## Acknowledgments

Built with FHEVM SDK by [Zama](https://zama.ai)

---

**Happy encrypting!** 🔐
