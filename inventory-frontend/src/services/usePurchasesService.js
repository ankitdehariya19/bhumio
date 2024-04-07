import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 

const usePurchasesService = () => {
  const [purchases, setPurchases] = useState([]);
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

  const fetchPurchases = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/purchases`, { headers });
      setPurchases(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const createPurchase = async (purchaseData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/purchases`, purchaseData, { headers });
      setPurchases(prevPurchases => [...prevPurchases, response.data]);
    });
  };

  const updatePurchase = async (purchaseId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/purchases/${purchaseId}`, updatedData, { headers });
      setPurchases(prevPurchases =>
        prevPurchases.map(purchase =>
          purchase.id === purchaseId ? { ...purchase, ...updatedData } : purchase
        )
      );
    });
  };

  const deletePurchase = async (purchaseId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/purchases/${purchaseId}`, { headers });
      setPurchases(prevPurchases =>
        prevPurchases.filter(purchase => purchase.id !== purchaseId)
      );
    });
  };

  return {
    purchases,
    loading,
    error,
    fetchPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
  };
};

export default usePurchasesService;
