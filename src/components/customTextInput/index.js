import React, {forwardRef} from 'react';
import {View, TextInput} from 'react-native';

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
        autoCorrect={false}
        autoCapitalize={false}
        onKeyPress={props?.onKeyPressText}
        maxLength={parseInt(props.maxLength)}
      />
    </View>
  );
});

export default React.memo(CustomText);
