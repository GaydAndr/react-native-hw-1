import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import styles from './styles';

import { IconButton } from './../../../components/IconButton';
import db from '../../../firebase/config';
import { useSelector } from 'react-redux';

export const CreateScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [inputIsFocus, setInputIsFocus] = useState('');
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [borderInput, setBorderInput] = useState(null);
  const { userId, nickName } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    if (!photo) {
      return;
    }
    uploadPostToServer();
    navigation.navigate('Post', { photo, name, location, locationName });
    setName('');
    setLocationName('');
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const createPost = await db.firestore().collection('posts').add({
      photo,
      location,
      userId,
      nickName,
      locationName,
      name,
    });
  };
  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now().toString();
      await db.storage().ref(`postImage/${postId}`).put(file);
      const processedPhoto = await db
        .storage()
        .ref('postImage')
        .child(postId)
        .getDownloadURL();
      return processedPhoto;
    } catch (error) {
      console.log('error.message', error.message);
      console.log('error.code', error.code);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 400 : 0 }}
      >
        <View style={styles.postsContainer}>
          <View style={styles.cameraContainer}>
            {isFocused && (
              <Camera
                style={styles.camera}
                type={CameraType.back}
                ref={setCamera}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => takePhoto()}
                  style={!photo ? styles.snapContainer : ''}
                >
                  {!photo && <IconButton type="camera" />}
                </TouchableOpacity>

                {photo && (
                  <TouchableOpacity style={styles.photoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.imageContainer}
                    />
                  </TouchableOpacity>
                )}
              </Camera>
            )}
          </View>
          <View onSubmitEditing={keyboardHide}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                if (photo) {
                  setPhoto(null);
                }
              }}
            >
              <Text style={styles.cameraText}>
                {!photo ? 'Створити фото' : 'Змінити фото'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 38 }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    borderInput === 'Название...' ? '#FF6C00' : '#E8E8E8',
                }}
                placeholder="Название..."
                keyboardType="email-address"
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput('Название...');
                }}
                onChangeText={setName}
                value={name}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      borderInput === 'Местность...' ? '#FF6C00' : '#E8E8E8',
                    paddingLeft: 28,
                  }}
                  placeholder="Местность..."
                  keyboardType="email - address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setBorderInput('Местность...');
                  }}
                  onChangeText={setLocationName}
                  value={locationName}
                />
                <View style={{ marginTop: 20, position: 'absolute' }}>
                  <IconButton type="map" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
              }}
              activeOpacity={0.7}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.titleButton,
                  color: photo ? '#ffffff' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
