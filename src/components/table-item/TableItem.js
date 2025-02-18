import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './TableItem.style';
import {COLORS} from '../../Config';

function TableItem({
  id,
  roomId,
  roomName,
  name,
  seats,
  hasRequest,
  addLastItem,
}) {
  const navigation = useNavigation();

  function onPressHandler() {
    navigation.navigate('Order', {
      roomId: roomId,
      roomName: roomName,
      tableId: id,
      tableName: name,
    });
  }

  const statusStyle = {backgroundColor: hasRequest ? COLORS.red : COLORS.green};

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={onPressHandler}
          style={({pressed}) => [{flex: 1}, pressed && styles.pressed]}>
          <View style={styles.content}>
            <Text style={styles.title}>{name.toUpperCase()}</Text>
            {seats && (
              <Text style={styles.subTitle}>{`Lugares: ${seats}`}</Text>
            )}
          </View>
          <View style={[styles.status, statusStyle]} />
        </Pressable>
      </View>
      {addLastItem && <View style={styles.containerEmpty} />}
    </>
  );
}

export default TableItem;
