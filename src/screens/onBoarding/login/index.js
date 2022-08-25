import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../../../utils/Colors';
import Colors from '../../../utils/Colors';
import React, {useState, useRef} from 'react';
import {normalize} from '../../../utils/Dimensions';
import ScreenNames from '../../../utils/ScreenNames';
import localImages from '../../../utils/LocalImages';
import localStrings from '../../../utils/LocalStrings';
import Loader from '../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import PhoneText from '../../../components/customTextInput';
import {showToast, signInWithPhoneNumber} from '../../../utils/CommonFunctions';
import CustomButton from '../../../components/customButton/CustomButton';

function Login() {
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const textInput1 = useRef();

  const handleSendOTP = () => {
    setLoader(true);
    signInWithPhoneNumber(
      text,
      response => {
        if (response) {
          const {_authResult} = response._auth;
          if (_authResult) {
            setLoader(false);
            console.log(_authResult);
            navigation.navigate(ScreenNames.OTP, response);
          }
        }
      },
      error => {
        console.log('errorr', error);
        showToast('Too many request, Try again later');
        setLoader(false);
      },
    );
  };

  const handleDisable = () => {
    if (text.length < 10 || text.length >= 11) return true;
    else return false;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={localImages.spalshImg} style={styles.imageStyle} />
      <Text style={styles.signInHeadingStyle}>
        {localStrings.sighinHeading}
      </Text>
      <Text style={styles.phoneNumberText}>{localStrings.phoneNumber}</Text>
      <View style={styles.TextInputView}>
        <Image source={localImages.phone} style={styles.phoneStyle} />

        <PhoneText
          ref={textInput1}
          TextStyle={styles.loginText}
          placeholder={localStrings.phoneNumber}
          keyBoardType="numeric"
          maxLength="20"
          setText={setText}
        />
      </View>
      <CustomButton
        disable={handleDisable()}
        onPress={handleSendOTP}
        containerStyle={
          handleDisable()
            ? styles.disablebuttonContainerStyle
            : styles.enablebuttonContainerStyle
        }
        buttonLabel={localStrings.signIn}
        labelStyle={styles.labelStyle}
      />
      {loader && <Loader />}
    </KeyboardAvoidingView>
  );
}

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  imageStyle: {
    height: '60%',
    width: '100%',
    alignSelf: 'center',
  },
  signInHeadingStyle: {
    alignSelf: 'center',
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: normalize(18),
  },
  phoneNumberText: {
    opacity: 0.5,
    padding: 10,
    marginTop: 20,
    marginLeft: '6%',
    fontWeight: 'bold',
  },
  loginText: {
    marginHorizontal: '5%',
    width: normalize(250),
    height: normalize(40),
    fontSize: normalize(18),
  },
  phoneStyle: {
    height: normalize(18),
    width: normalize(18),
    marginLeft: normalize(15),
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    borderColor: colors.GREEN,
    borderWidth: normalize(2),
    borderRadius: normalize(30),
    marginHorizontal: normalize(16),
  },

  enablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    marginTop: normalize(20),
    borderRadius: normalize(30),
    backgroundColor: Colors.GREEN,
    marginHorizontal: normalize(16),
  },
  disablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
    backgroundColor: Colors.LIGHTGREEN,
  },

  labelStyle: {
    color: Colors.WHITE,
    fontSize: normalize(20),
  },
});
