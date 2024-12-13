import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapIcon, 
  UserIcon, 
  MagnifyingGlassIcon, 
  CogIcon 
} from '@heroicons/react/24/solid';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: MapIcon,
      title: 'Interactive Map',
      description: 'Explore profiles geographically with our interactive mapping feature.'
    },
    {
      icon: UserIcon,
      title: 'Profile Discovery',
      description: 'Browse through a comprehensive collection of user profiles.'
    },
    {
      icon: CogIcon,
      title: 'Admin Management',
      description: 'Easily manage and update profile information.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Profile Map Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover and explore profiles with our intuitive geographic visualization tool.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </form>

        {/* Call to Action Buttons */}
        <div className="flex justify-center space-x-4 mb-16">
          <Link 
            to="/profiles" 
            className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            View Profiles
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
          >
            <CogIcon className="h-5 w-5 mr-2" />
            Manage Profiles
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;