import React, { useState } from 'react';

const EditRegionForm = ({ region, onUpdate, onClose }) => {
  const [editedRegion, setEditedRegion] = useState({ ...region });

  const handleUpdate = () => {
    onUpdate(editedRegion);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Region</h2>
      <label htmlFor="editedCode" className="block text-sm font-medium text-gray-700">Region Code:</label>
      <input
        type="text"
        id="editedCode"
        value={editedRegion.code}
        onChange={(e) => setEditedRegion({ ...editedRegion, code: e.target.value })}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <label htmlFor="editedName" className="block text-sm font-medium text-gray-700 mt-4">Region Name:</label>
      <input
        type="text"
        id="editedName"
        value={editedRegion.name}
        onChange={(e) => setEditedRegion({ ...editedRegion, name: e.target.value })}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2 hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRegionForm;
