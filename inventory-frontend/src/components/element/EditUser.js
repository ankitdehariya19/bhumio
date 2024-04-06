import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import SelectInput from './SelectInput';
import Button from './Button';

const EditUser = ({ user, roles, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedUser({ ...editedUser, [name]: checked });
  };

  const handleRoleChange = (selectedRoles) => {
    setEditedUser({ ...editedUser, roles: selectedRoles });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold mb-4">Edit User</h2>
      <TextInput label="Username" name="username" value={editedUser.username} onChange={handleInputChange} />
      <Checkbox label="Active" name="isActive" checked={editedUser.isActive} onChange={handleCheckboxChange} />
      <SelectInput label="Roles" name="roles" options={roles} value={editedUser.roles} onChange={handleRoleChange} />
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default EditUser;
