import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../utils/Colors';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ScreenNames from '../../../utils/ScreenNames';
import LocalImages from '../../../utils/LocalImages';
import {normalize} from '../../../utils/Dimensions';
import Loader from '../../../components/loader/Loader';
import LocalStrings from '../../../utils/LocalStrings';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {showToast} from '../../../utils/CommonFunctions';
import firestore from '@react-native-firebase/firestore';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ChatHeader from '../../../components/chatHeader/ChatHeader';
import {requestDeleteUid} from '../../../redux/userDetails/action';
import CustomTextInput from '../../../components/customTextInput';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ChatListRender from '../../../components/chatListRender/ChatListRender';

const AllUsers = () => {
  const {inputRef} = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [users, setUsers] = useState();
  const [search, setDetails] = useState();
  const [showTip, setTip] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const transform = useState(new Animated.Value(0))[0];
  const {userId} = useSelector(store => store.userDetailsReducer);

  /**
   * Animation Scale
   */
  let scale = [
    {
      scale: transform.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    },
  ];

  /**
   * @function for getting users from firebase
   */
  const getAllUsers = async () => {
    const data = await firestore()
      .collection('Users')
      .where('id', '!=', userId)
      .get();
    const allUsers = data.docs.map(item => item.data());
    setUsers(allUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleTooltipPress = () => {
    setTip(!showTip);
    navigation.navigate(ScreenNames.PROFILE, {uid: userId});
  };

  /**
   * @function to logout user
   */

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
      })
      .catch(error => {
        showToast(error.message);
      });
  };

  const debounce = (fun, timeout) => {
    let timer;
    return args => {
      clearTimeout(timer);
      setTimeout(() => {
        fun(args);
      }, timeout);
    };
  };

  const onRightIconSearchClick = useCallback(() => {
    Animated.timing(transform, {
      duration: 400,
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setSearch(true);
  }, [isSearch]);

  const handleTextInputBack = useCallback(() => {
    Animated.timing(transform, {
      duration: 400,
      toValue: 0,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setSearch(false);
      }
    });
  }, [isSearch]);

  /**
   *
   * @param {*} param0
   * @returns
   */
  const onRender = ({item}) => {
    return (
      <ChatListRender
        id={item.id}
        name={item.name}
        status={item.status}
        chatImage={item.image}
      />
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  const emptyListComponent = () => {
    return <Loader />;
  };

  const onPressBackIcon = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  /**
   * @return
   */
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
            setText={setDetails}
            maxLength={30}
            customInputStyle={styles.customInputStyle}
          />
        </Animated.View>
      ) : (
        <ChatHeader
          backHandle={onPressBackIcon}
          text={LocalStrings.WhatsUp}
          leftIcon={LocalImages.backArrow}
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
          <View style={styles.toolTipContentContainer}>
            <Text style={styles.toolTipTextStyle} onPress={handleTooltipPress}>
              {LocalStrings.Profile}
            </Text>
            <Text style={styles.toolTipTextStyle} onPress={logoutUser}>
              {LocalStrings.Logout}
            </Text>
          </View>
        }
        onClose={() => setTip(!showTip)}>
        <View style={styles.toolTipView} />
      </Tooltip>
      <FlatList
        contentContainerStyle={styles.flatListContentContainerStyle}
        data={users}
        renderItem={onRender}
        ItemSeparatorComponent={flatListItemSeparator}
        keyExtractor={item => {
          return item.id;
        }}
        ListEmptyComponent={emptyListComponent}
      />
      {loader && <Loader />}
    </View>
  );
};

export default React.memo(AllUsers);

/**
 * @styles
 */
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
    alignItems: 'center',
    height: normalize(50),
    marginHorizontal: normalize(16),
  },
  ContentContainerStyle: {
    width: '80%',
    height: normalize(70),
    justifyContent: 'center',
    marginHorizontal: normalize(10),
  },
  customInputStyle: {
    fontSize: normalize(20),
  },
  toolTipTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(20),
    lineHeight: normalize(26),
  },
  toolTipContentContainer: {width: normalize(100)},
  flatListContentContainerStyle: {
    borderTopWidth: normalize(0.7),
    marginTop: normalize(15),
    borderTopColor: Colors.SILVER,
  },
  itemSeparatorStyle: {
    height: 1,
    width: '98%',
    opacity: 0.3,
    alignSelf: 'center',
    backgroundColor: Colors.BLACK,
  },
});
