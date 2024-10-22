import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../ApiLinks.js';
import { toast, Toaster } from 'react-hot-toast';
import { SignUpButton } from "@clerk/clerk-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine firstName and lastName into username
    const username = `${formData.firstName} ${formData.lastName}`;
    const dataToSend = { ...formData, username };
  
    try {
      const response = await axios.post(`${BASE_URL}/signup`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // This header is typically set by the server
        },
      });
      setMessage('Sign up successful!');
      toast.success('Sign up successful!');
      // Optionally navigate to a different page on successful sign up
      navigate('/dashboard');
    } catch (error) {
      setMessage('Sign up failed. Please try again.');
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800">
      <Toaster />
      {/* Header Bar */}
      <div className="w-full bg-gray-800 text-white flex justify-between items-center p-4">
        {/* Left Side Icon */}
        <div className="text-lg">
          <i className="far fa-calendar-alt"></i> {/* Calendar icon placeholder */}
        </div>

        {/* Right Side Buttons */}
        <div>
          <button
            className="text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700">Sign Up</button>
        </div>
      </div>

      {/* Signup Box */}
      <div className="bg-gray-800 p-8 mt-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Signup With</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ boxSizing: 'border-box' }} // Inline CSS for precise box model
            />
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Signup
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* Clerk SignUp Button (Commented Out) */}
        {/* <div className="text-center mt-4">
          <SignUpButton>
            <button className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Sign Up with More
            </button>
          </SignUpButton>
        </div> */}

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <button
            className="text-white px-2 py-1 rounded hover:bg-gray-700"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
