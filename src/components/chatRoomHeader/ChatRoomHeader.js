import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LocalImages from '../../utils/LocalImages';
import {normalize} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const ChatRoomHeader = ({image, name, onBackPress}) => {
  return (
    <View style={[styles.headerViewStyle, {top: getStatusBarHeight()}]}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.backImageViewStyle}
        hitSlop={(10, 10, 10, 10)}>
        <Image source={LocalImages.backArrow} style={styles.imageStyle} />
      </TouchableOpacity>
      <View style={styles.userImageView}>
        <Image source={{uri: image}} style={styles.UserImageStyle} />
      </View>
      <Text
        onPress={() => {}}
        numberOfLines={1}
        style={styles.userNameTextStyle}>
        {name}
      </Text>
      <View style={styles.rightOptionContainer}>
        <TouchableOpacity style={styles.iconImageViewStyle} activeOpacity={0.8}>
          <Image style={styles.rightImageStyle} source={LocalImages.phone} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconImageViewStyle} activeOpacity={0.8}>
          <Image style={styles.rightImageStyle} source={LocalImages.more} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({
  headerViewStyle: {
    zIndex: 1,
    elevation: 1,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(55),
    backgroundColor: 'white',
    marginHorizontal: normalize(5),
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.SILVER,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  userImageView: {
    overflow: 'hidden',
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    justifyContent: 'center',
    marginLeft: normalize(10),
    borderRadius: normalize(25),
    backgroundColor: Colors.GREY,
  },

  backImageViewStyle: {
    width: normalize(27),
    height: normalize(30),
  },
  userNameTextStyle: {
    fontWeight: '500',
    color: Colors.BLACK,
    width: normalize(170),
    fontSize: normalize(20),
    marginLeft: normalize(5),
    lineHeight: normalize(50),
  },
  imageViewStyle: {
    backgroundColor: 'red',
    height: normalize(35),
    width: normalize(35),
  },
  iconImageViewStyle: {
    overflow: 'hidden',
    width: normalize(35),
    alignItems: 'center',
    height: normalize(35),
    justifyContent: 'center',
    borderRadius: normalize(6),
    backgroundColor: '#e1f4f2',
  },
  UserImageStyle: {
    height: '100%',
    width: '100%',
  },
  rightImageStyle: {
    width: '80%',
    height: '80%',
    tintColor: Colors.GREEN,
  },
  rightOptionContainer: {
    flexDirection: 'row',
    width: normalize(100),
    justifyContent: 'space-around',
  },
});
