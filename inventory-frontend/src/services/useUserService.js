import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 



const useUserService = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  

  const generateHeaders = () => ({
    'Token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
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

  const fetchUsers = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/users`, { headers });
      setUsers(response.data.data || []);
      setTotalUsers(response?.data?.data?.length)
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/users`, userData, { headers });
      setUsers((prevUsers) => [...prevUsers, response.data]);
    });
  };

  const updateUser = async (userId, userData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/users/${userId}`, userData, { headers });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, ...userData } : user))
      );
    });
  };

  const deleteUser = async (userId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/users/${userId}`, { headers });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    });
  };

  return {
    users,
    loading,
    error,
    totalUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUserService;
