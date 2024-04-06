import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const NewProduct = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    minimum_stock: '',
    company: '',
    brand: '',
    product_category: '',
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
        <h2 className="text-lg font-bold mb-4">Create New Product</h2>
        <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <TextInput label="Price" name="price" value={formData.price} onChange={handleInputChange} />
        <TextInput label="Minimum Stock" name="minimum_stock" value={formData.minimum_stock} onChange={handleInputChange} />
        <TextInput label="Company" name="company" value={formData.company} onChange={handleInputChange} />
        <TextInput label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} />
        <TextInput label="Product Category" name="product_category" value={formData.product_category} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NewProduct;
