/**
 * Contract Configuration and ABI
 * Private Agriculture Insurance Contract
 */

// Contract address on Sepolia testnet
export const CONTRACT_ADDRESS = "0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d";

// Contract ABI
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "assessor", "type": "address"}
    ],
    "name": "AssessorAuthorized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "assessor", "type": "address"}
    ],
    "name": "AssessorRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "assessor", "type": "address"}
    ],
    "name": "ClaimAssessed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "farmer", "type": "address"}
    ],
    "name": "ClaimPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
      {"indexed": false, "internalType": "enum PrivateAgricultureInsurance.ClaimStatus", "name": "status", "type": "uint8"}
    ],
    "name": "ClaimStatusUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "policyId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "farmer", "type": "address"}
    ],
    "name": "ClaimSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "policyId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "farmer", "type": "address"},
      {"indexed": false, "internalType": "enum PrivateAgricultureInsurance.CropType", "name": "cropType", "type": "uint8"}
    ],
    "name": "PolicyCreated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_claimId", "type": "uint256"},
      {"internalType": "address", "name": "_assessor", "type": "address"}
    ],
    "name": "assignAssessor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_assessor", "type": "address"}
    ],
    "name": "authorizeAssessor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint32", "name": "_coverage", "type": "uint32"},
      {"internalType": "uint32", "name": "_premium", "type": "uint32"},
      {"internalType": "enum PrivateAgricultureInsurance.CropType", "name": "_cropType", "type": "uint8"},
      {"internalType": "uint256", "name": "_farmSize", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "string", "name": "_ipfsHash", "type": "string"}
    ],
    "name": "createPolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_claimId", "type": "uint256"}
    ],
    "name": "getClaimDetails",
    "outputs": [
      {"internalType": "uint256", "name": "policyId", "type": "uint256"},
      {"internalType": "address", "name": "farmer", "type": "address"},
      {"internalType": "enum PrivateAgricultureInsurance.RiskFactor", "name": "riskType", "type": "uint8"},
      {"internalType": "enum PrivateAgricultureInsurance.ClaimStatus", "name": "status", "type": "uint8"},
      {"internalType": "uint256", "name": "submittedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "reviewedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "paidAt", "type": "uint256"},
      {"internalType": "string", "name": "evidenceHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_farmer", "type": "address"}
    ],
    "name": "getFarmerClaims",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_farmer", "type": "address"}
    ],
    "name": "getFarmerPolicies",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_policyId", "type": "uint256"}
    ],
    "name": "getPolicyDetails",
    "outputs": [
      {"internalType": "address", "name": "farmer", "type": "address"},
      {"internalType": "enum PrivateAgricultureInsurance.CropType", "name": "cropType", "type": "uint8"},
      {"internalType": "uint256", "name": "farmSize", "type": "uint256"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "expiresAt", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSystemStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalPolicies", "type": "uint256"},
      {"internalType": "uint256", "name": "totalClaims", "type": "uint256"},
      {"internalType": "uint256", "name": "activePolicies", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_claimId", "type": "uint256"}
    ],
    "name": "payClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_claimId", "type": "uint256"},
      {"internalType": "uint32", "name": "_actualYield", "type": "uint32"},
      {"internalType": "uint32", "name": "_expectedYield", "type": "uint32"},
      {"internalType": "uint32", "name": "_lossPercentage", "type": "uint32"},
      {"internalType": "uint32", "name": "_weatherImpact", "type": "uint32"}
    ],
    "name": "performAssessment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_claimId", "type": "uint256"}
    ],
    "name": "processClaimDecision",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_assessor", "type": "address"}
    ],
    "name": "revokeAssessor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_policyId", "type": "uint256"},
      {"internalType": "uint32", "name": "_damageAmount", "type": "uint32"},
      {"internalType": "uint32", "name": "_claimAmount", "type": "uint32"},
      {"internalType": "enum PrivateAgricultureInsurance.RiskFactor", "name": "_riskType", "type": "uint8"},
      {"internalType": "string", "name": "_evidenceHash", "type": "string"}
    ],
    "name": "submitClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
