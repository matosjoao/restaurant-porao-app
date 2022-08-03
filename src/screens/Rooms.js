import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import RoomItem from '../components/room-item/RoomItem';
import {ROOMS_DATA} from '../Config';

function renderRoomItem(itemData) {
  return <RoomItem {...itemData.item} />;
}

function Rooms() {
  return (
    <FlatList
      style={styles.list}
      data={ROOMS_DATA}
      renderItem={renderRoomItem}
      keyExtractor={item => item.id}
    />
  );
}

export default Rooms;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
});
