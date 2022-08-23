import {all} from 'redux-saga/effects';
import {watcherDeleteData, watcherSaveData} from './userDetails/saga';

export default function* rootSaga() {
  yield all([watcherSaveData(), watcherDeleteData()]);
}
