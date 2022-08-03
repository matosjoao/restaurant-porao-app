import React, {useEffect, useState} from 'react';
import {View, Dimensions, Modal, Text, Animated, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../Config';
import Button from '../button/Button';
import styles from './ProductEditModal.style';
import IconButton from '../icon-button/IconButton';

function ProductEditModal({
  currentEditProduct,
  isVisible,
  onCloseModal,
  onEdit,
}) {
  const [currentProduct, setCurrentProduct] = useState({});

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

  useEffect(() => {
    setCurrentProduct(currentEditProduct);
  }, [currentEditProduct]);

  const closeModal = () => {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));
      onCloseModal();
    });
  };

  function onAddPressHandler() {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));
      onEdit({
        productId: currentProduct.productId,
        quantity: currentProduct.quantity,
      });
    });
  }

  function onUpdateQuantityHandler(action) {
    let newQuantity =
      action === 'add'
        ? currentProduct.quantity + 1
        : currentProduct.quantity - 1;

    if (newQuantity <= 0) {
      newQuantity = 0;
    }

    setCurrentProduct(current => {
      return {...current, quantity: newQuantity};
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
            <Text style={styles.title}>{currentProduct.description}</Text>

            <View style={styles.actionsContainer}>
              <IconButton
                icon="add-circle"
                color={COLORS.green}
                size={56}
                buttonStyle={styles.icon}
                onPress={() => {
                  onUpdateQuantityHandler('add');
                }}
              />
              <Text style={styles.quantity}>{currentProduct.quantity}</Text>
              <IconButton
                icon="remove-circle"
                color={COLORS.red}
                size={56}
                buttonStyle={styles.icon}
                onPress={() => {
                  onUpdateQuantityHandler('remove');
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={onAddPressHandler}
                text="GRAVAR"
                size="normal"
                iconName="checkmark-sharp"
                position="normal"
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default ProductEditModal;
