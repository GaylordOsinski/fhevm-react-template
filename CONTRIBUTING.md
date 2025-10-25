# Contributing to FHEVM Universal SDK

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd fhevm-universal-sdk

# Install dependencies
npm install

# Build SDK
npm run build:sdk

# Run tests
npm run test:sdk
```

## Project Structure

```
fhevm-universal-sdk/
├── packages/fhevm-sdk/    # Core SDK package
├── examples/              # Example applications
├── contracts/             # Smart contracts
└── scripts/               # Build and deployment scripts
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code following existing patterns
- Add TypeScript types for all functions
- Include JSDoc comments
- Write tests for new features

### 3. Test Your Changes

```bash
# Run SDK tests
npm run test:sdk

# Test with examples
npm run dev:nextjs
npm run dev:react
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### 5. Submit Pull Request

- Push your branch
- Create a pull request
- Describe your changes clearly
- Link any related issues

## Code Style

### TypeScript

- Use TypeScript for all new code
- Provide complete type definitions
- Avoid `any` types when possible
- Use meaningful variable names

### React

- Use functional components
- Prefer hooks over class components
- Follow React best practices
- Add proper prop types

### Documentation

- Add JSDoc comments to all public APIs
- Include usage examples
- Update README.md for significant changes
- Keep documentation in sync with code

## Testing

### Writing Tests

```typescript
import { describe, it, expect } from 'jest';
import { createFhevmClient } from '../src';

describe('FhevmClient', () => {
  it('should initialize correctly', async () => {
    const client = await createFhevmClient({
      network: 'localhost',
      rpcUrl: 'http://localhost:8545',
    });

    expect(client.isInitialized()).toBe(true);
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run SDK tests only
npm run test:sdk

# Watch mode
npm run test:watch
```

## Adding Examples

Examples help users understand the SDK. To add an example:

1. Create directory in `examples/`
2. Add `package.json` with dependencies
3. Include comprehensive README.md
4. Add to root workspace configuration
5. Document in main README.md

## Reporting Issues

### Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages/logs

### Feature Requests

Include:
- Use case description
- Proposed API design
- Alternative approaches considered
- Examples of usage

## Code Review Process

1. All submissions require review
2. Maintainers will provide feedback
3. Address review comments
4. Once approved, PR will be merged

## Release Process

Maintainers handle releases:

1. Version bump
2. Update CHANGELOG
3. Create git tag
4. Publish to NPM
5. Create GitHub release

## Questions?

- Open an issue for discussion
- Join community channels
- Check documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FHEVM Universal SDK! 🎉
