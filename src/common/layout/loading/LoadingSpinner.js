import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {COLORS} from '../../../Config';

const LoadingSpinner = ({containerStyle, mode = 'default'}) => {
  return (
    <View
      style={[
        styles.loading,
        containerStyle && containerStyle,
        mode === 'simple' && styles.back,
      ]}>
      <ActivityIndicator animating size="large" color={COLORS.primary} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    backgroundColor: 'transparent',
  },
});
