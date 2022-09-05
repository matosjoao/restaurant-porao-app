import {ORDER_ACTION_TYPES} from '../actions/orderActionTypes';

export const INITIAL_STATE = {
  orderId: null,
  orderLines: [],
  isAddModalVisible: false,
  isEditModalVisible: false,
  editProduct: {},
};

export const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTION_TYPES.FETCH_ORDER:
      const orderLines = action.payload.lines.map(line => {
        return {
          orderId: line.order_id,
          id: line.product_id,
          name: line.product_name,
          price: line.product_price,
          quantity: parseInt(line.quantity, 10),
        };
      });

      return {
        ...state,
        orderId: action.payload.id,
        orderLines: orderLines,
      };

    case ORDER_ACTION_TYPES.UPDATE_ORDER_LINE:
      const editableProduct = action.payload;
      let curOrderLines = state.orderLines;

      const updatableProductIndex = curOrderLines.findIndex(
        product => product.id === editableProduct.id,
      );

      if (updatableProductIndex === -1) {
        return {
          ...state,
          isEditModalVisible: false,
          editProduct: {},
        };
      } else {
        // Update quantity existing product
        if (editableProduct.quantity <= 0) {
          return {
            ...state,
            orderLines: curOrderLines.filter(obj => {
              return obj.id !== editableProduct.id;
            }),
            isEditModalVisible: false,
            editProduct: {},
          };
        } else {
          const updatableProduct = curOrderLines[updatableProductIndex];
          updatableProduct.quantity = editableProduct.quantity;
          const updatedProducts = [...curOrderLines];
          updatedProducts[updatableProductIndex] = updatableProduct;

          return {
            ...state,
            orderLines: updatedProducts,
            isEditModalVisible: false,
            editProduct: {},
          };
        }
      }

    case ORDER_ACTION_TYPES.INSERT_ORDER_LINE:
      const productList = action.payload;
      let productListToUpdate = state.orderLines;

      // For each product to add
      // Verify if already exist on the orderList
      // If exist sum quantity
      // If not push to orderList with orderId null
      productList.forEach(listItem => {
        const productAlreadyExistIndex = state.orderLines.findIndex(
          product => product.id === listItem.id,
        );
        if (productAlreadyExistIndex === -1) {
          productListToUpdate.push({...listItem, orderId: null});
        } else {
          const updatableProduct =
            productListToUpdate[productAlreadyExistIndex];
          updatableProduct.quantity += listItem.quantity;
          productListToUpdate[productAlreadyExistIndex] = updatableProduct;
        }
      });

      return {
        ...state,
        orderLines: productListToUpdate,
        isAddModalVisible: false,
      };

    case ORDER_ACTION_TYPES.OPEN_ADD_MODAL:
      return {
        ...state,
        isAddModalVisible: true,
      };

    case ORDER_ACTION_TYPES.CLOSE_ADD_MODAL:
      return {
        ...state,
        isAddModalVisible: false,
      };

    case ORDER_ACTION_TYPES.OPEN_EDIT_MODAL:
      return {
        ...state,
        isEditModalVisible: true,
        editProduct: action.payload,
      };

    case ORDER_ACTION_TYPES.CLOSE_EDIT_MODAL:
      return {
        ...state,
        isEditModalVisible: false,
        editProduct: {},
      };

    default:
      return state;
  }
};
