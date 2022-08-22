import firestore from '@react-native-firebase/firestore';
export function getDataFromFirebase(uid, onsuccess, onFailure) {
  console.log('uid is ', uid);
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(res => {
      onsuccess(res);
    })
    .catch(error => {
      onFailure(error);
    });
}
