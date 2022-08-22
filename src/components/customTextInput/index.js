import {View, TextInput} from 'react-native';
import React, {forwardRef} from 'react';

const CustomText = forwardRef((props, ref) => {
  return (
    <View style={props.ContentContainerStyle}>
      <TextInput
        ref={ref}
        placeholder={props.placeholder}
        style={[props.TextStyle, props.customInputStyle]}
        keyboardType={props.keyBoardType}
        onChangeText={text => {
          props.setText(text);
        }}
        onKeyPress={props?.onKeyPressText}
        maxLength={parseInt(props.maxLength)}
        // autoFocus={true}
      />
    </View>
  );
});

export default CustomText;
