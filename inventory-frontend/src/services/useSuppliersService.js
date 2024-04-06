import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const useSuppliersService = () => {
  const [suppliers, setSuppliers] = useState([]);
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

  const fetchSuppliers = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/suppliers`, { headers });
      setSuppliers(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const createSupplier = async (supplierData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/suppliers`, supplierData, { headers });
      setSuppliers(prevSuppliers => [...prevSuppliers, response.data]);
    });
  };

  const updateSupplier = async (supplierId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/suppliers/${supplierId}`, updatedData, { headers });
      setSuppliers(prevSuppliers =>
        prevSuppliers.map(supplier =>
          supplier.id === supplierId ? { ...supplier, ...updatedData } : supplier
        )
      );
    });
  };

  const deleteSupplier = async (supplierId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/suppliers/${supplierId}`, { headers });
      setSuppliers(prevSuppliers =>
        prevSuppliers.filter(supplier => supplier.id !== supplierId)
      );
    });
  };

  return {
    suppliers,
    loading,
    error,
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

export default useSuppliersService;
