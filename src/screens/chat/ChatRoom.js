import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
  Composer,
} from 'react-native-gifted-chat';
import Spinner from 'react-native-spinkit';
import React, {useState, useEffect} from 'react';
import LocalImages from '../../utils/LocalImages';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getAllmessages} from '../../screens/chat/ChatUtils';
import ChatRoomHeader from '../../components/chatRoomHeader/ChatRoomHeader';
import Colors from '../../utils/Colors';
import {normalize} from '../../utils/Dimensions';

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
      <View style={styles.typingStatusView}>
        <Spinner type="ThreeBounce" size={50} color={Colors.GREY} />
      </View>
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
          isTyping={false}
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
    marginHorizontal: normalize(15),
    paddingVertical: normalize(5),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    bottom: normalize(-12),
  },
  androidSafeView: {
    height: getStatusBarHeight() + 10,
    backgroundColor: Colors.WHITE,
    elevation: -1,
  },
  typingStatusView: {
    width: normalize(80),
    alignItems: 'center',
    height: normalize(35),
    justifyContent: 'center',
    marginLeft: normalize(8),
    borderRadius: normalize(10),
    marginVertical: normalize(5),
    backgroundColor: 'transparent',
  },
});
