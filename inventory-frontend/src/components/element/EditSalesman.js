import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const EditSalesman = ({ salesman, onClose, onSave }) => {
  const [editedSalesman, setEditedSalesman] = useState({ ...salesman });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSalesman({ ...editedSalesman, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(editedSalesman);
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
        <h2 className="text-lg font-bold mb-4">Edit Salesman</h2>
        <TextInput
          label="Name"
          name="name"
          value={editedSalesman.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email"
          name="email"
          value={editedSalesman.email}
          onChange={handleInputChange}
        />
        <TextInput
          label="Address"
          name="address"
          value={editedSalesman.address}
          onChange={handleInputChange}
        />
        <TextInput
          label="HP"
          name="hp"
          value={editedSalesman.hp}
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

export default EditSalesman;
