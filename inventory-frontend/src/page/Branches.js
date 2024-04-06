import React, { useEffect, useState } from 'react';
import useBranchesService from '../services/useBranchesService'; 
import Modal from './../components/element/Modal';
import EditBranch from '../components/element/EditBranch'; 
import NewBranch from '../components/element/NewBranch'; 
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Branches = () => {
  const {
    branches,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  } = useBranchesService(); 
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []); 

  const handleCreateBranch = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditBranch = (branchId) => {
    setSelectedBranchId(branchId);
    setIsEditModalOpen(true);
  };

  const handleDeleteBranch = async (branchId) => {
    try {
      await deleteBranch(branchId);
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const handleSaveNewBranch = async (formData) => {
    try {
      await createBranch(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new branch:', error);
    }
  };

  const handleSaveEditedBranch = async (editedData) => {
    try {
      await updateBranch(selectedBranchId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited branch:', error);
    }
  };

  const columns = ['Code', 'Name', 'Address', 'Type', 'Company ID', 'Company Code', 'Company Name', 'Company Address'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Branches</h1>
        <Button onClick={handleCreateBranch}>Create New Branch</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={branches}
        columns={columns}
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewBranch onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewBranch} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditBranch
          branch={branches.find((branch) => branch.id === selectedBranchId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedBranch}
        />
      </Modal>
    </div>
  );
};

export default Branches;
