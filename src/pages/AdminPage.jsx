import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useProfiles } from '../hooks/useProfiles';
import ProfileModal from '../components/profiles/ProfileModal';
import ProfileImage from '../components/profiles/ProfileImage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminPage = () => {
  const { 
    profiles, 
    loading, 
    error,
    createProfile, 
    editProfile, 
    removeProfile 
  } = useProfiles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleAddProfile = () => {
    setSelectedProfile(null);
    setIsModalOpen(true);
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleDeleteProfile = async (profileId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this profile?');
    if (confirmDelete) {
      try {
        await removeProfile(profileId);
      } catch (error) {
        console.error('Error deleting profile', error);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  const handleModalSubmit = async (profileData) => {
    try {
      if (selectedProfile) {
        await editProfile(selectedProfile.id, profileData);
      } else {
        await createProfile(profileData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving profile', error);
      alert('Failed to save profile. Please check your data and try again.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading profiles..." />;
  
  if (error) return (
    <div className="container mx-auto px-4 py-8 text-center text-red-500">
      <h2 className="text-2xl font-bold mb-4">Error Loading Profiles</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Admin Dashboard</h1>
        <button 
          onClick={handleAddProfile}
          className="flex items-center justify-center w-full md:w-auto bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Profile
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <h2 className="text-2xl text-gray-600 mb-4">No Profiles Found</h2>
          <p className="text-gray-500">Click "Add New Profile" to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profiles.map(profile => (
            <div 
              key={profile.id} 
              className="bg-white shadow-md rounded-lg p-4 relative hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <ProfileImage 
                  src={profile.photoUrl || profile.profileImage} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                  <p className="text-gray-500 text-sm">{profile.location}</p>
                </div>
              </div>

              <div className="flex space-x-2 absolute top-4 right-4">
                <button 
                  onClick={() => handleEditProfile(profile)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Edit Profile"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Profile"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProfileModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedProfile}
        />
      )}
    </div>
  );
};

export default AdminPage;