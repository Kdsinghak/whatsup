import Colors from '../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {showToast} from '../../utils/CommonFunctions';
import ChatListRender from '../../components/chatListRender/ChatListRender';
import {requestDataAllUsers} from '../../redux/userDetails/action';

const Chats = () => {
  const [users, setAllUsers] = useState();
  const dispatch = useDispatch();
  const {userId} = useSelector(store => store.userDetailsReducer);
  console.log('wertyuiop;lkjhgfds', users);
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
        keyExtractor={item => {
          item.id;
        }}
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
