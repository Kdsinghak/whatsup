import {styles} from './styles';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Image, Animated} from 'react-native';
import localImages from '../../../utils/LocalImages';
import ScreenNames from '../../../utils/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {userId} = useSelector(store => store.userDetailsReducer);
  const splashAnimated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(splashAnimated, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (userId) {
        navigation.replace(ScreenNames.HOME);
      } else {
        navigation.replace(ScreenNames.LOGIN);
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={localImages.spalshImg}
        style={[
          styles.ImageStyle,
          {
            transform: [
              {
                scale: splashAnimated,
              },
            ],
          },
        ]}
      />
    </View>
  );
}
