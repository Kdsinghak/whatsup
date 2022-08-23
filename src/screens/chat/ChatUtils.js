import firestore from '@react-native-firebase/firestore';

export const createRoom = (docId, messageDetails) => {
  console.log(docId, messageDetails);
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
      .get();

    const allmessages = data.docs.map(items => {
      return {...items.data(), createdAt: items.data().createdAt.toDate()};
    });
    success(allmessages);
  } catch (error) {
    error(error);
  }
}
