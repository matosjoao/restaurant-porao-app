import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import useProducts from '../../common/hooks/useProducts';

import CategoryItem from './CategoryItem';

function CategoriesSlider({onItemPress, currentCategory}) {
  const {productsTypes} = useProducts();

  function renderCategory(itemData) {
    const imgSource = {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910014.png',
    };
    const isActive = currentCategory === itemData.item.id ? true : false;

    return (
      <CategoryItem
        {...itemData.item}
        imageSource={imgSource}
        onPress={onItemPress}
        isActive={isActive}
      />
    );
  }

  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        keyExtractor={item => item.id}
        data={productsTypes}
        renderItem={renderCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default CategoriesSlider;

const styles = StyleSheet.create({
  categoriesContainer: {
    height: 100,
    marginBottom: 10,
  },
});
