import './App.css';
import React, { useState } from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import { AuthProvider } from '../contexts/AuthContext';
import Register from './user-pages/Register';
import Login from './user-pages/Login';
import NavBar from './shared/NavBar';
import ForgotPassword from './user-pages/ForgotPassword';
import NutritionAnalyzer from './nutrition/NutritionAnalyzer';
import SearchBar from './recipe/SearchBar';
import RecipeList from './recipe/RecipeList';
import CookieConsent from './cookies/CookieConsent';
import RefreshToken from '../middleware/RefreshToken';
import ResetPassword from './user-pages/ResetPassword';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
  <AuthProvider>
    <RefreshToken />
    <NavBar />
    <Routes>
      <Route path="/user-pages/register" element={<Register />} />
      <Route path="/user-pages/login" element={<Login />} />
      <Route path="/user-pages/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/nutrition/nutritionanalyzer" element={<NutritionAnalyzer />} />
      <Route path="/user-pages/resetpassword" element={<ResetPassword/>} />
      <Route path="/recipe" element={
        <>
          <SearchBar onSearch={handleSearch} />
          <RecipeList searchQuery={searchQuery} />
        </>
      } />
    </Routes>
    <CookieConsent onAcceptCookies={() => {}} />
  </AuthProvider>

  );
}

export default App;
