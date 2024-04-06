import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-8 bg-black px-8 py-12">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-400">Forgot Your Password?</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your email to reset your password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="m@example.com"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300">
              Reset Password
            </button>
          </form>
          <div className="text-center text-sm text-gray-400">
            Remember your password? <Link to="/login" className="underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
