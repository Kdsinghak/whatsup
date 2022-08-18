import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../../../utils/Colors';
import Colors from '../../../utils/Colors';
import React, {useCallback, useState} from 'react';
import {normalize} from '../../../utils/Dimensions';
import localImages from '../../../utils/LocalImages';
import localStrings from '../../../utils/LocalStrings';
import PhoneText from '../../../components/customTextInput';
import CustomButton from '../../../components/customButton/CustomButton';

function Login() {
  const [text, setText] = useState('');
  const [check, setCheck] = useState(false);

  const handleRemember = useCallback(() => {
    setCheck(!check);
  }, [check]);

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
          TextStyle={styles.loginText}
          placeholder={localStrings.phoneNumber}
          keyBoardType="numeric"
          maxLength="20"
          setText={setText}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.checkBoxView}
        onPress={handleRemember}>
        <Image
          source={check ? localImages.check : localImages.uncheck}
          style={styles.checkedImageStyle}
        />
        <Text style={styles.rememberTextStle}>{localStrings.remeberMe}</Text>
      </TouchableOpacity>
      <CustomButton
        containerStyle={styles.buttonContainerStyle}
        buttonLabel={localStrings.signIn}
        labelStyle={styles.labelStyle}
      />
      <Text style={styles.noAccountTextStyle}>
        {localStrings.noAccount}
        <Text onPress={() => {}} style={styles.signUpTextStyle}>
          {localStrings.signUp}
        </Text>
      </Text>
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
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  phoneNumberText: {
    marginLeft: '6%',
    marginTop: 20,
    padding: 10,
    opacity: 0.5,
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
    marginHorizontal: normalize(16),
    borderColor: colors.GREEN,
    borderWidth: normalize(2),
    borderRadius: normalize(30),
    height: normalize(50),
    alignItems: 'center',
  },
  checkedImageStyle: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.LIGHTGREEN,
  },
  checkBoxView: {
    height: normalize(20),
    width: normalize(100),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: normalize(30),
    marginTop: normalize(20),
  },
  rememberTextStle: {
    color: Colors.BLACK,
    marginLeft: normalize(7),
  },

  buttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    backgroundColor: Colors.GREEN,
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
  },

  labelStyle: {
    color: Colors.WHITE,
    fontSize: normalize(20),
  },
  noAccountTextStyle: {
    color: Colors.BLACK,
    alignSelf: 'center',
    marginTop: normalize(10),
  },
  signUpTextStyle: {
    color: Colors.GREEN,
  },
});
