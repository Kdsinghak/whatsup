import React, {useState, useEffect, useCallback} from 'react';
import {
  Time,
  Send,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';

import Colors from '../../../utils/Colors';

export const renderBubble = props => {
  return (
    <Bubble
      {...props}
      tickStyle={{color: 'black'}}
      textStyle={{
        right: {
          color: Colors.BLACK,
        },
        left: {color: Colors.BLACK},
      }}
      wrapperStyle={{
        left: {
          backgroundColor: Colors.WHITE,
        },
        right: {
          backgroundColor: Colors.WHATSAPPGREEN,
        },
      }}
    />
  );
};
