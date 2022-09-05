import React from 'react';
import {View, StyleSheet} from 'react-native';

import HeaderTitle from '../header-title/HeaderTitle';
import IconButton from '../icon-button/IconButton';
import OrderListFooter from '../order-list/OrderListFooter';

function OrderContainer({
  children,
  title,
  onPressOpenModal,
  onSavePress,
  onClosePress,
}) {
  return (
    <View style={styles.container}>
      <View>
        <HeaderTitle>{title}</HeaderTitle>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="add-circle"
            color="green"
            size={50}
            onPress={onPressOpenModal}
          />
        </View>
        <View style={styles.list}>{children}</View>
        <OrderListFooter
          onPressSave={onSavePress}
          onPressClose={onClosePress}
        />
      </View>
    </View>
  );
}

export default OrderContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
  list: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 10,
  },
});
