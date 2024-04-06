import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const useBrandsService = () => {
  const [brands, setBrands] = useState([]);
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

  const fetchBrands = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/brands`, { headers });
      setBrands(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const createBrand = async (brandData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/brands`, brandData, { headers });
      setBrands(prevBrands => [...prevBrands, response.data]);
    });
  };

  const updateBrand = async (brandId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/brands/${brandId}`, updatedData, { headers });
      setBrands(prevBrands =>
        prevBrands.map(brand =>
          brand.id === brandId ? { ...brand, ...updatedData } : brand
        )
      );
    });
  };

  const deleteBrand = async (brandId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/brands/${brandId}`, { headers });
      setBrands(prevBrands =>
        prevBrands.filter(brand => brand.id !== brandId)
      );
    });
  };

  return {
    brands,
    loading,
    error,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};

export default useBrandsService;
