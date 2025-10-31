'use client';

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

/**
 * Medical Example Component
 * Demonstrates privacy-preserving healthcare data
 */
export const MedicalExample: React.FC = () => {
  const { encryptNumber, encryptBoolean, isLoading, error } = useEncryption();

  const [patientAge, setPatientAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [hasCondition, setHasCondition] = useState(false);
  const [encryptionResult, setEncryptionResult] = useState<string>('');

  const handleEncryptMedicalData = async () => {
    try {
      setEncryptionResult('');

      if (!patientAge || !bloodPressure || !glucoseLevel) {
        alert('Please fill in all fields');
        return;
      }

      // Encrypt age (8-bit for 0-255 years)
      const age = parseInt(patientAge);
      if (age < 0 || age > 255) {
        alert('Age must be between 0 and 255');
        return;
      }
      await encryptNumber(age, 'euint8');

      // Encrypt blood pressure (16-bit for 0-300 mmHg)
      const bp = parseInt(bloodPressure);
      if (bp < 0 || bp > 300) {
        alert('Blood pressure must be between 0 and 300');
        return;
      }
      await encryptNumber(bp, 'euint16');

      // Encrypt glucose level (16-bit for 0-500 mg/dL)
      const glucose = parseInt(glucoseLevel);
      if (glucose < 0 || glucose > 500) {
        alert('Glucose level must be between 0 and 500');
        return;
      }
      await encryptNumber(glucose, 'euint16');

      // Encrypt condition flag
      await encryptBoolean(hasCondition);

      setEncryptionResult('All medical data encrypted successfully! Ready for secure storage.');
    } catch (err) {
      console.error('Failed to encrypt medical data:', err);
    }
  };

  return (
    <Card
      title="Private Medical Records"
      subtitle="HIPAA-compliant encrypted health data"
    >
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-3 text-purple-900">Patient Data</h4>
          <div className="space-y-3">
            <Input
              label="Patient Age"
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="Enter age (0-255)"
              helperText="Encrypted as euint8"
            />
            <Input
              label="Blood Pressure (Systolic)"
              type="number"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              placeholder="Enter BP in mmHg (0-300)"
              helperText="Encrypted as euint16"
            />
            <Input
              label="Glucose Level"
              type="number"
              value={glucoseLevel}
              onChange={(e) => setGlucoseLevel(e.target.value)}
              placeholder="Enter glucose in mg/dL (0-500)"
              helperText="Encrypted as euint16"
            />

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="hasCondition"
                checked={hasCondition}
                onChange={(e) => setHasCondition(e.target.checked)}
                className="h-4 w-4 text-purple-600 rounded"
              />
              <label htmlFor="hasCondition" className="text-sm font-medium text-gray-700">
                Has pre-existing condition (Encrypted as ebool)
              </label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleEncryptMedicalData}
          isLoading={isLoading}
          className="w-full"
          variant="primary"
        >
          Encrypt Medical Data
        </Button>

        {encryptionResult && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">✓ {encryptionResult}</p>
          </div>
        )}

        {/* Privacy Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Privacy & Compliance:</h4>
          <ul className="text-xs space-y-1 text-gray-700">
            <li>• Patient data encrypted before storage</li>
            <li>• HIPAA-compliant encryption at rest</li>
            <li>• Only authorized medical staff can decrypt</li>
            <li>• Audit logs without exposing sensitive data</li>
            <li>• Encrypted data analytics for research</li>
            <li>• Zero-knowledge proofs for eligibility checks</li>
          </ul>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-blue-900">Use Cases:</h4>
          <ul className="text-xs space-y-1 text-blue-700">
            <li>• Private prescription records</li>
            <li>• Confidential diagnosis storage</li>
            <li>• Encrypted insurance claims</li>
            <li>• Anonymous medical research</li>
            <li>• Secure telemedicine sessions</li>
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
