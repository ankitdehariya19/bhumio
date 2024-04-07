import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const useProductService = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

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

  const fetchProducts = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/products`, { headers });
      setProducts(response.data.data || []);
      setTotalProducts(response?.data?.data?.length)
      console.log(response?.data?.data)
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (productData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/products`, productData, { headers });
      setProducts(prevProducts => [...prevProducts, response.data]);
    });
  };

  const updateProduct = async (productId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/products/${productId}`, updatedData, { headers });
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, ...updatedData } : product
        )
      );
    });
  };

  const deleteProduct = async (productId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/products/${productId}`, { headers });
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productId)
      );
    });
  };

  return {
    products,
    loading,
    error,
    totalProducts,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProductService;
