import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = true }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div 
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
        <p className="mt-4 text-gray-700 dark:text-white text-lg font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;