import React from 'react';
import {StatusBar} from 'react-native';

import AlertWrapper from './common/layout/alert/AlertWrapper';
import LoadingProvider from './common/layout/loading/LoadingProvider';
import ErrorBoundary from './common/layout/error-boundary/ErrorBoundary';
import Router from './Router';
import AuthContextProvider from './store/auth-context';

function App() {
  return (
    <ErrorBoundary>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <AuthContextProvider>
        <AlertWrapper>
          <LoadingProvider>
            <Router />
          </LoadingProvider>
        </AlertWrapper>
      </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
