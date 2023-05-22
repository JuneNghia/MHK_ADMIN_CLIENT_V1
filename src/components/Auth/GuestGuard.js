import React from 'react';
import { BASE_URL } from '../../config/constant';
import useAuth from '../../hooks/useAuth';
import PageLoader from '../Loader/PageLoader';

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    setTimeout(() => {
      window.location.replace(BASE_URL);
    }, 2000);
    return <PageLoader />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
