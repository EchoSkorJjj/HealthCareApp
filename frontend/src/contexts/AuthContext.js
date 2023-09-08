import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie'; 
import RefreshToken from '../middleware/RefreshToken'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const [expirationDate, setExpirationDate] = useState(null);

  const login = (token1, token2) => {
    if (token2) {
      Cookies.set('accessToken', token1, { expires: 7 }); 
      Cookies.set('refreshToken', token2, { expires: 7 });
      const expirationMinutes = 15;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);
      Cookies.set('accessTokenExpiration', expirationDate);
      setAccessToken(token1);
      setRefreshToken(token2);
      console.log("login success");
    } else {
      const expirationMinutes = 60;
      const expirationDate = new Date();
      const expireTime = expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);
      setAccessToken(token1);
      setExpirationDate(expireTime);
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('accessTokenExpiration');
    setAccessToken(null);
    setRefreshToken(null);
    setExpirationDate(null);
    console.log('logout success');
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
      <RefreshToken expirationDate={expirationDate} />
    </AuthContext.Provider>
  );
}
