import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);

  const login = (token1, token2) => {
    if (token2) {
      Cookies.set('accessToken', token1, { expires: 7 }); 
      Cookies.set('refreshToken', token2, { expires: 7 });
      const expirationMinutes = 2;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);
      Cookies.set('accessTokenExpiration', expirationDate);
      setAccessToken(token1);
      setRefreshToken(token2);
    } else {
      const expirationMinutes = 2;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);
      Cookies.set('sessionTokenExpiration', expirationDate);
      setAccessToken(token1);
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    console.log('logout success');
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
