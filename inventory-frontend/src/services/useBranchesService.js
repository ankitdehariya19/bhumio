import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const useBranchesService = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateHeaders = () => ({
    'Token': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  });

  const handleRequest = async (requestFunc, ...args) => {
    setLoading(true);
    setError(null);

    try {
      await requestFunc(...args);
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/branches`, { headers });
      setBranches(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const createBranch = async (branchData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/branches`, branchData, { headers });
      setBranches(prevBranches => [...prevBranches, response.data]);
    });
  };

  const updateBranch = async (branchId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/branches/${branchId}`, updatedData, { headers });
      setBranches(prevBranches =>
        prevBranches.map(branch =>
          branch.id === branchId ? { ...branch, ...updatedData } : branch
        )
      );
    });
  };

  const deleteBranch = async (branchId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/branches/${branchId}`, { headers });
      setBranches(prevBranches =>
        prevBranches.filter(branch => branch.id !== branchId)
      );
    });
  };

  return {
    branches,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
};

export default useBranchesService;
