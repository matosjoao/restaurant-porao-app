/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert as AlertReact} from 'react-native';
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
import {
  closeOrder,
  getOrder,
  insertOrder,
  updateOrder,
} from '../api/OrderService';

function OrderScreenOld({route, navigation}) {
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
              quantity: parseInt(line.quantity, 10),
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

    const productListToUpdate = [...orderList];
    // For each product to add
    // Verify if already exist on the orderList
    // If exist sum quantity
    // If not push to orderList with orderId null
    list.forEach(listItem => {
      const productAlreadyExistIndex = orderList.findIndex(
        product => product.id === listItem.id,
      );
      if (productAlreadyExistIndex === -1) {
        productListToUpdate.push({...listItem, orderId: null});
      } else {
        const updatableProduct = productListToUpdate[productAlreadyExistIndex];
        updatableProduct.quantity += listItem.quantity;
        productListToUpdate[productAlreadyExistIndex] = updatableProduct;
      }
    });

    setOrderList(productListToUpdate);
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

  // On Submit Order
  function onSavePressHandler() {
    if (!roomId || !tableId) {
      Alert.warn('Aviso!', 'Sala ou mesa inválidas para pedido.');
      return;
    }

    if (orderList.length === 0) {
      Alert.warn('Aviso!', 'Não existe produtos para adicionar ao pedido.');
      return;
    }

    if (currentOrder) {
      onUpdateOrder();
    } else {
      onInsertOrder();
    }
  }

  // On Close Order
  function onClosePressHandler() {
    AlertReact.alert('Aviso!', 'Têm a certeza que pretende fechar o pedido?', [
      {
        text: 'Sim',
        onPress: () => {
          onCloseOrder();
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  const onInsertOrder = async () => {
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

        if (response.order.lines) {
          const newOrderLines = response.order.lines.map(orderLine => {
            return {
              id: orderLine.product_id,
              name: orderLine.product_name,
              orderId: orderLine.order_id,
              price: orderLine.product_price,
              quantity: orderLine.quantity,
            };
          });

          setOrderList(newOrderLines);
        }
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

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  };

  const onUpdateOrder = async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await updateOrder(
        {
          orderId: currentOrder.id,
          roomId: roomId,
          tableId: tableId,
          products: orderList,
        },
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

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  };

  const onCloseOrder = async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await closeOrder(
        {
          orderId: currentOrder.id,
          roomId: roomId,
          tableId: tableId,
        },
        {
          signal: controller.signal,
        },
      );

      Alert.success(
        'Sucesso!',
        response.message ? response.message : 'Operação concluída com sucesso.',
      );

      Loading.stop();

      navigation.goBack();
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
  };

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
          onPressClose={onClosePressHandler}
        />
      </View>
    </View>
  );
}

export default OrderScreenOld;

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
