import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useCallback} from 'react';
import Colors from '../../utils/Colors';
import React, {useState, useEffect} from 'react';
import LocalImages from '../../utils/LocalImages';
import ScreenNames from '../../utils/ScreenNames';
import Loader from '../../components/loader/Loader';
import LocalStrings from '../../utils/LocalStrings';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import {requestDataAllUsers} from '../../redux/userDetails/action';
import CustomButton from '../../components/customButton/CustomButton';
import ChatListRender from '../../components/chatListRender/ChatListRender';
import {styles} from './styles';
const Chats = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [users, setAllUsers] = useState();
  const [loader, setLoader] = useState(false);
  const {userId} = useSelector(store => store.userDetailsReducer);

  /**
   * Handle On hardwareBackPress of Android
   */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const onBackPress = () => {
    if (navigation.isFocused()) {
      Alert.alert('', 'You sure you want to close the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      //Return true for stopping default backpress
      //Return False for performing default backpress
      return true;
    }
  };

  /**
   * getUSer @function
   */
  const getAllUsers = () => {
    setLoader(true);
    dispatch(
      requestDataAllUsers(
        userId,
        sucess => {
          setLoader(false);
          setAllUsers(sucess);
        },
        error => {
          setLoader(false);
          showToast(error.message);
        },
      ),
    );
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
        lastmessage={item?.lastMessage?.text}
      />
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  const emptyListComponent = () => {
    return !users ? (
      <Loader />
    ) : (
      <>
        <View style={styles.backgroundContentContainer}>
          <Image style={styles.iconStyle} source={LocalImages.Background} />
        </View>

        <Text style={styles.noChatTextStyle}>{LocalStrings.NoChats}</Text>
        <CustomButton
          containerStyle={styles.buttonViewStyle}
          buttonLabel={LocalStrings.StartChatting}
          labelStyle={styles.labelStyle}
          onPress={handleAddUser}
        />
      </>
    );
  };

  const handleAddUser = useCallback(() => {
    navigation.navigate(ScreenNames.ALLUSERS);
  }, [navigation]);

  /**
   * @returns
   */
  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={users}
        renderItem={onRender}
        ItemSeparatorComponent={flatListItemSeparator}
        keyExtractor={item => {
          return item.id;
        }}
        ListEmptyComponent={emptyListComponent}
      />
      <TouchableOpacity
        style={styles.plusButtonContainer}
        onPress={handleAddUser}>
        <Image style={styles.iconStyle} source={LocalImages.addUserIcon} />
      </TouchableOpacity>
      {loader && <Loader />}
    </View>
  );
};

export default React.memo(Chats);
