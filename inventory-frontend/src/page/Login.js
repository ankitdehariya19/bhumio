
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../services/useAuth'; 

const Login = () => {
  const { login, error} = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData; 

    try {
      await login(username, password); 
      console.log('Login successful'); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-8 bg-black px-8 py-12">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-400">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none text-gray-400">Username</label> 
              <input
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none text-gray-400">Password</label>
                <Link to="/forgot-password" className="text-sm underline text-gray-400">Forgot your password?</Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300">
              Login
            </button>
            <button type="button" className="w-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 py-2 rounded-md transition duration-300">
              Login with Google
            </button>
          </form>
          {error && <div className="text-center text-sm text-red-500">{error}</div>}
          <div className="text-center text-sm text-gray-400">
            Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
