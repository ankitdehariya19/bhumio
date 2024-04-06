import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const useRegionService = () => {
  const [regions, setRegions] = useState([]);
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

  const fetchRegions = async () => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.get(`${BASE_URL}/regions`, { headers });
      setRegions(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const createRegion = async (regionData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      const response = await axios.post(`${BASE_URL}/regions`, regionData, { headers });
      setRegions(prevRegions => [...prevRegions, response.data]);
    });
  };

  const updateRegion = async (regionId, updatedData) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.put(`${BASE_URL}/regions/${regionId}`, updatedData, { headers });
      setRegions(prevRegions =>
        prevRegions.map(region =>
          region.id === regionId ? { ...region, ...updatedData } : region
        )
      );
    });
  };

  const deleteRegion = async (regionId) => {
    await handleRequest(async () => {
      const headers = generateHeaders();
      await axios.delete(`${BASE_URL}/regions/${regionId}`, { headers });
      setRegions(prevRegions =>
        prevRegions.filter(region => region.id !== regionId)
      );
    });
  };

  return {
    regions,
    loading,
    error,
    fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
  };
};

export default useRegionService;
