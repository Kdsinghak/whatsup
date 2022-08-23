import React from 'react';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';
import LocalImages from '../../utils/LocalImages';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const CustomHeader = ({onPress, headerTitle, image}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerView}>
        <TouchableOpacity style={styles.backArrowView} onPress={onPress}>
          <Image source={LocalImages.backArrow} style={styles.backArrowImage} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{headerTitle}</Text>
      </View>
      <TouchableOpacity style={styles.rightIconView} hitSlop={(10, 10, 10, 10)}>
        {image && <Image source={image} style={styles.rightIcon} />}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CustomHeader);

const styles = StyleSheet.create({
  backArrowImage: {
    width: '100%',
    height: '100%',
  },
  backArrowView: {
    width: normalize(20),
    height: normalize(20),
  },
  innerView: {flexDirection: 'row'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    marginTop: normalize(50),
    paddingLeft: normalize(10),
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: normalize(18),
    marginLeft: normalize(15),
  },
  rightIcon: {
    width: normalize(25),
    height: normalize(20),
  },
  rightIconView: {marginRight: normalize(15)},
});
