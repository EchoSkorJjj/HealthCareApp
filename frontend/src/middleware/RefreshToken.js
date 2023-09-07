import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../contexts/AuthContext';

const RefreshToken = ( {expirationDate}) => {
  const { login, logout, accessToken } = useAuth();

  useEffect(() => {
    if (expirationDate) {
      const now = new Date();
      const timeUntilExpiration = expirationDate - now;
      
      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          logout();
        }, timeUntilExpiration);
      } else {
        logout();
      }
    } 
    
    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken) {
      const accessTokenExpiration = new Date(Cookies.get('accessTokenExpiration'));
      const now = new Date();
      const timeUntilExpiration = accessTokenExpiration - now;
 
      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          const fetchRefreshToken = async () => {
            try {
              const response = await fetch('http://localhost:3500/api/account/refresh', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              });
  
              if (response.ok) {
                const { accessToken: newAccessToken } = await response.json();
                login(newAccessToken, refreshToken);
              } else {
                logout();
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              logout();
            }
          };
  
          fetchRefreshToken();
        }, timeUntilExpiration);       
      }
    }
  }, [login, logout]);

  return null;
};

export default RefreshToken;
