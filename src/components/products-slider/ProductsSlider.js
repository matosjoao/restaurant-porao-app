import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../Config';

import ProductItem from './ProductItem';

function ProductsSlider({productsList, onProductListUpdate, isFetching}) {
  const [productsToAdd, setProductsToAdd] = useState([]);

  useLayoutEffect(() => {
    // When productsToAdd change update list on main component
    onProductListUpdate(productsToAdd);
  }, [productsToAdd, onProductListUpdate]);

  function onProductPressHandler(pressedProduct, action) {
    const updatableProductIndex = productsToAdd.findIndex(
      product => product.id === pressedProduct.id,
    );
    // Add first time
    if (updatableProductIndex === -1) {
      if (action !== 'add') {
        return;
      }
      setProductsToAdd(current => [
        ...current,
        {...pressedProduct, quantity: 1},
      ]);

      // Update quantity existing product
    } else {
      const updatableProduct = productsToAdd[updatableProductIndex];

      let newQuantity =
        action === 'add'
          ? updatableProduct.quantity + 1
          : updatableProduct.quantity - 1;

      if (newQuantity <= 0) {
        newQuantity = 0;

        setProductsToAdd(current =>
          current.filter(obj => {
            return obj.productId !== pressedProduct.id;
          }),
        );
      } else {
        const updatedProduct = {
          ...updatableProduct,
          quantity: newQuantity,
        };

        const updatedProducts = [...productsToAdd];
        updatedProducts[updatableProductIndex] = updatedProduct;
        setProductsToAdd(updatedProducts);
      }
    }
  }

  function renderProduct(itemData) {
    const updatableProductIndex = productsToAdd.findIndex(
      product => product.id === itemData.item.id,
    );
    const quantity =
      updatableProductIndex !== -1
        ? productsToAdd[updatableProductIndex].quantity
        : 0;

    return (
      <ProductItem
        {...itemData.item}
        quantity={quantity}
        onPressAdd={product => {
          onProductPressHandler(product, 'add');
        }}
        onPressRemove={product => {
          onProductPressHandler(product, 'remove');
        }}
      />
    );
  }

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Sem produtos</Text>
      </View>
    );
  }

  return (
    <View style={styles.productsContainer}>
      {!isFetching && productsList ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={productsList}
          renderItem={renderProduct}
          ListEmptyComponent={renderEmptyList}
        />
      ) : (
        <ActivityIndicator animating size="large" color={COLORS.primary} />
      )}
    </View>
  );
}

export default ProductsSlider;

const styles = StyleSheet.create({
  productsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    paddingVertical: 10,
  },
});
