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
  confirmation
    .confirm(otp)
    .then(res => {
      successCallback(res);
    })
    .catch(err => {
      failureCallback(err);
    });
}

export function setDataInFirbase(uid, details) {
  console.log(details);
  firestore().collection('Users').doc(uid).set(details);
}
