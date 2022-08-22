import logger from 'redux-logger';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
export default store;
