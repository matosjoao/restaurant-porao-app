import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import RoomItem from '../components/room-item/RoomItem';
import {useFetch} from '../common/hooks/useFetch';

// Render Room List Item
function renderRoomItem(itemData) {
  return <RoomItem {...itemData.item} />;
}

// Render List Empty View
function renderEmptyList() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.text}>Sem salas</Text>
    </View>
  );
}

function RoomsScreen() {
  const {response, isLoading, refresh} = useFetch('rooms');
  const roomsList = response?.rooms ? response.rooms : [];

  return (
    <FlatList
      style={styles.list}
      data={roomsList}
      onRefresh={refresh}
      refreshing={isLoading}
      renderItem={renderRoomItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={renderEmptyList}
    />
  );
}

export default RoomsScreen;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    paddingVertical: 10,
  },
});
