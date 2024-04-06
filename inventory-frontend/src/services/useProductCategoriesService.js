import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const useProductCategoriesService = () => {
  const [productCategories, setProductCategories] = useState([]);
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

  const fetchProductCategories = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/product-categories`, { headers });
      setProductCategories(response.data.data || []);
    });
  };

  const createProductCategory = async (categoryData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/product-categories`, categoryData, { headers });
      setProductCategories(prevCategories => [...prevCategories, response.data]);
    });
  };

  const updateProductCategory = async (categoryId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/product-categories/${categoryId}`, updatedData, { headers });
      setProductCategories(prevCategories =>
        prevCategories.map(category =>
          category.id === categoryId ? { ...category, ...updatedData } : category
        )
      );
    });
  };

  const deleteProductCategory = async (categoryId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/product-categories/${categoryId}`, { headers });
      setProductCategories(prevCategories =>
        prevCategories.filter(category => category.id !== categoryId)
      );
    });
  };

  return {
    productCategories,
    loading,
    error,
    fetchProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
  };
};

export default useProductCategoriesService;
