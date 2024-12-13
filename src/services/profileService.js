import axios from 'axios';

// Mock profiles data
export const MOCK_PROFILES = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, New York, NY 10001',
      location: 'New York, NY',
      position: { lat: 40.7128, lng: -74.0060 },
      description: 'Software Engineer passionate about web technologies',
      photoUrl: 'https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png',
      interests: ['Technology', 'Travel', 'Photography']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com', 
      address: '456 Oak Avenue, San Francisco, CA 94105',
      location: 'San Francisco, CA',
      position: { lat: 37.7749, lng: -122.4194 },
      description: 'Product Manager with a focus on user experience',
      photoUrl: 'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg',
      interests: ['Design', 'Innovation', 'Fitness']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      address: '789 Pine Road, Chicago, IL 60601',
      location: 'Chicago, IL',
      position: { lat: 41.8781, lng: -87.6298 },
      description: 'Data Scientist exploring machine learning',
      photoUrl: 'https://img.freepik.com/free-photo/cheerful-positive-glad-man-has-broad-smile-rejoices-promotion-work_273609-16600.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726876800&semt=ais_hybrid',
      interests: ['AI', 'Data Science', 'Reading']
    }
  ];

export const fetchProfiles = async () => {
  try {
    // Simulating API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real-world scenario, you'd use axios to fetch from backend
    // return (await axios.get('/api/profiles')).data;
    
    return MOCK_PROFILES;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw new Error('Failed to load profiles. Please try again later.');
  }
};

export const addProfile = async (profileData) => {
  try {
    // Simulate adding a profile
    const newProfile = {
      ...profileData,
      id: String(Date.now()),
    };
    
    // In real scenario: return (await axios.post('/api/profiles', profileData)).data;
    return newProfile;
  } catch (error) {
    console.error('Error adding profile:', error);
    throw new Error('Failed to add profile. Please try again.');
  }
};

export const updateProfile = async (profileId, updatedData) => {
  try {
    // Simulate profile update
    // In real scenario: return (await axios.put(`/api/profiles/${profileId}`, updatedData)).data;
    return { ...updatedData, id: profileId };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }
};

export const deleteProfile = async (profileId) => {
  try {
    // Simulate profile deletion
    // In real scenario: await axios.delete(`/api/profiles/${profileId}`);
    return true;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Failed to delete profile. Please try again.');
  }
};