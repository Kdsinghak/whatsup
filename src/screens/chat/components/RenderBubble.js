import React from 'react';
import Colors from '../../../utils/Colors';
import {Bubble} from 'react-native-gifted-chat';

export const renderBubble = props => {
  return (
    <Bubble
      {...props}
      tickStyle={{color: Colors.BLACK}}
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
