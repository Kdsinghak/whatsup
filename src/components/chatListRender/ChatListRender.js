import React from 'react';
import {styles} from './style';
import ScreenNames from '../../utils/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Image, View, Text} from 'react-native';

const ChatListRender = ({name, chatImage, message, id}) => {
  const navigation = useNavigation();

  const handleNavigation = id => {
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
