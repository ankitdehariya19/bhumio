import React from 'react';
import { Link } from 'react-router-dom';
import { avatarImage } from '../url/constants'; 
import useAuth from "../../services/useAuth";

const Header = ({ isLoggedIn, isAdmin, username, handleLogout }) => {
  const { logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-md py-4 mx-2 rounded-md ">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="logo">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2 ">
                <img src={avatarImage} alt="Avatar" className="w-8 h-8 rounded-full" />
                <span>{username}</span>
              </div>
              {isAdmin && <span className="bg-green-500 text-white px-2 py-1 rounded-md">Admin</span>}
              <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => {
                logout();
              }}
              className="border border-transparent flex items-center justify-center px-4 py-2 bg-white shadow-md font-medium text-gray-800 rounded-md hover:bg-black hover:text-white hover:border-white transition duration-300 ease-in-out"
            >
              Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
