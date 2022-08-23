import React from 'react';
import {Provider} from 'react-redux';
import AppRoutes from './src/routes';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}
