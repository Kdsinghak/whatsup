import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import localImages from '../../../utils/LocalImages';
import colors from '../../../utils/Colors';
import localStrings from '../../../utils/LocalStrings';
import PhoneText from '../../../components/text/onBoardingText/index';
export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={localImages.spalshImg} style={styles.imageStyle} />
      <View style={styles.innerView}>
        <Text style={styles.signInHeadingStyle}>
          {localStrings.sighinHeading}
        </Text>
        <Text style={styles.PhoneNumberText}>{localStrings.phoneNumber}</Text>
        <View style={styles.TextInputView}>
          <Image source={localImages.phone} style={styles.phoneStyle} />

          <PhoneText
            TextStyle={styles.loginText}
            placeholder={localStrings.phoneNumber}
            keyBoardType="numeric"
            maxLength="20"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    backgroundColor: colors.WHITE,
  },
  innerView: {marginTop: 10},
  imageStyle: {
    height: '70%',
    width: '100%',
    alignSelf: 'center',
  },
  signInHeadingStyle: {
    alignSelf: 'center',
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  PhoneNumberText: {marginLeft: '6%', marginTop: 20, padding: 10},
  loginText: {
    marginHorizontal: '5%',
    width: 250,
    height: 30,
    marginBottom: 14,
  },
  phoneStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: '5%',
  },
  TextInputView: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    borderColor: colors.GREEN,
    borderWidth: 2,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
  },
});
