import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function OrderListEmpty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sem pedido</Text>
    </View>
  );
}

export default OrderListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    paddingVertical: 10,
  },
});
