import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import localImages from '../../../utils/localImages';
import colors from '../../../utils/colors';
import localStrings from '../../../utils/localStrings';
import PhoneText from '../../../components/text/onBoardingText/index';
export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={localImages.spalshImg} style={styles.imageStyle} />
      <View style={{marginTop: 'auto'}}>
        <Text style={{alignSelf: 'center'}}>{localStrings.sighinHeading}</Text>
        <Text style={{marginLeft: '6%', marginTop: 20}}>
          {localStrings.phoneNumber}
        </Text>
        <PhoneText
          TextStyle={styles.loginText}
          placeholder={localStrings.signTextPlaceHolder}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    backgroundColor: colors.WHITE,
  },
  imageStyle: {
    height: '70%',
    width: '100%',
    alignSelf: 'center',
  },
  loginText: {
    backgroundColor: 'red',
    borderColor: colors.GREY,
    borderWidth: 1,
    marginHorizontal: 30,
  },
});
