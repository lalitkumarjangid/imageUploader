import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
            {/* Background GIF */}
            <div className="absolute inset-0 opacity-50">
                <img
                    src="https://media.giphy.com/media/xT0xeJpnrWC4ZrV5f6/giphy.gif" // Example GIF URL
                    alt="Background"
                    className="object-cover w-full h-full"
                />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-8 relative z-10">Page Not Found</h1>
            <p className="text-lg text-gray-300 mb-4 relative z-10">
                The page you are looking for does not exist. Please check the URL or go back to the homepage.
            </p>
            <div className="space-x-4 relative z-10">
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
