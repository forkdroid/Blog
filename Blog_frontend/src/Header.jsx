import React from "react";
import { Link } from "react-router-dom";
import {logout} from "./auth";

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="bg-black p-4 text-white flex justify-between items-center shadow-md">
      {/* Left section of the header: Home and Add Blog (if logged in) */}
      <div className="flex space-x-6"> {/* Increased space for better separation */}
        <Link to="/" className="text-lg font-semibold hover:text-gray-300 transition duration-300 ease-in-out">
          Home
        </Link>

        {isLoggedIn && (
          <Link to="/add-blog" className="text-lg font-semibold hover:text-gray-300 transition duration-300 ease-in-out">
            Add Blog
          </Link>
        )}
      </div>

      {/* Right section of the header: Signup/Login (if not logged in) or Logout (if logged in) */}
      <div className="flex space-x-6"> {/* Increased space for better separation */}
        {!isLoggedIn && (
          <>
            <Link to="/signup" className="text-lg font-semibold hover:text-gray-300 transition duration-300 ease-in-out">
              Signup
            </Link>
            <Link to="/login" className="text-lg font-semibold hover:text-gray-300 transition duration-300 ease-in-out">
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-lg font-semibold hover:text-gray-300 focus:outline-none cursor-pointer transition duration-300 ease-in-out bg-transparent border-none"
            // The 'bg-transparent' and 'border-none' ensure it looks like a link but acts like a button
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;