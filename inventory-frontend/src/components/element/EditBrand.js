import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal'; 

const EditBrand = ({ brand, onClose, onSave }) => {
  const [editedBrand, setEditedBrand] = useState({ ...brand });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrand({ ...editedBrand, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(editedBrand);
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
        <h2 className="text-lg font-bold mb-4">Edit Brand</h2>
        <TextInput
          label="ID"
          name="id"
          value={editedBrand.id}
          onChange={handleInputChange}
          disabled
        />
        <TextInput
          label="Code"
          name="code"
          value={editedBrand.code}
          onChange={handleInputChange}
        />
        <TextInput
          label="Name"
          name="name"
          value={editedBrand.name}
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

export default EditBrand;
