import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, ORDER_DIMENSIONS} from '../../Config';

function OrderListHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionHeader}>
        <Text style={styles.headerText}>Descrição</Text>
      </View>
      <View>
        <Text style={styles.headerText}>Quantidade</Text>
      </View>
    </View>
  );
}

export default OrderListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  descriptionHeader: {
    width: ORDER_DIMENSIONS.tableDescriptionWidth,
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
});
