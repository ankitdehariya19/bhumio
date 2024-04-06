import React, { useState } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import SelectInput from './SelectInput';
import Button from './Button';

const NewUser = ({ onClose, onSave, roles }) => {
  const [formData, setFormData] = useState({
    username: '',
    isActive: true,
    roles: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleRoleChange = (selectedRoles) => {
    setFormData((prevData) => ({
      ...prevData,
      roles: selectedRoles,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold mb-4">Create New User</h2>
      <TextInput label="Username" name="username" value={formData.username} onChange={handleInputChange} />
      <Checkbox label="Active" name="isActive" checked={formData.isActive} onChange={handleCheckboxChange} />
      <SelectInput label="Roles" name="roles" options={roles} value={formData.roles} onChange={handleRoleChange} />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default NewUser;
