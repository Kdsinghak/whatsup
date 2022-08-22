import {put, takeEvery, call} from 'redux-saga/effects';
import {verifyOTP} from '../../utils/CommonFunctions';
import {saveData} from './action';

export function* asyncSaveData(action) {
  const {uid, otp, sucess, error} = action;

  const data = yield call(verifyOTP, uid, otp, sucess, error);
  let uidID = data.user._user.uid;
  yield put(saveData(uidID));
}

export function* watcherSaveData() {
  yield takeEvery('CONFIRM_UID', asyncSaveData);
}
