import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({
  disable,
  onPress,
  labelStyle,
  buttonLabel,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={containerStyle}
      onPress={onPress}>
      <Text style={labelStyle}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);
