import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal'; 

const NewPurchaseModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price: '',
    total: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Create New Purchase</h2>
        <TextInput label="Item Name" name="itemName" value={formData.itemName} onChange={handleInputChange} />
        <TextInput label="Quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} />
        <TextInput label="Price" name="price" value={formData.price} onChange={handleInputChange} />
        <TextInput label="Total" name="total" value={formData.total} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewPurchaseModal;
