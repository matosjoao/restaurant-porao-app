import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_NAMES} from '../../Config';

export const getToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem(STORAGE_NAMES.TOKEN);
    return tokenString;
  } catch (e) {
    return null;
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem(STORAGE_NAMES.TOKEN, token);
  } catch (e) {
    // saving error
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_NAMES.TOKEN);
  } catch (e) {
    // saving error
  }
};
