import React, { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import ProfileModal from './ProfileModal';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const ProfileManagement = () => {
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
        <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
        <button 
          onClick={handleAddProfile}
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Profile
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <img 
                      src={profile.profileImage || '/default-avatar.png'} 
                      alt={profile.name} 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    {profile.name}
                  </div>
                </td>
                <td className="p-4">{profile.location}</td>
                <td className="p-4">{profile.email || 'N/A'}</td>
                <td className="p-4">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditProfile(profile)}
                      className="text-primary hover:text-accent"
                      title="Edit Profile"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Profile"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ProfileManagement;