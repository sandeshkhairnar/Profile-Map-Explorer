import { useState, useEffect, useCallback } from 'react';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../services/profileService';

export const useProfiles = () => {
  // State management for profiles
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  // Fetch all profiles
  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProfiles = await fetchProfiles();
      setProfiles(fetchedProfiles);
      setFilteredProfiles(fetchedProfiles);
    } catch (err) {
      setError('Failed to load profiles');
      console.error('Profile loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new profile
  const addNewProfile = useCallback(async (profileData) => {
    try {
      const newProfile = await addProfile(profileData);
      setProfiles(prevProfiles => [...prevProfiles, newProfile]);
      setFilteredProfiles(prevFiltered => [...prevFiltered, newProfile]);
      return newProfile;
    } catch (err) {
      setError('Failed to add profile');
      console.error('Profile addition error:', err);
      throw err;
    }
  }, []);

  // Update an existing profile
  const updateExistingProfile = useCallback(async (profileId, updatedData) => {
    try {
      const updatedProfile = await updateProfile(profileId, updatedData);
      setProfiles(prevProfiles => 
        prevProfiles.map(profile => 
          profile.id === profileId ? updatedProfile : profile
        )
      );
      setFilteredProfiles(prevFiltered => 
        prevFiltered.map(profile => 
          profile.id === profileId ? updatedProfile : profile
        )
      );
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
      throw err;
    }
  }, []);

  // Delete a profile
  const removeProfile = useCallback(async (profileId) => {
    try {
      await deleteProfile(profileId);
      setProfiles(prevProfiles => 
        prevProfiles.filter(profile => profile.id !== profileId)
      );
      setFilteredProfiles(prevFiltered => 
        prevFiltered.filter(profile => profile.id !== profileId)
      );
    } catch (err) {
      setError('Failed to delete profile');
      console.error('Profile deletion error:', err);
      throw err;
    }
  }, []);

  // Search and filter profiles
  const searchProfiles = useCallback((term) => {
    setSearchTerm(term);
    const filtered = profiles.filter(profile => 
      profile.name.toLowerCase().includes(term.toLowerCase()) ||
      profile.location?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [profiles]);

  // Reset search and show all profiles
  const resetSearch = useCallback(() => {
    setSearchTerm('');
    setFilteredProfiles(profiles);
  }, [profiles]);

  // Get a single profile by ID
  const getProfileById = useCallback((profileId) => {
    return profiles.find(profile => profile.id === profileId);
  }, [profiles]);

  // Initial load of profiles
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return {
    profiles,
    filteredProfiles,
    loading,
    error,
    searchTerm,
    loadProfiles,
    addNewProfile,
    updateExistingProfile,
    removeProfile,
    searchProfiles,
    resetSearch,
    getProfileById
  };
};