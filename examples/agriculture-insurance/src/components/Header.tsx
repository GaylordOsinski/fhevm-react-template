/**
 * Header Component
 * Displays system statistics and hero section
 */

import { SystemStats } from '../types/insurance';

interface HeaderProps {
  stats: SystemStats | null;
}

export function Header({ stats }: HeaderProps) {
  return (
    <>
      <div className="hero-section">
        <div className="container text-center">
          <h1>
            <i className="icon-shield"></i>
            Confidential Agricultural Insurance System
          </h1>
          <p className="lead">
            Protecting agricultural insurance data privacy using Zama FHE technology,
            ensuring confidential and fair claim processing
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <i className="icon-lock"></i>
              <h4>Complete Privacy</h4>
              <p>All insurance amounts and claim data are encrypted with homomorphic encryption</p>
            </div>
            <div className="feature-item">
              <i className="icon-search"></i>
              <h4>Transparent Review</h4>
              <p>Blockchain-based transparent claim review process</p>
            </div>
            <div className="feature-item">
              <i className="icon-tractor"></i>
              <h4>Agriculture Specialized</h4>
              <p>Smart contract system designed specifically for agricultural insurance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <i className="icon-file-contract"></i>
              <h4>{stats ? stats.totalPolicies.toString() : '-'}</h4>
              <p>Total Policies</p>
            </div>
            <div className="stat-card">
              <i className="icon-clipboard-list"></i>
              <h4>{stats ? stats.totalClaims.toString() : '-'}</h4>
              <p>Total Claims</p>
            </div>
            <div className="stat-card">
              <i className="icon-check-circle"></i>
              <h4>{stats ? stats.activePolicies.toString() : '-'}</h4>
              <p>Active Policies</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
