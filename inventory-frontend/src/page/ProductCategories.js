import React, { useEffect, useState } from 'react';
import useProductCategoriesService from '../services/useProductCategoriesService';
import Modal from './../components/element/Modal';
import ProductCategoriesModal from '../components/Modal/ProductCategoriesModal';
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
  const [specificError, setSpecificError] = useState(null);

  useEffect(() => {
    fetchProductCategories().catch((error) => setSpecificError(error.message));
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
      fetchProductCategories().catch((error) => setSpecificError(error.message)); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSaveNewCategory = async (formData) => {
    try {
      await createProductCategory(formData);
      setIsCreateModalOpen(false);
      fetchProductCategories().catch((error) => setSpecificError(error.message)); // Refresh data after creation
    } catch (error) {
      console.error('Error saving new category:', error);
    }
  };

  const handleSaveEditedCategory = async (editedData) => {
    try {
      await updateProductCategory(selectedCategoryId, editedData);
      setIsEditModalOpen(false);
      fetchProductCategories().catch((error) => setSpecificError(error.message)); // Refresh data after update
    } catch (error) {
      console.error('Error saving edited category:', error);
    }
  };

  const columns = ['ID', 'Name']; // Assuming 'Category ID' is not required

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Categories</h1>
        <Button onClick={handleCreateCategory}>Create New Category</Button>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : null}
      {specificError && <p className="text-red-600">Error: {specificError}</p>}
      {error && !specificError && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {productCategories && productCategories.length > 0 ? (
        <TableComponent
          data={productCategories}
          columns={columns}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      ) : (
        <p>No product categories found.</p>
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ProductCategoriesModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveNewCategory}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ProductCategoriesModal
          isEditing={true}
          category={productCategories.find((category) => category.id === selectedCategoryId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedCategory}
        />
      </Modal>
    </div>
  );
};

export default ProductCategories;
