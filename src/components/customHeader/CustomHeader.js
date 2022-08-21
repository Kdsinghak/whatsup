import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import LocalImages from '../../utils/LocalImages';

import {normalize} from '../../utils/Dimensions';

import Colors from '../../utils/Colors';

const CustomHeader = ({onPress, headerTitle, image}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerView}>
        <TouchableOpacity style={styles.backArrowView} onPress={onPress}>
          <Image source={LocalImages.backArrow} style={styles.backArrowImage} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{headerTitle}</Text>
      </View>
      <TouchableOpacity style={styles.rightIconView} hitSlop={styles.hitslop}>
        {image ? <Image source={image} style={styles.rightIcon} /> : null}
      </TouchableOpacity>
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
  innerView: {flexDirection: 'row'},
  headerContainer: {
    flexDirection: 'row',
    height: normalize(50),
    marginTop: normalize(50),
    paddingLeft: normalize(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    color: Colors.BLACK,
    marginLeft: normalize(15),
    fontWeight: 'bold',
    fontSize: normalize(18),
  },
  rightIcon: {
    height: 20,
    width: 25,
  },
  rightIconView: {marginRight: normalize(15)},
  hitslop: {
    right: 10,
    top: 10,
    bottom: 10,
    left: 10,
  },
});
