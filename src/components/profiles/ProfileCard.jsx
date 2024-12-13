import React from 'react';
import ProfileImage from './ProfileImage';
import { MapPinIcon, UserIcon, HashtagIcon } from '@heroicons/react/24/solid';

const ProfileCard = ({ profile, onShowMap }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl group">
      <div className="relative">
        <ProfileImage 
          src={profile.photoUrl} 
          alt={`Profile of ${profile.name}`} 
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{profile.name}</h2>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-start space-x-3">
          <UserIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <p className="text-gray-600 flex-grow">{profile.description}</p>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0" />
          <span className="truncate">{profile.address}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <HashtagIcon className="h-6 w-6 text-primary flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {profile.interests?.slice(0, 3).map((interest, index) => (
              <span 
                key={index} 
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
              >
                {interest}
              </span>
            ))}
            {profile.interests?.length > 3 && (
              <span className="text-xs text-gray-500">
                +{profile.interests.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <button 
            onClick={() => onShowMap(profile)}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors duration-300 flex items-center justify-center space-x-2 group"
          >
            <MapPinIcon className="h-5 w-5 group-hover:animate-bounce" />
            <span>View on Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;