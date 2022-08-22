import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export async function signInWithPhoneNumber(phoneNumber, success, fialure) {
  console.log('phoneNumber', phoneNumber);
  try {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    success(confirmation);
  } catch (error) {
    fialure(error);
  }
}

export function verifyOTP(confirmation, otp, successCallback, failureCallback) {
  return confirmation
    .confirm(otp)
    .then(res => {
      successCallback(res);
      return res;
    })
    .catch(err => {
      failureCallback(err);
    });
}

export function updateDataInFirbase(uid, details) {
  console.log(details);
  firestore()
    .collection('Users')
    .doc(uid)
    .update(details)
    .then(res => {
      console.log('update', res);
    })
    .catch(err => console.log(err));
}
