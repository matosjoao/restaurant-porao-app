/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import axios from 'axios';

import HeaderTitle from '../components/header-title/HeaderTitle';
import IconButton from '../components/icon-button/IconButton';
import ProductsModal from '../components/products-modal/ProductsModal';
import OrderListItem from '../components/order-list/OrderListItem';
import OrderListHeader from '../components/order-list/OrderListHeader';
import OrderListFooter from '../components/order-list/OrderListFooter';
import OrderListEmpty from '../components/order-list/OrderListEmpty';
import ProductEditModal from '../components/products-modal/ProductEditModal';
import Loading from '../common/services/Loading';
import {Alert} from '../common/services/Alert';
import {getOrder, insertOrder} from '../api/OrderService';

function OrderScreen({route}) {
  // Get route params
  const roomId = route.params?.roomId;
  const roomName = route.params?.roomName;
  const tableId = route.params?.tableId;
  const tableName = route.params?.tableName;

  // Set states
  const [currentEditProduct, setCurrentEditProduct] = useState({});
  const [isProductsModalVisible, setIsProductsModalVisible] = useState(false);
  const [isProductEditModalVisible, setIsProductEditModalVisible] =
    useState(false);
  const [orderList, setOrderList] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();

  // Fetch Current Order
  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrder() {
      Loading.start();
      try {
        const response = await getOrder(roomId, tableId, {
          signal: controller.signal,
        });
        if (response.order) {
          setCurrentOrder(response.order);
          const orderLines = response.order.lines.map(line => {
            return {
              orderId: line.order_id,
              id: line.product_id,
              name: line.product_name,
              price: line.product_price,
              quantity: parseInt(line.quantity),
            };
          });
          setOrderList(orderLines);
        }

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

    fetchOrder();

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, [roomId, tableId]);

  // On add products from modal
  function onAddProductsHandler(list) {
    setIsProductsModalVisible(false);

    console.log(list);

    //TODO:: Melhorar validar orderId productId e quantity
    /* setOrderList(currentList => {
      return [...currentList, ...list];
    }); */
  }

  // On edit product quantity
  function onEditProductPressHandler(editableProduct) {
    setIsProductEditModalVisible(false);

    const updatableProductIndex = orderList.findIndex(
      product => product.id === editableProduct.productId,
    );

    if (updatableProductIndex === -1) {
      return;
    } else {
      // Update quantity existing product
      if (editableProduct.quantity <= 0) {
        setOrderList(current =>
          current.filter(obj => {
            return obj.id !== editableProduct.productId;
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

  // On product edit click handler
  function orderListItemClickHandler(product) {
    setCurrentEditProduct(product);
    setIsProductEditModalVisible(true);
  }

  // On Submit
  function onSavePressHandler() {
    if (!roomId || !tableId) {
      Alert.warn('Aviso!', 'Sala ou mesa inválidas para pedido.');
      return;
    }

    //console.log(orderList);

    if (currentOrder) {
      console.log('UPDATE');
    } else {
      if (orderList.length === 0) {
        Alert.warn('Aviso!', 'Não existe produtos para adicionar ao pedido.');
        return;
      }
      onInsertOrder();
    }
  }

  const onInsertOrder = useCallback(async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await insertOrder(
        {roomId: roomId, tableId: tableId, products: orderList},
        {
          signal: controller.signal,
        },
      );

      if (response.order) {
        Alert.success(
          'Sucesso!',
          response.message
            ? response.message
            : 'Operação concluída com sucesso.',
        );

        setCurrentOrder(response.order);

        //TODO:: Set up Order Lines
      }
      console.log(response);

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

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, [orderList, roomId, tableId]);

  // Render List Item
  function renderProductToAddItem(itemData) {
    return (
      <OrderListItem
        productId={itemData.item.id}
        description={itemData.item.name}
        price={itemData.item.price}
        quantity={itemData.item.quantity}
        onItemPress={orderListItemClickHandler}
      />
    );
  }

  // Render List Header
  function renderListHeader() {
    return <OrderListHeader />;
  }

  // Render List Empty
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
        onAddProducts={onAddProductsHandler}
      />
      <ProductEditModal
        currentEditProduct={currentEditProduct}
        isVisible={isProductEditModalVisible}
        onCloseModal={() => {
          setIsProductEditModalVisible(false);
        }}
        onEdit={onEditProductPressHandler}
      />
      <View>
        <HeaderTitle>
          {roomName} - {tableName} :
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
            keyExtractor={item => `_${item.id}`}
            ListHeaderComponent={renderListHeader}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={renderEmptyList}
          />
        </View>
        <OrderListFooter
          onPressSave={onSavePressHandler}
          onPressPrint={() => {}}
        />
      </View>
    </View>
  );
}

export default OrderScreen;

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
