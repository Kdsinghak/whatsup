import React from 'react';
import {Provider} from 'react-redux';
import AppRoutes from './src/routes';
import {LogBox} from 'react-native';
import {persistor, store} from './src/redux/store';
import NetInfoHandler from './src/utils/netInfo/NetInfo';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
      <NetInfoHandler />
    </Provider>
  );
}
