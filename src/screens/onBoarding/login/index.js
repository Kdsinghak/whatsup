import {styles} from './style';
import React, {useState, useRef} from 'react';
import localImages from '../../../utils/LocalImages';
import ScreenNames from '../../../utils/ScreenNames';
import Loader from '../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import localStrings from '../../../utils/LocalStrings';
import PhoneText from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton/CustomButton';
import {showToast, signInWithPhoneNumber} from '../../../utils/CommonFunctions';
import {View, Text, Image, Platform, KeyboardAvoidingView} from 'react-native';

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
            navigation.navigate(ScreenNames.OTP, response);
          }
        }
      },
      error => {
        showToast(error.message);
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
