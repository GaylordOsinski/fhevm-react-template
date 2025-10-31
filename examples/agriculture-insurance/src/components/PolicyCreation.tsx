/**
 * PolicyCreation Component
 * Form for creating new insurance policies
 */

import { useState } from 'react';
import { PolicyFormData, CROP_TYPES } from '../types/insurance';

interface PolicyCreationProps {
  onSubmit: (formData: PolicyFormData) => Promise<void>;
  loading: boolean;
}

export function PolicyCreation({ onSubmit, loading }: PolicyCreationProps) {
  const [formData, setFormData] = useState<PolicyFormData>({
    coverage: '',
    premium: '',
    cropType: 0,
    farmSize: '',
    duration: '365',
    ipfsHash: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cropType' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Reset form on success
    setFormData({
      coverage: '',
      premium: '',
      cropType: 0,
      farmSize: '',
      duration: '365',
      ipfsHash: '',
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>
          <i className="icon-plus-circle"></i>
          Create Insurance Policy
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="coverage">Coverage Amount (USDT)</label>
            <input
              type="number"
              className="form-control"
              id="coverage"
              name="coverage"
              value={formData.coverage}
              onChange={handleChange}
              placeholder="Enter coverage amount"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="premium">Premium (USDT)</label>
            <input
              type="number"
              className="form-control"
              id="premium"
              name="premium"
              value={formData.premium}
              onChange={handleChange}
              placeholder="Enter premium amount"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cropType">Crop Type</label>
            <select
              className="form-select"
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {CROP_TYPES.map((crop, index) => (
                <option key={index} value={index}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="farmSize">Farm Size (Acres)</label>
            <input
              type="number"
              className="form-control"
              id="farmSize"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              placeholder="Enter farm size"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Insurance Duration (Days)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ipfsHash">Document IPFS Hash (Optional)</label>
            <input
              type="text"
              className="form-control"
              id="ipfsHash"
              name="ipfsHash"
              value={formData.ipfsHash}
              onChange={handleChange}
              placeholder="Document storage hash"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Policy...
              </>
            ) : (
              <>
                <i className="icon-shield"></i>
                Create Policy
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
