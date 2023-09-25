import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HOME_ROUTE, ROOT_ROUTE } from '../constants/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// shared route
const Header = lazy(() => import('./shared/header/Header'));
const Home = lazy(() => import('./shared/home/Home'));
const AboutUs = lazy(() => import('./shared/about/About'));
const Features = lazy(() => import('./shared/features/Features'));
const ContactUs = lazy(() => import('./shared/contact/Contact'));
const Footer = lazy(() => import('./shared/footer/Footer'));

// public route
const LoginPage = lazy(() => import('./public/user-pages/Login'));
const RegisterPage = lazy(() => import('./public/user-pages/Register'));
const ForgotPasswordPage = lazy(() => import('./public/user-pages/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('./public/user-pages/ResetPassword'));

// private route
const HomePage = lazy(() => import('./private/home/Homepage'));
const DashboardPage = lazy(() => import('./private/dashboard/Dashboard'));
const AdminDashboardPage = lazy(() => import('./private/dashboard/AdminDashboard'));
const NutritionAnalyzerPage = lazy(() => import('./private/nutrition/NutritionAnalyzer'));
const SearchBarPage = lazy(() => import('./private/recipe/SearchBar'));
const RecipeListPage = lazy(() => import('./private/recipe/RecipeList'));


export const AppRouter = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="d-flex flex-column min-vh-100">
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
            <Route path="/admin" element={<AdminDashboardPage />} />
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