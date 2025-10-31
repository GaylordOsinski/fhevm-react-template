/**
 * PolicyList Component
 * Displays list of user's insurance policies
 */

import { Policy, CROP_TYPES } from '../types/insurance';
import { formatDate } from '../lib/fhevm-client';

interface PolicyListProps {
  policies: Policy[];
  loading: boolean;
  onRefresh: () => void;
}

export function PolicyList({ policies, loading, onRefresh }: PolicyListProps) {
  const isPolicyActive = (policy: Policy) => {
    return policy.isActive && Number(policy.expiresAt) * 1000 > Date.now();
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h5>
            <i className="icon-list"></i>
            My Policies
          </h5>
        </div>
        <div className="card-body text-center">
          <span className="spinner"></span>
          <p>Loading policies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>
          <i className="icon-list"></i>
          My Policies
        </h5>
        <button className="btn btn-sm btn-outline" onClick={onRefresh}>
          <i className="icon-sync"></i>
          Refresh
        </button>
      </div>
      <div className="card-body">
        {policies.length === 0 ? (
          <div className="empty-state">
            <i className="icon-folder-open"></i>
            <p>No policies found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Policy ID</th>
                  <th>Crop Type</th>
                  <th>Farm Size</th>
                  <th>Created</th>
                  <th>Expires</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => {
                  const isActive = isPolicyActive(policy);
                  return (
                    <tr key={policy.policyId}>
                      <td>#{policy.policyId}</td>
                      <td>{CROP_TYPES[policy.cropType]}</td>
                      <td>{policy.farmSize.toString()} acres</td>
                      <td>{formatDate(policy.createdAt)}</td>
                      <td>{formatDate(policy.expiresAt)}</td>
                      <td>
                        <span className={`badge ${isActive ? 'badge-success' : 'badge-secondary'}`}>
                          {isActive ? 'Active' : 'Expired'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
