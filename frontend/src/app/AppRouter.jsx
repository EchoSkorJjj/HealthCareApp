import { lazy, Suspense, useState, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HOME_ROUTE, ROOT_ROUTE } from '../constants/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { useNavigate, useLocation } from 'react-router-dom'
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../features/localStorage'
import { useAuth } from '../features/auth';

// shared route
const Header = lazy(() => import('./shared/header/Header.jsx'));
const Home = lazy(() => import('./shared/home/Home.jsx'));
const Footer = lazy(() => import('./shared/footer/Footer.jsx'));
const Loader = lazy(() => import('./shared/loader/Loader.jsx'));

// public route
const LoginPage = lazy(() => import('./public/login/Login.jsx'));
const RegisterPage = lazy(() => import('./public/register/Register.jsx'));
const ForgotPasswordPage = lazy(() => import('./public/forgotpass/ForgotPassword.jsx'));
const ResetPasswordPage = lazy(() => import('./public/resetpass/ResetPassword.jsx'));

// private route
const HomePage = lazy(() => import('./private/homepage/Homepage.jsx'));
const ContactUs = lazy(() => import('./shared/contact/Contact.jsx'));
const Sidebar = lazy(() => import('./private/sidebar/Sidebar.jsx'));
const ProfilePage = lazy(() => import('./private/profile/Profile.jsx'));
const DashboardPage = lazy(() => import('./private/dashboard/Dashboard.jsx'));
const NutritionAnalyzerPage = lazy(() => import('./private/nutrition/NutritionAnalyzer.jsx'));
const Combined = lazy(() => import('./private/recipe/Combined.jsx'));


export const AppRouter = () => {
    const [show, setShow] = useState(false);
    const handleToggle = useCallback(() => setShow(!show));
    const handleClose = useCallback(() => setShow(false));;

    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();
    const navigate = useNavigate();

    const googleLogout = useCallback(() => {
      setIsGoogleAuthenticated(undefined);
    }, [setIsGoogleAuthenticated]);

    const githubLogout = useCallback(() => {
        setIsGithubAuthenticated(undefined);
    }, [setIsGithubAuthenticated]);

    const logout = useCallback(() => {
        setIsAuthenticated(undefined);
    }, [setIsAuthenticated]);

    async function handleLogout() {
        const response = await fetch('http://localhost:3500/api/account/logout', {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            if (isGoogleAuthenticated) {  
            googleLogout();
            } 
            if (isGithubAuthenticated) {
            githubLogout();
            }
            if (isAuthenticated) {
            logout();
            }
            console.log('Logged out successfully');
            navigate('/home')
        } else {
            console.error('Logout failed');
        }
    }

    return (
      <div className="container-fluid d-flex flex-column min-vh-100">
      <Suspense fallback={<div><Loader /></div>}>
        <Header onToggle={handleToggle} handleLogout={handleLogout}/>
        <div className="row flex-grow-1">
        <Routes>
          <Route element={<PublicRoute strict={true}/>}>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
          </Route>
          <Route exact path={ROOT_ROUTE} element={<><Sidebar show={show} handleClose={handleClose} handleLogout={handleLogout}/><PrivateRoute/></>}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nutrition" element={<NutritionAnalyzerPage />} />
            <Route path="/recipe" element={<Combined />}/>
            <Route path="/contact" element={<ContactUs />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
        </div>
        <Footer />
      </Suspense>
      </div>
    );
  };