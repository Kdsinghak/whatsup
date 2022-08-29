import firestore from '@react-native-firebase/firestore';

export const createRoom = (docId, messageDetails) => {
  firestore()
    .collection('ChatRooms')
    .doc(docId)
    .collection('messages')
    .add({...messageDetails});
};

export async function getAllmessages(docid, success, error) {
  try {
    const data = await firestore()
      .collection('ChatRooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    data.onSnapshot(onsnap => {
      const allmessages = onsnap.docs.map(items => {
        return {...items.data(), createdAt: items.data().createdAt.toDate()};
      });

      success(allmessages);
    });
  } catch (error) {
    error(error);
  }
}
