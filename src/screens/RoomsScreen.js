/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import {getRooms} from '../api/RoomsService';
import {Alert} from '../common/services/Alert';
import Loading from '../common/services/Loading';
import RoomItem from '../components/room-item/RoomItem';
import axios from 'axios';

function renderRoomItem(itemData) {
  return <RoomItem {...itemData.item} />;
}

function RoomsScreen() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRooms() {
      Loading.start();
      try {
        const response = await getRooms({
          signal: controller.signal,
        });

        setRooms(response.rooms);

        Loading.stop();
      } catch (error) {
        if (!axios.isCancel(error)) {
          Alert.error(
            'Ocorreu um erro',
            'Por favor contacte o administrador.\n' +
              '[' +
              error.response?.data?.message +
              ']',
          );
        }
        Loading.stop();
      }
    }

    fetchRooms();

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, []);

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Sem salas</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={rooms}
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
