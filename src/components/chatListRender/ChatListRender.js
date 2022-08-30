import React, {useCallback} from 'react';
import {styles} from './style';
import ScreenNames from '../../utils/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import LocalImages from '../../utils/LocalImages';

const ChatListRender = ({name, chatImage, message, id, lastmessage}) => {
  const navigation = useNavigation();

  const handleNavigation = useCallback(
    id => {
      navigation.navigate(ScreenNames.CHATROOM, {
        userID: id,
        image: chatImage,
        name,
      });
    },
    [navigation],
  );

  return (
    <TouchableOpacity
      style={styles.contentContainer}
      onPress={() => handleNavigation(id)}>
      <View style={styles.userIconContainer}>
        <Image
          source={{uri: chatImage} ?? LocalImages.userIcon}
          resizeMode="cover"
          style={styles.smallImage}
        />
      </View>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text numberOfLines={1} style={styles.messageDescriptionStyle}>
          {lastmessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatListRender);
