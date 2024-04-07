import React from 'react';
import Button from '../element/Button';

const ItemCounter = ({ itemName, initialCount, icon }) => {
  const IconComponent = icon; 

  return (
    <div className="rounded-lg border bg-white text-gray-800 shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center space-x-4">
        {IconComponent && <IconComponent className="text-green-500 text-3xl" />} 
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{itemName}</h3>
          <p className="text-base text-gray-500">Total: {initialCount} {itemName.toLowerCase()}</p>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4">
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ItemCounter;
