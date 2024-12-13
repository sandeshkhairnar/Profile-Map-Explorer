import React, { useState } from 'react';

const ProfileImage = ({ 
  src, 
  alt, 
  className = "w-full h-48 object-cover rounded-t-lg",
  fallbackSrc = "https://via.placeholder.com/300x300.png?text=Profile+Image"
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img 
      src={hasError ? fallbackSrc : imageSrc} 
      alt={alt} 
      className={className}
      onError={handleImageError}
    />
  );
};

export default ProfileImage;