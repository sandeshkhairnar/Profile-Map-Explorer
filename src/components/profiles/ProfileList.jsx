import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const ProfileList = ({ profiles, onProfileSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filterCategories = [
    { value: '', label: 'All Profiles' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'arts', label: 'Arts' },
  ];

  const filteredProfiles = profiles.filter(profile => 
    (searchTerm === '' || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCategory === '' || profile.category === filterCategory)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-6 space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none w-full pl-4 pr-8 py-2 border rounded-full"
          >
            {filterCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <AdjustmentsHorizontalIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <AnimatePresence>
        {filteredProfiles.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 py-8"
          >
            No profiles found
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileCard 
                  profile={profile} 
                  onSelect={() => onProfileSelect(profile)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileList;