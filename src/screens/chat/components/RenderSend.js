import React from 'react';
import {View, Image} from 'react-native';
import {
  Time,
  Send,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import LocalImages from '../../../utils/LocalImages';
import {styles} from '../style';
export const renderSend = props => {
  return (
    <Send {...props}>
      <View style={styles.sendButtonContainer}>
        <Image
          resizeMode="contain"
          source={LocalImages.send}
          style={styles.imageStyle}
        />
      </View>
    </Send>
  );
};
