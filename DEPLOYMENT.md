# Deployment Guide

Complete guide for deploying the FHEVM SDK examples and smart contracts.

## Prerequisites

### Required
- Node.js >= 16.0.0
- npm >= 8.0.0
- MetaMask wallet
- Sepolia testnet ETH

### Optional
- Alchemy/Infura API key (for custom RPC)
- Etherscan API key (for contract verification)

---

## 🚀 Quick Deployment

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env
```

Required variables:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_without_0x
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. Install Dependencies

```bash
npm install
npm run bootstrap
```

### 3. Build SDK

```bash
npm run build:sdk
```

### 4. Deploy Smart Contracts

```bash
# Deploy to Sepolia testnet
npm run deploy:sepolia

# Or deploy to localhost (for testing)
npm run node          # In one terminal
npm run deploy:localhost  # In another terminal
```

### 5. Deploy Frontend

#### Next.js Example

```bash
# Development
npm run dev:nextjs

# Production build
cd examples/nextjs-example
npm run build
npm run start
```

#### Deploy to Vercel

```bash
cd examples/nextjs-example

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 📋 Detailed Deployment Steps

### Smart Contract Deployment

#### Local Network (Hardhat)

```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy contracts
npm run deploy:localhost

# Note the deployed contract address
# Example output:
# ✅ PrivateAgricultureInsurance deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

#### Sepolia Testnet

```bash
# 1. Get Sepolia ETH from faucet
# https://sepoliafaucet.com/
# https://faucet.quicknode.com/ethereum/sepolia

# 2. Configure .env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key

# 3. Deploy
npm run deploy:sepolia

# 4. Note the contract address from output
# Save it to examples/nextjs-example/src/config/contracts.ts
```

#### Verify on Etherscan

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### Frontend Deployment

#### Next.js to Vercel

1. **Prepare Application**
```bash
cd examples/nextjs-example

# Update contract address in config
# Edit src/config/contracts.ts
export const CONTRACT_ADDRESS = '0x...' // Your deployed address
```

2. **Deploy**
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? fhevm-nextjs-example
# - Directory? ./
# - Override settings? No
```

3. **Environment Variables**

Add in Vercel dashboard:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK=sepolia
```

4. **Custom Domain (Optional)**
```bash
vercel domains add your-domain.com
```

#### React Example to Netlify

```bash
cd examples/react-example

# Build
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Agriculture Insurance Example

```bash
cd examples/agriculture-insurance

# Build
npm run build

# Deploy to your preferred platform
# (Vercel, Netlify, GitHub Pages, etc.)
```

---

## 🌐 Deployment Platforms

### Vercel (Recommended for Next.js)

**Pros:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Global CDN
- Environment variables management

**Steps:**
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Netlify

**Pros:**
- Simple static site deployment
- Form handling
- Serverless functions

**Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

**For static examples:**
```bash
npm run build
npx gh-pages -d dist
```

### Self-Hosted

**Using Docker:**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t fhevm-example .
docker run -p 3000:3000 fhevm-example
```

---

## 🔧 Configuration

### Contract Configuration

Create `src/config/contracts.ts`:
```typescript
export const CONTRACTS = {
  agricultureInsurance: {
    address: '0x...', // Your deployed address
    abi: [...],       // Contract ABI
  },
};

export const NETWORK = {
  name: 'sepolia',
  chainId: 11155111,
  rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/...',
};
```

### FHEVM Configuration

Update `src/config/fhevm.ts`:
```typescript
export const FHEVM_CONFIG = {
  network: 'sepolia',
  gatewayUrl: 'https://gateway.sepolia.zama.ai',
};
```

---

## 🧪 Testing Deployment

### Local Testing

```bash
# 1. Start local Hardhat node
npm run node

# 2. Deploy contracts
npm run deploy:localhost

# 3. Start Next.js
npm run dev:nextjs

# 4. Open http://localhost:3000
# 5. Connect MetaMask to localhost:8545
# 6. Test encryption/decryption
```

### Testnet Testing

```bash
# 1. Deploy to Sepolia
npm run deploy:sepolia

# 2. Update contract address in frontend
# 3. Deploy frontend to Vercel
# 4. Connect MetaMask to Sepolia
# 5. Test full flow
```

---

## 📊 Deployment Checklist

### Before Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Contract addresses updated
- [ ] API keys secured
- [ ] Dependencies up to date
- [ ] Build completes without errors

### Smart Contracts

- [ ] Deployed to target network
- [ ] Verified on Etherscan
- [ ] Ownership configured
- [ ] Access control set
- [ ] Test transactions successful

### Frontend

- [ ] Contract addresses configured
- [ ] Network settings correct
- [ ] MetaMask connection working
- [ ] Encryption/decryption tested
- [ ] Error handling verified
- [ ] Mobile responsive
- [ ] Analytics configured (optional)

### Post-Deployment

- [ ] Smoke test all features
- [ ] Check contract interactions
- [ ] Verify MetaMask connection
- [ ] Test on different browsers
- [ ] Monitor error logs
- [ ] Update documentation

---

## 🔒 Security Considerations

### Private Keys

```bash
# NEVER commit .env file
echo ".env" >> .gitignore

# Use environment variables
# Never hardcode private keys
```

### API Keys

```bash
# Separate keys for dev/prod
# Rotate keys regularly
# Use Vercel/Netlify secret management
```

### Contract Security

```bash
# Audit before mainnet
# Use multi-sig for admin functions
# Implement timelock for upgrades
# Monitor contract activity
```

---

## 📈 Monitoring

### Frontend Monitoring

```typescript
// Add analytics
import { Analytics } from '@vercel/analytics';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Contract Monitoring

- Use Etherscan notifications
- Set up alerts for contract calls
- Monitor gas usage
- Track transaction failures

---

## 🐛 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install
npm run build
```

**MetaMask Connection Issues**
```bash
# Check network in MetaMask
# Verify contract address
# Clear MetaMask activity data
```

**Transaction Failures**
```bash
# Check gas limit
# Verify contract is deployed
# Ensure wallet has enough ETH
# Check contract permissions
```

**FHEVM Initialization Errors**
```bash
# Verify gateway URL
# Check network configuration
# Ensure fhevmjs is initialized
```

---

## 📞 Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Zama Documentation](https://docs.zama.ai/)
3. Open an issue on GitHub
4. Join [Zama Discord](https://discord.com/invite/zama)

---

## 🎯 Deployment URLs

After deployment, update README.md with:

```markdown
## Live Deployments

- **Next.js Demo**: https://your-app.vercel.app
- **Documentation**: https://docs.your-domain.com
- **Contract (Sepolia)**: https://sepolia.etherscan.io/address/0x...
```

---

**Happy Deploying! 🚀**
