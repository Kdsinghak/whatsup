import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LocalImages from '../../utils/LocalImages';
import {normalize} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

import firestore from '@react-native-firebase/firestore';

const ChatRoomHeader = ({image, name, onBackPress, uid}) => {
  const [status, setStaus] = useState();

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(onchange => {
        let status = onchange.data().status;
        setStaus(status);
      });
  }, []);

  return (
    <View style={[styles.headerViewStyle]}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.backImageViewStyle}
        hitSlop={(10, 10, 10, 10)}>
        <Image source={LocalImages.backArrow} style={styles.imageStyle} />
      </TouchableOpacity>
      <View style={styles.userImageView}>
        <Image source={{uri: image}} style={styles.UserImageStyle} />
      </View>
      <View style={styles.userDetailsView}>
        <Text
          onPress={() => {}}
          numberOfLines={1}
          style={styles.userNameTextStyle}>
          {name}
        </Text>
        {status === 'online' && (
          <Text style={styles.userStatusTextStyle}>{status}</Text>
        )}
      </View>
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
    backgroundColor: Colors.WHITE,
    padding: normalize(7),
    borderBottomWidth: normalize(1),
    borderBottomColor: Colors.SILVER,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    tintColor: '#04e08b',
  },
  userImageView: {
    overflow: 'hidden',
    alignItems: 'center',
    width: normalize(45),
    height: normalize(45),
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
    fontSize: normalize(20),
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
    width: '50%',
    height: '50%',
    tintColor: '#04e08b',
  },
  rightOptionContainer: {
    flexDirection: 'row',
    width: normalize(100),
    justifyContent: 'space-around',
  },
  userDetailsView: {width: normalize(170), marginHorizontal: normalize(5)},
  userStatusTextStyle: {
    color: Colors.BROWNISHGREY,
    lineHeight: normalize(20),
  },
});
