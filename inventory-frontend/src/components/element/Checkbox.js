import React, { useEffect, useRef, useState } from 'react';

const Checkbox = ({
  id,
  label,
  checked: initialChecked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked); 
  const checkboxRef = useRef(null);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      onChange(!isChecked);
    }
  };

  useEffect(() => {
    if (!isChecked && checkboxRef.current) {
      checkboxRef.current.checked = false; 
    }
  }, [isChecked]);

  return (
    <label className="inline-flex items-center">
      <input
        ref={checkboxRef} 
        id={id}
        type="checkbox"
        className={`form-checkbox h-5 w-5 text-indigo-600 ${className}`}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;
