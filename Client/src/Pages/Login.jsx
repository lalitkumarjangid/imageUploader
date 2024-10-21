import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../ApiLinks.js'; // Adjust the path as necessary
import { toast, Toaster } from 'react-hot-toast';
import { SignInButton } from "@clerk/clerk-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };

    try {
        const response = await axios.post(`${BASE_URL}/login`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // This header is typically set by the server
            },
          });

      setMessage('Login successful!');
      toast.success('Login successful!');
      // Navigate to a different page on successful login, e.g., dashboard
      navigate('/dashboard');
    } catch (error) {
      setMessage('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-blue-100"
      style={{ fontFamily: 'Poppins, sans-serif' }} // Inline CSS for font family
    >
      <Toaster />
      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* Clerk SignIn Button */}
        {/* <div className="text-center mt-4">
          <SignInButton>
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Login with
            </button>
          </SignInButton>
        </div> */}

        {/* Signup Link */}
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;