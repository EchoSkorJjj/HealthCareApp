import { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to use the context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your app
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
