import React, {useState, useEffect, useCallback} from 'react';
import {Time} from 'react-native-gifted-chat';
import Colors from '../../../utils/Colors';
import {normalize} from '../../../utils/Dimensions';

export const renderTime = props => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: Colors.BLACK,
          fontSize: normalize(13),
        },
        right: {
          color: Colors.BROWNISHGREY,
          fontSize: normalize(13),
        },
      }}
    />
  );
};
