import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/solid';

const ProfileModal = ({ profile, onClose, onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [profileImage, setProfileImage] = useState(profile?.profileImage || '');

  useEffect(() => {
    // Populate form with existing profile data if editing
    if (profile) {
      Object.keys(profile).forEach(key => {
        setValue(key, profile[key]);
      });
      setProfileImage(profile.profileImage || '');
    }
  }, [profile, setValue]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    // Add profile image to form data
    const submitData = {
      ...data,
      profileImage
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <h2 className="text-2xl font-bold">
            {profile ? 'Edit Profile' : 'Add New Profile'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form 
          onSubmit={handleSubmit(onFormSubmit)} 
          className="overflow-y-auto px-6 py-4 flex-grow"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded"
            />
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              {...register('name', { required: 'Name is required' })}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              {...register('location', { required: 'Location is required' })}
              className="w-full border p-2 rounded"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea 
              {...register('description', { required: 'Description is required' })}
              className="w-full border p-2 rounded"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Latitude</label>
            <input 
              type="number" 
              step="0.000001"
              {...register('latitude', { 
                required: 'Latitude is required',
                min: -90,
                max: 90
              })}
              className="w-full border p-2 rounded"
            />
            {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Longitude</label>
            <input 
              type="number" 
              step="0.000001"
              {...register('longitude', { 
                required: 'Longitude is required',
                min: -180,
                max: 180
              })}
              className="w-full border p-2 rounded"
            />
            {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
          </div>
        </form>

        {/* Footer with Action Buttons */}
        <div className="flex justify-end space-x-4 p-6 border-t flex-shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="profile-form"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-accent"
          >
            {profile ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;