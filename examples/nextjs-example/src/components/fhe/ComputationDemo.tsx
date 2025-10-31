'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

/**
 * Computation Demo Component
 * Demonstrates homomorphic computation concepts
 */
export const ComputationDemo: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul'>('add');
  const [result, setResult] = useState<string>('');

  const handleCompute = () => {
    const num1 = parseInt(value1);
    const num2 = parseInt(value2);

    if (isNaN(num1) || isNaN(num2)) {
      alert('Please enter valid numbers');
      return;
    }

    let computed: number;
    switch (operation) {
      case 'add':
        computed = num1 + num2;
        break;
      case 'sub':
        computed = num1 - num2;
        break;
      case 'mul':
        computed = num1 * num2;
        break;
    }

    setResult(`Result: ${computed} (This would be computed on encrypted data on-chain)`);
  };

  return (
    <Card
      title="Homomorphic Computation"
      subtitle="Perform operations on encrypted data"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Value"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first number"
          />
          <Input
            label="Second Value"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
          </select>
        </div>

        <Button onClick={handleCompute} className="w-full">
          Compute
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900">{result}</p>
            <p className="mt-2 text-xs text-blue-700">
              On FHEVM, this computation would happen on encrypted values without revealing the inputs!
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">How it works:</h4>
          <ul className="text-xs space-y-1 text-gray-700">
            <li>• Values are encrypted client-side before sending to blockchain</li>
            <li>• Smart contracts perform operations on encrypted data</li>
            <li>• Results remain encrypted until authorized decryption</li>
            <li>• No intermediate values are ever revealed</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
