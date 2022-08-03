import React, {useEffect, useState} from 'react';
import {View, Dimensions, Modal, Text, Animated, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, PRODUCTS_DATA} from '../../Config';
import Button from '../button/Button';
import CategoriesSlider from '../categories-slider/CategoriesSlider';
import ProductsSlider from '../products-slider/ProductsSlider';
import styles from './ProductsModal.style';

function ProductsModal({isVisible, onCloseModal, onAdd}) {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [productsList, setProductsList] = useState(PRODUCTS_DATA);
  const [productsToAdd, setProductsToAdd] = useState([]);

  const screenHeight = Dimensions.get('screen').height;

  const [panY, setPanY] = useState(new Animated.Value(screenHeight));
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: false,
  });

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    if (isVisible) {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      resetPositionAnim.start();
    }
  }, [isVisible, resetPositionAnim, spinValue]);

  const closeModal = () => {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));
      onCloseModal();
    });
  };

  function onCategoryPressHandler(categoryId) {
    if (categoryId === currentCategory) {
      setProductsList(PRODUCTS_DATA);
    } else {
      setCurrentCategory(categoryId);
      let filteredProductList = PRODUCTS_DATA.filter(product => {
        return product.categoryId === categoryId;
      });
      setProductsList(filteredProductList);
    }
  }

  function onProductListUpdateHandler(list) {
    setProductsToAdd(list);
  }

  function onAddPressHandler() {
    // Add name and price to array
    productsToAdd.map(productToAdd => {
      const productDetail = PRODUCTS_DATA.find(
        product => product.id === productToAdd.productId,
      );
      productToAdd.price = productDetail.price;
      productToAdd.description = productDetail.description;
      productToAdd.toSave = 1;
    });

    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));
      onAdd(productsToAdd);
    });
  }

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.container}>
        <Animated.View style={[styles.modalContainer, {top}]}>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <Icon name={'md-close-circle'} color={COLORS.gray} size={50} />
            </Animated.View>
          </Pressable>
          <View style={styles.content}>
            <Text style={styles.title}>Categorias:</Text>
            <CategoriesSlider onItemPress={onCategoryPressHandler} />

            <Text style={styles.title}>Produtos:</Text>
            <ProductsSlider
              productsList={productsList}
              onProductListUpdate={onProductListUpdateHandler}
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
        </Animated.View>
      </View>
    </Modal>
  );
}

export default ProductsModal;
