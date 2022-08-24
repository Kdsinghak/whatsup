import React from 'react';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const ChatHeader = props => {
  const {
    text,
    leftIcon,
    backHandle,
    rightIconMail,
    rightAlignText,
    rightIconSearch,
    onRightIconSearchClick,
    onRightIconClick = () => {},
    rightIconProfile,
  } = props;

  return (
    <View style={styles.contentContainer}>
      <View style={styles.leftHeaderContainer}>
        {leftIcon ? (
          <TouchableOpacity
            hitSlop={{
              top: normalize(5),
              left: normalize(5),
              bottom: normalize(5),
            }}
            onPress={backHandle}
            style={styles.container}>
            <Image style={styles.smallImage} source={leftIcon} />
          </TouchableOpacity>
        ) : null}
        {text ? <Text style={styles.headingTextStyle}>{text}</Text> : null}
      </View>
      <View style={styles.rightIconsContainer}>
        {rightIconSearch ? (
          <TouchableOpacity
            onPress={onRightIconSearchClick}
            style={styles.containerSearch}>
            <Image
              style={styles.smallImage}
              source={rightIconSearch}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {rightIconMail ? (
          <TouchableOpacity
            style={styles.containerMail}
            onPress={() => {
              navigation.navigate(ScreenNames.LOGIN);
            }}>
            <Image source={rightIconMail} resizeMode="contain" />
          </TouchableOpacity>
        ) : null}
        {rightIconProfile ? (
          <TouchableOpacity
            onPress={onRightIconClick}
            style={styles.containerProfile}>
            <Image
              style={styles.smallImage}
              source={rightIconProfile}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {rightAlignText ? (
        <Text onPress={onRightIconClick} style={styles.rightTextStyle}>
          {rightAlignText}
        </Text>
      ) : null}
    </View>
  );
};

export default React.memo(ChatHeader);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
    marginTop: Platform.OS === 'ios' ? normalize(40) : normalize(40),
  },
  container: {
    width: normalize(25),
    height: normalize(25),
  },
  smallImage: {
    height: '100%',
    width: '100%',
    tintColor: Colors.GREEN,
  },

  headingTextStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: normalize(30),
    marginLeft: normalize(13),
    lineHeight: normalize(35),
  },

  containerSearch: {
    height: normalize(20),
    width: normalize(25),
  },

  containerMail: {
    height: normalize(16),
    width: normalize(21),
  },

  containerProfile: {
    height: normalize(20),
    width: normalize(25),
  },

  rightIconsContainer: {
    height: normalize(50),
    width: normalize(80),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTextStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: normalize(16),
    lineHeight: normalize(25),
    color: Colors.BLACK,
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
