/**
 * TypeScript Types for Agriculture Insurance System
 */

// Enums matching Solidity contract enums
export enum ClaimStatus {
  Submitted = 0,
  UnderReview = 1,
  Approved = 2,
  Rejected = 3,
  Paid = 4
}

export enum CropType {
  Wheat = 0,
  Corn = 1,
  Rice = 2,
  Soybeans = 3,
  Cotton = 4,
  Other = 5
}

export enum RiskFactor {
  Drought = 0,
  Flood = 1,
  Hail = 2,
  Frost = 3,
  Disease = 4,
  Pest = 5
}

// String arrays for display
export const CROP_TYPES = ['Wheat', 'Corn', 'Rice', 'Soybeans', 'Cotton', 'Other'];
export const RISK_TYPES = ['Drought', 'Flood', 'Hail', 'Frost', 'Disease', 'Pest'];
export const CLAIM_STATUSES = ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Paid'];

// Policy interface
export interface Policy {
  policyId: number;
  farmer: string;
  cropType: CropType;
  farmSize: bigint;
  createdAt: bigint;
  expiresAt: bigint;
  isActive: boolean;
  ipfsHash: string;
}

// Claim interface
export interface Claim {
  claimId: number;
  policyId: bigint;
  farmer: string;
  riskType: RiskFactor;
  status: ClaimStatus;
  submittedAt: bigint;
  reviewedAt: bigint;
  paidAt: bigint;
  evidenceHash: string;
}

// System statistics interface
export interface SystemStats {
  totalPolicies: bigint;
  totalClaims: bigint;
  activePolicies: bigint;
}

// Form data interfaces
export interface PolicyFormData {
  coverage: string;
  premium: string;
  cropType: number;
  farmSize: string;
  duration: string;
  ipfsHash: string;
}

export interface ClaimFormData {
  policyId: string;
  damageAmount: string;
  claimAmount: string;
  riskType: number;
  evidenceHash: string;
}

// Transaction status
export interface TransactionStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
  txHash?: string;
}

// Wallet state
export interface WalletState {
  address: string | null;
  connected: boolean;
  chainId: string | null;
}
