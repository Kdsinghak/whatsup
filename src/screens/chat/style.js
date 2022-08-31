import Colors from '../../utils/Colors';
import {StyleSheet} from 'react-native';
import {normalize} from '../../utils/Dimensions';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  dummyViewStyle: {
    height: getStatusBarHeight(),
    backgroundColor: Colors.ORCHAR,
    elevation: -1,
  },
  contentContainer: {flex: 1, backgroundColor: Colors.WHITE},
  container: {
    flex: 1,
    backgroundColor: Colors.ORCHAR,
  },
  sendButtonContainer: {
    overflow: 'hidden',
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  inputToolbarContainerStyle: {
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingVertical: normalize(5),
    marginHorizontal: normalize(15),
    bottom: normalize(-20),
  },
  androidSafeView: {
    elevation: -1,
    backgroundColor: Colors.WHITE,
    height: getStatusBarHeight() + 10,
  },
  typingStatusView: {
    width: normalize(80),
    alignItems: 'center',
    height: normalize(35),
    justifyContent: 'center',
    marginLeft: normalize(8),
    marginVertical: normalize(5),
    backgroundColor: 'transparent',
  },
  inputContainerView: {marginTop: normalize(53)},
  textColorStyle: {color: Colors.BLACK},
  messagesContainerStyle: {
    paddingTop: Platform.OS === 'ios' ? normalize(5) : normalize(24),
  },
});
