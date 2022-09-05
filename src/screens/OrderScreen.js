/* eslint-env browser */
/* eslint no-undef: "error"*/
import React, {useEffect, useReducer, useRef} from 'react';
import {FlatList, BackHandler} from 'react-native';
import axios from 'axios';

import OrderContainer from '../components/order-container/OrderContainer';
import OrderListItem from '../components/order-list/OrderListItem';
import OrderListHeader from '../components/order-list/OrderListHeader';
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
import {orderReducer, INITIAL_STATE} from '../reducers/orderReducer';
import {ORDER_ACTION_TYPES} from '../actions/orderActionTypes';
import ProductsModalContainer from '../components/products-modal/ProductsModalContainer';

function OrderScreen({route, navigation}) {
  // Get route params
  const roomId = route.params?.roomId;
  const roomName = route.params?.roomName;
  const tableId = route.params?.tableId;
  const tableName = route.params?.tableName;

  // Set states
  const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE, initLazy);
  const updateParent = useRef(false);

  // Init reducer reset
  function initLazy() {
    return {
      orderId: null,
      orderLines: [],
      isAddModalVisible: false,
      isEditModalVisible: false,
      editProduct: {},
    };
  }

  // Register override android back handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    /* navigation.navigate({
      name: 'Tables',
      params: {refresh: true},
      merge: true,
    }); */
    /* console.log(updateParent.current);
    if (updateParent.current) {
      console.log('1');
      // Go back and refresh
      navigation.navigate({
        name: 'Tables',
        params: {refresh: true},
        merge: true,
      });
    } else {
      console.log('2');
      navigation.goBack();
    } */
    return true;
  };

  // Fetch Current Order
  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrder(dispatchOrder) {
      Loading.start();
      try {
        const response = await getOrder(roomId, tableId, {
          signal: controller.signal,
        });

        if (response.order) {
          dispatchOrder({
            type: ORDER_ACTION_TYPES.FETCH_ORDER,
            payload: response.order,
          });
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

    fetchOrder(dispatch);

    return () => {
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, [roomId, tableId]);

  // On open/close products add modal
  function onAddModalHandler(type) {
    if (type === 'open') {
      dispatch({type: ORDER_ACTION_TYPES.OPEN_ADD_MODAL});
    } else if (type === 'close') {
      dispatch({type: ORDER_ACTION_TYPES.CLOSE_ADD_MODAL});
    }
  }

  // On open/close products edit modal
  function onEditModalHandler(type, product) {
    if (type === 'open') {
      dispatch({type: ORDER_ACTION_TYPES.OPEN_EDIT_MODAL, payload: product});
    } else if (type === 'close') {
      dispatch({type: ORDER_ACTION_TYPES.CLOSE_EDIT_MODAL});
    }
  }

  // On add products from modal
  function onAddProductsHandler(productList) {
    dispatch({
      type: ORDER_ACTION_TYPES.INSERT_ORDER_LINE,
      payload: productList,
    });
  }

  // On edit product quantity
  function onEditProductPressHandler(editableProduct) {
    dispatch({
      type: ORDER_ACTION_TYPES.UPDATE_ORDER_LINE,
      payload: editableProduct,
    });
  }

  // On Submit Order
  function onSavePressHandler() {
    if (!roomId || !tableId) {
      Alert.warn('Aviso!', 'Sala ou mesa inválidas para pedido.');
      return;
    }

    if (state.orderLines.length === 0) {
      Alert.warn('Aviso!', 'Não existe produtos para adicionar ao pedido.');
      return;
    }

    // Force to update parent no on go back
    updateParent.current = true;

    if (state.orderId) {
      onUpdateOrder();
    } else {
      onInsertOrder();
    }
  }

  // Insert new Order
  const onInsertOrder = async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await insertOrder(
        {roomId: roomId, tableId: tableId, products: state.orderLines},
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

        dispatch({
          type: ORDER_ACTION_TYPES.FETCH_ORDER,
          payload: response.order,
        });
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

  // Update current Order
  const onUpdateOrder = async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await updateOrder(
        {
          orderId: state.orderId,
          roomId: roomId,
          tableId: tableId,
          products: state.orderLines,
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

        dispatch({
          type: ORDER_ACTION_TYPES.FETCH_ORDER,
          payload: response.order,
        });
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

  // Close Order
  const onCloseOrder = async () => {
    const controller = new AbortController();
    Loading.start();
    try {
      const response = await closeOrder(
        {
          orderId: state.orderId,
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

      // Go back and refresh
      navigation.navigate({
        name: 'Tables',
        params: {refresh: true},
        merge: true,
      });
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
        id={itemData.item.id}
        description={itemData.item.name}
        price={itemData.item.price}
        quantity={itemData.item.quantity}
        onItemPress={onEditModalHandler}
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
    <>
      <ProductsModalContainer
        isVisible={state.isAddModalVisible}
        onCloseModal={onAddModalHandler.bind(this, 'close')}
        onAddProductsPress={onAddProductsHandler}
      />
      <ProductEditModal
        currentEditProduct={state.editProduct}
        isVisible={state.isEditModalVisible}
        onCloseModal={onEditModalHandler.bind(this, 'close')}
        onEdit={onEditProductPressHandler}
      />
      <OrderContainer
        title={`${roomName} - ${tableName} :`}
        onPressOpenModal={onAddModalHandler.bind(this, 'open')}
        onSavePress={onSavePressHandler}
        onClosePress={onCloseOrder}>
        <FlatList
          data={state.orderLines}
          renderItem={renderProductToAddItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderListHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={renderEmptyList}
        />
      </OrderContainer>
    </>
  );
}

export default OrderScreen;
