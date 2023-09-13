import './App.css';
import React, { useState } from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import Register from './user-pages/Register';
import Login from './user-pages/Login';
import NavBar from './shared/NavBar';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import ForgotPassword from './user-pages/ForgotPassword';
import NutritionAnalyzer from './nutrition/NutritionAnalyzer';
import SearchBar from './recipe/SearchBar';
import RecipeList from './recipe/RecipeList';
import ResetPassword from './user-pages/ResetPassword';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
    <NavBar isAuthenticated={isAuthenticated}/>
    <Routes>
      <Route path="/user-pages/register" element={<Register />} />
      <Route path="/user-pages/login" element={<Login onLogin={handleLogin}/>} />
      <Route path="/user-pages/home" element={<Home />} />
      <Route path="/user-pages/dashboard" element={<Dashboard />} />
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
    </>

  );
}

export default App;
