import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import AdminPage from './pages/AdminPage';

// Import Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Import Context Providers
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <div className="flex min-h-screen bg-background">
            {/* Sidebar for larger screens */}
            <Sidebar className="hidden md:block w-64" />
            
            <div className="flex-1 flex flex-col">
              {/* Navbar */}
              <Navbar />
              
              {/* Main Content Area */}
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profiles" element={<ProfilesPage />} />
                   <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
            </div>
          </div>
          
          {/* Toast Notifications */}
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;