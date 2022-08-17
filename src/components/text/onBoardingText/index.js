import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';

export default function CustomText(props) {
  return (
    <TouchableOpacity>
      <Text></Text>
      <TextInput
        placeholder={props.placeholder}
        style={props.TextStyle}
        keyboardType={props.keyBoardType}
        maxLength={parseInt(props.maxLength)}
      />
    </TouchableOpacity>
  );
}
