import {combineReducers} from 'redux';
import {userDetailsReducer} from './userDetails/reducer';

const rootReducer = combineReducers({userDetailsReducer});

export default rootReducer;
