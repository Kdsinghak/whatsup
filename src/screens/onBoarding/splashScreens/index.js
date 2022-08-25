import {styles} from './styles';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Image} from 'react-native';
import localImages from '../../../utils/LocalImages';
import ScreenNames from '../../../utils/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function SplashScreen() {
  const navigation = useNavigation();
  const {userId} = useSelector(store => store.userDetailsReducer);

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(user => {
      firestore().collection('Users').doc(userId).update({status: 'online'});
    });
    setTimeout(() => {
      if (userId) {
        navigation.replace(ScreenNames.HOME);
      } else {
        navigation.replace(ScreenNames.LOGIN);
      }
    }, 2000);
    return suscriber;
  });

  return (
    <View style={styles.container}>
      <Image source={localImages.spalshImg} style={styles.ImageStyle} />
    </View>
  );
}
