import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '../../Config';
import Button from '../../components/button/Button';

function OrderListFooter({onPressSave, onPressPrint}) {
  return (
    <View style={styles.bottomContainer}>
      <Button
        onPress={onPressSave}
        text="GRAVAR"
        size="normal"
        iconName="save"
        position="left-screen"
      />
      <Button
        onPress={onPressPrint}
        color="gray"
        size="normal"
        iconName="print"
        position="normal"
      />
    </View>
  );
}

export default OrderListFooter;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopColor: COLORS.gray,
    borderTopWidth: 0.5,
  },
});
