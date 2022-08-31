import {
  Time,
  Send,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {styles} from '../style';
import React from 'react';
export const renderInputToolbar = props => {
  return (
    <InputToolbar
      containerStyle={styles.inputToolbarContainerStyle}
      {...props}
    />
  );
};
