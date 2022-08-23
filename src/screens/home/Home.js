import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ChatHeader from '../../components/chatHeader/ChatHeader';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../../utils/LocalImages';

import LocalStrings from '../../utils/LocalStrings';

import MyTabs from '../../routes/topTabNavigator/TopNavigation';
import Colors from '../../utils/Colors';
import Tooltip from 'react-native-walkthrough-tooltip';
import {normalize} from '../../utils/Dimensions';
import ScreenNames from '../../utils/ScreenNames';
import {useDispatch} from 'react-redux';
import {requestDeleteUid} from '../../redux/userDetails/action';
import {CommonActions} from '@react-navigation/native';
import Loader from '../../components/loader/Loader';

const Home = () => {
  const navigation = useNavigation();
  const [showTip, setTip] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleTooltipPress = () => {
    setTip(!showTip);
    navigation.navigate(ScreenNames.PROFILE);
  };

  // const handleSkip = () => {};

  const logoutUser = () => {
    dispatch(requestDeleteUid());
    setLoader(true);
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: ScreenNames.LOGIN}]}),
      );
      setLoader(false);
    }, 2000);
  };
  return (
    <View style={styles.contentContainer}>
      <ChatHeader
        text={LocalStrings.WhatsUp}
        onRightIconClick={() => setTip(!showTip)}
        rightIconProfile={LocalImages.more}
        rightIconSearch={LocalImages.search}
      />
      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
        backgroundColor="transparent"
        placement="right"
        contentStyle={styles.toolTipContentStyle}
        isVisible={showTip}
        content={
          <>
            <Text onPress={handleTooltipPress}>{LocalStrings.Profile}</Text>
            <Text onPress={logoutUser}>{LocalStrings.Logout}</Text>
          </>
        }
        onClose={() => setTip(!showTip)}>
        <View style={styles.toolTipView} />
      </Tooltip>
      <MyTabs />
      {loader && <Loader />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  toolTipView: {
    zIndex: -1,
    top: normalize(-30),
    elevation: -1,
    position: 'absolute',
  },
  toolTipContentStyle: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
