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
    bottom: normalize(12),
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
    bottom: normalize(-12),
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingVertical: normalize(5),
    marginHorizontal: normalize(15),
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
    backgroundColor: Colors.GREY,
  },

  textColorStyle: {color: Colors.GREY, fontSize: normalize(13)},
  messagesContainerStyle: {
    paddingTop: Platform.OS === 'ios' ? normalize(5) : normalize(24),
  },
  dayWrapperStyle: {
    alignItems: 'center',
    padding: normalize(10),
    justifyContent: 'center',
    borderRadius: normalize(10),
    backgroundColor: Colors.WHITE,
  },
});
