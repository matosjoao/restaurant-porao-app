import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {COLORS} from '../../Config';

function HeaderTitle({children, textStyle}) {
  return <Text style={[styles.text, textStyle]}>{children}</Text>;
}

export default HeaderTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    marginHorizontal: 20,
    marginTop: 20,
    color: COLORS.gray,
  },
});
