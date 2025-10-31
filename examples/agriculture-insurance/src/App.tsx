/**
 * Main App Component
 * Agriculture Insurance React Application
 */

import { useState } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { Header } from './components/Header';
import { PolicyCreation } from './components/PolicyCreation';
import { ClaimSubmission } from './components/ClaimSubmission';
import { PolicyList } from './components/PolicyList';
import { ClaimsList } from './components/ClaimsList';
import { useInsurance } from './hooks/useInsurance';
import { PolicyFormData, ClaimFormData } from './types/insurance';
import './App.css';

function App() {
  const {
    stats,
    policies,
    claims,
    loading,
    initContract,
    loadUserData,
    createPolicy,
    submitClaim,
  } = useInsurance();

  const [walletConnected, setWalletConnected] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleWalletConnect = async (address: string) => {
    await initContract(address);
    setWalletConnected(true);
    showNotification('success', 'Wallet connected successfully!');
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handlePolicySubmit = async (formData: PolicyFormData) => {
    setTransactionLoading(true);
    try {
      const result = await createPolicy(formData);
      if (result.success) {
        showNotification('success', `Policy created successfully! TX: ${result.txHash}`);
      } else {
        showNotification('error', result.error || 'Failed to create policy');
      }
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to create policy');
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleClaimSubmit = async (formData: ClaimFormData) => {
    setTransactionLoading(true);
    try {
      const result = await submitClaim(formData);
      if (result.success) {
        showNotification('success', `Claim submitted successfully! TX: ${result.txHash}`);
      } else {
        showNotification('error', result.error || 'Failed to submit claim');
      }
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to submit claim');
    } finally {
      setTransactionLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <i className="icon-seedling"></i>
            Private Agricultural Insurance
          </div>
          <div className="navbar-end">
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="container">
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="notification-close">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Header with Stats */}
      <Header stats={stats} />

      {/* Main Content */}
      <div className="container main-content">
        {!walletConnected ? (
          <div className="empty-state">
            <i className="icon-wallet-large"></i>
            <h3>Connect Your Wallet</h3>
            <p>Please connect your wallet to use the Agricultural Insurance System</p>
          </div>
        ) : (
          <>
            {/* Forms Section */}
            <div className="forms-grid">
              <PolicyCreation
                onSubmit={handlePolicySubmit}
                loading={transactionLoading}
              />
              <ClaimSubmission
                onSubmit={handleClaimSubmit}
                loading={transactionLoading}
              />
            </div>

            {/* Lists Section */}
            <div className="lists-section">
              <PolicyList
                policies={policies}
                loading={loading}
                onRefresh={loadUserData}
              />
              <ClaimsList claims={claims} loading={loading} />
            </div>

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <i className="icon-info-circle"></i>
              <strong>Privacy Protection:</strong> This system uses Zama FHE (Fully Homomorphic
              Encryption) technology to ensure all insurance amounts and claim data are encrypted on
              the blockchain. Only authorized parties can decrypt and view the data, protecting your
              privacy and security.
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 Private Agricultural Insurance System. Built with Zama FHE Technology</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
