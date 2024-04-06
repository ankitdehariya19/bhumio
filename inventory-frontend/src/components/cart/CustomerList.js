import React, { useEffect } from 'react';
import useCustomerService from '../../services/useCustomerService';

const CustomerList = () => {
  const { customers, loading, error, fetchCustomers } = useCustomerService();

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <strong>Name:</strong> {customer.name}<br />
            <strong>Email:</strong> {customer.email}<br />
            <strong>Address:</strong> {customer.address}<br />
            <strong>HP:</strong> {customer.hp}<br />
            <strong>Company:</strong> {customer.company.name}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
