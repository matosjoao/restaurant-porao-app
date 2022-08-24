import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';

import CategoriesSlider from '../categories-slider/CategoriesSlider';
import ProductsSlider from '../products-slider/ProductsSlider';
import SearchInput from '../search-input/SearchInput';
import styles from './ProductsModal.style';
import ProductsModalContainer from './ProductsModalContainer';
import {ProductsContext} from '../../store/products-context';

function ProductsModal({isVisible, onCloseModal, onAddProducts}) {
  const prodCtx = useContext(ProductsContext);
  const categoriesList = prodCtx.productsTypes;

  const [currentCategory, setCurrentCategory] = useState(null);
  const [enteredSearch, setEnteredSearch] = useState('');
  const [productsList, setProductsList] = useState(prodCtx.products);
  const [isFetching, setIsFetching] = useState(false);
  const [productsToAdd, setProductsToAdd] = useState([]);

  // On Category press filter
  function onCategoryPressHandler(categoryId) {
    //TODO:: Validate if this is the way to go for the search
    if (categoryId === currentCategory) {
      setProductsList(prodCtx.products);
      setCurrentCategory(null);
    } else {
      setCurrentCategory(categoryId);
      setIsFetching(true);
      let filteredProductList = prodCtx.products.filter(product => {
        return product.product_type_id === categoryId;
      });
      setProductsList(filteredProductList);
      setIsFetching(false);
    }
  }

  // On Search submit
  function onSearchSubmitHandler() {
    //TODO:: Validate if this is the way to go for the search
    let filteredProductList = prodCtx.products;
    if (enteredSearch === '') {
      if (currentCategory != null) {
        filteredProductList = productsList.filter(product => {
          return product.product_type_id === currentCategory;
        });
      }
    } else {
      filteredProductList = productsList.filter(product => {
        return product.name.toLowerCase().includes(enteredSearch.toLowerCase());
      });
    }

    setProductsList(filteredProductList);
  }

  // On Update list: quantities
  function onProductListUpdateHandler(list) {
    setProductsToAdd(list);
  }

  // Add Products to Order List
  function onAddPressHandler() {
    onAddProducts(productsToAdd);
  }

  return (
    <ProductsModalContainer
      isVisible={isVisible}
      onCloseModal={onCloseModal}
      onAddPress={onAddPressHandler}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Categorias:</Text>
        <CategoriesSlider
          categories={categoriesList}
          onItemPress={onCategoryPressHandler}
          currentCategory={currentCategory}
        />

        <Text style={styles.title}>
          Produtos: <Text style={styles.subtitle}>({productsList.length})</Text>
        </Text>
        <ProductsSlider
          productsList={productsList}
          onProductListUpdate={onProductListUpdateHandler}
          isFetching={isFetching}
        />

        {/* TODO:: Add keyboard avoind view */}
        <SearchInput
          iconName="search"
          textInputConfig={{
            placeholder: 'Procure por um produto...',
            autoCorrect: false,
            autoCapitalize: 'none',
            onChangeText: value => setEnteredSearch(value),
            value: enteredSearch,
            returnKeyType: 'search',
            onSubmitEditing: onSearchSubmitHandler,
          }}
        />
      </View>
    </ProductsModalContainer>
  );
}

export default ProductsModal;
