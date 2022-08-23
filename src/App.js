import React from 'react';
import {StatusBar} from 'react-native';

import AlertWrapper from './common/layout/alert/AlertWrapper';
import LoadingProvider from './common/layout/loading/LoadingProvider';
import ErrorBoundary from './common/layout/error-boundary/ErrorBoundary';
import Router from './Router';
import AuthContextProvider from './store/auth-context';
import ProductsContextProvider from './store/products-context';

function App() {
  return (
    <ErrorBoundary>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <AuthContextProvider>
        <AlertWrapper>
          <LoadingProvider>
            <ProductsContextProvider>
              <Router />
            </ProductsContextProvider>
          </LoadingProvider>
        </AlertWrapper>
      </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
