import React from 'react';
import {styles} from '../style';
import {InputToolbar} from 'react-native-gifted-chat';

export const renderInputToolbar = props => {
  return (
    <InputToolbar
      containerStyle={styles.inputToolbarContainerStyle}
      {...props}
    />
  );
};
