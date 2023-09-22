import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE } from '../constants/routes';
import { useAuth } from '../features/auth';

export const PrivateRoute = () => {
  const { isAuthenticated, isGoogleAuthenticated } = useAuth();

  return (
    (isAuthenticated || isGoogleAuthenticated) ? (
      <Outlet/>
    ) : (
      <Navigate
        to={LOGIN_ROUTE}
      />
    )
  );
};
