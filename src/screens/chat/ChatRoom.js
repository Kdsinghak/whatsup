import {useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import React, {useState, useEffect} from 'react';
import {createRoom, getAllmessages} from './ChatUtils';
import firestore from '@react-native-firebase/firestore';

export default function ChatRoom({route}) {
  const [messages, setMessages] = useState([]);
  const {userId} = useSelector(store => store.userDetailsReducer);
  const {userID} = route.params;

  let docid = userId > userID ? userId + '-' + userID : userID + '-' + userId;

  useEffect(() => {
    getAllmessages(
      docid,
      success => {
        setMessages(success);
      },
      error => {},
    );
  }, []);

  const onSend = (messages = []) => {
    let msg = messages[0];

    const mymsg = {
      ...msg,
      fromUserId: userId,
      toUserId: userID,
      createdAt: new Date(),
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));

    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg});
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
        showAvatarForEveryMessage={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
});
