import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import React, {useState, useEffect} from 'react';
import {createRoom, getAllmessages} from './ChatUtils';
import firestore from '@react-native-firebase/firestore';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LocalImages from '../../utils/LocalImages';
import {normalize} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
import ChatRoomHeader from '../../components/chatRoomHeader/ChatRoomHeader';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

export default function ChatRoom({route}) {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const {userId} = useSelector(store => store.userDetailsReducer);
  const {userID, image, name} = route?.params;

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
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        containerStyle={styles.inputToolbarContainerStyle}
        {...props}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendButtonContainer}>
          <Image
            resizeMode="contain"
            source={LocalImages.send}
            style={styles.imageStyle}
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <ChatRoomHeader
        image={image}
        name={name}
        onBackPress={handleBack}
        status={status}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
        showAvatarForEveryMessage={true}
        messagesContainerStyle={{
          paddingTop:
            Platform.OS === 'ios'
              ? getStatusBarHeight() + normalize(5)
              : getStatusBarHeight() + normalize(24),
        }}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  sendButtonContainer: {
    overflow: 'hidden',
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  inputToolbarContainerStyle: {
    marginHorizontal: normalize(15),
    borderRadius: normalize(10),
    justifyContent: 'center',
    marginBottom: normalize(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
