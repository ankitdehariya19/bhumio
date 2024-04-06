import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Modal from './Modal';

const EditProduct = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      await onSave(editedProduct);
      onClose();
    } catch (error) {
      console.error('Error saving edited product:', error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <TextInput label="Name" name="name" value={editedProduct.name} onChange={handleInputChange} />
        <TextInput label="Price" name="price" value={editedProduct.price} onChange={handleInputChange} />
        <TextInput label="Minimum Stock" name="minimum_stock" value={editedProduct.minimum_stock} onChange={handleInputChange} />
        <TextInput label="Company" name="company" value={editedProduct.company} onChange={handleInputChange} />
        <TextInput label="Brand" name="brand" value={editedProduct.brand} onChange={handleInputChange} />
        <TextInput label="Product Category" name="product_category" value={editedProduct.product_category} onChange={handleInputChange} />
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditProduct;
