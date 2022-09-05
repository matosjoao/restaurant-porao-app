import React, {useContext, useReducer} from 'react';
import {Text, View, FlatList} from 'react-native';

import CategoriesSlider from '../categories-slider/CategoriesSlider';
import SearchInput from '../search-input/SearchInput';
import styles from './ProductsModal.style';
import Button from '../button/Button';
import {ProductsContext} from '../../store/products-context';
import ProductItem from '../products-slider/ProductItem';
import {INITIAL_STATE, productReducer} from '../../reducers/productReducer';
import {PRODUCT_ACTION_TYPES} from '../../actions/productActionTypes';

function ProductsModal({onAddProducts}) {
  const prodCtx = useContext(ProductsContext);

  // Set states
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE, init);

  // Lazy init for reducer
  function init() {
    return {
      category: null,
      search: '',
      products: prodCtx.products,
      filteredProducts: prodCtx.products,
      productsToAdd: [],
    };
  }

  // On Category press filter
  function onCategoryPressHandler(categoryId) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_UPDATE_CATEGORY,
      payload: categoryId,
    });
  }

  // On Search submit
  function onSearchSubmitHandler() {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_SEARCH,
    });
  }

  // On search input change handler
  function onSearchChangeHandler(value) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_UPDATE_SEARCH,
      payload: value,
    });
  }

  // On Press Add Quantity
  function onPressAddHandler(product) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_ADD_QUANTITY,
      payload: product,
    });
  }

  // On Press Remove Quantity
  function onPressRemoveHandler(product) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_SUBTRACT_QUANTITY,
      payload: product,
    });
  }

  // Render Product rom item
  function renderProduct(itemData) {
    const productsToAdd = state.productsToAdd;
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
        onPressAdd={onPressAddHandler}
        onPressRemove={onPressRemoveHandler}
      />
    );
  }

  // Render empty flatlist view
  function renderProductEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Sem produtos</Text>
      </View>
    );
  }

  // Add Products to Order List
  function onAddPressHandler() {
    onAddProducts(state.productsToAdd);
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Categorias:</Text>
      <CategoriesSlider
        onItemPress={onCategoryPressHandler}
        currentCategory={state.category}
      />

      <Text style={styles.title}>
        Produtos:
        <Text style={styles.subtitle}>({state.filteredProducts.length})</Text>
      </Text>
      <View style={styles.productsContainer}>
        <FlatList
          keyExtractor={item => item.id}
          data={state.filteredProducts}
          renderItem={renderProduct}
          ListEmptyComponent={renderProductEmptyList}
        />
      </View>

      {/* TODO:: Add keyboard avoind view */}
      <SearchInput
        iconName="search"
        textInputConfig={{
          placeholder: 'Procure por um produto...',
          autoCorrect: false,
          autoCapitalize: 'none',
          onChangeText: onSearchChangeHandler,
          value: state.search,
          returnKeyType: 'search',
          onSubmitEditing: onSearchSubmitHandler,
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={onAddPressHandler}
          text="ADICIONAR"
          size="normal"
          iconName="add-sharp"
          position="normal"
        />
      </View>
    </View>
  );
}

export default ProductsModal;
