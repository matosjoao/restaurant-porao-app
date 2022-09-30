import React from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';

import Loading from '../common/services/Loading';
import FormLogin from '../components/form-login/FormLogin';
import {COLORS} from '../Config';
import {login} from '../api/AuthService';
import {Alert} from '../common/services/Alert';
import useAuth from '../common/hooks/useAuth';
import useProducts from '../common/hooks/useProducts';

function LoginScreen() {
  const {authenticate} = useAuth();
  const {fetchProducts, fetchProductsTypes} = useProducts();

  async function onAuthenticateHandler({email, password}) {
    Loading.start();

    try {
      // Login and authenticate with token
      const response = await login(email, password);
      authenticate(response.token);

      // Get products data
      await fetchProducts();

      // Get product types data
      await fetchProductsTypes();

      Loading.stop();
    } catch (error) {
      Alert.error(
        'Autenticação falhou!',
        'Por favor, verifique os seus dados ou tente mais tarde.\n' +
          error.response?.data?.message,
      );
      Loading.stop();
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <ImageBackground
          source={require('../../assets/images/back-login.png')}
          resizeMode="cover"
          style={styles.formBackground}>
          <FormLogin onAuthenticate={onAuthenticateHandler} />
        </ImageBackground>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '70%',
    width: '70%',
  },
  formContainer: {
    flex: 0.6,
  },
  formBackground: {
    height: '100%',
    width: '100%',
  },
});
