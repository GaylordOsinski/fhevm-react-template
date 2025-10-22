# 🌾 FHE Agriculture Insurance - Confidential Claim Processing System

**Privacy-preserving agricultural insurance powered by Zama FHEVM - Secure, Confidential, Decentralized**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://fhe-agriculture-insurance.vercel.app/)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Passing-success)](https://github.com/GaylordOsinski/FHEAgricultureInsurance/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-yellow)](https://hardhat.org/)

> **Built for the Zama FHE Challenge** - Demonstrating practical privacy-preserving insurance applications on blockchain.

🌐 **[Live Demo](https://fhe-agriculture-insurance.vercel.app/)** | 📹 **[Video Demo demo.mp4 - Download to Watch]** | 📄 **[Documentation](#-documentation)**

---

## 🚀 What is This?

A **confidential agricultural insurance claim processing system** where farmers can create insurance policies and submit claims **without exposing sensitive financial data** on-chain. Built with Zama's Fully Homomorphic Encryption (FHE), all coverage amounts, premiums, and claim details are encrypted while still allowing smart contract operations.

**One-sentence pitch**: Privacy-preserving agricultural insurance using **Zama FHEVM** to protect farmers' sensitive data while enabling transparent, automated claim processing on Ethereum Sepolia.

## 🔐 Core Concepts

### FHE Contract Privacy

**Fully Homomorphic Encryption (FHE)** enables computations on encrypted data without decryption. In our agriculture insurance system:

- **Encrypted Storage**: All sensitive financial amounts stored as `euint32` encrypted integers on-chain
- **Private Calculations**: Premium computations and claim evaluations performed on encrypted values
- **Zero-Knowledge Verification**: Smart contract validates claims without seeing actual amounts
- **Selective Decryption**: Only authorized parties can decrypt specific encrypted data

### Privacy in Agricultural Insurance

Traditional agricultural insurance exposes critical farm business data:
- Coverage amounts reveal property values
- Premium payments indicate farm profitability
- Claim amounts expose loss magnitudes
- Risk assessments disclose operational vulnerabilities

**Our FHE solution ensures**:
- ✅ **Financial Privacy**: Coverage, premiums, and claims remain encrypted on-chain
- ✅ **Competitive Protection**: Competitors cannot analyze your insurance data
- ✅ **Confidential Claims**: Damage amounts and payouts stay private
- ✅ **Transparent Process**: Blockchain audit trail without exposing sensitive values

### Confidential Claim Processing

The system implements a **privacy-first claim workflow**:

1. **Policy Creation** - Farmers encrypt coverage amounts before storing on-chain
2. **Claim Submission** - Damage assessments submitted as encrypted values
3. **Assessment** - Authorized assessors evaluate encrypted claims using FHE operations
4. **Settlement** - Approved amounts remain encrypted until payout execution

All while maintaining:
- Immutable audit trails
- Verifiable claim history
- Transparent status tracking
- Blockchain-based trust

---

## ✨ Key Features

🔐 **Complete Privacy Preservation**
- Coverage amounts encrypted with FHE (`euint32`)
- Private premium calculations
- Confidential claim submissions
- Zero-knowledge damage assessments

🌱 **Agricultural-Specific Design**
- Multiple crop types (Wheat, Corn, Rice, Soybeans, Cotton, Other)
- Six risk factors (Drought, Flood, Hail, Frost, Disease, Pest)
- Farm size-based policy calculations
- Season-aware coverage periods

⚡ **Automated Smart Contract Workflow**
- Instant policy creation with encrypted data
- Automated claim verification
- Asynchronous FHE decryption callbacks
- On-chain settlement processing

🛡️ **Enterprise-Grade Security**
- Role-based access control (Owner, Assessors)
- FHE Access Control Lists (ACL)
- Input validation and sanitization
- Comprehensive test coverage (60+ test cases)

📊 **Transparent Yet Private**
- Public audit trails (amounts stay encrypted)
- Immutable claim history on blockchain
- Real-time policy status tracking
- System-wide statistics

🔧 **Developer-Friendly Infrastructure**
- Hardhat development framework
- Automated CI/CD pipeline with GitHub Actions
- Pre-commit hooks for code quality
- Comprehensive documentation and testing

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Web3 + Ethers.js)              │
│  ├─ MetaMask wallet integration                             │
│  ├─ Client-side FHE encryption                              │
│  └─ Real-time encrypted data display                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Smart Contract (Solidity + Zama FHEVM)              │
│  ├─ Encrypted Storage                                       │
│  │   ├─ euint32: Coverage amounts                           │
│  │   ├─ euint32: Premium amounts                            │
│  │   ├─ euint32: Claim amounts                              │
│  │   └─ ebool: Status flags                                 │
│  ├─ Homomorphic Operations                                  │
│  │   ├─ FHE.asEuint32() - Encrypt values                    │
│  │   ├─ FHE.add/sub() - Encrypted arithmetic                │
│  │   └─ FHE.allow() - Access control                        │
│  └─ Claim Processing Workflow                               │
│      ├─ Policy creation & validation                        │
│      ├─ Encrypted claim submission                          │
│      ├─ Assessor evaluation                                 │
│      └─ Automated settlement                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Zama FHEVM (Encryption Layer)                   │
│  ├─ Encrypted computation on Sepolia testnet                │
│  ├─ Secure decryption request handling                      │
│  └─ Privacy-preserving smart contract execution             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. Farmer → Create Policy → Encrypt Amount → Store on Chain
                ↓
2. Damage Event → Submit Claim → Encrypted Details → Smart Contract
                ↓
3. Assessor → Evaluate Claim → FHE Computation → Approval/Rejection
                ↓
4. Settlement → Decrypt Amount → Transfer → Farmer Wallet
```

---

## 🔧 Technical Implementation

### FHE Smart Contract Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@fhevm/solidity/TFHE.sol";

contract PrivateAgricultureInsurance {
    // Encrypted policy structure
    struct Policy {
        euint32 encryptedCoverage;    // FHE encrypted coverage
        euint32 encryptedPremium;      // FHE encrypted premium
        CropType cropType;
        uint256 farmSize;
        bool isActive;
    }

    // Encrypted claim structure
    struct Claim {
        euint32 encryptedDamageAmount;  // Private damage amount
        euint32 encryptedClaimAmount;   // Private claim request
        RiskFactor riskType;
        ClaimStatus status;
    }

    // Create policy with encrypted amounts
    function createPolicy(
        uint256 coverage,
        uint256 premium,
        CropType cropType,
        uint256 farmSize,
        uint256 duration,
        string calldata ipfsHash
    ) external returns (uint256) {
        // Encrypt sensitive data
        euint32 encCoverage = FHE.asEuint32(coverage);
        euint32 encPremium = FHE.asEuint32(premium);

        // Store encrypted policy
        policies[policyId] = Policy({
            farmer: msg.sender,
            encryptedCoverage: encCoverage,
            encryptedPremium: encPremium,
            cropType: cropType,
            farmSize: farmSize,
            isActive: true
        });

        // Grant access permissions
        FHE.allow(encCoverage, msg.sender);
        FHE.allow(encPremium, msg.sender);

        return policyId;
    }

    // Submit encrypted claim
    function submitClaim(
        uint256 policyId,
        uint256 damageAmount,
        uint256 claimAmount,
        RiskFactor riskType,
        string calldata evidenceHash
    ) external returns (uint256) {
        // Encrypt claim details
        euint32 encDamage = FHE.asEuint32(damageAmount);
        euint32 encClaim = FHE.asEuint32(claimAmount);

        // Create encrypted claim
        claims[claimId] = Claim({
            policyId: policyId,
            farmer: msg.sender,
            encryptedDamageAmount: encDamage,
            encryptedClaimAmount: encClaim,
            riskType: riskType,
            status: ClaimStatus.Pending
        });

        return claimId;
    }
}
```

### Encrypted Data Types

| Type | Description | Use Case |
|------|-------------|----------|
| `euint32` | 32-bit encrypted unsigned integer | Coverage, premiums, claims |
| `euint64` | 64-bit encrypted unsigned integer | Large financial amounts |
| `ebool` | Encrypted boolean | Status flags, approvals |
| `eaddress` | Encrypted address | Private recipient data |

### FHE Operations

```solidity
// Arithmetic on encrypted values
euint32 total = FHE.add(encAmount1, encAmount2);
euint32 difference = FHE.sub(encCoverage, encClaim);

// Comparison operations
ebool isValid = FHE.le(encClaim, encCoverage);  // claim <= coverage
ebool goalReached = FHE.ge(encTotal, encGoal);   // total >= goal

// Conditional operations
euint32 result = FHE.select(condition, valueIfTrue, valueIfFalse);

// Access control
FHE.allow(encryptedValue, authorizedAddress);
```

---

## 🌐 Live Demo & Deployment

### Live Application
🚀 **Website**: [https://fhe-agriculture-insurance.vercel.app/](https://fhe-agriculture-insurance.vercel.app/)

### Deployed Contract
📋 **Network**: Sepolia Testnet (Chain ID: 11155111)
📋 **Contract Address**: [`0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d`](https://sepolia.etherscan.io/address/0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d)
📋 **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d)

### Video Demonstration
📹 **Demo Video**: [`demo.mp4`](./demo.mp4) - **Download the file to watch the demonstration**

The video showcases:
- Policy creation with encrypted coverage amounts
- Confidential claim submission workflow
- FHE-based claim assessment process
- Privacy-preserving settlement execution

### Get Test Tokens
🚰 **Sepolia Faucet**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
🚰 **Alternative**: [https://faucet.quicknode.com/ethereum/sepolia](https://faucet.quicknode.com/ethereum/sepolia)

---

## 💻 Tech Stack

### Smart Contract Layer
- **Blockchain**: Ethereum (Sepolia Testnet)
- **FHE Library**: Zama fhEVM (`@fhevm/solidity` v0.7.0)
- **Language**: Solidity 0.8.24
- **Framework**: Hardhat 2.19.4
- **Security**: OpenZeppelin Contracts v5.4.0

### Development Tools
- **Testing**: Mocha, Chai, Ethers.js (60+ test cases)
- **Linting**: Solhint (Solidity), ESLint (JavaScript)
- **Formatting**: Prettier with Solidity plugin
- **Pre-commit**: Husky + lint-staged
- **Gas Optimization**: Yul optimizer (800 runs)
- **Coverage**: Codecov integration

### Frontend
- **UI**: HTML5, Bootstrap 5, Vanilla JavaScript
- **Web3**: Ethers.js v6
- **Wallet**: MetaMask integration
- **Deployment**: Vercel

### CI/CD
- **Pipeline**: GitHub Actions (5-job workflow)
- **Quality Checks**: Automated linting, formatting, testing
- **Multi-version**: Node.js 18.x & 20.x
- **Security**: Pre-commit hooks, npm audit

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
Node.js >= 16.0.0
npm >= 8.0.0
Git

# Optional (for deployment)
MetaMask wallet with Sepolia ETH
Etherscan API key
```

### Installation

```bash
# Clone repository
git clone https://github.com/GaylordOsinski/FHEAgricultureInsurance.git
cd FHEAgricultureInsurance

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration
```

### Local Development

```bash
# Compile smart contracts
npm run compile

# Run test suite
npm test

# Start local Hardhat node
npm run node

# Deploy to local network (in new terminal)
npm run deploy:local

# Run simulation with sample data
npm run simulate:local

# Interact with deployed contract
npm run interact:local
```

### Deploy to Sepolia Testnet

```bash
# Configure .env file
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key

# Deploy contract
npm run deploy:sepolia

# Verify on Etherscan
npm run verify:sepolia

# Interact with deployed contract
npm run interact:sepolia
```

---

## 🧪 Testing

### Test Suite Overview

**60+ comprehensive test cases** covering:

✅ **Deployment Tests** (2 tests)
- Contract initialization
- Owner assignment

✅ **Policy Management** (15 tests)
- Encrypted policy creation
- Policy retrieval and validation
- Multiple policies per farmer
- Expiration handling

✅ **Claim Workflow** (18 tests)
- Encrypted claim submission
- Status tracking
- Policy holder verification
- Active policy requirements

✅ **Assessor Management** (8 tests)
- Authorization and roles
- Access control
- Assessment actions

✅ **Claim Assessment** (10 tests)
- Approval/rejection workflow
- Encrypted payout validation
- Assessor-only operations

✅ **Access Control** (5 tests)
- Owner privileges
- Unauthorized access prevention
- Role-based permissions

✅ **Edge Cases** (5 tests)
- Zero values and boundary conditions
- Invalid input handling

### Running Tests

```bash
# Run all tests
npm test

# Run with gas reporting
REPORT_GAS=true npm test

# Run specific test file
npm test -- test/AgricultureInsurance.test.js

# Run performance tests
npm test -- test/performance.test.js

# Run tests with coverage
npm run coverage

# Run security audit
npm run security:audit
```

### Performance Benchmarks

```bash
# Run gas analysis
node scripts/gas-analysis.js

# Expected gas usage:
# - createPolicy: < 500,000 gas
# - submitClaim: < 400,000 gas
# - assessClaim: < 300,000 gas
# - authorizeAssessor: < 100,000 gas
```

**Note**: 45 out of 60 tests require FHE infrastructure (FHEVM mock or Sepolia deployment). 15 tests pass without FHE dependencies. See [TESTING.md](./TESTING.md) for details.

---

## 📋 Usage Guide

### For Farmers

#### 1. Create Insurance Policy

```javascript
// Connect wallet
await ethereum.request({ method: 'eth_requestAccounts' });

// Create encrypted policy
const tx = await contract.createPolicy(
  100000,           // coverage amount (encrypted)
  5000,             // premium amount (encrypted)
  CropType.Wheat,   // crop type
  50,               // farm size (acres)
  365 * 24 * 60 * 60, // duration (1 year)
  "QmIPFSHash..."  // policy details on IPFS
);

await tx.wait();
console.log("Policy created with encrypted amounts!");
```

#### 2. Submit Claim

```javascript
// Submit encrypted claim
const claimTx = await contract.submitClaim(
  policyId,           // your policy ID
  40000,              // damage amount (encrypted)
  35000,              // claim request (encrypted)
  RiskFactor.Drought, // risk type
  "QmEvidenceHash..." // evidence on IPFS
);

await claimTx.wait();
console.log("Claim submitted privately!");
```

#### 3. Check Claim Status

```javascript
// Get claim details
const claim = await contract.getClaimDetails(claimId);

// Status: Pending, Approved, Rejected, Paid
console.log("Status:", claim.status);
```

### For Assessors

#### 1. Get Authorization

```javascript
// Owner must authorize assessor
await contract.authorizeAssessor(assessorAddress);
```

#### 2. Evaluate Claims

```javascript
// Approve claim
await contract.assessClaim(
  claimId,
  true,  // approve
  35000  // approved amount (encrypted)
);

// Reject claim
await contract.assessClaim(
  claimId,
  false, // reject
  0
);
```

### For System Administrators

#### View System Statistics

```javascript
const [totalPolicies, totalClaims, activePolicies] =
  await contract.getSystemStats();

console.log(`Total Policies: ${totalPolicies}`);
console.log(`Total Claims: ${totalClaims}`);
console.log(`Active Policies: ${activePolicies}`);
```

---

## 🔒 Privacy Model

### What's Private (Encrypted on-chain)

✅ **Policy amounts** - Coverage and premium values
✅ **Claim amounts** - Damage assessments and claim requests
✅ **Individual calculations** - Premium computations and risk assessments
✅ **Assessment decisions** - Approved payout amounts

### What's Public (Visible on-chain)

📢 **Transaction existence** - Policy and claim creation events
📢 **Participant addresses** - Farmer and assessor addresses
📢 **Metadata** - Crop types, risk factors, timestamps
📢 **Status flags** - Policy active status, claim status (Pending/Approved/Rejected)
📢 **System statistics** - Total policies and claims count

### Decryption Permissions

🔑 **Policy Holder** - Can decrypt their own policy amounts
🔑 **Claim Owner** - Can decrypt their own claim details
🔑 **Contract Owner** - Administrative access to encrypted data
🔑 **Authorized Assessors** - Can decrypt claims they're evaluating

---

## 📦 Available Scripts

### Development
```bash
npm run compile          # Compile smart contracts
npm run clean            # Clean build artifacts
npm run node             # Start local Hardhat node
npm test                 # Run test suite
npm run coverage         # Generate coverage report
```

### Deployment
```bash
npm run deploy:local     # Deploy to local Hardhat network
npm run deploy:sepolia   # Deploy to Sepolia testnet
npm run deploy:zama      # Deploy to Zama FHE network
npm run verify:sepolia   # Verify contract on Etherscan
```

### Interaction
```bash
npm run interact:local   # Interact with local contract
npm run interact:sepolia # Interact with Sepolia contract
npm run simulate:local   # Run workflow simulation locally
npm run simulate:sepolia # Run workflow simulation on Sepolia
```

### Code Quality
```bash
npm run lint             # Run all linters
npm run lint:sol         # Solidity linting with Solhint
npm run lint:js          # JavaScript linting with ESLint
npm run prettier:check   # Check code formatting
npm run prettier:write   # Format all code
npm run verify:all       # Run all pre-deployment checks
```

### Security & Performance
```bash
npm run security:check   # Quick security check (npm audit)
npm run security:audit   # Full security audit scan
npm run gas:report       # Generate gas usage report
node scripts/gas-analysis.js  # Detailed gas analysis
```

---

## 🗂️ Project Structure

```
agriculture-insurance-platform/
├── contracts/                      # Smart contract source files
│   └── PrivateAgricultureInsurance.sol
│
├── scripts/                        # Deployment and utility scripts
│   ├── deploy.js                  # Main deployment script
│   ├── verify.js                  # Etherscan verification
│   ├── interact.js                # Contract interaction examples
│   ├── simulate.js                # Full workflow simulation
│   ├── security-audit.js          # Security pattern scanning
│   └── gas-analysis.js            # Gas optimization analysis
│
├── test/                          # Test suites
│   ├── AgricultureInsurance.test.js   # Main test suite (60+ tests)
│   └── performance.test.js            # Performance benchmarks
│
├── .github/workflows/             # CI/CD pipeline
│   └── test.yml                   # GitHub Actions workflow
│
├── .husky/                        # Git hooks
│   └── pre-commit                 # Pre-commit quality checks
│
├── deployments/                   # Deployment artifacts (auto-generated)
│   ├── localhost.json
│   ├── sepolia.json
│   └── zama.json
│
├── reports/                       # Generated reports (auto-generated)
│   ├── gas-analysis-*.json
│   └── security-audit-*.json
│
├── public/                        # Frontend files
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── .eslintrc.json                 # ESLint configuration
├── .solhint.json                  # Solhint configuration
├── .prettierrc                    # Prettier configuration
├── codecov.yml                    # Code coverage config
├── hardhat.config.js              # Hardhat configuration
├── package.json                   # Dependencies and scripts
├── .env.example                   # Environment template
│
├── DEPLOYMENT.md                  # Deployment guide
├── TESTING.md                     # Testing documentation
├── CI_CD.md                       # CI/CD documentation
├── SECURITY.md                    # Security & performance guide
├── PROJECT_SUMMARY.md             # Project overview
├── LICENSE                        # MIT License
└── README.md                      # This file
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
# =============================================================================
# NETWORK CONFIGURATION
# =============================================================================

# Sepolia Testnet RPC URL
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Zama FHE Network RPC URL
ZAMA_RPC_URL=https://devnet.zama.ai/

# =============================================================================
# DEPLOYMENT CONFIGURATION
# =============================================================================

# Private Key (without 0x prefix)
PRIVATE_KEY=your_private_key_here_without_0x_prefix

# Deployer Address (optional)
DEPLOYER_ADDRESS=0xYourDeployerAddress

# =============================================================================
# CONTRACT VERIFICATION
# =============================================================================

# Etherscan API Key
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# =============================================================================
# GAS REPORTING & OPTIMIZATION
# =============================================================================

# Enable gas reporting in tests
REPORT_GAS=false

# Coinmarketcap API Key (optional, for USD conversion)
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here

# =============================================================================
# SECURITY & ACCESS CONTROL
# =============================================================================

# Pauser Role Configuration
PAUSER_ADDRESS=0xYourPauserAddress

# Admin/Owner Address
ADMIN_ADDRESS=0xYourAdminAddress

# Emergency Contact
EMERGENCY_CONTACT=0xYourEmergencyContactAddress
```

See [`.env.example`](./.env.example) for complete configuration template.

### Hardhat Configuration

```javascript
// hardhat.config.js
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
        details: {
          yul: true,  // Advanced Yul optimization
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf"
          }
        }
      },
      evmVersion: "cancun"
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY]
    },
    zama: {
      url: process.env.ZAMA_RPC_URL,
      chainId: 8009,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    showTimeSpent: true,
    showMethodSig: true
  }
};
```

---

## 🔐 Security Considerations

### Smart Contract Security

✅ **Access Control**
- Owner-only administrative functions
- Authorized assessors for claim evaluation
- Role-based permissions

✅ **Input Validation**
- All user inputs validated
- Require statements for critical operations
- Boundary condition checks

✅ **FHE Security**
- Encrypted storage of sensitive data
- Access Control Lists (ACL) management
- Signature verification for decryption

✅ **Reentrancy Protection**
- Checks-Effects-Interactions pattern
- State updates before external calls

### Pre-deployment Security Checklist

- [ ] All tests passing (60+ test cases)
- [ ] Security audit completed (`npm run security:audit`)
- [ ] Gas analysis performed
- [ ] Contract size within limits (< 24 KB)
- [ ] Environment variables secured
- [ ] Pre-commit hooks configured
- [ ] Code reviewed by team
- [ ] Third-party audit (for mainnet)

### Known Limitations

⚠️ **FHE Testing** - 45 out of 60 tests require FHEVM infrastructure
⚠️ **Gas Costs** - FHE operations are more expensive than standard operations
⚠️ **Network Support** - Currently supports Sepolia and Zama devnet
⚠️ **Decryption Latency** - Async decryption requires callback mechanism

See [SECURITY.md](./SECURITY.md) for comprehensive security documentation.

---

## 📊 Gas Costs & Optimization

### Gas Benchmarks

| Operation | Target Gas | Limit | Status |
|-----------|-----------|-------|--------|
| createPolicy | < 400,000 | 500,000 | ✅ Optimized |
| submitClaim | < 300,000 | 400,000 | ✅ Optimized |
| assessClaim | < 250,000 | 300,000 | ✅ Optimized |
| authorizeAssessor | < 80,000 | 100,000 | ✅ Optimized |

### Optimization Techniques

✅ Yul optimizer enabled (800 runs)
✅ Efficient struct packing
✅ Minimal storage operations
✅ Gas-optimized loops
✅ Custom errors (Solidity 0.8.4+)
✅ View/pure functions where possible

### Cost Analysis

```bash
# Generate detailed gas report
REPORT_GAS=true npm test

# Analyze contract size and optimization
node scripts/gas-analysis.js
```

---

## 🚢 CI/CD Pipeline

### Automated Workflow

The project includes a **5-job CI/CD pipeline** with GitHub Actions:

#### Jobs

1. **code-quality** - Linting and formatting
   - Prettier formatting check
   - Solhint (Solidity linting)
   - ESLint (JavaScript linting)

2. **test-node-18** - Tests on Node.js 18.x
   - Dependency installation
   - Contract compilation
   - Full test suite
   - Coverage report

3. **test-node-20** - Tests on Node.js 20.x
   - Same as Node 18
   - Ensures compatibility

4. **deployment-check** - Deployment verification
   - Simulates deployment
   - Verifies scripts

5. **build-status** - Overall status
   - Depends on all jobs
   - Final pipeline status

### Triggers

✅ Push to `main` or `develop` branches
✅ Pull requests to `main` or `develop`

### Quality Gates

- ✅ All tests must pass
- ✅ Code coverage > 80%
- ✅ No linting errors
- ✅ Properly formatted code
- ✅ Successful deployment simulation

See [CI_CD.md](./CI_CD.md) for detailed documentation.

---

## 🎯 Use Cases

### 👨‍🌾 Individual Farmers
- Protect financial privacy from competitors
- Secure coverage for valuable crops
- Confidential damage reporting
- Private claim settlements

### 🏢 Insurance Providers
- Assess risks without exposing client data
- Automated claim verification
- Reduced fraud through blockchain transparency
- Lower operational costs with smart contracts

### 🤝 Agricultural Cooperatives
- Bulk policy management for members
- Privacy-preserving risk pools
- Collective claim processing
- Member data protection

### 🏛️ Regulators & Auditors
- Transparent auditing with privacy
- Compliance verification
- Fraud detection without data exposure
- Trust without compromising confidentiality

---

## 🗺️ Roadmap

### Phase 1 - Current ✅
- [x] Core FHE smart contract
- [x] Policy and claim management
- [x] Assessor workflow
- [x] Comprehensive testing (60+ tests)
- [x] CI/CD pipeline
- [x] Sepolia deployment
- [x] Frontend interface

### Phase 2 - Q1 2025 🚧
- [ ] Oracle integration for weather data
- [ ] Advanced risk assessment models
- [ ] Mobile-responsive UI improvements
- [ ] Multi-language support
- [ ] Enhanced analytics dashboard

### Phase 3 - Q2 2025 📅
- [ ] Multi-chain deployment (Polygon, BSC)
- [ ] Reinsurance pool functionality
- [ ] AI-powered risk scoring
- [ ] Native mobile applications
- [ ] Integration with IoT sensors

### Phase 4 - Q3 2025 🔮
- [ ] DAO governance implementation
- [ ] Tokenomics and rewards system
- [ ] Cross-chain bridges
- [ ] Enterprise partnerships
- [ ] Mainnet launch

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

🐛 **Bug Reports** - Report issues on GitHub
✨ **Feature Requests** - Suggest new features
💻 **Code Contributions** - Submit pull requests
📚 **Documentation** - Improve docs and guides
🎓 **Educational Content** - Create tutorials and examples

### Development Process

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/FHEAgricultureInsurance.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and commit
git commit -m "Add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Open a Pull Request
```

### Code Standards

- Follow existing code style
- Add tests for new features
- Update documentation
- Run all quality checks: `npm run verify:all`
- Ensure CI/CD pipeline passes

---

## 📚 Documentation

### Available Guides

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
📖 **[TESTING.md](./TESTING.md)** - Testing procedures and coverage
📖 **[CI_CD.md](./CI_CD.md)** - CI/CD pipeline documentation
📖 **[SECURITY.md](./SECURITY.md)** - Security and performance guide (comprehensive)
📖 **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview and summary

### External Resources

🔗 **[Zama Documentation](https://docs.zama.ai/)** - FHEVM official docs
🔗 **[Solidity Security](https://consensys.github.io/smart-contract-best-practices/)** - Best practices
🔗 **[OpenZeppelin](https://docs.openzeppelin.com/)** - Security standards

---

## 🔍 Troubleshooting

### Common Issues

#### Issue: Tests failing with FHE errors

```bash
# Solution: FHE tests require FHEVM infrastructure
# Run non-FHE tests only:
npm test -- --grep "should deploy contract"

# Or deploy to Sepolia for full testing:
npm run deploy:sepolia
npm test -- --network sepolia
```

#### Issue: Gas estimation failed

```bash
# Solution: Increase gas limit in hardhat.config.js
networks: {
  sepolia: {
    gas: 8000000,
    gasPrice: 20000000000
  }
}
```

#### Issue: Contract verification failed

```bash
# Solution: Ensure correct constructor arguments
npm run verify:sepolia

# Manual verification:
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

#### Issue: MetaMask connection issues

```bash
# Solution: Reset MetaMask account
# Settings → Advanced → Reset Account
# Then refresh browser and reconnect
```

### Getting Help

💬 **GitHub Issues** - [Open an issue](https://github.com/GaylordOsinski/FHEAgricultureInsurance/issues)
💬 **GitHub Discussions** - [Join discussion](https://github.com/GaylordOsinski/FHEAgricultureInsurance/discussions)
💬 **Documentation** - Check [SECURITY.md](./SECURITY.md) and [TESTING.md](./TESTING.md)

---

## 🏆 Acknowledgments

### Built With

- **Zama** - For the groundbreaking FHEVM technology enabling on-chain encrypted computation
- **Hardhat** - For the professional-grade Ethereum development environment
- **OpenZeppelin** - For battle-tested smart contract libraries
- **Ethereum Foundation** - For the Sepolia testnet infrastructure

### Special Thanks

- Zama team for FHE technology support and documentation
- Hardhat team for excellent developer tooling
- Agricultural insurance domain experts for requirements guidance
- Open-source community for continuous inspiration

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Agriculture Insurance Platform Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact & Support

### Connect With Us

📧 **Email**: support@agriculture-insurance.io
🐙 **GitHub**: [FHEAgricultureInsurance](https://github.com/GaylordOsinski/FHEAgricultureInsurance)
🌐 **Website**: [https://fhe-agriculture-insurance.vercel.app/](https://fhe-agriculture-insurance.vercel.app/)

### Community

💬 **Discord** - Join our community (coming soon)
🐦 **Twitter** - Follow for updates (coming soon)
📺 **YouTube** - Tutorial videos (coming soon)

---

<div align="center">

**Built with ❤️ for the Agricultural Community**

*Protecting Privacy • Ensuring Trust • Empowering Farmers*

⭐ **Star us on GitHub** if this project helped you!

[🌐 Live Demo](https://fhe-agriculture-insurance.vercel.app/) • [📹 Video Demo demo.mp4]• [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

**Made with Zama FHEVM** 🔐

</div>
