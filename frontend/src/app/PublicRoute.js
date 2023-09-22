import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { ROOT_ROUTE } from '../constants/routes';
import { useAuth } from '../features/auth';

export const PublicRoute = ({strict}) => {
  const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();

  return (
    (isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated ) && strict ? (
      <Navigate
        to={ROOT_ROUTE}
      />
    ) : (
      <Outlet/>
    )
  );
};
