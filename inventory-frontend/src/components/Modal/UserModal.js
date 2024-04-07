import React, { useState, useEffect } from 'react';
import TextInput from '../element/TextInput';
import Button from '../element/Button';
import Modal from '../element/Modal';

const UserModal = ({ onSave, initialData = {}, isEditing = false, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
    is_active: false, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setFormData({ ...initialData });
    }
  }, [isEditing, initialData]);

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : e.target.value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const headerText = isEditing ? 'Edit User' : 'Create New User';
  const buttonText = isEditing ? 'Save Changes' : 'Save';

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">{headerText}</h2>
        <TextInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {!isEditing && (
          <>
            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextInput
              label="Re-enter Password"
              name="re_password"
              type="password"
              value={formData.re_password}
              onChange={handleInputChange}
            />
          </>
        )}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleInputChange}
          />
          <span className="ml-2">Is Active</span>
        </label>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : buttonText}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Modal>
  );
};

export default UserModal;
