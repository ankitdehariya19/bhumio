import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const NewBranch = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: '',
    type: '',
    companyId: '',
    companyCode: '',
    companyName: '',
    companyAddress: '',
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
        <h2 className="text-lg font-bold mb-4">Create New Branch</h2>
        <TextInput label="Code" name="code" value={formData.code} onChange={handleInputChange} />
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <TextInput label="Address" name="address" value={formData.address} onChange={handleInputChange} />
        <TextInput label="Type" name="type" value={formData.type} onChange={handleInputChange} />
        <TextInput
          label="Company ID"
          name="companyId"
          value={formData.companyId}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Code"
          name="companyCode"
          value={formData.companyCode}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Company Address"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
        />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewBranch;
