'use client';

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

/**
 * Banking Example Component
 * Demonstrates privacy-preserving banking operations
 */
export const BankingExample: React.FC = () => {
  const { encryptNumber, isLoading, error } = useEncryption();

  const [accountBalance, setAccountBalance] = useState('1000');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<string>('');
  const [encryptedTransfer, setEncryptedTransfer] = useState<string>('');

  const handleEncryptBalance = async () => {
    try {
      const balance = parseInt(accountBalance);
      const result = await encryptNumber(balance, 'euint32');
      setEncryptedBalance('Balance encrypted successfully');
    } catch (err) {
      console.error('Failed to encrypt balance:', err);
    }
  };

  const handleEncryptTransfer = async () => {
    try {
      const amount = parseInt(transferAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid transfer amount');
        return;
      }
      if (!recipientAddress || !/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
        alert('Please enter a valid recipient address');
        return;
      }

      const result = await encryptNumber(amount, 'euint32');
      setEncryptedTransfer('Transfer amount encrypted successfully');
    } catch (err) {
      console.error('Failed to encrypt transfer:', err);
    }
  };

  return (
    <Card
      title="Private Banking"
      subtitle="Confidential balance and transfer operations"
    >
      <div className="space-y-6">
        {/* Account Balance Section */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-3 text-blue-900">Account Balance</h4>
          <Input
            label="Current Balance (USD)"
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            helperText="Your balance will be encrypted before storage"
          />
          <Button
            onClick={handleEncryptBalance}
            isLoading={isLoading}
            className="w-full mt-3"
            variant="primary"
          >
            Encrypt Balance
          </Button>
          {encryptedBalance && (
            <p className="mt-2 text-sm text-green-600">✓ {encryptedBalance}</p>
          )}
        </div>

        {/* Transfer Section */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-3 text-green-900">Private Transfer</h4>
          <div className="space-y-3">
            <Input
              label="Transfer Amount (USD)"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount to transfer"
            />
            <Input
              label="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
            />
            <Button
              onClick={handleEncryptTransfer}
              isLoading={isLoading}
              className="w-full"
              variant="success"
            >
              Encrypt & Prepare Transfer
            </Button>
            {encryptedTransfer && (
              <p className="mt-2 text-sm text-green-600">✓ {encryptedTransfer}</p>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Privacy Features:</h4>
          <ul className="text-xs space-y-1 text-gray-700">
            <li>• Account balances encrypted on-chain</li>
            <li>• Transfer amounts hidden from public view</li>
            <li>• Only account owner can decrypt their balance</li>
            <li>• Compliance checks performed on encrypted data</li>
            <li>• Full audit trail without revealing amounts</li>
          </ul>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </Card>
  );
};
