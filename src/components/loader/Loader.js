import React from 'react';
import Colors from '../../utils/Colors';
import Spinner from 'react-native-spinkit';
import {StyleSheet, View} from 'react-native';
import {normalize} from '../../utils/Dimensions';

export default function Loader({customStyle}) {
  return (
    <View style={styles.container}>
      <Spinner
        isVisible={true}
        size={normalize(50)}
        type={'FadingCircleAlt'}
        color={Colors.GREEN}
        style={customStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    right: '45%',
  },
});
