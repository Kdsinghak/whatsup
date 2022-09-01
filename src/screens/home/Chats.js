import {
  View,
  Alert,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Text,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import LocalImages from '../../utils/LocalImages';
import ScreenNames from '../../utils/ScreenNames';
import Loader from '../../components/loader/Loader';
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
    return (
      <>
        <View style={styles.backgroundContentContainer}>
          <Image style={styles.iconStyle} source={LocalImages.Background} />
        </View>

        <Text style={styles.noChatTextStyle}>{"You haven't chat yet"}</Text>
        <CustomButton
          containerStyle={styles.buttonViewStyle}
          buttonLabel={'Start Chatting'}
          labelStyle={styles.labelStyle}
          onPress={handleAddUser}
        />
      </>
    );
  };

  const handleAddUser = () => {
    navigation.navigate(ScreenNames.ALLUSERS);
  };

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
