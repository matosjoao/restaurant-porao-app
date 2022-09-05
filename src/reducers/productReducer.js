import {PRODUCT_ACTION_TYPES} from '../actions/productActionTypes';

export const INITIAL_STATE = {
  category: null,
  search: '',
  products: [],
  filteredProducts: [],
  productsToAdd: [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.PRODUCT_ADD_QUANTITY:
      let productsToAdd = state.productsToAdd;
      const updatableProductIndex = productsToAdd.findIndex(
        product => product.id === action.payload.id,
      );

      // Add first time
      if (updatableProductIndex === -1) {
        productsToAdd.push({...action.payload, quantity: 1});

        return {
          ...state,
          productsToAdd: productsToAdd,
        };

        // Update quantity existing product
      } else {
        const updatableProduct = productsToAdd[updatableProductIndex];

        let newQuantity = updatableProduct.quantity + 1;

        const updatedProduct = {
          ...updatableProduct,
          quantity: newQuantity,
        };

        productsToAdd[updatableProductIndex] = updatedProduct;

        return {
          ...state,
          productsToAdd: productsToAdd,
        };
      }

    case PRODUCT_ACTION_TYPES.PRODUCT_SUBTRACT_QUANTITY:
      let productsToAddEdit = state.productsToAdd;

      // Find product index
      const updatableProductEditIndex = productsToAddEdit.findIndex(
        product => product.id === action.payload.id,
      );

      if (updatableProductEditIndex === -1) {
        return state;
        // Update quantity existing product
      } else {
        const updatableProduct = productsToAddEdit[updatableProductEditIndex];

        let newQuantity = updatableProduct.quantity - 1;

        if (newQuantity <= 0) {
          return {
            ...state,
            productsToAdd: productsToAddEdit.filter(obj => {
              return obj.id !== action.payload.id;
            }),
          };
        } else {
          const updatedProduct = {
            ...updatableProduct,
            quantity: newQuantity,
          };

          productsToAddEdit[updatableProductEditIndex] = updatedProduct;

          return {
            ...state,
            productsToAdd: productsToAddEdit,
          };
        }
      }

    case PRODUCT_ACTION_TYPES.PRODUCT_UPDATE_CATEGORY:
      const productsList = state.products;
      if (action.payload === state.category) {
        return {
          ...state,
          search: '',
          category: null,
          filteredProducts: productsList,
        };
      } else {
        const filteredProductList = productsList.filter(product => {
          return product.product_type_id === action.payload;
        });

        return {
          ...state,
          search: '',
          category: action.payload,
          filteredProducts: filteredProductList,
        };
      }

    case PRODUCT_ACTION_TYPES.PRODUCT_SEARCH:
      const productsListSearch = state.products;
      let filteredProductList = productsListSearch;

      // Search by search value and category
      /*
      if (state.search === '') {
        if (state.category != null) {
          filteredProductList = productsListSearch.filter(product => {
            return product.product_type_id === action.payload;
          });
        }
      } else {
        filteredProductList = productsListSearch.filter(product => {
          return product.name
            .toLowerCase()
            .includes(state.search.toLowerCase());
        });
      }

      return {
        ...state,
        filteredProducts: filteredProductList,
      };
      */

      // Search only by search value
      if (state.search !== '') {
        filteredProductList = productsListSearch.filter(product => {
          return product.name
            .toLowerCase()
            .includes(state.search.toLowerCase());
        });
      }

      return {
        ...state,
        category: null,
        filteredProducts: filteredProductList,
      };

    case PRODUCT_ACTION_TYPES.PRODUCT_UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
