import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const EditPurchase = ({ purchase, onClose, onSave }) => {
  const [editedPurchase, setEditedPurchase] = useState({ ...purchase });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPurchase({ ...editedPurchase, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(editedPurchase);
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
        <h2 className="text-lg font-bold mb-4">Edit Purchase</h2>
        <TextInput
          label="Item Name"
          name="itemName"
          value={editedPurchase.itemName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Quantity"
          name="quantity"
          value={editedPurchase.quantity}
          onChange={handleInputChange}
        />
        <TextInput
          label="Price"
          name="price"
          value={editedPurchase.price}
          onChange={handleInputChange}
        />
        <TextInput
          label="Total"
          name="total"
          value={editedPurchase.total}
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

export default EditPurchase;
