import auth from '@react-native-firebase/auth';

export async function signInWithPhoneNumber(phoneNumber, sucess, fialure) {
  console.log('phoneNumber', phoneNumber);
  await auth()
    .signInWithPhoneNumber('+91' + phoneNumber)
    .then(res => console.log(res))
    .catch(err => {
      console.log(err);
    });
}
