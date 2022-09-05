import React, {useEffect, useState} from 'react';
import {View, Dimensions, Modal, Animated, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../Config';
import ProductsModal from './ProductsModal';
import styles from './ProductsModal.style';

function ProductsModalContainer({isVisible, onCloseModal, onAddProductsPress}) {
  const screenHeight = Dimensions.get('screen').height;

  const [panY, setPanY] = useState(new Animated.Value(screenHeight));
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      resetPositionAnim.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

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

  const closeModal = () => {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));

      onCloseModal();
    });
  };

  function onAddProductsHandler(productsList) {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));

      onAddProductsPress(productsList);
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
            <ProductsModal onAddProducts={onAddProductsHandler} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default ProductsModalContainer;
