import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Mock authentication service
const mockAuthService = {
  login: async (email, password) => {
    // Simulate login logic
    if (email === 'admin@example.com' && password === 'password') {
      const user = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = mockAuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = await mockAuthService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    mockAuthService.logout();
    setUser(null);
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};