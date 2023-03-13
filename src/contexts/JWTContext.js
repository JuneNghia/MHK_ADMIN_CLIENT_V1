import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

import { ACCOUNT_INITIALISE, LOGIN, LOGOUT } from '../store/actions';
import accountReducer from '../store/accountReducer';
import Loader from '../components/Loader/Loader';
import services from '../utils/axios'

const initialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }

  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    // services.defaults.headers.common.Authorization = `${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    // delete services.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {}
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const login = async (email, password) => {
    const response = await services.post('/auth/login', { email, password });
    const {token, user} = response.data;
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // const response = await services.get('');
          // const { user } = response.data;
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: true,
              user: "user"
            }
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: ACCOUNT_INITIALISE,
          payload: {
            isLoggedIn: false,
            user: null
          }
        });
      }
    };

    init();
  }, []);

  if (!state.isInitialised) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
