import React from 'react';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../utils/ScreenNames';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

const ChatListRender = ({name, chatImage, message, id}) => {
  console.log('1234567890--0987654321', id);
  const navigation = useNavigation();
  const handleNavigation = id => {
    console.log('23456789opo765432', id);
    navigation.navigate(ScreenNames.CHATROOM, {userID: id});
  };

  return (
    <TouchableOpacity
      style={styles.contentContainer}
      onPress={() => handleNavigation(id)}>
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
