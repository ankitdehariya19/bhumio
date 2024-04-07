import React, { useState, useEffect } from 'react';
import TextInput from '../element/TextInput';
import Button from '../element/Button';
import Modal from '../element/Modal';

const ProductCategoriesModal = ({ isEditing, category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 1, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setFormData({ ...category });
    }
  }, [isEditing, category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const headerText = isEditing ? 'Edit Product Category' : 'Create New Product Category';
  const buttonText = isEditing ? 'Save Changes' : 'Save';

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">{headerText}</h2>
        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : buttonText}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Modal>
  );
};

export default ProductCategoriesModal;
