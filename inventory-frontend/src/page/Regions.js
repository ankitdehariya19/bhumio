import React, { useEffect, useState } from 'react';
import useRegionService from '../services/useRegionService';
import Modal from './../components/element/Modal';
import EditRegion from '../components/element/EditRegion';
import NewRegion from '../components/element/NewRegion';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Regions = () => {
  const {
    regions,
    loading,
    error,
    fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
  } = useRegionService();
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleCreateRegion = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditRegion = (regionId) => {
    setSelectedRegionId(regionId);
    setIsEditModalOpen(true);
  };

  const handleDeleteRegion = async (regionId) => {
    try {
      await deleteRegion(regionId);
    } catch (error) {
      console.error('Error deleting region:', error);
    }
  };

  const handleSaveNewRegion = async (formData) => {
    try {
      await createRegion(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new region:', error);
    }
  };

  const handleSaveEditedRegion = async (editedData) => {
    try {
      await updateRegion(selectedRegionId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited region:', error);
    }
  };

  const columns = ['Name', 'Code', 'Company ID', 'Company Code', 'Company Name', 'Company Address'];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Regions</h1>
        <Button onClick={handleCreateRegion}>Create New Region</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={regions}
        columns={columns}
        onEdit={handleEditRegion}
        onDelete={handleDeleteRegion}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewRegion onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewRegion} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditRegion
          region={regions.find((region) => region.id === selectedRegionId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedRegion}
        />
      </Modal>
    </div>
  );
};

export default Regions;
