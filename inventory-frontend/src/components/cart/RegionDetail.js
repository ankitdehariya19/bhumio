import React, { useState } from 'react';
import Modal from '../element/Modal';
import EditRegionForm from '../element/EditRegionForm';

const RegionDetail = ({ region, onAddToCart, onUpdateRegion, onDeleteRegion }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedRegion, setEditedRegion] = useState({ ...region });

  const handleUpdate = () => {
    onUpdateRegion(region.id, editedRegion);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDeleteRegion(region.id);
  };

  return (
    <div className="border rounded p-4">
      <h3 className="text-lg font-semibold">{region.name}</h3>
      {editMode ? (
        <Modal isOpen={editMode} onClose={() => setEditMode(false)}>

          <EditRegionForm
            region={editedRegion}
            onUpdate={(updatedRegion) => setEditedRegion(updatedRegion)}
            onClose={() => setEditMode(false)}
          />
        </Modal>
      ) : (
        <div>
          <p><strong>Code:</strong> {region.code}</p>
          <p><strong>Company:</strong> {region.company.name}</p>
          <p><strong>Address:</strong> {region.company.address}</p>
          <button
            onClick={() => onAddToCart(region)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2" onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RegionDetail;
