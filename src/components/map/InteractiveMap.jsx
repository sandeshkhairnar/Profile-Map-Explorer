import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const InteractiveMap = ({ profiles, selectedProfile, onProfileSelect }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (profile) => {
    onProfileSelect(profile);
    setActiveMarker(profile);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  // Default center (can be adjusted based on your use case)
  const center = selectedProfile 
    ? { 
        lat: selectedProfile.latitude, 
        lng: selectedProfile.longitude 
      }
    : { lat: 40.7128, lng: -74.0060 }; // New York City default

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={selectedProfile ? 12 : 4}
        center={center}
      >
        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={{ 
              lat: profile.latitude, 
              lng: profile.longitude 
            }}
            onClick={() => handleMarkerClick(profile)}
            icon={
              activeMarker && activeMarker.id === profile.id
                ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          >
            {activeMarker && activeMarker.id === profile.id && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <div className="p-2">
                  <h3 className="font-bold">{profile.name}</h3>
                  <p>{profile.location}</p>
                  <button 
                    onClick={() => onProfileSelect(profile)}
                    className="mt-2 px-3 py-1 bg-primary text-white rounded"
                  >
                    View Profile
                  </button>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default InteractiveMap;