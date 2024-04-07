
import React, { useEffect, useState } from 'react';
import useBrandsService from '../services/useBrandsService';
import Modal from '../components/element/Modal';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';
import BrandsModal from '../components/Modal/BrandsModal'; // Use BrandsModal

const Brands = () => {
  const {
    brands,
    loading,
    error,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
  } = useBrandsService();
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleCreateBrand = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditBrand = (brandId) => {
    setSelectedBrandId(brandId);
    setIsEditModalOpen(true);
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      await deleteBrand(brandId);
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  const handleSaveNewBrand = async (formData) => {
    try {
      await createBrand(formData);
      setIsCreateModalOpen(false);
      fetchBrands(); 
    } catch (error) {
      console.error('Error saving new brand:', error);
    }
  };

  const handleSaveEditedBrand = async (editedData) => {
    try {
      await updateBrand(selectedBrandId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited brand:', error);
    }
  };

  const columns = ['ID', 'Company ID', 'Company Code', 'Company Name', 'Company Address', 'Code', 'Name'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Brands</h1>
        <Button onClick={handleCreateBrand}>Create New Brand</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      {brands && brands.length > 0 ? (
        <TableComponent data={brands} columns={columns} onEdit={handleEditBrand} onDelete={handleDeleteBrand} />
      ) : (
        <p>No brands found.</p>
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <BrandsModal onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewBrand} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <BrandsModal 
          isEditing={true} 
          brand={brands.find((brand) => brand.id === selectedBrandId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedBrand}
        />
      </Modal>
    </div>
  );
};

export default Brands;
