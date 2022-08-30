import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    padding: normalize(10),
  },
  userIconContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    width: normalize(60),
    height: normalize(60),
    justifyContent: 'center',
    borderRadius: normalize(30),
    backgroundColor: Colors.GREY,
  },
  smallImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: normalize(18),
  },
  userDetailsContainer: {
    padding: normalize(10),

    width: '70%',
  },
  messageDescriptionStyle: {
    color: Colors.GREY,
    fontSize: normalize(15),
    marginTop: normalize(5),
  },
});
