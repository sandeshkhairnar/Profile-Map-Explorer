
# Profile Map Explorer 🌍📍

Welcome to **Profile Map Explorer**! This is a web application built with React and Tailwind CSS that allows users to explore a list of profiles and view their geographic locations interactively on a map. The app integrates dynamic maps, profile management, and a smooth user experience, making it an intuitive tool for navigating people’s profiles and locations.

## Table of Contents 📚
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features 🌟
The **Profile Map Explorer** application provides the following key features:

1. **Profile Display**: A webpage showing a list of profiles with essential information such as name, photo, and description.
2. **Interactive Map**: Users can view the geographical locations of each profile on an interactive map with dynamic markers.
3. **Summary Integration**: A "Summary" button next to each profile that displays a map marker on the map for the selected profile’s address.
4. **Admin Panel**: Allows administrators to manage profiles (add, edit, delete) through a dashboard.
5. **Search and Filter**: Search and filter profiles by name, location, or other attributes.
6. **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
7. **Error Handling**: Proper error handling for failed requests or invalid data (e.g., missing addresses).
8. **Loading Indicators**: Informative loading indicators during data fetching and map rendering.
9. **Profile Details**: A dedicated profile details page to view more information about each person, such as interests, contact info, and more.

## Tech Stack 🚀
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router

## File Structure 📂

Here’s a breakdown of the file structure:

```
profile-map-explorer/
│
├── public/
│ ├── index.html         # Main HTML file
│ └── favicon.ico        # Favicon
│
├── src/
│ ├── components/
│ │ ├── common/
│ │ │ ├── LoadingSpinner.jsx  
│ │ │ └── ErrorBoundary.jsx   
│ │ │
│ │ ├── layout/
│ │ │ ├── Navbar.jsx          
│ │ │ └── Sidebar.jsx       
│ │ │
│ │ ├── profiles/
│ │ │ ├── ProfileCard.jsx     
│ │ │ ├── ProfileList.jsx    
│ │ │ ├── ProfileDetails.jsx 
│ │ │ └── ProfileModal.jsx   
│ │ │
│ │ ├── map/
│ │ │ ├── InteractiveMap.jsx 
│ │ │ └── MapMarker.jsx       
│ │ │
│ │ └── admin/
│ │ ├── AdminDashboard.jsx   
│ │ └── ProfileManagement.jsx 
│ │
│ ├── pages/
│ │ ├── HomePage.jsx        
│ │ ├── ProfilesPage.jsx    
│ │ ├── ProfileDetailPage.jsx 
│ │ └── AdminPage.jsx        
│ │
│ ├── services/
│ │ ├── profileService.js    
│ │ └── mapService.js       
│ │
│ ├── context/
│ │ ├── ProfileContext.jsx   
│ │ └── AuthContext.jsx      
│ │
│ ├── hooks
│ │ ├── useProfiles.js      
│ │ └── useGeocoding.js      
│ │
│ ├── utils/
│ │ ├── validation.js       
│ │ └── helpers.js           
│ │
│ ├── styles/
│ │ └── tailwind.css         
│ │
│ ├── App.jsx                
│ └── index.js              
│
├── package.json             
├── tailwind.config.js      
└── README.md          
```

## Installation 🛠️

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/sandeshkhairnar/profile-map-explorer.git
   ```

2. Navigate to the project folder:
   ```bash
   cd profile-map-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables (e.g., for Google Maps API or Mapbox API):
   - Create a `.env` file in the root directory and add your API keys.
   


5. Run the development server:
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to see the app in action.

## Usage 🧭

- **View Profiles**: Browse through the list of profiles with basic information such as name, photo, and description.
- **Profile Management**: If you're an admin, you can add, edit, or delete profiles through the admin dashboard.
- **Search & Filter**: Use the search bar or filter options to quickly find specific profiles.


We hope you enjoy using **Profile Map Explorer**! If you have any questions or need further assistance, feel free to open an issue or reach out. 😄
