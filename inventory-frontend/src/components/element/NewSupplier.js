import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal'; 

const NewSupplierModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: '',
    company: {
      id: '',
      code: '',
      name: '',
      address: ''
    }
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
        <h2 className="text-lg font-bold mb-4">Create New Supplier</h2>
        <TextInput label="Code" name="code" value={formData.code} onChange={handleInputChange} />
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <TextInput label="Address" name="address" value={formData.address} onChange={handleInputChange} />
        <TextInput label="Company ID" name="company.id" value={formData.company.id} onChange={handleInputChange} />
        <TextInput label="Company Code" name="company.code" value={formData.company.code} onChange={handleInputChange} />
        <TextInput label="Company Name" name="company.name" value={formData.company.name} onChange={handleInputChange} />
        <TextInput label="Company Address" name="company.address" value={formData.company.address} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewSupplierModal;
