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
import {updateDataInFirbase} from '../../../utils/CommonFunctions';
import CustomButton from '../../../components/customButton/CustomButton';
import ScreenNames from '../../../utils/ScreenNames';

export default function Profile({route}) {
  const navigation = useNavigation();
  const uid = route?.params?.response?.user?._user?.uid;
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');
  const textInput1 = useRef();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getDataFromFirebase(
      uid,
      response => {
        setName(response._data.name);
        setAbout(response._data.about);
        setImage(response._data.image);
        setNumber(response._data.number);
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  const handleImagepick = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        let userImage;
        if (Platform.OS === 'ios') {
          userImage = image.sourceURL;
        } else {
          userImage = image.path;
        }
        setImage(userImage);
      })
      .catch(error => {
        if (error.message == LocalStrings.Image_picker_Error) {
          Alert.alert(
            LocalStrings.Gallery_Permission,
            LocalStrings.Image_Selection_Alert_Description,
            [
              {
                text: LocalStrings.cancel,
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: LocalStrings.Setting,
                onPress: () => Linking.openSettings(),
              },
            ],
            {cancelable: true},
          );
        }
      });
  };

  const handleNavigation = () => {
    navigation.goBack();
  };

  const handleName = () => {
    setModal(!modal);
  };

  const setText = () => {};

  const handleCancel = () => {
    setModal(!modal);
  };

  const handleSave = () => {
    setModal(!modal);
  };
  const onPressNext = () => {
    navigation.navigate(ScreenNames.HOME);
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
          style={styles.editIconContainer}>
          <Image style={styles.editImageIcon} source={LocalImages.edit} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleName} style={styles.detailsContainer}>
        <View style={styles.iconStyleView}>
          <Image source={LocalImages.userNameIcon} style={styles.iconStyles} />
        </View>
        <View style={styles.userDetailsContainer}>
          <Text style={styles.textStyle}>{LocalStrings.Name}</Text>
          <Text style={styles.detailsTextStyle}>{name}</Text>
        </View>
        <View style={styles.iconStyleView}>
          <Image style={styles.iconStyles} source={LocalImages.pencil} />
        </View>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.iconStyleView}>
          <Image source={LocalImages.info} style={styles.iconStyles} />
        </View>
        <View style={styles.userAboutContainer}>
          <Text style={styles.textStyle}>{LocalStrings.About}</Text>
          <Text style={styles.detailsTextStyle}>{about}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconStyleView}>
          <Image source={LocalImages.phone} style={styles.iconStyles} />
        </View>
        <View style={styles.userAboutContainer}>
          <Text style={styles.textStyle}>{LocalStrings.Phone}</Text>
          <Text style={styles.detailsTextStyle}>{number}</Text>
        </View>
      </View>
      <CustomButton
        onPress={onPressNext}
        containerStyle={styles.enablebuttonContainerStyle}
        buttonLabel={LocalStrings.Next}
        labelStyle={styles.labelStyle}
      />
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
    alignItems: 'center',
    marginTop: normalize(10),
    paddingTop: normalize(20),
    borderColor: Colors.SILVER,
    borderTopWidth: normalize(1),
    borderBottomWidth: normalize(1),
    marginHorizontal: normalize(10),
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
    borderBottomColor: Colors.SILVER,
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
  editImageIcon: {height: normalize(25), width: normalize(25)},

  enablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    marginTop: normalize(100),
    borderRadius: normalize(30),
    backgroundColor: Colors.GREEN,
    marginHorizontal: normalize(16),
  },
  disablebuttonContainerStyle: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'center',
    borderRadius: normalize(30),
    backgroundColor: Colors.LIGHTGREEN,
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
  },

  labelStyle: {
    color: Colors.WHITE,
    fontSize: normalize(20),
  },
  editIconContainer: {
    backgroundColor: Colors.GREY,
    borderRadius: normalize(7),
    bottom: normalize(25),
    left: normalize(40),
  },
  userDetailsContainer: {
    width: '75%',
    height: normalize(50),
  },
  userAboutContainer: {
    width: '87%',
    height: normalize(50),
  },
});
