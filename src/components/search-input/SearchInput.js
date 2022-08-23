import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {COLORS, LOGIN_DIMENSIONS} from '../../Config';

function SearchInput({
  iconName,
  textInputStyles,
  textInputConfig,
  textInputValid,
}) {
  return (
    <View style={styles.container}>
      <Icon name={iconName} color={COLORS.gray} size={22} style={styles.icon} />
      <TextInput style={[styles.input, textInputStyles]} {...textInputConfig} />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    padding: 4,
    backgroundColor: 'white',
    borderRadius: LOGIN_DIMENSIONS.inputsBorderRadius,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 2,
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
