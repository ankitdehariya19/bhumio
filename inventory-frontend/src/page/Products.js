import React, { useEffect, useState } from 'react';
import useProductService from '../services/useProductService'; 
import Modal from './../components/element/Modal';
import EditProduct from '../components/element/EditProduct'; 
import NewProduct from '../components/element/NewProduct'; 
import Button from '../components/element/Button';
import ProductTable from '../components/element/ProductTable'; 

const Products = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductService(); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []); 

  const handleCreateProduct = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveNewProduct = async (formData) => {
    try {
      await createProduct(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new product:', error);
    }
  };

  const handleSaveEditedProduct = async (editedData) => {
    try {
      await updateProduct(selectedProductId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited product:', error);
    }
  };

  const columns = ['Code', 'Name', 'Price', 'Minimum Stock', 'Category', 'Brand'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={handleCreateProduct}>Create New Product</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <ProductTable
        products={products}
        columns={columns}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewProduct onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewProduct} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProduct
          product={products.find((product) => product.id === selectedProductId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedProduct}
        />
      </Modal>
    </div>
  );
};

export default Products;
