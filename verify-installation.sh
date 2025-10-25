#!/bin/bash

# FHEVM Universal SDK - Installation Verification Script
# This script checks that all required files and dependencies are in place

echo "🔍 FHEVM Universal SDK - Installation Verification"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        ((FAILED++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (missing)"
        ((FAILED++))
        return 1
    fi
}

echo "📋 Checking root files..."
check_file "package.json"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "DEPLOYMENT.md"
check_file "SUBMISSION.md"
check_file "LICENSE"
check_file "hardhat.config.js"
check_file ".env.example"
check_file ".gitignore"
check_file "demo.mp4"
echo ""

echo "📦 Checking SDK package..."
check_dir "packages/fhevm-sdk"
check_file "packages/fhevm-sdk/package.json"
check_file "packages/fhevm-sdk/README.md"
check_file "packages/fhevm-sdk/tsconfig.json"
check_dir "packages/fhevm-sdk/src"
check_file "packages/fhevm-sdk/src/index.ts"
check_dir "packages/fhevm-sdk/src/core"
check_file "packages/fhevm-sdk/src/core/FhevmClient.ts"
check_file "packages/fhevm-sdk/src/core/types.ts"
check_dir "packages/fhevm-sdk/src/react"
check_file "packages/fhevm-sdk/src/react/hooks/useEncrypt.ts"
check_file "packages/fhevm-sdk/src/react/hooks/useDecrypt.ts"
check_file "packages/fhevm-sdk/src/react/provider/FhevmProvider.tsx"
echo ""

echo "🎨 Checking Next.js example..."
check_dir "examples/nextjs-example"
check_file "examples/nextjs-example/package.json"
check_file "examples/nextjs-example/README.md"
check_file "examples/nextjs-example/tsconfig.json"
check_file "examples/nextjs-example/next.config.js"
check_file "examples/nextjs-example/src/app/page.tsx"
check_file "examples/nextjs-example/src/app/providers.tsx"
echo ""

echo "🌾 Checking Agriculture Insurance example..."
check_dir "examples/agriculture-insurance"
check_file "examples/agriculture-insurance/package.json"
check_file "examples/agriculture-insurance/README.md"
echo ""

echo "📜 Checking smart contracts..."
check_dir "contracts"
check_file "contracts/PrivateAgricultureInsurance.sol"
echo ""

echo "🔧 Checking scripts..."
check_dir "scripts"
check_file "scripts/deploy.js"
echo ""

echo "⚙️  Checking CI/CD..."
check_dir ".github/workflows"
check_file ".github/workflows/ci.yml"
echo ""

echo "=================================================="
echo "📊 Verification Summary"
echo "=================================================="
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. npm install"
    echo "2. npm run bootstrap"
    echo "3. npm run build:sdk"
    echo "4. npm run dev:nextjs"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some checks failed${NC}"
    echo "Please ensure all files are present"
    echo ""
    exit 1
fi
