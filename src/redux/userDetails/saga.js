import {put, takeEvery, call} from 'redux-saga/effects';
import {deleteData, saveAllUserData, saveData, SaveProfile} from './action';
import {getDatafromFirebase, verifyOTP} from '../../utils/CommonFunctions';

export function* asyncSaveData(action) {
  const {uid, otp, sucess, error} = action;
  const data = yield call(verifyOTP, uid, otp, sucess, error);

  let uidID = data.user._user.uid;
  yield put(saveData(uidID));
}

export function* asyncGetAllUser(action) {
  const {uid, success, error} = action;

  const data = yield call(getDatafromFirebase, uid, success);

  yield put(saveAllUserData(data));
}

export function* asyncDeleteData() {
  yield put(deleteData());
}

export function* ayncSaveProfile(action) {
  yield put(SaveProfile(action.payload));
}

export function* watcherSaveData() {
  yield takeEvery('CONFIRM_UID', asyncSaveData);
}

export function* watcherDeleteData() {
  yield takeEvery('REQUEST_DELETE_UID', asyncDeleteData);
}

export function* watchergetAlluser() {
  yield takeEvery('REQUEST_ALL_USER', asyncGetAllUser);
}

export function* watcherRequestProfile() {
  yield takeEvery('REQUEST_SAVE_PROFILE', ayncSaveProfile);
}
