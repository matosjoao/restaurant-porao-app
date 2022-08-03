import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {LOGIN_DIMENSIONS} from '../../Config';

function TitleLogin({children, textStyle}) {
  return <Text style={[styles.text, textStyle]}>{children}</Text>;
}

export default TitleLogin;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Light',
    marginHorizontal: LOGIN_DIMENSIONS.formHorizontalMargin,
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 40,
  },
});
