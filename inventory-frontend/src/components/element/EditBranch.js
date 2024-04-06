import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const EditBranch = ({ branch, onClose, onSave }) => {
  const [editedBranch, setEditedBranch] = useState({ ...branch });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBranch({ ...editedBranch, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(editedBranch);
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
        <h2 className="text-lg font-bold mb-4">Edit Branch</h2>
        <TextInput
          label="Code"
          name="code"
          value={editedBranch.code}
          onChange={handleInputChange}
        />
        <TextInput
          label="Name"
          name="name"
          value={editedBranch.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Address"
          name="address"
          value={editedBranch.address}
          onChange={handleInputChange}
        />
        <TextInput
          label="Type"
          name="type"
          value={editedBranch.type}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company ID"
          name="companyId"
          value={editedBranch.company.id}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Code"
          name="companyCode"
          value={editedBranch.company.code}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Name"
          name="companyName"
          value={editedBranch.company.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Address"
          name="companyAddress"
          value={editedBranch.company.address}
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

export default EditBranch;
