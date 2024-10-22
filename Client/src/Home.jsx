import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap, FileText } from 'lucide-react'; // Use FileText for the icon

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700">
    <div className="p-3 bg-blue-600 rounded-full mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  const features = [
    {
      icon: Star,
      title: "Premium Features",
      description: "Access exclusive tools and features designed to enhance your experience"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures"
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Lightning-fast response times and seamless interactions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header Section */}
      <header className="flex items-center justify-start p-4 bg-gray-800">
        <FileText className="w-10 h-10 text-blue-500" />
        <h1 className="text-4xl font-bold text-white ml-2">
          Post
        </h1>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-6 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
          Welcome to Our Platform!
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          Your journey to a better experience starts here. Join thousands of satisfied users and discover what makes our platform unique.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 flex items-center gap-2 shadow-lg"
            onClick={handleSignUpClick}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 mt-16 py-8 text-center">
        <p className="text-gray-400">
          © 2024 Post. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;
