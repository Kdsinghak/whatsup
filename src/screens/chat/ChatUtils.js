import firestore from '@react-native-firebase/firestore';

export async function getAllmessages(docid, userId, success, error) {
  try {
    const data = await firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    data.onSnapshot(doc => {
      const dataArray = doc?._docs.map(element => {
        return {...element._data, createdAt: element.data().createdAt.toDate()};
      });

      dataArray.sort((a, b) => b.createdAt - a.createdAt);
      let newmsgs = dataArray.filter(item => {
        if (item?.deletedForEveryOne) {
          return false;
        } else if (item?.deletedBy) {
          return item?.deletedBy != userId;
        } else {
          return true;
        }
      });

      success(newmsgs);
    });
  } catch (error) {
    error(error);
  }
}

export const setDataInFirebase = (name, userId, userID, mymsg, image) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('Inbox')
    .doc(userID)
    .set({name, id: userID, lastMessage: mymsg, image: image});
};

export const updateLastMessage = (userId, userID, mymsg) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('Inbox')
    .doc(userID)
    .update({lastMessage: mymsg});
};

export const setMessagesInFirebase = (docid, mymsg) => {
  firestore()
    .collection('ChatRooms')
    .doc(docid)
    .collection('messages')
    .doc(mymsg._id)
    .set({...mymsg});
};

export const setTypingOnFirebase = (docid, userID, isTyping) => {
  console.log(docid, isTyping);
  firestore()
    .collection('ChatRooms')
    .doc(docid)
    .collection('typingStatus')
    .doc(userID)
    .set({isTyping: isTyping});
};

export const getTypingStatus = (docid, userId, success) => {
  firestore()
    .collection('ChatRooms')
    .doc(docid)
    .collection('typingStatus')
    .doc(userId)
    .onSnapshot(typingChange => {
      success(typingChange?.data()?.isTyping);
    });
};

export const deletForMe = (msg, docid) => {
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

export const deletedForEveryOne = (msg, docid) => {
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
