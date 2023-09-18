import React, { createContext, useContext } from 'react';
import { LOGGED_IN_KEY, useLocalStorage } from '../localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider component');
  }
  return context;
};

const useProvideAuth = () => {
  const [isAuthenticated] = useLocalStorage(LOGGED_IN_KEY);

  return {
    isAuthenticated,
  };
};

