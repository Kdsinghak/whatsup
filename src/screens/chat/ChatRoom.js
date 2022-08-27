import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import Colors from '../../utils/Colors';
import {getAllmessages} from './ChatUtils';
import {normalize} from '../../utils/Dimensions';
import React, {useState, useEffect} from 'react';
import LocalImages from '../../utils/LocalImages';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {View, StyleSheet, Platform, Image, Text} from 'react-native';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import ChatRoomHeader from '../../components/chatRoomHeader/ChatRoomHeader';

export default function ChatRoom({route}) {
  const navigation = useNavigation();
  const {userID, image, name} = route?.params;
  const [messages, setMessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const {userId} = useSelector(store => store.userDetailsReducer);

  let docid = userId > userID ? userId + '-' + userID : userID + '-' + userId;

  useEffect(() => {
    getAllmessages(
      docid,
      success => {
        setMessages(success);
      },
      error => {
        showToast(error.error);
      },
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
  const debounce = (fun, timeout) => {
    let timer;
    return args => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(args);
      }, timeout);
      setisTyping(true);
    };
  };

  const startTyping = debounce(() => {
    setisTyping(false);
  }, 1000);

  const detectTyping = text => {
    if (text.length > 0) startTyping(false);
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          marginBottom: 20,
          height: 20,
          backgroundColor: 'green',
        }}>
        <Text style={{color: 'red'}}>{`${isTyping}`}</Text>
      </View>
      // else return null;
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
        uid={userID}
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
        onInputTextChanged={detectTyping}
        renderFooter={renderFooter}
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
