import {ImageBackground, StyleSheet, Image} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import LocalImages from '../../utils/LocalImages';

const Status = () => {
  return (
    <ImageBackground
      source={LocalImages.backGroundImage}
      style={styles.contentContainer}>
      <Image
        resizeMode="stretch"
        source={LocalImages.status}
        style={styles.imageStyle}
      />
    </ImageBackground>
  );
};

export default React.memo(Status);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});
