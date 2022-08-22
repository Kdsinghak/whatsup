import {
  Text,
  View,
  Alert,
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../../utils/Colors';
import {normalize} from '../../../utils/Dimensions';
import LocalStrings from '../../../utils/LocalStrings';
import Loader from '../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {verifyOTP} from '../../../utils/CommonFunctions';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../../components/customTextInput';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import {useDispatch} from 'react-redux';
import {
  requestConfirmUid,
  requestForStoreData,
} from '../../../redux/userDetails/action';
const OTP = ({route}) => {
  const navigation = useNavigation();
  const [Mpin, setMpin] = useState('');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const textInput1 = useRef();
  const textInput2 = useRef();
  const textInput3 = useRef();
  const textInput4 = useRef();
  const textInput5 = useRef();
  const textInput6 = useRef();

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    textInput1?.current?.focus();
  }, []);

  /**
   * @Functions for handling  textinput
   */
  const handleTextInput1 = useCallback(
    text => {
      if (text.length != 0) {
        setMpin(text);
        textInput2?.current?.focus();
      }
    },
    [Mpin],
  );

  const handleTextInput2 = useCallback(
    text => {
      if (text.length != 0) {
        let str = Mpin.slice(0, 1) + text + Mpin?.slice(1);
        setMpin(str);
        textInput3?.current?.focus();
      }
    },
    [Mpin],
  );

  const handleTextInput3 = useCallback(
    text => {
      if (text.length != 0) {
        let str = Mpin.slice(0, 2) + text + Mpin?.slice(2);
        setMpin(str);
        textInput4?.current?.focus();
      }
    },
    [Mpin],
  );

  const handleTextInput4 = useCallback(
    text => {
      if (text.length != 0) {
        let str = Mpin.slice(0, 3) + text + Mpin.slice(3);
        setMpin(str);
        textInput5?.current?.focus();
      }
    },
    [Mpin],
  );
  const handleTextInput5 = useCallback(
    text => {
      if (text.length != 0) {
        let str = Mpin.slice(0, 4) + text + Mpin.slice(4);
        setMpin(str);
        textInput6?.current?.focus();
      }
    },
    [Mpin],
  );

  const handleTextInput6 = useCallback(
    text => {
      if (text.length != 0) {
        let str = Mpin.slice(0, 5) + text + Mpin.slice(5);
        setMpin(str);
        Keyboard.dismiss();
      }
    },
    [Mpin],
  );

  /**
   * @functions to handle backpress
   * @param event
   */
  const handleKeyPress1 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().

    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[0]) {
        setMpin(Mpin.slice(0, 0) + Mpin.slice(1));
      }
    }
  };

  const handleKeyPress2 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().
    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[1]) {
        let str = Mpin.slice(0, 1) + Mpin.slice(2);
        setMpin(str);
        textInput1?.current?.focus();
      }
    }
  };

  const handleKeyPress3 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().
    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[2]) {
        let str = Mpin.slice(0, 2) + Mpin.slice(3);
        setMpin(str);
        textInput2?.current?.focus();
      }
    }
  };

  const handleKeyPress4 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().
    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[3]) {
        let str = Mpin.slice(0, 3) + Mpin.slice(4);
        setMpin(str);
        textInput3?.current?.focus();
      }
    }
  };

  const handleKeyPress5 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().
    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[3]) {
        let str = Mpin.slice(0, 4) + Mpin.slice(5);
        setMpin(str);
        textInput4?.current?.focus();
      }
    }
  };

  const handleKeyPress6 = event => {
    event.persist(); //to keep the original synthetic event around, we use event.persist().
    if (event.nativeEvent.key === 'Backspace') {
      if (Mpin[3]) {
        let str = Mpin.slice(0, 5) + Mpin.slice(6);
        setMpin(str);
        textInput5?.current?.focus();
      }
    }
  };

  const handleResendOTP = () => {};

  const handleVerifyOTP = () => {
    setLoader(true);
    dispatch(
      requestConfirmUid(
        route.params,
        Mpin,
        response => {
          if (response) {
            const {_authResult} = response?.user?._auth;
            if (_authResult) {
              setLoader(false);
              let uid = response.user._user.uid;
              let phone = response.user._user.phoneNumber;
              firestore().collection('Users').doc(uid).set({
                name: '',
                about: '',
                number: phone,
                image: 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
              });
              navigation.navigate('Profile', {response});
            }
          }
        },
        error => {
          Alert.alert(error.message);
          setLoader(false);
        },
      ),
    );
    // verifyOTP(
    //   route.params,
    //   Mpin,
    //   response => {
    //     if (response) {
    //       const {_authResult} = response?.user?._auth;
    //       if (_authResult) {
    //         setLoader(false);
    //         console.log('verifieddd', response);
    //         let uid = response.user._user.uid;
    //         let phone = response.user._user.phoneNumber;
    //         dispatch(requestForStoreData(uid));
    //         firestore().collection('Users').doc(uid).set({
    //           name: '',
    //           about: '',
    //           number: phone,
    //           image: 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
    //         });
    //         navigation.navigate('Profile', {response});
    //       }
    //     }
    //   },
    //   error => {
    //     Alert.alert(error.message);
    //     setLoader(false);
    //   },
    // );
  };

  return (
    <>
      <CustomHeader
        onPress={handleBack}
        headerTitle={LocalStrings.OTP_Header}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.codeSentTextStyle}>{LocalStrings.code_Sent}</Text>

        <View style={styles.inputcontainer}>
          <CustomTextInput
            maxLength={1}
            ref={textInput1}
            keyBoardType={'numeric'}
            setText={handleTextInput1}
            onKeyPressText={handleKeyPress1}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
          <CustomTextInput
            maxLength={1}
            ref={textInput2}
            keyBoardType={'number-pad'}
            setText={handleTextInput2}
            onKeyPressText={handleKeyPress2}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
          <CustomTextInput
            maxLength={1}
            ref={textInput3}
            keyBoardType={'numeric'}
            setText={handleTextInput3}
            onKeyPressText={handleKeyPress3}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
          <CustomTextInput
            maxLength={1}
            ref={textInput4}
            keyBoardType={'numeric'}
            setText={handleTextInput4}
            onKeyPressText={handleKeyPress4}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
          <CustomTextInput
            maxLength={1}
            ref={textInput5}
            keyBoardType={'numeric'}
            setText={handleTextInput5}
            onKeyPressText={handleKeyPress5}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
          <CustomTextInput
            maxLength={1}
            ref={textInput6}
            keyBoardType={'numeric'}
            setText={handleTextInput6}
            onKeyPressText={handleKeyPress6}
            customInputStyle={styles.customInputStyle}
            ContentContainerStyle={styles.contentContainerStyle}
          />
        </View>

        <Text onPress={handleResendOTP} style={styles.sendLinkTextStyle}>
          {'Resend Code'}
        </Text>
      </KeyboardAvoidingView>

      <CustomButton
        onPress={handleVerifyOTP}
        labelStyle={styles.labelStyle}
        buttonLabel={LocalStrings.Verify}
        containerStyle={styles.buttonContainerStyle}
      />
      {loader && <Loader />}
    </>
  );
};

export default React.memo(OTP);

const styles = StyleSheet.create({
  customInputStyle: {
    width: normalize(30),
    height: normalize(30),
    textAlign: 'center',
    fontSize: normalize(20),
  },
  contentContainerStyle: {
    flexDirection: 'row',
    width: normalize(45),
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
    borderColor: Colors.LIGHTGREEN,
    borderWidth: normalize(1),
    borderRadius: normalize(10),
  },
  inputcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: normalize(16),
    marginTop: normalize(30),
  },
  codeSentTextStyle: {
    alignSelf: 'center',
    marginTop: normalize(100),
    color: Colors.BLACK,
  },

  buttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    backgroundColor: Colors.GREEN,
    marginTop: 'auto',
    marginBottom: normalize(100),
    marginHorizontal: normalize(16),
  },
  labelStyle: {
    color: Colors.WHITE,
    fontSize: normalize(20),
  },
  sendLinkTextStyle: {
    color: Colors.BLACK,
    textAlign: 'center',
    marginTop: normalize(100),
  },
});
