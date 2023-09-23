import { Navigate, Outlet } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/routes';
import { useAuth } from '../features/auth';

export const PrivateRoute = () => {
  const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();

  return (
    (isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated) ? (
      <Outlet/>
    ) : (
      <Navigate
        to={HOME_ROUTE}
      />
    )
  );
};
