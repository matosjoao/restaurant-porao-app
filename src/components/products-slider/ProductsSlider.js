import React, {useState, useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import ProductItem from './ProductItem';

function ProductsSlider({productsList, onProductListUpdate}) {
  const [productsToAdd, setProductsToAdd] = useState([]);

  useLayoutEffect(() => {
    // When productsToAdd change update list on main component
    onProductListUpdate(productsToAdd);
  }, [productsToAdd, onProductListUpdate]);

  function onProductPressHandler(productId, action) {
    const updatableProductIndex = productsToAdd.findIndex(
      product => product.productId === productId,
    );
    // Add first time
    if (updatableProductIndex === -1) {
      if (action !== 'add') {
        return;
      }
      setProductsToAdd(current => [
        ...current,
        {productId: productId, quantity: 1},
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
            return obj.productId !== productId;
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
      product => product.productId === itemData.item.id,
    );
    const quantity =
      updatableProductIndex !== -1
        ? productsToAdd[updatableProductIndex].quantity
        : 0;

    return (
      <ProductItem
        {...itemData.item}
        quantity={quantity}
        onPressAdd={id => {
          onProductPressHandler(id, 'add');
        }}
        onPressRemove={id => {
          onProductPressHandler(id, 'remove');
        }}
      />
    );
  }

  return (
    <View style={styles.productsContainer}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={productsList}
        renderItem={renderProduct}
      />
    </View>
  );
}

export default ProductsSlider;

const styles = StyleSheet.create({
  productsContainer: {
    flex: 1,
    marginBottom: 10,
  },
});
