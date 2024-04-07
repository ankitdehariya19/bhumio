
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const useSuppliersService = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [specificError, setSpecificError] = useState(null); 

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
      setSpecificError(error.message); 
      setError('An error occurred');
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
      try {
        const response = await axios.post(`${BASE_URL}/suppliers`, supplierData, { headers });
        setSuppliers(prevSuppliers => [...prevSuppliers, response.data]);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error || 'Duplicate code error';
          setSpecificError(errorMessage);
        } else {
          setError('An error occurred');
        }
      }
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
    specificError, 
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

export default useSuppliersService;
