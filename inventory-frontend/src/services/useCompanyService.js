import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const useCompanyService = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const headers = {
        'Token': token,
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get(`${BASE_URL}/companies`, { headers });
        setCompanies(response?.data?.data || []);
      } catch (error) {
        setError(error.message || 'Error fetching companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); 

  const registerCompany = async (companyData) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const headers = {
      'Token': token,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post(`${BASE_URL}/companies/registrations`, companyData, { headers });
      setCompanies([...companies, response.data]); 
    } catch (error) {
      setError(error.message || 'Error registering company');
    } finally {
      setLoading(false);
    }
  };

  const verifyCompany = async (companyId) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const headers = {
      'Token': token,
      'Content-Type': 'application/json'
    };

    try {
      await axios.put(`${BASE_URL}/companies/verifications`, { companyId }, { headers });
   
    } catch (error) {
      setError(error.message || 'Error verifying company');
    } finally {
      setLoading(false);
    }
  };

  const updateCompanySettings = async (companyId, settingsData) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const headers = {
      'Token': token,
      'Content-Type': 'application/json'
    };

    try {
      await axios.put(`${BASE_URL}/companies/settings`, { companyId, ...settingsData }, { headers });

    } catch (error) {
      setError(error.message || 'Error updating company settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyById = async (companyId) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const headers = {
      'Token': token,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.get(`${BASE_URL}/companies/${companyId}`, { headers });
      return response.data;
    } catch (error) {
      setError(error.message || 'Error fetching company');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    companies,
    loading,
    error,
    registerCompany,
    verifyCompany,
    updateCompanySettings,
    fetchCompanyById,
  };
};

export default useCompanyService;
