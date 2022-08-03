import React from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';

import FormLogin from '../components/form-login/FormLogin';
import {COLORS} from '../Config';

function Login() {
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
          <FormLogin />
        </ImageBackground>
      </View>
    </View>
  );
}

export default Login;

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
