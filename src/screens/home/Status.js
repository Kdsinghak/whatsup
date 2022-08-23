import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const Status = () => {
  return (
    <View style={styles.contentContainer}>
      <Text>Status</Text>
    </View>
  );
};

export default React.memo(Status);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
