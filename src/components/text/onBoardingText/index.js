import {View, TextInput} from 'react-native';
import React from 'react';

export default function CustomText(props) {
  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        style={props.TextStyle}
        keyboardType={props.keyBoardType}
        maxLength={parseInt(props.maxLength)}
      />
    </View>
  );
}
