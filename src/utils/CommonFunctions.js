import Colors from './Colors';
import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
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

export function updateDataInFirbase(uid, details, success, failure) {
  const {image} = details;

  const filename = image.substring(image.lastIndexOf('/') + 1);
  const uploadUri =
    Platform.OS === 'ios' ? image.replace('file://', '') : image;

  storage()
    .ref(`${uid}/${filename}`)
    .putFile(uploadUri)
    .then(res => {
      storage()
        .ref(`${uid}/${filename}`)
        .getDownloadURL()
        .then(res => {
          let image = res;
          firestore()
            .collection('Users')
            .doc(uid)
            .update({
              name: details.name,
              image: image,
            })
            .then(res => {
              success(res);
            })
            .catch(error => {
              failure(error);
            });
        });
    });
}

export async function getDatafromFirebase(uid, success) {
  try {
    const data = await firestore()
      .collection('Users')
      .where('id', '!=', uid)
      .get();
    const allUsers = data.docs.map(items => items.data());
    success(allUsers);
    return allUsers;
  } catch (error) {
    error(error);
  }
}

export const showToast = message => {
  Snackbar.show({
    text: message,
    backgroundColor: Colors.BLACK,
    duration: 1000,
    textColor: Colors.WHITE,
  });
};
