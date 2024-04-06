import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const NewBrandModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
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
        <h2 className="text-lg font-bold mb-4">Create New Brand</h2>
        <TextInput label="Code" name="code" value={formData.code} onChange={handleInputChange} />
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewBrandModal;
