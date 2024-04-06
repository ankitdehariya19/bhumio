import React, { useEffect, useState } from 'react';
import useCustomerService from '../services/useCustomerService';
import Modal from './../components/element/Modal';
import EditCustomer from '../components/element/EditCustomer';
import NewCustomer from '../components/element/NewCustomer';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Customers = () => {
  const {
    customers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomerService();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []); 

  const handleCreateCustomer = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setIsEditModalOpen(true);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSaveNewCustomer = async (formData) => {
    try {
      await createCustomer(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new customer:', error);
    }
  };

  const handleSaveEditedCustomer = async (editedData) => {
    try {
      await updateCustomer(selectedCustomerId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited customer:', error);
    }
  };
  const columns = ['Name', 'Email', 'Address', 'Hp'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={handleCreateCustomer}>Create New Customer</Button>
      </div>
      {loading ? <p className="text-gray-600"></p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={customers}
        columns={columns}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewCustomer onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewCustomer} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditCustomer
          customer={customers.find((customer) => customer.id === selectedCustomerId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedCustomer}
        />
      </Modal>
    </div>
  );
};

export default Customers;
