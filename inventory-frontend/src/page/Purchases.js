import React, { useEffect, useState } from 'react';
import usePurchasesService from '../services/usePurchasesService';
import Modal from './../components/element/Modal';
import EditPurchase from '../components/element/EditPurchase';
import NewPurchase from '../components/element/NewPurchase';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Purchases = () => {
  const {
    purchases,
    loading,
    error,
    fetchPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
  } = usePurchasesService();
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchPurchases();
  }, []); 

  const handleCreatePurchase = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditPurchase = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    setIsEditModalOpen(true);
  };

  const handleDeletePurchase = async (purchaseId) => {
    try {
      await deletePurchase(purchaseId);
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  const handleSaveNewPurchase = async (formData) => {
    try {
      await createPurchase(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new purchase:', error);
    }
  };

  const handleSaveEditedPurchase = async (editedData) => {
    try {
      await updatePurchase(selectedPurchaseId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited purchase:', error);
    }
  };

  const columns = ['Item Name', 'Quantity', 'Price', 'Total'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchases</h1>
        <Button onClick={handleCreatePurchase}>Create New Purchase</Button>
      </div>
      {loading ? <p className="text-gray-600"></p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={purchases}
        columns={columns}
        onEdit={handleEditPurchase}
        onDelete={handleDeletePurchase}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewPurchase onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewPurchase} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditPurchase
          purchase={purchases.find((purchase) => purchase.id === selectedPurchaseId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedPurchase}
        />
      </Modal>
    </div>
  );
};

export default Purchases;
