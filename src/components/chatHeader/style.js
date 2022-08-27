import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
    marginTop: Platform.OS === 'ios' ? normalize(40) : normalize(40),
  },
  container: {
    width: normalize(25),
    height: normalize(25),
  },
  smallImage: {
    height: '100%',
    width: '100%',
    tintColor: Colors.GREEN,
  },

  headingTextStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: normalize(30),
    marginLeft: normalize(13),
    lineHeight: normalize(35),
  },

  containerSearch: {
    height: normalize(20),
    width: normalize(25),
  },

  containerMail: {
    height: normalize(16),
    width: normalize(21),
  },

  containerProfile: {
    height: normalize(20),
    width: normalize(25),
  },

  rightIconsContainer: {
    height: normalize(50),
    width: normalize(80),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTextStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: normalize(16),
    lineHeight: normalize(25),
    color: Colors.BLACK,
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
