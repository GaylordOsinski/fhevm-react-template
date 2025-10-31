// Private Agriculture Insurance System - Main Application
let provider;
let signer;
let contract;
let userAccount;

// Contract configuration - Update these values for deployment
const CONTRACT_ADDRESS = "0x44cB004a09224332d7Bc4161aeF9cEDbAe43991d"; // FHE Agriculture Insurance Contract on Sepolia
const CONTRACT_ABI = [
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
];

// Constants
const CROP_TYPES = ['Wheat', 'Corn', 'Rice', 'Soybeans', 'Cotton', 'Other'];
const RISK_TYPES = ['Drought', 'Flood', 'Hail', 'Frost', 'Disease', 'Pest'];
const CLAIM_STATUSES = ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Paid'];

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function formatAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(38)}`;
}

function formatDate(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
}

function formatDateTime(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
}

// Wallet connection
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showAlert('Please install MetaMask to use this application', 'warning');
        return;
    }

    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialize ethers provider
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();

        // Update UI
        document.getElementById('walletAddress').textContent = formatAddress(userAccount);
        document.getElementById('connectBtn').innerHTML = '<i class="fas fa-check me-1"></i>Connected';
        document.getElementById('connectBtn').disabled = true;

        // Initialize contract
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Load data
        await loadSystemStats();
        await loadUserData();

        showAlert('Wallet connected successfully!', 'success');

    } catch (error) {
        console.error('Error connecting wallet:', error);
        showAlert('Failed to connect wallet. Please try again.', 'error');
    }
}

// Load system statistics
async function loadSystemStats() {
    if (!contract) return;

    try {
        const stats = await contract.getSystemStats();
        document.getElementById('totalPolicies').textContent = stats.totalPolicies.toString();
        document.getElementById('totalClaims').textContent = stats.totalClaims.toString();
        document.getElementById('activePolicies').textContent = stats.activePolicies.toString();
    } catch (error) {
        console.error('Error loading system stats:', error);
        showAlert('Failed to load system statistics', 'warning');
    }
}

// Load user data
async function loadUserData() {
    if (!contract || !userAccount) return;

    try {
        await Promise.all([
            loadUserPolicies(),
            loadUserClaims()
        ]);
    } catch (error) {
        console.error('Error loading user data:', error);
        showAlert('Failed to load user data', 'warning');
    }
}

// Load user policies
async function loadUserPolicies() {
    const container = document.getElementById('policiesContainer');
    container.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading policies...</div>';

    try {
        const policyIds = await contract.getFarmerPolicies(userAccount);

        if (policyIds.length === 0) {
            container.innerHTML = '<p class="text-muted">No policies found</p>';
            return;
        }

        let html = '<div class="table-responsive"><table class="table table-striped">';
        html += '<thead><tr><th>Policy ID</th><th>Crop Type</th><th>Farm Size</th><th>Created</th><th>Expires</th><th>Status</th></tr></thead><tbody>';

        for (const policyId of policyIds) {
            const policy = await contract.getPolicyDetails(policyId);
            const isActive = policy.isActive && (parseInt(policy.expiresAt) * 1000 > Date.now());

            html += `<tr>
                <td>#${policyId.toString()}</td>
                <td>${CROP_TYPES[policy.cropType]}</td>
                <td>${policy.farmSize.toString()} acres</td>
                <td>${formatDate(policy.createdAt)}</td>
                <td>${formatDate(policy.expiresAt)}</td>
                <td><span class="badge ${isActive ? 'bg-success' : 'bg-secondary'}">${isActive ? 'Active' : 'Expired'}</span></td>
            </tr>`;
        }

        html += '</tbody></table></div>';
        container.innerHTML = html;

    } catch (error) {
        console.error('Error loading policies:', error);
        container.innerHTML = '<p class="text-danger">Failed to load policies</p>';
    }
}

// Load user claims
async function loadUserClaims() {
    const container = document.getElementById('claimsContainer');
    container.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading claims...</div>';

    try {
        const claimIds = await contract.getFarmerClaims(userAccount);

        if (claimIds.length === 0) {
            container.innerHTML = '<p class="text-muted">No claims found</p>';
            return;
        }

        let html = '<div class="table-responsive"><table class="table table-striped">';
        html += '<thead><tr><th>Claim ID</th><th>Policy ID</th><th>Risk Type</th><th>Submitted</th><th>Status</th></tr></thead><tbody>';

        for (const claimId of claimIds) {
            const claim = await contract.getClaimDetails(claimId);

            html += `<tr>
                <td>#${claimId.toString()}</td>
                <td>#${claim.policyId.toString()}</td>
                <td>${RISK_TYPES[claim.riskType]}</td>
                <td>${formatDateTime(claim.submittedAt)}</td>
                <td><span class="badge status-${getStatusClass(claim.status)}">${CLAIM_STATUSES[claim.status]}</span></td>
            </tr>`;
        }

        html += '</tbody></table></div>';
        container.innerHTML = html;

    } catch (error) {
        console.error('Error loading claims:', error);
        container.innerHTML = '<p class="text-danger">Failed to load claims</p>';
    }
}

function getStatusClass(status) {
    const classes = ['submitted', 'review', 'approved', 'rejected', 'paid'];
    return classes[status] || 'submitted';
}

// Form handlers
document.getElementById('policyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!contract || !userAccount) {
        showAlert('Please connect your wallet first', 'warning');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating Policy...';
        submitBtn.disabled = true;

        const coverage = document.getElementById('coverage').value;
        const premium = document.getElementById('premium').value;
        const cropType = document.getElementById('cropType').value;
        const farmSize = document.getElementById('farmSize').value;
        const duration = document.getElementById('duration').value * 24 * 60 * 60; // Convert to seconds
        const ipfsHash = document.getElementById('ipfsHash').value || "";

        // Estimate gas and send transaction
        const gasEstimate = await contract.estimateGas.createPolicy(
            coverage, premium, cropType, farmSize, duration, ipfsHash
        );

        const tx = await contract.createPolicy(
            coverage, premium, cropType, farmSize, duration, ipfsHash,
            { gasLimit: gasEstimate.mul(120).div(100) } // Add 20% buffer
        );

        showAlert(`Transaction submitted! Hash: <span class="tx-hash">${tx.hash}</span>`, 'info');

        // Wait for confirmation
        const receipt = await tx.wait();

        if (receipt.status === 1) {
            showAlert('Policy created successfully!', 'success');
            document.getElementById('policyForm').reset();
            await loadUserData();
            await loadSystemStats();
        } else {
            throw new Error('Transaction failed');
        }

    } catch (error) {
        console.error('Error creating policy:', error);
        let errorMessage = 'Failed to create policy';
        if (error.reason) {
            errorMessage += `: ${error.reason}`;
        } else if (error.message) {
            errorMessage += `: ${error.message}`;
        }
        showAlert(errorMessage, 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

document.getElementById('claimForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!contract || !userAccount) {
        showAlert('Please connect your wallet first', 'warning');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting Claim...';
        submitBtn.disabled = true;

        const policyId = document.getElementById('policyId').value;
        const damageAmount = document.getElementById('damageAmount').value;
        const claimAmount = document.getElementById('claimAmount').value;
        const riskType = document.getElementById('riskType').value;
        const evidenceHash = document.getElementById('evidenceHash').value;

        // Estimate gas and send transaction
        const gasEstimate = await contract.estimateGas.submitClaim(
            policyId, damageAmount, claimAmount, riskType, evidenceHash
        );

        const tx = await contract.submitClaim(
            policyId, damageAmount, claimAmount, riskType, evidenceHash,
            { gasLimit: gasEstimate.mul(120).div(100) } // Add 20% buffer
        );

        showAlert(`Transaction submitted! Hash: <span class="tx-hash">${tx.hash}</span>`, 'info');

        // Wait for confirmation
        const receipt = await tx.wait();

        if (receipt.status === 1) {
            showAlert('Claim submitted successfully!', 'success');
            document.getElementById('claimForm').reset();
            await loadUserData();
            await loadSystemStats();
        } else {
            throw new Error('Transaction failed');
        }

    } catch (error) {
        console.error('Error submitting claim:', error);
        let errorMessage = 'Failed to submit claim';
        if (error.reason) {
            errorMessage += `: ${error.reason}`;
        } else if (error.message) {
            errorMessage += `: ${error.message}`;
        }
        showAlert(errorMessage, 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Event listeners
window.addEventListener('load', () => {
    // Check if wallet is already connected
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    connectWallet();
                }
            });

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                location.reload();
            } else {
                location.reload(); // Refresh to reconnect with new account
            }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
            location.reload();
        });
    }
});