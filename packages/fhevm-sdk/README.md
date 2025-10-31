# @fhevm-sdk/core

Universal FHEVM SDK for building confidential dApps.

## Installation

```bash
npm install @fhevm-sdk/core
```

## Quick Start

### Vanilla JavaScript

```javascript
import { createFhevmClient } from '@fhevm-sdk/core';

const client = await createFhevmClient({
  provider: window.ethereum,
  network: 'sepolia',
});

const encrypted = await client.encrypt32(1000);
```

### React

```tsx
import { FhevmProvider, useEncrypt } from '@fhevm-sdk/core/react';

function App() {
  return (
    <FhevmProvider network="sepolia" provider={window.ethereum}>
      <YourComponents />
    </FhevmProvider>
  );
}

function Component() {
  const { encrypt32 } = useEncrypt();
  // Use encryption
}
```

## API

See [main README](../../README.md) for complete API documentation.

## License

MIT
