import React from 'react';

const CustomerCard = ({ customer, handleEditCustomer, handleDeleteCustomer, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold mb-2">{customer?.name || 'Unknown Name'}</h2>
      <p className="text-sm text-gray-600 mb-4">{customer?.email || 'Unknown Email'}</p>
      <div className="text-sm text-gray-600">
        <p className="mb-2">Company: {customer?.company?.name || 'Unknown Company'}</p>
        <p className="mb-2">Company Code: {customer?.company?.code || 'Unknown Code'}</p>
        <p className="mb-2">Company Address: {customer?.company?.address || 'Unknown Address'}</p>
        <p className="mb-2">Address: {customer?.address || 'Unknown Address'}</p>
        <p className="mb-2">HP: {customer?.hp || 'Unknown HP'}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        {children}
      </div>
    </div>
  );
};

export default CustomerCard;
