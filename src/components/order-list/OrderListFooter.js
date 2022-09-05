import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {COLORS} from '../../Config';
import Button from '../../components/button/Button';

function OrderListFooter({onPressSave, onPressClose}) {
  function onPressCloseHandler() {
    Alert.alert('Aviso!', 'Têm a certeza que pretende fechar o pedido?', [
      {
        text: 'Sim',
        onPress: () => {
          onPressClose();
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function onPressSaveHandler() {
    Alert.alert('Aviso!', 'Têm a certeza que pretende guardar o pedido?', [
      {
        text: 'Sim',
        onPress: () => {
          onPressSave();
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  return (
    <View style={styles.bottomContainer}>
      <Button
        onPress={onPressSaveHandler}
        text="GRAVAR"
        size="normal"
        iconName="save"
        position="left-screen"
      />
      <Button
        onPress={onPressCloseHandler}
        color="green"
        size="normal"
        iconName="lock-closed-sharp"
        position="normal"
      />
    </View>
  );
}

export default OrderListFooter;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopColor: COLORS.gray,
    borderTopWidth: 0.5,
  },
});
