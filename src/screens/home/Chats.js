import React from 'react';
import Colors from '../../utils/Colors';
import Data from '../../utils/StaticData';
import {FlatList, StyleSheet, View} from 'react-native';
import ChatListRender from '../../components/chatListRender/ChatListRender';

const Chats = () => {
  const onRender = ({item}) => {
    return (
      <ChatListRender
        name={item.name}
        message={item.message}
        chatImage={item.profile}
      />
    );
  };

  const flatListItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };
  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={Data}
        renderItem={onRender}
        ItemSeparatorComponent={flatListItemSeparator}
      />
    </View>
  );
};

export default Chats;

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
