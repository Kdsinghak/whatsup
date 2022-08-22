import {
  View,
  Text,
  Modal,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../../utils/Colors';
import React, {useState, useEffect, useRef} from 'react';
import {getDataFromFirebase} from './profileUtils';

import {normalize} from '../../../utils/Dimensions';
import LocalImages from '../../../utils/LocalImages';
import LocalStrings from '../../../utils/LocalStrings';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import CustomText from '../../../components/customTextInput';

export default function Profile({route}) {
  const navigation = useNavigation();
  // const uid = route.params.response.user._user.uid;

  const [image, setImage] = useState(
    'https://cdn-icons-png.flaticon.com/128/149/149071.png',
  );
  const textInput1 = useRef();
  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   getDataFromFirebase(
  //     uid,
  //     response => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //   );
  // }, []);

  const handleImagepick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.sourceURL);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleNavigation = () => {
    navigation.goBack();
  };

  const HandleName = () => {
    setModal(!modal);
  };

  const setText = () => {};

  const handleCancel = () => {
    setModal(!modal);
  };

  const handleSave = () => {
    setModal(!modal);
  };
  return (
    <>
      <CustomHeader
        onPress={handleNavigation}
        headerTitle={LocalStrings.Profile}
        image={LocalImages.more}
      />
      <View style={styles.profileImageView}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity
          onPress={handleImagepick}
          style={{
            backgroundColor: Colors.GREY,
            borderRadius: normalize(7),
            bottom: normalize(25),
            left: normalize(40),
          }}>
          <Image
            style={{height: normalize(25), width: normalize(25)}}
            source={LocalImages.edit}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={HandleName} style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: normalize(100),
            justifyContent: 'space-between',
          }}>
          <View style={styles.iconStyleView}>
            <Image
              source={LocalImages.userNameIcon}
              style={styles.iconStyles}
            />
          </View>
          <View>
            <Text style={styles.textStyle}>{LocalStrings.Name}</Text>
            <Text style={styles.detailsTextStyle}>{'KULDEEP'}</Text>
          </View>
        </View>

        <View style={styles.iconStyleView}>
          <Image style={styles.iconStyles} source={LocalImages.pencil} />
        </View>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: normalize(200),
          }}>
          <View style={styles.iconStyleView}>
            <Image source={LocalImages.info} style={styles.iconStyles} />
          </View>
          <View style={{marginLeft: normalize(15)}}>
            <Text style={styles.textStyle}>{LocalStrings.About}</Text>
            <Text style={styles.detailsTextStyle}>{'Available'}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: normalize(200),
          }}>
          <View style={styles.iconStyleView}>
            <Image source={LocalImages.phone} style={styles.iconStyles} />
          </View>
          <View style={{marginLeft: normalize(15)}}>
            <Text style={styles.textStyle}>{LocalStrings.Phone}</Text>
            <Text style={styles.detailsTextStyle}>{'9027432415'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <KeyboardAvoidingView
            style={styles.modalContentContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.labelTextStyle}>{'Enter your name'}</Text>
            <CustomText
              ref={textInput1}
              placeholder={'Enter Name'}
              TextStyle={styles.nameTextStyle}
              keyBoardType="default"
              maxLength="20"
              setText={setText}
              ContentContainerStyle={styles.ContentContainerStyle}
            />
            <View style={styles.modalCloseText}>
              <Text onPress={handleCancel} style={styles.modalOptionTextStyle}>
                {'Cancel'}
              </Text>

              <Text onPress={handleSave} style={styles.modalOptionTextStyle}>
                {'Save'}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.SILVER,
    borderTopColor: Colors.SILVER,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginHorizontal: normalize(10),
    marginTop: normalize(10),
    height: normalize(180),
  },

  profileImage: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(60),
  },
  iconStyleView: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'center',
  },
  iconStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: normalize(15),
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.BLACK,
    fontSize: normalize(15),
  },
  detailsTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(15),
    fontWeight: '400',
  },

  modalContentContainer: {
    height: normalize(130),
    justifyContent: 'center',
    paddingLeft: normalize(10),
    borderRadius: normalize(10),
    backgroundColor: Colors.WHITE,
    marginHorizontal: normalize(20),
  },
  nameTextStyle: {
    fontWeight: '500',
    fontSize: normalize(18),
  },

  labelTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(18),
    marginLeft: normalize(5),
  },
  modalCloseText: {
    flexDirection: 'row',
    marginTop: normalize(5),
    justifyContent: 'flex-end',
  },
  modalOptionTextStyle: {
    color: Colors.BLACK,
    fontSize: normalize(20),
    marginHorizontal: normalize(20),
  },
  ContentContainerStyle: {
    marginTop: normalize(20),
    marginLeft: normalize(7),
    marginRight: normalize(20),
    borderBottomWidth: normalize(2),
    borderBottomColor: Colors.GREEN,
  },
});
