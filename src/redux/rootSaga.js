import {all} from 'redux-saga/effects';
import {watcherSaveData} from './userDetails/saga';

export default function* rootSaga() {
  yield all([watcherSaveData()]);
}
