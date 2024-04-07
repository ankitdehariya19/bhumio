import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 

const useSalesmanService = () => {
  const [salesmen, setSalesmen] = useState([]);
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
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesmen = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/salesmen`, { headers });
      if (response.status === 200) {
        setSalesmen(response.data.data || []);
      } else {
        throw new Error('Failed to fetch salesmen');
      }
    });
  };

  useEffect(() => {
    fetchSalesmen();
  }, []);

  const createSalesman = async (salesmanData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/salesmen`, salesmanData, { headers });
      setSalesmen(prevSalesmen => [...prevSalesmen, response.data]);
    });
  };

  const updateSalesman = async (salesmanId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/salesmen/${salesmanId}`, updatedData, { headers });
      setSalesmen(prevSalesmen =>
        prevSalesmen.map(salesman =>
          salesman.id === salesmanId ? { ...salesman, ...updatedData } : salesman
        )
      );
    });
  };

  const deleteSalesman = async (salesmanId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/salesmen/${salesmanId}`, { headers });
      setSalesmen(prevSalesmen =>
        prevSalesmen.filter(salesman => salesman.id !== salesmanId)
      );
    });
  };

  return {
    salesmen,
    loading,
    error,
    fetchSalesmen,
    createSalesman,
    updateSalesman,
    deleteSalesman,
  };
};

export default useSalesmanService;
