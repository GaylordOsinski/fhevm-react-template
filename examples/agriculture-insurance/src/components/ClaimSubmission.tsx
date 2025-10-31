/**
 * ClaimSubmission Component
 * Form for submitting insurance claims
 */

import { useState } from 'react';
import { ClaimFormData, RISK_TYPES } from '../types/insurance';

interface ClaimSubmissionProps {
  onSubmit: (formData: ClaimFormData) => Promise<void>;
  loading: boolean;
}

export function ClaimSubmission({ onSubmit, loading }: ClaimSubmissionProps) {
  const [formData, setFormData] = useState<ClaimFormData>({
    policyId: '',
    damageAmount: '',
    claimAmount: '',
    riskType: 0,
    evidenceHash: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'riskType' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Reset form on success
    setFormData({
      policyId: '',
      damageAmount: '',
      claimAmount: '',
      riskType: 0,
      evidenceHash: '',
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>
          <i className="icon-file-medical"></i>
          Submit Claim
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="policyId">Policy ID</label>
            <input
              type="number"
              className="form-control"
              id="policyId"
              name="policyId"
              value={formData.policyId}
              onChange={handleChange}
              placeholder="Enter policy ID"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="damageAmount">Damage Amount (USDT)</label>
            <input
              type="number"
              className="form-control"
              id="damageAmount"
              name="damageAmount"
              value={formData.damageAmount}
              onChange={handleChange}
              placeholder="Actual damage amount"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="claimAmount">Claim Amount (USDT)</label>
            <input
              type="number"
              className="form-control"
              id="claimAmount"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              placeholder="Requested claim amount"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="riskType">Risk Type</label>
            <select
              className="form-select"
              id="riskType"
              name="riskType"
              value={formData.riskType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {RISK_TYPES.map((risk, index) => (
                <option key={index} value={index}>
                  {risk}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="evidenceHash">Evidence IPFS Hash</label>
            <input
              type="text"
              className="form-control"
              id="evidenceHash"
              name="evidenceHash"
              value={formData.evidenceHash}
              onChange={handleChange}
              placeholder="Evidence document hash"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Submitting Claim...
              </>
            ) : (
              <>
                <i className="icon-file-upload"></i>
                Submit Claim
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
