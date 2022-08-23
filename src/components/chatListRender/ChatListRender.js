import React from 'react';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const ChatListRender = ({name, chatImage, message}) => {
  return (
    <TouchableOpacity style={styles.contentContainer}>
      <View style={styles.userIconContainer}>
        <Image
          source={{uri: chatImage}}
          resizeMode="cover"
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

export default React.memo(ChatListRender);

const styles = StyleSheet.create({
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
  },
  messageDescriptionStyle: {
    color: Colors.GREY,
    fontSize: normalize(15),
    marginTop: normalize(5),
  },
});
