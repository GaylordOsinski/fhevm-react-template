# Next.js Example Complete Guide

This document provides a comprehensive overview of the Next.js example implementation with FHEVM SDK integration.

## Overview

The Next.js example (`examples/nextjs-example`) demonstrates a complete implementation of the FHEVM SDK following the structure defined in `next.md`. It includes all necessary components, API routes, utilities, and examples for building privacy-preserving applications.

## Complete File Structure

```
examples/nextjs-example/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page with demos
│   │   ├── providers.tsx            # Context providers setup
│   │   ├── globals.css              # Global styles
│   │   └── api/                     # API Routes
│   │       ├── fhe/
│   │       │   ├── route.ts         # Main FHE operations endpoint
│   │       │   ├── encrypt/route.ts # Encryption validation API
│   │       │   ├── decrypt/route.ts # Decryption validation API
│   │       │   └── compute/route.ts # Computation validation API
│   │       └── keys/route.ts        # Key management API
│   │
│   ├── components/
│   │   ├── ui/                      # Base UI Components
│   │   │   ├── Button.tsx           # Reusable button component
│   │   │   ├── Input.tsx            # Input component with validation
│   │   │   └── Card.tsx             # Card container component
│   │   │
│   │   ├── fhe/                     # FHE-Specific Components
│   │   │   ├── FHEProvider.tsx      # FHE context provider wrapper
│   │   │   ├── EncryptionDemo.tsx   # Interactive encryption demo
│   │   │   ├── ComputationDemo.tsx  # Homomorphic computation demo
│   │   │   └── KeyManager.tsx       # Key management interface
│   │   │
│   │   └── examples/                # Use Case Examples
│   │       ├── BankingExample.tsx   # Private banking operations
│   │       └── MedicalExample.tsx   # Healthcare privacy demo
│   │
│   ├── lib/                         # Utility Libraries
│   │   ├── fhe/                     # FHE Integration
│   │   │   ├── client.ts            # Client-side FHE operations
│   │   │   ├── server.ts            # Server-side utilities
│   │   │   ├── keys.ts              # Key management utilities
│   │   │   └── types.ts             # FHE type definitions
│   │   │
│   │   └── utils/                   # Helper Utilities
│   │       ├── security.ts          # Security functions
│   │       └── validation.ts        # Input validation
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useFHE.ts               # Comprehensive FHE operations
│   │   ├── useEncryption.ts        # Enhanced encryption with validation
│   │   └── useComputation.ts       # Computation operations
│   │
│   └── types/                       # TypeScript Definitions
│       ├── fhe.ts                   # FHE-related types
│       └── api.ts                   # API types
│
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS config
├── postcss.config.js                # PostCSS configuration
└── next.config.js                   # Next.js configuration
```

## Component Details

### API Routes

All API routes follow RESTful conventions and provide validation for FHE operations:

#### `/api/fhe/route.ts`
- **GET**: Health check and available endpoints
- **POST**: General FHE operations (init, verify)

#### `/api/fhe/encrypt/route.ts`
- **POST**: Validate encryption requests
- **GET**: List supported encryption types

#### `/api/fhe/decrypt/route.ts`
- **POST**: Validate decryption requests with EIP-712 signature

#### `/api/fhe/compute/route.ts`
- **POST**: Validate homomorphic computation requests
- **GET**: List supported operations

#### `/api/keys/route.ts`
- **GET**: Retrieve public key information
- **POST**: Key management operations (refresh, validate)

### UI Components

#### Button Component
- Variants: primary, secondary, success, danger
- Sizes: sm, md, lg
- Loading state support
- Disabled state handling

#### Input Component
- Label support
- Error message display
- Helper text
- Validation feedback

#### Card Component
- Title and subtitle support
- Footer section
- Responsive padding
- Border and shadow styling

### FHE Components

#### FHEProvider
- Wraps application with FHEVM SDK context
- Handles provider initialization
- Error state management

#### EncryptionDemo
- Interactive encryption demonstration
- Supports multiple encryption types (euint8, euint16, euint32, ebool)
- Real-time validation
- Result display

#### ComputationDemo
- Homomorphic computation visualization
- Operation selection (add, sub, mul)
- Educational information about FHE

#### KeyManager
- Display key status
- Network information
- Key refresh functionality
- Status indicators

### Example Use Cases

#### BankingExample
Demonstrates privacy-preserving financial operations:
- Encrypted account balances
- Private transfer amounts
- Recipient address handling
- Balance encryption workflow

**Features:**
- Balance encryption (euint32)
- Transfer amount encryption
- Address validation
- Privacy features explanation

#### MedicalExample
Demonstrates healthcare data privacy:
- Patient age encryption (euint8)
- Blood pressure encryption (euint16)
- Glucose level encryption (euint16)
- Medical condition flag (ebool)

**Features:**
- HIPAA compliance focus
- Multiple data type encryption
- Healthcare use case examples
- Privacy and compliance information

### Custom Hooks

#### useFHE
Comprehensive hook combining all FHE operations:
- Encryption methods for all types
- Decryption with logging
- Operation tracking
- Combined loading states

**Usage:**
```typescript
const {
  client,
  isInitialized,
  encrypt,
  decrypt,
  operations,
  clearOperations
} = useFHE();
```

#### useEncryption
Enhanced encryption hook with validation:
- Type-safe encryption methods
- Automatic validation
- Last encrypted value tracking
- Error handling

**Usage:**
```typescript
const {
  encryptNumber,
  encryptBoolean,
  encryptAddress,
  lastEncrypted,
  error
} = useEncryption();
```

#### useComputation
Homomorphic computation operations:
- Contract interaction helpers
- Computation simulation
- Result tracking
- Error management

**Usage:**
```typescript
const {
  performComputation,
  readComputationResult,
  simulateComputation,
  lastComputation
} = useComputation();
```

### Library Utilities

#### lib/fhe/client.ts
Client-side FHE operations:
- Client initialization
- Value encryption (all types)
- Value decryption
- Public decryption

#### lib/fhe/server.ts
Server-side utilities:
- Request validation
- Type checking
- Operation logging

#### lib/fhe/keys.ts
Key management:
- Network key retrieval
- Key validation
- Key refresh functionality

#### lib/utils/security.ts
Security utilities:
- Address validation
- Input sanitization
- Range validation
- Rate limiting

#### lib/utils/validation.ts
Validation functions:
- Encryption type validation
- Numeric string checking
- ABI validation
- Function argument validation

## Integration with SDK

The example demonstrates complete SDK integration:

1. **Provider Setup** (`app/providers.tsx`):
   ```typescript
   <FhevmProvider network="sepolia" provider={window.ethereum}>
     {children}
   </FhevmProvider>
   ```

2. **Hook Usage** (any component):
   ```typescript
   const { encrypt32, isLoading } = useEncrypt();
   const { decrypt } = useDecrypt();
   const { writeContract } = useContract();
   ```

3. **Custom Hook Enhancement** (`hooks/useFHE.ts`):
   - Wraps SDK hooks with additional functionality
   - Adds logging and operation tracking
   - Provides combined state management

## Running the Example

```bash
# From root directory
npm run dev:nextjs

# Or from example directory
cd examples/nextjs-example
npm run dev
```

## Development Workflow

1. **Start Development Server**: `npm run dev`
2. **Connect MetaMask**: Click connect button
3. **Test Encryption**: Use EncryptionDemo component
4. **Test Computation**: Use ComputationDemo component
5. **View Keys**: Check KeyManager component
6. **Try Examples**: Banking and Medical use cases

## API Testing

Test API routes directly:

```bash
# Health check
curl http://localhost:3000/api/fhe

# Encryption validation
curl -X POST http://localhost:3000/api/fhe/encrypt \
  -H "Content-Type: application/json" \
  -d '{"value": 100, "type": "euint32"}'

# Key information
curl http://localhost:3000/api/keys?network=sepolia
```

## Customization Guide

### Adding New Components

1. Create component in appropriate directory:
   - UI components → `components/ui/`
   - FHE components → `components/fhe/`
   - Examples → `components/examples/`

2. Import and use SDK hooks:
   ```typescript
   import { useEncrypt, useDecrypt } from '@fhevm-sdk/core/react';
   ```

### Adding New Hooks

1. Create hook in `hooks/` directory
2. Build on SDK hooks or create custom logic
3. Export from hook file

### Adding New API Routes

1. Create route file in `app/api/`
2. Implement GET/POST handlers
3. Add validation using lib utilities

## Best Practices

1. **Always validate input** before encryption
2. **Use appropriate encryption types** for data ranges
3. **Handle errors gracefully** with user feedback
4. **Implement loading states** for better UX
5. **Log operations** for debugging
6. **Test with real contracts** on testnets

## Type Safety

All components and utilities are fully typed with TypeScript:
- FHE types in `types/fhe.ts`
- API types in `types/api.ts`
- Component prop types
- Hook return types

## Performance Considerations

- Encryption operations are async - use loading states
- Cache client instance to avoid re-initialization
- Batch operations when possible
- Use appropriate encryption types (smaller = faster)

## Security Notes

- Never expose private keys
- Validate all inputs
- Use EIP-712 signatures for decryption
- Implement rate limiting for API routes
- Sanitize user input

## Deployment

The example is ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting

Environment variables needed:
```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_GATEWAY_URL=https://gateway.sepolia.zama.ai
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

## Troubleshooting

### MetaMask Not Connecting
- Check if MetaMask is installed
- Verify network configuration
- Check browser console for errors

### Encryption Fails
- Verify client initialization
- Check value ranges for encryption type
- Ensure network connection

### API Routes Not Working
- Verify Next.js dev server is running
- Check API route file naming
- Review server logs

## Resources

- [FHEVM Documentation](https://docs.zama.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [SDK API Reference](../../README.md#sdk-api-reference)
- [Example Source Code](./src)

## Contributing

To contribute improvements to this example:
1. Follow existing code structure
2. Add tests for new features
3. Update this documentation
4. Submit pull request

---

**Built with FHEVM SDK - Making Privacy Simple**
