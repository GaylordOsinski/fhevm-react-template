# Agriculture Insurance - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Prerequisites Check

Make sure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ MetaMask browser extension installed
- ✅ Some Sepolia testnet ETH (for gas fees)

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Vite
- Ethers.js v6
- FHEVM SDK

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.12  ready in XXX ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3001**

### Step 5: Connect Wallet

1. Click the **"Connect Wallet"** button in the top-right
2. MetaMask will pop up - click **"Connect"**
3. Make sure you're on **Sepolia Testnet**
4. Your address will appear when connected

### Step 6: Create Your First Policy

1. Fill out the **"Create Insurance Policy"** form:
   - Coverage Amount: e.g., `10000`
   - Premium: e.g., `500`
   - Crop Type: Select from dropdown
   - Farm Size: e.g., `100` (acres)
   - Duration: e.g., `365` (days)
   - IPFS Hash: Optional

2. Click **"Create Policy"**
3. Confirm transaction in MetaMask
4. Wait for confirmation (you'll see a success message)

### Step 7: Submit a Claim

1. Note your Policy ID from the **"My Policies"** table
2. Fill out the **"Submit Claim"** form:
   - Policy ID: Enter your policy ID
   - Damage Amount: e.g., `5000`
   - Claim Amount: e.g., `4500`
   - Risk Type: Select the risk factor
   - Evidence Hash: Enter any string (IPFS hash)

3. Click **"Submit Claim"**
4. Confirm transaction in MetaMask
5. Your claim will appear in the **"My Claims"** table

## Understanding the UI

### Top Navigation Bar
- **Logo**: Private Agricultural Insurance branding
- **Connect Wallet**: MetaMask integration
- **Address Display**: Shows your connected wallet (shortened)

### Hero Section (Orange/Sunset Theme)
- **System Statistics**: Total Policies, Total Claims, Active Policies
- **Feature Highlights**: Privacy, Transparency, Specialization

### Main Content Area

#### Left Column: Policy Creation
- Create new insurance policies
- All amounts are FHE encrypted on-chain

#### Right Column: Claim Submission
- Submit claims for existing policies
- Damage and claim amounts encrypted

#### Bottom Section: Data Tables
- **My Policies**: View all your insurance policies
- **My Claims**: Track your submitted claims
- Real-time status updates

### Privacy Notice (Bottom)
- Information about FHE technology
- Data encryption details

## Common Issues & Solutions

### Issue: "Please install MetaMask"
**Solution**: Install the MetaMask browser extension from metamask.io

### Issue: Wrong Network
**Solution**:
1. Open MetaMask
2. Click the network dropdown at the top
3. Select "Sepolia Test Network"
4. If not visible, enable "Show test networks" in MetaMask settings

### Issue: Transaction Failed
**Solution**:
- Check you have enough Sepolia ETH for gas
- Get free testnet ETH from a Sepolia faucet
- Try increasing gas limit in MetaMask

### Issue: Can't See Policies/Claims
**Solution**:
- Make sure you're connected with the same wallet that created them
- Click the "Refresh" button
- Check browser console for errors

### Issue: npm install fails
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Development Commands

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Compile smart contracts
npm run compile

# Run contract tests
npm run test

# Deploy contracts
npm run deploy
```

## Smart Contract Information

- **Contract Address**: `0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d`
- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **Explorer**: https://sepolia.etherscan.io/

## Features Overview

### Privacy Features (FHE)
- Coverage amounts encrypted
- Premium amounts encrypted
- Claim amounts encrypted
- Damage assessments encrypted
- Only authorized parties can decrypt

### Policy Features
- Create policies with various crop types
- Set custom coverage amounts
- Define insurance duration
- Store IPFS document hashes
- Track policy status and expiration

### Claim Features
- Submit claims for active policies
- Specify risk factors (drought, flood, etc.)
- Attach evidence via IPFS
- Track claim status
- View claim history

### Smart Features
- Automatic gas estimation
- Transaction status tracking
- Real-time notifications
- Loading states for UX
- Error handling and recovery

## Next Steps

### Explore More
1. Try different crop types and risk factors
2. Create multiple policies
3. Submit various types of claims
4. Monitor system statistics

### Learn More
- Read the [full README](./README.md) for detailed documentation
- Check [CONVERSION_SUMMARY](./CONVERSION_SUMMARY.md) for technical details
- Review smart contract code in `contracts/`

### Customize
- Modify `src/App.css` to change styling
- Edit components in `src/components/`
- Add new features using the modular structure

## Getting Help

### Documentation
- Project README: [README.md](./README.md)
- Conversion Details: [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)
- Contract Source: `contracts/PrivateAgricultureInsurance.sol`

### Resources
- FHEVM Documentation: https://docs.zama.ai/fhevm
- Ethers.js Docs: https://docs.ethers.org/v6/
- React Documentation: https://react.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/

### Support
- Check browser console for detailed error messages
- Review transaction status on Sepolia Etherscan
- Ensure MetaMask is properly configured

---

**Happy Building with FHE! 🔐🌾**
