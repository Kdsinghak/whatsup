import React, {useEffect} from 'react';
import colors from '../../../utils/Colors';
import {View, StyleSheet, Image} from 'react-native';
import localImages from '../../../utils/LocalImages';
import ScreenNames from '../../../utils/ScreenNames';
import {useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ScreenNames.LOGIN);
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <Image source={localImages.spalshImg} style={styles.ImageStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  ImageStyle: {
    width: '80%',
    height: '80%',
  },
});
