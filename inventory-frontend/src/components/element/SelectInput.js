import React from 'react';

const SelectInput = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <select
        className="form-select mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
