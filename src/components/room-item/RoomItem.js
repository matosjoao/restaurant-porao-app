import React from 'react';
import {View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import styles from './RoomItem.style';
import {COLORS} from '../../Config';

function RoomItem({id, name, availableTables, busyTables}) {
  const roomColor = busyTables === availableTables ? COLORS.red : COLORS.green;
  const roomIcon = busyTables === availableTables ? 'door-closed' : 'door-open';
  const roomStyle =
    busyTables === availableTables
      ? {borderLeftColor: COLORS.red}
      : {borderLeftColor: COLORS.green};
  const iconStyle =
    busyTables === availableTables
      ? {borderColor: COLORS.red}
      : {borderColor: COLORS.green};

  const navigation = useNavigation();

  function onPressHandler() {
    navigation.navigate('Tables', {roomId: id, roomName: name});
  }

  return (
    <View style={[styles.container, roomStyle]}>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => [{flex: 1}, pressed && styles.pressed]}>
        <View style={styles.infoContainer}>
          <View style={[styles.icon, iconStyle]}>
            <Icon name={roomIcon} color={roomColor} size={40} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{name.toUpperCase()}</Text>
            <Text
              style={
                styles.subTitle
              }>{`Mesas: ${busyTables} / ${availableTables}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default RoomItem;
