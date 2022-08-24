import React, {createContext, useState} from 'react';

import {getCategories} from '../api/CategoriesService';
import {getProducts} from '../api/ProductsService';

export const ProductsContext = createContext({
  products: [],
  productsTypes: [],
  fetchProducts: () => {},
  fetchProductsTypes: () => {},
});

function ProductsContextProvider({children}) {
  const [products, setProducts] = useState([]);
  const [productsTypes, setProductsTypes] = useState([]);

  async function fetchProducts(config) {
    const response = await getProducts(null, null, config);
    if (response.products) {
      setProducts(response.products);
    }
  }

  async function fetchProductsTypes(config) {
    const response = await getCategories(null, null, config);
    if (response.products_types) {
      setProductsTypes(response.products_types);
    }
  }

  const value = {
    products: products,
    productsTypes: productsTypes,
    fetchProducts: fetchProducts,
    fetchProductsTypes: fetchProductsTypes,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
