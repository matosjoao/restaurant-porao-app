/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useRef, useEffect, useState, useCallback} from 'react';
import {Text, View, findNodeHandle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import {getCategories} from '../../api/CategoriesService';
import {getProducts} from '../../api/ProductsService';
import {Alert} from '../../common/services/Alert';
import Loading from '../../common/services/Loading';
import CategoriesSlider from '../categories-slider/CategoriesSlider';
import ProductsSlider from '../products-slider/ProductsSlider';
import SearchInput from '../search-input/SearchInput';
import styles from './ProductsModal.style';
import ProductsModalContainer from './ProductsModalContainer';

function ProductsModalOld({isVisible, onCloseModal, onAddProducts}) {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [enteredSearch, setEnteredSearch] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsToAdd, setProductsToAdd] = useState([]);
  const scrollRef = useRef();
  const searchInput = useRef();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      Loading.start();
      setIsFetching(true);
      try {
        const responseCategories = await getCategories({
          signal: controller.signal,
        });
        setCategoriesList(responseCategories.products_types);

        const responseProducts = await getProducts({
          signal: controller.signal,
        });
        setProductsList(responseProducts.products);

        setIsFetching(false);
        Loading.stop();
      } catch (error) {
        if (!axios.isCancel(error)) {
          Alert.error(
            'Ocorreu um erro',
            'Por favor contacte o administrador.\n' +
              '[' +
              error.response?.data?.message +
              ']',
          );
        }
        setIsFetching(false);
        Loading.stop();
      }
    }

    fetchData();

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, []);

  // On Category press filter
  const onCategoryPressHandler = useCallback(
    async categoryId => {
      const controller = new AbortController();

      if (categoryId === currentCategory) {
        const responseProducts = await getProducts(null, null, {
          signal: controller.signal,
        });
        setProductsList(responseProducts.products);
        setCurrentCategory(null);
      } else {
        const responseProducts = await getProducts(categoryId, enteredSearch, {
          signal: controller.signal,
        });
        setProductsList(responseProducts.products);
        setCurrentCategory(categoryId);
      }

      return () => {
        // If the component is unmounted, cancel the request
        controller.abort();
      };
    },
    [currentCategory, enteredSearch],
  );

  const onSearchSubmitHandler = useCallback(async () => {
    const controller = new AbortController();

    const responseProducts = await getProducts(currentCategory, enteredSearch, {
      signal: controller.signal,
    });
    setProductsList(responseProducts.products);

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, [currentCategory, enteredSearch]);

  // On Update list: quantities
  function onProductListUpdateHandler(list) {
    setProductsToAdd(list);
  }

  // Add Products to Order List
  function onAddPressHandler() {
    onAddProducts(productsToAdd);
  }

  /* const scrollToInput = reactNode => {
    scrollRef.current.scrollToFocusedInput(reactNode);
  };

  const onInputFocus = event => {
    scrollToInput(findNodeHandle(event.target));
  }; */

  return (
    <ProductsModalContainer
      isVisible={isVisible}
      onCloseModal={onCloseModal}
      onAddPress={onAddPressHandler}>
      <View style={styles.listContainer}>
        {/* <View style={{height: 80}}>
          <KeyboardAwareScrollView
            contentContainerStyle={{flex: 1}}
            extraScrollHeight={120}
            enableOnAndroid={true}
            ref={scrollRef}
            enableResetScrollToCoords={false}
            bounces={false}
            contentInsetAdjustmentBehavior="always"
            overScrollMode="always"
            showsVerticalScrollIndicator={true}>
            <SearchInput
              iconName="search"
              textInputConfig={{
                ref: searchInput,
                placeholder: 'Procure por um produto...',
                autoCorrect: false,
                autoCapitalize: 'none',
                onChangeText: value => setEnteredSearch(value),
                value: enteredSearch,
                returnKeyType: 'search',
                onSubmitEditing: onSearchSubmitHandler,
                onFocus: onInputFocus,
              }}
            />
          </KeyboardAwareScrollView>
        </View> */}

        <Text style={styles.title}>Categorias:</Text>
        <CategoriesSlider
          categories={categoriesList}
          onItemPress={onCategoryPressHandler}
          currentCategory={currentCategory}
        />

        <Text style={styles.title}>Produtos:</Text>
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

export default ProductsModalOld;
