import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const TableComponent = ({ data, columns, onEdit, onDelete }) => {
  // const getColumnValue = (item, columnName) => {
  //   const nestedColumns = columnName.split(' ');
  //   console.log({nestedColumns})
  //   let value = item;
  //   nestedColumns.forEach((col) => {
  //     value = value[col.toLowerCase()];
  //   });
  //   return value;
  // };


  const getColumnValue = (item, columnName) => {
    const nestedColumns = columnName.split(' ');
    
    let value = item;
    
    nestedColumns.forEach((col) => {
      if (value && value.hasOwnProperty(col.toLowerCase())) {
        value = value[col.toLowerCase()];
      } else {
        value = undefined; 
        
      }
    });
    
    if (columnName === "Active") {
      value = value ? "Active" : "Not Active";
    }
    
    return value;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="border px-4 py-2">
          <tr className="bg-gray-900 border text-white">
            {columns.map((column, index) => (
              <th
                key={index}
                className="border px-4 py-2 text-gray-100 font-medium text-start"
              >
                {column.title ? column.title : column} 
              </th>
            ))}
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-gray-700">
              {/* {columns.map((column, index) => (
                <td key={index} className="px-4 py-2 text-start border">
                  {column.startsWith('Company')  || column.startsWith("Category") ? (
                    <div>{getColumnValue(item, column)}</div>
                  ) : (
                    <div>{item[column.toLowerCase()]}</div>
                  )}
                </td>
              ))} */}
              {columns.map((column, index) => (
                <td key={index} className="px-4 py-2 text-start border">
                  {typeof column === "object" && column.render ? ( 
                    <div>{column.render(item)}</div>
                  ) : (
                    <div>{getColumnValue(item, column)}</div>
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
