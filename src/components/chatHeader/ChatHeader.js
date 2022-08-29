import React from 'react';

import {normalize} from '../../utils/Dimensions';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './style';
const ChatHeader = props => {
  const {
    text,
    leftIcon,
    backHandle,
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
