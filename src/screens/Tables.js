import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HeaderTitle from '../components/header-title/HeaderTitle';

import TableItem from '../components/table-item/TableItem';
import {ROOMS_DATA, TABLES_DATA} from '../Config';

function Tables({route}) {
  const roomId = route.params?.roomId;
  const selectedRoom = ROOMS_DATA.find(room => {
    return room.id === roomId;
  });
  const tables = TABLES_DATA.filter(table => {
    return table.roomId === roomId;
  });
  const addLastEmptyItem = tables.length % 2 !== 0;

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
      <HeaderTitle>{selectedRoom.description}: </HeaderTitle>
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

export default Tables;

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
