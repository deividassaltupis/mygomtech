import { FC, useState, useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { Routes, API } from '~/constants';

import LoadingScreen from './LoadingScreen';

import getUrl from '~/utils/getUrl';

const PrivateRoute: FC<RouteProps> = ({ path, component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const verifyToken = async () => {
    const token = localStorage.getItem('token');

    // - If no token provided - end verification.
    if (!token) {
      setIsLoading(false);
      return;
    }

    const url = getUrl(API.Verify);
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    /*  - If server responded with status 200 it means request successfully passed authentification middleware, 
        - which checks if provided token is valid and reached it's endpoint
    */
    if (response.status === 200) setTokenValid(true);
    // - If server did not responded with status 200 it means authentification failed - token is invalid and we should remove it.
    else localStorage.removeItem('token');

    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : tokenValid && !isLoading ? (
    // If loading ended and token is valid let user to access private route
    <Route path={path} component={component} />
  ) : (
    // - Else redirect user to login page
    <Redirect to={Routes.Login} />
  );
};

export default PrivateRoute;
