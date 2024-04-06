import React, { useEffect, useState } from 'react';
import useSalesmanService from '../services/useSalesmanService'; 
import Modal from './../components/element/Modal';
import EditSalesman from '../components/element/EditSalesman'; 
import NewSalesman from '../components/element/NewSalesman'; 
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Salesmen = () => {
  const {
    salesmen,
    loading,
    error,
    fetchSalesmen,
    createSalesman,
    updateSalesman,
    deleteSalesman,
  } = useSalesmanService(); 

  const [selectedSalesmanId, setSelectedSalesmanId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchSalesmen();
  }, []); 

  const handleCreateSalesman = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditSalesman = (salesmanId) => {
    setSelectedSalesmanId(salesmanId);
    setIsEditModalOpen(true);
  };

  const handleDeleteSalesman = async (salesmanId) => {
    try {
      await deleteSalesman(salesmanId);
    } catch (error) {
      console.error('Error deleting salesman:', error);
    }
  };

  const handleSaveNewSalesman = async (formData) => {
    try {
      await createSalesman(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new salesman:', error);
    }
  };

  const handleSaveEditedSalesman = async (editedData) => {
    try {
      await updateSalesman(selectedSalesmanId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited salesman:', error);
    }
  };

  const columns = ['Name', 'Email', 'Address', 'Hp']; 

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Salesmen</h1>
        <Button onClick={handleCreateSalesman}>Create New Salesman</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={salesmen}
        columns={columns}
        onEdit={handleEditSalesman}
        onDelete={handleDeleteSalesman}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewSalesman onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewSalesman} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditSalesman
          salesman={salesmen.find((salesman) => salesman.id === selectedSalesmanId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedSalesman}
        />
      </Modal>
    </div>
  );
};

export default Salesmen;
