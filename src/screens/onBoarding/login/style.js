import {StyleSheet} from 'react-native';
import colors from '../../../utils/Colors';
import {normalize} from '../../../utils/Dimensions';

export const styles = StyleSheet.create({
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
    backgroundColor: colors.GREEN,
    marginHorizontal: normalize(16),
  },
  disablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
    backgroundColor: colors.LIGHTGREEN,
  },

  labelStyle: {
    color: colors.WHITE,
    fontSize: normalize(20),
  },
});
