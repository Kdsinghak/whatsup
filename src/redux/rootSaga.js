import {all} from 'redux-saga/effects';
import {
  watcherDeleteData,
  watcherSaveData,
  watchergetAlluser,
  watcherRequestProfile,
} from './userDetails/saga';
export default function* rootSaga() {
  yield all([
    watcherSaveData(),
    watcherDeleteData(),
    watchergetAlluser(),
    watcherRequestProfile(),
  ]);
}
