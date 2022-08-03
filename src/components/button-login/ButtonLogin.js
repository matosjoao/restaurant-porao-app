import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, LOGIN_DIMENSIONS} from '../../Config';

function ButtonLogin({children, onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonOuterContainer}>
        <Pressable
          onPress={onPress}
          style={({pressed}) =>
            pressed
              ? [styles.buttonInnerContainer, styles.pressed]
              : styles.buttonInnerContainer
          }>
          <LinearGradient
            colors={[COLORS.primary100, COLORS.primary, COLORS.primary]}
            style={styles.gradient}>
            <Text style={[styles.buttonText]}>{children}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

export default ButtonLogin;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LOGIN_DIMENSIONS.formHorizontalMargin,
    marginVertical: 30,
  },
  buttonOuterContainer: {
    backgroundColor: 'white',
    borderRadius: LOGIN_DIMENSIONS.buttonBorderRadius,
    overflow: 'hidden',
    elevation: 8,
  },
  buttonInnerContainer: {
    backgroundColor: 'white',
  },
  gradient: {
    padding: 18,
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
