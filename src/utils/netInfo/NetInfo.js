import NoInternet from './NoInternet';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function NetInfoHandler() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (connected) {
    return null;
  }

  return (
    <Modal
      coverScreen
      avoidKeyboard
      isVisible={!connected}
      animationInTiming={600}
      animationOutTiming={300}
      animationOut="fadeOutDown"
      style={styles.modalContainer}>
      <NoInternet />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
});
