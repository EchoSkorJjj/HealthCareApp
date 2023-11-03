import { lazy, Suspense, useState, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HOME_ROUTE, ROOT_ROUTE } from '../constants/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import '../assets/styles/shared_styles/AppRouter.css';

import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../features/localStorage'
import { useAuth } from '../features/auth';
import useProfileStore from '../features/store/ProfileStore';
import useRecipeStore from '../features/store/RecipeStore';
import useFitnessStore from '../features/store/FitnessStore';

// shared route
const Header = lazy(() => import('./shared/header/Header.jsx'));
const Home = lazy(() => import('./shared/home/Home.jsx'));
const Footer = lazy(() => import('./shared/footer/Footer.jsx'));
const Loader = lazy(() => import('./shared/loader/Loader.jsx'));
const NotFoundPage = lazy(() => import('./shared/404/404.jsx'));

// public route
const ForgotPasswordPage = lazy(() => import('./public/forgotpass/ForgotPassword.jsx'));
const ResetPasswordPage = lazy(() => import('./public/resetpass/ResetPassword.jsx'));
const NewLoginPage = lazy(() => import('./public/newlogin/NewLogin.jsx'));

// private route
const SidebarPage = lazy(() => import('./private/sidebar/Sidebar.jsx'));
const ProfilePage = lazy(() => import('./private/profile/Profile.jsx'));
const DashboardPage = lazy(() => import('./private/dashboard/Dashboard.jsx'));
const NutritionAnalyzerPage = lazy(() => import('./private/nutrition/NutritionAnalyzer.jsx'));
const CombinedPage = lazy(() => import('./private/recipe/Combined.jsx'));
const RecipeBookPage = lazy(() => import('./private/recipebook/RecipeBook.jsx'));
const RecipeBookDetailPage = lazy(() => import('./private/recipebook/RecipeBookDetail.jsx'));
const TrainerPage = lazy(() => import('./private/trainer/Trainer.jsx'));
const GymPage = lazy(() => import('./private/exercises/Gym.jsx'));
const ExerciseDetailPage = lazy(() => import('./private/exercises/ExerciseDetail.jsx'));

export const AppRouter = () => {
    const [show, setShow] = useState(false);
    const handleToggle = useCallback(() => setShow(!show));
    const handleClose = useCallback(() => setShow(false));;

    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();
    const navigate = useNavigate();
    const resetProfileData = useProfileStore((state) => state.setProfileData);
    const resetSearchName = useRecipeStore((state) => state.resetSearchName);
    const resetRecipeResults = useRecipeStore((state) => state.resetRecipeResults);
    const resetAccessToken = useFitnessStore((state) => state.resetAccessToken);
    const resetRecipeData = useRecipeStore((state) => state.resetRecipeData);
    
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
        const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
        const response = await fetch(`${baseUrl}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            resetProfileData();
            resetSearchName();
            resetRecipeResults();
            resetAccessToken();
            resetRecipeData();
            if (isGoogleAuthenticated) {  
            googleLogout();
            } 
            if (isGithubAuthenticated) {
            githubLogout();
            }
            if (isAuthenticated) {
            logout();
            }
            navigate('/home')
        } else {
            console.error('Logout failed');
        }
    }

    return (
      <div className='container-fluid d-flex flex-column min-vh-100 px-0'>
      <Suspense fallback={<div><Loader /></div>}>
        <Header onToggle={handleToggle} handleLogout={handleLogout}/>
        <div className="d-flex content-container">
        <Routes>
          <Route element={<PublicRoute strict={true}/>}>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path="/index.html" element={<Navigate to="/home" replace />} />
            <Route path="/newlogin" element={<NewLoginPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
          </Route>
          <Route  exact path={ROOT_ROUTE} element={<><SidebarPage show={show} handleClose={handleClose} handleLogout={handleLogout}/><PrivateRoute/></>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/gym" element={<GymPage />} />
            <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
            <Route path="/nutrition" element={<NutritionAnalyzerPage />} />
            <Route path="/recipe" element={<CombinedPage />}/>
            <Route path="/recipebook" element={<RecipeBookPage />} />
            <Route path="/recipebook/:recipeLabel" element={<RecipeBookDetailPage />} />
            <Route path="/trainer" element={<TrainerPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        </div>
        <Footer />
      </Suspense>
      </div>
    );
  };