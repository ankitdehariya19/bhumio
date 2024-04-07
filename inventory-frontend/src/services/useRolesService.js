import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

const useRolesService = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchRoles = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/roles`, { headers });
      setRoles(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const createRole = async (roleData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      try {
        const response = await axios.post(`${BASE_URL}/roles`, roleData, { headers });
        setRoles(prevRoles => [...prevRoles, response.data]);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error || 'Duplicate role error';
          setError(errorMessage);
        } else {
          setError(error.message || 'An error occurred');
        }
      }
    });
  };

  const updateRole = async (roleId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/roles/${roleId}`, updatedData, { headers });
      setRoles(prevRoles =>
        prevRoles.map(role =>
          role.id === roleId ? { ...role, ...updatedData } : role
        )
      );
    });
  };

  const deleteRole = async (roleId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/roles/${roleId}`, { headers });
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
    });
  };

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
  };
};

export default useRolesService;
