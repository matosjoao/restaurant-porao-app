/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {getTables} from '../api/TablesService';
import {Alert} from '../common/services/Alert';
import Loading from '../common/services/Loading';
import HeaderTitle from '../components/header-title/HeaderTitle';
import TableItem from '../components/table-item/TableItem';
import axios from 'axios';

function TablesScreen({route}) {
  const roomId = route.params?.roomId;
  const roomName = route.params?.roomName;
  const [tables, setTables] = useState([]);
  const addLastEmptyItem = tables.length % 2 !== 0;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTables() {
      Loading.start();
      try {
        const response = await getTables(roomId, {
          signal: controller.signal,
        });

        setTables(response.tables);

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

    fetchTables();

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, [roomId]);

  function renderTableItem(itemData) {
    const isLastItem = itemData.index === tables.length - 1;
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
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
