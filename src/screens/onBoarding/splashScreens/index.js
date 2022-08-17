import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import localImages from '../../../utils/LocalImages';
import colors from '../../../utils/Colors';
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={localImages.spalshImg} style={styles.ImageStyle} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageStyle: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
});
