import React, { useState } from 'react';
import useCompanyService from '../../services/useCompanyService';

const CompanySettings = ({ companyId }) => {
  const { updateCompanySettings, loading, error } = useCompanyService();
  const [settingsData, setSettingsData] = useState({
    feature1: false,
    feature2: false,
  });

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleUpdateSettings = async () => {
    await updateCompanySettings(companyId, settingsData);
  };

  return (
    <div>
      <h2>Company Settings</h2>
      <label>
        <input
          type="checkbox"
          name="feature1"
          checked={settingsData.feature1}
          onChange={handleInputChange}
        />
        Feature 1
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="feature2"
          checked={settingsData.feature2}
          onChange={handleInputChange}
        />
        Feature 2
      </label>
      <br />
      <button onClick={handleUpdateSettings}>Save Settings</button>
      {loading && <p>Saving...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CompanySettings;
