import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const columns = ['Code', 'Name', 'Price', 'Minimum Stock', 'Category', 'Brand', 'Actions'];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className='border px-4 py-2'>
          <tr className="bg-gray-900 border text-white">
            {columns.map((column, index) => (
              <th key={index} className="border px-4 py-2 text-gray-100 font-medium text-start">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-gray-700">
              <td className="px-4 py-2 text-start border">{product.code}</td>
              <td className="px-4 py-2 text-start border">{product.name}</td>
              <td className="px-4 py-2 text-start border">{product.price}</td>
              <td className="px-4 py-2 text-start border">{product.minimum_stock}</td>
              <td className="px-4 py-2 text-start border">{product.product_category.name}</td>
              <td className="px-4 py-2 text-start border">{product.brand.name}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-black p-2 mx-1 rounded-md shadow-md duration-300 ease-in-out bg-white hover:bg-black hover:text-gray-100 focus:outline-none"
                  onClick={() => onEdit(product.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-black p-2 mx-1 rounded-md shadow-md duration-300 ease-in-out bg-white hover:bg-black hover:text-gray-100 focus:outline-none"
                  onClick={() => onDelete(product.id)}
                >
                  <RiDeleteBin6Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
