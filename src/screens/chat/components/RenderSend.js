import React from 'react';
import {styles} from '../style';
import {View, Image} from 'react-native';
import {Send} from 'react-native-gifted-chat';
import LocalImages from '../../../utils/LocalImages';

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
