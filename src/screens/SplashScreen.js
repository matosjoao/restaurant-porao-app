import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {COLORS} from '../Config';

function SplashScreen() {
  return (
    <View style={styles.rootContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
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
    height: '50%',
    width: '50%',
  },
});
