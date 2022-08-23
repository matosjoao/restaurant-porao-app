import React, {createContext, useState} from 'react';

import Http from '../common/services/Http';
import {removeToken, setToken} from '../common/services/Storage';
import {API_TOKEN_TYPE} from '../Config';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();

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

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
