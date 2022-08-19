import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import LocalImages from '../../utils/LocalImages';

import {normalize} from '../../utils/Dimensions';
import LocalStrings from '../../utils/LocalStrings';
import Colors from '../../utils/Colors';

const CustomHeader = ({onPress}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backArrowView} onPress={onPress}>
        <Image source={LocalImages.backArrow} style={styles.backArrowImage} />
      </TouchableOpacity>
      <Text style={styles.headerTextStyle}>{LocalStrings.OTP_Header}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  backArrowImage: {
    height: '100%',
    width: '100%',
  },
  backArrowView: {
    height: normalize(20),
    width: normalize(20),
  },
  headerContainer: {
    flexDirection: 'row',
    height: normalize(50),
    marginTop: normalize(50),
    paddingLeft: normalize(10),
    alignItems: 'center',
  },
  headerTextStyle: {
    color: Colors.BLACK,
    marginLeft: normalize(10),
    fontWeight: '500',
    fontSize: normalize(16),
  },
});
