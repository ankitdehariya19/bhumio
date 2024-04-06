import React, { useState } from 'react';
import CompanyDetail from '../components/cart/CompanyDetail';
import UpdateCompany from '../components/cart/UpdateCompany';
import CompanyVerification from '../components/cart/CompanyVerification';
import CompanySettings from '../components/cart/CompanySettings';
import useCompanyService from '../services/useCompanyService';

const CompanyPage = () => {
  const { companies, loading, error } = useCompanyService();
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  
  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  return (
    <div>
      <h1>Company Page</h1>
      {loading && <p>Loading companies...</p>}
      {error && <p>Error: {error}</p>}
      {companies && (
        <div>
          <label>Select Company:</label>
          <select value={selectedCompanyId} onChange={handleCompanyChange}>
            <option value="">Select a company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name} - {company.id}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCompanyId && (
        <div>
          <CompanyDetail companyId={selectedCompanyId} />
          <UpdateCompany companyId={selectedCompanyId} />
          <CompanyVerification companyId={selectedCompanyId} />
          <CompanySettings companyId={selectedCompanyId} />
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
