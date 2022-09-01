import {
  View,
  Platform,
  Clipboard,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  deletForMe,
  getAllmessages,
  getTypingStatus,
  updateLastMessage,
  setDataInFirebase,
  deletedForEveryOne,
  setTypingOnFirebase,
  setMessagesInFirebase,
} from './ChatUtils';
import {styles} from './style';
import {useSelector} from 'react-redux';
import Colors from '../../utils/Colors';
import Spinner from 'react-native-spinkit';
import LocalImages from '../../utils/LocalImages';
import {renderSend} from './components/RenderSend';
import {renderTime} from './components/RenderTime';
import LocalStrings from '../../utils/LocalStrings';
import {showToast} from '../../utils/CommonFunctions';
import {useNavigation} from '@react-navigation/native';
import {renderBubble} from './components/RenderBubble';
import firestore from '@react-native-firebase/firestore';
import {Day, GiftedChat} from 'react-native-gifted-chat';
import React, {useState, useEffect, useCallback} from 'react';
import {renderInputToolbar} from './components/RenderInputToolBar';
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

  const hanleReadStatus = async () => {
    const validate = await firestore()
      .collection(LocalStrings.ChatRoom)
      .doc(docid)
      .collection(LocalStrings.Messages)
      .get();
    const batch = firestore()?.batch();
    validate.forEach(documentSnapshot => {
      console.log('documentSnapshot', documentSnapshot?._data?.toUserId);
      console.log('USerId', userId);
      if (documentSnapshot?._data?.toUserId === userId) {
        batch.update(documentSnapshot.ref, {received: true});
      }
    });
    return batch.commit();
  };

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
      hanleReadStatus,
    );
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      let msg = messages[0];

      const mymsg = {
        ...msg,
        fromUserId: userId,
        toUserId: userID,
        sent: true,
        received: false,
        createdAt: new Date(),
      };

      if (messages.length < 2) {
        setDataInFirebase(name, userId, userID, mymsg, image);
        setDataInFirebase(
          profileDetails.name,
          userID,
          userId,
          mymsg,
          profileDetails.image,
        );
      } else {
        updateLastMessage(userId, userID, mymsg);
      }
      setMessagesInFirebase(docid, mymsg);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, mymsg),
      );
    },
    [messages],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
  }, 2000);

  const detectTyping = text => {
    if (text.length > 0) startTyping(false);
  };

  useEffect(() => {
    setTypingOnFirebase(docid, userID, isTyping);
    getTypingStatus(docid, userId, onSucess => {
      setUserTypingStatus(onSucess);
    });
  }, [isTyping]);

  const handleLongPress = useCallback(
    (context, message) => {
      let options, cancelButtonIndex;
      if (userId === message.fromUserId) {
        options = [
          LocalStrings.Copy,
          LocalStrings.Delete_Me,
          LocalStrings.DeleteEveryOne,
          LocalStrings.cancel,
        ];
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
                  deletForMe(message, docid);
                  break;
                case 2:
                  deletedForEveryOne(message, docid);
                  break;
              }
            },
          );
      } else {
        options = [
          LocalStrings.Copy,
          LocalStrings.Delete_Me,
          LocalStrings.cancel,
        ];
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
    },
    [messages],
  );

  const renderFooter = useCallback(() => {
    if (getUserTypingStatus) {
      return (
        <View style={styles.typingStatusView}>
          <Spinner type="ThreeBounce" size={50} color={Colors.GREY} />
        </View>
      );
    }
  }, [getUserTypingStatus]);

  const renderDay = props => {
    return (
      <Day
        {...props}
        textStyle={styles.textColorStyle}
        wrapperStyle={styles.dayWrapperStyle}
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
          user={{
            _id: userId,
            avatar: profileDetails?.image,
          }}
          scrollToBottom
          messages={messages}
          renderDay={renderDay}
          renderTime={renderTime}
          renderSend={renderSend}
          minInputToolbarHeight={44}
          renderFooter={renderFooter}
          renderBubble={renderBubble}
          onLongPress={handleLongPress}
          showAvatarForEveryMessage={true}
          onInputTextChanged={detectTyping}
          onSend={messages => onSend(messages)}
          renderInputToolbar={renderInputToolbar}
          messagesContainerStyle={styles.messagesContainerStyle}
        />
      </ImageBackground>
      {Platform.OS === 'android' && <View style={styles.dummyViewStyle} />}
    </SafeAreaView>
  );
}

export default React.memo(ChatRoom);
