import {styles} from './style';
import {useSelector} from 'react-redux';
import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import ScreenNames from '../../utils/ScreenNames';
import LocalImages from '../../utils/LocalImages';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatListRender = ({name, chatImage, id, lastmessage}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {profileDetails} = useSelector(store => store.userDetailsReducer);

  const handleNavigation = useCallback(
    id => {
      if (route.name === 'Chats') {
        navigation.navigate(ScreenNames.CHATROOM, {
          userID: id,
          image: chatImage,
          name,
        });
      } else {
        navigation.replace(ScreenNames.CHATROOM, {
          userID: id,
          image: chatImage,
          name,
        });
      }
    },
    [navigation],
  );

  return (
    <TouchableOpacity
      style={styles.contentContainer}
      onPress={() => handleNavigation(id)}>
      <View style={styles.userIconContainer}>
        <FastImage
          source={chatImage ? {uri: chatImage} : LocalImages.userIcon}
          resizeMode="cover"
          style={styles.smallImage}
        />
      </View>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userName}>{name}</Text>
        {lastmessage ? (
          <Text numberOfLines={1} style={styles.messageDescriptionStyle}>
            {lastmessage}
          </Text>
        ) : null}
        {route?.name !== 'Chats' ? (
          <Text style={[styles.messageDescriptionStyle, {fontStyle: 'italic'}]}>
            {profileDetails.about}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatListRender);
