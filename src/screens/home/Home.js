import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ChatHeader from '../../components/chatHeader/ChatHeader';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../../utils/LocalImages';
import {getStatusBarHeight} from 'react-native-status-bar-height';
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
  console.log('mystatuss', StatusBar.currentHeight);
  const navigation = useNavigation();
  const {inputRef} = useRef();
  const [showTip, setTip] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const transform = useState(new Animated.Value(0))[0];
  const dispatch = useDispatch();

  let scale = [
    {
      scale: transform.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    },
  ];

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
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ScreenNames.LOGIN}],
              }),
            );
            setLoader(false);
          }, 2000);
        Alert.alert('User Logged Out');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  const onSearchText = () => {};

  const onRightIconSearchClick = () => {
    Animated.timing(transform, {
      duration: 400,
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setSearch(true);
  };
  const handleTextInputBack = () => {
    Animated.timing(transform, {
      duration: 400,
      toValue: 0,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setSearch(false);
      }
    });
  };

  return (
    <View style={styles.contentContainer}>
      {isSearch ? (
        <Animated.View
          style={[
            styles.searchView,
            {
              marginTop: getStatusBarHeight(),
              transform: scale,
            },
          ]}>
          <TouchableOpacity onPress={handleTextInputBack}>
            <Image
              source={LocalImages.backArrow}
              style={styles.backArrowImage}
            />
          </TouchableOpacity>
          <CustomTextInput
            ref={inputRef}
            ContentContainerStyle={styles.ContentContainerStyle}
            placeholder="Search..."
            keyBoardType={'default'}
            setText={onSearchText}
            maxLength={30}
            customInputStyle={styles.customInputStyle}
          />
        </Animated.View>
      ) : (
        <ChatHeader
          text={LocalStrings.WhatsUp}
          onRightIconClick={() => setTip(!showTip)}
          rightIconProfile={LocalImages.more}
          rightIconSearch={LocalImages.search}
          onRightIconSearchClick={onRightIconSearchClick}
        />
      )}
      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
        backgroundColor="transparent"
        placement="right"
        contentStyle={styles.toolTipContentStyle}
        isVisible={showTip}
        content={
          <>
            <Text style={styles.toolTipTextStyle} onPress={handleTooltipPress}>
              {LocalStrings.Profile}
            </Text>
            <Text style={styles.toolTipTextStyle} onPress={logoutUser}>
              {LocalStrings.Logout}
            </Text>
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
  toolTipTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(18),
  },
});
