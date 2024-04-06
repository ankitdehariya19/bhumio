import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const EditRegion = ({ region, onClose, onSave }) => {
  const [editedRegion, setEditedRegion] = useState({ ...region });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRegion({ ...editedRegion, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(editedRegion);
      onClose();
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Edit Region</h2>
        <TextInput
          label="Name"
          name="name"
          value={editedRegion.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Code"
          name="code"
          value={editedRegion.code}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company ID"
          name="company_id"
          value={editedRegion.company.id}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Code"
          name="company_code"
          value={editedRegion.company.code}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Name"
          name="company_name"
          value={editedRegion.company.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Address"
          name="company_address"
          value={editedRegion.company.address}
          onChange={handleInputChange}
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Modal>
  );
};

export default EditRegion;
