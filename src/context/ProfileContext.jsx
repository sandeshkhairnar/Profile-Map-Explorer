import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../services/profileService';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await fetchProfiles();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load profiles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    try {
      const newProfile = await addProfile(profileData);
      setProfiles(prev => [...prev, newProfile]);
      return newProfile;
    } catch (err) {
      setError('Failed to create profile');
      throw err;
    }
  };

  const editProfile = async (id, profileData) => {
    try {
      const updatedProfile = await updateProfile(id, profileData);
      setProfiles(prev => 
        prev.map(profile => profile.id === id ? updatedProfile : profile)
      );
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    }
  };

  const removeProfile = async (id) => {
    try {
      await deleteProfile(id);
      setProfiles(prev => prev.filter(profile => profile.id !== id));
    } catch (err) {
      setError('Failed to delete profile');
      throw err;
    }
  };

  const contextValue = {
    profiles,
    loading,
    error,
    loadProfiles,
    createProfile,
    editProfile,
    removeProfile
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};