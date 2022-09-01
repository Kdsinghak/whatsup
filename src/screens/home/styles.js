import {StyleSheet} from 'react-native';
import {normalize} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  itemSeparatorStyle: {
    height: 1,
    width: '95%',
    opacity: 0.3,
    alignSelf: 'center',
    backgroundColor: Colors.BLACK,
  },
  plusButtonContainer: {
    height: normalize(60),
    width: normalize(60),
    position: 'absolute',
    bottom: normalize(80),
    right: normalize(20),
  },
  iconStyle: {
    height: '100%',
    width: '100%',
  },
  backgroundContentContainer: {
    height: normalize(200),
    width: normalize(200),
    marginTop: normalize(80),
    alignSelf: 'center',
  },
  buttonViewStyle: {
    height: normalize(70),
    borderRadius: normalize(50),
    backgroundColor: Colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(40),
  },
  labelStyle: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: normalize(20),
  },
  noChatTextStyle: {
    alignSelf: 'center',
    color: Colors.GREEN,
    fontWeight: 'bold',
    fontSize: normalize(25),
    marginVertical: normalize(10),
  },
});
