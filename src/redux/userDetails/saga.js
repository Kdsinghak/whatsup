import {put, takeEvery, call} from 'redux-saga/effects';
import {verifyOTP} from '../../utils/CommonFunctions';
import {deleteData, saveData} from './action';

export function* asyncSaveData(action) {
  const {uid, otp, sucess, error} = action;

  const data = yield call(verifyOTP, uid, otp, sucess, error);
  let uidID = data.user._user.uid;
  yield put(saveData(uidID));
}

export function* asyncDeleteData() {
  yield put(deleteData());
}

export function* watcherSaveData() {
  yield takeEvery('CONFIRM_UID', asyncSaveData);
}

export function* watcherDeleteData() {
  yield takeEvery('REQUEST_DELETE_UID', asyncDeleteData);
}
