import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 

const CustomerCreate = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
    hp: '',
    companyId: '', 
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New customer data:', customer);
    history.push('/customer-list');
  };

  return (
    <div>
      <h1>Create New Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={customer.name} onChange={handleInputChange} /><br />
        <label>Email:</label>
        <input type="email" name="email" value={customer.email} onChange={handleInputChange} /><br />
        <label>Address:</label>
        <input type="text" name="address" value={customer.address} onChange={handleInputChange} /><br />
        <label>HP:</label>
        <input type="text" name="hp" value={customer.hp} onChange={handleInputChange} /><br />
        <label>Company ID:</label>
        <input type="text" name="companyId" value={customer.companyId} onChange={handleInputChange} /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CustomerCreate;
