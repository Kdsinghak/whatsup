import {StyleSheet} from 'react-native';
import Colors from '../../../utils/Colors';
import {normalize} from '../../../utils/Dimensions';

export const styles = StyleSheet.create({
  profileImageView: {
    alignItems: 'center',
    marginTop: normalize(10),
    paddingTop: normalize(20),
    borderColor: Colors.SILVER,
    borderTopWidth: normalize(1),
    borderBottomWidth: normalize(1),
    marginHorizontal: normalize(10),
  },

  profileImage: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(60),
  },
  iconStyleView: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'center',
  },
  iconStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: normalize(15),
    marginTop: normalize(20),
    borderBottomColor: Colors.SILVER,
    marginHorizontal: normalize(16),
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.BLACK,
    fontSize: normalize(15),
  },
  detailsTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(15),
    fontWeight: '400',
  },

  modalContentContainer: {
    height: normalize(130),
    justifyContent: 'center',
    paddingLeft: normalize(10),
    borderRadius: normalize(10),
    backgroundColor: Colors.WHITE,
    marginHorizontal: normalize(20),
  },
  nameTextStyle: {
    fontWeight: '500',
    fontSize: normalize(18),
  },

  labelTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(18),
    marginLeft: normalize(5),
  },
  modalCloseText: {
    flexDirection: 'row',
    marginTop: normalize(5),
    justifyContent: 'flex-end',
  },
  modalOptionTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(20),
    marginHorizontal: normalize(20),
  },
  ContentContainerStyle: {
    marginTop: normalize(20),
    marginLeft: normalize(7),
    marginRight: normalize(20),
    borderBottomWidth: normalize(2),
    borderBottomColor: Colors.GREEN,
  },
  editImageIcon: {height: normalize(25), width: normalize(25)},

  enablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    marginVertical: normalize(50),
    backgroundColor: Colors.GREEN,
    marginHorizontal: normalize(16),
  },
  disablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    backgroundColor: Colors.LIGHTGREEN,
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
  },

  labelStyle: {
    color: Colors.WHITE,
    fontSize: normalize(20),
  },
  editIconContainer: {
    borderRadius: normalize(7),
    bottom: normalize(25),
    left: normalize(40),
    width: normalize(30),
  },
  userDetailsContainer: {
    width: '75%',
    height: normalize(50),
  },
  userAboutContainer: {
    width: '87%',
    height: normalize(50),
  },
  madalView: {
    flex: 1,
    justifyContent: 'center',
  },
});
