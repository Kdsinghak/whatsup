import {StyleSheet} from 'react-native';
import Colors from '../../../utils/Colors';
import {normalize} from '../../../utils/Dimensions';

export const styles = StyleSheet.create({
  customInputStyle: {
    width: normalize(30),
    height: normalize(40),
    textAlign: 'center',
    fontSize: normalize(17),
  },
  contentContainerStyle: {
    flexDirection: 'row',
    width: normalize(45),
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderRadius: normalize(10),
    borderColor: Colors.LIGHTGREEN,
  },
  inputcontainer: {
    flexDirection: 'row',
    marginTop: normalize(30),
    justifyContent: 'space-around',
    marginHorizontal: normalize(16),
  },
  codeSentTextStyle: {
    alignSelf: 'center',
    color: Colors.BLACK,
    marginTop: normalize(100),
  },

  buttonContainerStyle: {
    marginTop: '45%',
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    marginBottom: normalize(100),
    backgroundColor: Colors.GREEN,
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
