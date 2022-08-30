import firestore from '@react-native-firebase/firestore';

export const createRoom = (docId, messageDetails) => {
  firestore()
    .collection('ChatRooms')
    .doc(docId)
    .collection('messages')
    .add({...messageDetails});
};

export async function getAllmessages(docid, userId, success, error) {
  try {
    const data = await firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    data.onSnapshot(doc => {
      const dataArray = doc?._docs.map(element => element._data);
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
      console.log('newmsgs', newmsgs);

      success(newmsgs);
    });
  } catch (error) {
    error(error);
  }
}
