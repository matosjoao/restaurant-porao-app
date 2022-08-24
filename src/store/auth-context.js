import React, {createContext, useState} from 'react';

import Http from '../common/services/Http';
import {removeToken, setToken} from '../common/services/Storage';
import {API_TOKEN_TYPE} from '../Config';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  isLoadingSplash: true,
  authenticate: () => {},
  logout: () => {},
  stopLoadingSplash: () => {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);

  function authenticate(token) {
    // Set token to State
    setAuthToken(token);

    // Save token in storage
    setToken(token);

    // Set token in Http Class
    //TODO:: Improve maybe
    Http.setToken({
      token_type: API_TOKEN_TYPE,
      access_token: token,
    });
  }

  function logout() {
    // Set token to State null
    setAuthToken(null);

    // Remove token from storage
    removeToken();
  }

  function stopLoadingSplash() {
    setIsLoadingSplash(false);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isLoadingSplash: isLoadingSplash,
    authenticate: authenticate,
    logout: logout,
    stopLoadingSplash: stopLoadingSplash,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
