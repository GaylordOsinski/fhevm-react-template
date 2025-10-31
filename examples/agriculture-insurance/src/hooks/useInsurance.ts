/**
 * useInsurance Hook
 * Custom React hook for interacting with the Agriculture Insurance contract
 */

import { useState, useEffect, useCallback } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import {
  Policy,
  Claim,
  SystemStats,
  PolicyFormData,
  ClaimFormData,
  TransactionStatus
} from '../types/insurance';
import { createProvider } from '../lib/fhevm-client';

export function useInsurance() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract
  const initContract = useCallback(async (address: string) => {
    try {
      const browserProvider = await createProvider();
      const signer = await browserProvider.getSigner();
      const insuranceContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setProvider(browserProvider);
      setContract(insuranceContract);
      setAccount(address);
      setError(null);
    } catch (err) {
      console.error('Error initializing contract:', err);
      setError('Failed to initialize contract');
    }
  }, []);

  // Load system statistics
  const loadSystemStats = useCallback(async () => {
    if (!contract) return;

    try {
      const result = await contract.getSystemStats();
      setStats({
        totalPolicies: result.totalPolicies,
        totalClaims: result.totalClaims,
        activePolicies: result.activePolicies,
      });
    } catch (err) {
      console.error('Error loading system stats:', err);
    }
  }, [contract]);

  // Load user policies
  const loadUserPolicies = useCallback(async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);
      const policyIds = await contract.getFarmerPolicies(account);

      const policiesData: Policy[] = [];
      for (const policyId of policyIds) {
        const policyDetails = await contract.getPolicyDetails(policyId);
        policiesData.push({
          policyId: Number(policyId),
          farmer: policyDetails.farmer,
          cropType: policyDetails.cropType,
          farmSize: policyDetails.farmSize,
          createdAt: policyDetails.createdAt,
          expiresAt: policyDetails.expiresAt,
          isActive: policyDetails.isActive,
          ipfsHash: policyDetails.ipfsHash,
        });
      }

      setPolicies(policiesData);
    } catch (err) {
      console.error('Error loading policies:', err);
      setError('Failed to load policies');
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  // Load user claims
  const loadUserClaims = useCallback(async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);
      const claimIds = await contract.getFarmerClaims(account);

      const claimsData: Claim[] = [];
      for (const claimId of claimIds) {
        const claimDetails = await contract.getClaimDetails(claimId);
        claimsData.push({
          claimId: Number(claimId),
          policyId: claimDetails.policyId,
          farmer: claimDetails.farmer,
          riskType: claimDetails.riskType,
          status: claimDetails.status,
          submittedAt: claimDetails.submittedAt,
          reviewedAt: claimDetails.reviewedAt,
          paidAt: claimDetails.paidAt,
          evidenceHash: claimDetails.evidenceHash,
        });
      }

      setClaims(claimsData);
    } catch (err) {
      console.error('Error loading claims:', err);
      setError('Failed to load claims');
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  // Create policy
  const createPolicy = useCallback(async (
    formData: PolicyFormData
  ): Promise<TransactionStatus> => {
    if (!contract) {
      return { loading: false, error: 'Contract not initialized', success: false };
    }

    try {
      // Convert duration from days to seconds
      const durationInSeconds = BigInt(formData.duration) * 86400n;

      // Estimate gas
      const gasEstimate = await contract.createPolicy.estimateGas(
        formData.coverage,
        formData.premium,
        formData.cropType,
        formData.farmSize,
        durationInSeconds,
        formData.ipfsHash
      );

      // Send transaction with 20% gas buffer
      const tx = await contract.createPolicy(
        formData.coverage,
        formData.premium,
        formData.cropType,
        formData.farmSize,
        durationInSeconds,
        formData.ipfsHash,
        { gasLimit: gasEstimate * 120n / 100n }
      );

      // Wait for confirmation
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // Reload data
        await Promise.all([loadSystemStats(), loadUserPolicies()]);
        return {
          loading: false,
          error: null,
          success: true,
          txHash: receipt.hash
        };
      } else {
        return {
          loading: false,
          error: 'Transaction failed',
          success: false
        };
      }
    } catch (err: any) {
      console.error('Error creating policy:', err);
      const errorMessage = err.reason || err.message || 'Failed to create policy';
      return {
        loading: false,
        error: errorMessage,
        success: false
      };
    }
  }, [contract, loadSystemStats, loadUserPolicies]);

  // Submit claim
  const submitClaim = useCallback(async (
    formData: ClaimFormData
  ): Promise<TransactionStatus> => {
    if (!contract) {
      return { loading: false, error: 'Contract not initialized', success: false };
    }

    try {
      // Estimate gas
      const gasEstimate = await contract.submitClaim.estimateGas(
        formData.policyId,
        formData.damageAmount,
        formData.claimAmount,
        formData.riskType,
        formData.evidenceHash
      );

      // Send transaction with 20% gas buffer
      const tx = await contract.submitClaim(
        formData.policyId,
        formData.damageAmount,
        formData.claimAmount,
        formData.riskType,
        formData.evidenceHash,
        { gasLimit: gasEstimate * 120n / 100n }
      );

      // Wait for confirmation
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // Reload data
        await Promise.all([loadSystemStats(), loadUserClaims()]);
        return {
          loading: false,
          error: null,
          success: true,
          txHash: receipt.hash
        };
      } else {
        return {
          loading: false,
          error: 'Transaction failed',
          success: false
        };
      }
    } catch (err: any) {
      console.error('Error submitting claim:', err);
      const errorMessage = err.reason || err.message || 'Failed to submit claim';
      return {
        loading: false,
        error: errorMessage,
        success: false
      };
    }
  }, [contract, loadSystemStats, loadUserClaims]);

  // Load all user data
  const loadUserData = useCallback(async () => {
    if (!contract || !account) return;

    await Promise.all([
      loadSystemStats(),
      loadUserPolicies(),
      loadUserClaims()
    ]);
  }, [contract, account, loadSystemStats, loadUserPolicies, loadUserClaims]);

  // Auto-load data when contract is initialized
  useEffect(() => {
    if (contract && account) {
      loadUserData();
    }
  }, [contract, account, loadUserData]);

  return {
    contract,
    provider,
    account,
    stats,
    policies,
    claims,
    loading,
    error,
    initContract,
    loadSystemStats,
    loadUserPolicies,
    loadUserClaims,
    loadUserData,
    createPolicy,
    submitClaim,
  };
}
