import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const TableComponent = ({ data, columns, onEdit, onDelete }) => {
  console.log(data)
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="border px-4 py-2">
          <tr className="bg-gray-900 border text-white">
            {columns.map((column, index) => (
              <th key={index} className="border px-4 py-2 text-gray-100 font-medium text-start">
                {column}
              </th>
            ))}
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            
            <tr key={item.id} className="text-gray-700">
              {columns.map((column, index) => (
                <td key={index} className="px-4 py-2 text-start border">
                  {column === 'Company' && item.company ? (
                    <>
                      <div >ID: {item.company.id}</div>
                      <div>Code: {item.company.code}</div>
                      <div>Name: {item.company.name}</div>
                      <div>Address: {item.company.address}</div>
                    </>
                  ) : (
                    column === 'Data' && item.data ? (
                      <>
                        <div>ID: {item.data.id}</div>
                        <div>Code: {item.data.code}</div>
                        <div>Name: {item.data.name}</div>
                        <div >Address: {item.data.address}</div>
                      </>
                    ) : (
                      item[column.toLowerCase()]
                    )
                  )}
                </td>
              ))}
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-black p-2 mx-1 rounded-md shadow-md duration-300 ease-in-out bg-white hover:bg-black hover:text-gray-100 focus:outline-none"
                  onClick={() => onEdit(item.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-black p-2 mx-1 rounded-md shadow-md duration-300 ease-in-out bg-white hover:bg-black hover:text-gray-100 focus:outline-none"
                  onClick={() => onDelete(item.id)}
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

export default TableComponent;
