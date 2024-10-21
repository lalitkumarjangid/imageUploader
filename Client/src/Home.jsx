import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/SignUp')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform!</h1>
      <p className="text-lg text-gray-600 mb-8">Your journey to a better experience starts here. Join us and explore the amazing features we offer.</p>
      <button 
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handleSignUpClick}
      >
        Go to Sign Up
      </button>
    </div>
  )
}

export default Home