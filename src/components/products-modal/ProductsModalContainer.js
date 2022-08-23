import React, {useEffect, useState} from 'react';
import {View, Dimensions, Modal, Animated, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../Config';
import Button from '../button/Button';
import styles from './ProductsModal.style';

function ProductsModalContainer({
  isVisible,
  onCloseModal,
  onAddPress,
  children,
}) {
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

  function onAddPressHandler() {
    closeAnim.start(() => {
      setPanY(new Animated.Value(screenHeight));
      setSpinValue(new Animated.Value(0));
      onAddPress();
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
            {children}

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

export default ProductsModalContainer;
