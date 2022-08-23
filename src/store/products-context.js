import React, {createContext, useState} from 'react';

import {getProducts} from '../api/ProductsService';

export const ProductsContext = createContext({
  products: [],
  fetchProducts: () => {},
});

function ProductsContextProvider({children}) {
  const [products, setProducts] = useState([]);

  async function fetchProducts(config) {
    const response = await getProducts(null, null, config);
    if (response.products) {
      setProducts(response.products);
    }
  }

  const value = {
    products: products,
    fetchProducts: fetchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
