import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';
import Colors from '../../../utils/Colors';
import {styles} from '../style';
export const renderFooter = props => {
  if (props.getUserTypingStatus) {
    return (
      <View style={styles.typingStatusView}>
        <Spinner type="ThreeBounce" size={50} color={Colors.GREY} />
      </View>
    );
  }
};
