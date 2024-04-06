import React, { useEffect, useState } from 'react';
import useProductCategoriesService from '../services/useProductCategoriesService';
import Modal from './../components/element/Modal';
import EditProductCategories from '../components/element/EditProductCategories';
import NewProductCategories from '../components/element/NewProductCategories';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const ProductCategories = () => {
  const {
    productCategories,
    loading,
    error,
    fetchProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
  } = useProductCategoriesService();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProductCategories();
  }, []); 

  const handleCreateCategory = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteProductCategory(categoryId);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSaveNewCategory = async (formData) => {
    try {
      await createProductCategory(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new category:', error);
    }
  };

  const handleSaveEditedCategory = async (editedData) => {
    try {
      await updateProductCategory(selectedCategoryId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited category:', error);
    }
  };

  const columns = ['ID', 'Name', 'Category ID'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Categories</h1>
        <Button onClick={handleCreateCategory}>Create New Category</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={productCategories}
        columns={columns}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewProductCategories onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewCategory} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProductCategories
          brand={productCategories.find((category) => category.id === selectedCategoryId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedCategory}
        />
      </Modal>
    </div>
  );
};

export default ProductCategories;
