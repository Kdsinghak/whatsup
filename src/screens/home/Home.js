import {Alert, Platform, StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useState} from 'react';
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
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../../components/customTextInput';

const Home = () => {
  const navigation = useNavigation();
  const {inputRef} = useRef();
  const [showTip, setTip] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleTooltipPress = () => {
    setTip(!showTip);
    navigation.navigate(ScreenNames.PROFILE);
  };

  const logoutUser = () => {
    setLoader(true);
    setTip(!showTip);
    auth()
      .signOut()
      .then(() => {
        dispatch(requestDeleteUid()),
          Alert.alert('User Logged Out'),
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ScreenNames.LOGIN}],
              }),
            );
            setLoader(false);
          }, 2000);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  const onSearchText = () => {};

  return (
    <View style={styles.contentContainer}>
      <ChatHeader
        text={LocalStrings.WhatsUp}
        onRightIconClick={() => setTip(!showTip)}
        rightIconProfile={LocalImages.more}
        rightIconSearch={LocalImages.search}
      />
      <View style={styles.searchView}>
        <Image source={LocalImages.backArrow} style={styles.backArrowImage} />
        <CustomTextInput
          ref={inputRef}
          ContentContainerStyle={styles.ContentContainerStyle}
          placeholder="Search..."
          keyBoardType={'default'}
          setText={onSearchText}
          maxLength={30}
          customInputStyle={styles.customInputStyle}
        />
      </View>
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

export default React.memo(Home);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  toolTipView: {
    zIndex: -1,
    elevation: -1,
    top: normalize(-30),
    position: 'absolute',
  },
  toolTipContentStyle: {
    top: 0,
    right: normalize(10),
    position: 'absolute',
  },
  backArrowImage: {
    height: normalize(25),
    width: normalize(25),
  },
  searchView: {
    flexDirection: 'row',

    height: normalize(50),
    alignItems: 'center',
    marginHorizontal: normalize(16),
  },
  ContentContainerStyle: {
    height: normalize(40),
    width: '80%',
    justifyContent: 'center',
    marginHorizontal: normalize(10),
  },
  customInputStyle: {
    fontSize: normalize(20),
  },
});
