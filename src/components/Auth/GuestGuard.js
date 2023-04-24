import React, { useState } from 'react';
import { BASE_URL } from '../../config/constant';

import useAuth from '../../hooks/useAuth';
import { HashLoader } from 'react-spinners';

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    setTimeout(() => {
      window.location.replace(BASE_URL);
    }, 3000);
    return <HashLoader style={{ display: 'block', height: '100vh', margin: 'auto' }} size={50} color="#36d7b7" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
