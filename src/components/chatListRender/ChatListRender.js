import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {normalize} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const ChatListRender = ({name, chatImage, message}) => {
  return (
    <TouchableOpacity style={styles.contentContainer}>
      <View style={styles.userIconContainer}>
        <Image
          source={chatImage}
          resizeMode="contain"
          style={styles.smallImage}
        />
      </View>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.messageDescriptionStyle}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListRender;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    padding: normalize(10),
  },
  userIconContainer: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREY,
    overflow: 'hidden',
  },
  smallImage: {
    width: '90%',
    height: '90%',
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: normalize(18),
  },
  userDetailsContainer: {
    padding: normalize(10),
  },
  messageDescriptionStyle: {
    color: Colors.GREY,
    fontSize: normalize(15),
    marginTop: normalize(5),
  },
});
