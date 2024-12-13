import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const MapMarker = ({ 
  position, 
  title, 
  profile, 
  onSelect, 
  isSelected 
}) => {
  const handleMarkerClick = () => {
    onSelect(profile);
  };

  return (
    <>
      <Marker
        position={position}
        title={title}
        onClick={handleMarkerClick}
        icon={{
          url: '/marker-icon.png', // Custom marker icon
          scaledSize: new window.google.maps.Size(40, 40)
        }}
      />
      
      {isSelected && (
        <InfoWindow
          position={position}
          onCloseClick={() => onSelect(null)}
        >
          <div className="p-4 max-w-xs">
            <h3 className="text-lg font-bold mb-2">{profile.name}</h3>
            <img 
              src={profile.profileImage || '/default-avatar.png'} 
              alt={profile.name} 
              className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-sm text-gray-600">{profile.location}</p>
            <button 
              onClick={() => window.location.href = `/profiles/${profile.id}`}
              className="mt-2 btn-primary w-full"
            >
              View Profile
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MapMarker;