/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useReducer} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {getTables} from '../api/TablesService';
import {Alert} from '../common/services/Alert';
import Loading from '../common/services/Loading';
import HeaderTitle from '../components/header-title/HeaderTitle';
import TableItem from '../components/table-item/TableItem';
import axios from 'axios';
import {INITIAL_STATE, tableReducer} from '../reducers/tableReducer';

function TablesScreen({navigation, route}) {
  const roomId = route.params?.roomId;
  const roomName = route.params?.roomName;
  const [state, dispatch] = useReducer(tableReducer, INITIAL_STATE);
  const addLastEmptyItem = state.tables.length % 2 !== 0;

  /* useEffect(() => {
    if (route.params?.refresh) {
      const controller = new AbortController();

      fetchTables(false, controller.signal);

      return () => {
        // If the component is unmounted, cancel the request
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.refresh]); */

  useEffect(() => {
    const controller = new AbortController();

    fetchTables(false, controller.signal);

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Tables
  async function fetchTables(isRefresh, signal) {
    if (isRefresh) {
      dispatch({type: 'START_FETCHING'});
    }
    Loading.start();

    try {
      const response = await getTables(roomId, {
        signal: signal,
      });

      dispatch({type: 'FETCH_TABLES', payload: response.tables});

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
    fetchTables(true);
  }

  // Render table item
  function renderTableItem(itemData) {
    const isLastItem = itemData.index === state.tables.length - 1;
    return (
      <TableItem
        {...itemData.item}
        addLastItem={isLastItem && addLastEmptyItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      <HeaderTitle>{roomName}: </HeaderTitle>
      <FlatList
        style={styles.list}
        data={state.tables}
        renderItem={renderTableItem}
        keyExtractor={item => item.id}
        numColumns={2}
        onRefresh={onRefreshHandler}
        refreshing={state.isFetching}
      />
    </View>
  );
}

export default TablesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
});
