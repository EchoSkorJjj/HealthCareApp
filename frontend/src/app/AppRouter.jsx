import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HOME_ROUTE, ROOT_ROUTE } from '../constants/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// shared route
const Header = lazy(() => import('./shared/header/Header.jsx'));
const Home = lazy(() => import('./shared/home/Home.jsx'));
const Footer = lazy(() => import('./shared/footer/Footer.jsx'));

// public route
const LoginPage = lazy(() => import('./public/login/Login.jsx'));
const RegisterPage = lazy(() => import('./public/register/Register.jsx'));
const ForgotPasswordPage = lazy(() => import('./public/forgotpass/ForgotPassword.jsx'));
const ResetPasswordPage = lazy(() => import('./public/resetpass/ResetPassword.jsx'));

// private route
const HomePage = lazy(() => import('./private/homepage/Homepage.jsx'));
const AboutUs = lazy(() => import('./shared/about/About.jsx'));
const Features = lazy(() => import('./shared/features/Features.jsx'));
const ContactUs = lazy(() => import('./shared/contact/Contact.jsx'));
const ProfilePage = lazy(() => import('./private/profile/Profile.jsx'));
const DashboardPage = lazy(() => import('./private/dashboard/Dashboard.jsx'));
const NutritionAnalyzerPage = lazy(() => import('./private/nutrition/NutritionAnalyzer.jsx'));
const SearchBarPage = lazy(() => import('./private/recipe/SearchBar.jsx'));
const RecipeListPage = lazy(() => import('./private/recipe/RecipeList.jsx'));


export const AppRouter = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="d-flex flex-column min-vh-100 w-100">
        <Header />
        <Routes>
          <Route element={<PublicRoute strict={true}/>}>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
          </Route>
          <Route exact path={ROOT_ROUTE} element={<PrivateRoute/>}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nutrition" element={<NutritionAnalyzerPage />} />
            <Route
              path="/recipe"
              element={
                <>
                  <SearchBarPage onSearch={handleSearch} />
                  <RecipeListPage searchQuery={searchQuery} />
                </>
              }
            />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
        </div>
      </Suspense>
    );
  };