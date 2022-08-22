import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatHeader from '../../components/chatHeader/ChatHeader';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../../utils/LocalImages';
import LocalStrings from '../../utils/LocalStrings';
import MyTabs from '../../routes/topTabNavigator/TopNavigation';
import Colors from '../../utils/Colors';

const Home = () => {
  const navigation = useNavigation();
  const onBackpress = () => {
    navigation.goBack();
  };

  const handleSkip = () => {};
  return (
    <View style={styles.contentContainer}>
      <ChatHeader
        backHandle={onBackpress}
        text={LocalStrings.WhatsUp}
        onRightIconClick={handleSkip}
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
