/* eslint-env browser */
/* eslint no-undef: "error"*/
import axios from 'axios';
import React, {useContext, useEffect} from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';

import {getToken} from '../common/services/Storage';
import {COLORS} from '../Config';
import {Alert} from '../common/services/Alert';
import {AuthContext} from '../store/auth-context';
import {ProductsContext} from '../store/products-context';

function SplashScreen() {
  const authCtx = useContext(AuthContext);
  const prodCtx = useContext(ProductsContext);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          // Authenticate with token
          authCtx.authenticate(storedToken);

          // Get products data
          await prodCtx.fetchProducts({
            signal: controller.signal,
          });

          // Get product types data
          await prodCtx.fetchProductsTypes({
            signal: controller.signal,
          });
        }

        // Stop loading splash
        authCtx.stopLoadingSplash();
      } catch (error) {
        if (!axios.isCancel(error)) {
          Alert.error(
            'Ocorreu um erro',
            'Por favor contacte o administrador.\n' +
              '[' +
              error.response?.data?.message +
              ']',
          );
        }
      }
    }

    fetchData();

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <ActivityIndicator animating size="large" color={COLORS.primary} />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
  },
});
