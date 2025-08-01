import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCapability, setAuthCapability] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthCapability();
  }, []);

  const checkAuthCapability = async () => {
    try {
      const capability = await AuthService.checkAuthCapability();
      setAuthCapability(capability);
      
      // If device doesn't support authentication, auto-authenticate
      if (!capability.isReady) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth capability check failed:', error);
      setIsAuthenticated(true); // Fallback to allow app usage
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = async (promptMessage) => {
    try {
      if (!authCapability?.isReady) {
        setIsAuthenticated(true);
        return true;
      }

      const result = await AuthService.authenticate(promptMessage);
      setIsAuthenticated(result);
      return result;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    authCapability,
    isLoading,
    authenticate,
    logout,
    checkAuthCapability,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};