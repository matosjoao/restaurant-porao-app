import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {CATEGORIES_DATA} from '../../Config';
import CategoryItem from './CategoryItem';

function CategoriesSlider({onItemPress}) {
  function renderCategory(itemData) {
    return <CategoryItem {...itemData.item} onPress={onItemPress} />;
  }

  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={CATEGORIES_DATA}
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
