/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useReducer} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import {getRooms} from '../api/RoomsService';
import {Alert} from '../common/services/Alert';
import Loading from '../common/services/Loading';
import RoomItem from '../components/room-item/RoomItem';
import axios from 'axios';
import {INITIAL_STATE, roomReducer} from '../reducers/roomReducer';

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
  const [state, dispatch] = useReducer(roomReducer, INITIAL_STATE);

  useEffect(() => {
    const controller = new AbortController();

    fetchRooms(false, controller.signal);

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, []);

  // Fetch Rooms
  async function fetchRooms(isRefresh, signal) {
    if (isRefresh) {
      dispatch({type: 'START_FETCHING'});
    }
    Loading.start();

    try {
      const response = await getRooms({
        signal: signal,
      });

      dispatch({type: 'FETCH_ROOMS', payload: response.rooms});

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

      if (isRefresh) {
        dispatch({type: 'STOP_FETCHING'});
      }
      Loading.stop();
    }
  }

  // On Refresh Handler
  function onRefreshHandler() {
    fetchRooms(true);
  }

  return (
    <FlatList
      style={styles.list}
      data={state.rooms}
      onRefresh={onRefreshHandler}
      refreshing={state.isFetching}
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
