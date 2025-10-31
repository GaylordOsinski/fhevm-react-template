'use client';

import React, { useState } from 'react';
import { useEncrypt, useFhevmClient } from '@fhevm-sdk/core/react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

/**
 * Encryption Demo Component
 * Demonstrates encryption of different data types
 */
export const EncryptionDemo: React.FC = () => {
  const { isInitialized } = useFhevmClient();
  const { encrypt8, encrypt16, encrypt32, encryptBool, isLoading } = useEncrypt();

  const [value, setValue] = useState('');
  const [encryptionType, setEncryptionType] = useState<'euint8' | 'euint16' | 'euint32' | 'ebool'>('euint32');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEncrypt = async () => {
    setError('');
    setResult('');

    try {
      let encrypted;

      if (encryptionType === 'ebool') {
        const boolValue = value.toLowerCase() === 'true' || value === '1';
        encrypted = await encryptBool(boolValue);
      } else {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
          setError('Please enter a valid number');
          return;
        }

        switch (encryptionType) {
          case 'euint8':
            if (numValue < 0 || numValue > 255) {
              setError('Value must be between 0 and 255 for euint8');
              return;
            }
            encrypted = await encrypt8(numValue);
            break;
          case 'euint16':
            if (numValue < 0 || numValue > 65535) {
              setError('Value must be between 0 and 65535 for euint16');
              return;
            }
            encrypted = await encrypt16(numValue);
            break;
          case 'euint32':
            if (numValue < 0 || numValue > 4294967295) {
              setError('Value must be between 0 and 4294967295 for euint32');
              return;
            }
            encrypted = await encrypt32(numValue);
            break;
        }
      }

      if (encrypted) {
        setResult(Array.from(encrypted.data).slice(0, 32).join(',') + '...');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt different data types using FHEVM">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Encryption Type</label>
          <select
            value={encryptionType}
            onChange={(e) => setEncryptionType(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="euint8">euint8 (0-255)</option>
            <option value="euint16">euint16 (0-65535)</option>
            <option value="euint32">euint32 (0-4294967295)</option>
            <option value="ebool">ebool (true/false)</option>
          </select>
        </div>

        <Input
          label={encryptionType === 'ebool' ? 'Value (true/false)' : 'Value to Encrypt'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={encryptionType === 'ebool' ? 'true or false' : 'Enter a number'}
          error={error}
        />

        <Button
          onClick={handleEncrypt}
          isLoading={isLoading}
          disabled={!isInitialized || !value}
          className="w-full"
        >
          Encrypt
        </Button>

        {result && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Encrypted Data (preview):</label>
            <div className="p-3 bg-gray-50 rounded text-xs break-all font-mono">
              {result}
            </div>
            <p className="mt-2 text-sm text-green-600">✓ Encryption successful!</p>
          </div>
        )}
      </div>
    </Card>
  );
};
