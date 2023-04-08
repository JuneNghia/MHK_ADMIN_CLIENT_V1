import React from 'react';
import { BASE_URL } from '../../config/constant';

import useAuth from '../../hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    window.location.replace(BASE_URL);
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
