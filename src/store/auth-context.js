import React, {createContext, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_TOKEN_TYPE, STORAGE_NAMES} from '../Config';
import Http from '../common/services/Http';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    setToken(token);
    console.log(token)
    Http.setToken({
      token_type: API_TOKEN_TYPE,
      access_token: token,
    });
  }

  function logout() {
    setAuthToken(null);
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

export const getToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem(STORAGE_NAMES.TOKEN);
    return tokenString;
  } catch (e) {
    return null;
  }
};

const setToken = async token => {
  try {
    await AsyncStorage.setItem(STORAGE_NAMES.TOKEN, token);
  } catch (e) {
    // saving error
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_NAMES.TOKEN);
  } catch (e) {
    // saving error
  }
};

export default AuthContextProvider;
