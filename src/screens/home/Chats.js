import {
  View,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import React, {useState, useEffect} from 'react';
import {normalize} from '../../utils/Dimensions';
import LocalImages from '../../utils/LocalImages';
import ScreenNames from '../../utils/ScreenNames';
import Loader from '../../components/loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import {requestDataAllUsers} from '../../redux/userDetails/action';
import ChatListRender from '../../components/chatListRender/ChatListRender';

const Chats = () => {
  const navigation = useNavigation();
  const [users, setAllUsers] = useState();
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
    dispatch(
      requestDataAllUsers(
        userId,
        sucess => {
          setAllUsers(sucess);
        },
        error => {
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
        lastmessage={item.lastMessage.text}
      />
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  const emptyListComponent = () => {
    return <Loader />;
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
        <Image source={LocalImages.addUserIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Chats);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  itemSeparatorStyle: {
    height: 1,
    width: '95%',
    opacity: 0.3,
    alignSelf: 'center',
    backgroundColor: Colors.BLACK,
  },
  plusButtonContainer: {
    height: normalize(60),
    width: normalize(60),
    position: 'absolute',
    bottom: normalize(80),
    right: normalize(20),
  },
});
