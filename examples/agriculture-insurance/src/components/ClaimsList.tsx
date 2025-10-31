/**
 * ClaimsList Component
 * Displays list of user's insurance claims
 */

import { Claim, RISK_TYPES, CLAIM_STATUSES } from '../types/insurance';
import { formatDateTime } from '../lib/fhevm-client';

interface ClaimsListProps {
  claims: Claim[];
  loading: boolean;
}

export function ClaimsList({ claims, loading }: ClaimsListProps) {
  const getStatusClass = (status: number): string => {
    const classes = ['status-submitted', 'status-review', 'status-approved', 'status-rejected', 'status-paid'];
    return classes[status] || 'status-submitted';
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h5>
            <i className="icon-clipboard-list"></i>
            My Claims
          </h5>
        </div>
        <div className="card-body text-center">
          <span className="spinner"></span>
          <p>Loading claims...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>
          <i className="icon-clipboard-list"></i>
          My Claims
        </h5>
      </div>
      <div className="card-body">
        {claims.length === 0 ? (
          <div className="empty-state">
            <i className="icon-clipboard"></i>
            <p>No claims found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Policy ID</th>
                  <th>Risk Type</th>
                  <th>Submitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.claimId}>
                    <td>#{claim.claimId}</td>
                    <td>#{claim.policyId.toString()}</td>
                    <td>{RISK_TYPES[claim.riskType]}</td>
                    <td>{formatDateTime(claim.submittedAt)}</td>
                    <td>
                      <span className={`badge ${getStatusClass(claim.status)}`}>
                        {CLAIM_STATUSES[claim.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
