import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {COLORS} from '../../Config';
import IconButton from '../icon-button/IconButton';
import styles from './ProductItem.style';

function ProductItem({id, name, price, quantity, onPressAdd, onPressRemove}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{price}€</Text>
      </View>
      <View style={styles.actionsContainer}>
        <IconButton
          icon="add-circle"
          color={COLORS.green}
          size={40}
          buttonStyle={styles.icon}
          onPress={onPressAdd.bind(this, {id, name, price})}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <IconButton
          icon="remove-circle"
          color={COLORS.red}
          size={40}
          buttonStyle={styles.icon}
          onPress={onPressRemove.bind(this, {id, name, price})}
        />
      </View>
    </View>
  );
}

export default memo(ProductItem);
