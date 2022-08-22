import Colors from '../../../utils/Colors';
import React, {useState, useEffect} from 'react';
import {getDataFromFirebase} from './profileUtils';
import {normalize} from '../../../utils/Dimensions';
import LocalImages from '../../../utils/LocalImages';
import LocalStrings from '../../../utils/LocalStrings';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {updateDataInFirbase} from '../../../utils/CommonFunctions';

export default function Profile({route}) {
  const navigation = useNavigation();
  const uid = route.params.response.user._user.uid;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');

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
      <TouchableOpacity style={styles.detailsContainer}>
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
            <Text style={styles.detailsTextStyle}>{name}</Text>
          </View>
        </View>

        <View style={styles.iconStyleView}>
          <Image style={styles.iconStyles} source={LocalImages.pencil} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailsContainer}>
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
            <Text style={styles.detailsTextStyle}>{about}</Text>
          </View>
        </View>

        <View style={styles.iconStyleView}>
          <Image style={styles.iconStyles} source={LocalImages.pencil} />
        </View>
      </TouchableOpacity>
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
            <Text style={styles.detailsTextStyle}>{number}</Text>
          </View>
        </View>

        <View style={styles.iconStyleView}>
          <Image style={styles.iconStyles} source={LocalImages.pencil} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => updateDataInFirbase(uid, {image, name, about, number})}>
        <Text>UPDATE</Text>
      </TouchableOpacity>
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
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },

  detailsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: normalize(16),
    marginTop: normalize(20),
    padding: normalize(15),
    borderBottomWidth: 1,
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
});
