import React from 'react';
import {
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {COLORS, GENERAL_DIMENSIONS} from '../../Config';

export const itemWidth = Dimensions.get('window').width / 4.5;
export const itemHeight = Dimensions.get('window').width / 4.5 + 20;

function CategoryItem({id, description, imageSource, onPress}) {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({pressed}) =>
        pressed
          ? [styles.categoryContainer, styles.pressed]
          : styles.categoryContainer
      }>
      <View style={styles.itemImageContainer}>
        <Image source={imageSource} style={styles.itemImage} />
      </View>
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemName}>{description}</Text>
      </View>
    </Pressable>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  categoryContainer: {
    width: itemWidth,
    borderRadius: GENERAL_DIMENSIONS.cardBorderRadius,
    backgroundColor: COLORS.gray,
    padding: 10,
    marginRight: 10,
  },
  itemImageContainer: {
    flex: 0.65,
  },
  itemImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: 16,
  },
  itemNameContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: 'Roboto-Light',
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
