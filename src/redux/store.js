import logger from 'redux-logger';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, legacy_createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetailsReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
