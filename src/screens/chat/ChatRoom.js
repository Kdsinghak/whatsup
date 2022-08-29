import {useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  Time,
  Send,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import Colors from '../../utils/Colors';
import Spinner from 'react-native-spinkit';
import {getAllmessages} from './ChatUtils';
import {normalize} from '../../utils/Dimensions';
import LocalImages from '../../utils/LocalImages';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ChatRoomHeader from '../../components/chatRoomHeader/ChatRoomHeader';

export default function ChatRoom({route}) {
  const navigation = useNavigation();
  const {userID, image, name} = route?.params;
  const [messages, setMessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const {userId} = useSelector(store => store.userDetailsReducer);
  const [getUserTypingStatus, setUserTypingStatus] = useState(false);

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
    console.log(messages);
  }, []);

  const onSend = useCallback((messages = []) => {
    let msg = messages[0];

    const mymsg = {
      ...msg,
      fromUserId: userId,
      toUserId: userID,
      createdAt: new Date(),
    };

    if (messages.length < 1) {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Inbox')
        .doc(userID)
        .set({name, id, lastMessage: mymsg});
    } else {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Inbox')
        .doc(userID)
        .update({lastMessage: mymsg});
    }
    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg});
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderInputToolbar = props => {
    return (
      <View style={styles.inputContainerView}>
        <InputToolbar
          containerStyle={styles.inputToolbarContainerStyle}
          {...props}
        />
      </View>
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
  }, 2500);

  const detectTyping = text => {
    if (text.length > 0) startTyping(false);
  };

  useEffect(() => {
    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('typingStatus')
      .doc(userID)
      .set({isTyping: isTyping});

    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('typingStatus')
      .doc(userId)
      .onSnapshot(typingChange => {
        setUserTypingStatus(typingChange?.data()?.isTyping);
      });
  }, [isTyping]);

  const renderFooter = () => {
    if (getUserTypingStatus) {
      return (
        <View style={styles.typingStatusView}>
          <Spinner type="ThreeBounce" size={50} color={Colors.GREY} />
        </View>
      );
    }
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendButtonContainer}>
          <Image
            resizeMode="contain"
            source={LocalImages.send}
            style={styles.imageStylexcvn}
          />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={styles.contentContainer}>
      {Platform.OS === 'android' && <View style={styles.androidSafeView} />}

      <ImageBackground
        style={styles.container}
        source={LocalImages.backGroundImage}>
        <ChatRoomHeader
          image={image}
          name={name}
          onBackPress={handleBack}
          uid={userID}
        />

        <GiftedChat
          messages={messages}
          scrollToBottom
          onSend={messages => onSend(messages)}
          user={{
            _id: userId,
          }}
          showAvatarForEveryMessage={true}
          messagesContainerStyle={{
            paddingTop: Platform.OS === 'ios' ? normalize(5) : normalize(24),
          }}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          onInputTextChanged={detectTyping}
          renderFooter={renderFooter}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: Colors.BLACK,
                  },
                  left: {color: Colors.BLACK},
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: Colors.WHITE,
                  },
                  right: {
                    backgroundColor: Colors.WHATSAPPGREEN,
                  },
                }}
              />
            );
          }}
          renderTime={props => {
            return (
              <Time
                {...props}
                timeTextStyle={{
                  left: {
                    color: Colors.BLACK,
                    fontSize: normalize(13),
                  },
                  right: {
                    color: Colors.BROWNISHGREY,
                    fontSize: normalize(13),
                  },
                }}
              />
            );
          }}
        />
      </ImageBackground>
      {Platform.OS === 'android' && <View style={styles.dummyViewStyle} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dummyViewStyle: {
    height: getStatusBarHeight(),
    backgroundColor: Colors.ORCHAR,
    elevation: -1,
  },
  contentContainer: {flex: 1, backgroundColor: Colors.WHITE},
  container: {
    flex: 1,
    backgroundColor: Colors.ORCHAR,
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
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingVertical: normalize(5),
    marginHorizontal: normalize(15),
  },
  androidSafeView: {
    elevation: -1,
    backgroundColor: Colors.WHITE,
    height: getStatusBarHeight() + 10,
  },
  typingStatusView: {
    width: normalize(80),
    alignItems: 'center',
    height: normalize(35),
    justifyContent: 'center',
    marginLeft: normalize(8),
    marginVertical: normalize(5),
    backgroundColor: 'transparent',
  },
  inputContainerView: {marginTop: normalize(53)},
});
