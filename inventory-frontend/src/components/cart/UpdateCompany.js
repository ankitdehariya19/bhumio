import React, { useState } from 'react';
import useCompanyService from '../../services/useCompanyService';

const UpdateCompany = ({ companyId }) => {
  const { updateCompanyById, loading, error } = useCompanyService();
  const [companyData, setCompanyData] = useState({
    name: '', 
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    await updateCompanyById(companyId, companyData);
  };

  return (
    <div>
      <h2>Update Company</h2>
      <label>Name: 
        <input type="text" name="name" value={companyData.name} onChange={handleInputChange} />
      </label>
      <button onClick={handleUpdate}>Update</button>
      {loading && <p>Updating...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UpdateCompany;
