import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import HeaderTitle from '../components/header-title/HeaderTitle';
import IconButton from '../components/icon-button/IconButton';
import ProductsModal from '../components/products-modal/ProductsModal';
import OrderListItem from '../components/order-list/OrderListItem';
import {ROOMS_DATA, TABLES_DATA} from '../Config';
import OrderListHeader from '../components/order-list/OrderListHeader';
import OrderListFooter from '../components/order-list/OrderListFooter';
import OrderListEmpty from '../components/order-list/OrderListEmpty';
import ProductEditModal from '../components/products-modal/ProductEditModal';

function Order({route}) {
  const roomId = route.params?.roomId;
  const tableId = route.params?.tableId;

  const selectedRoom = ROOMS_DATA.find(room => {
    return room.id === roomId;
  });
  const selectedTable = TABLES_DATA.find(table => {
    return table.id === tableId;
  });

  const [currentEditProduct, setCurrentEditProduct] = useState({});
  const [isProductsModalVisible, setIsProductsModalVisible] = useState(false);
  const [isProductEditModalVisible, setIsProductEditModalVisible] =
    useState(false);
  const [orderList, setOrderList] = useState([]);

  function onAddPressHandler(list) {
    setIsProductsModalVisible(false);
    setOrderList(currentList => {
      return [...currentList, ...list];
    });
  }

  function onEditPressHandler(editableProduct) {
    setIsProductEditModalVisible(false);

    const updatableProductIndex = orderList.findIndex(
      product => product.productId === editableProduct.productId,
    );

    if (updatableProductIndex === -1) {
      return;
    } else {
      // Update quantity existing product
      if (editableProduct.quantity <= 0) {
        setOrderList(current =>
          current.filter(obj => {
            return obj.productId !== editableProduct.productId;
          }),
        );
      } else {
        const updatableProduct = orderList[updatableProductIndex];
        updatableProduct.quantity = editableProduct.quantity;
        const updatedProducts = [...orderList];
        updatedProducts[updatableProductIndex] = updatableProduct;
        setOrderList(updatedProducts);
      }
    }

    setCurrentEditProduct(false);
  }

  function orderListItemClickHandler(product) {
    setCurrentEditProduct(product);
    setIsProductEditModalVisible(true);
  }

  function renderProductToAddItem(itemData) {
    return (
      <OrderListItem
        productId={itemData.item.productId}
        description={itemData.item.description}
        price={itemData.item.price}
        quantity={itemData.item.quantity}
        onItemPress={orderListItemClickHandler}
      />
    );
  }

  function renderListHeader() {
    return <OrderListHeader />;
  }

  function renderEmptyList() {
    return <OrderListEmpty />;
  }

  return (
    <View style={styles.container}>
      <ProductsModal
        isVisible={isProductsModalVisible}
        onCloseModal={() => {
          setIsProductsModalVisible(false);
        }}
        onAdd={onAddPressHandler}
      />
      <ProductEditModal
        currentEditProduct={currentEditProduct}
        isVisible={isProductEditModalVisible}
        onCloseModal={() => {
          setIsProductEditModalVisible(false);
        }}
        onEdit={onEditPressHandler}
      />
      <View>
        <HeaderTitle>
          {selectedRoom.description} - {selectedTable.description} :
        </HeaderTitle>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="add-circle"
            color="green"
            size={50}
            onPress={() => {
              setIsProductsModalVisible(true);
            }}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={orderList}
            renderItem={renderProductToAddItem}
            keyExtractor={item => `_${item.productId}`}
            ListHeaderComponent={renderListHeader}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={renderEmptyList}
          />
        </View>
        <OrderListFooter
          onPressSave={() => {
            console.log(orderList);
          }}
          onPressPrint={() => {}}
        />
      </View>
    </View>
  );
}

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
  list: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 10,
  },
});
