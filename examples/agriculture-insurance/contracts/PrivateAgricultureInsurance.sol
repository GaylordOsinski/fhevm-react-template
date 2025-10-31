// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint32, euint8, ebool } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract PrivateAgricultureInsurance is SepoliaConfig {

    address public owner;
    uint256 public policyCounter;
    uint256 public claimCounter;

    enum ClaimStatus { Submitted, UnderReview, Approved, Rejected, Paid }
    enum CropType { Wheat, Corn, Rice, Soybeans, Cotton, Other }
    enum RiskFactor { Drought, Flood, Hail, Frost, Disease, Pest }

    struct Policy {
        address farmer;
        euint32 encryptedCoverage;
        euint32 encryptedPremium;
        CropType cropType;
        uint256 farmSize;
        uint256 createdAt;
        uint256 expiresAt;
        bool isActive;
        string ipfsHash;
    }

    struct Claim {
        uint256 policyId;
        address farmer;
        euint32 encryptedDamageAmount;
        euint32 encryptedClaimAmount;
        RiskFactor riskType;
        ClaimStatus status;
        uint256 submittedAt;
        uint256 reviewedAt;
        uint256 paidAt;
        string evidenceHash;
        bool confidentialReview;
    }

    struct AssessmentData {
        euint32 encryptedActualYield;
        euint32 encryptedExpectedYield;
        euint32 encryptedLossPercentage;
        euint32 encryptedWeatherImpact;
        bool assessmentComplete;
    }

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(uint256 => AssessmentData) public assessments;
    mapping(address => uint256[]) public farmerPolicies;
    mapping(address => uint256[]) public farmerClaims;
    mapping(address => bool) public authorizedAssessors;
    mapping(uint256 => address) public claimAssignments;
    mapping(uint256 => uint256) public requestIdToClaimId;

    event PolicyCreated(uint256 indexed policyId, address indexed farmer, CropType cropType);
    event ClaimSubmitted(uint256 indexed claimId, uint256 indexed policyId, address indexed farmer);
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status);
    event ClaimAssessed(uint256 indexed claimId, address indexed assessor);
    event ClaimPaid(uint256 indexed claimId, address indexed farmer);
    event AssessorAuthorized(address indexed assessor);
    event AssessorRevoked(address indexed assessor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyFarmer(uint256 _policyId) {
        require(policies[_policyId].farmer == msg.sender, "Not policy owner");
        _;
    }

    modifier onlyAuthorizedAssessor() {
        require(authorizedAssessors[msg.sender], "Not authorized assessor");
        _;
    }

    modifier validPolicy(uint256 _policyId) {
        require(_policyId > 0 && _policyId <= policyCounter, "Invalid policy ID");
        require(policies[_policyId].isActive, "Policy not active");
        require(policies[_policyId].expiresAt > block.timestamp, "Policy expired");
        _;
    }

    modifier validClaim(uint256 _claimId) {
        require(_claimId > 0 && _claimId <= claimCounter, "Invalid claim ID");
        _;
    }

    constructor() {
        owner = msg.sender;
        policyCounter = 0;
        claimCounter = 0;
        authorizedAssessors[msg.sender] = true;
    }

    function createPolicy(
        uint32 _coverage,
        uint32 _premium,
        CropType _cropType,
        uint256 _farmSize,
        uint256 _duration,
        string memory _ipfsHash
    ) external {
        require(_coverage > 0, "Coverage must be greater than 0");
        require(_premium > 0, "Premium must be greater than 0");
        require(_farmSize > 0, "Farm size must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        policyCounter++;

        euint32 encryptedCoverage = FHE.asEuint32(_coverage);
        euint32 encryptedPremium = FHE.asEuint32(_premium);

        policies[policyCounter] = Policy({
            farmer: msg.sender,
            encryptedCoverage: encryptedCoverage,
            encryptedPremium: encryptedPremium,
            cropType: _cropType,
            farmSize: _farmSize,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + _duration,
            isActive: true,
            ipfsHash: _ipfsHash
        });

        farmerPolicies[msg.sender].push(policyCounter);

        FHE.allowThis(encryptedCoverage);
        FHE.allowThis(encryptedPremium);
        FHE.allow(encryptedCoverage, msg.sender);
        FHE.allow(encryptedPremium, msg.sender);

        emit PolicyCreated(policyCounter, msg.sender, _cropType);
    }

    function submitClaim(
        uint256 _policyId,
        uint32 _damageAmount,
        uint32 _claimAmount,
        RiskFactor _riskType,
        string memory _evidenceHash
    ) external onlyFarmer(_policyId) validPolicy(_policyId) {
        require(_damageAmount > 0, "Damage amount must be greater than 0");
        require(_claimAmount > 0, "Claim amount must be greater than 0");

        claimCounter++;

        euint32 encryptedDamageAmount = FHE.asEuint32(_damageAmount);
        euint32 encryptedClaimAmount = FHE.asEuint32(_claimAmount);

        claims[claimCounter] = Claim({
            policyId: _policyId,
            farmer: msg.sender,
            encryptedDamageAmount: encryptedDamageAmount,
            encryptedClaimAmount: encryptedClaimAmount,
            riskType: _riskType,
            status: ClaimStatus.Submitted,
            submittedAt: block.timestamp,
            reviewedAt: 0,
            paidAt: 0,
            evidenceHash: _evidenceHash,
            confidentialReview: true
        });

        farmerClaims[msg.sender].push(claimCounter);

        FHE.allowThis(encryptedDamageAmount);
        FHE.allowThis(encryptedClaimAmount);
        FHE.allow(encryptedDamageAmount, msg.sender);
        FHE.allow(encryptedClaimAmount, msg.sender);

        emit ClaimSubmitted(claimCounter, _policyId, msg.sender);
    }

    function assignAssessor(uint256 _claimId, address _assessor) external onlyOwner validClaim(_claimId) {
        require(authorizedAssessors[_assessor], "Assessor not authorized");
        require(claims[_claimId].status == ClaimStatus.Submitted, "Claim not in submitted status");

        claimAssignments[_claimId] = _assessor;
        claims[_claimId].status = ClaimStatus.UnderReview;

        FHE.allow(claims[_claimId].encryptedDamageAmount, _assessor);
        FHE.allow(claims[_claimId].encryptedClaimAmount, _assessor);

        emit ClaimStatusUpdated(_claimId, ClaimStatus.UnderReview);
    }

    function performAssessment(
        uint256 _claimId,
        uint32 _actualYield,
        uint32 _expectedYield,
        uint32 _lossPercentage,
        uint32 _weatherImpact
    ) external onlyAuthorizedAssessor validClaim(_claimId) {
        require(claimAssignments[_claimId] == msg.sender, "Not assigned assessor");
        require(claims[_claimId].status == ClaimStatus.UnderReview, "Claim not under review");

        euint32 encryptedActualYield = FHE.asEuint32(_actualYield);
        euint32 encryptedExpectedYield = FHE.asEuint32(_expectedYield);
        euint32 encryptedLossPercentage = FHE.asEuint32(_lossPercentage);
        euint32 encryptedWeatherImpact = FHE.asEuint32(_weatherImpact);

        assessments[_claimId] = AssessmentData({
            encryptedActualYield: encryptedActualYield,
            encryptedExpectedYield: encryptedExpectedYield,
            encryptedLossPercentage: encryptedLossPercentage,
            encryptedWeatherImpact: encryptedWeatherImpact,
            assessmentComplete: true
        });

        FHE.allowThis(encryptedActualYield);
        FHE.allowThis(encryptedExpectedYield);
        FHE.allowThis(encryptedLossPercentage);
        FHE.allowThis(encryptedWeatherImpact);

        emit ClaimAssessed(_claimId, msg.sender);
    }

    function processClaimDecision(uint256 _claimId) external onlyAuthorizedAssessor validClaim(_claimId) {
        require(claimAssignments[_claimId] == msg.sender, "Not assigned assessor");
        require(assessments[_claimId].assessmentComplete, "Assessment not complete");
        require(claims[_claimId].status == ClaimStatus.UnderReview, "Claim not under review");

        Claim storage claim = claims[_claimId];
        Policy storage policy = policies[claim.policyId];
        AssessmentData storage assessment = assessments[_claimId];

        ebool isValidClaim = FHE.le(claim.encryptedClaimAmount, policy.encryptedCoverage);
        ebool hasSignificantLoss = FHE.ge(assessment.encryptedLossPercentage, FHE.asEuint32(25));
        ebool shouldApproveClaim = FHE.and(isValidClaim, hasSignificantLoss);

        // Request async decryption for claim decision
        bytes32[] memory cts = new bytes32[](1);
        cts[0] = FHE.toBytes32(shouldApproveClaim);
        uint256 requestId = FHE.requestDecryption(cts, this.processClaimDecisionCallback.selector);
        requestIdToClaimId[requestId] = _claimId;
    }

    function processClaimDecisionCallback(
        uint256 requestId,
        bool shouldApprove,
        bytes[] memory signatures
    ) external {
        // Validate signatures
        FHE.checkSignatures(requestId, signatures);

        uint256 _claimId = requestIdToClaimId[requestId];
        require(_claimId > 0, "Invalid request ID");

        if (shouldApprove) {
            claims[_claimId].status = ClaimStatus.Approved;
        } else {
            claims[_claimId].status = ClaimStatus.Rejected;
        }

        claims[_claimId].reviewedAt = block.timestamp;
        emit ClaimStatusUpdated(_claimId, claims[_claimId].status);

        // Clean up mapping
        delete requestIdToClaimId[requestId];
    }


    function payClaim(uint256 _claimId) external onlyOwner validClaim(_claimId) {
        require(claims[_claimId].status == ClaimStatus.Approved, "Claim not approved");

        claims[_claimId].status = ClaimStatus.Paid;
        claims[_claimId].paidAt = block.timestamp;

        emit ClaimPaid(_claimId, claims[_claimId].farmer);
        emit ClaimStatusUpdated(_claimId, ClaimStatus.Paid);
    }

    function authorizeAssessor(address _assessor) external onlyOwner {
        require(!authorizedAssessors[_assessor], "Already authorized");
        authorizedAssessors[_assessor] = true;
        emit AssessorAuthorized(_assessor);
    }

    function revokeAssessor(address _assessor) external onlyOwner {
        require(authorizedAssessors[_assessor], "Not authorized");
        require(_assessor != owner, "Cannot revoke owner");
        authorizedAssessors[_assessor] = false;
        emit AssessorRevoked(_assessor);
    }

    function getFarmerPolicies(address _farmer) external view returns (uint256[] memory) {
        return farmerPolicies[_farmer];
    }

    function getFarmerClaims(address _farmer) external view returns (uint256[] memory) {
        return farmerClaims[_farmer];
    }

    function getPolicyDetails(uint256 _policyId) external view returns (
        address farmer,
        CropType cropType,
        uint256 farmSize,
        uint256 createdAt,
        uint256 expiresAt,
        bool isActive,
        string memory ipfsHash
    ) {
        Policy storage policy = policies[_policyId];
        return (
            policy.farmer,
            policy.cropType,
            policy.farmSize,
            policy.createdAt,
            policy.expiresAt,
            policy.isActive,
            policy.ipfsHash
        );
    }

    function getClaimDetails(uint256 _claimId) external view returns (
        uint256 policyId,
        address farmer,
        RiskFactor riskType,
        ClaimStatus status,
        uint256 submittedAt,
        uint256 reviewedAt,
        uint256 paidAt,
        string memory evidenceHash
    ) {
        Claim storage claim = claims[_claimId];
        return (
            claim.policyId,
            claim.farmer,
            claim.riskType,
            claim.status,
            claim.submittedAt,
            claim.reviewedAt,
            claim.paidAt,
            claim.evidenceHash
        );
    }

    function getSystemStats() external view returns (
        uint256 totalPolicies,
        uint256 totalClaims,
        uint256 activePolicies
    ) {
        uint256 active = 0;
        for (uint256 i = 1; i <= policyCounter; i++) {
            if (policies[i].isActive && policies[i].expiresAt > block.timestamp) {
                active++;
            }
        }

        return (policyCounter, claimCounter, active);
    }
}