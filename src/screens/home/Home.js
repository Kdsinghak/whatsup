import React, {useEffect, useState} from 'react';
import Colors from '../../utils/Colors';
import LocalImages from '../../utils/LocalImages';
import {Alert, StyleSheet, Text, View} from 'react-native';
import LocalStrings from '../../utils/LocalStrings';
import {useNavigation} from '@react-navigation/native';
import ChatHeader from '../../components/chatHeader/ChatHeader';
import MyTabs from '../../routes/topTabNavigator/TopNavigation';

const Home = () => {
  const navigation = useNavigation();
  const onBackpress = () => {
    navigation.goBack();
  };

  // const handleSkip = () => {};

  return (
    <View style={styles.contentContainer}>
      <ChatHeader
        backHandle={onBackpress}
        text={LocalStrings.WhatsUp}
        // onRightIconClick={handleSkip}
        rightIconProfile={LocalImages.more}
        rightIconSearch={LocalImages.search}
      />
      <MyTabs />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
