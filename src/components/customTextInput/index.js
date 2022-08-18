import {View, TextInput} from 'react-native';
import React from 'react';

export default function CustomText(props) {
  const {placeholder, TextStyle, keyBoardType, maxLength, setText} = props;
  return (
    <TextInput
      placeholder={placeholder}
      style={TextStyle}
      keyboardType={keyBoardType}
      maxLength={parseInt(maxLength)}
      onChangeText={text => {
        setText(text);
      }}
    />
  );
}
