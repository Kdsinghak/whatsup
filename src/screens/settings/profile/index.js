import {
  View,
  Text,
  Modal,
  Alert,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './style';
import {getDataFromFirebase} from './profileUtils';
import LocalImages from '../../../utils/LocalImages';
import ScreenNames from '../../../utils/ScreenNames';
import LocalStrings from '../../../utils/LocalStrings';
import Loader from '../../../components/loader/Loader';
import {CommonActions} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomText from '../../../components/customTextInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatHeader from '../../../components/chatHeader/ChatHeader';
import CustomButton from '../../../components/customButton/CustomButton';
import {showToast, updateDataInFirbase} from '../../../utils/CommonFunctions';

export default function Profile() {
  const textInput1 = useRef();
  const {uid} = useRoute().params;
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [modal, setModal] = useState(false);
  const [about, setAbout] = useState('Available');
  const [image, setImage] = useState(
    'https://cdn-icons-png.flaticon.com/128/149/149071.png',
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getDataFromFirebase(
      uid,
      response => {
        setName(response._data.name);
        setImage(response._data.image);
        setAbout(response._data.about);
        setNumber(response._data.number);
        setLoader(false);
      },
      error => {
        showToast(error.message);
        setLoader(false);
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

  const handleCancel = () => {
    setModal(!modal);
  };

  const handleSave = () => {
    setModal(!modal);
  };

  const onPressNext = () => {
    setLoader(true);

    updateDataInFirbase(
      uid,
      {image, name, about, number},
      success => {
        setLoader(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: ScreenNames.HOME,
                params: {
                  success,
                },
              },
            ],
          }),
        );
      },
      error => {
        setLoader(false);
        showToast(error.message);
      },
    );
  };

  const onimageLoadstart = () => {
    setLoader(true);
  };
  const onimageLoadEnd = () => {
    setLoader(false);
  };

  return (
    <>
      <ChatHeader
        leftIcon={LocalImages.backArrow}
        text={LocalStrings.Profile}
        backHandle={handleNavigation}
      />
      <ScrollView bounces={false}>
        <View style={styles.profileImageView}>
          <View style={styles.profileImage}>
            <Image
              source={
                {
                  uri: image,
                } ?? LocalImages.userIcon
              }
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            onPress={handleImagepick}
            style={styles.editIconContainer}>
            <Image
              style={styles.editImageIcon}
              source={LocalImages.edit}
              onLoadStart={onimageLoadstart}
              onLoadEnd={onimageLoadEnd}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleName} style={styles.detailsContainer}>
          <View style={styles.iconStyleView}>
            <Image
              source={LocalImages.userNameIcon}
              style={styles.iconStyles}
            />
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
      </ScrollView>
      {loader && <Loader />}
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.madalView}>
          <KeyboardAvoidingView
            style={styles.modalContentContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.labelTextStyle}>{LocalStrings.EnterName}</Text>
            <CustomText
              ref={textInput1}
              placeholder={LocalStrings.EnterName}
              TextStyle={styles.nameTextStyle}
              keyBoardType="default"
              maxLength="20"
              setText={setName}
              ContentContainerStyle={styles.ContentContainerStyle}
            />
            <View style={styles.modalCloseText}>
              <Text onPress={handleCancel} style={styles.modalOptionTextStyle}>
                {LocalStrings.cancel}
              </Text>
              <Text onPress={handleSave} style={styles.modalOptionTextStyle}>
                {LocalStrings.save}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}
