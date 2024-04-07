
import React, { useEffect, useState } from 'react';
import useCustomerService from '../services/useCustomerService';
import Modal from './../components/element/Modal';
import CustomerModal from '../components/Modal/CustomerModal';
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
  const [specificError, setSpecificError] = useState(null);

  useEffect(() => {
    fetchCustomers().catch((error) => setSpecificError(error.message));
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
      fetchCustomers().catch((error) => setSpecificError(error.message));
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
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : null}
      {specificError && <p className="text-red-600">Error: {specificError}</p>}
      {error && !specificError && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {customers && customers.length > 0 ? (
        <TableComponent
          data={customers}
          columns={columns}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      ) : (
        <p>No customers found.</p>
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CustomerModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveNewCustomer}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <CustomerModal
          isEditing={true}
          customer={customers.find((customer) => customer.id === selectedCustomerId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedCustomer}
        />
      </Modal>
    </div>
  );
};

export default Customers;
