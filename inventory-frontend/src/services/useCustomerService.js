import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const useCustomerService = () => {
  const [customers, setCustomers] = useState([]);
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

  const fetchCustomers = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/customers`, { headers });
      setCustomers(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const createCustomer = async (customerData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/customers`, customerData, { headers });
      setCustomers(prevCustomers => [...prevCustomers, response.data]);
    });
  };

  const updateCustomer = async (customerId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/customers/${customerId}`, updatedData, { headers });
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === customerId ? { ...customer, ...updatedData } : customer
        )
      );
    });
  };

  const deleteCustomer = async (customerId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/customers/${customerId}`, { headers });
      setCustomers(prevCustomers =>
        prevCustomers.filter(customer => customer.id !== customerId)
      );
    });
  };

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomerService;
