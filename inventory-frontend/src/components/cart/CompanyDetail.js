import React, { useState, useEffect } from 'react';
import useCompanyService from '../../services/useCompanyService';

const CompanyDetail = ({ companyId }) => {
  const { fetchCompanyById, loading, error, company } = useCompanyService();

  useEffect(() => {
    fetchCompanyById(companyId);
  }, [companyId]);

  return (
    <div>
      <h2>Company Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {company && (
        <div>
          <p>ID: {company.id}</p>
          <p>Name: {company.name}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
