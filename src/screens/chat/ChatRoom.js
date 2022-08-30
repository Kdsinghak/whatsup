import {
  Text,
  View,
  Image,
  Platform,
  SafeAreaView,
  ImageBackground,
  Clipboard,

} from 'react-native';
import {
  Time,
  Send,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import Colors from '../../utils/Colors';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-spinkit';
import {getAllmessages} from './ChatUtils';
import {normalize} from '../../utils/Dimensions';
import LocalImages from '../../utils/LocalImages';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react';
import {styles} from './style';
import ChatRoomHeader from '../../components/chatRoomHeader/ChatRoomHeader';

function ChatRoom({route}) {
  const navigation = useNavigation();
  const {userID, image, name} = route?.params;
  const [messages, setMessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const {userId, profileDetails} = useSelector(
    store => store.userDetailsReducer,
  );

  const [getUserTypingStatus, setUserTypingStatus] = useState(false);

  let docid = userId > userID ? userId + '-' + userID : userID + '-' + userId;

  useEffect(() => {
    getAllmessages(
      docid,
      userId,
      success => {
        setMessages(success);
      },
      error => {
        showToast(error.error);
      },
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    let msg = messages[0];

    const mymsg = {
      ...msg,
      fromUserId: userId,
      toUserId: userID,
      createdAt: new Date(),
    };

    if (messages.length < 2) {
      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Inbox')
        .doc(userID)
        .set({name, id: userID, lastMessage: mymsg, image: image});

      firestore()
        .collection('Users')
        .doc(userID)
        .collection('Inbox')
        .doc(userId)
        .set({
          name: profileDetails.name,
          id: userId,
          lastMessage: mymsg,
          image: profileDetails.image,
        });
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
      .doc(mymsg._id)
      .set({...mymsg});
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
  }, []);

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

  const startTyping = useCallback(
    debounce(() => {
      setisTyping(false);
    }, 2000),
    [],
  );

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

  const deletForMe = msg => {
    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .doc(msg?._id)
      .update({...msg, deletedBy: userId})
      .then(() => {
        if (messages[0]?._id === msg?._id) {
        }
      });
  };

  const deletedForEveryOne = msg => {
    firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .doc(msg?._id)
      .update({...msg, deletedForEveryOne: true})
      .then(() => {
        if (messages[0]?._id === msg?._id) {
        }
      });
  };

  const handleLongPress = (context, message) => {
    let options, cancelButtonIndex;
    if (userId === message.fromUserId) {
      options = ['Copy', 'Delete for me', 'Delete for everyone', 'Cancel'];
      cancelButtonIndex = options.length;
      context
        .actionSheet()
        .showActionSheetWithOptions(
          {options, cancelButtonIndex},
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(message.text);
                break;
              case 1:
                deletForMe(message);
                break;
              case 2:
                deletedForEveryOne(message);
                break;
            }
          },
        );
    } else {
      options = ['Copy', 'Delete for me', 'Cancel'];
      cancelButtonIndex = options.length;
      context
        .actionSheet()
        .showActionSheetWithOptions(
          {options, cancelButtonIndex},
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(message.text);
                break;
              case 1:
                deletForMe(message);
                break;
            }
          },
        );
    }
  };

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
            style={styles.imageStyle}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
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
  };

  const renderTime = props => {
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
          onLongPress={handleLongPress}
          onSend={messages => onSend(messages)}
          user={{
            _id: userId,
            avatar: profileDetails?.image,
          }}
          showAvatarForEveryMessage={true}
          messagesContainerStyle={styles.messagesContainerStyle}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          onInputTextChanged={detectTyping}
          renderFooter={renderFooter}
          renderBubble={renderBubble}
          renderTime={renderTime}
        />
      </ImageBackground>
      {Platform.OS === 'android' && <View style={styles.dummyViewStyle} />}
    </SafeAreaView>
  );
}

export default React.memo(ChatRoom);
<<<<<<< HEAD
=======
