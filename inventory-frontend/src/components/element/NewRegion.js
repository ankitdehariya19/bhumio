import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal'; 

const NewRegionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    company_id: '',
    company_code: '',
    company_name: '',
    company_address: ''
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
        <h2 className="text-lg font-bold mb-4">Create New Region</h2>
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <TextInput label="Code" name="code" value={formData.code} onChange={handleInputChange} />
        <TextInput label="Company ID" name="company_id" value={formData.company_id} onChange={handleInputChange} />
        <TextInput label="Company Code" name="company_code" value={formData.company_code} onChange={handleInputChange} />
        <TextInput label="Company Name" name="company_name" value={formData.company_name} onChange={handleInputChange} />
        <TextInput label="Company Address" name="company_address" value={formData.company_address} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewRegionModal;
