import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 bg-white shadow-md font-medium text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out ${className} sm:w-full md:w-auto`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
