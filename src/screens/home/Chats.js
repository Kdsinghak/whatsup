import Colors from '../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getDatafromFirebase, showToast} from '../../utils/CommonFunctions';
import ChatListRender from '../../components/chatListRender/ChatListRender';
import {requestDataAllUsers} from '../../redux/userDetails/action';

const Chats = () => {
  const [users, setAllUsers] = useState();
  const dispatch = useDispatch();
  const {userId} = useSelector(store => store.userDetailsReducer);

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
        name={item.name}
        chatImage={item.image}
        id={item.id}
        status={item.status}
      />
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={users}
        renderItem={onRender}
        ItemSeparatorComponent={flatListItemSeparator}
      />
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
});
