import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {normalize} from '../../utils/Dimensions';

const CustomButton = ({containerStyle, buttonLabel, labelStyle, onPress}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={labelStyle}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
