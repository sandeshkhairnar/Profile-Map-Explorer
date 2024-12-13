import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ArrowLeftIcon 
} from '@heroicons/react/24/solid';
import { getProfileById } from '../services/profileService';
import InteractiveMap from '../components/map/InteractiveMap';

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const fetchedProfile = await getProfileById(id);
        setProfile(fetchedProfile);
      } catch (err) {
        setError('Failed to fetch profile details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-primary hover:text-accent mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Profiles
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info Section */}
        <div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={profile.profileImage || '/default-avatar.png'} 
                alt={profile.name} 
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <UserIcon className="h-7 w-7 mr-3 text-primary" />
                {profile.name}
              </h1>

              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-3 text-secondary" />
                  {profile.location}
                </p>

                {profile.email && (
                  <p className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-3 text-accent" />
                    {profile.email}
                  </p>
                )}

                {profile.phone && (
                  <p className="flex items-center">
                    <PhoneIcon className="h-5 w-5 mr-3 text-primary" />
                    {profile.phone}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-gray-700">{profile.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
              <InteractiveMap 
                profiles={[profile]} 
                selectedProfile={profile}
                onProfileSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;