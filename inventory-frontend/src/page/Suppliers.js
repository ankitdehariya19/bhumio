import React, { useEffect, useState } from 'react';
import useSuppliersService from '../services/useSuppliersService';
import Modal from './../components/element/Modal';
import SupplierModal from '../components/Modal/SupplierModal'; 
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Suppliers = () => {
  const {
    suppliers,
    loading,
    error,
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliersService();
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [specificError, setSpecificError] = useState(null);

  useEffect(() => {
    fetchSuppliers().catch((error) => setSpecificError(error.message)); 
  }, []);

  const handleCreateSupplier = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditSupplier = (supplierId) => {
    setSelectedSupplierId(supplierId);
    setIsEditModalOpen(true);
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await deleteSupplier(supplierId);
      fetchSuppliers().catch((error) => setSpecificError(error.message)); 
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleSaveNewSupplier = async (formData) => {
    try {
      await createSupplier(formData);
      setIsCreateModalOpen(false);
      fetchSuppliers().catch((error) => setSpecificError(error.message)); 
    } catch (error) {
      console.error('Error saving new supplier:', error);
    }
  };

  const handleSaveEditedSupplier = async (editedData) => {
    try {
      await updateSupplier(selectedSupplierId, editedData);
      setIsEditModalOpen(false);
      fetchSuppliers().catch((error) => setSpecificError(error.message)); 
    } catch (error) {
      console.error('Error saving edited supplier:', error);
    }
  };

  const columns = ['Code', 'Name', 'Address', 'Company Name']; 

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <Button onClick={handleCreateSupplier}>Create New Supplier</Button>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : null}
      {specificError && <p className="text-red-600">Error: {specificError}</p>}
      {error && !specificError && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {suppliers && suppliers.length > 0 ? (
        <TableComponent
          data={suppliers}
          columns={columns}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
        />
      ) : (
        <p>No suppliers found.</p>
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <SupplierModal onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewSupplier} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <SupplierModal
          isEditing={true}
          supplier={suppliers.find((supplier) => supplier.id === selectedSupplierId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedSupplier}
        />
      </Modal>
    </div>
  );
};

export default Suppliers;
