import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, ORDER_DIMENSIONS} from '../../Config';
import IconButton from '../icon-button/IconButton';

function OrderListItem({productId, description, quantity, onItemPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
        <View style={styles.actionContainer}>
          <IconButton
            icon="create-outline"
            color={COLORS.red}
            size={26}
            onPress={() => {
              onItemPress({productId, description, quantity});
            }}
            buttonStyle={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    marginHorizontal: 11,
    padding: 4,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  descriptionContainer: {
    width: ORDER_DIMENSIONS.tableDescriptionWidth,
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Roboto-Light',
    color: COLORS.gray,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  actionContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 0,
  },
});
