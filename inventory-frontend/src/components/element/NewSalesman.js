import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const NewSalesman = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    hp: ''
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
        <h2 className="text-lg font-bold mb-4">Create New Salesman</h2>
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <TextInput label="Email" name="email" value={formData.email} onChange={handleInputChange} />
        <TextInput label="Address" name="address" value={formData.address} onChange={handleInputChange} />
        <TextInput label="HP" name="hp" value={formData.hp} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewSalesman;
