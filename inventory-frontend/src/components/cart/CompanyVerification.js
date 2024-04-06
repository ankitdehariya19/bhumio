import React, { useState } from 'react';
import useCompanyService from '../../services/useCompanyService';

const CompanyVerification = ({ companyId }) => {
  const { verifyCompany, loading, error } = useCompanyService();
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = async () => {
    await verifyCompany(companyId, verificationCode);
  };

  return (
    <div>
      <h2>Company Verification</h2>
      <label>Verification Code: 
        <input type="text" value={verificationCode} onChange={handleInputChange} />
      </label>
      <button onClick={handleVerify}>Verify</button>
      {loading && <p>Verifying...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CompanyVerification;
