import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import Button from './Button'; 

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <Button
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              <RxCross2 size={24} />
            </Button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
