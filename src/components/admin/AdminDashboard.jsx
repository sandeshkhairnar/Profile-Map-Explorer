import React, { useState } from 'react';
import { useProfiles } from '../../context/ProfileContext';
import ProfileModal from '../profiles/ProfileModal';
import ProfileImage from '../profiles/ProfileImage'; // Import the new ProfileImage component
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { profiles, loading, error, createProfile, editProfile, removeProfile } = useProfiles();
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
    try {
      await removeProfile(profileId);
      toast.success('Profile deleted successfully');
    } catch (err) {
      toast.error('Failed to delete profile');
    }
  };

  const handleSubmit = async (profileData) => {
    try {
      if (selectedProfile) {
        await editProfile(selectedProfile.id, profileData);
        toast.success('Profile updated successfully');
      } else {
        await createProfile(profileData);
        toast.success('Profile created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to save profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={handleAddProfile}
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105"
          >
            <ProfileImage 
              src={profile.photoUrl || profile.profileImage} 
              alt={profile.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
              <p className="text-gray-600 mb-4">{profile.location || profile.address}</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => handleEditProfile(profile)}
                  className="flex items-center text-primary hover:text-accent"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProfileModal 
          profile={selectedProfile}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;