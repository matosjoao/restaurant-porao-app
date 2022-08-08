import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {LOGIN_DIMENSIONS} from '../../Config';

function InputLogin({
  iconName,
  iconColor,
  textInputStyles,
  textInputConfig,
  textInputValid,
}) {
  return (
    <View style={styles.container}>
      <Icon name={iconName} color={iconColor} size={28} style={styles.icon} />
      <TextInput style={[styles.input, textInputStyles]} {...textInputConfig} />
    </View>
  );
}

export default InputLogin;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: LOGIN_DIMENSIONS.formHorizontalMargin,
    marginVertical: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: LOGIN_DIMENSIONS.inputsBorderRadius,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 8,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    fontFamily: 'Roboto-Light',
    flex: 1,
    marginHorizontal: 8,
    padding: 6,
    fontSize: 18,
  },
});
