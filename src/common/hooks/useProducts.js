import {useContext} from 'react';
import {ProductsContext} from '../../store/products-context';

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within ProductsContext');
  }

  return context;
};

export default useProducts;
