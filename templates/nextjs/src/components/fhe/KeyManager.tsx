'use client';

import React, { useState, useEffect } from 'react';
import { useFhevmClient } from '@fhevm-sdk/core/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Key Manager Component
 * Displays and manages FHE keys
 */
export const KeyManager: React.FC = () => {
  const { client, isInitialized, network } = useFhevmClient();
  const [keyInfo, setKeyInfo] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isInitialized && client) {
      loadKeyInfo();
    }
  }, [isInitialized, client]);

  const loadKeyInfo = async () => {
    try {
      // In a real implementation, this would fetch actual key info
      setKeyInfo({
        network,
        hasPublicKey: true,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to load key info:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'refresh' }),
      });
      await loadKeyInfo();
    } catch (error) {
      console.error('Failed to refresh keys:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card title="Key Management" subtitle="FHE encryption keys status">
      <div className="space-y-4">
        {!isInitialized ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Initializing...</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">Network:</span>
                <span className="text-sm text-gray-900">{keyInfo?.network || network}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">Public Key:</span>
                <span className="text-sm">
                  {keyInfo?.hasPublicKey ? (
                    <span className="text-green-600">✓ Available</span>
                  ) : (
                    <span className="text-red-600">✗ Not available</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
              {keyInfo?.lastUpdated && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                  <span className="text-xs text-gray-500">
                    {new Date(keyInfo.lastUpdated).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={handleRefresh}
              isLoading={isRefreshing}
              variant="secondary"
              className="w-full"
            >
              Refresh Keys
            </Button>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> Public keys are automatically managed by the FHEVM SDK.
                Manual refresh is rarely needed.
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
