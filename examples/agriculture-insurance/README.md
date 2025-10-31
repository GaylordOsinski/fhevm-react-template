# Private Agricultural Insurance - React Application

A privacy-preserving agricultural insurance platform built with **React, TypeScript, and Zama's FHEVM SDK**, enabling secure and confidential claim processing on blockchain with Fully Homomorphic Encryption (FHE) technology.

## 🌾 Overview

This modern React application revolutionizes agricultural insurance by protecting sensitive farm data while maintaining transparency and trust in the claim settlement process. Using Zama's FHE technology via the FHEVM SDK, all insurance amounts and claim details remain encrypted on-chain, accessible only to authorized parties.

## 🔐 Core Concepts

### Fully Homomorphic Encryption (FHE)

FHE allows computations to be performed directly on encrypted data without decryption. In our system:

- **Coverage Amounts**: Encrypted with `euint32` types, invisible to unauthorized parties
- **Premium Calculations**: Performed on encrypted values without exposing actual amounts
- **Claim Assessments**: Confidential damage amounts and claim requests
- **Private Comparisons**: On-chain verification without revealing sensitive data

### Privacy-Focused Agricultural Insurance

Traditional agricultural insurance exposes sensitive farm data including:
- Property values and coverage amounts
- Crop yields and farm sizes
- Damage assessments and claim amounts
- Risk profiles and premium calculations

Our FHE-based system ensures **complete privacy** while maintaining:
- ✅ Transparent claim processing workflow
- ✅ Immutable audit trails on blockchain
- ✅ Fair and verifiable settlements
- ✅ Protection against data leaks

## 📋 Key Features

### 🛡️ **Complete Data Privacy**
- All financial amounts encrypted using FHE
- Zero-knowledge claim verification
- Confidential damage assessments
- Private risk factor analysis

### 🌱 **Agricultural-Specific Coverage**
- Multiple crop types support (Wheat, Corn, Rice, Soybeans, Cotton)
- Various risk factors (Drought, Flood, Hail, Frost, Disease, Pest)
- Farm size-based policy calculations
- Season-aware coverage periods

### ⚡ **Automated Processing**
- Smart contract-based claim workflow
- Asynchronous decryption callbacks
- Automated approval mechanisms
- Instant on-chain settlements

### 📊 **Transparent Operations**
- Blockchain-verified transactions
- Immutable claim history
- Public audit trails (amounts remain private)
- Real-time policy status tracking

## 🏗️ Technical Architecture

### Smart Contract Structure

```solidity
contract PrivateAgricultureInsurance is SepoliaConfig {
    // Encrypted policy data
    struct Policy {
        euint32 encryptedCoverage;    // FHE encrypted coverage amount
        euint32 encryptedPremium;      // FHE encrypted premium
        CropType cropType;
        uint256 farmSize;
        bool isActive;
    }

    // Encrypted claim processing
    struct Claim {
        euint32 encryptedDamageAmount;
        euint32 encryptedClaimAmount;
        RiskFactor riskType;
        ClaimStatus status;
    }
}
```

### FHE Operations

1. **Encryption**: `FHE.asEuint32(amount)` - Convert plaintext to encrypted value
2. **Access Control**: `FHE.allow()` - Grant decryption permissions
3. **Computation**: Perform operations on encrypted data
4. **Decryption**: Async callback mechanism for secure result handling

### Workflow

```
1. Farmer → Creates Encrypted Policy → Smart Contract
2. Policy → FHE Encrypted Storage → Blockchain
3. Damage Event → Submit Encrypted Claim → Smart Contract
4. Verification → FHE Computation → Approval Decision
5. Settlement → Encrypted Amount → Farmer Wallet
```

## 🎯 Use Cases

### Individual Farmers
- Protect financial privacy from competitors
- Secure coverage for valuable crops
- Confidential damage reporting
- Private claim settlements

### Insurance Providers
- Assess risks without exposing client data
- Automated claim verification
- Reduced fraud through transparency
- Lower operational costs

### Agricultural Cooperatives
- Bulk policy management
- Shared risk pools with privacy
- Collective claim processing
- Member data protection

## 📊 System Statistics

- **Supported Crop Types**: 6 (Wheat, Corn, Rice, Soybeans, Cotton, Other)
- **Risk Factors**: 6 (Drought, Flood, Hail, Frost, Disease, Pest)
- **Encryption**: euint32 (32-bit encrypted integers)
- **Network**: Sepolia Testnet
- **Gas Optimized**: Cancun EVM with bytecode optimization

## 🔗 Contract Information

**Deployed Contract Address**: `0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d`

**Network**: Ethereum Sepolia Testnet

**Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fhevm-react-template/examples/agriculture-insurance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3001`

5. **Connect MetaMask**
   - Click "Connect Wallet"
   - Approve the connection request
   - Switch to Sepolia testnet if needed

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Smart Contract Development

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to Sepolia
npm run deploy
```

## 📁 Project Structure

```
agriculture-insurance/
├── contracts/                  # Solidity smart contracts
│   └── PrivateAgricultureInsurance.sol
├── src/                       # React application source
│   ├── components/            # React components
│   │   ├── WalletConnect.tsx
│   │   ├── Header.tsx
│   │   ├── PolicyCreation.tsx
│   │   ├── ClaimSubmission.tsx
│   │   ├── PolicyList.tsx
│   │   └── ClaimsList.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useInsurance.ts
│   ├── lib/                   # Utility libraries
│   │   ├── contract.ts        # Contract ABI and address
│   │   └── fhevm-client.ts    # FHEVM client utilities
│   ├── types/                 # TypeScript type definitions
│   │   └── insurance.ts
│   ├── App.tsx                # Main App component
│   ├── App.css                # Application styles
│   └── main.tsx               # Entry point
├── public_backup/             # Backup of original static files
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── index.html                 # HTML entry point
```

## 🎥 Demo Video

*PrivateAgricultureInsurance.mp4* - Watch our demonstration showcasing:
- Policy creation with encrypted amounts
- Confidential claim submission
- FHE-based approval process
- Privacy-preserving settlements

## 🌐 Live Application

**Website**: [https://private-agriculture-insurance.vercel.app/](https://private-agriculture-insurance.vercel.app/)

**GitHub Repository**: [https://github.com/GaylordOsinski/PrivateAgricultureInsurance](https://github.com/GaylordOsinski/PrivateAgricultureInsurance)

## 💡 Technology Stack

- **Frontend**: React 18, TypeScript 5.3
- **Build Tool**: Vite 5
- **Blockchain**: Ethereum (Sepolia Testnet)
- **FHE Library**: Zama fhEVM (@fhevm/solidity v0.7.0)
- **FHEVM SDK**: @fhevm-sdk/core
- **Smart Contracts**: Solidity 0.8.24
- **Web3 Library**: Ethers.js v6
- **Development**: Hardhat, OpenZeppelin
- **Styling**: Custom CSS with Sunset/Orange Theme

## 🔒 Security Features

### Cryptographic Protection
- FHE encryption for all sensitive values
- Signature verification for decryption
- Access Control Lists (ACL) management
- Request-based async decryption

### Smart Contract Security
- Owner-only administrative functions
- Reentrancy protection
- Input validation and sanitization
- State consistency checks

### Privacy Guarantees
- No plaintext exposure on-chain
- Encrypted storage of financial data
- Private claim amounts and assessments
- Confidential policy terms

## 🌟 Future Enhancements

- **Multi-Chain Deployment**: Expand to other EVM networks
- **Advanced Risk Models**: AI-powered encrypted risk assessment
- **Reinsurance Pools**: Privacy-preserving risk sharing
- **Oracle Integration**: Secure weather data feeds
- **Mobile Application**: Native mobile experience
- **DAO Governance**: Decentralized protocol management

## 📚 Educational Resources

### Understanding FHE
FHE allows mathematical operations on encrypted data, producing an encrypted result that, when decrypted, matches the result of operations performed on plaintext. This enables:
- Private smart contract execution
- Confidential DeFi applications
- Secure data marketplaces
- Privacy-preserving analytics

### Agricultural Insurance Benefits
- **Farmers**: Protect sensitive business data
- **Insurers**: Reduce fraud and operational costs
- **Regulators**: Transparent auditing with privacy
- **Ecosystem**: Trust without data exposure

## 🤝 Contributing

We welcome contributions from the community! Whether it's:
- Bug reports and feature requests
- Code improvements and optimizations
- Documentation enhancements
- Educational content creation

## 📞 Support & Contact

For questions, suggestions, or collaboration opportunities:
- **Issues**: [GitHub Issues](https://github.com/GaylordOsinski/PrivateAgricultureInsurance/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GaylordOsinski/PrivateAgricultureInsurance/discussions)

---

**Built with ❤️ for the Agricultural Community**

*Protecting Privacy, Ensuring Trust, Empowering Farmers*
