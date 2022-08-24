import Colors from '../../utils/Colors';
import {useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getDatafromFirebase, showToast} from '../../utils/CommonFunctions';
import ChatListRender from '../../components/chatListRender/ChatListRender';

const Chats = () => {
  const [users, setAllUsers] = useState();

  const {userId} = useSelector(store => store.userDetailsReducer);

  const getAllUsers = () => {
    getDatafromFirebase(
      userId,
      success => {
        setAllUsers(success);
      },
      error => {
        showToast(error.message);
      },
    );
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const onRender = ({item}) => {
    return (
      <ChatListRender
        name={item.name}
        // message={item.message}
        chatImage={item.image}
        id={item.id}
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
