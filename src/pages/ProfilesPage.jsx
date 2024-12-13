import React, { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import ProfileCard from '../components/profiles/ProfileCard';
import InteractiveMap from '../components/map/InteractiveMap';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { MagnifyingGlassIcon, MapIcon } from '@heroicons/react/24/solid';

const ProfilesPage = () => {
  const { profiles, loading, error } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = (profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading profiles..." />;
  if (error) return (
    <div className="container mx-auto px-4 py-8 text-center text-red-500">
      <h2 className="text-2xl font-bold mb-4">Error Loading Profiles</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Profiles</h1>
        
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <input 
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowMap(!showMap)}
            className="flex items-center justify-center w-full md:w-auto bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            <MapIcon className="h-5 w-5 mr-2" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>

      {/* Display Profile Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              onShowMap={handleShowMap}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-lg col-span-full">
            <h2 className="text-2xl text-gray-600 mb-4">No Profiles Found</h2>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </div>

      {/* Show Map Below Profile Cards */}
      {showMap && (
        <div className="mb-8 shadow-lg rounded-lg overflow-hidden">
          <InteractiveMap 
            profiles={filteredProfiles} 
            selectedProfile={selectedProfile}
            onProfileSelect={setSelectedProfile}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilesPage;
