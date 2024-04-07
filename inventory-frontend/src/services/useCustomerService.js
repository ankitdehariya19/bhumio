
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const useCustomerService = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(0);

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
      setTotalCustomers(response?.data?.data?.length)
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const createCustomer = async (customerData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      try {
        const response = await axios.post(`${BASE_URL}/customers`, customerData, { headers });
        setCustomers(prevCustomers => [...prevCustomers, response.data]);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error || 'Duplicate code error';
          setError(errorMessage);
        } else {
          setError(error.message || 'An error occurred');
        }
      }
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
    totalCustomers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomerService;
