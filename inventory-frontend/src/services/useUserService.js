import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000'; // Update with your API base URL

const useUserService = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data.data || []);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      setError(error.message || 'An error occurred while creating user.');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(`${BASE_URL}/users/${userId}`, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, ...userData } : user))
      );
    } catch (error) {
      setError(error.message || 'An error occurred while updating user.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setError(error.message || 'An error occurred while deleting user.');
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUserService;
